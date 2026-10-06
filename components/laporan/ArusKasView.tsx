"use client";

import { useState } from "react";

interface ToastState {
  title: string;
  desc?: string;
}

export default function ArusKasView() {
  const [selectedPeriod, setSelectedPeriod] = useState("ytd_okt2026");
  const [isAuditPanelOpen, setIsAuditPanelOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeCalkNote, setActiveCalkNote] = useState<string | null>(null);

  const showToast = (title: string, desc?: string) => {
    setToast({ title, desc });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handlePeriodChange = (val: string) => {
    setSelectedPeriod(val);
    const labelMap: Record<string, string> = {
      ytd_okt2026: "01 Jan 2026 - 31 Okt 2026 (YTD)",
      m_okt2026: "Bulan Berjalan (Oktober 2026)",
      q3_2026: "Kuartal III 2026",
      fy_2025: "Tahun Buku Komparatif 2025",
    };
    showToast(`Memuat data untuk periode: ${labelMap[val] || val}`);
  };

  const handleExport = (type: "PDF" | "Excel") => {
    showToast(
      `Menyiapkan berkas ekspor ${type} Laporan Arus Kas...`,
      "Memformat tabel berstandar SAK ETAP"
    );
    setTimeout(() => {
      showToast(
        `Berkas Laporan_Arus_Kas_Okt2026.${type.toLowerCase() === "pdf" ? "pdf" : "xlsx"} siap diunduh!`
      );
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-3 px-4 py-3 bg-[#0F172A] text-white rounded-xl shadow-xl border border-slate-700 max-w-md">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-semibold">{toast.title}</span>
            {toast.desc && <span className="text-[11px] text-slate-300">{toast.desc}</span>}
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* TOP HEADER & CONTROLS SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB]">
              SAK ETAP Koperasi
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#16A34A] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              Audit-Ready 2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#64748B]">
              Terintegrasi Buku Kas &amp; Neraca
            </span>
          </div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight pt-1">
            Laporan Arus Kas{" "}
            <span className="font-normal text-[#64748B] text-lg lg:text-xl">
              (Statement of Cash Flows)
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl">
            Metode Langsung (Direct Method) — Arus Kas Masuk &amp; Keluar dari Aktivitas Operasi, Investasi, dan Pendanaan Periode 01 Januari s.d. 31 Oktober 2026.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-1">
            <svg className="w-4 h-4 text-[#94A3B8] ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="bg-transparent text-[#0F172A] text-xs sm:text-[13px] px-2.5 py-1.5 focus:outline-hidden cursor-pointer font-medium"
            >
              <option value="ytd_okt2026">01 Jan 2026 - 31 Okt 2026 (YTD)</option>
              <option value="m_okt2026">Bulan Berjalan (Oktober 2026)</option>
              <option value="q3_2026">Kuartal III 2026</option>
              <option value="fy_2025">Tahun Buku Komparatif 2025</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg text-xs sm:text-[13px] font-semibold shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            <span>Cetak</span>
          </button>

          <button
            type="button"
            onClick={() => handleExport("PDF")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg text-xs sm:text-[13px] font-semibold shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <span>Ekspor PDF</span>
          </button>

          <button
            type="button"
            onClick={() => handleExport("Excel")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs sm:text-[13px] font-semibold shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Ekspor Excel</span>
          </button>
        </div>
      </div>

      {/* 4 FINANCIAL KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CFO */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] text-[#64748B] font-medium">
              Kas Bersih Operasi (CFO)
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[22px] font-bold text-[#16A34A] font-mono">
              +Rp 4.300.000
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center text-[11px] font-bold text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded">
                ↑ +4,88%
              </span>
              <span className="text-[11px] text-[#94A3B8]">vs 2025 (Rp 4.100.000)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 bg-[#F8FAFC] border-t border-[#F1F5F9] -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#64748B]">Surplus Operasional Toko</span>
            <span className="text-[11px] font-semibold text-[#2563EB]">Sehat</span>
          </div>
        </div>

        {/* Card 2: CFI */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] text-[#64748B] font-medium">
              Kas Bersih Investasi (CFI)
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#DC2626] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[22px] font-bold text-[#DC2626] font-mono">
              -Rp 4.500.000
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                Pengadaan
              </span>
              <span className="text-[11px] text-[#94A3B8]">Hardware POS Kasir &amp; Rak</span>
            </div>
          </div>
          <div className="mt-3 pt-3 bg-[#F8FAFC] border-t border-[#F1F5F9] -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#64748B]">Belanja Modal (Capex)</span>
            <span className="text-[11px] font-semibold text-[#64748B]">Aset Produktif</span>
          </div>
        </div>

        {/* Card 3: CFF */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-[13px] text-[#64748B] font-medium">
              Kas Bersih Pendanaan (CFF)
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
                <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                <circle cx="16" cy="11" r="1" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[22px] font-bold text-[#2563EB] font-mono">
              +Rp 16.700.000
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center text-[11px] font-bold text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded">
                ↑ +51,8%
              </span>
              <span className="text-[11px] text-[#94A3B8]">Net Setoran Anggota</span>
            </div>
          </div>
          <div className="mt-3 pt-3 bg-[#F8FAFC] border-t border-[#F1F5F9] -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#64748B]">Setelah Bagi SHU Rp 4.0jt</span>
            <span className="text-[11px] font-semibold text-[#16A34A]">Likuid</span>
          </div>
        </div>

        {/* Card 4: Ending Cash Balance */}
        <div className="bg-linear-to-br from-[#2563EB] to-[#1D4ED8] text-white rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-white">
            <span className="text-xs sm:text-[13px] text-blue-100 font-medium">
              Saldo Kas Akhir Periode
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[22px] font-bold tracking-tight font-mono">
              Rp 159.000.000
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-white">
              <span className="inline-flex items-center text-[11px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                Δ +Rp 16.500.000
              </span>
              <span className="text-[11px] text-blue-100">Kenaikan Net Kas</span>
            </div>
          </div>
          <div className="mt-3 pt-3 bg-black/15 -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between text-white border-t border-white/10">
            <span className="text-[11px] text-blue-100">Klop dengan Neraca</span>
            <span className="text-[11px] font-bold bg-white text-[#2563EB] px-2 py-0.5 rounded">
              KLOP 100%
            </span>
          </div>
        </div>
      </div>

      {/* RECONCILIATION INTEGRITY BANNER */}
      <div className="bg-emerald-50 border border-emerald-200 text-[#0F172A] rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-[#16A34A]">
                Rekonsiliasi Integritas Kas Terverifikasi (VALIDATED)
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-[#16A34A] text-[11px] font-bold rounded">
                Selisih: Rp 0
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Seluruh mutasi penerimaan dan pengeluaran kas telah dikonfirmasi dengan Jurnal Umum Kas, Buku Besar Rekening Bank &amp; Kas Toko, serta sinkron 100% dengan Laporan Posisi Keuangan (Rp 159.000.000).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <div className="text-right">
            <div className="text-[11px] text-[#94A3B8]">Waktu Validasi Sistem</div>
            <div className="text-xs font-semibold text-[#0F172A]">31 Okt 2026 • 23:59:59 WIB</div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuditPanelOpen(!isAuditPanelOpen)}
            className="px-3 py-1.5 bg-white text-[#16A34A] hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {isAuditPanelOpen ? "Tutup Audit" : "Detail Audit"}
          </button>
        </div>
      </div>

      {/* AUDIT LOG EXPANDABLE PANEL */}
      {isAuditPanelOpen && (
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="m9 15 2 2 4-4" />
              </svg>
              <span className="text-sm font-bold text-[#0F172A]">
                Jejak Audit Otomatis (Automatic Cash Cross-Check)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuditPanelOpen(false)}
              className="text-[#94A3B8] hover:text-[#0F172A] p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-1">
              <span className="text-[11px] text-[#94A3B8]">1. Saldo Awal per Posisi Keuangan</span>
              <div className="text-sm font-bold text-[#0F172A] font-mono">Rp 142.500.000</div>
              <div className="text-[11px] text-[#16A34A] font-medium">✓ Sesuai Audit 31 Des 2025</div>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-1">
              <span className="text-[11px] text-[#94A3B8]">2. Total Kenaikan Arus Kas Bersih</span>
              <div className="text-sm font-bold text-[#16A34A] font-mono">+Rp 16.500.000</div>
              <div className="text-[11px] text-[#16A34A] font-medium">✓ CFO + CFI + CFF Klop</div>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-1">
              <span className="text-[11px] text-[#94A3B8]">3. Saldo Kas &amp; Bank per Rekening Koran</span>
              <div className="text-sm font-bold text-[#2563EB] font-mono">Rp 159.000.000</div>
              <div className="text-[11px] text-[#16A34A] font-medium">✓ Rekonsiliasi Bank Klop 100%</div>
            </div>
          </div>
        </div>
      )}

      {/* FORMAL ACCOUNTING STATEMENT PAPER (SHEET STYLING) */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 lg:p-10 space-y-8">
        {/* INSTITUTION FORMAL LETTERHEAD */}
        <div className="text-center space-y-2 pb-6 bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M3 10h18" />
                <path d="m5 6 7-3 7 3" />
                <path d="M4 10v11" />
                <path d="M20 10v11" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight leading-tight">
                KOPERASI KONSUMEN SEJAHTERA BERSAMA
              </h2>
              <p className="text-[11px] text-[#64748B] font-medium">
                BADAN HUKUM NO: AHU-0004128.AH.01.26.TAHUN 2021 • NIK: 3271040080001
              </p>
            </div>
          </div>
          <div className="pt-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2563EB] tracking-wide uppercase">
              LAPORAN ARUS KAS (STATEMENT OF CASH FLOWS)
            </h3>
            <p className="text-xs sm:text-sm text-[#0F172A] font-semibold">
              Untuk Periode yang Berakhir pada 31 Oktober 2026
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              (Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik / SAK ETAP Koperasi • Disajikan dalam Rupiah [Rp] • Metode Langsung)
            </p>
          </div>
        </div>

        {/* MAIN STATEMENT TABLE */}
        <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
          <table className="w-full text-left text-xs sm:text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#64748B] uppercase text-[11px] font-bold tracking-wider border-b border-[#E2E8F0]">
                <th className="py-3 px-4 w-28">KODE POS</th>
                <th className="py-3 px-4">URAIAN ARUS KAS</th>
                <th className="py-3 px-3 text-center w-24">REF CALK</th>
                <th className="py-3 px-4 text-right w-56">REALISASI S.D. OKT 2026 (RP)</th>
                <th className="py-3 px-4 text-right w-52 text-[#64748B]">KOMPARATIF 2025 (RP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] font-normal">
              {/* SECTION A: OPERATING CASH FLOW */}
              <tr className="bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-[#2563EB] flex items-center gap-2" colSpan={5}>
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  <span>A. ARUS KAS DARI AKTIVITAS OPERASI</span>
                </td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.01</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penerimaan Kas dari Penjualan Toko &amp; Pelanggan</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 14: Realisasi kas penjualan toko minimarket.")}>Cat. 14</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-semibold">89.200.000</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">78.400.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.02</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penerimaan Kas dari Jasa Pengelolaan Simpan Pinjam</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 15: Realisasi penerimaan jasa administrasi dan bunga pinjaman.")}>Cat. 15</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-semibold">9.600.000</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">8.450.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.03</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penerimaan Pendapatan Operasional Lainnya &amp; Konsinyasi</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 16: Pendapatan titipan penjualan konsinyasi dan administrasi.")}>Cat. 16</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-semibold">1.850.000</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">1.600.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors text-[#DC2626]">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.04</td>
                <td className="py-2 px-4 text-[#0F172A]">(Pembayaran Kas kepada Supplier / Pengadaan Barang Dagang)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 17: Pengeluaran pelunasan faktur supplier barang minimarket.")}>Cat. 17</td>
                <td className="py-2 px-4 text-right font-mono font-medium text-[#DC2626]">(67.150.000)</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(58.900.000)</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors text-[#DC2626]">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.05</td>
                <td className="py-2 px-4 text-[#0F172A]">(Pembayaran Kas untuk Beban Gaji &amp; Operasional Karyawan)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 18: Beban gaji 4 pengelola dan kasir toko.")}>Cat. 18</td>
                <td className="py-2 px-4 text-right font-mono font-medium text-[#DC2626]">(14.650.000)</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(12.950.000)</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors text-[#DC2626]">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.01.06</td>
                <td className="py-2 px-4 text-[#0F172A]">(Pembayaran Kas untuk Beban Administrasi, Pajak &amp; Lainnya)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 19: Listrik, internet, cetak RAT, dan administrasi bank.")}>Cat. 19</td>
                <td className="py-2 px-4 text-right font-mono font-medium text-[#DC2626]">(14.550.000)</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(12.500.000)</td>
              </tr>

              {/* SUB-TOTAL A */}
              <tr className="bg-[#F8FAFC] font-semibold border-y border-[#E2E8F0]">
                <td className="py-2.5 px-4 text-[11px] text-[#94A3B8] font-mono">TOT.A</td>
                <td className="py-2.5 px-4 text-[#0F172A] font-bold">Arus Kas Bersih Diperoleh dari Aktivitas Operasi</td>
                <td className="py-2.5 px-3 text-center"></td>
                <td className="py-2.5 px-4 text-right font-mono text-[#16A34A] font-bold text-sm">
                  4.300.000
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-[#64748B] font-semibold">
                  4.100.000
                </td>
              </tr>

              {/* SECTION B: INVESTING CASH FLOW */}
              <tr className="bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-[#2563EB] flex items-center gap-2" colSpan={5}>
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  <span>B. ARUS KAS DARI AKTIVITAS INVESTASI</span>
                </td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.02.01</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penjualan Aset Tetap Bekas (Peralatan Lama)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 20: Pelepasan aset komputer kasir lama.")}>Cat. 20</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-medium">0</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">500.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors text-[#DC2626]">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.02.02</td>
                <td className="py-2 px-4 text-[#0F172A]">(Perolehan / Pembelian Aset Tetap - Komputer POS &amp; Peralatan)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 21: Pengadaan perangkat POS sentral dan rak minimarket baru.")}>Cat. 21</td>
                <td className="py-2 px-4 text-right font-mono font-medium text-[#DC2626]">(4.500.000)</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(3.200.000)</td>
              </tr>

              {/* SUB-TOTAL B */}
              <tr className="bg-[#F8FAFC] font-semibold border-y border-[#E2E8F0]">
                <td className="py-2.5 px-4 text-[11px] text-[#94A3B8] font-mono">TOT.B</td>
                <td className="py-2.5 px-4 text-[#0F172A] font-bold">Arus Kas Bersih Digunakan untuk Aktivitas Investasi</td>
                <td className="py-2.5 px-3 text-center"></td>
                <td className="py-2.5 px-4 text-right font-mono text-[#DC2626] font-bold text-sm">
                  (4.500.000)
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-[#DC2626] font-semibold">
                  (2.700.000)
                </td>
              </tr>

              {/* SECTION C: FINANCING CASH FLOW */}
              <tr className="bg-slate-50/80">
                <td className="py-2.5 px-4 font-bold text-[#2563EB] flex items-center gap-2" colSpan={5}>
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  <span>C. ARUS KAS DARI AKTIVITAS PENDANAAN</span>
                </td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.03.01</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penerimaan Simpanan Pokok &amp; Wajib Anggota</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 22: Penerimaan simpanan modal mandiri anggota.")}>Cat. 22</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-semibold">14.500.000</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">11.200.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.03.02</td>
                <td className="py-2 px-4 text-[#0F172A] font-medium">Penerimaan Simpanan Sukarela Anggota</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 23: Penyertaan simpanan sukarela dari anggota aktif.")}>Cat. 23</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-semibold">6.200.000</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">4.800.000</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.03.03</td>
                <td className="py-2 px-4 text-[#0F172A]">(Pengambilan / Penarikan Simpanan Sukarela Anggota)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 23: Penarikan simpanan sukarela berjalan (nihil pada periode ini).")}>Cat. 23</td>
                <td className="py-2 px-4 text-right font-mono text-[#0F172A] font-medium">0</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(1.500.000)</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors text-[#DC2626]">
                <td className="py-2 px-4 text-[11px] text-[#94A3B8] font-mono">CF.03.04</td>
                <td className="py-2 px-4 text-[#0F172A]">(Pembayaran SHU Bagian Anggota sesuai Keputusan RAT)</td>
                <td className="py-2 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 24: Penyaluran dividen SHU tahun buku lalu ke anggota.")}>Cat. 24</td>
                <td className="py-2 px-4 text-right font-mono font-medium text-[#DC2626]">(4.000.000)</td>
                <td className="py-2 px-4 text-right font-mono text-[#64748B]">(3.500.000)</td>
              </tr>

              {/* SUB-TOTAL C */}
              <tr className="bg-[#F8FAFC] font-semibold border-y border-[#E2E8F0]">
                <td className="py-2.5 px-4 text-[11px] text-[#94A3B8] font-mono">TOT.C</td>
                <td className="py-2.5 px-4 text-[#0F172A] font-bold">Arus Kas Bersih Diperoleh dari Aktivitas Pendanaan</td>
                <td className="py-2.5 px-3 text-center"></td>
                <td className="py-2.5 px-4 text-right font-mono text-[#2563EB] font-bold text-sm">
                  16.700.000
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-[#64748B] font-semibold">
                  11.000.000
                </td>
              </tr>

              {/* GRAND SUMMARY RECONCILIATION */}
              <tr className="bg-[#EFF6FF] border-y border-blue-200">
                <td className="py-3 px-4 text-[11px] text-[#2563EB] font-mono font-bold">NET.CF</td>
                <td className="py-3 px-4 text-[#0F172A] font-bold">
                  KENAIKAN (PENURUNAN) BERSIH KAS &amp; SETARA KAS (A + B + C)
                </td>
                <td className="py-3 px-3 text-center"></td>
                <td className="py-3 px-4 text-right font-mono text-[#2563EB] font-bold text-[15px]">
                  +16.500.000
                </td>
                <td className="py-3 px-4 text-right font-mono text-[#64748B] font-semibold">
                  +12.400.000
                </td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-2.5 px-4 text-[11px] text-[#94A3B8] font-mono">KAS.BEG</td>
                <td className="py-2.5 px-4 text-[#0F172A] font-medium">
                  SALDO KAS &amp; SETARA KAS PADA AWAL PERIODE (01 JANUARI 2026)
                </td>
                <td className="py-2.5 px-3 text-center text-[11px] text-[#2563EB] underline cursor-pointer hover:font-bold" onClick={() => setActiveCalkNote("Catatan 3: Saldo awal kas fisik dan saldo rekening giro per 01 Jan 2026.")}>Cat. 3</td>
                <td className="py-2.5 px-4 text-right font-mono text-[#0F172A] font-semibold">
                  142.500.000
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-[#64748B]">
                  130.100.000
                </td>
              </tr>

              {/* FINAL HIGHLIGHT ROW */}
              <tr className="bg-slate-100 border-t-2 border-[#0F172A]">
                <td className="py-4 px-4 text-[11px] text-[#2563EB] font-mono font-bold">KAS.END</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                      SALDO KAS &amp; SETARA KAS PADA AKHIR PERIODE (31 OKT 2026)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#16A34A] text-white">
                      SEIMBANG (KLOP)
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Tepat 100% dengan Akun 1-1000 Kas &amp; Bank di Neraca Keuangan
                  </div>
                </td>
                <td className="py-4 px-3 text-center text-[11px] text-[#2563EB] font-bold">Cat. 3</td>
                <td className="py-4 px-4 text-right">
                  <span className="text-base sm:text-lg font-bold text-[#2563EB] underline decoration-double underline-offset-4 font-mono">
                    159.000.000
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm sm:text-base font-semibold text-[#64748B] underline decoration-double underline-offset-4 font-mono">
                    142.500.000
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* POPUP / MODAL CALK NOTE JIKA DIKLIK */}
        {activeCalkNote && (
          <div className="p-3.5 bg-[#EFF6FF] border border-blue-200 rounded-lg flex items-center justify-between text-xs text-[#1D4ED8]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2563EB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span><strong>Catatan CALK:</strong> {activeCalkNote}</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveCalkNote(null)}
              className="text-[#2563EB] font-bold hover:underline ml-4 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* PANEL ANALISIS & BREAKDOWN KAS + CROSS-VALIDATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          {/* KOLOM KIRI: BREAKDOWN AKUN KAS DAN BANK (7 COL) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 bg-white border border-[#E2E8F0] p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span className="text-sm font-bold text-[#0F172A]">
                  Rincian Komponen Kas &amp; Setara Kas Akhir
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] font-mono">Per 31 Okt 2026</span>
            </div>

            <div className="space-y-2.5">
              {/* Item 1: Kas Toko */}
              <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-mono text-[11px] font-bold">
                    1010
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A]">
                      Kas Operasional &amp; Kasir Toko
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Kas fisik kasir &amp; brankas utama koperasi
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                    Rp 22.379.999
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">14.08% dari total</div>
                </div>
              </div>

              {/* Item 2: BRI */}
              <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-mono text-[11px] font-bold">
                    1020
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A]">
                      Giro Bank BRI - Rekening Simpanan
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      No. Rek: 0145-01-002891-30-1
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                    Rp 52.120.001
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">32.78% dari total</div>
                </div>
              </div>

              {/* Item 3: Bank Mandiri */}
              <div className="flex items-center justify-between p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-mono text-[11px] font-bold">
                    1030
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A]">
                      Rekening Giro Bank Mandiri Bisnis
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      No. Rek: 133-00-1984201-9 (Operasional Utama)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs sm:text-[13px] font-bold text-[#0F172A]">
                    Rp 84.500.000
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">53.14% dari total</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                Total Kas &amp; Bank (Klop dengan CF.END)
              </span>
              <span className="text-sm sm:text-base font-bold text-[#2563EB] font-mono">
                Rp 159.000.000
              </span>
            </div>
          </div>

          {/* KOLOM KANAN: VALIDASI SILANG ANTAR-LAPORAN (5 COL) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 bg-white border border-[#E2E8F0] p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#16A34A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span className="text-sm font-bold text-[#0F172A]">
                  Validasi Silang Antar-Laporan
                </span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-[#16A34A] text-[11px] font-bold rounded">
                Sinkron
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    1. Laporan Posisi Keuangan (Neraca)
                  </span>
                  <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                    ✓ Sesuai
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Aset Lancar: Akun Kas &amp; Bank per 31 Okt 2026 tercatat{" "}
                  <span className="font-semibold text-[#0F172A]">Rp 159.000.000</span>.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    2. Laporan Sisa Hasil Usaha (SHU)
                  </span>
                  <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                    ✓ Sesuai
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Pendapatan Operasional Rp 100.650.000 di SHU terealisasi kas sebesar{" "}
                  <span className="font-semibold text-[#0F172A]">Rp 100.650.000</span>.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    3. Laporan Perubahan Ekuitas
                  </span>
                  <span className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1">
                    ✓ Sesuai
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Setoran simpanan modal anggota net Rp 20.700.000 dan penyerapan SHU Rp 4.000.000 tercatat di CFF.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#EFF6FF] border border-blue-100 rounded-lg flex items-center gap-2.5 text-[#2563EB]">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span className="text-[11px] text-[#1D4ED8] leading-relaxed">
                Tidak ditemukan selisih akun perantara kas (clearing account balance: Rp 0,00).
              </span>
            </div>
          </div>
        </div>

        {/* CATATAN PENGUNGKAPAN KEBIJAKAN ARUS KAS (CALK SUMMARY) */}
        <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span className="text-sm font-bold text-[#0F172A]">
              Catatan Kebijakan Akuntansi Arus Kas (CALK Catatan 2.c &amp; 3)
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
            Laporan Arus Kas Koperasi Konsumen Sejahtera Bersama disusun dengan menggunakan <strong>Metode Langsung (Direct Method)</strong> sesuai dengan ketentuan Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik (SAK ETAP) Bab 7. Kas dan setara kas mencakup kas fisik di toko swalayan, kas kecil sekretariat, serta simpanan giro di Bank BRI dan Bank Mandiri yang dapat segera ditarik tanpa batasan jatuh tempo maupun penalti material. Transaksi non-kas tidak dimasukkan dalam arus kas dan diungkapkan secara terpisah dalam Catatan atas Laporan Keuangan.
          </p>
        </div>

        {/* DIGITAL SIGN-OFF & APPROVAL SHEET */}
        <div className="pt-6 border-t border-[#E2E8F0]">
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-bold">
              LEMBAR PENGESAHAN DOKUMEN KEUANGAN RESMI (AUDIT FISIK &amp; ELEKTRONIK)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Signer 1 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl text-center flex flex-col justify-between h-52">
              <div>
                <span className="text-xs text-[#94A3B8] uppercase">Disiapkan &amp; Dibukukan Oleh</span>
                <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A] mt-1">
                  Staf Pembukuan &amp; Kasir
                </div>
              </div>
              <div className="my-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-[#16A34A] text-[11px] font-bold">
                  ✓ Tanda Tangan Digital Tersertifikasi
                </span>
                <div className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                  ID: SEC-2026-BP-00492
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                  Budi Pratama, S.Ak.
                </div>
                <div className="text-[11px] text-[#94A3B8]">Staf Administrasi &amp; Akuntansi</div>
              </div>
            </div>

            {/* Signer 2 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl text-center flex flex-col justify-between h-52">
              <div>
                <span className="text-xs text-[#94A3B8] uppercase">Diperiksa &amp; Diverifikasi Oleh</span>
                <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A] mt-1">
                  Manajer Keuangan Koperasi
                </div>
              </div>
              <div className="my-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-[#16A34A] text-[11px] font-bold">
                  ✓ Terverifikasi Valid
                </span>
                <div className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                  ID: VER-2026-SR-00812
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                  Siti Rahmawati, SE., M.Ak.
                </div>
                <div className="text-[11px] text-[#94A3B8]">Kepala Bagian Keuangan</div>
              </div>
            </div>

            {/* Signer 3 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl text-center flex flex-col justify-between h-52">
              <div>
                <span className="text-xs text-[#94A3B8] uppercase">Disetujui &amp; Disahkan Oleh</span>
                <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A] mt-1">
                  Ketua Pengurus Koperasi
                </div>
              </div>
              <div className="my-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-100 text-[#2563EB] text-[11px] font-bold">
                  ✓ Sah Keputusan Pengurus
                </span>
                <div className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                  ID: APP-2026-MS-00010
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-bold text-[#0F172A]">
                  Drs. H. Mulyadi Saputra
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  Ketua Pengurus Periode 2024-2027
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
