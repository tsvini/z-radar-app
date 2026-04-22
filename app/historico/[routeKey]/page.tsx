type DashboardRoute = {
  key: string;
  label: string;
  lastExecution?: string;
  error?: string;
  healthPercent?: number;
  outdatedPages?: number;
  criticalPages?: number;
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
    return "Visão operacional da documentação, auditorias e evolução da frente EduTech.";
  }

  if (key === "assistente-virtual") {
    return "Visão operacional da documentação, auditorias e evolução da frente Assistente Virtual.";
  }

  return "Visão operacional da rota monitorada.";
}

function getRouteStatus(route: DashboardRoute) {
  if (route.error) {
    return {
      label: "Atenção",
      textColor: "#fecaca",
      bg: "rgba(239,68,68,0.12)",
      border: "1px solid rgba(239,68,68,0.22)",
      glow: "0 0 22px rgba(239,68,68,0.10)",
    };
  }

  if (route.lastExecution) {
    return {
      label: "Operacional",
      textColor: "#8ef7b5",
      bg: "rgba(18,242,118,0.10)",
      border: "1px solid rgba(18,242,118,0.18)",
      glow: "0 0 22px rgba(18,242,118,0.10)",
    };
  }

  return {
    label: "Sem histórico",
    textColor: "#d8e3f1",
    bg: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    glow: "none",
  };
}

function formatMetricValue(value?: number) {
  return typeof value === "number" ? String(value) : "—";
}

