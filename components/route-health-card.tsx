import Link from "next/link";
import { getHealthLabel, getHealthTone, type DashboardRoute } from "@/lib/dashboard";

type RouteHealthCardProps = {
  route: DashboardRoute;
};

export function RouteHealthCard({ route }: RouteHealthCardProps) {
  const tone = getHealthTone(Number(route.health_percent || 0));
  const label = getHealthLabel(Number(route.health_percent || 0));

  return (
    <div className="routeHealthCard">
      <div className="routeHealthTop">
        <h3 className="routeCardTitle">{route.label}</h3>
        <span className={`statusBadge ${tone}`}>{label}</span>
      </div>

      <div className="progressTrack">
        <div
          className={`progressFill ${tone}`}
          style={{ width: `${Math.max(0, Math.min(100, Number(route.health_percent || 0)))}%` }}
        />
      </div>

      <div className="routeGrid">
        <div className="routeMetric">
          <strong>{route.health_percent || 0}%</strong>
          <span>Saúde</span>
        </div>
        <div className="routeMetric">
          <strong>{route.total_pages || 0}</strong>
          <span>Total</span>
        </div>
        <div className="routeMetric">
          <strong>{route.outdated_pages || 0}</strong>
          <span>Desatualizadas</span>
        </div>
        <div className="routeMetric">
          <strong>{route.critical_pages || 0}</strong>
          <span>Críticas</span>
        </div>
      </div>

      <div className="routeActions">
        <Link href={`/historico/${route.key}`} className="smallActionButton">
          Ver detalhes
        </Link>

        {route.doc_link ? (
          <a href={route.doc_link} target="_blank" rel="noreferrer" className="smallActionButton ghost">
            Abrir doc
          </a>
        ) : null}
      </div>
    </div>
  );
}