"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#E2E8F0] z-50 flex flex-col justify-between select-none transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#E2E8F0] bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[14px] text-[#0F172A] truncate leading-tight">
                  Koperasi Sejahtera
                </span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Sistem Informasi
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
                aria-label="Tutup Menu"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation Items (design.md Section 3) */}
          <div className="p-3">
            <nav className="space-y-1">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-xs sm:text-[13px] font-semibold ${
                  isLinkActive("/dashboard")
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                <span className="flex-1">Dashboard</span>
              </Link>

              {/* Anggota */}
              <Link
                href="/dashboard/anggota"
                className="flex items-center gap-3 px-3 py-2 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="flex-1">Anggota</span>
              </Link>

              {/* TRANSAKSI Section */}
              <div className="pt-2.5">
                <div className="px-3 pb-1 text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                  Transaksi
                </div>
                <div className="space-y-0.5">
                  <Link
                    href="/dashboard/transaksi/penjualan"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
                    </svg>
                    <span className="flex-1">Penjualan</span>
                  </Link>
                  <Link
                    href="/dashboard/transaksi/pembelian"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                    <span className="flex-1">Pembelian</span>
                  </Link>
                </div>
              </div>

              {/* SIMPANAN (Root Item di design.md Section 3) */}
              <div className="pt-1">
                <Link
                  href="/dashboard/simpanan"
                  className="flex items-center gap-3 px-3 py-2 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium"
                >
                  <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-16 0V6"/>
                  </svg>
                  <span className="flex-1">Simpanan</span>
                </Link>
              </div>

              {/* AKUNTANSI Section */}
              <div className="pt-2.5">
                <div className="px-3 pb-1 text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                  Akuntansi
                </div>
                <div className="space-y-0.5">
                  <Link
                    href="/dashboard/akuntansi/buku-besar"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>
                    </svg>
                    <span className="flex-1">Buku Besar</span>
                  </Link>
                  <Link
                    href="/dashboard/akuntansi/neraca-saldo"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                    </svg>
                    <span className="flex-1">Neraca Saldo</span>
                  </Link>
                </div>
              </div>

              {/* LAPORAN Section */}
              <div className="pt-2.5">
                <div className="px-3 pb-1 text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
                  Laporan
                </div>
                <div className="space-y-0.5">
                  <Link
                    href="/dashboard/laporan/posisi-keuangan"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/>
                    </svg>
                    <span className="flex-1">Posisi Keuangan</span>
                  </Link>
                  <Link
                    href="/dashboard/laporan/shu"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/>
                    </svg>
                    <span className="flex-1">Perhitungan Hasil Usaha</span>
                  </Link>
                  <Link
                    href="/dashboard/laporan/perubahan-ekuitas"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/><path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4"/><circle cx="8" cy="12" r="2"/>
                    </svg>
                    <span className="flex-1">Perubahan Ekuitas</span>
                  </Link>
                  <Link
                    href="/dashboard/laporan/arus-kas"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                    </svg>
                    <span className="flex-1">Arus Kas</span>
                  </Link>
                  <Link
                    href="/dashboard/laporan/calk"
                    className="flex items-center gap-3 px-3 py-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium pl-6"
                  >
                    <svg className="w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span className="flex-1">CALK</span>
                  </Link>
                </div>
              </div>

              {/* PENGATURAN */}
              <div className="pt-2">
                <Link
                  href="/dashboard/pengaturan"
                  className="flex items-center gap-3 px-3 py-2 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors rounded-lg text-xs sm:text-[13px] font-medium"
                >
                  <svg className="w-4 h-4 text-[#64748B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span className="flex-1">Pengaturan</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="p-3 border-t border-[#E2E8F0] bg-white">
          <div className="p-2.5 bg-[#EFF6FF] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] ring-4 ring-emerald-100" />
              <span className="text-[11px] text-[#0F172A] font-semibold">Sistem Aktif</span>
            </div>
            <Link href="/dashboard#bantuan" className="text-[11px] text-[#2563EB] hover:underline font-bold">
              Bantuan
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
