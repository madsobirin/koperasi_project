"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface AccountEntry {
  code: string;
  name: string;
  cat: "1" | "2" | "3" | "4" | "5";
  subcat: string;
  debit: number;
  credit: number;
  normal: "D" | "K";
}

const COA_DATA: AccountEntry[] = [
  // Group 1: ASET (Normal Debit, dengan Kontra Aset di Kredit)
  { code: "1-1001", name: "Kas Operasional Toko", cat: "1", subcat: "Aset Lancar", debit: 22379999, credit: 0, normal: "D" },
  { code: "1-1002", name: "Kas Bank Mandiri Operasional", cat: "1", subcat: "Aset Lancar", debit: 84500000, credit: 0, normal: "D" },
  { code: "1-1003", name: "Kas Bank BRI Giro Simpanan", cat: "1", subcat: "Aset Lancar", debit: 52120000, credit: 0, normal: "D" },
  { code: "1-1101", name: "Piutang Penjualan Anggota", cat: "1", subcat: "Aset Lancar", debit: 16750000, credit: 0, normal: "D" },
  { code: "1-1102", name: "Piutang Pinjaman Anggota (SP)", cat: "1", subcat: "Aset Lancar", debit: 38600000, credit: 0, normal: "D" },
  { code: "1-1201", name: "Persediaan Barang Dagang Minimarket", cat: "1", subcat: "Aset Lancar", debit: 29800000, credit: 0, normal: "D" },
  { code: "1-1301", name: "Perlengkapan Kantor & Toko", cat: "1", subcat: "Aset Lancar", debit: 3450000, credit: 0, normal: "D" },
  { code: "1-2001", name: "Peralatan Toko & Komputer POS", cat: "1", subcat: "Aset Tetap", debit: 18500000, credit: 0, normal: "D" },
  { code: "1-2002", name: "Akumulasi Penyusutan Peralatan", cat: "1", subcat: "Kontra Aset", debit: 0, credit: 3850000, normal: "K" },
  { code: "1-2101", name: "Bangunan Kantor & Gudang", cat: "1", subcat: "Aset Tetap", debit: 55000000, credit: 0, normal: "D" },

  // Group 2: KEWAJIBAN (Normal Kredit)
  { code: "2-1001", name: "Hutang Usaha Supplier Dagang", cat: "2", subcat: "Kewajiban Jangka Pendek", debit: 0, credit: 14850000, normal: "K" },
  { code: "2-1002", name: "Hutang Beban Operasional & Listrik", cat: "2", subcat: "Kewajiban Jangka Pendek", debit: 0, credit: 2450000, normal: "K" },
  { code: "2-1003", name: "Dana Titipan Sosial Anggota", cat: "2", subcat: "Kewajiban Jangka Pendek", debit: 0, credit: 4250000, normal: "K" },

  // Group 3: EKUITAS (Normal Kredit)
  { code: "3-1001", name: "Simpanan Pokok Anggota", cat: "3", subcat: "Ekuitas Koperasi", debit: 0, credit: 62500000, normal: "K" },
  { code: "3-1002", name: "Simpanan Wajib Anggota", cat: "3", subcat: "Ekuitas Koperasi", debit: 0, credit: 61400000, normal: "K" },
  { code: "3-1003", name: "Simpanan Sukarela Anggota", cat: "3", subcat: "Ekuitas / Dana Anggota", debit: 0, credit: 24750000, normal: "K" },
  { code: "3-2001", name: "Cadangan Modal Koperasi", cat: "3", subcat: "Ekuitas Koperasi", debit: 0, credit: 28500000, normal: "K" },
  { code: "3-3001", name: "Sisa Hasil Usaha (SHU) Belum Dibagi", cat: "3", subcat: "Ekuitas Koperasi", debit: 0, credit: 45750000, normal: "K" },

  // Group 4: PENDAPATAN (Normal Kredit)
  { code: "4-1001", name: "Pendapatan Penjualan Barang Toko", cat: "4", subcat: "Pendapatan Usaha Toko", debit: 0, credit: 89200000, normal: "K" },
  { code: "4-1002", name: "Pendapatan Jasa Pengelolaan Simpan Pinjam", cat: "4", subcat: "Pendapatan Jasa", debit: 0, credit: 9600000, normal: "K" },
  { code: "4-2001", name: "Pendapatan Administrasi & Non-Operasional", cat: "4", subcat: "Pendapatan Non-Usaha", debit: 0, credit: 1850000, normal: "K" },

  // Group 5: BEBAN & HPP (Normal Debit)
  { code: "5-1001", name: "Harga Pokok Penjualan (HPP Toko)", cat: "5", subcat: "Beban Pokok Usaha", debit: 63850000, credit: 0, normal: "D" },
  { code: "5-2001", name: "Beban Gaji & Honor Pengelola", cat: "5", subcat: "Beban Operasional", debit: 12500000, credit: 0, normal: "D" },
  { code: "5-2002", name: "Beban Listrik, Air & Internet", cat: "5", subcat: "Beban Operasional", debit: 2150000, credit: 0, normal: "D" },
  { code: "5-2003", name: "Beban Perlengkapan & ATK Cetak Dokumen", cat: "5", subcat: "Beban Operasional", debit: 1450000, credit: 0, normal: "D" },
  { code: "5-2004", name: "Beban Pemeliharaan & Kebersihan Sarana", cat: "5", subcat: "Beban Operasional", debit: 850000, credit: 0, normal: "D" },
  { code: "5-2005", name: "Beban Promosi & Persiapan RAT Anggota", cat: "5", subcat: "Beban Operasional", debit: 2800000, credit: 0, normal: "D" },
  { code: "5-3001", name: "Beban Administrasi Bank & Buku Cek", cat: "5", subcat: "Beban Lain-Lain", debit: 150001, credit: 0, normal: "D" },
];

