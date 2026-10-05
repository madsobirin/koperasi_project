import Link from "next/link";

interface Member {
  initials: string;
  name: string;
  sub: string;
  date: string;
  colorScheme: "blue" | "green" | "amber";
}

const recentMembers: Member[] = [
  {
    initials: "DS",
    name: "Dewi Sartika",
    sub: "No. A125 • Simpanan Pokok Lunas",
    date: "04 Okt",
    colorScheme: "blue",
  },
  {
    initials: "AP",
    name: "Agus Priyono",
    sub: "No. A124 • Simpanan Pokok Lunas",
    date: "02 Okt",
    colorScheme: "green",
  },
  {
    initials: "RN",
    name: "Rini Nuraini",
    sub: "No. A123 • Simpanan Pokok Lunas",
    date: "29 Sep",
    colorScheme: "amber",
  },
];

export default function RecentMembers() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-indigo-600">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h3 className="text-sm font-bold text-[#131b2e]">Anggota Terkini</h3>
        </div>
        <Link
          href="/dashboard#anggota"
          className="text-xs text-[#004ac6] hover:underline font-semibold"
        >
          Kelola Anggota
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {recentMembers.map((member) => (
          <div key={member.name} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                  member.colorScheme === "blue"
                    ? "bg-[#EFF6FF] text-[#004ac6]"
                    : member.colorScheme === "green"
                    ? "bg-emerald-50 text-[#16A34A]"
                    : "bg-amber-50 text-[#F59E0B]"
                }`}
              >
                {member.initials}
              </div>
              <div>
                <div className="text-xs sm:text-[13px] font-semibold text-[#131b2e]">{member.name}</div>
                <div className="text-[11px] text-[#94A3B8]">{member.sub}</div>
              </div>
            </div>
            <span className="text-[11px] text-[#505f76] bg-[#f2f3ff] px-2 py-0.5 rounded-full font-medium">
              {member.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
