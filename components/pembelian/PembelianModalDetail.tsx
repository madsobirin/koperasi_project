"use client";

import { PurchaseTransaction } from "@/lib/dummy-data";

interface PembelianModalDetailProps {
  tx: PurchaseTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onPrint?: () => void;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function PembelianModalDetail({
  tx,
  isOpen,
  onClose,
  onPrint,
}: PembelianModalDetailProps) {
  if (!isOpen || !tx) return null;

  const subtotal = tx.items.reduce(
    (acc, it) => acc + (it.qty || 0) * (it.price ?? it.harga ?? 0),
    0
  );
  const diskon = (tx as PurchaseTransaction & { diskon?: number }).diskon || 0;
  const grandTotal = tx.total;

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="16" height="12" x="1" y="3" rx="2"/>
                <path d="M17 8h4l3 3v4h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Faktur Pembelian #{tx.noNota}
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                {tx.supplier} • Bukti Pengadaan Stok
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs">
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Tanggal Faktur
              </span>
              <span className="font-semibold text-[#0F172A] mt-0.5 block">
                {tx.tanggal}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Status Bayar
              </span>
              <span
                className={`inline-block font-semibold mt-0.5 px-2 py-0.5 rounded text-[11px] ${
                  tx.status === "Lunas"
                    ? "bg-emerald-50 text-[#16A34A] border border-emerald-200"
                    : tx.status === "Belum Lunas"
                    ? "bg-rose-50 text-[#DC2626] border border-rose-200"
                    : "bg-amber-50 text-[#D97706] border border-amber-200"
                }`}
              >
                {tx.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Metode Bayar
              </span>
              <span className="font-semibold text-[#0F172A] mt-0.5 block">
                {tx.metode}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-semibold">
                Jatuh Tempo
              </span>
              <span className={`font-semibold mt-0.5 block ${tx.jatuhTempo !== "-" ? "text-[#DC2626]" : "text-[#64748B]"}`}>
                {tx.jatuhTempo || "-"}
              </span>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-[11px]">
                PT
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase font-semibold block">Distributor / Supplier</span>
                <span className="font-bold text-[#0F172A] text-sm">{tx.supplier}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#64748B] block">Gudang Koperasi</span>
              <span className="text-[11px] text-[#16A34A] font-semibold">Stok Terverifikasi Masuk</span>
            </div>
          </div>

          {/* Table Items */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Daftar Barang Pengadaan
            </h4>
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-2.5 px-3">Nama Barang / Deskripsi</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Harga Satuan</th>
                    <th className="py-2.5 px-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60">
                  {tx.items.map((it, idx) => {
                    const itemName = it.name || it.nama || "Barang";
                    const itemPrice = it.price ?? it.harga ?? 0;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 text-[#0F172A] font-medium">
                          {itemName}
                        </td>
                        <td className="py-2.5 px-3 text-center text-[#0F172A]">
                          {it.qty} {it.satuan || ""}
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#64748B]">
                          {formatRp(itemPrice)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-[#0F172A]">
                          {formatRp(it.qty * itemPrice)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Calculation Summary */}
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Subtotal Pembelian</span>
              <span>{formatRp(subtotal)}</span>
            </div>
            {diskon > 0 && (
              <div className="flex justify-between text-[#DC2626]">
                <span>Potongan / Diskon Supplier</span>
                <span>-{formatRp(diskon)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2E8F0]">
              <span>Total Tagihan Faktur</span>
              <span className="text-[#2563EB] text-base">{formatRp(grandTotal)}</span>
            </div>
          </div>

          {/* Notes */}
          {tx.keterangan && (
            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs">
              <span className="font-semibold text-amber-900 block mb-0.5">Catatan Faktur:</span>
              <p className="text-amber-800">{tx.keterangan}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer shadow-xs"
          >
            <svg className="w-3.5 h-3.5 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak Faktur</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
