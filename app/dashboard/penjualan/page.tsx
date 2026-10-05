"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCardsPenjualan from "@/components/penjualan/StatCardsPenjualan";
import PenjualanFilterBar from "@/components/penjualan/PenjualanFilterBar";
import PenjualanTable from "@/components/penjualan/PenjualanTable";
import PenjualanModalDetail from "@/components/penjualan/PenjualanModalDetail";
import PenjualanModalForm from "@/components/penjualan/PenjualanModalForm";
import PenjualanModalDelete from "@/components/penjualan/PenjualanModalDelete";
import ToastNotification, { ToastState } from "@/components/anggota/ToastNotification";
import { MASTER_SALES, SaleTransaction } from "@/lib/dummy-data";

export default function TransaksiPenjualanPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<SaleTransaction[]>(MASTER_SALES);

  // Filters state
  const [searchNota, setSearchNota] = useState("");
  const [searchPelanggan, setSearchPelanggan] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState("01 Okt 2026 - 05 Okt 2026");

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentTx, setCurrentTx] = useState<SaleTransaction | null>(null);

  // Toast state
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type: "success" | "error" | "info", title: string, message: string) => {
    setToast({ show: true, type, title, message });
  };

  // Helper calculate total of a transaction
  const calcTotalTx = (tx: SaleTransaction) => {
    const subtotal = tx.items.reduce((sum, it) => sum + it.qty * it.harga, 0);
    return Math.max(0, subtotal - (tx.diskon || 0));
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Filter No Nota
      if (searchNota.trim()) {
        const query = searchNota.toLowerCase().trim();
        if (!tx.nota.toLowerCase().includes(query)) return false;
      }

      // Filter Pelanggan
      if (searchPelanggan.trim()) {
        const query = searchPelanggan.toLowerCase().trim();
        const matchesName = tx.pelangganNama.toLowerCase().includes(query);
        const matchesCode = tx.pelangganKode.toLowerCase().includes(query);
        if (!matchesName && !matchesCode) return false;
      }

      // Filter Status Pembayaran
      if (statusFilter && tx.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [transactions, searchNota, searchPelanggan, statusFilter]);

  // Statistics calculation (matching screenshot values)
  const totalToday = 2129999; // or dynamic: transactions.reduce((acc, t) => acc + calcTotalTx(t), 0);
  const totalTxCount = transactions.length;

  const lunasAmount = 1359999;
  const lunasCount = transactions.filter((t) => t.status === "Lunas").length;

  const piutangAmount = 770000;
  const piutangCount = transactions.filter((t) => t.status !== "Lunas").length;

  const avgAmount = 355000;

  // Next suggested Nota
  const nextSuggestedNota = useMemo(() => {
    const nextSeq = String(transactions.length + 1).padStart(3, "0");
    return `PJ-20261005-0${nextSeq}`;
  }, [transactions]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchNota("");
    setSearchPelanggan("");
    setStatusFilter("");
    setDateRange("01 Okt 2026 - 05 Okt 2026");
  };

  // Modal open handlers
  const handleOpenDetail = (tx: SaleTransaction) => {
    setCurrentTx(tx);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (tx: SaleTransaction) => {
    setCurrentTx(tx);
    setIsFormOpen(true);
  };

  const handleOpenCreate = () => {
    setCurrentTx(null);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (tx: SaleTransaction) => {
    setCurrentTx(tx);
    setIsDeleteOpen(true);
  };

  // Save handler (Create or Edit)
  const handleSaveTx = (newOrEditedTx: SaleTransaction) => {
    const exists = transactions.some((t) => t.id === newOrEditedTx.id);
    if (exists) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === newOrEditedTx.id ? newOrEditedTx : t))
      );
      showToast(
        "success",
        "Transaksi Diperbarui",
        `Nota ${newOrEditedTx.nota} atas nama ${newOrEditedTx.pelangganNama} berhasil diperbarui.`
      );
    } else {
      setTransactions((prev) => [newOrEditedTx, ...prev]);
      showToast(
        "success",
        "Transaksi Berhasil Disimpan",
        `Nota baru ${newOrEditedTx.nota} berhasil ditambahkan ke pembukuan.`
      );
    }
  };

  // Delete handler
  const handleConfirmDelete = () => {
    if (!currentTx) return;
    setTransactions((prev) => prev.filter((t) => t.id !== currentTx.id));
    setIsDeleteOpen(false);
    showToast(
      "info",
      "Transaksi Dihapus",
      `Nota ${currentTx.nota} telah dihapus dari sistem pembukuan.`
    );
    setCurrentTx(null);
  };

  // Export report to CSV/Excel
  const handleExportReport = () => {
    const headers = [
      "No",
      "Tanggal",
      "Jam",
      "No. Nota",
      "Pelanggan",
      "Kode",
      "Total Belanja",
      "Diskon",
      "Total Bayar",
      "Status",
      "Metode",
    ];

    const rows = filteredTransactions.map((tx, idx) => {
      const subtotal = tx.items.reduce((sum, it) => sum + it.qty * it.harga, 0);
      const total = calcTotalTx(tx);
      return [
        idx + 1,
        tx.tanggal,
        tx.jam,
        tx.nota,
        `"${tx.pelangganNama}"`,
        tx.pelangganKode,
        subtotal,
        tx.diskon || 0,
        total,
        tx.status,
        tx.metode,
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Laporan_Penjualan_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(
      "success",
      "Laporan Berhasil Diekspor",
      "File laporan penjualan format Excel/CSV telah diunduh."
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Content Body */}
        <main className="w-full pt-20 px-4 sm:px-8 py-8 bg-[#F8FAFC] flex-1">
          <div className="flex flex-col w-full max-w-[1400px] mx-auto">
            {/* Breadcrumb & Header Summary */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-[#64748B] text-xs font-medium mb-1">
                  <span className="hover:text-[#2563EB] cursor-pointer transition-colors">
                    Koperasi
                  </span>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="hover:text-[#2563EB] cursor-pointer transition-colors">
                    Operasional
                  </span>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="text-[#2563EB] font-semibold">Penjualan</span>
                </div>
                <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight">
                  Transaksi Penjualan
                </h1>
                <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
                  Pencatatan transaksi penjualan barang konsumsi dan sembako anggota/umum koperasi
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Ekspor Laporan */}
                <button
                  type="button"
                  onClick={handleExportReport}
                  className="h-[38px] px-3.5 bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-all rounded-lg text-xs sm:text-[13px] font-semibold flex items-center gap-2 shadow-2xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" x2="12" y1="15" y2="3"/>
                  </svg>
                  <span>Ekspor Laporan</span>
                </button>

                {/* Cetak Rekap Nota */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="h-[38px] px-3.5 bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-all rounded-lg text-xs sm:text-[13px] font-semibold flex items-center gap-2 shadow-2xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect width="12" height="8" x="6" y="14"/>
                  </svg>
                  <span>Cetak Rekap Nota</span>
                </button>

                {/* + Transaksi Baru */}
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="h-[38px] px-4 bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all rounded-lg text-xs sm:text-[13px] font-semibold flex items-center gap-2 shadow-xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" x2="12" y1="5" y2="19"/>
                    <line x1="5" x2="19" y1="12" y2="12"/>
                  </svg>
                  <span>+ Transaksi Baru</span>
                </button>
              </div>
            </div>

            {/* Quick 4 Stats Cards */}
            <StatCardsPenjualan
              totalToday={totalToday}
              totalTxCount={totalTxCount}
              lunasAmount={lunasAmount}
              lunasCount={lunasCount}
              piutangAmount={piutangAmount}
              piutangCount={piutangCount}
              avgAmount={avgAmount}
            />

            {/* Filter Toolbar */}
            <PenjualanFilterBar
              searchNota={searchNota}
              onSearchNotaChange={setSearchNota}
              searchPelanggan={searchPelanggan}
              onSearchPelangganChange={setSearchPelanggan}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onReset={handleResetFilters}
            />

            {/* Table */}
            <PenjualanTable
              transactions={filteredTransactions}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onOpenCreate={handleOpenCreate}
              onResetFilters={handleResetFilters}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      <PenjualanModalDetail
        tx={currentTx}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <PenjualanModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTx}
        initialData={currentTx}
        nextSuggestedNota={nextSuggestedNota}
      />

      <PenjualanModalDelete
        tx={currentTx}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ToastNotification
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
