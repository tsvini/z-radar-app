import Link from "next/link";
import {
  formatCapturedAt,
  getDashboardData,
  getHealthLabel,
  getHealthTone,
} from "../lib/dashboard";

const BRAND_BANNER_URL =
  "https://raw.githubusercontent.com/tsvini/logo-zallpy-orbit/main/Z-Radar%20Logo%20Corporativo%20Neon.png";

const BRAND_ICON_URL =
  "https://raw.githubusercontent.com/tsvini/logo-zallpy-orbit/main/Zallpy_Orbit.png";

function toneClass(percent: number) {
  const tone = getHealthTone(percent);
  if (tone === "danger") return "toneDanger";
  if (tone === "warning") return "toneWarning";
  return "toneSuccess";
}

export default async function HomePage() {
  const data = await getDashboardData();

  const totalRoutes = data.routes.length;
  const totalPages = data.routes.reduce((acc, item) => acc + Number(item.total_pages || 0), 0);
  const totalOutdated = data.routes.reduce((acc, item) => acc + Number(item.outdated_pages || 0), 0);
  const totalCritical = data.routes.reduce((acc, item) => acc + Number(item.critical_pages || 0), 0);
  const avgHealth = totalRoutes
    ? Math.round(
        data.routes.reduce((acc, item) => acc + Number(item.health_percent || 0), 0) / totalRoutes
      )
    : 0;

  const lastSync = data.routes
    .map((item) => item.captured_at)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  return (
    <div className="dashboardLayout">
      <aside className="sidebar">
        <div className="sidebarBrand">
          <div className="sidebarBrandIcon">
            <img src={BRAND_ICON_URL} alt="Z-Radar" />
          </div>
          <div>
            <div className="sidebarBrandTitle">Z-Radar</div>
            <div className="sidebarBrandText">Painel operacional</div>
          </div>
        </div>

        <nav className="sidebarNav">
          <a className="sidebarItem active" href="#dashboard">
            <span>◉</span>
            <span>Dashboard</span>
          </a>
          <a className="sidebarItem" href="#saude-rotas">
            <span>▣</span>
            <span>Saúde por rota</span>
          </a>
          <a className="sidebarItem" href="#visao-detalhada">
            <span>▤</span>
            <span>Visão detalhada</span>
          </a>
          <a className="sidebarItem" href="#proximas-funcoes">
            <span>✦</span>
            <span>Próximas funções</span>
          </a>
        </nav>

        <div className="sidebarBlock">
          <div className="sidebarBlockTitle">Ambiente</div>
          <div className="sidebarMiniCard">
            <span className="sidebarMiniLabel">Produto</span>
            <strong>{data.productName || "Z-Radar"}</strong>
          </div>
          <div className="sidebarMiniCard">
            <span className="sidebarMiniLabel">Última sincronização</span>
            <strong>{formatCapturedAt(lastSync)}</strong>
          </div>
        </div>

        <div className="sidebarBlock">
          <div className="sidebarBlockTitle">Em breve</div>
          <div className="comingList">
            <div className="comingItem">Timeline consolidada</div>
            <div className="comingItem">Analytics por período</div>
            <div className="comingItem">Alertas automáticos</div>
            <div className="comingItem">Comparativo entre rotas</div>
          </div>
        </div>
      </aside>

      <main className="mainContent">
        <section className="heroPanel" id="dashboard">
          <div className="heroBannerWrap">
            <img className="heroBanner" src={BRAND_BANNER_URL} alt="Banner Z-Radar" />
          </div>

          <div className="heroTopRow">
            <div className="heroCopy">
              <p className="heroDescription">
                Auditoria e monitoramento inteligente da documentação, com visão consolidada das
                rotas, saúde geral, pendências por responsável e acesso rápido aos artefatos.
              </p>
              <div className="heroMetaRow">
                <span className="heroMetaPill">Dados reais do Worker</span>
                <span className="heroMetaText">Atualizado em {formatCapturedAt(lastSync)}</span>
              </div>
            </div>

            <div className="heroActions">
              <a
                className="btn btnGhost"
                href={(process.env.DASHBOARD_API_URL || "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard")}
                target="_blank"
                rel="noreferrer"
              >
                Abrir API
              </a>
            </div>
          </div>
        </section>

        <section className="statsGrid">
          <article className="statCard">
            <div className="statLabel">Rotas monitoradas</div>
            <div className="statValue">{totalRoutes}</div>
            <div className="statSubtext">Dados reais do Worker</div>
          </article>

          <article className="statCard">
            <div className="statLabel">Saúde média</div>
            <div className="statValue">{avgHealth}%</div>
            <div className="statSubtext">Média consolidada</div>
          </article>

          <article className="statCard">
            <div className="statLabel">Páginas auditadas</div>
            <div className="statValue">{totalPages}</div>
            <div className="statSubtext">{totalOutdated} desatualizadas</div>
          </article>

          <article className="statCard">
            <div className="statLabel">Críticas</div>
            <div className="statValue">{totalCritical}</div>
            <div className="statSubtext">Itens com atenção imediata</div>
          </article>
        </section>

        <section className="sectionPanel" id="saude-rotas">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Saúde por rota</h2>
              <p className="sectionSubtitle">Resumo rápido das auditorias</p>
            </div>
          </div>

          <div className="routeOverviewGrid">
            {data.routes.map((route) => (
              <article className="routeOverviewCard" key={route.key}>
                <div className="routeOverviewTop">
                  <div>
                    <h3 className="routeOverviewTitle">{route.label}</h3>
                    <div className="routeOverviewLastRun">
                      Última execução: {route.lastExecution || "Sem registro"}
                    </div>
                  </div>

                  <div className={`statusBadge ${toneClass(route.health_percent)}`}>
                    {route.status_title || getHealthLabel(route.health_percent)}
                  </div>
                </div>

                <div className="progressTrack">
                  <div
                    className={`progressFill ${toneClass(route.health_percent)}`}
                    style={{ width: `${Math.max(0, Math.min(route.health_percent, 100))}%` }}
                  />
                </div>

                <div className="miniStatsGrid">
                  <div className="miniStatBox">
                    <strong>{route.health_percent}%</strong>
                    <span>Saúde</span>
                  </div>
                  <div className="miniStatBox">
                    <strong>{route.total_pages}</strong>
                    <span>Total</span>
                  </div>
                  <div className="miniStatBox">
                    <strong>{route.outdated_pages}</strong>
                    <span>Desatualizadas</span>
                  </div>
                  <div className="miniStatBox">
                    <strong>{route.critical_pages}</strong>
                    <span>Críticas</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionPanel" id="visao-detalhada">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Visão detalhada</h2>
              <p className="sectionSubtitle">
                Cards usando os dados reais da API, com ações rápidas e navegação por rota
              </p>
            </div>
          </div>

          <div className="detailCardsGrid">
            {data.routes.map((route) => (
              <article className="detailCard" key={route.key}>
                <div className="detailCardHead">
                  <div>
                    <h3 className="detailCardTitle">{route.label}</h3>
                    <div className="detailCardMeta">
                      Última execução: {route.lastExecution || "Sem registro"}
                    </div>
                  </div>

                  <div className={`scoreBadge ${toneClass(route.health_percent)}`}>
                    <strong>{route.health_percent}%</strong>
                    <span>Saúde</span>
                  </div>
                </div>

                <div className="detailCardBody">
                  <div className="detailDocTitle">
                    {route.doc_title || "Documento sem título informado"}
                  </div>
                  <p className="detailText">
                    {route.status_text || "Sem descrição no momento."}
                  </p>

                  <div className="detailInfoGrid">
                    <div className="detailInfoBox">
                      <span>Total</span>
                      <strong>{route.total_pages}</strong>
                    </div>
                    <div className="detailInfoBox">
                      <span>Desatualizadas</span>
                      <strong>{route.outdated_pages}</strong>
                    </div>
                    <div className="detailInfoBox">
                      <span>Críticas</span>
                      <strong>{route.critical_pages}</strong>
                    </div>
                    <div className="detailInfoBox">
                      <span>Capturado em</span>
                      <strong>{formatCapturedAt(route.captured_at)}</strong>
                    </div>
                  </div>

                  <div className="ownersBlock">
                    <div className="ownersTitle">Pendências por responsável</div>
                    <p className="ownersText">
                      {route.ownersPendingMessage || "Nenhuma pendência identificada por responsável."}
                    </p>
                  </div>
                </div>

                <div className="detailActions">
                  {route.doc_link ? (
                    <a className="chipAction" href={route.doc_link} target="_blank" rel="noreferrer">
                      Abrir ClickUp
                    </a>
                  ) : null}

                  {route.pdf_link ? (
                    <a className="chipAction" href={route.pdf_link} target="_blank" rel="noreferrer">
                      Abrir PDF
                    </a>
                  ) : null}

                  {route.ai_generation_url ? (
                    <a
                      className="chipAction"
                      href={route.ai_generation_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Gerar texto com IA
                    </a>
                  ) : null}

                  <Link className="chipAction primary" href={`/historico/${route.key}`}>
                    Ver rota
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sectionPanel" id="proximas-funcoes">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Próximas funções</h2>
              <p className="sectionSubtitle">Área reservada para evolução do produto</p>
            </div>
          </div>

          <div className="futureGrid">
            <div className="futureCard">
              <div className="futureTitle">Execuções em tempo real</div>
              <div className="futureText">Timeline consolidada do pipeline e acompanhamento por etapa.</div>
            </div>
            <div className="futureCard">
              <div className="futureTitle">Comparativos</div>
              <div className="futureText">Comparação entre rotas, ciclos e tendências de saúde.</div>
            </div>
            <div className="futureCard">
              <div className="futureTitle">Alertas</div>
              <div className="futureText">Notificações proativas para itens críticos e quedas de saúde.</div>
            </div>
            <div className="futureCard">
              <div className="futureTitle">Governança</div>
              <div className="futureText">Visão por responsáveis, squads e pendências por prioridade.</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}