import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 9,
          background: "#0F3D39",
          color: "#F9F9F9",
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        C
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 5,
            height: 5,
            borderRadius: 99,
            background: "#109F83",
            boxShadow: "0 0 0 2px rgba(249,249,249,.16)",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: -8,
            bottom: -8,
            width: 22,
            height: 22,
            borderRadius: 99,
            border: "1px solid rgba(16,159,131,.55)",
          }}
        />
      </div>
    ),
    size,
  );
}
