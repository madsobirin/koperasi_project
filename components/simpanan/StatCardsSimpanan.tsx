"use client";

interface StatCardsSimpananProps {
  totalSimpanan?: number;
  totalPokok?: number;
  totalWajib?: number;
  totalSukarela?: number;
}

function formatRp(num: number): string {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

export default function StatCardsSimpanan({
  totalSimpanan = 148650000,
  totalPokok = 62500000,
  totalWajib = 61400000,
  totalSukarela = 24750000,
}: StatCardsSimpananProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {/* Card 1: Total Simpanan */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">Total Simpanan</span>
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18"/>
              <path d="M3 10h18"/>
              <path d="M5 6l7-3 7 3"/>
              <path d="M4 10v11"/>
              <path d="M20 10v11"/>
              <path d="M8 14v3"/>
              <path d="M12 14v3"/>
              <path d="M16 14v3"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalSimpanan)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-semibold">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
              +6.8%
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>125 anggota aktif</span>
          </div>
        </div>
      </div>

      {/* Card 2: Simpanan Pokok */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">Simpanan Pokok</span>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#16A34A]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalPokok)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-100/70 text-[#16A34A] font-semibold">
              Lunas 100%
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>125 Anggota (Rp 500rb)</span>
          </div>
        </div>
      </div>

      {/* Card 3: Simpanan Wajib */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">Simpanan Wajib</span>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-[#D97706]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
              <path d="m9 16 2 2 4-4"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalWajib)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-100/70 text-[#D97706] font-semibold">
              Kepatuhan 96.2%
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>Rp 50rb/bln</span>
          </div>
        </div>
      </div>

      {/* Card 4: Simpanan Sukarela */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#64748B] font-semibold">Simpanan Sukarela</span>
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-[#0284C7]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2 2.5-1.7 2.5-4 2-5-.5-1.5-2-1.5-3-1.5z"/>
              <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
              <circle cx="16" cy="11" r="1"/>
            </svg>
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            {formatRp(totalSukarela)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-sky-100/70 text-[#0284C7] font-semibold">
              84 Mutasi Aktif
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span>Dapat ditarik sewaktu-waktu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
