"use client";

import { SaleTransaction } from "@/lib/dummy-data";

interface PenjualanModalDetailProps {
  tx: SaleTransaction | null;
  isOpen: boolean;
  onClose: () => void;
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

export default function PenjualanModalDetail({
  tx,
  isOpen,
  onClose,
}: PenjualanModalDetailProps) {
  if (!isOpen || !tx) return null;

  const subtotal = tx.items.reduce((sum, it) => sum + it.qty * it.harga, 0);
  const grandTotal = Math.max(0, subtotal - (tx.diskon || 0));
  const isMember = tx.pelangganKode !== "NON";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
                <line x1="8" x2="16" y1="8" y2="8"/>
                <line x1="8" x2="16" y1="12" y2="12"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Nota Transaksi #{tx.nota}
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Struk resmi bukti transaksi penjualan koperasi
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] rounded p-1 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Informasi Pembeli
              </span>
              <div className="font-bold text-[#0F172A] mt-0.5">
                {tx.pelangganNama}
              </div>
              <div className="text-[11px] text-[#2563EB] font-medium mt-0.5">
                {isMember ? `Anggota (${tx.pelangganKode})` : "Pelanggan Umum"}
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Waktu &amp; Status
              </span>
              <div className="font-bold text-[#0F172A] mt-0.5">
                {formatDateIndo(tx.tanggal)}, {tx.jam} WIB
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {tx.status === "Lunas" && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                    Lunas
                  </span>
                )}
                {tx.status === "Belum Lunas" && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#FEE2E2] text-[#B91C1C]">
                    Belum Lunas
                  </span>
                )}
                {tx.status === "Sebagian" && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#B45309]">
                    Sebagian
                  </span>
                )}
                <span className="text-[11px] text-[#64748B]">
                  • {tx.metode}
                </span>
              </div>
            </div>
          </div>

          {/* Item Table */}
          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                <tr>
                  <th className="py-2.5 px-3">Nama Produk / Sembako</th>
                  <th className="py-2.5 px-3 text-center">Satuan</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Harga</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {tx.items.map((item, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC]">
                    <td className="py-2.5 px-3 font-medium text-[#0F172A]">
                      {item.nama}
                    </td>
                    <td className="py-2.5 px-3 text-center text-[#64748B]">
                      {item.satuan}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-[#0F172A]">
                      {item.qty}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[#64748B]">
                      {formatRp(item.harga)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#0F172A]">
                      {formatRp(item.qty * item.harga)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Calculation */}
          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Subtotal Belanja:</span>
              <span className="font-semibold text-[#0F172A]">{formatRp(subtotal)}</span>
            </div>
            {tx.diskon > 0 && (
              <div className="flex justify-between text-[#DC2626]">
                <span>Diskon Anggota:</span>
                <span className="font-semibold">- {formatRp(tx.diskon)}</span>
              </div>
            )}
            <div className="border-t border-[#E2E8F0] pt-1.5 flex justify-between text-sm font-bold text-[#0F172A]">
              <span>Total Pembayaran:</span>
              <span className="text-[#2563EB] text-base">{formatRp(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak Struk / Nota</span>
          </button>
        </div>
      </div>
    </div>
  );
}
