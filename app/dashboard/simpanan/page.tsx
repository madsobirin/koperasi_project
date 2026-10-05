"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCardsSimpanan from "@/components/simpanan/StatCardsSimpanan";
import SimpananFilterBar from "@/components/simpanan/SimpananFilterBar";
import SimpananTable from "@/components/simpanan/SimpananTable";
import SimpananModalDetail from "@/components/simpanan/SimpananModalDetail";
import SimpananModalForm from "@/components/simpanan/SimpananModalForm";
import SimpananModalDelete from "@/components/simpanan/SimpananModalDelete";
import ToastNotification, { ToastState } from "@/components/anggota/ToastNotification";
import { MASTER_SAVINGS, SavingsTransaction } from "@/lib/dummy-data";

export default function SimpananPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savingsList, setSavingsList] = useState<SavingsTransaction[]>(MASTER_SAVINGS);

  // Filters state
  const [searchMember, setSearchMember] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [mutationFilter, setMutationFilter] = useState("");
  const [dateRange, setDateRange] = useState("01 Okt 2026 - 05 Okt 2026");

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentSavings, setCurrentSavings] = useState<SavingsTransaction | null>(null);

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

  // Filtered savings list
  const filteredSavings = useMemo(() => {
    return savingsList.filter((s) => {
      // Filter Nama / No Anggota
      if (searchMember.trim()) {
        const query = searchMember.toLowerCase().trim();
        const matchesName = s.anggotaNama.toLowerCase().includes(query);
        const matchesCode = s.anggotaKode.toLowerCase().includes(query);
        if (!matchesName && !matchesCode) return false;
      }

      // Filter Jenis Simpanan
      if (typeFilter && s.jenis !== typeFilter) {
        return false;
      }

      // Filter Tipe Mutasi
      if (mutationFilter && s.tipe !== mutationFilter) {
        return false;
      }

      return true;
    });
  }, [savingsList, searchMember, typeFilter, mutationFilter]);

  // Next suggested invoice
  const nextSuggestedInvoice = useMemo(() => {
    const nextSeq = String(savingsList.length + 22).padStart(3, "0");
    return `SP-20261005-${nextSeq}`;
  }, [savingsList]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchMember("");
    setTypeFilter("");
    setMutationFilter("");
    setDateRange("01 Okt 2026 - 05 Okt 2026");
  };

  // Handlers for Modals
  const handleOpenCreate = () => {
    setCurrentSavings(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (s: SavingsTransaction) => {
    setCurrentSavings(s);
    setIsFormOpen(true);
  };

  const handleOpenDetail = (s: SavingsTransaction) => {
    setCurrentSavings(s);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (s: SavingsTransaction) => {
    setCurrentSavings(s);
    setIsDeleteOpen(true);
  };

  const handleSaveSavings = (saved: SavingsTransaction) => {
    if (currentSavings) {
      // Edit
      setSavingsList((prev) =>
        prev.map((it) => (it.id === saved.id ? saved : it))
      );
      showToast(
        "success",
        "Mutasi Diperbarui",
        `Transaksi simpanan ${saved.noBukti} (${saved.anggotaNama}) berhasil diperbarui.`
      );
    } else {
      // Add
      setSavingsList((prev) => [saved, ...prev]);
      showToast(
        "success",
        "Setoran Tercatat",
        `Pencatatan kas masuk ${saved.jenis} untuk ${saved.anggotaNama} berhasil disimpan.`
      );
    }
    setIsFormOpen(false);
    setCurrentSavings(null);
  };

  const handleConfirmDelete = () => {
    if (!currentSavings) return;
    const deletedBukti = currentSavings.noBukti;
    setSavingsList((prev) => prev.filter((it) => it.id !== currentSavings.id));
    setIsDeleteOpen(false);
    setCurrentSavings(null);
    showToast(
      "success",
      "Transaksi Dibatalkan",
      `Transaksi simpanan ${deletedBukti} telah dibatalkan dari buku kas.`
    );
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "No Bukti",
      "Tanggal",
      "Jam",
      "Nama Anggota",
      "No Anggota",
      "Jenis Simpanan",
      "Tipe Mutasi",
      "Nominal (Rp)",
      "Metode Pembayaran",
      "Keterangan",
    ];

    const rows = filteredSavings.map((s) => [
      `"${s.noBukti}"`,
      `"${s.tanggal}"`,
      `"${s.jam}"`,
      `"${s.anggotaNama}"`,
      `"${s.anggotaKode}"`,
      `"${s.jenis}"`,
      `"${s.tipe}"`,
      s.nominal,
      `"${s.metode}"`,
      `"${s.keterangan}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Simpanan_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("info", "Ekspor Berhasil", "Data mutasi simpanan anggota berhasil diunduh (CSV).");
  };

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
                  <span className="text-[#2563EB] font-semibold">Simpanan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                    Simpanan Anggota Koperasi
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
                    Pokok • Wajib • Sukarela
                  </span>
                </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
                Pengelolaan dan pencatatan mutasi kas simpanan pokok, simpanan wajib bulanan, dan simpanan sukarela anggota koperasi.
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
                <span>+ Transaksi Simpanan</span>
              </button>
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <StatCardsSimpanan />

          {/* Filter Bar */}
          <SimpananFilterBar
            searchMember={searchMember}
            onSearchMemberChange={setSearchMember}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            mutationFilter={mutationFilter}
            onMutationFilterChange={setMutationFilter}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onReset={handleResetFilters}
          />

          {/* Table */}
          <SimpananTable
            savings={filteredSavings}
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
      <SimpananModalDetail
        savings={currentSavings}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setCurrentSavings(null);
        }}
        onPrint={() => {
          window.print();
        }}
      />

      <SimpananModalForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentSavings(null);
        }}
        onSave={handleSaveSavings}
        initialData={currentSavings}
        nextSuggestedInvoice={nextSuggestedInvoice}
      />

      <SimpananModalDelete
        savings={currentSavings}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setCurrentSavings(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
