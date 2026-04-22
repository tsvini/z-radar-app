import Link from "next/link";
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

function buildHistoryHref(routeKey: string) {
  return `/historico/${routeKey}`;
}

function buildRerunHref(routeKey: string) {
  if (routeKey === "edutech") {
    return "https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=edutech";
  }

  if (routeKey === "assistente-virtual") {
    return "https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=assistente-virtual";
  }

  return "https://wandering-disk-47a9.tsvini111.workers.dev/";
}

export function RouteDetailCard({ route }: RouteDetailCardProps) {
  const tone = getRouteTone(route);
  const badge = getRouteBadge(route);
  const hasSnapshot = hasRealSnapshot(route);

  const healthValue = hasSnapshot ? `${route.health_percent}%` : "-";
  const capturedAt = formatBrazilDate(route.captured_at);
  const lastExecution = route.lastExecution || "Sem registro disponível";

  return (
    <article className="routeDetailCard">
      <div className="routeDetailTop">
        <div>
          <h3 className="routeTitle">{route.label}</h3>
          <p className="routeSub">Última execução: {lastExecution}</p>
        </div>

        <div className="routeScore">
          <div className={`routeScoreValue ${tone}`}>{healthValue}</div>
          <div className="routeScoreLabel">Saúde</div>
        </div>
      </div>

      <div className="routeDetailMeta">
        <span className={`routeBadge ${tone}`}>{badge}</span>
        <span className="routeCapturedAt">
          {hasSnapshot && capturedAt
            ? `Atualizado em ${capturedAt}`
            : "Sem snapshot disponível"}
        </span>
      </div>

      <div className="healthBar routeDetailBar">
        <div
          className={`healthBarFill ${tone}`}
          style={{
            width: hasSnapshot ? `${Math.max(route.health_percent, 12)}%` : "18%",
          }}
        />
      </div>

      <div className="detailMessage">
        {hasSnapshot
          ? route.status_text || "A documentação está em observação."
          : "Ainda não existe snapshot de auditoria para esta rota."}
      </div>

      <div className="routeDetailStats">
        <div className="routeDetailStat">
          <div className="routeDetailStatLabel">Total</div>
          <div className="routeDetailStatValue">{route.total_pages || 0}</div>
        </div>

        <div className="routeDetailStat">
          <div className="routeDetailStatLabel">Desatualizadas</div>
          <div className="routeDetailStatValue warning">
            {route.outdated_pages || 0}
          </div>
        </div>

        <div className="routeDetailStat">
          <div className="routeDetailStatLabel">Críticas</div>
          <div className="routeDetailStatValue danger">
            {route.critical_pages || 0}
          </div>
        </div>
      </div>

      {hasSnapshot && route.ownersPendingMessage ? (
        <div className="detailOwners">
          <div className="detailOwnersTitle">Pendências por responsável</div>
          <div className="detailOwnersText">{route.ownersPendingMessage}</div>
        </div>
      ) : null}

      <div className="detailActions">
        <Link className="secondaryButton primary" href={buildHistoryHref(route.key)}>
          Ver histórico
        </Link>

        <a
          className="secondaryButton"
          href={buildRerunHref(route.key)}
          target="_blank"
          rel="noreferrer"
        >
          Reexecutar auditoria
        </a>
      </div>
    </article>
  );
}