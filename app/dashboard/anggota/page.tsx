"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCardsAnggota from "@/components/anggota/StatCardsAnggota";
import AnggotaFilterBar from "@/components/anggota/AnggotaFilterBar";
import AnggotaTable from "@/components/anggota/AnggotaTable";
import AnggotaModalDetail from "@/components/anggota/AnggotaModalDetail";
import AnggotaModalForm from "@/components/anggota/AnggotaModalForm";
import AnggotaModalDelete from "@/components/anggota/AnggotaModalDelete";
import ToastNotification, { ToastState } from "@/components/anggota/ToastNotification";
import { MASTER_MEMBERS, MemberMaster } from "@/lib/dummy-data";

export default function DataAnggotaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [members, setMembers] = useState<MemberMaster[]>(MASTER_MEMBERS);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");

  // Modals state
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<MemberMaster | null>(null);

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

  // Filtered members calculation
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesCode = member.code.toLowerCase().includes(query);
        const matchesEmail = member.email.toLowerCase().includes(query);
        const matchesNik = member.nik?.includes(query);
        if (!matchesName && !matchesCode && !matchesEmail && !matchesNik) {
          return false;
        }
      }

      // Status match
      if (statusFilter && member.status !== statusFilter) {
        return false;
      }

      // Gender match
      if (genderFilter && member.gender !== genderFilter) {
        return false;
      }

      // Period match
      if (periodFilter) {
        if (periodFilter === "2026" && !member.date.includes("2026")) return false;
        if (periodFilter === "2024" && !member.date.includes("2024")) return false;
        if (periodFilter === "Bulan Ini" && !member.date.includes("Okt 2026")) return false;
      }

      return true;
    });
  }, [members, searchQuery, statusFilter, genderFilter, periodFilter]);

  // Statistics
  const totalCount = members.length;
  const activeCount = members.filter((m) => m.status === "Aktif").length;
  const inactiveCount = members.filter((m) => m.status === "Non-Aktif").length;
  const pendingCount = members.filter((m) => m.status === "Menunggu Verifikasi").length;

  // Next suggested member code
  const nextSuggestedCode = useMemo(() => {
    const highestId = members.reduce((max, m) => Math.max(max, m.id), 0);
    return `A${String(highestId + 1).padStart(3, "0")}`;
  }, [members]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setGenderFilter("");
    setPeriodFilter("");
  };

  // Modal open handlers
  const handleOpenDetail = (member: MemberMaster) => {
    setCurrentMember(member);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (member: MemberMaster) => {
    setCurrentMember(member);
    setIsFormOpen(true);
  };

  const handleOpenCreate = () => {
    setCurrentMember(null);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (member: MemberMaster) => {
    setCurrentMember(member);
    setIsDeleteOpen(true);
  };

  // Save handler (Create or Edit)
  const handleSaveMember = (memberData: Omit<MemberMaster, "id"> & { id?: number }) => {
    if (memberData.id) {
      // Edit
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberData.id
            ? ({ ...m, ...memberData } as MemberMaster)
            : m
        )
      );
      showToast(
        "success",
        "Data Diperbarui",
        `Informasi anggota ${memberData.name} (${memberData.code}) berhasil disimpan.`
      );
    } else {
      // Create
      const newId = members.reduce((max, m) => Math.max(max, m.id), 0) + 1;
      const newMember: MemberMaster = {
        id: newId,
        code: memberData.code,
        name: memberData.name,
        gender: memberData.gender,
        status: memberData.status,
        date: memberData.date,
        email: memberData.email,
        nik: memberData.nik || "3271041988010002",
        depositStatus: "Simpanan Pokok Lunas",
        totalDeposit: "Rp 500.000",
      };
      setMembers((prev) => [newMember, ...prev]);
      showToast(
        "success",
        "Anggota Ditambahkan",
        `Anggota baru ${newMember.name} (${newMember.code}) berhasil didaftarkan.`
      );
    }
  };

  // Delete handler
  const handleConfirmDelete = () => {
    if (!currentMember) return;
    setMembers((prev) => prev.filter((m) => m.id !== currentMember.id));
    setIsDeleteOpen(false);
    showToast(
      "info",
      "Anggota Dihapus",
      `Data anggota ${currentMember.name} (${currentMember.code}) telah dihapus dari sistem.`
    );
    setCurrentMember(null);
  };

  // Bulk status update
  const handleBulkStatus = (ids: number[], newStatus: "Aktif" | "Non-Aktif") => {
    setMembers((prev) =>
      prev.map((m) => (ids.includes(m.id) ? { ...m, status: newStatus } : m))
    );
    showToast(
      "success",
      "Perubahan Status Massal",
      `${ids.length} anggota berhasil diubah statusnya menjadi ${newStatus}.`
    );
  };

  // Bulk delete
  const handleBulkDelete = (ids: number[]) => {
    setMembers((prev) => prev.filter((m) => !ids.includes(m.id)));
    showToast(
      "info",
      "Hapus Massal",
      `${ids.length} anggota berhasil dihapus dari sistem.`
    );
  };

  // Export to Excel / CSV
  const handleExportExcel = () => {
    const csvHeader = ["No", "No. Anggota", "Nama Lengkap", "NIK", "Email", "Gender", "Status", "Tgl Terdaftar"];
    const csvRows = filteredMembers.map((m, idx) => [
      idx + 1,
      m.code,
      `"${m.name}"`,
      `"${m.nik || ""}"`,
      m.email,
      m.gender,
      m.status,
      `"${m.date}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [csvHeader.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Anggota_Koperasi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("success", "Ekspor Berhasil", "Data anggota berhasil diunduh sebagai file CSV/Excel.");
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Layout Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Content Body */}
        <main className="w-full pt-20 px-4 sm:px-8 py-8 bg-[#F8FAFC] flex-1">
          <div className="flex flex-col w-full max-w-[1400px] mx-auto">
            {/* Breadcrumbs & Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6">
              <div className="flex flex-col space-y-1">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
                  <span className="hover:text-[#2563EB] cursor-pointer transition-colors">Koperasi</span>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="hover:text-[#2563EB] cursor-pointer transition-colors">Anggota</span>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="font-semibold text-[#2563EB]">Data Anggota</span>
                </div>

                {/* Title & Description */}
                <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight">
                  Data Anggota
                </h1>
                <p className="text-xs sm:text-[13px] text-[#64748B]">
                  Kelola data registrasi, simpanan pokok/wajib, status keaktifan, dan profil anggota koperasi.
                </p>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Ekspor Excel */}
                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-2 px-3.5 h-[38px] rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] text-xs sm:text-[13px] font-semibold transition-all shadow-2xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <line x1="3" x2="21" y1="9" y2="9"/>
                    <line x1="3" x2="21" y1="15" y2="15"/>
                    <line x1="9" x2="9" y1="3" y2="21"/>
                    <line x1="15" x2="15" y1="3" y2="21"/>
                  </svg>
                  <span>Ekspor Excel</span>
                </button>

                {/* Cetak Kartu / Daftar */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-3.5 h-[38px] rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] text-xs sm:text-[13px] font-semibold transition-all shadow-2xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect width="12" height="8" x="6" y="14"/>
                  </svg>
                  <span>Cetak Kartu / Daftar</span>
                </button>

                {/* Tambah Anggota */}
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 px-4 h-[38px] rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-[13px] font-semibold transition-all shadow-xs active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" x2="12" y1="5" y2="19"/>
                    <line x1="5" x2="19" y1="12" y2="12"/>
                  </svg>
                  <span>Tambah Anggota</span>
                </button>
              </div>
            </div>

            {/* 4 Bento Quick Stat Cards */}
            <StatCardsAnggota
              totalCount={totalCount}
              activeCount={activeCount}
              inactiveCount={inactiveCount}
              pendingCount={pendingCount}
            />

            {/* Search & Filter Controls Toolbar */}
            <AnggotaFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              genderFilter={genderFilter}
              onGenderChange={setGenderFilter}
              periodFilter={periodFilter}
              onPeriodChange={setPeriodFilter}
              onReset={handleResetFilters}
              totalFiltered={filteredMembers.length}
            />

            {/* Main Data Table */}
            <AnggotaTable
              members={filteredMembers}
              onView={handleOpenDetail}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onBulkStatus={handleBulkStatus}
              onBulkDelete={handleBulkDelete}
              onResetFilters={handleResetFilters}
              onOpenCreate={handleOpenCreate}
            />
          </div>
        </main>
      </div>

      {/* Modals & Toast */}
      <AnggotaModalDetail
        member={currentMember}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <AnggotaModalForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveMember}
        initialData={currentMember}
        nextSuggestedCode={nextSuggestedCode}
      />

      <AnggotaModalDelete
        member={currentMember}
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
