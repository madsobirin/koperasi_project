"use client";

import { useState } from "react";
import { SavingsTransaction, MASTER_MEMBERS } from "@/lib/dummy-data";

interface SimpananModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (savings: SavingsTransaction) => void;
  initialData?: SavingsTransaction | null;
  nextSuggestedInvoice: string;
}

interface FormContentProps {
  onClose: () => void;
  onSave: (savings: SavingsTransaction) => void;
  initialData?: SavingsTransaction | null;
  nextSuggestedInvoice: string;
}

function FormContent({
  onClose,
  onSave,
  initialData,
  nextSuggestedInvoice,
}: FormContentProps) {
  const [tanggal, setTanggal] = useState(
    initialData
      ? initialData.tanggal
      : new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
  );
  const [noBukti, setNoBukti] = useState(
    initialData ? initialData.noBukti : nextSuggestedInvoice
  );

  // Selected member format: "code|name"
  const defaultMember = initialData
    ? `${initialData.anggotaKode}|${initialData.anggotaNama}`
    : `${MASTER_MEMBERS[0].code}|${MASTER_MEMBERS[0].name}`;
  const [memberSelection, setMemberSelection] = useState(defaultMember);

  const [jenis, setJenis] = useState<"Simpanan Wajib" | "Simpanan Pokok" | "Simpanan Sukarela">(
    initialData ? initialData.jenis : "Simpanan Wajib"
  );
  const [tipe, setTipe] = useState<"Setor" | "Tarik">(
    initialData ? initialData.tipe : "Setor"
  );
  const [nominal, setNominal] = useState<number>(
    initialData ? initialData.nominal : 50000
  );
  const [metode, setMetode] = useState<string>(
    initialData ? initialData.metode : "Kas Tunai"
  );
  const [keterangan, setKeterangan] = useState(
    initialData ? initialData.keterangan : "Setoran Simpanan Wajib Periode Okt 2026"
  );

  const isEdit = !!initialData;

  const handleTypeChange = (newType: "Simpanan Wajib" | "Simpanan Pokok" | "Simpanan Sukarela") => {
    setJenis(newType);
    if (!initialData) {
      if (newType === "Simpanan Wajib") {
        setNominal(50000);
        setKeterangan("Setoran Simpanan Wajib Periode Okt 2026");
      } else if (newType === "Simpanan Pokok") {
        setNominal(500000);
        setKeterangan("Simpanan Pokok Keanggotaan Koperasi");
      } else {
        setNominal(100000);
        setKeterangan("Simpanan Sukarela Anggota");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noBukti.trim() || nominal <= 0) return;

    const [memberCode, memberName] = memberSelection.split("|");
    const initials = memberName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    onSave({
      id: initialData ? initialData.id : Date.now(),
      noBukti: noBukti.toUpperCase().trim(),
      tanggal,
      jam: initialData
        ? initialData.jam
        : new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      anggotaNama: memberName,
      anggotaKode: memberCode,
      initials: initials || "AG",
      jenis,
      tipe,
      nominal: Number(nominal),
      keterangan: keterangan.trim() || `Transaksi ${jenis}`,
      metode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
      <div className="p-6 overflow-y-auto max-h-[72vh] space-y-4">
        {/* Row 1: Tanggal & No Bukti */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Tanggal Pembukuan
            </label>
            <input
              type="text"
              required
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              placeholder="05 Okt 2026"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nomor Kwitansi / Bukti
            </label>
            <input
              type="text"
              required
              value={noBukti}
              onChange={(e) => setNoBukti(e.target.value)}
              placeholder="SP-20261005-022"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] font-mono text-xs text-[#0F172A] uppercase focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>
        </div>

        {/* Row 2: Anggota Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Pilih Anggota Koperasi <span className="text-red-500">*</span>
          </label>
          <select
            value={memberSelection}
            onChange={(e) => setMemberSelection(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          >
            {MASTER_MEMBERS.map((m) => (
              <option key={m.id} value={`${m.code}|${m.name}`}>
                {m.name} — ({m.code}) • {m.status}
              </option>
            ))}
          </select>
        </div>

        {/* Row 3: Tipe Mutasi & Jenis Simpanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Tipe Transaksi Mutasi
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTipe("Setor")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  tipe === "Setor"
                    ? "bg-emerald-50 text-[#16A34A] border-emerald-300 ring-2 ring-emerald-100"
                    : "border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                }`}
              >
                + Setor Kas Masuk
              </button>
              <button
                type="button"
                onClick={() => setTipe("Tarik")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  tipe === "Tarik"
                    ? "bg-rose-50 text-[#DC2626] border-rose-300 ring-2 ring-rose-100"
                    : "border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                }`}
              >
                - Tarik Simpanan
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Jenis Simpanan
            </label>
            <select
              value={jenis}
              onChange={(e) =>
                handleTypeChange(
                  e.target.value as "Simpanan Wajib" | "Simpanan Pokok" | "Simpanan Sukarela"
                )
              }
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            >
              <option value="Simpanan Wajib">Simpanan Wajib [Rp 50.000 / bln]</option>
              <option value="Simpanan Pokok">Simpanan Pokok [Rp 500.000 awal]</option>
              <option value="Simpanan Sukarela">Simpanan Sukarela [Nominal Bebas]</option>
            </select>
          </div>
        </div>

        {/* Row 4: Nominal & Quick Buttons */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Nominal {tipe === "Setor" ? "Setoran" : "Penarikan"} (Rp) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-[#94A3B8] text-xs">
              Rp
            </span>
            <input
              type="number"
              min={1000}
              step={5000}
              required
              value={nominal}
              onChange={(e) => setNominal(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] font-semibold text-right text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[11px] text-[#94A3B8] mr-1">Cepat:</span>
            {[
              { label: "50rb", val: 50000 },
              { label: "100rb", val: 100000 },
              { label: "250rb", val: 250000 },
              { label: "500rb", val: 500000 },
              { label: "1 Jt", val: 1000000 },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => setNominal(btn.val)}
                className="px-2 py-1 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[11px] font-semibold text-[#475569] transition-colors cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 5: Metode Penyetoran */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Metode Pembayaran
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "Kas Tunai", label: "Kas Tunai Kasir" },
              { id: "Bank Mandiri", label: "Bank Mandiri" },
              { id: "Potong SHU", label: "Potong SHU / Gaji" },
            ].map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                  metode === m.id
                    ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] font-semibold ring-1 ring-[#2563EB]"
                    : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="metodeBayar"
                  checked={metode === m.id}
                  onChange={() => setMetode(m.id)}
                  className="w-3.5 h-3.5 text-[#2563EB] focus:ring-0"
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 6: Keterangan / Catatan */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Keterangan / Catatan Transaksi
          </label>
          <input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Contoh: Iuran Simpanan Wajib Periode Okt 2026"
            className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{isEdit ? "Perbarui Mutasi" : "Simpan Transaksi"}</span>
        </button>
      </div>
    </form>
  );
}

export default function SimpananModalForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  nextSuggestedInvoice,
}: SimpananModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-[#E2E8F0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                {initialData ? "Edit Transaksi Simpanan" : "Entri Transaksi Simpanan"}
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Pencatatan kas masuk dan mutasi simpanan anggota koperasi
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

        {/* Inner Form with key */}
        <FormContent
          key={initialData ? initialData.id : "new"}
          onClose={onClose}
          onSave={onSave}
          initialData={initialData}
          nextSuggestedInvoice={nextSuggestedInvoice}
        />
      </div>
    </div>
  );
}
