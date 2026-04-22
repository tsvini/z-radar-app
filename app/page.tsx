type DashboardRoute = {
  key: string;
  label: string;
  lastExecution?: string;
  error?: string;
};

type DashboardModule = {
  key: string;
  name: string;
};

type DashboardResponse = {
  ok: boolean;
  productName?: string;
  activeModules?: DashboardModule[];
  upcomingModules?: DashboardModule[];
  routes?: DashboardRoute[];
};

async function getDashboardData(): Promise<DashboardResponse> {
  const baseUrl = process.env.WORKER_BASE_URL;
  const token = process.env.WORKER_DASHBOARD_TOKEN;

  if (!baseUrl) {
    throw new Error("WORKER_BASE_URL não configurada.");
  }

  if (!token) {
    throw new Error("WORKER_DASHBOARD_TOKEN não configurado.");
  }

  const response = await fetch(`${baseUrl}/api/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar dashboard (${response.status}).`);
  }

  const data = (await response.json()) as DashboardResponse;

  if (!data?.ok) {
    throw new Error("Worker retornou erro ao montar dashboard.");
  }

  return data;
}

function getRouteDescription(route: DashboardRoute) {
  const key = String(route.key || "").toLowerCase();

  if (key === "edutech") {
    return "Monitoramento da documentação e execução operacional da frente EduTech.";
  }

  if (key === "assistente-virtual") {
    return "Monitoramento da documentação e execução operacional da frente Assistente Virtual.";
  }

  return "Monitoramento operacional da rota selecionada.";
}

