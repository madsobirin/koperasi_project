"use client";

import { useState } from "react";
import { PurchaseTransaction } from "@/lib/dummy-data";

interface PembelianTableProps {
  purchases: PurchaseTransaction[];
  onView: (p: PurchaseTransaction) => void;
  onEdit: (p: PurchaseTransaction) => void;
  onDelete: (p: PurchaseTransaction) => void;
  onOpenCreate: () => void;
  onResetFilters: () => void;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function PembelianTable({
  purchases,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
  onResetFilters,
}: PembelianTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const totalItems = purchases.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedPurchases = purchases.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#E2E8F0] overflow-hidden">
      {/* Table Subheader */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#0F172A]">
            Daftar Faktur Pembelian Stok
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
            {totalItems} Faktur Tercatat
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M16 21h5v-5"/>
          </svg>
          <span>Sinkronisasi Persediaan Otomatis Aktif</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] h-10 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              <th className="w-12 px-3 py-2 text-center">No</th>
              <th className="px-4 py-2">No. Faktur &amp; Tanggal</th>
              <th className="px-4 py-2">Supplier / Distributor</th>
              <th className="px-4 py-2">Total Pembelian</th>
              <th className="px-4 py-2">Status Pembayaran</th>
              <th className="px-4 py-2">Jatuh Tempo &amp; Metode</th>
              <th className="px-4 py-2 text-right pr-6">Aksi</th>
            </tr>
          </thead>

          {purchases.length > 0 ? (
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {paginatedPurchases.map((p, idx) => (
                <tr key={p.id} className="h-16 hover:bg-[#F8FAFC] transition-colors">
                  {/* No */}
                  <td className="px-3 py-2 text-center text-[#64748B] font-medium">
                    {startIndex + idx + 1}
                  </td>

                  {/* No Faktur & Tanggal */}
                  <td className="px-4 py-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md border border-[#E2E8F0] bg-white font-mono text-xs font-bold text-[#2563EB]">
                      {p.noNota}
                    </span>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                      {p.tanggal}
                    </div>
                  </td>

                  {/* Supplier */}
                  <td className="px-4 py-2">
                    <div className="font-semibold text-[#0F172A]">{p.supplier}</div>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                      {p.items.length} jenis item barang
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-4 py-2">
                    <span className="font-bold text-[#0F172A] text-xs sm:text-[13px]">
                      {formatRp(p.total)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    {p.status === "Lunas" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                        Lunas
                      </span>
                    )}
                    {p.status === "Belum Lunas" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#B91C1C]">
                        Belum Lunas
                      </span>
                    )}
                    {p.status === "Sebagian" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#B45309]">
                        Sebagian
                      </span>
                    )}
                  </td>

                  {/* Jatuh Tempo & Metode */}
                  <td className="px-4 py-2">
                    <div className="text-xs font-medium text-[#0F172A]">
                      {p.jatuhTempo !== "-" ? `Jatuh Tempo: ${p.jatuhTempo}` : "Tunai Langsung"}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      {p.metode}
                    </div>
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-2 text-right pr-6">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onView(p)}
                        className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                        title="Lihat Faktur"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(p)}
                        className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                        title="Edit Faktur"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(p)}
                        className="p-1.5 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Faktur"
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
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      {/* Empty State */}
      {purchases.length === 0 && (
        <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Data Faktur Tidak Ditemukan
          </h3>
          <p className="text-xs text-[#64748B] max-w-sm mt-1 mb-4">
            Tidak ada faktur pembelian yang cocok dengan filter atau kata kunci saat ini.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
            >
              Reset Filter
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
              <span>Faktur Baru</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer Paginasi */}
      {purchases.length > 0 && (
        <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] bg-white">
          <span>
            Menampilkan {startIndex + 1} -{" "}
            {Math.min(startIndex + pageSize, totalItems)} dari {totalItems} faktur
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              className="w-8 h-8 rounded border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    p === safeCurrentPage
                      ? "bg-[#2563EB] text-white shadow-2xs"
                      : "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              className="w-8 h-8 rounded border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
