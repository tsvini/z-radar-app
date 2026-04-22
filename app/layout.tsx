import Link from "next/link";
import { getDashboardData, getHealthLabel, getHealthTone } from "../lib/dashboard";

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

  return (
    <div className="dashboardWrap">
      <section className="heroCard">
        <div className="heroLeft">
          <div className="heroLogo">Z</div>

          <div>
            <h2 className="heroTitle">{data.productName || "Z-Radar"}</h2>
            <p className="heroText">
              Auditoria e monitoramento inteligente da documentação, com visão consolidada das rotas,
              saúde geral, pendências por responsável e acesso rápido aos artefatos.
            </p>
          </div>
        </div>

        <div className="heroActions">
          <a
            className="btn btnGhost"
            href="https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            Abrir API
          </a>
        </div>
      </section>

      <section className="statsGrid">
        <div className="statCard">
          <div className="statLabel">Rotas monitoradas</div>
          <div className="statValue">{totalRoutes}</div>
          <div className="statHint">Dados reais do Worker</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Saúde média</div>
          <div className="statValue">{avgHealth}%</div>
          <div className="statHint">Média consolidada</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Páginas auditadas</div>
          <div className="statValue">{totalPages}</div>
          <div className="statHint">{totalOutdated} desatualizadas</div>
        </div>

        <div className="statCard">
          <div className="statLabel">Críticas</div>
          <div className="statValue">{totalCritical}</div>
          <div className="statHint">Itens com atenção imediata</div>
        </div>
      </section>

      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h3 className="sectionTitle">Saúde por rota</h3>
            <p className="sectionSubtitle">Resumo rápido das auditorias</p>
          </div>
        </div>

        <div className="healthList">
          {data.routes.map((route) => (
            <div className="healthItem" key={route.key}>
              <div className="healthItemTop">
                <div className="healthRouteName">{route.label}</div>
                <div className={`badge ${toneClass(route.health_percent)}`}>
                  {getHealthLabel(route.health_percent)}
                </div>
              </div>

              <div className="bar">
                <div
                  className={`barFill ${toneClass(route.health_percent)}`}
                  style={{ width: `${route.health_percent}%` }}
                />
              </div>

              <div className="miniStats">
                <div className="miniStat">
                  <strong>{route.health_percent}%</strong>
                  <span>Saúde</span>
                </div>
                <div className="miniStat">
                  <strong>{route.total_pages}</strong>
                  <span>Total</span>
                </div>
                <div className="miniStat">
                  <strong>{route.outdated_pages}</strong>
                  <span>Desatualizadas</span>
                </div>
                <div className="miniStat">
                  <strong>{route.critical_pages}</strong>
                  <span>Críticas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h3 className="sectionTitle">Visão detalhada</h3>
            <p className="sectionSubtitle">Cards usando os dados reais da API</p>
          </div>
        </div>

        <div className="routeGrid">
          {data.routes.map((route) => (
            <article className="routeCard" key={route.key}>
              <div className="routeCardTop">
                <div>
                  <div className="routeTitle">{route.label}</div>
                  <div className="routeMeta">
                    Última execução: {route.lastExecution || "Sem informação"}
                  </div>
                </div>

                <div className="scoreBox">
                  <strong>{route.health_percent}%</strong>
                  <span>Saúde</span>
                </div>
              </div>

              <div className={`badge ${toneClass(route.health_percent)}`}>
                {route.status_title || getHealthLabel(route.health_percent)}
              </div>

              <p className="routeStatusText">
                {route.status_text || "Sem descrição disponível."}
              </p>

              <div className="routeMetrics">
                <div className="metricCard">
                  <strong>{route.total_pages}</strong>
                  <span>Total</span>
                </div>
                <div className="metricCard">
                  <strong>{route.outdated_pages}</strong>
                  <span>Desatualizadas</span>
                </div>
                <div className="metricCard">
                  <strong>{route.critical_pages}</strong>
                  <span>Críticas</span>
                </div>
              </div>

              <div className="block">
                <div className="blockTitle">Documento auditado</div>
                <div className="blockText">{route.doc_title || "Sem título"}</div>
              </div>

              <div className="block">
                <div className="blockTitle">Pendências por responsável</div>
                <div className="blockText preserve">{route.ownersPendingMessage || "Nenhuma pendência."}</div>
              </div>

              <div className="routeActions">
                {route.pdf_link ? (
                  <a className="actionBtn" href={route.pdf_link} target="_blank" rel="noreferrer">
                    📄 Abrir PDF
                  </a>
                ) : null}

                {route.doc_link ? (
                  <a className="actionBtn" href={route.doc_link} target="_blank" rel="noreferrer">
                    📚 Abrir ClickUp
                  </a>
                ) : null}

                {route.ai_generation_url ? (
                  <a
                    className="actionBtn"
                    href={route.ai_generation_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ✨ Gerar texto com IA
                  </a>
                ) : null}

                <Link className="actionBtn" href={`/historico/${route.key}`}>
                  🕘 Ver histórico
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}