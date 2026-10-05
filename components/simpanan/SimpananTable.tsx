"use client";

import { useState } from "react";
import { SavingsTransaction } from "@/lib/dummy-data";

interface SimpananTableProps {
  savings: SavingsTransaction[];
  onView: (s: SavingsTransaction) => void;
  onEdit: (s: SavingsTransaction) => void;
  onDelete: (s: SavingsTransaction) => void;
  onOpenCreate: () => void;
  onResetFilters: () => void;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function SimpananTable({
  savings,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
  onResetFilters,
}: SimpananTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const pageSize = 6;

  const totalItems = savings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedSavings = savings.slice(startIndex, startIndex + pageSize);

  const isAllSelected =
    paginatedSavings.length > 0 &&
    paginatedSavings.every((it) => selectedIds.includes(it.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedSavings.some((s) => s.id === id))
      );
    } else {
      const idsToAdd = paginatedSavings.map((s) => s.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...idsToAdd])));
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#E2E8F0] overflow-hidden">
      {/* Table Subheader */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#0F172A]">
            Daftar Transaksi Simpanan Anggota
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
            {totalItems} Mutasi Tercatat
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
          <span>Setoran Kasir Terverifikasi Sistem</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs text-[#0F172A]">
          <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold border-b border-[#E2E8F0] uppercase text-[11px] tracking-wider select-none">
            <tr>
              <th className="w-10 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#EFF6FF] cursor-pointer"
                  aria-label="Pilih semua data"
                />
              </th>
              <th className="px-3 py-3 w-12 text-center">NO</th>
              <th className="px-4 py-3 whitespace-nowrap">TANGGAL & JAM</th>
              <th className="px-4 py-3 whitespace-nowrap">NO. BUKTI</th>
              <th className="px-4 py-3">ANGGOTA</th>
              <th className="px-4 py-3">JENIS SIMPANAN</th>
              <th className="px-4 py-3 text-right">NOMINAL</th>
              <th className="px-4 py-3">KETERANGAN & METODE</th>
              <th className="px-4 py-3 text-center w-28">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {paginatedSavings.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#94A3B8] mb-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.3-4.3"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                      Tidak Ada Data Mutasi Simpanan
                    </h3>
                    <p className="text-xs text-[#64748B] mb-4">
                      Tidak ditemukan riwayat simpanan yang sesuai dengan filter pencarian Anda saat ini.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onResetFilters}
                        className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
                      >
                        Reset Filter
                      </button>
                      <button
                        type="button"
                        onClick={onOpenCreate}
                        className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                      >
                        + Entri Simpanan
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedSavings.map((row, idx) => {
                const globalIndex = startIndex + idx + 1;
                const isSelected = selectedIds.includes(row.id);
                const isSetor = row.tipe === "Setor";

                // Badge style according to Jenis
                let badgeClass = "bg-amber-50 text-[#D97706] border border-amber-200";
                if (row.jenis === "Simpanan Pokok") {
                  badgeClass = "bg-emerald-50 text-[#16A34A] border border-emerald-200";
                } else if (row.jenis === "Simpanan Sukarela") {
                  badgeClass = "bg-sky-50 text-[#0284C7] border border-sky-200";
                }

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-[#F8FAFC]/80 transition-colors ${
                      isSelected ? "bg-blue-50/40" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(row.id)}
                        className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#EFF6FF] cursor-pointer"
                        aria-label={`Pilih mutasi ${row.noBukti}`}
                      />
                    </td>

                    {/* No */}
                    <td className="px-3 py-3 text-center text-[#94A3B8] font-mono">
                      {globalIndex}
                    </td>

                    {/* Tanggal & Jam */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-semibold text-[#0F172A]">{row.tanggal}</div>
                      <div className="text-[11px] text-[#94A3B8]">{row.jam}</div>
                    </td>

                    {/* No. Bukti */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onView(row)}
                        className="font-mono font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline bg-[#EFF6FF] px-2 py-0.5 rounded text-[11px] cursor-pointer transition-colors"
                        title="Lihat Kwitansi"
                      >
                        {row.noBukti}
                      </button>
                    </td>

                    {/* Anggota */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0">
                          {row.initials || row.anggotaNama.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[#0F172A] truncate">
                            {row.anggotaNama}
                          </div>
                          <div className="text-[11px] text-[#64748B] font-mono">
                            No. Anggota: {row.anggotaKode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Jenis Simpanan */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badgeClass}`}
                      >
                        {row.jenis}
                      </span>
                    </td>

                    {/* Nominal */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div
                        className={`font-bold font-mono text-sm ${
                          isSetor ? "text-[#16A34A]" : "text-[#DC2626]"
                        }`}
                      >
                        {isSetor ? "+" : "-"}
                        {formatRp(row.nominal)}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] font-medium">
                        {isSetor ? "Setoran Masuk" : "Penarikan Kas"}
                      </div>
                    </td>

                    {/* Keterangan & Metode */}
                    <td className="px-4 py-3 max-w-[260px]">
                      <div className="text-xs text-[#0F172A] truncate font-medium">
                        {row.keterangan || "-"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></span>
                        <span>{row.metode || "Kas Tunai"}</span>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onView(row)}
                          className="w-8 h-8 rounded-lg hover:bg-blue-50 text-[#64748B] hover:text-[#2563EB] flex items-center justify-center transition-colors cursor-pointer"
                          title="Lihat Kwitansi / Struk"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
                            <line x1="8" x2="16" y1="8" y2="8"/>
                            <line x1="8" x2="16" y1="12" y2="12"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
                          title="Edit Transaksi"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 text-[#64748B] hover:text-[#DC2626] flex items-center justify-center transition-colors cursor-pointer"
                          title="Hapus Transaksi"
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
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalItems > 0 && (
        <div className="px-5 py-3.5 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 bg-white text-xs text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span>Menampilkan</span>
            <strong className="text-[#0F172A] font-semibold">
              {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)}
            </strong>
            <span>dari</span>
            <strong className="text-[#0F172A] font-semibold">{totalItems}</strong>
            <span>mutasi simpanan</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="h-8 px-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#0F172A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              <span>Prev</span>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === safeCurrentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="h-8 px-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#0F172A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
