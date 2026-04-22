type RouteItem = {
  key: string;
  label: string;
  description: string;
  lastExecution: string;
  status: string;
  auditHref: string;
  historyHref: string;
};

const monitoredRoutes: RouteItem[] = [
  {
    key: "edutech",
    label: "EduTech",
    description:
      "Acompanhamento da auditoria documental, histórico operacional e evolução da frente EduTech.",
    lastExecution: "21/04/2026 às 23:49",
    status: "Operacional",
    auditHref: "/?routeKey=edutech",
    historyHref: "/historico/edutech"
  },
  {
    key: "assistente-virtual",
    label: "Assistente Virtual",
    description:
      "Monitoramento da documentação, execuções anteriores e contexto operacional da frente Assistente Virtual.",
    lastExecution: "19/04/2026 às 23:27",
    status: "Operacional",
    auditHref: "/?routeKey=assistente-virtual",
    historyHref: "/historico/assistente-virtual"
  }
];

function TopActionButton({
  href,
  children,
  primary = false
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "54px",
        padding: primary ? "0 28px" : "0 18px",
        borderRadius: "18px",
        textDecoration: "none",
        fontWeight: 800,
        fontSize: "16px",
        letterSpacing: "-0.02em",
        color: primary ? "#04110a" : "#f8fafc",
        background: primary
          ? "linear-gradient(135deg, #19f67d 0%, #0fdc67 100%)"
          : "rgba(255,255,255,0.06)",
        border: primary
          ? "1px solid rgba(25,246,125,0.35)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: primary
          ? "0 18px 42px rgba(25,246,125,0.22)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)"
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
        borderRadius: "28px",
        padding: "28px",
        background:
          "linear-gradient(180deg, rgba(10,18,37,0.92), rgba(7,14,28,0.92))",
        border: "1px solid rgba(18,242,118,0.10)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "18px",
          flexWrap: "wrap"
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "14px"
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "42px",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                fontWeight: 800,
                color: "#f8fafc"
              }}
            >
              {route.label}
            </h3>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "34px",
                padding: "0 14px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#8df7b9",
                background: "rgba(18,242,118,0.10)",
                border: "1px solid rgba(18,242,118,0.18)"
              }}
            >
              {route.status}
            </span>
          </div>

          <p
            style={{
              margin: "0 0 18px",
              maxWidth: "850px",
              color: "#9fb0c9",
              fontSize: "18px",
              lineHeight: 1.7
            }}
          >
            {route.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
              marginBottom: "22px"
            }}
          >
            <div
              style={{
                borderRadius: "18px",
                padding: "16px 18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div
                style={{
                  color: "#7f91aa",
                  fontSize: "12px",
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
                  color: "#f8fafc",
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: 1.4
                }}
              >
                {route.lastExecution}
              </div>
            </div>

            <div
              style={{
                borderRadius: "18px",
                padding: "16px 18px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <div
                style={{
                  color: "#7f91aa",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                Chave da rota
              </div>
              <div
                style={{
                  color: "#d9e5f4",
                  fontSize: "17px",
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
              gap: "12px",
              flexWrap: "wrap"
            }}
          >
            <a
              href={route.auditHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "54px",
                padding: "0 22px",
                borderRadius: "18px",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "16px",
                color: "#04110a",
                background:
                  "linear-gradient(135deg, #19f67d 0%, #11de68 100%)",
                border: "1px solid rgba(25,246,125,0.35)",
                boxShadow: "0 16px 34px rgba(25,246,125,0.20)"
              }}
            >
              Abrir auditoria
            </a>

            <a
              href={route.historyHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "54px",
                padding: "0 22px",
                borderRadius: "18px",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "16px",
                color: "#f8fafc",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              Ver histórico
            </a>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "54px",
                padding: "0 22px",
                borderRadius: "18px",
                fontWeight: 800,
                fontSize: "16px",
                color: "#8ea1bc",
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

function GhostPanel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        borderRadius: "30px",
        padding: "30px",
        background:
          "linear-gradient(180deg, rgba(7,15,30,0.90), rgba(5,10,22,0.92))",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 28px 70px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)"
      }}
    >
      <h2
        style={{
          margin: "0 0 22px",
          fontSize: "44px",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          fontWeight: 800,
          color: "#f8fafc"
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#f8fafc",
        background:
          "linear-gradient(180deg, #040915 0%, #07111f 48%, #030814 100%)",
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
            radial-gradient(circle at 12% 18%, rgba(18,242,118,0.22), transparent 24%),
            radial-gradient(circle at 78% 16%, rgba(22,163,255,0.14), transparent 22%),
            radial-gradient(circle at 52% 72%, rgba(18,242,118,0.12), transparent 28%),
            radial-gradient(circle at 22% 88%, rgba(18,242,118,0.10), transparent 24%)
          `,
          filter: "blur(12px)"
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: "-10%",
          pointerEvents: "none",
          background:
            "linear-gradient(135deg, rgba(18,242,118,0.10), transparent 24%, transparent 62%, rgba(18,242,118,0.08))",
          animation: "auroraShift 16s ease-in-out infinite"
        }}
      />

      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "28px 28px 60px",
          position: "relative",
          zIndex: 1
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "26px 28px",
            borderRadius: "30px",
            background:
              "linear-gradient(180deg, rgba(7,15,30,0.88), rgba(5,10,22,0.92))",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
            marginBottom: "24px",
            flexWrap: "wrap"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "22px",
                background:
                  "linear-gradient(135deg, rgba(18,242,118,0.18), rgba(18,242,118,0.04))",
                border: "1px solid rgba(18,242,118,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 34px rgba(18,242,118,0.12)"
              }}
            >
              <span
                style={{
                  fontSize: "38px",
                  lineHeight: 1,
                  fontWeight: 900,
                  color: "#19f67d",
                  textShadow: "0 0 20px rgba(25,246,125,0.22)"
                }}
              >
                Z
              </span>
            </div>

            <div>
              <div
                style={{
                  color: "#8ec5ff",
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  marginBottom: "6px"
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
                  marginBottom: "8px"
                }}
              >
                Z-Radar
              </div>

              <div
                style={{
                  color: "#8fa2bc",
                  fontSize: "20px",
                  lineHeight: 1.5,
                  maxWidth: "760px"
                }}
              >
                Auditoria documental, histórico operacional e estrutura pronta
                para inteligência contextual.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <TopActionButton href="/?routeKey=all" primary>
              Abrir auditoria documental
            </TopActionButton>
            <TopActionButton href="/configuracoes">
              Configurações
            </TopActionButton>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: "24px",
            marginBottom: "24px"
          }}
        >
          <section
            style={{
              borderRadius: "34px",
              padding: "34px",
              background:
                "linear-gradient(135deg, rgba(4,17,34,0.88), rgba(4,20,18,0.84))",
              border: "1px solid rgba(18,242,118,0.14)",
              boxShadow:
                "0 36px 90px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "38px",
                padding: "0 16px",
                borderRadius: "999px",
                background: "rgba(18,242,118,0.10)",
                border: "1px solid rgba(18,242,118,0.18)",
                color: "#8df7b9",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "24px"
              }}
            >
              Painel central
            </div>

            <h1
              style={{
                margin: "0 0 20px",
                fontSize: "72px",
                lineHeight: 0.96,
                letterSpacing: "-0.07em",
                fontWeight: 800,
                maxWidth: "840px"
              }}
            >
              A operação do Z-RADAR começa pelas rotas monitoradas
            </h1>

            <p
              style={{
                margin: "0 0 28px",
                color: "#a0b2c9",
                fontSize: "20px",
                lineHeight: 1.8,
                maxWidth: "900px"
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
                gap: "16px"
              }}
            >
              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div style={{ color: "#8ea2bd", fontSize: "15px", marginBottom: "10px" }}>
                  Rotas monitoradas
                </div>
                <div style={{ fontSize: "54px", fontWeight: 800, lineHeight: 1 }}>
                  2
                </div>
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div style={{ color: "#8ea2bd", fontSize: "15px", marginBottom: "10px" }}>
                  Histórico
                </div>
                <div style={{ fontSize: "54px", fontWeight: 800, lineHeight: 1 }}>
                  2
                </div>
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  background: "rgba(18,242,118,0.07)",
                  border: "1px solid rgba(18,242,118,0.14)"
                }}
              >
                <div style={{ color: "#98eeb9", fontSize: "15px", marginBottom: "10px" }}>
                  IA operacional
                </div>
                <div style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.1 }}>
                  Em breve
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              borderRadius: "34px",
              padding: "30px",
              background:
                "linear-gradient(180deg, rgba(6,15,31,0.90), rgba(4,10,24,0.94))",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.04)"
            }}
          >
            <div
              style={{
                color: "#7fc6ff",
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}
            >
              Workspace IA
            </div>

            <div
              style={{
                borderRadius: "28px",
                padding: "28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "18px"
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  marginBottom: "14px"
                }}
              >
                Chat operacional com IA
              </div>
              <div
                style={{
                  color: "#9cb0ca",
                  fontSize: "18px",
                  lineHeight: 1.8,
                  marginBottom: "18px"
                }}
              >
                Espaço reservado para conversas contextuais sobre rotas,
                documentação, auditorias, relatórios e acompanhamento da operação.
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px 22px",
                  background: "rgba(18,242,118,0.06)",
                  border: "1px solid rgba(18,242,118,0.12)",
                  color: "#d6f7e5",
                  fontSize: "18px",
                  lineHeight: 1.7
                }}
              >
                Aqui depois entra o chat, os prompts rápidos e o resumo
                inteligente da operação.
              </div>
            </div>

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
                  fontSize: "18px",
                  fontWeight: 800,
                  marginBottom: "8px"
                }}
              >
                Relatórios inteligentes
              </div>
              <div
                style={{
                  color: "#92a4bc",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "14px"
                }}
              >
                Consolidação futura de execução, falhas, pendências e leitura
                assistida.
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#d7deea",
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase"
                }}
              >
                Em breve
              </div>
            </div>
          </section>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.55fr 1fr",
            gap: "24px"
          }}
        >
          <GhostPanel title="Rotas monitoradas">
            <div
              style={{
                display: "grid",
                gap: "18px"
              }}
            >
              {monitoredRoutes.map((route) => (
                <RouteCard key={route.key} route={route} />
              ))}
            </div>
          </GhostPanel>

          <GhostPanel title="Próximos blocos">
            <div style={{ display: "grid", gap: "16px" }}>
              {[
                "Análise com IA",
                "Histórico de execuções",
                "Pendências por responsável",
                "Alertas automáticos"
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: "24px",
                    padding: "22px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px"
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        marginBottom: "8px"
                      }}
                    >
                      {item}
                    </div>
                    <div
                      style={{
                        color: "#92a4bc",
                        fontSize: "16px",
                        lineHeight: 1.7
                      }}
                    >
                      Espaço reservado para evolução futura da plataforma.
                    </div>
                  </div>

                  <span
                    style={{
                      flex: "0 0 auto",
                      display: "inline-flex",
                      alignItems: "center",
                      height: "38px",
                      padding: "0 14px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontSize: "12px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "#d7deea"
                    }}
                  >
                    Em breve
                  </span>
                </div>
              ))}

              <div
                style={{
                  marginTop: "2px",
                  borderRadius: "26px",
                  padding: "24px",
                  background: "rgba(18,242,118,0.06)",
                  border: "1px solid rgba(18,242,118,0.12)"
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    marginBottom: "10px"
                  }}
                >
                  Direção do produto
                </div>
                <div
                  style={{
                    color: "#a4b8cf",
                    fontSize: "18px",
                    lineHeight: 1.75
                  }}
                >
                  O próximo salto é ligar histórico real por rota, relatórios
                  inteligentes e a camada conversacional da IA dentro da mesma
                  experiência visual.
                </div>
              </div>
            </div>
          </GhostPanel>
        </section>
      </div>

      <style>{`
        @keyframes auroraShift {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translate3d(0, -2%, 0) scale(1.04);
            opacity: 1;
          }
        }

        @media (max-width: 1200px) {
          main section[style*="grid-template-columns: 1.45fr 1fr"],
          main section[style*="grid-template-columns: 1.55fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 900px) {
          h1 {
            font-size: 48px !important;
          }
        }

        @media (max-width: 760px) {
          header {
            padding: 20px !important;
          }

          main {
            overflow-x: hidden;
          }
        }
      `}</style>
    </main>
  );
}