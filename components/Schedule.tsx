"use client";

import { useState, useEffect, useCallback } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  colorId?: string;
}

// day: 1=Mon … 6=Sat, time: "HH:MM", duration in minutes
const DUMMY_SCHEDULE = [
  { day: 1, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 1, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat",  colorId: "1" },
  { day: 1, time: "18:00", duration: 45, summary: "Kurs dorosłych",              colorId: "2" },
  { day: 2, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 2, time: "17:30", duration: 45, summary: "Rekiny — zaawansowani",       colorId: "4" },
  { day: 3, time: "10:00", duration: 45, summary: "Kurs dorosłych (poranny)",    colorId: "2" },
  { day: 3, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 3, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat",  colorId: "1" },
  { day: 3, time: "18:00", duration: 45, summary: "Kurs dorosłych",              colorId: "2" },
  { day: 4, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 4, time: "17:30", duration: 45, summary: "Rekiny — zaawansowani",       colorId: "4" },
  { day: 5, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 5, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat",  colorId: "1" },
  { day: 5, time: "18:00", duration: 45, summary: "Kurs dorosłych",              colorId: "2" },
  { day: 6, time: "09:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",   colorId: "7" },
  { day: 6, time: "10:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat",  colorId: "1" },
  { day: 6, time: "11:00", duration: 45, summary: "Rekiny — zaawansowani",       colorId: "4" },
];

function generateDummyEvents(weekOffset: number): CalendarEvent[] {
  const monday = getWeekStart(weekOffset);
  return DUMMY_SCHEDULE.map((slot, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + (slot.day - 1));
    const [h, m] = slot.time.split(":").map(Number);
    date.setHours(h, m, 0, 0);
    const end = new Date(date);
    end.setMinutes(end.getMinutes() + slot.duration);
    return {
      id: `dummy-${i}`,
      summary: slot.summary,
      colorId: slot.colorId,
      start: { dateTime: date.toISOString() },
      end:   { dateTime: end.toISOString() },
    };
  });
}

interface CalendarResponse {
  items?: CalendarEvent[];
  error?: string;
}

const DAYS = [
  { short: "Pon", full: "Poniedziałek", day: 1 },
  { short: "Wt", full: "Wtorek", day: 2 },
  { short: "Śr", full: "Środa", day: 3 },
  { short: "Czw", full: "Czwartek", day: 4 },
  { short: "Pt", full: "Piątek", day: 5 },
  { short: "Sob", full: "Sobota", day: 6 },
];

function getWeekStart(offset: number = 0): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ...
  const diff = (day === 0 ? -6 : 1 - day) + offset * 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + diff);
  return monday;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
}

