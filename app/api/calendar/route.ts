import { NextResponse } from "next/server";

export const revalidate = 300; // cache 5 minutes

export async function GET(request: Request) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!calendarId || !apiKey) {
    return NextResponse.json(
      { error: "Calendar not configured", items: [] },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get("timeMin") ?? new Date().toISOString();
  const timeMax =
    searchParams.get("timeMax") ??
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    url.searchParams.set("key", apiKey);
    url.searchParams.set("timeMin", timeMin);
    url.searchParams.set("timeMax", timeMax);
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("maxResults", "100");

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      headers: {
        Referer: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orki-lubin.vercel.app",
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Google Calendar API error:", err);
      return NextResponse.json(
        { error: "Failed to fetch calendar", items: [] },
        { status: 200 }
      );
    }

    const data = await res.json();

    // Fetch exact event colors from Google Calendar
    let eventColors: Record<string, { background: string; foreground: string }> = {};
    try {
      const colorsUrl = `https://www.googleapis.com/calendar/v3/colors?key=${apiKey}`;
      const colorsRes = await fetch(colorsUrl, { next: { revalidate: 86400 } });
      if (colorsRes.ok) {
        const colorsData = await colorsRes.json();
        eventColors = colorsData.event ?? {};
      }
    } catch {
      // ignore, fallback to hardcoded colors in frontend
    }

    return NextResponse.json({ ...data, eventColors }, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("Calendar fetch error:", err);
    return NextResponse.json(
      { error: "Internal error", items: [] },
      { status: 200 }
    );
  }
}
