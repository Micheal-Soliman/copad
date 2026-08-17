import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: 42,
          background: "#013D60",
          color: "#E8F5FD",
          fontSize: 116,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        C
        <span
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 27,
            height: 27,
            borderRadius: 99,
            background: "#0090AF",
            boxShadow: "0 0 0 10px rgba(249,249,249,.12)",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: -40,
            bottom: -40,
            width: 125,
            height: 125,
            borderRadius: 999,
            border: "6px solid rgba(123,205,237,.65)",
          }}
        />
      </div>
    ),
    size,
  );
}
