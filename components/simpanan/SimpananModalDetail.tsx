"use client";

import { SavingsTransaction } from "@/lib/dummy-data";

interface SimpananModalDetailProps {
  savings: SavingsTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onPrint?: () => void;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function SimpananModalDetail({
  savings,
  isOpen,
  onClose,
  onPrint,
}: SimpananModalDetailProps) {
  if (!isOpen || !savings) return null;

  const isSetor = savings.tipe === "Setor";

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
                <line x1="8" x2="16" y1="8" y2="8"/>
                <line x1="8" x2="16" y1="12" y2="12"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                {isSetor ? "Bukti Setoran Simpanan" : "Bukti Penarikan Simpanan"}
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Kwitansi Kas Masuk & Pembukuan Koperasi
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

        {/* Kwitansi Body */}
        <div className="p-6 space-y-4 text-xs text-[#0F172A]">
          {/* Header Lembaga */}
          <div className="text-center pb-2 border-b border-dashed border-[#CBD5E1]">
            <div className="text-xs uppercase tracking-widest text-[#2563EB] font-bold">
              KOPERASI SEJAHTERA BERSAMA
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Badan Hukum No: 518/BH/DISKOP/2020 • Jl. Koperasi Makmur No. 45
            </div>
            <div className="inline-block mt-2 font-mono font-bold text-xs bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded border border-blue-200">
              {savings.noBukti}
            </div>
          </div>

          {/* Details Card */}
          <div className="rounded-xl bg-[#F8FAFC] p-3.5 border border-[#E2E8F0] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Waktu Transaksi</span>
              <span className="font-semibold text-[#0F172A]">
                {savings.tanggal}, {savings.jam}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Nama Anggota</span>
              <span className="font-bold text-[#0F172A]">
                {savings.anggotaNama}{" "}
                <span className="text-[#2563EB] font-mono font-medium">({savings.anggotaKode})</span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Jenis Simpanan</span>
              <span className="font-semibold text-[#0F172A]">
                {savings.jenis}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Tipe Mutasi</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  isSetor
                    ? "bg-emerald-50 text-[#16A34A] border border-emerald-200"
                    : "bg-rose-50 text-[#DC2626] border border-rose-200"
                }`}
              >
                {isSetor ? "Setoran Kas Masuk" : "Penarikan Kas Keluar"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Metode Pembayaran</span>
              <span className="font-medium text-[#0F172A]">{savings.metode || "Kas Tunai Kasir"}</span>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-[#E2E8F0]">
              <span className="font-bold text-sm text-[#0F172A]">
                {isSetor ? "Total Disetor" : "Total Ditarik"}
              </span>
              <span
                className={`font-bold font-mono text-lg ${
                  isSetor ? "text-[#16A34A]" : "text-[#DC2626]"
                }`}
              >
                {formatRp(savings.nominal)}
              </span>
            </div>
          </div>

          {/* Catatan */}
          <div className="text-[11px] text-[#64748B] italic text-center p-2.5 bg-slate-50 rounded-lg border border-[#E2E8F0]">
            &quot;Catatan: {savings.keterangan || "Setoran simpanan terverifikasi"}&quot;
          </div>

          {/* Watermark sign */}
          <div className="pt-2 flex justify-between items-end text-[10px] text-[#94A3B8]">
            <div className="text-left">
              <div>Petugas Kasir</div>
              <div className="font-semibold text-[#0F172A] mt-5">Budi Pratama</div>
            </div>
            <div className="text-right">
              <div>Tanda Tangan Anggota</div>
              <div className="font-semibold text-[#0F172A] mt-5">{savings.anggotaNama}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak Kwitansi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
