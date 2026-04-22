async function getDashboardData() {
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

  const data = await response.json();

  if (!data?.ok) {
    throw new Error(data?.error || "Falha ao carregar dashboard.");
  }

  return data;
}

export default async function Home() {
  const data = await getDashboardData();

  const activeModules = Array.isArray(data.activeModules) ? data.activeModules : [];
  const upcomingModules = Array.isArray(data.upcomingModules) ? data.upcomingModules : [];
  const routes = Array.isArray(data.routes) ? data.routes : [];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(18,242,118,0.10), transparent 22%), radial-gradient(circle at top right, rgba(76,175,255,0.10), transparent 18%), linear-gradient(180deg, #06101f 0%, #081426 45%, #050b16 100%)",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "28px 24px 40px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "28px",
            padding: "18px 22px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,15,28,0.72)",
            borderRadius: "22px",
            backdropFilter: "blur(14px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgba(18,242,118,0.18), rgba(18,242,118,0.05))",
                border: "1px solid rgba(18,242,118,0.25)",
                boxShadow: "0 0 24px rgba(18,242,118,0.16)",
                fontSize: "26px",
                fontWeight: 800,
                color: "#19f67d",
              }}
            >
              Z
            </div>

            <div>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Z-RADAR Platform
              </div>
              <div
                style={{
                  fontSize: "30px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                {data.productName || "Z-Radar"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#e5eefc",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 14px",
                borderRadius: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Perfil
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#e5eefc",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 14px",
                borderRadius: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Configurações
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#e5eefc",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 14px",
                borderRadius: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "28px",
              padding: "28px",
              border: "1px solid rgba(18,242,118,0.16)",
              background:
                "linear-gradient(135deg, rgba(7,17,32,0.90), rgba(8,29,29,0.88))",
              boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(18,242,118,0.10)",
                border: "1px solid rgba(18,242,118,0.16)",
                color: "#78f0aa",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Operação central
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "40px",
                lineHeight: 1.05,
                letterSpacing: "-0.05em",
              }}
            >
              Painel inicial do Z-RADAR
            </h1>

            <p
              style={{
                marginTop: "14px",
                marginBottom: "24px",
                color: "#97a9c4",
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "680px",
              }}
            >
              Centralize auditorias, acompanhe execuções e prepare a expansão dos
              próximos módulos na mesma experiência visual do produto.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                style={{
                  padding: "14px 18px",
                  borderRadius: "16px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #12f276 0%, #0dd65e 100%)",
                  color: "#04110a",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 16px 36px rgba(18,242,118,0.20)",
                }}
              >
                Abrir auditoria documental
              </button>

              <button
                style={{
                  padding: "14px 18px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#eef4ff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Ver visão geral
              </button>
            </div>
          </div>

          <div
            style={{
              borderRadius: "28px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(8,15,28,0.76)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                color: "#7dd3fc",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Status da plataforma
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>
                  Módulos ativos
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "4px" }}>
                  {activeModules.length}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>
                  Em breve
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "4px" }}>
                  {upcomingModules.length}
                </div>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "18px",
                  background: "rgba(18,242,118,0.06)",
                  border: "1px solid rgba(18,242,118,0.14)",
                }}
              >
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>
                  Produto
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, marginTop: "4px" }}>
                  {data.productName || "Z-Radar"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              padding: "22px",
              border: "1px solid rgba(18,242,118,0.12)",
              background: "rgba(8,15,28,0.76)",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Módulos ativos
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {activeModules.map((module: any) => (
                <div
                  key={module.key}
                  style={{
                    padding: "16px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(180deg, rgba(18,242,118,0.06), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(18,242,118,0.14)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "16px" }}>
                        {module.name}
                      </div>
                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      >
                        Módulo disponível no ecossistema atual.
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: "rgba(18,242,118,0.10)",
                        color: "#78f0aa",
                        border: "1px solid rgba(18,242,118,0.16)",
                        fontSize: "12px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      Ativo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: "24px",
              padding: "22px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(8,15,28,0.76)",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Em breve
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {upcomingModules.map((module: any) => (
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
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "16px" }}>
                        {module.name}
                      </div>
                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      >
                        Estrutura visual pronta para receber integração futura.
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.05)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "12px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      Em breve
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            borderRadius: "24px",
            padding: "22px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,15,28,0.76)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Rotas monitoradas
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {routes.map((route: any) => (
              <div
                key={route.key}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    {route.label}
                  </div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginTop: "6px",
                    }}
                  >
                    {route.lastExecution
                      ? `Última execução: ${route.lastExecution}`
                      : route.error
                      ? route.error
                      : "Sem execução concluída registrada ainda."}
                  </div>
                </div>

                <button
                  style={{
                    padding: "12px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(18,242,118,0.16)",
                    background: "rgba(18,242,118,0.08)",
                    color: "#dfffea",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Abrir módulo
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}