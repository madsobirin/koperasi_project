"use client";

import { useEffect } from "react";

export interface ToastState {
  show: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

interface ToastNotificationProps {
  toast: ToastState;
  onClose: () => void;
}

export default function ToastNotification({
  toast,
  onClose,
}: ToastNotificationProps) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white text-[#0F172A] px-4 py-3 rounded-xl shadow-xl border border-[#E2E8F0] animate-in slide-in-from-bottom-5 duration-200">
      {/* Icon */}
      {toast.type === "success" && (
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      )}
      {toast.type === "error" && (
        <div className="w-8 h-8 rounded-full bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
      )}
      {toast.type === "info" && (
        <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col pr-2">
        <span className="text-xs font-bold text-[#0F172A]">{toast.title}</span>
        <span className="text-[11px] text-[#64748B]">{toast.message}</span>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded transition-colors cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
