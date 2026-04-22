type RouteHealthCardProps = {
  route: {
    key: string;
    label: string;
    health_percent: number;
    total_pages: number;
    outdated_pages: number;
    critical_pages: number;
    status_title?: string;
  };
};

function getTone(percent: number, totalPages: number) {
  if (!totalPages) return "neutral";
  if (percent < 40) return "danger";
  if (percent < 75) return "warning";
  return "success";
}

function getLabel(percent: number, totalPages: number) {
  if (!totalPages) return "Sem auditoria";
  if (percent < 40) return "Crítico";
  if (percent < 75) return "Atenção";
  return "Saudável";
}

export function RouteHealthCard({ route }: RouteHealthCardProps) {
  const health = Number(route.health_percent || 0);
  const totalPages = Number(route.total_pages || 0);
  const outdatedPages = Number(route.outdated_pages || 0);
  const criticalPages = Number(route.critical_pages || 0);

  const tone = getTone(health, totalPages);
  const label = getLabel(health, totalPages);

  return (
    <article className="routeHealthCard">
      <div className="routeHealthTop">
        <div>
          <h3 className="routeTitle">{route.label}</h3>
        </div>

        <span className={`routeBadge ${tone}`}>{label}</span>
      </div>

      <div className="healthBar">
        <div
          className={`healthBarFill ${tone}`}
          style={{ width: `${totalPages ? health : 0}%` }}
        />
      </div>

      <div className="routeMiniStats">
        <div className="routeMiniStat">
          <span className="routeMiniValue">{totalPages ? `${health}%` : "-"}</span>
          <span className="routeMiniLabel">Saúde</span>
        </div>

        <div className="routeMiniStat">
          <span className="routeMiniValue">{totalPages}</span>
          <span className="routeMiniLabel">Total</span>
        </div>

        <div className="routeMiniStat">
          <span className="routeMiniValue warning">{outdatedPages}</span>
          <span className="routeMiniLabel">Desatualizadas</span>
        </div>

        <div className="routeMiniStat">
          <span className="routeMiniValue danger">{criticalPages}</span>
          <span className="routeMiniLabel">Críticas</span>
        </div>
      </div>
    </article>
  );
}