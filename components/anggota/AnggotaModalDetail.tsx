"use client";

import { MemberMaster } from "@/lib/dummy-data";

interface AnggotaModalDetailProps {
  member: MemberMaster | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AnggotaModalDetail({
  member,
  isOpen,
  onClose,
}: AnggotaModalDetailProps) {
  if (!isOpen || !member) return null;

  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Kartu Anggota Koperasi</h3>
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
        <div className="p-6 space-y-5">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="w-14 h-14 rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold text-xl flex items-center justify-center shrink-0 border border-blue-200">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-[#0F172A] truncate">
                  {member.name}
                </span>
                {member.status === "Aktif" && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                    Aktif
                  </span>
                )}
                {member.status === "Non-Aktif" && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-[#DC2626] border border-red-200">
                    Non-Aktif
                  </span>
                )}
                {member.status === "Menunggu Verifikasi" && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#B45309] border border-amber-200">
                    Menunggu Verifikasi
                  </span>
                )}
              </div>
              <span className="text-xs text-[#94A3B8] font-mono mt-0.5">
                No. Anggota: <strong className="text-[#0F172A]">{member.code}</strong>
              </span>
              <span className="text-xs text-[#2563EB] mt-0.5">
                {member.email}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block mb-1 font-medium">
                NIK KTP
              </span>
              <span className="font-semibold text-[#0F172A]">
                {member.nik || "3271041988010002"}
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block mb-1 font-medium">
                Jenis Kelamin
              </span>
              <span className="font-semibold text-[#0F172A]">
                {member.gender}
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block mb-1 font-medium">
                Tanggal Bergabung
              </span>
              <span className="font-semibold text-[#0F172A]">
                {member.date}
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block mb-1 font-medium">
                Buku Tabungan
              </span>
              <span className="font-semibold text-[#16A34A]">
                {member.depositStatus || "Terdaftar Aktif"}
              </span>
            </div>
          </div>

          {/* Ledger Financial Summary Card */}
          <div className="p-3.5 rounded-lg bg-[#EFF6FF] border border-blue-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#64748B]">Total Akumulasi Simpanan</span>
              <span className="text-lg font-bold text-[#2563EB]">
                {member.totalDeposit || "Rp 4.250.000"}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100/60 text-[#2563EB] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
