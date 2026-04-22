import { DashboardRoute, getHealthLabel, getHealthTone, hasAuditData } from "@/lib/dashboard";

type Props = {
  route: DashboardRoute;
};

export function RouteHealthCard({ route }: Props) {
  const tone = getHealthTone(route.health_percent, route);
  const label = getHealthLabel(route.health_percent, route);
  const noData = !hasAuditData(route);

  return (
    <div className="routeHealthCard">
      <div className="routeHealthTop">
        <h3 className="routeCardTitle">{route.label}</h3>
        <span className={`statusBadge ${tone}`}>{label}</span>
      </div>

      <div className="progressTrack">
        <div
          className={`progressFill ${tone}`}
          style={{ width: `${noData ? 0 : Math.max(0, Math.min(100, route.health_percent || 0))}%` }}
        />
      </div>

      <div className="routeGrid">
        <div className="routeMetric">
          <strong>{noData ? "-" : `${route.health_percent}%`}</strong>
          <span>Saúde</span>
        </div>

        <div className="routeMetric">
          <strong>{route.total_pages || 0}</strong>
          <span>Total</span>
        </div>

        <div className="routeMetric warningMetric">
          <strong>{route.outdated_pages || 0}</strong>
          <span>Desatualizadas</span>
        </div>

        <div className="routeMetric dangerMetric">
          <strong>{route.critical_pages || 0}</strong>
          <span>Críticas</span>
        </div>
      </div>
    </div>
  );
}