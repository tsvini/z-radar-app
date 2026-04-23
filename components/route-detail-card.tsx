"use client";

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
  rerunBaseUrl?: string;
  showPrimaryAction?: boolean;
  primaryLabel?: string;
  primaryHref?: string;
  showResourceActions?: boolean;
};

function buildHistoryHref(routeKey: string) {
  return `/historico/${encodeURIComponent(routeKey)}`;
}

function buildRerunHref(routeKey: string, baseUrl?: string) {
  const fallbackBaseUrl = "https://wandering-disk-47a9.tsvini111.workers.dev/";
  const resolvedBaseUrl = baseUrl || fallbackBaseUrl;

  try {
    const url = new URL(resolvedBaseUrl);
    url.searchParams.set("routeKey", routeKey);
    return url.toString();
  } catch {
    return resolvedBaseUrl;
  }
}

export function RouteDetailCard({
  route,
  rerunBaseUrl,
  showPrimaryAction = true,
  primaryLabel,
  primaryHref,
  showResourceActions = false,
}: RouteDetailCardProps) {
  const tone = getRouteTone(route);
  const badge = getRouteBadge(route);
  const hasSnapshot = hasRealSnapshot(route);

  const healthPercent = Number(route.health_percent || 0);
  const healthValue = hasSnapshot ? `${healthPercent}%` : "-";
  const capturedAt = formatBrazilDate(route.captured_at);
  const lastExecution = route.lastExecution || "Sem registro disponível";
  const resolvedPrimaryHref = primaryHref || buildHistoryHref(route.key);
  const resolvedPrimaryLabel = primaryLabel || "Ver histórico";
  const rerunHref = buildRerunHref(route.key, rerunBaseUrl);

  const docHref = typeof route.doc_link === "string" && route.doc_link.trim() ? route.doc_link : "";
  const pdfHref = typeof route.pdf_link === "string" && route.pdf_link.trim() ? route.pdf_link : "";
  const aiHref =
    typeof route.ai_generation_url === "string" && route.ai_generation_url.trim()
      ? route.ai_generation_url
      : "";

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
            width: hasSnapshot ? `${Math.max(healthPercent, 12)}%` : "18%",
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
        {showPrimaryAction ? (
          <Link className="secondaryButton primary" href={resolvedPrimaryHref}>
            {resolvedPrimaryLabel}
          </Link>
        ) : null}

        <a
          className="secondaryButton"
          href={rerunHref}
          target="_blank"
          rel="noreferrer"
        >
          Reexecutar auditoria
        </a>

        {showResourceActions && docHref ? (
          <a className="secondaryButton" href={docHref} target="_blank" rel="noreferrer">
            Abrir documentação
          </a>
        ) : null}

        {showResourceActions && pdfHref ? (
          <a className="secondaryButton" href={pdfHref} target="_blank" rel="noreferrer">
            Abrir PDF
          </a>
        ) : null}

        {showResourceActions && aiHref ? (
          <a className="secondaryButton" href={aiHref} target="_blank" rel="noreferrer">
            Gerar com IA
          </a>
        ) : null}
      </div>
    </article>
  );
}