function renderMetricCard(
  title: string,
  value: string,
  accent: "good" | "warning" | "danger" | "neutral" = "neutral"
) {
  const accentMap = {
    good: {
      color: "#86efac",
      border: "rgba(18,242,118,0.16)",
      bg: "rgba(18,242,118,0.05)",
    },
    warning: {
      color: "#fde68a",
      border: "rgba(245,158,11,0.16)",
      bg: "rgba(245,158,11,0.05)",
    },
    danger: {
      color: "#fecaca",
      border: "rgba(239,68,68,0.16)",
      bg: "rgba(239,68,68,0.05)",
    },
    neutral: {
      color: "#f8fafc",
      border: "rgba(255,255,255,0.08)",
      bg: "rgba(255,255,255,0.03)",
    },
  }[accent];

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: "18px",
        background: accentMap.bg,
        border: `1px solid ${accentMap.border}`,
        minHeight: "96px",
      }}
    >
      <div
        style={{
          color: "#8ea4c1",
          fontSize: "12px",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color: accentMap.color,
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </div>
    </div>
  );
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
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 15% 18%, rgba(18,242,118,0.14), transparent 18%), radial-gradient(circle at 78% 12%, rgba(25,119,255,0.12), transparent 20%), radial-gradient(circle at 52% 110%, rgba(18,242,118,0.08), transparent 30%), linear-gradient(180deg, #03101d 0%, #04111f 32%, #020916 100%)",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.9,
          background:
            "radial-gradient(ellipse at 10% 25%, rgba(18,242,118,0.18), transparent 22%), radial-gradient(ellipse at 88% 16%, rgba(0,153,255,0.12), transparent 18%), radial-gradient(ellipse at 45% 80%, rgba(18,242,118,0.08), transparent 24%)",
          filter: "blur(20px)",
          animation: "auroraFloat 14s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(circle at center, black 45%, transparent 95%)",
          opacity: 0.35,
        }}
      />

      <style>{`
        @keyframes auroraFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -18px, 0) scale(1.03);
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1420px",
          margin: "0 auto",
          padding: "26px 24px 44px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            padding: "20px 24px",
            borderRadius: "28px",
            marginBottom: "22px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(5,12,24,0.70)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.26)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgba(18,242,118,0.10), rgba(18,242,118,0.03))",
                border: "1px solid rgba(18,242,118,0.16)",
                boxShadow: "0 0 36px rgba(18,242,118,0.12)",
                overflow: "hidden",
              }}
            >
              <img
                src="https://raw.githubusercontent.com/tsvini/logo-zallpy-orbit/main/ChatGPT%20Image%2021%20de%20abr.%20de%202026%2C%2023_37_15.png"
                alt="Z-RADAR"
                style={{
                  width: "78%",
                  height: "78%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 12px rgba(18,242,118,0.14))",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8dd7ff",
                  marginBottom: "6px",
                }}
              >
                Z-Radar Platform
              </div>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  marginBottom: "8px",
                }}
              >
                {productName}
              </div>

              <div
                style={{
                  color: "#97a9c4",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  maxWidth: "620px",
                }}
              >
                Auditoria documental, histórico operacional e estrutura preparada
                para inteligência contextual.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={globalAuditUrl}
              style={{
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #12f276 0%, #0dd65e 100%)",
                color: "#04110a",
                fontWeight: 800,
                fontSize: "15px",
                boxShadow: "0 16px 34px rgba(18,242,118,0.22)",
                whiteSpace: "nowrap",
              }}
            >
              Abrir auditoria documental
            </a>

            <button
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#e8f0fb",
                fontSize: "18px",
                cursor: "pointer",
              }}
              title="Configurações"
            >
              ⚙
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.95fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "34px",
              padding: "32px",
              border: "1px solid rgba(18,242,118,0.14)",
              background:
                "radial-gradient(circle at top left, rgba(18,242,118,0.10), transparent 24%), linear-gradient(135deg, rgba(5,18,34,0.94), rgba(5,18,25,0.94))",
              boxShadow: "0 26px 80px rgba(0,0,0,0.30)",
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
                marginBottom: "20px",
              }}
            >
              Painel central
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "58px",
                lineHeight: 0.98,
                letterSpacing: "-0.06em",
                maxWidth: "900px",
              }}
            >
              A operação do Z-RADAR começa pelas rotas monitoradas
            </h1>

            <p
              style={{
                marginTop: "18px",
                marginBottom: "26px",
                color: "#9db1cb",
                fontSize: "18px",
                lineHeight: 1.75,
                maxWidth: "860px",
              }}
            >
              Visualize as frentes ativas, abra a auditoria documental, consulte
              históricos por rota e prepare o terreno para a camada futura de IA
              com contexto real da operação.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "14px",
              }}
            >
              {renderMetricCard("Rotas monitoradas", String(routes.length), "neutral")}
              {renderMetricCard("Módulos futuros", String(upcomingModules.length), "neutral")}
              {renderMetricCard("Camada IA", "Em breve", "good")}
            </div>
          </div>

          <div
            style={{
              borderRadius: "34px",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(5,12,24,0.74)",
              boxShadow: "0 26px 80px rgba(0,0,0,0.28)",
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <div
              style={{
                color: "#8dd7ff",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Workspace IA
            </div>

            <div
              style={{
                borderRadius: "26px",
                padding: "22px",
                minHeight: "240px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    marginBottom: "12px",
                  }}
                >
                  Chat operacional com IA
                </div>

                <div
                  style={{
                    color: "#9ab0ca",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    maxWidth: "520px",
                  }}
                >
                  Espaço reservado para conversas contextuais sobre rotas,
                  documentação, auditorias, relatórios e acompanhamento da operação.
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  borderRadius: "18px",
                  padding: "16px",
                  background: "rgba(18,242,118,0.05)",
                  border: "1px solid rgba(18,242,118,0.10)",
                  color: "#dfffea",
                }}
              >
                Aqui depois entra o chat, os prompts rápidos e o resumo inteligente
                da operação.
              </div>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  borderRadius: "20px",
                  padding: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
                  Relatórios inteligentes
                </div>
                <div style={{ color: "#8ea4c1", fontSize: "14px", lineHeight: 1.7 }}>
                  Consolidação futura de execução, falhas, pendências e leitura assistida.
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e6eefb",
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
            gridTemplateColumns: "1.42fr 0.82fr",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              borderRadius: "34px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(5,12,24,0.76)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                fontSize: "42px",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                marginBottom: "18px",
              }}
            >
              Rotas monitoradas
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              {routes.map((route) => {
                const routeAuditUrl = `${workerBaseUrl}?routeKey=${encodeURIComponent(route.key)}`;
                const historyUrl = `/historico/${encodeURIComponent(route.key)}`;
                const status = getRouteStatus(route);

                const hasOptionalStats =
                  typeof route.healthPercent === "number" ||
                  typeof route.outdatedPages === "number" ||
                  typeof route.criticalPages === "number";

                return (
                  <div
                    key={route.key}
                    style={{
                      borderRadius: "28px",
                      padding: "24px",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.07)",
                      boxShadow: status.glow,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "18px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: "1 1 640px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: 800,
                              letterSpacing: "-0.04em",
                            }}
                          >
                            {route.label}
                          </div>

                          <span
                            style={{
                              padding: "8px 12px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              color: status.textColor,
                              background: status.bg,
                              border: status.border,
                            }}
                          >
                            {status.label}
                          </span>
                        </div>

                        <div
                          style={{
                            color: "#97a9c4",
                            fontSize: "15px",
                            lineHeight: 1.75,
                            marginBottom: "14px",
                            maxWidth: "760px",
                          }}
                        >
                          {getRouteDescription(route)}
                        </div>

                        <div
                          style={{
                            color: "#eef5ff",
                            fontSize: "15px",
                            marginBottom: "6px",
                          }}
                        >
                          {route.lastExecution
                            ? `Última execução: ${route.lastExecution}`
                            : route.error
                            ? route.error
                            : "Sem execução registrada ainda."}
                        </div>

                        <div
                          style={{
                            color: "#7890ae",
                            fontSize: "13px",
                            marginBottom: hasOptionalStats ? "16px" : "0",
                          }}
                        >
                          Chave da rota: {route.key}
                        </div>

                        {hasOptionalStats && (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                              gap: "12px",
                              marginBottom: "18px",
                              marginTop: "16px",
                            }}
                          >
                            {renderMetricCard(
                              "Saúde",
                              typeof route.healthPercent === "number"
                                ? `${route.healthPercent}%`
                                : "—",
                              "good"
                            )}
                            {renderMetricCard(
                              "Desatualizadas",
                              formatMetricValue(route.outdatedPages),
                              "warning"
                            )}
                            {renderMetricCard(
                              "Críticas",
                              formatMetricValue(route.criticalPages),
                              "danger"
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          alignSelf: "flex-end",
                        }}
                      >
                        <a
                          href={routeAuditUrl}
                          style={{
                            textDecoration: "none",
                            padding: "13px 18px",
                            borderRadius: "16px",
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
                            padding: "13px 18px",
                            borderRadius: "16px",
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
                            padding: "13px 18px",
                            borderRadius: "16px",
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
              borderRadius: "34px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(5,12,24,0.76)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                marginBottom: "16px",
              }}
            >
              Próximos blocos
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {upcomingModules.map((module) => (
                <div
                  key={module.key}
                  style={{
                    padding: "18px",
                    borderRadius: "22px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          marginBottom: "6px",
                        }}
                      >
                        {module.name}
                      </div>
                      <div
                        style={{
                          color: "#8ea4c1",
                          fontSize: "14px",
                          lineHeight: 1.7,
                        }}
                      >
                        Espaço reservado para evolução futura da plataforma.
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "8px 10px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#e6eefb",
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
                borderRadius: "24px",
                padding: "20px",
                background: "rgba(18,242,118,0.05)",
                border: "1px solid rgba(18,242,118,0.12)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  marginBottom: "8px",
                }}
              >
                Direção do produto
              </div>

              <div
                style={{
                  color: "#93a9c5",
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                O próximo salto é ligar histórico real por rota, relatórios
                inteligentes e a camada conversacional da IA dentro da mesma
                experiência visual.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}