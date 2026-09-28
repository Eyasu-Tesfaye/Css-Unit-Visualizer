import { ImageResponse } from "next/og";

export const alt = "CSScope — Interactive CSS Unit Visualizer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#050508",
        // Dramatic multi-spot ambient lighting
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.35) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, rgba(5, 5, 8, 1) 100%)",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      {/* Top Header Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 900,
              fontFamily: "monospace",
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
            }}
          >
            px
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            CSScope
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#38bdf8",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          Interactive Visualizer
        </div>
      </div>

      {/* Hero Content Split Layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {/* Left Text Pitch */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "580px",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
            }}
          >
            Master CSS Units in Real-Time.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            Instantly bridge the gap between abstract unit definitions and live
            responsive scaling.
          </div>
        </div>

        {/* Right Floating IDE / Live Card Preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "420px",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15)",
          }}
        >
          {/* Window Dots */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
          </div>

          {/* Code Snippet Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              gap: "8px",
            }}
          >
            <div
              style={{ display: "flex", fontSize: "15px", color: "#38bdf8" }}
            >
              font-size: <span style={{ color: "#f472b6" }}>2rem</span>;
            </div>
            <div
              style={{ display: "flex", fontSize: "14px", color: "#64748b" }}
            >
              // Root: 16px computed
            </div>
          </div>

          {/* Conversion Result Highlight */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{ display: "flex", fontSize: "14px", color: "#94a3b8" }}
            >
              Rendered Width
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "24px",
                fontWeight: 800,
                color: "#34d399",
                fontFamily: "monospace",
              }}
            >
              32px
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          csscope.vercel.app
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "15px",
            color: "#f1f5f9",
            fontWeight: 700,
          }}
        >
          Built by Jozh
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
