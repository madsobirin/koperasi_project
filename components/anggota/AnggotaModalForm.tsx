"use client";

import { useState } from "react";
import { MemberMaster } from "@/lib/dummy-data";

function formatDateToInput(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const months: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
  };
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]] || "01";
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split("T")[0];
}

function formatDateToDisplay(dateInput: string): string {
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
  const parts = dateInput.split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    return `${day} ${months[monthIdx] || "Jan"} ${year}`;
  }
  return dateInput;
}

interface AnggotaModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Omit<MemberMaster, "id"> & { id?: number }) => void;
  initialData?: MemberMaster | null;
  nextSuggestedCode: string;
}

interface FormContentProps {
  onClose: () => void;
  onSave: (memberData: Omit<MemberMaster, "id"> & { id?: number }) => void;
  initialData?: MemberMaster | null;
  nextSuggestedCode: string;
}

function FormContent({
  onClose,
  onSave,
  initialData,
  nextSuggestedCode,
}: FormContentProps) {
  const [code, setCode] = useState(
    initialData ? initialData.code : nextSuggestedCode
  );
  const [nik, setNik] = useState(
    initialData?.nik || "3271041988010002"
  );
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [email, setEmail] = useState(initialData ? initialData.email : "");
  const [gender, setGender] = useState<"Laki-laki" | "Perempuan">(
    initialData ? initialData.gender : "Laki-laki"
  );
  const [status, setStatus] = useState<
    "Aktif" | "Non-Aktif" | "Menunggu Verifikasi"
  >(initialData ? initialData.status : "Aktif");
  const [date, setDate] = useState(
    initialData?.date
      ? formatDateToInput(initialData.date)
      : new Date().toISOString().split("T")[0]
  );

  const isEdit = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim() || !email.trim()) return;

    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      code: code.trim(),
      nik: nik.trim(),
      name: name.trim(),
      email: email.trim(),
      gender,
      status,
      date: formatDateToDisplay(date),
      depositStatus: initialData?.depositStatus || "Simpanan Pokok Lunas",
      totalDeposit: initialData?.totalDeposit || "Rp 500.000",
    });

    onClose();
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" x2="19" y1="8" y2="14"/>
              <line x1="22" x2="16" y1="11" y2="11"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">
            {isEdit ? "Edit Data Anggota" : "Tambah Anggota Baru"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[#94A3B8] hover:text-[#0F172A] rounded p-1 transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* No. Anggota */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
              Nomor Anggota <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Misal: A009"
              className="w-full h-[38px] px-3 font-mono font-bold rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          {/* NIK */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#64748B]">
              NIK (Nomor Induk Kependudukan)
            </label>
            <input
              type="text"
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="16 digit NIK"
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>
        </div>

        {/* Nama Lengkap */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
            Nama Lengkap Anggota <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap sesuai KTP"
            className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          />
        </div>

        {/* Alamat Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
            Alamat Email <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama.lengkap@email.com"
            className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          />
        </div>

        {/* Gender & Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
              Jenis Kelamin <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "Laki-laki" | "Perempuan")}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
              Status Keanggotaan <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Aktif" | "Non-Aktif" | "Menunggu Verifikasi")
              }
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer"
            >
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            </select>
          </div>
        </div>

        {/* Tanggal Daftar */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
            Tanggal Terdaftar <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            <span>Simpan Anggota</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AnggotaModalForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  nextSuggestedCode,
}: AnggotaModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <FormContent
        key={initialData ? initialData.id : "new-member"}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
        nextSuggestedCode={nextSuggestedCode}
      />
    </div>
  );
}