function getRouteStatus(route: DashboardRoute) {
  if (route.error) {
    return {
      label: "Atenção",
      color: "#fecaca",
      background: "rgba(239,68,68,0.10)",
      border: "1px solid rgba(239,68,68,0.18)",
    };
  }

  if (route.lastExecution) {
    return {
      label: "Operacional",
      color: "#86efac",
      background: "rgba(18,242,118,0.10)",
      border: "1px solid rgba(18,242,118,0.18)",
    };
  }

  return {
    label: "Sem histórico",
    color: "#cbd5e1",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
}

export default async function Home() {
  const data = await getDashboardData();

  const workerBaseUrl = process.env.WORKER_BASE_URL || "";
  const productName = data.productName || "Z-Radar";
  const routes = Array.isArray(data.routes) ? data.routes : [];
  const upcomingModules = Array.isArray(data.upcomingModules) ? data.upcomingModules : [];

  const globalAuditUrl = `${workerBaseUrl}?routeKey=all`;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(18,242,118,0.08), transparent 20%), radial-gradient(circle at top right, rgba(0,153,255,0.08), transparent 18%), linear-gradient(180deg, #040915 0%, #07111f 48%, #030814 100%)",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "28px 24px 36px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "18px",
            marginBottom: "22px",
            padding: "18px 22px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(7,13,25,0.76)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.28)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src="https://raw.githubusercontent.com/tsvini/logo-zallpy-orbit/main/Zallpy_Orbit.png"
              alt="Z-RADAR"
              style={{
                width: "54px",
                height: "54px",
                objectFit: "contain",
                borderRadius: "16px",
                border: "1px solid rgba(18,242,118,0.18)",
                background: "rgba(18,242,118,0.05)",
                boxShadow: "0 0 26px rgba(18,242,118,0.14)",
                padding: "6px",
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8dd7ff",
                  marginBottom: "4px",
                }}
              >
                Z-Radar Platform
              </div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                {productName}
              </div>
              <div
                style={{
                  color: "#8ea4c1",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                Auditoria, monitoramento e inteligência operacional
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={globalAuditUrl}
              style={{
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #12f276 0%, #0dd65e 100%)",
                color: "#04110a",
                fontWeight: 800,
                boxShadow: "0 16px 34px rgba(18,242,118,0.20)",
              }}
            >
              Abrir auditoria documental
            </a>

            <button
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#e6eefb",
                fontSize: "18px",
                cursor: "pointer",
              }}
              title="Configurações"
            >
              ⚙
            </button>

            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
              title="Perfil"
            >
              Z
            </div>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 0.95fr",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "30px",
              padding: "30px",
              border: "1px solid rgba(18,242,118,0.14)",
              background:
                "radial-gradient(circle at top left, rgba(18,242,118,0.08), transparent 25%), linear-gradient(135deg, rgba(6,18,34,0.96), rgba(7,22,20,0.92))",
              boxShadow: "0 24px 80px rgba(0,0,0,0.32)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(18,242,118,0.08)",
                border: "1px solid rgba(18,242,118,0.15)",
                color: "#8ef7b5",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Painel operacional
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "46px",
                lineHeight: 1.04,
                letterSpacing: "-0.05em",
                maxWidth: "780px",
              }}
            >
              Uma visão central para auditoria, histórico e inteligência operacional
            </h1>

            <p
              style={{
                marginTop: "16px",
                marginBottom: "24px",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "#9cb0c9",
                maxWidth: "760px",
              }}
            >
              Acompanhe as rotas monitoradas, abra a auditoria documental, navegue
              pelo histórico das execuções e prepare o espaço do futuro chat com IA
              dentro da mesma experiência do Z-RADAR.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ color: "#8ea4c1", fontSize: "13px" }}>Rotas ativas</div>
                <div style={{ fontSize: "30px", fontWeight: 800, marginTop: "6px" }}>
                  {routes.length}
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ color: "#8ea4c1", fontSize: "13px" }}>Blocos futuros</div>
                <div style={{ fontSize: "30px", fontWeight: 800, marginTop: "6px" }}>
                  {upcomingModules.length}
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  background: "rgba(18,242,118,0.06)",
                  border: "1px solid rgba(18,242,118,0.14)",
                }}
              >
                <div style={{ color: "#8ea4c1", fontSize: "13px" }}>Experiência</div>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "8px" }}>
                  Enterprise-ready
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "30px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(7,13,25,0.78)",
              boxShadow: "0 20px 70px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                color: "#8dd7ff",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Workspace IA
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "22px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "12px",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                Chat operacional com IA
              </div>
              <div style={{ color: "#97a9c4", fontSize: "14px", lineHeight: 1.65 }}>
                Espaço reservado para conversas contextuais com as rotas, geração de
                respostas, análise de documentação e apoio à operação.
              </div>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  padding: "16px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                  Relatório inteligente
                </div>
                <div style={{ color: "#8ea4c1", fontSize: "13px", lineHeight: 1.6 }}>
                  Síntese automática das execuções, pendências e tendências por rota.
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "6px" }}>
                  Assistente contextual
                </div>
                <div style={{ color: "#8ea4c1", fontSize: "13px", lineHeight: 1.6 }}>
                  Respostas futuras baseadas em histórico, rota, documentação e status.
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  marginTop: "4px",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#d7e1ef",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Em breve
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "28px",
              padding: "22px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(7,13,25,0.78)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "18px",
              }}
            >
              Rotas monitoradas
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {routes.map((route) => {
                const status = getRouteStatus(route);
                const routeAuditUrl = `${workerBaseUrl}?routeKey=${encodeURIComponent(route.key)}`;
                const historyUrl = `/historico/${encodeURIComponent(route.key)}`;

                return (
                  <div
                    key={route.key}
                    style={{
                      padding: "22px",
                      borderRadius: "22px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ maxWidth: "720px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: 800,
                              letterSpacing: "-0.03em",
                            }}
                          >
                            {route.label}
                          </div>

                          <span
                            style={{
                              padding: "7px 11px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              color: status.color,
                              background: status.background,
                              border: status.border,
                            }}
                          >
                            {status.label}
                          </span>
                        </div>

                        <div
                          style={{
                            color: "#9bb0ca",
                            fontSize: "14px",
                            lineHeight: 1.65,
                            marginBottom: "10px",
                          }}
                        >
                          {getRouteDescription(route)}
                        </div>

                        <div style={{ color: "#dbe7f7", fontSize: "14px", marginBottom: "4px" }}>
                          {route.lastExecution
                            ? `Última execução: ${route.lastExecution}`
                            : route.error
                            ? route.error
                            : "Sem execução concluída registrada ainda."}
                        </div>

                        <div style={{ color: "#7890ae", fontSize: "13px" }}>
                          Chave da rota: {route.key}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <a
                          href={routeAuditUrl}
                          style={{
                            textDecoration: "none",
                            padding: "12px 16px",
                            borderRadius: "14px",
                            background: "rgba(18,242,118,0.08)",
                            border: "1px solid rgba(18,242,118,0.16)",
                            color: "#dfffea",
                            fontWeight: 700,
                          }}
                        >
                          Abrir auditoria
                        </a>

                        <a
                          href={historyUrl}
                          style={{
                            textDecoration: "none",
                            padding: "12px 16px",
                            borderRadius: "14px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#eef4ff",
                            fontWeight: 700,
                          }}
                        >
                          Ver histórico
                        </a>

                        <button
                          disabled
                          style={{
                            padding: "12px 16px",
                            borderRadius: "14px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#8ea4c1",
                            fontWeight: 700,
                            cursor: "not-allowed",
                          }}
                        >
                          Relatório IA
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              borderRadius: "28px",
              padding: "22px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(7,13,25,0.78)",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Estrutura em evolução
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {upcomingModules.map((module) => (
                <div
                  key={module.key}
                  style={{
                    padding: "16px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "16px" }}>
                        {module.name}
                      </div>
                      <div
                        style={{
                          marginTop: "6px",
                          color: "#8ea4c1",
                          fontSize: "13px",
                          lineHeight: 1.6,
                        }}
                      >
                        Bloco reservado para expansão futura do ecossistema.
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "8px 10px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#e5edf8",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Em breve
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "18px",
                padding: "18px",
                borderRadius: "20px",
                background: "rgba(18,242,118,0.05)",
                border: "1px solid rgba(18,242,118,0.12)",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "8px" }}>
                Próximo passo sugerido
              </div>
              <div style={{ color: "#93a9c5", fontSize: "14px", lineHeight: 1.65 }}>
                Conectar histórico real por rota e depois abrir o espaço do chat da IA
                com contexto operacional.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}