function getEventColor(event: CalendarEvent, index: number): string {
  const colorMap: Record<string, string> = {
    "1": "bg-blue-100 text-blue-800",
    "2": "bg-emerald-100 text-emerald-800",
    "3": "bg-violet-100 text-violet-800",
    "4": "bg-rose-100 text-rose-800",
    "5": "bg-amber-100 text-amber-800",
    "6": "bg-orange-100 text-orange-800",
    "7": "bg-cyan-100 text-cyan-800",
    "8": "bg-slate-100 text-slate-800",
    "9": "bg-indigo-100 text-indigo-800",
    "10": "bg-emerald-100 text-emerald-800",
    "11": "bg-red-100 text-red-800",
  };
  if (event.colorId && colorMap[event.colorId]) {
    return colorMap[event.colorId];
  }
  const fallback = [
    "bg-blue-100 text-blue-800",
    "bg-cyan-100 text-cyan-800",
    "bg-emerald-100 text-emerald-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return fallback[index % fallback.length];
}

function SkeletonCell() {
  return (
    <div className="h-12 rounded bg-slate-100 animate-pulse" aria-hidden="true" />
  );
}

function getTodayDayIndex(): number {
  const jsDay = new Date().getDay(); // 0=Sun … 6=Sat
  // Map to DAYS index (0=Mon … 5=Sat); treat Sun/weekends as 0 (Mon)
  if (jsDay === 0 || jsDay === 7) return 0;
  return Math.min(jsDay - 1, 5);
}

export default function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [selectedDayIdx, setSelectedDayIdx] = useState(getTodayDayIndex);

  const fetchEvents = useCallback(async (offset: number) => {
    setLoading(true);
    const weekStart = getWeekStart(offset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    try {
      const params = new URLSearchParams({
        timeMin: weekStart.toISOString(),
        timeMax: weekEnd.toISOString(),
      });
      const res = await fetch(`/api/calendar?${params}`);
      const data: CalendarResponse = await res.json();

      if (data.error === "Calendar not configured") {
        setConfigured(false);
        setEvents(generateDummyEvents(offset));
      } else {
        setConfigured(true);
        setEvents(data.items ?? []);
      }
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(weekOffset);
  }, [weekOffset, fetchEvents]);

  const weekStart = getWeekStart(weekOffset);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Group events by day
  const eventsByDay = DAYS.map(({ day }) => {
    return events.filter((e) => {
      const dt = e.start.dateTime ?? e.start.date;
      if (!dt) return false;
      const d = new Date(dt);
      return d.getDay() === day;
    });
  });

  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--color-surface)" }}
      id="grafik"
    >
      <div className="max-w-7xl mx-auto px-8 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
          Aktualny Grafik Zajęć
        </h2>
        <p
          className="max-w-2xl mx-auto font-medium"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Wybierz dogodny termin i dołącz do jednej z naszych grup. Zajęcia
          odbywają się na dwóch basenach — Basen Ustronie (ul. Konopnickiej 5)
          oraz Basen Centrum (ul. Sybiraków 11).
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            aria-label="Poprzedni tydzień"
            className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors font-medium text-slate-600 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline">Poprzedni</span>
          </button>

          <div className="text-center">
            <p className="font-bold text-sm md:text-base text-[var(--color-on-surface)]">
              {formatDate(weekStart)} – {formatDate(weekEnd)}
            </p>
            {weekOffset === 0 ? (
              <span className="text-xs text-[var(--color-on-surface-variant)]">Bieżący tydzień</span>
            ) : (
              <button
                onClick={() => setWeekOffset(0)}
                className="text-xs underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                style={{ color: "var(--color-primary)" }}
              >
                Wróć do bieżącego
              </button>
            )}
          </div>

          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            aria-label="Następny tydzień"
            className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors font-medium text-slate-600 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <span className="hidden md:inline">Następny</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {!configured && (
          <div className="flex items-center gap-2 mb-4 px-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4h-2V7h2v6z"/></svg>
              Przykładowy grafik
            </span>
            <span className="text-xs text-[var(--color-on-surface-variant)]">
              Prawdziwe zajęcia pojawią się po podłączeniu Google Calendar
            </span>
          </div>
        )}

        {/* ── MOBILE: dzień po dniu ── */}
        <div className="md:hidden" aria-live="polite" aria-label="Grafik zajęć">
          {/* Segmented day picker */}
          <div
            className="grid grid-cols-6 gap-1 p-1 rounded-2xl mb-5"
            style={{ backgroundColor: "var(--color-surface-container)" }}
            role="tablist"
            aria-label="Wybierz dzień"
          >
            {DAYS.map((d, idx) => {
              const dayDate = new Date(weekStart);
              dayDate.setDate(weekStart.getDate() + idx);
              const dateNum = dayDate.getDate();
              const isActive = selectedDayIdx === idx;
              return (
                <button
                  key={d.day}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`flex flex-col items-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 ${
                    isActive
                      ? "shadow-sm scale-[1.04]"
                      : "hover:bg-[var(--color-surface-container-high)]"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-on-primary)",
                        }
                      : { color: "var(--color-on-surface-variant)" }
                  }
                >
                  <span className="uppercase tracking-wide">{d.short}</span>
                  <span
                    className={`mt-0.5 text-[11px] font-extrabold tabular-nums ${isActive ? "opacity-80" : "opacity-60"}`}
                  >
                    {dateNum}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected day heading */}
          <p className="font-extrabold text-lg text-[var(--color-on-surface)] mb-3">
            {DAYS[selectedDayIdx].full},{" "}
            <span style={{ color: "var(--color-primary)" }}>
              {formatDate((() => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + selectedDayIdx); return d; })())}
            </span>
          </p>

          {/* Events for selected day */}
          <div
            className="rounded-xl p-5 shadow-sm space-y-3"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            {loading ? (
              <div className="space-y-3">
                <SkeletonCell />
                <SkeletonCell />
                <SkeletonCell />
              </div>
            ) : (
              (() => {
                const dayEvents = eventsByDay[selectedDayIdx];
                if (dayEvents.length === 0) {
                  return (
                    <p className="text-center py-8 font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                      Brak zajęć w tym dniu.
                    </p>
                  );
                }
                return dayEvents
                  .sort((a, b) => {
                    const ta = a.start.dateTime ?? a.start.date ?? "";
                    const tb = b.start.dateTime ?? b.start.date ?? "";
                    return new Date(ta).getTime() - new Date(tb).getTime();
                  })
                  .map((evt, evtIdx) => {
                    const dt = evt.start.dateTime ?? evt.start.date ?? "";
                    const dtEnd = evt.end.dateTime ?? evt.end.date ?? "";
                    const timeStr = new Date(dt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
                    const timeEnd = new Date(dtEnd).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
                    return (
                      <div
                        key={evt.id}
                        className={`flex items-center gap-4 p-4 rounded-lg ${getEventColor(evt, evtIdx)}`}
                      >
                        <div className="text-sm font-bold tabular-nums whitespace-nowrap opacity-80">
                          {timeStr}–{timeEnd}
                        </div>
                        <div className="font-bold text-sm">{evt.summary}</div>
                      </div>
                    );
                  });
              })()
            )}
          </div>
        </div>

        {/* ── DESKTOP: siatka tygodniowa ── */}
        <div
          className="hidden md:block overflow-x-auto"
          aria-live="polite"
          aria-label="Grafik zajęć"
        >
          <div
            className="min-w-[700px] rounded-xl p-8 shadow-sm"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
              {/* Header row */}
              <div className="grid grid-cols-7 gap-3 border-b pb-4 mb-4"
                style={{ borderColor: "var(--color-surface-container-high)" }}>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Dzień
                </div>
                {DAYS.map((d) => (
                  <div
                    key={d.day}
                    className="font-bold text-sm text-[var(--color-primary)]"
                  >
                    {d.full}
                  </div>
                ))}
              </div>

              {/* Loading skeleton */}
              {loading ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="grid grid-cols-7 gap-3">
                      <SkeletonCell />
                      {DAYS.map((d) => (
                        <SkeletonCell key={d.day} />
                      ))}
                    </div>
                  ))}
                </div>
              ) : events.length === 0 ? (
                <p
                  className="text-center py-12 font-medium"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Brak zajęć w tym tygodniu.
                </p>
              ) : (
                <div className="space-y-3">
                  {Array.from(
                    new Set(
                      events.map((e) => {
                        const dt = e.start.dateTime ?? e.start.date ?? "";
                        return new Date(dt).toLocaleTimeString("pl-PL", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      })
                    )
                  )
                    .sort()
                    .map((timeSlot, rowIdx) => {
                      const rowEvents = DAYS.map(({ day }) => {
                        return events.filter((e) => {
                          const dt = e.start.dateTime ?? e.start.date ?? "";
                          const d = new Date(dt);
                          const t = d.toLocaleTimeString("pl-PL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                          return d.getDay() === day && t === timeSlot;
                        });
                      });

                      return (
                        <div
                          key={timeSlot}
                          className="grid grid-cols-7 gap-3 items-start p-3 rounded-lg"
                          style={
                            rowIdx % 2 === 0
                              ? {
                                  backgroundColor:
                                    "color-mix(in srgb, var(--color-surface-container-low) 50%, transparent)",
                                }
                              : {}
                          }
                        >
                          <div
                            className="font-bold text-sm pt-1"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            {timeSlot}
                          </div>
                          {rowEvents.map((dayEvts, colIdx) =>
                            dayEvts.length > 0 ? (
                              <div key={colIdx} className="space-y-1">
                                {dayEvts.map((evt, evtIdx) => (
                                  <div
                                    key={evt.id}
                                    className={`p-2 rounded text-xs font-bold ${getEventColor(evt, evtIdx)}`}
                                  >
                                    {evt.summary}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div
                                key={colIdx}
                                className="text-sm"
                                style={{ color: "var(--color-outline-variant)" }}
                                aria-hidden="true"
                              >
                                —
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
