import {
  DashboardRoute,
  getHealthLabel,
  getHealthTone,
  getRerunUrl,
  hasAuditData,
} from "@/lib/dashboard";

type Props = {
  route: DashboardRoute;
};

export function RouteDetailCard({ route }: Props) {
  const tone = getHealthTone(route.health_percent, route);
  const label = getHealthLabel(route.health_percent, route);
  const noData = !hasAuditData(route);

  return (
    <div className="detailCard">
      <div className="detailCardHeader">
        <div>
          <h3 className="detailTitle">{route.label}</h3>
          <p className="detailSubtitle">
            Última execução: {route.lastExecution || "Sem registro"}
          </p>
        </div>

        <div className="detailScore">
          <strong>{noData ? "-" : `${route.health_percent || 0}%`}</strong>
          <span>Saúde</span>
        </div>
      </div>

      <div className="detailBody">
        <div className="detailStatusRow">
          <span className={`statusBadge ${tone}`}>{label}</span>
          <span className="capturedAt">{route.captured_at || ""}</span>
        </div>

        <p className="detailText">
          {noData
            ? "Ainda não existe snapshot de auditoria para esta rota."
            : route.status_text || "Sem descrição disponível."}
        </p>

        <div className="detailStats">
          <div className="detailStat">
            <span>Total</span>
            <strong>{route.total_pages || 0}</strong>
          </div>

          <div className="detailStat warningStat">
            <span>Desatualizadas</span>
            <strong>{route.outdated_pages || 0}</strong>
          </div>

          <div className="detailStat dangerStat">
            <span>Críticas</span>
            <strong>{route.critical_pages || 0}</strong>
          </div>
        </div>

        {!noData && route.ownersPendingMessage && (
          <div className="pendingBox">
            <div className="pendingTitle">Pendências por responsável</div>
            <p>{route.ownersPendingMessage}</p>
          </div>
        )}

        <div className="detailActions">
          {route.doc_link && (
            <a
              className="smallActionButton"
              href={route.doc_link}
              target="_blank"
              rel="noreferrer"
            >
              Abrir documento
            </a>
          )}

          <a
            className="smallActionButton ghost"
            href={getRerunUrl(route.key)}
            target="_blank"
            rel="noreferrer"
          >
            Reexecutar auditoria
          </a>

          {route.ai_generation_url && (
            <a
              className="smallActionButton ghost"
              href={route.ai_generation_url}
              target="_blank"
              rel="noreferrer"
            >
              Gerar texto com IA
            </a>
          )}
        </div>
      </div>
    </div>
  );
}