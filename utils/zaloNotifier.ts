import { computeEvents, FamilyEvent } from "@/utils/eventHelpers";
import { getTodayLunar } from "@/utils/dateHelpers";
import config from "@/app/config";

export interface NotificationResult {
  success: boolean;
  message: string;
  eventsFound: number;
  payloadSent?: string;
  error?: string;
}

/**
 * Builds a respectful, formal Vietnamese message for Clan death anniversaries & events
 */
export function formatClanReminderMessage(
  todayEvents: FamilyEvent[],
  upcomingEvents: FamilyEvent[]
): string {
  const lunar = getTodayLunar();
  const solarDateStr = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  let msg = `🔔 THÔNG BÁO KỴ NHẬT & SỰ KIỆN - ${config.siteName.toUpperCase()}\n`;
  msg += `📍 Thôn Thượng Đền • TT. Cổ Lễ • H. Trực Ninh • T. Nam Định\n`;
  msg += `🗓️ Hôm nay: ${solarDateStr} (Tức ngày ${lunar.lunarDay}/${lunar.lunarMonth} Âm lịch - Năm ${lunar.lunarYear})\n`;
  msg += `────────────────────────\n\n`;

  if (todayEvents.length > 0) {
    msg += `🕯️ KỴ NHẬT (NGÀY GIỖ) HÔM NAY:\n`;
    for (const ev of todayEvents) {
      if (ev.type === "death_anniversary") {
        msg += `• Kỵ nhật: ${ev.personName} (${ev.eventDateLabel})\n`;
        if (ev.originYear) msg += `  - Tạ thế năm: ${ev.originYear}\n`;
      } else if (ev.type === "birthday") {
        msg += `• Mừng sinh nhật: ${ev.personName} (${ev.eventDateLabel})\n`;
      } else {
        msg += `• Sự kiện họ tộc: ${ev.personName}\n`;
        if (ev.location) msg += `  - Địa điểm: ${ev.location}\n`;
      }
      if (ev.content) msg += `  - Chi tiết: ${ev.content}\n`;
    }
    msg += `\nKính báo để toàn thể con cháu nội ngoại trong dòng tộc được biết để tề tựu dâng hương tưởng niệm!\n\n`;
  } else {
    msg += `🌿 Hôm nay dòng họ không có kỵ nhật hoặc sự kiện đặc biệt.\n\n`;
  }

  if (upcomingEvents.length > 0) {
    msg += `⏳ SẮP DIỄN RA TRONG 3 NGÀY TỚI:\n`;
    for (const ev of upcomingEvents) {
      const typeLabel =
        ev.type === "death_anniversary"
          ? "Ngày giỗ"
          : ev.type === "birthday"
          ? "Sinh nhật"
          : "Sự kiện";
      msg += `• ${typeLabel}: ${ev.personName} (Còn ${ev.daysUntil} ngày nữa - ${ev.eventDateLabel})\n`;
    }
    msg += `\n`;
  }

  msg += `────────────────────────\n`;
  msg += `🌐 Tra cứu chi tiết cây gia phả: https://nguyenmaucole.io.vn`;

  return msg;
}

/**
 * Sends notification to Zalo Webhook / Group Bot
 */
export async function sendZaloNotification(
  customMessage?: string,
  webhookUrlOverride?: string
): Promise<NotificationResult> {
  const webhookUrl =
    webhookUrlOverride ||
    process.env.ZALO_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_ZALO_WEBHOOK_URL;

  let messageToSend = customMessage;

  if (!messageToSend) {
    messageToSend = "🔔 Thông báo thử nghiệm kết nối nhóm Zalo Họ Nguyễn Mậu Cổ Lễ thành công!";
  }

  if (!webhookUrl) {
    return {
      success: false,
      message:
        "Chưa cấu hình đường dẫn Webhook Zalo (ZALO_WEBHOOK_URL). Vui lòng thêm biến môi trường ZALO_WEBHOOK_URL trên Vercel.",
      eventsFound: 0,
      payloadSent: messageToSend,
      error: "MISSING_WEBHOOK_URL",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: messageToSend,
        message: messageToSend,
        content: messageToSend,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        message: `Lỗi từ Webhook Zalo: HTTP ${response.status} - ${text}`,
        eventsFound: 1,
        payloadSent: messageToSend,
        error: text,
      };
    }

    return {
      success: true,
      message: "Đã gửi thông báo thành công vào nhóm Zalo!",
      eventsFound: 1,
      payloadSent: messageToSend,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Không thể kết nối đến Webhook Zalo: ${err.message}`,
      eventsFound: 0,
      payloadSent: messageToSend,
      error: err.message,
    };
  }
}
