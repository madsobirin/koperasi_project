"use client";

interface PenjualanFilterBarProps {
  searchNota: string;
  onSearchNotaChange: (value: string) => void;
  searchPelanggan: string;
  onSearchPelangganChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onReset: () => void;
}

export default function PenjualanFilterBar({
  searchNota,
  onSearchNotaChange,
  searchPelanggan,
  onSearchPelangganChange,
  statusFilter,
  onStatusFilterChange,
  dateRange,
  onDateRangeChange,
  onReset,
}: PenjualanFilterBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E2E8F0] mb-5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
          {/* Date Range */}
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
              className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all cursor-pointer font-medium"
            />
          </div>

          {/* Search Nota */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
            <input
              type="text"
              value={searchNota}
              onChange={(e) => onSearchNotaChange(e.target.value)}
              placeholder="Cari No Nota (mis: PJ-)..."
              className="w-full h-[38px] pl-9 pr-8 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all placeholder-[#94A3B8]"
            />
            {searchNota && (
              <button
                type="button"
                onClick={() => onSearchNotaChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Pelanggan */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </span>
            <input
              type="text"
              value={searchPelanggan}
              onChange={(e) => onSearchPelangganChange(e.target.value)}
              placeholder="Cari nama pelanggan..."
              className="w-full h-[38px] pl-9 pr-8 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all placeholder-[#94A3B8]"
            />
            {searchPelanggan && (
              <button
                type="button"
                onClick={() => onSearchPelangganChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Pembayaran */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all cursor-pointer font-medium"
            >
              <option value="">Semua Status Pembayaran</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Sebagian">Sebagian</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="h-[38px] px-3.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
