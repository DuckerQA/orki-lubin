"use client";

import { useState, useEffect, useCallback } from "react";

interface CalendarEvent {
  id: string;
  summary?: string;
  start: { dateTime?: string; date?: string };
  end:   { dateTime?: string; date?: string };
  colorId?: string;
}

const DUMMY_SCHEDULE = [
  { day: 1, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 1, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat", colorId: "1" },
  { day: 1, time: "18:00", duration: 45, summary: "Kurs dorosłych",             colorId: "2" },
  { day: 2, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 2, time: "17:30", duration: 45, summary: "Rekiny — zaawansowani",      colorId: "4" },
  { day: 3, time: "10:00", duration: 45, summary: "Kurs dorosłych (poranny)",   colorId: "2" },
  { day: 3, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 3, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat", colorId: "1" },
  { day: 3, time: "18:00", duration: 45, summary: "Kurs dorosłych",             colorId: "2" },
  { day: 4, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 4, time: "17:30", duration: 45, summary: "Rekiny — zaawansowani",      colorId: "4" },
  { day: 5, time: "16:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 5, time: "17:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat", colorId: "1" },
  { day: 5, time: "18:00", duration: 45, summary: "Kurs dorosłych",             colorId: "2" },
  { day: 6, time: "09:00", duration: 45, summary: "Żółwiki — dzieci 4–6 lat",  colorId: "7" },
  { day: 6, time: "10:00", duration: 45, summary: "Delfiny — dzieci 7–10 lat", colorId: "1" },
  { day: 6, time: "11:00", duration: 45, summary: "Rekiny — zaawansowani",      colorId: "4" },
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
  { short: "Wt",  full: "Wtorek",       day: 2 },
  { short: "Śr",  full: "Środa",        day: 3 },
  { short: "Czw", full: "Czwartek",     day: 4 },
  { short: "Pt",  full: "Piątek",       day: 5 },
  { short: "Sob", full: "Sobota",       day: 6 },
];

// ── Time grid ─────────────────────────────────────────────────────────────────
const DEFAULT_HOUR_START = 8;
const DEFAULT_HOUR_END   = 21;
const PX_PER_MIN = 1.6;
const GAP_PX     = 3;

function getHourBounds(events: { start: { dateTime?: string; date?: string }; end: { dateTime?: string; date?: string } }[]) {
  if (events.length === 0) return { hourStart: DEFAULT_HOUR_START, hourEnd: DEFAULT_HOUR_END };
  let minH = DEFAULT_HOUR_START, maxH = DEFAULT_HOUR_END;
  for (const e of events) {
    const s = e.start.dateTime ?? e.start.date;
    const en = e.end.dateTime ?? e.end.date;
    if (s) minH = Math.min(minH, new Date(s).getHours());
    if (en) {
      const d = new Date(en);
      maxH = Math.max(maxH, d.getHours() + (d.getMinutes() > 0 ? 1 : 0));
    }
  }
  return { hourStart: Math.max(0, minH - 1), hourEnd: Math.min(24, maxH + 1) };
}

function makeGridUtils(hourStart: number, hourEnd: number) {
  const gridH = (hourEnd - hourStart) * 60 * PX_PER_MIN;
  const hourLabels = Array.from({ length: hourEnd - hourStart + 1 }, (_, i) => hourStart + i);
  const toY = (dt: string) => ((new Date(dt).getHours() - hourStart) * 60 + new Date(dt).getMinutes()) * PX_PER_MIN;
  const toH = (s: string, e: string) => Math.max((new Date(e).getTime() - new Date(s).getTime()) / 60000 * PX_PER_MIN, 28);
  return { gridH, hourLabels, toY, toH };
}

function fmt(dt: string): string {
  return new Date(dt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}
// ─────────────────────────────────────────────────────────────────────────────

function getEventColor(event: CalendarEvent, index: number): string {
  const map: Record<string, string> = {
    "1":  "bg-blue-100 text-blue-800",
    "2":  "bg-emerald-100 text-emerald-800",
    "3":  "bg-violet-100 text-violet-800",
    "4":  "bg-rose-100 text-rose-800",
    "5":  "bg-amber-100 text-amber-800",
    "6":  "bg-orange-100 text-orange-800",
    "7":  "bg-cyan-100 text-cyan-800",
    "8":  "bg-slate-100 text-slate-800",
    "9":  "bg-indigo-100 text-indigo-800",
    "10": "bg-emerald-100 text-emerald-800",
    "11": "bg-red-100 text-red-800",
  };
  if (event.colorId && map[event.colorId]) return map[event.colorId];
  const fallback = [
    "bg-blue-100 text-blue-800",
    "bg-cyan-100 text-cyan-800",
    "bg-emerald-100 text-emerald-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return fallback[index % fallback.length];
}

function getEventSummary(e: CalendarEvent): string {
  return e.summary?.trim() || "Zajęty";
}

function getWeekStart(offset = 0): Date {
  const now  = new Date();
  const day  = now.getDay();
  const diff = (day === 0 ? -6 : 1 - day) + offset * 7;
  const mon  = new Date(now);
  mon.setHours(0, 0, 0, 0);
  mon.setDate(now.getDate() + diff);
  return mon;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
}

function getTodayDayIndex(): number {
  const d = new Date().getDay();
  if (d === 0) return 0;
  return Math.min(d - 1, 5);
}

type GridUtils = ReturnType<typeof makeGridUtils>;

// ── Hour grid background ──────────────────────────────────────────────────────
function HourLines({ hourLabels }: { hourLabels: number[] }) {
  return (
    <>
      {hourLabels.map((_, i) => (
        <div
          key={i}
          className="absolute w-full border-t border-slate-100"
          style={{ top: i * 60 * PX_PER_MIN }}
        />
      ))}
    </>
  );
}

// ── Left time axis ────────────────────────────────────────────────────────────
function TimeAxis({ hourStart, hourLabels, gridH }: { hourStart: number; hourLabels: number[]; gridH: number }) {
  return (
    <div className="relative shrink-0" style={{ width: 56, height: gridH }}>
      {hourLabels.map((_, i) => (
        <div
          key={i}
          className="absolute right-3 text-xs font-bold tabular-nums select-none"
          style={{ top: i * 60 * PX_PER_MIN - 8, color: "var(--color-on-surface-variant)" }}
        >
          {String(hourStart + i).padStart(2, "0")}:00
        </div>
      ))}
    </div>
  );
}

// ── Single day column ─────────────────────────────────────────────────────────
function DayColumn({ events, grid }: { events: CalendarEvent[]; grid: GridUtils }) {
  const { gridH, hourLabels, toY, toH } = grid;
  return (
    <div className="relative flex-1 min-w-0 border-l border-slate-100" style={{ height: gridH }}>
      <HourLines hourLabels={hourLabels} />
      {events.map((evt, idx) => {
        const startDt = evt.start.dateTime ?? evt.start.date ?? "";
        const endDt   = evt.end.dateTime   ?? evt.end.date   ?? "";
        if (!startDt || !endDt) return null;
        const top    = toY(startDt) + GAP_PX;
        const height = toH(startDt, endDt) - GAP_PX * 2;
        return (
          <div
            key={evt.id}
            className={`absolute inset-x-1.5 rounded-lg overflow-hidden px-3 py-2 ${getEventColor(evt, idx)}`}
            style={{ top, height }}
          >
            <p className="text-xs font-bold leading-snug line-clamp-2">{getEventSummary(evt)}</p>
            {height >= 44 && (
              <p className="text-[10px] font-medium opacity-60 mt-1 leading-none">
                {fmt(startDt)}–{fmt(endDt)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Skeleton column ───────────────────────────────────────────────────────────
function SkeletonColumn({ grid }: { grid: GridUtils }) {
  const { gridH, hourLabels } = grid;
  return (
    <div className="relative flex-1 border-l border-slate-100" style={{ height: gridH }}>
      <HourLines hourLabels={hourLabels} />
      {[0.25, 0.52, 0.72].map((f) => (
        <div
          key={f}
          className="absolute inset-x-1.5 h-16 rounded-xl bg-slate-100 animate-pulse"
          style={{ top: f * gridH }}
        />
      ))}
    </div>
  );
}

export default function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents]         = useState<CalendarEvent[]>([]);
  const [loading, setLoading]       = useState(true);
  const [configured, setConfigured] = useState(true);
  const [selectedDayIdx, setSelectedDayIdx] = useState(getTodayDayIndex);

  const fetchEvents = useCallback(async (offset: number) => {
    setLoading(true);
    const weekStart = getWeekStart(offset);
    const weekEnd   = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    try {
      const params = new URLSearchParams({
        timeMin: weekStart.toISOString(),
        timeMax: weekEnd.toISOString(),
      });
      const res  = await fetch(`/api/calendar?${params}`);
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

  useEffect(() => { fetchEvents(weekOffset); }, [weekOffset, fetchEvents]);

  const weekStart = getWeekStart(weekOffset);
  const weekEnd   = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const eventsByDay = DAYS.map(({ day }) =>
    events.filter((e) => {
      const dt = e.start.dateTime ?? e.start.date;
      return dt ? new Date(dt).getDay() === day : false;
    })
  );

  const { hourStart, hourEnd } = getHourBounds(events);
  const grid = makeGridUtils(hourStart, hourEnd);

  return (
    <section className="py-24" style={{ backgroundColor: "var(--color-surface)" }} id="grafik">
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">Aktualny Grafik Zajęć</h2>
          <p className="text-xl font-bold text-blue-900 mb-2">Wybierz dogodny termin i zacznij naukę pływania</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4 font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
          <p>
            Zajęcia prowadzę zarówno w małych grupach (max 3 osoby), jak i w formie
            indywidualnej. Możesz wybrać opcję najlepiej dopasowaną do swoich potrzeb i celów.
          </p>
          <p>
            Standardowe zajęcia grupowe odbywają się raz w tygodniu i realizowane są na dwóch basenach:
          </p>
          <ul className="space-y-1 pl-2">
            <li>– Basen Ustronie (ul. Konopnickiej 5)</li>
            <li>– Basen Centrum (ul. Sybiraków 11)</li>
          </ul>
          <p>
            Jeśli zależy Ci na szybszych efektach, większym komforcie lub elastycznych terminach,
            możesz zdecydować się na zajęcia indywidualne, w pełni dopasowane do Twojego poziomu i możliwości.
          </p>
        </div>
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
                className="text-xs underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4h-2V7h2v6z"/>
              </svg>
              Przykładowy grafik
            </span>
            <span className="text-xs text-[var(--color-on-surface-variant)]">
              Prawdziwe zajęcia pojawią się po podłączeniu Google Calendar
            </span>
          </div>
        )}

        {/* ── MOBILE: card list ── */}
        <div className="md:hidden" aria-live="polite">
          <div
            className="grid grid-cols-6 gap-1 p-1 rounded-2xl mb-5"
            style={{ backgroundColor: "var(--color-surface-container)" }}
            role="tablist"
            aria-label="Wybierz dzień"
          >
            {DAYS.map((d, idx) => {
              const dayDate = new Date(weekStart);
              dayDate.setDate(weekStart.getDate() + idx);
              const isActive = selectedDayIdx === idx;
              return (
                <button
                  key={d.day}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`flex flex-col items-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 ${
                    isActive ? "shadow-sm scale-[1.04]" : "hover:bg-[var(--color-surface-container-high)]"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
                      : { color: "var(--color-on-surface-variant)" }
                  }
                >
                  <span className="uppercase tracking-wide">{d.short}</span>
                  <span className={`mt-0.5 text-[11px] font-extrabold tabular-nums ${isActive ? "opacity-80" : "opacity-60"}`}>
                    {dayDate.getDate()}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="font-extrabold text-lg text-[var(--color-on-surface)] mb-3">
            {DAYS[selectedDayIdx].full},{" "}
            <span style={{ color: "var(--color-primary)" }}>
              {formatDate((() => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + selectedDayIdx); return d; })())}
            </span>
          </p>

          <div
            className="rounded-xl p-5 shadow-sm space-y-3"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            {loading ? (
              <div className="space-y-3">
                {[0,1,2].map(i => <div key={i} className="h-12 rounded bg-slate-100 animate-pulse" />)}
              </div>
            ) : eventsByDay[selectedDayIdx].length === 0 ? (
              <p className="text-center py-8 font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                Brak zajęć w tym dniu.
              </p>
            ) : (
              [...eventsByDay[selectedDayIdx]]
                .sort((a, b) => {
                  const ta = a.start.dateTime ?? a.start.date ?? "";
                  const tb = b.start.dateTime ?? b.start.date ?? "";
                  return new Date(ta).getTime() - new Date(tb).getTime();
                })
                .map((evt, idx) => {
                  const startDt = evt.start.dateTime ?? evt.start.date ?? "";
                  const endDt   = evt.end.dateTime   ?? evt.end.date   ?? "";
                  return (
                    <div
                      key={evt.id}
                      className={`flex items-center gap-4 p-4 rounded-lg ${getEventColor(evt, idx)}`}
                    >
                      <div className="text-sm font-bold tabular-nums whitespace-nowrap opacity-80">
                        {fmt(startDt)}–{fmt(endDt)}
                      </div>
                      <div className="font-bold text-sm">{getEventSummary(evt)}</div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* ── DESKTOP: time grid ── */}
        <div className="hidden md:block overflow-x-auto" aria-live="polite">
          <div
            className="min-w-[720px] rounded-2xl shadow-sm overflow-hidden"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
          >
            {/* Day headers */}
            <div
              className="flex border-b sticky top-0 z-10"
              style={{
                borderColor: "var(--color-surface-container-high)",
                backgroundColor: "var(--color-surface-container-lowest)",
              }}
            >
              <div style={{ width: 56 }} className="shrink-0" />
              {DAYS.map((d, idx) => {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + idx);
                return (
                  <div
                    key={d.day}
                    className="flex-1 min-w-0 px-3 py-3 border-l border-slate-100"
                  >
                    <p className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>{d.full}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {formatDate(dayDate)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Scrollable grid body */}
            <div className="overflow-y-auto px-4 py-3" style={{ maxHeight: 560 }}>
              <div className="flex">
                <TimeAxis hourStart={hourStart} hourLabels={grid.hourLabels} gridH={grid.gridH} />
                {loading
                  ? DAYS.map((d) => <SkeletonColumn key={d.day} grid={grid} />)
                  : DAYS.map((_, idx) => <DayColumn key={idx} events={eventsByDay[idx]} grid={grid} />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
