"use client";

interface StatCardsAnggotaProps {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  pendingCount: number;
}

export default function StatCardsAnggota({
  totalCount,
  activeCount,
  inactiveCount,
  pendingCount,
}: StatCardsAnggotaProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Stat 1: Total Anggota */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs relative overflow-hidden group hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">
            Total Anggota
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {totalCount}
          </span>
          <span className="text-xs text-[#64748B] font-medium">orang</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center text-[#16A34A] font-semibold gap-0.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="19" x2="12" y2="5"/>
              <polyline points="5 12 12 5 19 12"/>
            </svg>
            +3
          </span>
          <span className="text-[#64748B]">terdaftar bulan ini</span>
        </div>

        {/* Subtle Watermark Icon */}
        <div className="absolute -bottom-2 -right-2 opacity-[0.04] text-[#2563EB] pointer-events-none">
          <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
      </div>

      {/* Stat 2: Anggota Aktif */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">
            Anggota Aktif
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-[28px] font-bold text-[#16A34A] tracking-tight">
            {activeCount}
          </span>
          <span className="text-xs text-[#64748B] font-medium">orang</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#16A34A] font-bold text-[10px]">
            94.4%
          </span>
          <span className="text-[#64748B]">rasio kepatuhan simpanan</span>
        </div>
      </div>

      {/* Stat 3: Non-Aktif / Ditangguhkan */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs relative overflow-hidden group hover:border-red-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">
            Non-Aktif / Ditangguhkan
          </span>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 2 20 20"/>
              <path d="M16 16v-1a4 4 0 0 0-4-4H9.5"/>
              <path d="M19 19H5a2 2 0 0 1-2-2V9.5"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-[28px] font-bold text-[#DC2626] tracking-tight">
            {inactiveCount}
          </span>
          <span className="text-xs text-[#64748B] font-medium">orang</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="text-[#DC2626] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            Membutuhkan tindak lanjut
          </span>
        </div>
      </div>

      {/* Stat 4: Baru Terverifikasi */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs relative overflow-hidden group hover:border-amber-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">
            Baru Terverifikasi
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <polyline points="16 11 18 13 22 9"/>
            </svg>
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {pendingCount > 0 ? 14 : 14}
          </span>
          <span className="text-xs text-[#64748B] font-medium">orang</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="text-[#64748B] font-medium">Periode berjalan</span>
          <span className="text-[#0F172A] font-semibold">Q4 2026</span>
        </div>
      </div>
    </div>
  );
}
