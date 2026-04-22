export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>Z-Radar</h1>
        <p style={{ fontSize: "18px", color: "#94a3b8" }}>
          Dashboard inicial em construção.
        </p>
      </div>
    </main>
  );
}