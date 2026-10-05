"use client";

import { MemberMaster } from "@/lib/dummy-data";

interface AnggotaModalDeleteProps {
  member: MemberMaster | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AnggotaModalDelete({
  member,
  isOpen,
  onClose,
  onConfirm,
}: AnggotaModalDeleteProps) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-[#DC2626] border border-red-100 mx-auto flex items-center justify-center mb-4">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">Hapus Data Anggota?</h3>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-2">
            Anda akan menghapus data anggota{" "}
            <strong className="text-[#0F172A] font-semibold">{member.name}</strong> (
            <span className="font-mono text-[#2563EB] font-bold">{member.code}</span>
            ). Tindakan ini akan membatalkan seluruh hak keanggotaan aktif.
          </p>
        </div>
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#0F172A] transition-colors w-1/2 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white text-xs font-semibold transition-colors w-1/2 shadow-xs cursor-pointer"
          >
            Ya, Hapus Data
          </button>
        </div>
      </div>
    </div>
  );
}
