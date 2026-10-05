"use client";

import { useState } from "react";
import { SaleTransaction } from "@/lib/dummy-data";

interface PenjualanTableProps {
  transactions: SaleTransaction[];
  onView: (tx: SaleTransaction) => void;
  onEdit: (tx: SaleTransaction) => void;
  onDelete: (tx: SaleTransaction) => void;
  onOpenCreate: () => void;
  onResetFilters: () => void;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

function formatDateIndo(dateStr: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parts[2];
    const month = months[parseInt(parts[1], 10) - 1] || "Jan";
    const year = parts[0];
    return `${day} ${month} ${year}`;
  }
  return dateStr;
}

export default function PenjualanTable({
  transactions,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
  onResetFilters,
}: PenjualanTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const totalItems = transactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedTxs = transactions.slice(startIndex, startIndex + pageSize);

  const calcTotalTx = (tx: SaleTransaction) => {
    const subtotal = tx.items.reduce((sum, it) => sum + it.qty * it.harga, 0);
    return Math.max(0, subtotal - (tx.diskon || 0));
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#E2E8F0] overflow-hidden">
      {/* Table Sub-header Bar */}
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#0F172A]">
            Daftar Transaksi Penjualan
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
            {totalItems} Data Ditemukan
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M16 21h5v-5"/>
          </svg>
          <span>Sinkronisasi Pembukuan Otomatis Terhubung</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] h-10 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              <th className="w-12 px-3 py-2 text-center">No</th>
              <th className="px-4 py-2">Tanggal &amp; Jam</th>
              <th className="px-4 py-2">No. Nota</th>
              <th className="px-4 py-2">Pelanggan</th>
              <th className="px-4 py-2">Total Transaksi</th>
              <th className="px-4 py-2">Status Pembayaran</th>
              <th className="px-4 py-2">Metode</th>
              <th className="px-4 py-2 text-right pr-6">Aksi</th>
            </tr>
          </thead>

          {transactions.length > 0 ? (
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {paginatedTxs.map((tx, idx) => {
                const totalAmount = calcTotalTx(tx);
                const isMember = tx.pelangganKode !== "NON";

                return (
                  <tr
                    key={tx.id}
                    className="h-16 hover:bg-[#F8FAFC] transition-colors"
                  >
                    {/* No */}
                    <td className="px-3 py-2 text-center text-[#64748B] font-medium">
                      {startIndex + idx + 1}
                    </td>

                    {/* Tanggal & Jam */}
                    <td className="px-4 py-2">
                      <div className="font-semibold text-[#0F172A]">
                        {formatDateIndo(tx.tanggal)}
                      </div>
                      <div className="text-[11px] text-[#94A3B8]">
                        {tx.jam} WIB
                      </div>
                    </td>

                    {/* No. Nota */}
                    <td className="px-4 py-2">
                      <span className="inline-block px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white font-mono text-xs font-bold text-[#2563EB] shadow-2xs">
                        {tx.nota}
                      </span>
                    </td>

                    {/* Pelanggan */}
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#0F172A]">
                            {tx.pelangganNama}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {isMember ? (
                            <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#2563EB]">
                              Anggota ({tx.pelangganKode})
                            </span>
                          ) : (
                            <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#F1F5F9] text-[#64748B]">
                              Umum
                            </span>
                          )}
                          <span className="text-[11px] text-[#94A3B8]">
                            {tx.items.length} jenis item belanja
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total Transaksi */}
                    <td className="px-4 py-2">
                      <span className="font-bold text-[#0F172A] text-xs sm:text-[13px]">
                        {formatRp(totalAmount)}
                      </span>
                    </td>

                    {/* Status Pembayaran */}
                    <td className="px-4 py-2">
                      {tx.status === "Lunas" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                          Lunas
                        </span>
                      )}
                      {tx.status === "Belum Lunas" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#B91C1C]">
                          Belum Lunas
                        </span>
                      )}
                      {tx.status === "Sebagian" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#B45309]">
                          Sebagian
                        </span>
                      )}
                    </td>

                    {/* Metode */}
                    <td className="px-4 py-2">
                      <div className="inline-flex flex-col items-center justify-center px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-semibold text-[#475569] leading-tight text-center">
                        {tx.metode === "Kas Tunai" && (
                          <>
                            <span>Kas</span>
                            <span>Tunai</span>
                          </>
                        )}
                        {tx.metode === "Kredit Anggota" && (
                          <>
                            <span className="text-purple-700">Kredit</span>
                            <span className="text-purple-700">Anggota</span>
                          </>
                        )}
                        {tx.metode === "Transfer Bank" && (
                          <>
                            <span className="text-[#2563EB]">Transfer</span>
                            <span className="text-[#2563EB]">Bank</span>
                          </>
                        )}
                        {tx.metode === "Potong Simpanan" && (
                          <>
                            <span>Potong</span>
                            <span>Simpanan</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-2 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onView(tx)}
                          className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                          title="Lihat Nota"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => onEdit(tx)}
                          className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors cursor-pointer"
                          title="Edit Transaksi"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(tx)}
                          className="p-1.5 text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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
              })}
            </tbody>
          ) : null}
        </table>
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Data Transaksi Tidak Ditemukan
          </h3>
          <p className="text-xs text-[#64748B] max-w-sm mt-1 mb-4">
            Tidak ada transaksi penjualan yang cocok dengan filter atau kata kunci saat ini.
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
              <span>Transaksi Baru</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Footer */}
      {transactions.length > 0 && (
        <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] bg-white">
          <span>
            Menampilkan {startIndex + 1} -{" "}
            {Math.min(startIndex + pageSize, totalItems)} dari {totalItems} data transaksi
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
