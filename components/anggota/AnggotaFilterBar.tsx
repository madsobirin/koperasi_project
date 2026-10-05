"use client";

interface AnggotaFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  genderFilter: string;
  onGenderChange: (value: string) => void;
  periodFilter: string;
  onPeriodChange: (value: string) => void;
  onReset: () => void;
  totalFiltered: number;
}

export default function AnggotaFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  genderFilter,
  onGenderChange,
  periodFilter,
  onPeriodChange,
  onReset,
  totalFiltered,
}: AnggotaFilterBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "" ||
    genderFilter !== "" ||
    periodFilter !== "";

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs mb-4 space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none flex items-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama, nomor anggota (misal: A001), atau email..."
            className="w-full h-[38px] pl-9 pr-9 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded transition-colors"
              title="Hapus pencarian"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Filters Dropdown Group */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Status Filter */}
          <div className="w-full sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all cursor-pointer"
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="w-full sm:w-36">
            <select
              value={genderFilter}
              onChange={(e) => onGenderChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all cursor-pointer"
            >
              <option value="">Semua Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Period Filter */}
          <div className="w-full sm:w-40">
            <select
              value={periodFilter}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="w-full h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs sm:text-[13px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all cursor-pointer"
            >
              <option value="">Semua Periode</option>
              <option value="2026">Tahun 2026</option>
              <option value="2024">Tahun 2024</option>
              <option value="Bulan Ini">Bulan Ini</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="Reset Filter"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Active Filter Tags Context & Counter */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0] text-xs text-[#94A3B8]">
        <span>Menampilkan data terfilter ({totalFiltered} anggota)</span>
        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 flex-wrap ml-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#2563EB] text-[11px] font-medium border border-blue-100">
                Pencarian: &quot;{searchQuery}&quot;
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="hover:text-blue-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-[#16A34A] text-[11px] font-medium border border-emerald-100">
                Status: {statusFilter}
                <button
                  type="button"
                  onClick={() => onStatusChange("")}
                  className="hover:text-emerald-800 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {genderFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-medium border border-purple-100">
                Gender: {genderFilter}
                <button
                  type="button"
                  onClick={() => onGenderChange("")}
                  className="hover:text-purple-900 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {periodFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-100">
                Periode: {periodFilter}
                <button
                  type="button"
                  onClick={() => onPeriodChange("")}
                  className="hover:text-amber-900 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
