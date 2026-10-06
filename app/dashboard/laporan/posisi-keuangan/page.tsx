"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import PosisiKeuanganView from "@/components/laporan/PosisiKeuanganView";

export default function PosisiKeuanganPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="w-full pt-20 px-4 sm:px-8 py-8 bg-[#F8FAFC] flex-1">
          <div className="flex flex-col w-full max-w-[1400px] mx-auto">
            <PosisiKeuanganView />
          </div>
        </main>
      </div>
    </div>
  );
}
