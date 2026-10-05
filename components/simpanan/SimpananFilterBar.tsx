"use client";

interface SimpananFilterBarProps {
  searchMember: string;
  onSearchMemberChange: (val: string) => void;
  typeFilter: string;
  onTypeFilterChange: (val: string) => void;
  mutationFilter: string;
  onMutationFilterChange: (val: string) => void;
  dateRange: string;
  onDateRangeChange: (val: string) => void;
  onReset: () => void;
}

export default function SimpananFilterBar({
  searchMember,
  onSearchMemberChange,
  typeFilter,
  onTypeFilterChange,
  mutationFilter,
  onMutationFilterChange,
  dateRange,
  onDateRangeChange,
  onReset,
}: SimpananFilterBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] mb-5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
          {/* Cari Nama / No Anggota */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
            <input
              type="text"
              value={searchMember}
              onChange={(e) => onSearchMemberChange(e.target.value)}
              placeholder="Cari nama atau no. anggota (mis: A001)..."
              className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>

          {/* Rentang Tanggal */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </span>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              placeholder="Rentang Tanggal"
              className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer"
            />
          </div>

          {/* Jenis Simpanan Dropdown */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer appearance-none"
            >
              <option value="">Semua Jenis Simpanan</option>
              <option value="Simpanan Pokok">Simpanan Pokok</option>
              <option value="Simpanan Wajib">Simpanan Wajib</option>
              <option value="Simpanan Sukarela">Simpanan Sukarela</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </div>

          {/* Tipe Mutasi Dropdown */}
          <div className="relative">
            <select
              value={mutationFilter}
              onChange={(e) => onMutationFilterChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] cursor-pointer appearance-none"
            >
              <option value="">Semua Mutasi (Setor & Tarik)</option>
              <option value="Setor">Setor Kas (Masuk)</option>
              <option value="Tarik">Tarik Simpanan (Keluar)</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Reset Filter Action */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto h-[38px] px-3.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="Reset semua filter pencarian"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
