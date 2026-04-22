import Link from "next/link";
import { DashboardRoute, getHealthLabel, getHealthTone } from "@/lib/dashboard";

type Props = {
  route: DashboardRoute;
};

export function RouteHealthCard({ route }: Props) {
  const tone = getHealthTone(route.health_percent);
  const toneClass =
    tone === "danger"
      ? "toneDanger"
      : tone === "warning"
      ? "toneWarning"
      : "toneSuccess";

  return (
    <Link href={`/historico/${route.key}`} className="routeHealthCard">
      <div className="routeHealthTop">
        <h3 className="routeHealthTitle">{route.label}</h3>
        <span className={`badge ${toneClass}`}>
          {route.status_title || getHealthLabel(route.health_percent)}
        </span>
      </div>

      <div className="progressTrack">
        <div
          className={`progressFill ${toneClass}`}
          style={{ width: `${Math.max(0, Math.min(100, route.health_percent || 0))}%` }}
        />
      </div>

      <div className="routeHealthStats">
        <div className="metricMini">
          <strong>{route.health_percent || 0}%</strong>
          <span>Saúde</span>
        </div>

        <div className="metricMini">
          <strong>{route.total_pages || 0}</strong>
          <span>Total</span>
        </div>

        <div className="metricMini">
          <strong>{route.outdated_pages || 0}</strong>
          <span>Desatualizadas</span>
        </div>

        <div className="metricMini">
          <strong>{route.critical_pages || 0}</strong>
          <span>Críticas</span>
        </div>
      </div>
    </Link>
  );
}