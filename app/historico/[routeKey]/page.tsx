type HistoryPageProps = {
  params: Promise<{
    routeKey: string;
  }>;
};

function getRouteLabel(routeKey: string) {
  const normalized = String(routeKey || "").toLowerCase();

  if (normalized === "edutech") return "EduTech";
  if (normalized === "assistente-virtual") return "Assistente Virtual";

  return routeKey;
}

export default async function HistoricoPage({ params }: HistoryPageProps) {
  const resolvedParams = await params;
  const routeKey = resolvedParams.routeKey;
  const routeLabel = getRouteLabel(routeKey);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(18,242,118,0.08), transparent 20%), linear-gradient(180deg, #040915 0%, #07111f 48%, #030814 100%)",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#cfe5ff",
            textDecoration: "none",
            marginBottom: "18px",
            fontWeight: 700,
          }}
        >
          ← Voltar ao dashboard
        </a>

        <div
          style={{
            borderRadius: "28px",
            padding: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(7,13,25,0.78)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "rgba(18,242,118,0.08)",
              border: "1px solid rgba(18,242,118,0.14)",
              color: "#86efac",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Histórico da rota
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              letterSpacing: "-0.05em",
            }}
          >
            {routeLabel}
          </h1>

          <p
            style={{
              marginTop: "14px",
              marginBottom: "24px",
              color: "#97a9c4",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "760px",
            }}
          >
            Esta área vai mostrar o histórico completo das execuções da rota,
            eventos anteriores, falhas, relatórios e trilha operacional.
          </p>

          <div
            style={{
              padding: "20px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>
              Em construção
            </div>
            <div style={{ color: "#8ea4c1", fontSize: "14px", lineHeight: 1.65 }}>
              No próximo passo vamos conectar esta tela ao Worker para listar as
              execuções anteriores da rota <strong>{routeLabel}</strong>.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}