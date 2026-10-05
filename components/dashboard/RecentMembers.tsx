import Link from "next/link";
import { DUMMY_MEMBERS } from "@/lib/dummy-data";

export default function RecentMembers() {
  // Ambil 3 anggota paling terkini
  const latestMembers = DUMMY_MEMBERS.slice(-3).reverse();

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-indigo-600">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h3 className="text-sm font-bold text-[#0F172A]">Anggota Terkini</h3>
        </div>
        <Link
          href="/dashboard/anggota"
          className="text-xs text-[#2563EB] hover:underline font-semibold"
        >
          Kelola Anggota
        </Link>
      </div>

      <div className="divide-y divide-[#E2E8F0]">
        {latestMembers.map((member, idx) => (
          <div key={member.id} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                  idx === 0
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : idx === 1
                    ? "bg-emerald-50 text-[#16A34A]"
                    : "bg-amber-50 text-[#F59E0B]"
                }`}
              >
                {member.initials}
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-semibold text-[#0F172A]">{member.name}</div>
                <div className="text-[11px] text-[#94A3B8]">
                  No. {member.id} • {member.depositStatus}
                </div>
              </div>
            </div>
            <span className="text-[11px] text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0]/80 px-2 py-0.5 rounded-full font-medium">
              {member.joinedDate.slice(0, 6)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
