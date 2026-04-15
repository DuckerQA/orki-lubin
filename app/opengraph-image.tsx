import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ORKI LUBIN | Szkoła Pływania";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #0ea5e9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            ORKI LUBIN
          </div>
          <div
            style={{
              fontSize: 34,
              color: "rgba(255,255,255,0.85)",
              fontWeight: 600,
              marginTop: 20,
            }}
          >
            Szkoła Pływania
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.6)",
              marginTop: 14,
              textAlign: "center",
            }}
          >
            Nauka pływania dla dzieci i dorosłych w Lubinie
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 32,
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span>Basen Ustronie · ul. Konopnickiej 5</span>
            <span>Basen Centrum · ul. Sybiraków 11</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
