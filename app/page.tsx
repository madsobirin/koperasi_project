"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const usernameInputId = useId();
  const passwordInputId = useId();
  const rememberMeInputId = useId();

  // Akses Cepat Pengurus Demo
  const handleQuickFill = () => {
    setUsername("ADM-0492");
    setPassword("KoperasiSejahtera#2024");
    setErrorMessage("");
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSuccess(false);

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMessage("Harap masukkan Username / ID Pengurus dan Kata Sandi.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#F8FAFC] font-sans antialiased text-[#0F172A]">
      <div className="w-full max-w-[960px] bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row">
        
        {/* Kolom Kiri: Identitas Visual Koperasi (design.md Section 2 & 10) */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] p-7 lg:p-9 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Aksen Cahaya Ambient Halus */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Logo Card Putih */}
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow-xs flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-md bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold tracking-tight text-[#2563EB] text-xs uppercase">KOPERASI</span>
                <span className="font-medium tracking-wider text-[#64748B] text-[9px] uppercase">SEJAHTERA</span>
              </div>
            </div>

            {/* Eyebrow Pill */}
            <span className="inline-block py-1 px-3 bg-white/15 backdrop-blur-xs rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3 text-white border border-white/10">
              Portal Administrasi
            </span>

            {/* Judul & Deskripsi */}
            <h1 className="text-2xl lg:text-[26px] font-bold text-white mb-3 leading-tight tracking-tight">
              Sistem Informasi Koperasi
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mb-7 leading-relaxed">
              Aplikasi terpadu tata kelola pembukuan, transaksi kas, dan pelaporan keuangan anggota.
            </p>

            {/* 3 Poin Keunggulan */}
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-[13px] text-white/95">Pembukuan buku besar &amp; neraca otomatis</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-[13px] text-white/95">Pengawasan simpan pinjam anggota akurat</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-[13px] text-white/95">Pelaporan keuangan formal sesuai SAK Koperasi</span>
              </li>
            </ul>
          </div>

          {/* Info Keamanan Sesi */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <svg className="w-3.5 h-3.5 text-blue-200 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 00-7.5 0v3h7.5z" clipRule="evenodd"/>
              </svg>
              <span>Sesi terenkripsi TLS 1.3 • Keamanan Standar Finansial</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Masuk */}
        <div className="w-full md:w-7/12 bg-white p-7 lg:p-9 flex flex-col justify-center relative">
          
          {/* Header Formulir & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-[#0F172A] tracking-tight">Masuk ke Sistem</h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Masukkan kredensial akun pengurus atau kasir Anda.
              </p>
            </div>

            {/* Tombol Akses Cepat Demo */}
            <button
              onClick={handleQuickFill}
              type="button"
              className="self-start sm:self-auto bg-[#EFF6FF] hover:bg-blue-100 text-[#2563EB] text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-blue-100 shadow-xs"
              title="Isi otomatis dengan akun demo"
            >
              <svg className="w-3.5 h-3.5 text-[#2563EB]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span>Akses Cepat Pengurus</span>
            </button>
          </div>

          {/* Alert Notifikasi Kesalahan */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-[#DC2626] rounded-lg flex items-start gap-2 transition-all text-xs sm:text-sm border border-red-200">
              <svg className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 font-medium">{errorMessage}</div>
              <button
                onClick={() => setErrorMessage("")}
                className="text-[#DC2626] hover:opacity-70 cursor-pointer ml-1"
                type="button"
              >
                ✕
              </button>
            </div>
          )}

          {/* Alert Notifikasi Berhasil */}
          {isSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-lg flex items-center gap-2 transition-all text-xs sm:text-sm border border-emerald-200">
              <svg className="w-5 h-5 text-[#16A34A] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Autentikasi berhasil. Mengalihkan ke Dashboard Finansial...</span>
            </div>
          )}

          {/* Formulir */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Username / ID Pengurus */}
            <div>
              <label htmlFor={usernameInputId} className="block text-xs sm:text-[13px] font-semibold text-[#0F172A] mb-1.5">
                Username / ID Pengurus
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#64748B] pointer-events-none flex items-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/>
                  </svg>
                </span>
                <input
                  id={usernameInputId}
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: ADM-0492 atau budi.santoso"
                  className="w-full h-10 pl-9 pr-3 bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-sm rounded-lg border border-[#E2E8F0] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div>
              <label htmlFor={passwordInputId} className="block text-xs sm:text-[13px] font-semibold text-[#0F172A] mb-1.5">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#64748B] pointer-events-none flex items-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id={passwordInputId}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi terdaftar"
                  className="w-full h-10 pl-9 pr-10 bg-[#F8FAFC] text-[#0F172A] text-xs sm:text-sm rounded-lg border border-[#E2E8F0] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan atau sembunyikan kata sandi"
                  className="absolute right-3 text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Opsi Tambahan: Ingat Saya & Lupa Sandi */}
            <div className="flex items-center justify-between pt-1">
              <label htmlFor={rememberMeInputId} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id={rememberMeInputId}
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2563EB] border-[#E2E8F0] focus:ring-0 focus:outline-none cursor-pointer"
                />
                <span className="text-xs sm:text-[13px] text-[#64748B] hover:text-[#0F172A]">Ingat sesi saya</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs sm:text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline transition-colors cursor-pointer focus:outline-none"
              >
                Lupa password?
              </button>
            </div>

            {/* Tombol Aksi Utama */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-10 md:h-11 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold text-xs sm:text-sm text-white shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 ${
                  isSuccess
                    ? "bg-[#16A34A] hover:bg-[#15803d]"
                    : isLoading
                    ? "bg-[#2563EB]/80 cursor-not-allowed"
                    : "bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99]"
                }`}
              >
                {isLoading && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                <span>
                  {isSuccess
                    ? "Berhasil Masuk ✓"
                    : isLoading
                    ? "Memverifikasi Data..."
                    : "Masuk ke Dashboard"}
                </span>
              </button>
            </div>
          </form>

          {/* Footer Hak Cipta & Status Koneksi */}
          <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-[#64748B] text-xs gap-2">
            <span>Koperasi Sejahtera Mandiri Indonesia</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              Server Aktif &amp; Terhubung
            </span>
          </div>
        </div>
      </div>

      {/* Modal Bantuan Lupa Kata Sandi */}
      {isForgotModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsForgotModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#E2E8F0] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-[#2563EB]">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3 id="modal-title" className="text-base font-bold text-[#0F172A]">Bantuan Reset Sandi</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer text-lg font-bold p-1 leading-none"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-[#64748B] mb-4 leading-relaxed">
              Demi alasan kepatuhan audit finansial dan perlindungan data anggota, pemulihan akun pengurus hanya dapat diproses melalui verifikasi manual oleh <strong>Ketua Tim Pengawas</strong> atau <strong>Super Admin IT</strong>.
            </p>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl mb-5 space-y-2 text-xs sm:text-[13px] text-[#0F172A]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="font-mono text-xs">admin@koperasisejahtera.id</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>(021) 7890-4421 (Ext. 104)</span>
              </div>
            </div>

            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full h-10 bg-[#2563EB] text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              Mengerti, Tutup Panduan
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
