"use client";

import { useState } from "react";
import { MemberMaster } from "@/lib/dummy-data";

interface AnggotaTableProps {
  members: MemberMaster[];
  onView: (member: MemberMaster) => void;
  onEdit: (member: MemberMaster) => void;
  onDelete: (member: MemberMaster) => void;
  onBulkStatus: (ids: number[], newStatus: "Aktif" | "Non-Aktif") => void;
  onBulkDelete: (ids: number[]) => void;
  onResetFilters: () => void;
  onOpenCreate: () => void;
}

export default function AnggotaTable({
  members,
  onView,
  onEdit,
  onDelete,
  onBulkStatus,
  onBulkDelete,
  onResetFilters,
  onOpenCreate,
}: AnggotaTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Pagination calculation
  const totalItems = members.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedMembers = members.slice(startIndex, startIndex + pageSize);

  // Select all handler
  const isAllSelected =
    paginatedMembers.length > 0 &&
    paginatedMembers.every((m) => selectedIds.includes(m.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedMembers.some((m) => m.id === id))
      );
    } else {
      const newIds = Array.from(
        new Set([...selectedIds, ...paginatedMembers.map((m) => m.id)])
      );
      setSelectedIds(newIds);
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Avatar pastel background colors
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-sky-100 text-sky-700",
      "bg-rose-100 text-rose-700",
      "bg-amber-100 text-amber-700",
      "bg-emerald-100 text-emerald-700",
      "bg-indigo-100 text-indigo-700",
      "bg-slate-100 text-slate-700",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Bulk Action Bar (Visible when rows checked) */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-[#EFF6FF] border border-blue-200 rounded-xl px-4 py-2.5 transition-all animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
              {selectedIds.length}
            </span>
            <span className="text-xs font-semibold text-[#2563EB]">
              Anggota Terpilih
            </span>
            <span className="text-[#94A3B8] text-xs">| Tindakan massal:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onBulkStatus(selectedIds, "Aktif");
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-[#16A34A] hover:bg-emerald-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Set Aktif
            </button>
            <button
              type="button"
              onClick={() => {
                onBulkStatus(selectedIds, "Non-Aktif");
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-[#F59E0B] hover:bg-amber-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Non-Aktifkan
            </button>
            <button
              type="button"
              onClick={() => {
                onBulkDelete(selectedIds);
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] hover:bg-red-100 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              <span>Hapus Masal</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Data Table Container */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] h-10">
                <th className="w-12 px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#2563EB] rounded border-[#E2E8F0] focus:ring-[#2563EB] cursor-pointer align-middle"
                    aria-label="Pilih semua baris"
                  />
                </th>
                <th className="w-14 px-3 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-center">
                  No
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  No. Anggota
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Profil Anggota
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Tgl Daftar
                </th>
                <th className="px-4 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right pr-6">
                  Aksi
                </th>
              </tr>
            </thead>

            {members.length > 0 ? (
              <tbody className="divide-y divide-[#E2E8F0]">
                {paginatedMembers.map((member, index) => {
                  const isChecked = selectedIds.includes(member.id);
                  const rowNumber = startIndex + index + 1;

                  return (
                    <tr
                      key={member.id}
                      className={`h-[52px] hover:bg-[#F8FAFC] transition-colors ${
                        isChecked ? "bg-[#EFF6FF]/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(member.id)}
                          className="w-4 h-4 text-[#2563EB] rounded border-[#E2E8F0] focus:ring-[#2563EB] cursor-pointer align-middle"
                          aria-label={`Pilih anggota ${member.name}`}
                        />
                      </td>

                      {/* No */}
                      <td className="px-3 py-2 text-center text-xs text-[#64748B] font-medium">
                        {rowNumber}
                      </td>

                      {/* No. Anggota */}
                      <td className="px-4 py-2">
                        <span className="inline-block px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white font-mono text-xs font-semibold text-[#0F172A] shadow-2xs">
                          {member.code}
                        </span>
                      </td>

                      {/* Profil Anggota */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(
                              index
                            )}`}
                          >
                            {getInitials(member.name)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs sm:text-[13px] font-semibold text-[#0F172A] leading-tight truncate">
                              {member.name}
                            </span>
                            <span className="text-[11px] text-[#64748B] leading-tight truncate">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1.5 text-xs text-[#0F172A] font-medium">
                          {member.gender === "Laki-laki" ? (
                            <>
                              {/* Male Icon */}
                              <svg className="w-3.5 h-3.5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="10" cy="14" r="5"/>
                                <line x1="19" y1="5" x2="13.6" y2="10.4"/>
                                <polyline points="14 5 19 5 19 10"/>
                              </svg>
                              <span>Laki-laki</span>
                            </>
                          ) : (
                            <>
                              {/* Female Icon */}
                              <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="10" r="5"/>
                                <line x1="12" y1="15" x2="12" y2="21"/>
                                <line x1="9" y1="18" x2="15" y2="18"/>
                              </svg>
                              <span>Perempuan</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2">
                        {member.status === "Aktif" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                            Aktif
                          </span>
                        )}
                        {member.status === "Non-Aktif" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-[#DC2626] border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                            Non-Aktif
                          </span>
                        )}
                        {member.status === "Menunggu Verifikasi" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#B45309] border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                            Menunggu Verifikasi
                          </span>
                        )}
                      </td>

                      {/* Tgl Daftar */}
                      <td className="px-4 py-2 text-xs text-[#0F172A] font-medium">
                        {member.date}
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-2 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Detail */}
                          <button
                            type="button"
                            onClick={() => onView(member)}
                            className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                            title="Lihat Detail Kartu"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>

                          {/* Edit Member */}
                          <button
                            type="button"
                            onClick={() => onEdit(member)}
                            className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                            title="Edit Data"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            </svg>
                          </button>

                          {/* Delete Member */}
                          <button
                            type="button"
                            onClick={() => onDelete(member)}
                            className="p-1.5 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Data"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : null}
          </table>
        </div>

        {/* Empty State */}
        {members.length === 0 && (
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] mb-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Data Anggota Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-[13px] text-[#64748B] max-w-sm mt-1 mb-4">
              Tidak ada anggota yang cocok dengan kata kunci atau filter pencarian saat ini.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetFilters}
                className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
              >
                Reset Filter Pencarian
              </button>
              <button
                type="button"
                onClick={onOpenCreate}
                className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" x2="12" y1="5" y2="19"/>
                  <line x1="5" x2="19" y1="12" y2="12"/>
                </svg>
                <span>Tambah Anggota</span>
              </button>
            </div>
          </div>
        )}

        {/* Table Footer / Pagination Bar */}
        {members.length > 0 && (
          <div className="px-4 py-3 bg-white border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#64748B]">
                Menampilkan {startIndex + 1} -{" "}
                {Math.min(startIndex + pageSize, totalItems)} dari {totalItems} anggota
              </span>
              <div className="flex items-center gap-1 text-xs text-[#64748B] border-l border-[#E2E8F0] pl-3">
                <span>Baris:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white text-[#0F172A] border border-[#E2E8F0] rounded px-1.5 py-0.5 text-xs focus:outline-none cursor-pointer"
                >
                  <option value={8}>8</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage <= 1}
                className="h-8 px-2.5 rounded border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === safeCurrentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 3 && safeCurrentPage < totalPages - 2 && (
                <span className="px-1 text-[#94A3B8] text-xs">...</span>
              )}

              {totalPages > 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className={`h-8 w-8 rounded border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    safeCurrentPage === totalPages ? "bg-[#2563EB] text-white" : ""
                  }`}
                >
                  13
                </button>
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage >= totalPages}
                className="h-8 px-2.5 rounded border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
