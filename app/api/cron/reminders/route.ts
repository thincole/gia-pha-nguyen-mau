import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/utils/supabase/queries";
import { computeEvents, FamilyEvent } from "@/utils/eventHelpers";
import {
  formatClanReminderMessage,
  sendZaloNotification,
} from "@/utils/zaloNotifier";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleReminderRequest(request);
}

export async function POST(request: NextRequest) {
  return handleReminderRequest(request);
}

async function handleReminderRequest(request: NextRequest) {
  // 1. Verify cron secret if configured
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Optional: Allow internal test trigger with special parameter
    const isTest = request.nextUrl.searchParams.get("test") === "true";
    if (!isTest) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  try {
    const supabase = await getSupabase();

    // 2. Fetch persons & custom events
    const [personsRes, customEventsRes] = await Promise.all([
      supabase
        .from("persons")
        .select(
          "id, full_name, birth_year, birth_month, birth_day, death_year, death_month, death_day, death_lunar_year, death_lunar_month, death_lunar_day, is_deceased"
        ),
      supabase
        .from("custom_events")
        .select("id, name, content, event_date, location, created_by"),
    ]);

    const persons = personsRes.data || [];
    const customEvents = customEventsRes.data || [];

    // 3. Compute events
    const allEvents = computeEvents(persons, customEvents);

    // Today events (daysUntil === 0)
    const todayEvents: FamilyEvent[] = allEvents.filter(
      (e) => e.daysUntil === 0
    );

    // Upcoming events in next 1 to 3 days (daysUntil > 0 && daysUntil <= 3)
    const upcomingEvents: FamilyEvent[] = allEvents.filter(
      (e) => e.daysUntil > 0 && e.daysUntil <= 3
    );

    const isForceSend = request.nextUrl.searchParams.get("force") === "true";

    // If no events and not forced test, skip sending to avoid spamming the group
    if (todayEvents.length === 0 && upcomingEvents.length === 0 && !isForceSend) {
      return NextResponse.json({
        success: true,
        message: "Hôm nay không có kỵ nhật hoặc sự kiện nào trong 3 ngày tới.",
        eventsToday: 0,
        eventsUpcoming: 0,
      });
    }

    // 4. Format clan reminder message
    const formattedMessage = formatClanReminderMessage(
      todayEvents,
      upcomingEvents
    );

    // 5. Send notification to Zalo
    const result = await sendZaloNotification(formattedMessage);

    return NextResponse.json({
      ...result,
      eventsToday: todayEvents.length,
      eventsUpcoming: upcomingEvents.length,
      messagePreview: formattedMessage,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
