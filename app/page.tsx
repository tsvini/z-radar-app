type RouteItem = {
  key: string;
  label: string;
  description: string;
  lastExecution: string;
  status: "Operacional" | "Atenção" | "Em breve";
  auditHref: string;
  historyHref: string;
};

const routes: RouteItem[] = [
  {
    key: "edutech",
    label: "EduTech",
    description:
      "Auditoria documental, histórico operacional e acompanhamento contínuo da frente EduTech.",
    lastExecution: "21/04/2026 às 23:49",
    status: "Operacional",
    auditHref: "/?routeKey=edutech",
    historyHref: "/historico/edutech"
  },
  {
    key: "assistente-virtual",
    label: "Assistente Virtual",
    description:
      "Monitoramento da documentação, execuções anteriores e contexto da frente Assistente Virtual.",
    lastExecution: "19/04/2026 às 23:27",
    status: "Operacional",
    auditHref: "/?routeKey=assistente-virtual",
    historyHref: "/historico/assistente-virtual"
  }
];

function SidebarItem({
  label,
  active = false,
  href = "#"
}: {
  label: string;
  active?: boolean;
  href?: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        height: "48px",
        padding: "0 14px",
        borderRadius: "14px",
        textDecoration: "none",
        color: active ? "#f8fafc" : "#9aabc3",
        background: active ? "rgba(18,242,118,0.08)" : "transparent",
        border: active
          ? "1px solid rgba(18,242,118,0.16)"
          : "1px solid transparent",
        fontSize: "15px",
        fontWeight: active ? 700 : 600,
        transition: "all 0.2s ease"
      }}
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "999px",
          background: active ? "#19f67d" : "rgba(255,255,255,0.18)",
          boxShadow: active ? "0 0 14px rgba(25,246,125,0.4)" : "none"
        }}
      />
      {label}
    </a>
  );
}

function StatusPill({ status }: { status: RouteItem["status"] }) {
  const isOperational = status === "Operacional";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "32px",
        padding: "0 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 800,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: isOperational ? "#8df7b9" : "#fde68a",
        background: isOperational
          ? "rgba(18,242,118,0.10)"
          : "rgba(245,158,11,0.10)",
        border: isOperational
          ? "1px solid rgba(18,242,118,0.16)"
          : "1px solid rgba(245,158,11,0.16)"
      }}
    >
      {status}
    </span>
  );
}

function ActionButton({
  children,
  href,
  primary = false
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "46px",
        padding: "0 18px",
        borderRadius: "14px",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "14px",
        color: primary ? "#04110a" : "#f8fafc",
        background: primary
          ? "linear-gradient(135deg, #19f67d 0%, #0ed866 100%)"
          : "rgba(255,255,255,0.05)",
        border: primary
          ? "1px solid rgba(25,246,125,0.22)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: primary
          ? "0 14px 30px rgba(25,246,125,0.18)"
          : "inset 0 1px 0 rgba(255,255,255,0.03)"
      }}
    >
      {children}
    </a>
  );
}

