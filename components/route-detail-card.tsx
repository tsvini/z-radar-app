type RouteDetailCardProps = {
  route: {
    key: string;
    label: string;
    lastExecution?: string;
    health_percent: number;
    total_pages: number;
    outdated_pages: number;
    critical_pages: number;
    status_title?: string;
    status_text?: string;
    ownersPendingMessage?: string;
    doc_link?: string;
    pdf_link?: string;
    ai_generation_url?: string;
    captured_at?: string;
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
  return "Auditoria saudável";
}

function formatBrazilDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date
    .toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " às");
}

export function RouteDetailCard({ route }: RouteDetailCardProps) {
  const health = Number(route.health_percent || 0);
  const totalPages = Number(route.total_pages || 0);
  const outdatedPages = Number(route.outdated_pages || 0);
  const criticalPages = Number(route.critical_pages || 0);

  const tone = getTone(health, totalPages);
  const label = getLabel(health, totalPages);
  const capturedAt = formatBrazilDate(route.captured_at);

  return (
    <article className="routeDetailCard">
      <div className="routeDetailTop">
        <div>
          <h3 className="routeTitle">{route.label}</h3>
          <p className="routeSub">
            Última execução: {route.lastExecution || "Não disponível"}
          </p>
        </div>

        <div className="routeScore">
          <span className="routeScoreValue">{totalPages ? `${health}%` : "-"}</span>
          <span className="routeScoreLabel">Saúde</span>
        </div>
      </div>

      <div className="routeDetailMeta">
        <span className={`routeBadge ${tone}`}>{label}</span>
        {capturedAt ? (
          <span className="routeCapturedAt">Atualizado em {capturedAt}</span>
        ) : null}
      </div>

      <p className="detailMessage">
        {route.status_text?.trim()
          ? route.status_text
          : "Ainda não existe snapshot de auditoria para esta rota."}
      </p>

      <div className="routeDetailStats">
        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Total</span>
          <strong className="routeDetailStatValue">{totalPages}</strong>
        </div>

        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Desatualizadas</span>
          <strong className="routeDetailStatValue warning">{outdatedPages}</strong>
        </div>

        <div className="routeDetailStat">
          <span className="routeDetailStatLabel">Críticas</span>
          <strong className="routeDetailStatValue danger">{criticalPages}</strong>
        </div>
      </div>

      {route.ownersPendingMessage?.trim() ? (
        <div className="detailOwners">
          <div className="detailOwnersTitle">Pendências por responsável</div>
          <div className="detailOwnersText">{route.ownersPendingMessage}</div>
        </div>
      ) : null}

      <div className="detailActions">
        <a
          className="secondaryButton"
          href={`https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=${route.key}`}
          target="_blank"
          rel="noreferrer"
        >
          Reexecutar auditoria
        </a>
      </div>
    </article>
  );
}