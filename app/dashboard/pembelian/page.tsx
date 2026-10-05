"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCardsPembelian from "@/components/pembelian/StatCardsPembelian";
import PembelianFilterBar from "@/components/pembelian/PembelianFilterBar";
import PembelianTable from "@/components/pembelian/PembelianTable";
import PembelianModalDetail from "@/components/pembelian/PembelianModalDetail";
import PembelianModalForm from "@/components/pembelian/PembelianModalForm";
import PembelianModalDelete from "@/components/pembelian/PembelianModalDelete";
import ToastNotification, { ToastState } from "@/components/anggota/ToastNotification";
import { MASTER_PURCHASES, PurchaseTransaction } from "@/lib/dummy-data";

export default function PembelianPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseTransaction[]>(MASTER_PURCHASES);

  // Filters state
  const [searchNota, setSearchNota] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState("01 Okt 2026 - 05 Okt 2026");

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentTx, setCurrentTx] = useState<PurchaseTransaction | null>(null);

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

  // Filtered purchases
  const filteredPurchases = useMemo(() => {
    return purchases.filter((tx) => {
      // Filter No Faktur
      if (searchNota.trim()) {
        const query = searchNota.toLowerCase().trim();
        if (!tx.noNota.toLowerCase().includes(query)) return false;
      }

      // Filter Supplier
      if (searchSupplier.trim()) {
        const query = searchSupplier.toLowerCase().trim();
        if (!tx.supplier.toLowerCase().includes(query)) return false;
      }

      // Filter Status
      if (statusFilter && tx.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [purchases, searchNota, searchSupplier, statusFilter]);

  // Statistics calculation (matching Stitch values)
  const totalAmount = useMemo(() => {
    return purchases.reduce((acc, p) => acc + p.total, 0);
  }, [purchases]);

  const lunasPurchases = useMemo(() => {
    return purchases.filter((p) => p.status === "Lunas");
  }, [purchases]);

  const lunasAmount = useMemo(() => {
    return lunasPurchases.reduce((acc, p) => acc + p.total, 0);
  }, [lunasPurchases]);

  const hutangPurchases = useMemo(() => {
    return purchases.filter((p) => p.status !== "Lunas");
  }, [purchases]);

  const hutangAmount = useMemo(() => {
    return hutangPurchases.reduce((acc, p) => acc + p.total, 0);
  }, [hutangPurchases]);

  const avgAmount = useMemo(() => {
    return purchases.length > 0 ? Math.round(totalAmount / purchases.length) : 0;
  }, [totalAmount, purchases]);

  // Next suggested Faktur
  const nextSuggestedNota = useMemo(() => {
    const nextSeq = String(purchases.length + 1).padStart(3, "0");
    return `PB-20261005-${nextSeq}`;
  }, [purchases]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchNota("");
    setSearchSupplier("");
    setStatusFilter("");
    setDateRange("01 Okt 2026 - 05 Okt 2026");
  };

  // Handlers for Modals
  const handleOpenCreate = () => {
    setCurrentTx(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tx: PurchaseTransaction) => {
    setCurrentTx(tx);
    setIsFormOpen(true);
  };

  const handleOpenDetail = (tx: PurchaseTransaction) => {
    setCurrentTx(tx);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (tx: PurchaseTransaction) => {
    setCurrentTx(tx);
    setIsDeleteOpen(true);
  };

  const handleSavePurchase = (savedTx: PurchaseTransaction) => {
    if (currentTx) {
      // Edit mode
      setPurchases((prev) =>
        prev.map((it) => (it.id === savedTx.id ? savedTx : it))
      );
      showToast(
        "success",
        "Faktur Diperbarui",
        `Faktur pembelian ${savedTx.noNota} berhasil diperbarui.`
      );
    } else {
      // Create mode
      setPurchases((prev) => [savedTx, ...prev]);
      showToast(
        "success",
        "Faktur Tersimpan",
        `Faktur baru ${savedTx.noNota} dari ${savedTx.supplier} berhasil dibukukan.`
      );
    }
    setIsFormOpen(false);
    setCurrentTx(null);
  };

  const handleConfirmDelete = () => {
    if (!currentTx) return;
    const deletedNota = currentTx.noNota;
    setPurchases((prev) => prev.filter((it) => it.id !== currentTx.id));
    setIsDeleteOpen(false);
    setCurrentTx(null);
    showToast(
      "success",
      "Faktur Dihapus",
      `Faktur pembelian ${deletedNota} berhasil dihapus dari sistem.`
    );
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "No Faktur",
      "Tanggal",
      "Supplier",
      "Status",
      "Metode Pembayaran",
      "Jatuh Tempo",
      "Total Faktur",
      "Keterangan",
    ];

    const rows = filteredPurchases.map((p) => [
      `"${p.noNota}"`,
      `"${p.tanggal}"`,
      `"${p.supplier}"`,
      `"${p.status}"`,
      `"${p.metode}"`,
      `"${p.jatuhTempo || "-"}"`,
      p.total,
      `"${p.keterangan || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Pembelian_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("info", "Ekspor Berhasil", "Data rekap faktur pembelian berhasil diunduh (CSV).");
  };

  // Print Rekap
  const handlePrintRekap = () => {
    window.print();
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans antialiased">
      {/* Toast Notification Component */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="w-full pt-20 px-4 sm:px-8 py-8 bg-[#F8FAFC] flex-1">
          <div className="flex flex-col w-full space-y-6">
            {/* Page Heading & Action Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
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
                  <span className="text-[#2563EB] font-semibold">Pembelian</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                    Transaksi Pembelian Stok
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
                    Pengadaan Barang
                  </span>
                </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
                Pencatatan faktur dan transaksi pembelian stok barang dagang, sembako, dan kebutuhan operasional dari distributor rekanan koperasi.
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handlePrintRekap}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect width="12" height="8" x="6" y="14"/>
                </svg>
                <span>Cetak Rekap</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Ekspor CSV</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>+ Transaksi Baru</span>
              </button>
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <StatCardsPembelian
            totalAmount={totalAmount}
            totalCount={purchases.length}
            lunasAmount={lunasAmount}
            lunasCount={lunasPurchases.length}
            hutangAmount={hutangAmount}
            hutangCount={hutangPurchases.length}
            avgAmount={avgAmount}
          />

          {/* Search & Filter Toolbar */}
          <PembelianFilterBar
            searchNota={searchNota}
            onSearchNotaChange={setSearchNota}
            searchSupplier={searchSupplier}
            onSearchSupplierChange={setSearchSupplier}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onReset={handleResetFilters}
          />

          {/* Table List */}
          <PembelianTable
            purchases={filteredPurchases}
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
      <PembelianModalDetail
        tx={currentTx}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setCurrentTx(null);
        }}
        onPrint={() => {
          window.print();
        }}
      />

      <PembelianModalForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentTx(null);
        }}
        onSave={handleSavePurchase}
        initialData={currentTx}
        nextSuggestedNota={nextSuggestedNota}
      />

      <PembelianModalDelete
        tx={currentTx}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setCurrentTx(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