function RouteCard({ route }: { route: RouteItem }) {
  return (
    <div
      style={{
        borderRadius: "24px",
        padding: "24px",
        background:
          "linear-gradient(180deg, rgba(9,16,31,0.86), rgba(7,12,25,0.92))",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 22px 50px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}
      >
        <div style={{ flex: 1, minWidth: "260px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "10px"
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "30px",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontWeight: 800,
                color: "#f8fafc"
              }}
            >
              {route.label}
            </h3>
            <StatusPill status={route.status} />
          </div>

          <p
            style={{
              margin: "0 0 18px",
              color: "#9cafc8",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "720px"
            }}
          >
            {route.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "18px"
            }}
          >
            <div
              style={{
                borderRadius: "16px",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div
                style={{
                  color: "#7f91aa",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                Última execução
              </div>
              <div
                style={{
                  color: "#f1f5fb",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: 1.5
                }}
              >
                {route.lastExecution}
              </div>
            </div>

            <div
              style={{
                borderRadius: "16px",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div
                style={{
                  color: "#7f91aa",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                Identificador
              </div>
              <div
                style={{
                  color: "#d9e4f3",
                  fontSize: "15px",
                  fontWeight: 600
                }}
              >
                {route.key}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >
            <ActionButton href={route.auditHref} primary>
              Abrir auditoria
            </ActionButton>
            <ActionButton href={route.historyHref}>Ver histórico</ActionButton>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "46px",
                padding: "0 18px",
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "14px",
                color: "#95a6be",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              Relatório IA · em breve
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftPanel({
  title,
  description,
  badge
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div
      style={{
        borderRadius: "22px",
        padding: "22px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "flex-start",
          marginBottom: "10px"
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em"
          }}
        >
          {title}
        </div>

        {badge ? (
          <span
            style={{
              flex: "0 0 auto",
              display: "inline-flex",
              alignItems: "center",
              height: "32px",
              padding: "0 12px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#dce6f4",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div
        style={{
          color: "#95a7bf",
          fontSize: "15px",
          lineHeight: 1.75
        }}
      >
        {description}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(18,242,118,0.08), transparent 24%), linear-gradient(180deg, #030813 0%, #06101d 45%, #030914 100%)",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 12% 18%, rgba(18,242,118,0.18) 0%, transparent 28%),
            radial-gradient(ellipse at 82% 10%, rgba(0,160,255,0.10) 0%, transparent 26%),
            radial-gradient(ellipse at 65% 78%, rgba(18,242,118,0.10) 0%, transparent 30%),
            radial-gradient(ellipse at 18% 85%, rgba(18,242,118,0.08) 0%, transparent 24%)
          `,
          filter: "blur(26px)",
          animation: "auroraFloat 14s ease-in-out infinite"
        }}
      />

      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: "24px",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px minmax(0, 1fr)",
            gap: "24px"
          }}
        >
          <aside
            style={{
              position: "sticky",
              top: "24px",
              alignSelf: "start",
              borderRadius: "30px",
              padding: "22px",
              background:
                "linear-gradient(180deg, rgba(8,14,29,0.90), rgba(5,10,22,0.94))",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "24px"
              }}
            >
              <div
                style={{
                  width: "62px",
                  height: "62px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, rgba(18,242,118,0.18), rgba(18,242,118,0.05))",
                  border: "1px solid rgba(18,242,118,0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 28px rgba(18,242,118,0.12)"
                }}
              >
                <span
                  style={{
                    fontSize: "34px",
                    lineHeight: 1,
                    fontWeight: 900,
                    color: "#19f67d"
                  }}
                >
                  Z
                </span>
              </div>

              <div>
                <div
                  style={{
                    color: "#7fc6ff",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "4px"
                  }}
                >
                  Z-Radar
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "-0.04em"
                  }}
                >
                  Platform
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: "8px", marginBottom: "26px" }}>
              <SidebarItem label="Dashboard" active href="/" />
              <SidebarItem label="Auditoria documental" href="/?routeKey=all" />
              <SidebarItem label="Rotas monitoradas" href="#rotas" />
              <SidebarItem label="Histórico" href="/historico/edutech" />
              <SidebarItem label="Workspace IA" href="#ia" />
              <SidebarItem label="Configurações" href="/configuracoes" />
            </div>

            <div
              style={{
                borderRadius: "20px",
                padding: "18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div
                style={{
                  color: "#7f91aa",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "8px"
                }}
              >
                Estado da plataforma
              </div>
              <div
                style={{
                  color: "#f8fafc",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  fontWeight: 600
                }}
              >
                Auditoria documental ativa
              </div>
            </div>
          </aside>

          <section>
            <header
              style={{
                borderRadius: "32px",
                padding: "30px",
                background:
                  "linear-gradient(180deg, rgba(8,14,29,0.88), rgba(5,10,22,0.94))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 24px 70px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.03)",
                marginBottom: "24px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  flexWrap: "wrap",
                  alignItems: "center"
                }}
              >
                <div style={{ maxWidth: "760px" }}>
                  <div
                    style={{
                      color: "#8ec5ff",
                      fontSize: "13px",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "10px"
                    }}
                  >
                    Z-Radar Platform
                  </div>

                  <div
                    style={{
                      fontSize: "56px",
                      lineHeight: 0.95,
                      letterSpacing: "-0.06em",
                      fontWeight: 800,
                      marginBottom: "12px"
                    }}
                  >
                    Z-Radar
                  </div>

                  <div
                    style={{
                      color: "#97aac3",
                      fontSize: "18px",
                      lineHeight: 1.75,
                      maxWidth: "900px"
                    }}
                  >
                    Auditoria documental, histórico operacional e estrutura
                    pronta para inteligência contextual.
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
                  <ActionButton href="/?routeKey=all" primary>
                    Abrir auditoria documental
                  </ActionButton>
                  <ActionButton href="/configuracoes">
                    Configurações
                  </ActionButton>
                </div>
              </div>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "24px",
                marginBottom: "24px"
              }}
            >
              <section
                style={{
                  borderRadius: "32px",
                  padding: "34px",
                  background:
                    "linear-gradient(135deg, rgba(4,17,34,0.88), rgba(4,20,18,0.80))",
                  border: "1px solid rgba(18,242,118,0.12)",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "999px",
                    background: "rgba(18,242,118,0.10)",
                    border: "1px solid rgba(18,242,118,0.16)",
                    color: "#8df7b9",
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "20px"
                  }}
                >
                  Painel central
                </div>

                <h1
                  style={{
                    margin: "0 0 18px",
                    fontSize: "clamp(38px, 5vw, 64px)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.06em",
                    fontWeight: 800,
                    maxWidth: "820px"
                  }}
                >
                  A operação do Z-RADAR começa pelas rotas monitoradas
                </h1>

                <p
                  style={{
                    margin: "0 0 26px",
                    color: "#9cb0ca",
                    fontSize: "18px",
                    lineHeight: 1.8,
                    maxWidth: "860px"
                  }}
                >
                  Visualize as frentes ativas, abra a auditoria documental,
                  consulte históricos por rota e prepare o terreno para a camada
                  futura de IA com contexto real da operação.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "14px"
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "18px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}
                  >
                    <div style={{ color: "#8ea2bd", fontSize: "14px", marginBottom: "10px" }}>
                      Rotas monitoradas
                    </div>
                    <div style={{ fontSize: "44px", fontWeight: 800 }}>2</div>
                  </div>

                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "18px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}
                  >
                    <div style={{ color: "#8ea2bd", fontSize: "14px", marginBottom: "10px" }}>
                      Históricos ativos
                    </div>
                    <div style={{ fontSize: "44px", fontWeight: 800 }}>2</div>
                  </div>

                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "18px",
                      background: "rgba(18,242,118,0.07)",
                      border: "1px solid rgba(18,242,118,0.12)"
                    }}
                  >
                    <div style={{ color: "#98eeb9", fontSize: "14px", marginBottom: "10px" }}>
                      Camada IA
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.1 }}>
                      Em breve
                    </div>
                  </div>
                </div>
              </section>

              <section id="ia">
                <div
                  style={{
                    borderRadius: "32px",
                    padding: "28px",
                    background:
                      "linear-gradient(180deg, rgba(7,15,30,0.90), rgba(5,10,22,0.94))",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow:
                      "0 28px 70px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
                  }}
                >
                  <div
                    style={{
                      color: "#8ec5ff",
                      fontSize: "13px",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "18px"
                    }}
                  >
                    Workspace IA
                  </div>

                  <div style={{ display: "grid", gap: "16px" }}>
                    <SoftPanel
                      title="Chat operacional com IA"
                      description="Espaço reservado para conversas contextuais sobre rotas, documentação, auditorias, relatórios e acompanhamento da operação."
                    />
                    <SoftPanel
                      title="Relatórios inteligentes"
                      description="Consolidação futura de execução, falhas, pendências e leitura assistida."
                      badge="Em breve"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 0.75fr",
                gap: "24px"
              }}
            >
              <section
                id="rotas"
                style={{
                  borderRadius: "32px",
                  padding: "28px",
                  background:
                    "linear-gradient(180deg, rgba(7,15,30,0.90), rgba(5,10,22,0.94))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow:
                    "0 28px 70px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              >
                <h2
                  style={{
                    margin: "0 0 22px",
                    fontSize: "clamp(28px, 3vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    fontWeight: 800
                  }}
                >
                  Rotas monitoradas
                </h2>

                <div style={{ display: "grid", gap: "18px" }}>
                  {routes.map((route) => (
                    <RouteCard key={route.key} route={route} />
                  ))}
                </div>
              </section>

              <section
                style={{
                  borderRadius: "32px",
                  padding: "28px",
                  background:
                    "linear-gradient(180deg, rgba(7,15,30,0.90), rgba(5,10,22,0.94))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow:
                    "0 28px 70px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              >
                <h2
                  style={{
                    margin: "0 0 22px",
                    fontSize: "clamp(28px, 3vw, 44px)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    fontWeight: 800
                  }}
                >
                  Próximos blocos
                </h2>

                <div style={{ display: "grid", gap: "14px" }}>
                  <SoftPanel
                    title="Análise com IA"
                    description="Espaço reservado para evolução futura da plataforma."
                    badge="Em breve"
                  />
                  <SoftPanel
                    title="Histórico de execuções"
                    description="Espaço reservado para evolução futura da plataforma."
                    badge="Em breve"
                  />
                  <SoftPanel
                    title="Pendências por responsável"
                    description="Espaço reservado para evolução futura da plataforma."
                    badge="Em breve"
                  />
                  <SoftPanel
                    title="Alertas automáticos"
                    description="Espaço reservado para evolução futura da plataforma."
                    badge="Em breve"
                  />
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes auroraFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(0, -2%, 0) scale(1.03);
            opacity: 1;
          }
        }

        @media (max-width: 1180px) {
          main > div > div {
            grid-template-columns: 1fr !important;
          }

          aside {
            position: relative !important;
            top: 0 !important;
          }

          section[style*="grid-template-columns: 1.2fr 0.8fr"],
          section[style*="grid-template-columns: 1.25fr 0.75fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 820px) {
          section[style*="grid-template-columns: repeat(3, minmax(0, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}