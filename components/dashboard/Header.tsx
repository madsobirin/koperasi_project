"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-[#E2E8F0] z-40 px-6 sm:px-8 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[#505f76] text-xs sm:text-[13px] font-medium">
          <svg className="w-4 h-4 text-[#505f76]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[#94A3B8]">/</span>
          <span className="font-semibold text-[#131b2e]">Koperasi</span>
        </div>
      </div>

      {/* Right Tools & User Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-64 sm:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari transaksi, anggota, atau akun..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#131b2e] text-xs sm:text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
          />
        </div>

        {/* Notifications Button */}
        <button
          type="button"
          className="relative w-9 h-9 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center justify-center text-[#505f76] transition-colors cursor-pointer"
          aria-label="Lihat notifikasi"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-[#E2E8F0]" />

        {/* Profile Card & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer group select-none p-1 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#E2E8F0] bg-blue-100 flex items-center justify-center text-[#004ac6] font-bold text-xs">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrcvmNhDUZIw96dYZZ7nVa6FmQfkkDaCVMyDCTv0F-7O3Bv8ehZfqGwjlVwlV1TfSPNfIhvuHl2TKMoTkZY2EBBJ0K_-68I5QacWN4rDOFo2mHdzkLH4xsn00svzRlMkdw7PZ5bsTrQtcs6uLOwNLsnDZkf1813e2u5_yH3ayVp8F626YzjpwpmBzX4g4pTToCItqgL80eBxM7RYC5kvv-G1hb0BfbKGb74q1NVBlWzRQNRi5oyrl_Og"
                alt="Profile Budi Pratama"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-[13px] font-bold text-[#131b2e] leading-tight group-hover:text-[#004ac6] transition-colors">
                Budi Pratama
              </span>
              <span className="text-[11px] text-[#94A3B8] leading-tight">
                Administrator Koperasi
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-[#94A3B8] group-hover:text-[#131b2e] transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-50 p-2 space-y-1 animate-in fade-in duration-150">
              <div className="px-3 py-2 border-b border-[#E2E8F0] mb-1">
                <div className="text-xs font-bold text-[#131b2e]">Budi Pratama</div>
                <div className="text-[11px] text-[#94A3B8]">ADM-0492 • Administrator</div>
              </div>
              <Link
                href="/dashboard#profil"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#505f76] hover:bg-[#F8FAFC] hover:text-[#131b2e] transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Profil Akun</span>
              </Link>
              <Link
                href="/dashboard#pengaturan"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#505f76] hover:bg-[#F8FAFC] hover:text-[#131b2e] transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <span>Pengaturan Sistem</span>
              </Link>
              <div className="border-t border-[#E2E8F0] my-1" />
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer text-left font-medium"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
                </svg>
                <span>Keluar dari Sistem</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
