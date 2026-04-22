import type { DashboardRoute } from "@/lib/dashboard";
import {
  formatBrazilDate,
  getRouteBadge,
  getRouteTone,
  hasRealSnapshot,
} from "@/lib/dashboard";

type RouteDetailCardProps = {
  route: DashboardRoute;
};

export function RouteDetailCard({ route }: RouteDetailCardProps) {
  const hasSnapshot = hasRealSnapshot(route);
  const tone = getRouteTone(route);
  const badge = getRouteBadge(route);
  const capturedAt = formatBrazilDate(route.captured_at);

  return (
    <article className="routeDetailCard">
      <div className="routeDetailTop">
        <div>
          <h3 className="routeTitle">{route.label}</h3>
          <p className="routeSub">
            Última execução: {route.lastExecution || "Sem registro"}
          </p>
        </div>

        <div className="routeScore">
          <div className={`routeScoreValue ${tone}`}>
            {hasSnapshot ? `${route.health_percent}%` : "-"}
          </div>
          <div className="routeScoreLabel">Saúde</div>
        </div>
      </div>

      <div className="routeDetailMeta">
        <span className={`routeBadge ${tone}`}>{badge}</span>
        {capturedAt ? (
          <span className="routeCapturedAt">Atualizado em {capturedAt}</span>
        ) : (
          <span className="routeCapturedAt">Sem snapshot disponível</span>
        )}
      </div>

      <div className="healthBar routeDetailBar">
        <div
          className={`healthBarFill ${tone}`}
          style={{ width: hasSnapshot ? `${route.health_percent}%` : "18%" }}
        />
      </div>

      <p className="detailMessage">
        {hasSnapshot
          ? route.status_text || "Sem descrição disponível."
          : "Ainda não existe snapshot de auditoria para esta rota."}
      </p>

      <div className="routeDetailStats">
        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Total</span>
          <strong className="routeDetailStatValue">{route.total_pages || 0}</strong>
        </div>

        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Desatualizadas</span>
          <strong className="routeDetailStatValue warning">
            {route.outdated_pages || 0}
          </strong>
        </div>

        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Críticas</span>
          <strong className="routeDetailStatValue danger">
            {route.critical_pages || 0}
          </strong>
        </div>
      </div>

      {hasSnapshot && route.ownersPendingMessage ? (
        <div className="detailOwners">
          <div className="detailOwnersTitle">Pendências por responsável</div>
          <div className="detailOwnersText">{route.ownersPendingMessage}</div>
        </div>
      ) : null}

      <div className="detailActions">
        {route.doc_link ? (
          <a
            className="secondaryButton primary"
            href={route.doc_link}
            target="_blank"
            rel="noreferrer"
          >
            Abrir documento
          </a>
        ) : null}

        {route.pdf_link ? (
          <a
            className="secondaryButton"
            href={route.pdf_link}
            target="_blank"
            rel="noreferrer"
          >
            Reexecutar auditoria
          </a>
        ) : null}
      </div>
    </article>
  );
}