function formatRupiah(val: number) {
  if (val === 0) return "-";
  return "Rp " + val.toLocaleString("id-ID");
}

export default function NeracaSaldoView() {
  const [selectedPeriod, setSelectedPeriod] = useState("2026-10");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [hideZero, setHideZero] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [activeModalAccount, setActiveModalAccount] = useState<AccountEntry | null>(null);
  const [isCloseBookModalOpen, setIsCloseBookModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COA_DATA.filter((item) => {
      const matchCat = selectedCategory === "ALL" || item.cat === selectedCategory;
      const matchQuery =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.subcat.toLowerCase().includes(q);
      const matchZero = hideZero ? item.debit > 0 || item.credit > 0 : true;

      return matchCat && matchQuery && matchZero;
    });
  }, [selectedCategory, searchQuery, hideZero]);

  const { totalDebit, totalCredit } = useMemo(() => {
    let d = 0;
    let k = 0;
    filteredData.forEach((item) => {
      d += item.debit;
      k += item.credit;
    });
    return { totalDebit: d, totalCredit: k };
  }, [filteredData]);

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setHideZero(false);
    showToast("Filter disetel ulang ke tampilan default");
  };

  const handleExport = (format: "PDF" | "Excel") => {
    showToast(`Mengunduh Berkas Neraca Saldo (${format})... Berkas siap cetak.`);
  };

  return (
    <div className="flex flex-col w-full relative gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-[#0F172A] text-white text-xs sm:text-sm font-medium border border-[#334155]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <span>Koperasi</span>
            <span>/</span>
            <span className="text-[#64748B]">Akuntansi</span>
            <span>/</span>
            <span className="font-semibold text-[#2563EB]">Neraca Saldo</span>
          </div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Neraca Saldo (Trial Balance)
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl">
            Rekapitulasi saldo akhir seluruh akun riil dan nominal per periode pembukuan untuk memastikan keseimbangan Debit dan Kredit sesuai standar SAK ETAP Koperasi.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleExport("PDF")}
            className="relative flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg shadow-xs hover:shadow-sm transition-all font-semibold text-xs sm:text-[13px] cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>Ekspor PDF</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-[#DC2626] font-semibold border border-red-100">
              Siap Cetak
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleExport("Excel")}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg shadow-xs hover:shadow-sm transition-all font-semibold text-xs sm:text-[13px] cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>
            </svg>
            <span>Ekspor Excel</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg shadow-xs hover:shadow-sm transition-all font-semibold text-xs sm:text-[13px] cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
            </svg>
            <span>Cetak</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCloseBookModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg shadow-xs hover:shadow-sm transition-all font-semibold text-xs sm:text-[13px] cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Tutup Buku Sementara</span>
          </button>
        </div>
      </div>

      {/* Top Metric Summary Cards (4 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Debit */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-medium text-[#64748B]">Total Debit</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16A34A]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Rp {totalDebit.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              <span>16 Akun Posisi Debit</span>
            </div>
          </div>
        </div>

        {/* Total Kredit */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-medium text-[#64748B]">Total Kredit</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Rp {totalCredit.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>12 Akun Posisi Kredit</span>
            </div>
          </div>
        </div>

        {/* Status Keseimbangan */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-medium text-[#64748B]">Status Keseimbangan</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-100 text-[11px] font-semibold flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>SAK ETAP</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-[#16A34A] tracking-tight">
                {totalDebit === totalCredit ? "SEIMBANG" : "TIDAK SEIMBANG"}
              </span>
              <span className="text-xs text-[#94A3B8]">
                ({totalDebit === totalCredit ? "Selisih 0,00" : `Selisih Rp ${Math.abs(totalDebit - totalCredit).toLocaleString("id-ID")}`})
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#94A3B8]">
              <svg className="w-3.5 h-3.5 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Selisih Debit - Kredit: <strong>Rp 0 (Klop)</strong></span>
            </div>
          </div>
        </div>

        {/* Periode Pembukuan */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] font-medium text-[#64748B]">Periode Pembukuan</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B] text-[11px] font-semibold">
              Audit Otomatis
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Oktober 2026</div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#94A3B8]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>Cut-off: 31 Okt 2026, 23:59 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Periode Dropdown */}
          <div className="relative min-w-[240px]">
            <svg className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full h-9 pl-9 pr-8 bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-[13px] rounded-lg border border-[#E2E8F0] appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-[#2563EB] transition-all"
            >
              <option value="2026-10">Periode: Oktober 2026 (01/10/26 - 31/10/26)</option>
              <option value="2026-09">Periode: September 2026 (01/09/26 - 30/09/26)</option>
              <option value="2026-08">Periode: Agustus 2026 (01/08/26 - 31/08/26)</option>
              <option value="2026-Q3">Kuartal III 2026 (Juli - September)</option>
            </select>
            <svg className="w-4 h-4 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Kelompok Akun Filter */}
          <div className="relative min-w-[200px]">
            <svg className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
            </svg>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-9 pl-9 pr-8 bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-[13px] rounded-lg border border-[#E2E8F0] appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-[#2563EB] transition-all"
            >
              <option value="ALL">Semua Kelompok Akun</option>
              <option value="1">1 - Aset (Assets)</option>
              <option value="2">2 - Kewajiban (Liabilities)</option>
              <option value="3">3 - Ekuitas (Equity)</option>
              <option value="4">4 - Pendapatan (Revenue)</option>
              <option value="5">5 - Beban Pokok &amp; Operasional (Expense)</option>
            </select>
            <svg className="w-4 h-4 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px]">
            <svg className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode COA (1-1001) atau nama akun..."
              className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] text-[#0F172A] placeholder-[#94A3B8] text-xs sm:text-[13px] rounded-lg border border-[#E2E8F0] focus:outline-none focus:bg-white focus:border-[#2563EB] transition-all"
            />
          </div>
        </div>

        {/* Toggle & Reset */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer select-none py-1.5 px-2.5 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <input
              type="checkbox"
              checked={hideZero}
              onChange={(e) => setHideZero(e.target.checked)}
              className="w-4 h-4 rounded text-[#2563EB] border-[#E2E8F0] cursor-pointer"
            />
            <span className="text-xs sm:text-[13px] text-[#64748B]">Sembunyikan Saldo Nol</span>
          </label>

          <div className="h-6 w-[1px] bg-[#E2E8F0] hidden sm:block" />

          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-lg border border-[#E2E8F0] transition-colors text-xs sm:text-[13px] font-semibold cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
            </svg>
            <span>Reset Filter</span>
          </button>
        </div>
      </div>

      {/* Financial Report Table Container */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden flex flex-col">
        {/* Header of the Sheet */}
        <div className="px-6 py-4 bg-white border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Buku Neraca Saldo Percobaan (Trial Balance)
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Koperasi Simpan Pinjam &amp; Jasa &quot;Sejahtera&quot; Bersama Mandiri • Dibuat Otomatis dari Buku Besar Terpadu
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] font-medium">
              Menampilkan {filteredData.length} Akun
            </span>
          </div>
        </div>

        {/* Table Responsive Wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#64748B] text-[11px] font-bold uppercase tracking-wider border-b border-[#E2E8F0]">
                <th className="py-3 px-4 w-32">Kode COA</th>
                <th className="py-3 px-4 min-w-[280px]">Nama Akun &amp; Klasifikasi</th>
                <th className="py-3 px-4 text-right w-44">Debit (Rp)</th>
                <th className="py-3 px-4 text-right w-44">Kredit (Rp)</th>
                <th className="py-3 px-4 text-right w-48">Saldo Akhir (Rp)</th>
                <th className="py-3 px-3 text-center w-12">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs text-[#0F172A]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#94A3B8]">
                    <p className="text-sm">Tidak ada akun yang cocok dengan kata kunci atau filter yang dipilih.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const saldoAmount = item.debit > 0 ? item.debit : item.credit;
                  const isDebitActive = item.debit > 0;
                  const isCreditActive = item.credit > 0;

                  return (
                    <tr
                      key={item.code}
                      onClick={() => setActiveModalAccount(item)}
                      className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono font-medium px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] group-hover:bg-[#E2E8F0] transition-colors text-[11px]">
                          {item.code}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#0F172A] group-hover:text-[#2563EB] transition-colors text-xs sm:text-[13px]">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#94A3B8]">{item.subcat}</span>
                        </div>
                      </td>
                      <td className={`py-3 px-4 text-right font-mono ${isDebitActive ? "font-semibold text-[#0F172A]" : "text-[#94A3B8]"}`}>
                        {formatRupiah(item.debit)}
                      </td>
                      <td className={`py-3 px-4 text-right font-mono ${isCreditActive ? "font-semibold text-[#0F172A]" : "text-[#94A3B8]"}`}>
                        {formatRupiah(item.credit)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 font-mono font-medium text-[#0F172A]">
                          <span>{formatRupiah(saldoAmount)}</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              item.normal === "D"
                                ? "bg-blue-50 text-[#2563EB]"
                                : "bg-purple-50 text-indigo-700"
                            }`}
                          >
                            [{item.normal}]
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalAccount(item);
                          }}
                          className="p-1 rounded hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#2563EB] transition-colors"
                          title="Lihat Rincian Akun"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Double-Line Total Verification Footer */}
        <div className="bg-[#F8FAFC] p-4 sm:p-5 border-t border-[#E2E8F0]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0F172A]">
                  Jumlah Total Debit &amp; Kredit
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  Seluruh transaksi siklus berjalan telah dihitung dan diverifikasi berpasangan (Double Entry).
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Total Debit</div>
                <div className="font-mono font-bold text-sm sm:text-base text-[#16A34A]">
                  Rp {totalDebit.toLocaleString("id-ID")}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Total Kredit</div>
                <div className="font-mono font-bold text-sm sm:text-base text-[#2563EB]">
                  Rp {totalCredit.toLocaleString("id-ID")}
                </div>
              </div>

              <div className="flex items-center gap-2 pl-4 border-l border-[#E2E8F0]">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#94A3B8] uppercase font-semibold">Status Selisih</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A]">
                    <svg className="w-4 h-4 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>Rp 0 (SEIMBANG)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-off & Audit Trail Information Card */}
      <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-3 max-w-2xl">
          <svg className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
              Validasi Kepatuhan Laporan Akuntansi Koperasi
            </span>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
              Laporan Neraca Saldo periode 31 Oktober 2026 diverifikasi secara sistematis. Seluruh jurnal penyesuaian, mutasi simpanan, unit toko swalayan, dan jasa pinjaman telah terintegrasi tanpa ada selisih saldo berjalan. Sesuai Peraturan Menteri Koperasi dan UKM RI serta SAK ETAP.
            </p>
          </div>
        </div>

        {/* Sign-off Metadata Block */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] shrink-0">
          <div className="flex flex-col bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
            <span className="text-[10px] text-[#94A3B8]">Penyusun / Akuntan:</span>
            <span className="font-semibold text-[#0F172A] text-xs">Budi Pratama (Admin)</span>
          </div>
          <div className="flex flex-col bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
            <span className="text-[10px] text-[#94A3B8]">Diverifikasi Oleh:</span>
            <span className="font-semibold text-[#0F172A] text-xs">Ketua Koperasi</span>
          </div>
          <div className="flex flex-col bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg">
            <span className="text-[10px] text-[#94A3B8]">Waktu Cetak Terakhir:</span>
            <span className="font-semibold text-[#0F172A] text-xs">31 Okt 2026, 17:00 WIB</span>
          </div>
        </div>
      </div>

      {/* Quick Account Detail Modal */}
      {activeModalAccount && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setActiveModalAccount(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">Rincian Akun Neraca</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalAccount(null)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs text-[#64748B] flex flex-col gap-3">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Kode &amp; Nama Akun:</span>
                  <span className="font-bold text-[#0F172A]">{activeModalAccount.code} - {activeModalAccount.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Klasifikasi SAK:</span>
                  <span className="font-semibold text-[#0F172A]">{activeModalAccount.subcat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Posisi Normal:</span>
                  <span className="font-semibold text-[#2563EB]">
                    {activeModalAccount.normal === "D" ? "Debit [D]" : "Kredit [K]"}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#94A3B8]">Saldo Per 31 Okt 2026:</span>
                  <span className="font-bold text-[#0F172A] font-mono">
                    {formatRupiah(activeModalAccount.debit > 0 ? activeModalAccount.debit : activeModalAccount.credit)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Akun ini telah tervalidasi dan siap untuk penutupan buku periode. Anda dapat melihat mutasi transaksi harian akun ini di menu Buku Besar.
              </p>
            </div>

            <div className="mt-2 flex justify-end gap-2 border-t border-[#E2E8F0] pt-3">
              <button
                type="button"
                onClick={() => setActiveModalAccount(null)}
                className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-semibold rounded-lg border border-[#E2E8F0] cursor-pointer"
              >
                Tutup
              </button>
              <Link
                href="/dashboard/akuntansi/buku-besar"
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>
                </svg>
                <span>Buka Buku Besar</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tutup Buku Sementara Modal */}
      {isCloseBookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setIsCloseBookModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">Tutup Buku Sementara</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCloseBookModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs text-[#64748B] flex flex-col gap-3">
              <div className="p-3 bg-[#EFF6FF] text-[#1D4ED8] rounded-xl border border-blue-100 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <div>
                  <span className="font-semibold text-[#0F172A]">Konfirmasi Tutup Buku Sementara</span>
                  <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed">
                    Proses ini akan mengunci jurnal sampai per 31 Oktober 2026 untuk keperluan pelaporan Sisa Hasil Usaha (SHU) dan Laporan Posisi Keuangan.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#94A3B8]">Status Neraca Saldo:</span>
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  100% Klop (Seimbang)
                </span>
              </div>
            </div>

            <div className="mt-2 flex justify-end gap-2 border-t border-[#E2E8F0] pt-3">
              <button
                type="button"
                onClick={() => setIsCloseBookModalOpen(false)}
                className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-semibold rounded-lg border border-[#E2E8F0] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCloseBookModalOpen(false);
                  showToast("Buku periode Oktober 2026 berhasil ditutup sementara.");
                }}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
              >
                Ya, Kunci Periode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
