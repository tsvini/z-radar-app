import { DashboardRoute, formatOwnersMessage, getHealthLabel, getHealthTone } from "@/lib/dashboard";

type Props = {
  route: DashboardRoute;
};

export function RouteDetailCard({ route }: Props) {
  const tone = getHealthTone(route.health_percent);
  const toneClass =
    tone === "danger"
      ? "toneDanger"
      : tone === "warning"
      ? "toneWarning"
      : "toneSuccess";

  const owners = formatOwnersMessage(route.ownersPendingMessage);

  return (
    <article className="detailCard">
      <div className="detailCardTop">
        <div>
          <h3 className="detailCardTitle">{route.label}</h3>
          <div className="detailCardSubtitle">
            Última execução: {route.lastExecution || "Não disponível"}
          </div>
        </div>

        <div className={`detailHealth ${toneClass}`}>
          <strong>{route.health_percent || 0}%</strong>
          <span>Saúde</span>
        </div>
      </div>

      <div className="detailGrid">
        <div className="detailMetric">
          <span>Total</span>
          <strong>{route.total_pages || 0}</strong>
        </div>
        <div className="detailMetric">
          <span>Desatualizadas</span>
          <strong>{route.outdated_pages || 0}</strong>
        </div>
        <div className="detailMetric">
          <span>Críticas</span>
          <strong>{route.critical_pages || 0}</strong>
        </div>
        <div className="detailMetric">
          <span>Status</span>
          <strong>{route.status_title || getHealthLabel(route.health_percent)}</strong>
        </div>
      </div>

      <div className="detailTextBlock">
        <div className="detailSectionLabel">Documento auditado</div>
        <p>{route.doc_title || "Documento não informado"}</p>
      </div>

      <div className="detailTextBlock">
        <div className="detailSectionLabel">Resumo</div>
        <p>{route.status_text || "Sem resumo disponível."}</p>
      </div>

      <div className="detailTextBlock">
        <div className="detailSectionLabel">Pendências por responsável</div>
        {owners.length ? (
          <ul className="detailList">
            {owners.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma pendência registrada.</p>
        )}
      </div>

      <div className="detailActions">
        {route.pdf_link ? (
          <a href={route.pdf_link} target="_blank" rel="noreferrer" className="btn btnGhost">
            Abrir PDF
          </a>
        ) : null}

        {route.doc_link ? (
          <a href={route.doc_link} target="_blank" rel="noreferrer" className="btn btnGhost">
            Abrir ClickUp
          </a>
        ) : null}

        <a
          href={`https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=${route.key}`}
          target="_blank"
          rel="noreferrer"
          className="btn btnGhost"
        >
          Reexecutar auditoria
        </a>

        {route.ai_generation_url ? (
          <a href={route.ai_generation_url} target="_blank" rel="noreferrer" className="btn btnPrimary">
            Gerar texto com IA
          </a>
        ) : null}
      </div>
    </article>
  );
}