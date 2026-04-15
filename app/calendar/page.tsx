"use client";

import { useState, useEffect } from "react";

interface CalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  colorId?: string;
  status?: string;
}

interface CalendarResponse {
  items?: CalendarEvent[];
  error?: string;
  kind?: string;
  summary?: string;
}

function fmt(dt: string): string {
  return new Date(dt).toLocaleString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtDate(dt: string): string {
  return new Date(dt).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtTime(dt: string): string {
  return new Date(dt).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CalendarDebugPage() {
  const [data, setData] = useState<CalendarResponse | null>(null);
  const [rawJson, setRawJson] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [weeksAhead, setWeeksAhead] = useState(8);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const now = new Date();
        const timeMin = new Date(now);
        timeMin.setDate(now.getDate() - 7); // 1 tydzień wstecz
        const timeMax = new Date(now);
        timeMax.setDate(now.getDate() + weeksAhead * 7);

        const params = new URLSearchParams({
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
        });

        const res = await fetch(`/api/calendar?${params}`);
        const json = await res.json();
        setData(json);
        setRawJson(JSON.stringify(json, null, 2));
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [weeksAhead]);

  const isConfigured = data?.error !== "Calendar not configured";
  const events = data?.items ?? [];

  // Group events by date
  const grouped: Record<string, CalendarEvent[]> = {};
  for (const evt of events) {
    const dt = evt.start.dateTime ?? evt.start.date ?? "";
    if (!dt) continue;
    const dateKey = new Date(dt).toISOString().slice(0, 10);
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(evt);
  }
  const sortedDates = Object.keys(grouped).sort();

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900">
            Debug — Kalendarz
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Strona diagnostyczna — pokazuje wszystkie eventy pobrane z API
          </p>
        </div>

        {/* Status card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-3">
          <h2 className="font-bold text-lg text-slate-800">Status API</h2>

          {loading ? (
            <div className="h-6 w-48 bg-slate-100 animate-pulse rounded" />
          ) : error ? (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 rounded-lg px-4 py-2 text-sm font-medium">
              <span>Błąd fetch:</span>
              <code className="font-mono">{error}</code>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${isConfigured ? "bg-green-500" : "bg-amber-400"}`}
                />
                <span className="text-sm font-medium text-slate-700">
                  {isConfigured
                    ? "Google Calendar skonfigurowany — dane są prawdziwe"
                    : "Google Calendar NIE skonfigurowany — widoczne są dane przykładowe (dummy)"}
                </span>
              </div>

              {data?.error && data.error !== "Calendar not configured" && (
                <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2 font-mono">
                  error: {data.error}
                </div>
              )}

              {data?.summary && (
                <div className="text-sm text-slate-500">
                  Kalendarz: <span className="font-semibold text-slate-700">{data.summary}</span>
                </div>
              )}

              <div className="text-sm text-slate-500">
                Znalezione eventy: <span className="font-bold text-slate-800">{events.length}</span>
                {" "}(zakres: 1 tydzień wstecz + {weeksAhead} tygodnie do przodu)
              </div>
            </div>
          )}

          {/* Range selector */}
          <div className="flex items-center gap-3 pt-1">
            <label className="text-sm font-medium text-slate-600">Tygodnie do przodu:</label>
            {[2, 4, 8, 12, 24].map((w) => (
              <button
                key={w}
                onClick={() => setWeeksAhead(w)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  weeksAhead === w
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Event list */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <h2 className="font-bold text-lg text-slate-800 mb-4">
            Lista eventów ({events.length})
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 bg-slate-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">
              Brak eventów w podanym zakresie dat.
              {!isConfigured && (
                <p className="mt-2 text-sm text-amber-600">
                  Kalendarz nie jest podłączony — aby zobaczyć prawdziwe eventy, ustaw zmienne środowiskowe{" "}
                  <code className="font-mono bg-amber-50 px-1 rounded">GOOGLE_CALENDAR_ID</code> i{" "}
                  <code className="font-mono bg-amber-50 px-1 rounded">GOOGLE_API_KEY</code>.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedDates.map((dateKey) => {
                const dayEvents = grouped[dateKey].sort((a, b) => {
                  const ta = a.start.dateTime ?? a.start.date ?? "";
                  const tb = b.start.dateTime ?? b.start.date ?? "";
                  return new Date(ta).getTime() - new Date(tb).getTime();
                });
                const dateLabel = fmtDate(dateKey);
                const isToday = dateKey === new Date().toISOString().slice(0, 10);
                return (
                  <div key={dateKey}>
                    <h3
                      className={`text-sm font-bold mb-2 px-1 ${
                        isToday ? "text-blue-700" : "text-slate-500"
                      }`}
                    >
                      {isToday ? "DZIŚ — " : ""}{dateLabel}
                    </h3>
                    <div className="space-y-2">
                      {dayEvents.map((evt) => {
                        const startDt = evt.start.dateTime ?? evt.start.date ?? "";
                        const endDt = evt.end.dateTime ?? evt.end.date ?? "";
                        const hasTime = !!evt.start.dateTime;
                        // wszystkie pola eventu oprócz id (pokazane osobno)
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, start, end, ...rest } = evt as unknown as Record<string, unknown>;
                        const extraFields = Object.entries(rest as Record<string, unknown>);
                        return (
                          <div
                            key={evt.id}
                            className="border border-slate-200 rounded-xl px-4 py-3 space-y-2"
                          >
                            {/* Czas + ID */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                {hasTime ? `${fmtTime(startDt)} – ${fmtTime(endDt)}` : "Cały dzień"}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 break-all">
                                id: {evt.id}
                              </span>
                            </div>

                            {/* start / end raw */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                              <div className="bg-slate-50 rounded px-2 py-1 font-mono text-slate-500 break-all">
                                <span className="font-bold text-slate-700">start: </span>
                                {JSON.stringify(evt.start)}
                              </div>
                              <div className="bg-slate-50 rounded px-2 py-1 font-mono text-slate-500 break-all">
                                <span className="font-bold text-slate-700">end: </span>
                                {JSON.stringify(evt.end)}
                              </div>
                            </div>

                            {/* Wszystkie pozostałe pola 1:1 */}
                            <div className="space-y-1">
                              {extraFields.map(([key, val]) => (
                                <div key={key} className="flex gap-2 text-xs flex-wrap">
                                  <span className="font-bold text-slate-600 shrink-0 w-28">{key}:</span>
                                  <span className="text-slate-800 break-all font-mono">
                                    {typeof val === "string" ? val : JSON.stringify(val)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Raw JSON toggle */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <button
            onClick={() => setShowRaw((v) => !v)}
            className="flex items-center gap-2 font-bold text-slate-700 hover:text-blue-700 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${showRaw ? "rotate-90" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Raw JSON z API
          </button>
          {showRaw && (
            <pre className="mt-4 bg-slate-900 text-green-400 rounded-xl p-4 text-xs overflow-auto max-h-[60vh] font-mono leading-relaxed">
              {rawJson || "Ładowanie…"}
            </pre>
          )}
        </div>

        {/* Back link */}
        <div className="text-center pb-4">
          <a
            href="/"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ← Wróć na stronę główną
          </a>
        </div>
      </div>
    </main>
  );
}
