"use client";

import { useState } from "react";
import { Bell, CheckCircle2, AlertCircle, Loader2, Send, ExternalLink } from "lucide-react";

export default function ZaloReminderControl() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    messagePreview?: string;
  } | null>(null);

  const handleTestSend = async (force: boolean = true) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/cron/reminders?test=true&force=${force}`, {
        method: "POST",
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        success: false,
        message: `Lỗi kết nối: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-50/80 via-white to-amber-50/50 rounded-2xl p-5 border border-blue-200/70 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Bell className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 text-base">
                Tự động nhắc Kỵ nhật (Ngày giỗ) qua Zalo
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Tự động 7h00 sáng
              </span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
              Hệ thống tự động kích hoạt mỗi sáng lúc <strong>7:00 AM</strong>, quét các ngày giỗ Âm lịch & sự kiện trong ngày và gửi thông báo trang trọng vào nhóm Zalo dòng họ.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleTestSend(true)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 shrink-0 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Đang gửi thử...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Gửi thử nghiệm ngay</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div
          className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 border ${
            result.success
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 overflow-hidden">
            <p className="font-semibold">{result.message}</p>
            {result.messagePreview && (
              <pre className="mt-2 p-3 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                {result.messagePreview}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
