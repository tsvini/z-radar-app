import { getHealthLabel, getHealthTone, type DashboardRoute } from "@/lib/dashboard";

type RouteDetailCardProps = {
  route: DashboardRoute;
};

export function RouteDetailCard({ route }: RouteDetailCardProps) {
  const tone = getHealthTone(Number(route.health_percent || 0));
  const label = getHealthLabel(Number(route.health_percent || 0));

  return (
    <article className="detailCard">
      <div className="detailCardHeader">
        <div>
          <h3 className="detailTitle">{route.label}</h3>
          <p className="detailSubtitle">Última execução: {route.lastExecution || "-"}</p>
        </div>

        <div className={`detailScore ${tone}`}>
          <strong>{route.health_percent || 0}%</strong>
          <span>Saúde</span>
        </div>
      </div>

      <div className="detailBody">
        <div className="detailStatusRow">
          <span className={`statusBadge ${tone}`}>{route.status_title || label}</span>
          <span className="capturedAt">{route.captured_at || ""}</span>
        </div>

        <p className="detailText">{route.status_text || "Sem descrição disponível."}</p>

        <div className="detailStats">
          <div className="detailStat">
            <span>Total</span>
            <strong>{route.total_pages || 0}</strong>
          </div>
          <div className="detailStat">
            <span>Desatualizadas</span>
            <strong>{route.outdated_pages || 0}</strong>
          </div>
          <div className="detailStat">
            <span>Críticas</span>
            <strong>{route.critical_pages || 0}</strong>
          </div>
        </div>

        {route.ownersPendingMessage ? (
          <div className="pendingBox">
            <div className="pendingTitle">Pendências por responsável</div>
            <p>{route.ownersPendingMessage}</p>
          </div>
        ) : null}

        <div className="detailActions">
          {route.doc_link ? (
            <a href={route.doc_link} target="_blank" rel="noreferrer" className="smallActionButton">
              Abrir documento
            </a>
          ) : null}

          {route.pdf_link ? (
            <a href={route.pdf_link} target="_blank" rel="noreferrer" className="smallActionButton ghost">
              Abrir PDF
            </a>
          ) : null}

          {route.ai_generation_url ? (
            <a href={route.ai_generation_url} target="_blank" rel="noreferrer" className="smallActionButton ghost">
              Gerar texto com IA
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}