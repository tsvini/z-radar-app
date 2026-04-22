"use client";

import { useEffect, useMemo, useState } from "react";

type RouteItem = {
  key: string;
  label: string;
  lastExecution: string;
  error: string;
  status_title: string;
  status_text: string;
  doc_title: string;
  total_pages: number;
  outdated_pages: number;
  critical_pages: number;
  health_percent: number;
  ownersPendingMessage: string;
  doc_link: string;
  pdf_link: string;
  ai_generation_url: string;
  captured_at: string;
};

type DashboardResponse = {
  ok: boolean;
  productName: string;
  routes: RouteItem[];
  error?: string;
};

const CONFIG = {
  apiUrl: "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard",
  apiToken: "COLE_AQUI_O_SEU_WORKER_DASHBOARD_TOKEN",
  logoUrl:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663074205059/YYysBrVmJpSmKDAW.png",
};

function toNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function getHealthLabel(percent: number) {
  if (percent < 40) return "Crítico";
  if (percent < 75) return "Alerta";
  return "Saudável";
}

function getHealthBadgeClass(percent: number) {
  if (percent < 40) return "badgeBad";
  if (percent < 75) return "badgeMid";
  return "badgeGood";
}

function getProgressStyle(percent: number) {
  if (percent < 40) {
    return { background: "linear-gradient(90deg, #ff7f8f, #ffb6c1)" };
  }
  if (percent < 75) {
    return { background: "linear-gradient(90deg, #ffd86b, #ffe8a6)" };
  }
  return { background: "linear-gradient(90deg, #26e07f, #7dffb1)" };
}

export default function HomePage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      if (
        !CONFIG.apiToken ||
        CONFIG.apiToken === "COLE_AQUI_O_SEU_WORKER_DASHBOARD_TOKEN"
      ) {
        throw new Error("Defina o token real em CONFIG.apiToken.");
      }

      const response = await fetch(CONFIG.apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CONFIG.apiToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const json = (await response.json()) as DashboardResponse;

      if (!response.ok || !json.ok) {
        throw new Error(json?.error || "Falha ao carregar dashboard.");
      }

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const summary = useMemo(() => {
    const routes = data?.routes || [];
    const totalRoutes = routes.length;
    const totalPages = routes.reduce(
      (acc, item) => acc + toNumber(item.total_pages),
      0
    );
    const totalOutdated = routes.reduce(
      (acc, item) => acc + toNumber(item.outdated_pages),
      0
    );
    const totalCritical = routes.reduce(
      (acc, item) => acc + toNumber(item.critical_pages),
      0
    );
    const avgHealth = totalRoutes
      ? Math.round(
          routes.reduce(
            (acc, item) => acc + toNumber(item.health_percent),
            0
          ) / totalRoutes
        )
      : 0;

    return {
      totalRoutes,
      totalPages,
      totalOutdated,
      totalCritical,
      avgHealth,
    };
  }, [data]);

  return (
    <>
      <style>{`
        :root {
          --bg: #061018;
          --bg2: #0b1622;
          --panel: rgba(10, 18, 28, 0.8);
          --panelStrong: rgba(12, 20, 32, 0.92);
          --line: rgba(120, 255, 192, 0.12);
          --line2: rgba(255,255,255,0.08);
          --text: #edf6f1;
          --muted: #92a7a0;
          --green: #26e07f;
          --green2: #7dffb1;
          --yellow: #ffd86b;
          --red: #ff7f8f;
          --cyan: #53d4ff;
          --shadow: 0 30px 80px rgba(0,0,0,0.45);
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          background:
            radial-gradient(circle at 10% 20%, rgba(38, 224, 127, 0.10), transparent 0 24%),
            radial-gradient(circle at 90% 10%, rgba(83, 212, 255, 0.10), transparent 0 18%),
            linear-gradient(180deg, #04080d 0%, #08111a 45%, #071018 100%);
          color: var(--text);
          font-family: Inter, Arial, sans-serif;
        }

        body {
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          padding: 28px;
          position: relative;
          overflow-x: hidden;
        }

        .bgGrid {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 95%);
        }

        .shell {
          width: 100%;
          max-width: 1380px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 32px;
          background:
            linear-gradient(135deg, rgba(10,18,28,0.92), rgba(7,16,24,0.88)),
            radial-gradient(circle at top right, rgba(38,224,127,0.12), transparent 28%);
          box-shadow: var(--shadow);
          padding: 30px;
          margin-bottom: 24px;
        }

        .heroTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .brandLogo {
          width: 78px;
          height: 78px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(38,224,127,0.18), rgba(38,224,127,0.06));
          border: 1px solid rgba(38,224,127,0.22);
          box-shadow: 0 0 40px rgba(38,224,127,0.16);
          overflow: hidden;
          flex-shrink: 0;
        }

        .brandLogo img {
          width: 88%;
          height: 88%;
          object-fit: contain;
          filter: drop-shadow(0 0 14px rgba(38,224,127,0.28));
        }

        .brandCopy h1 {
          margin: 0;
          font-size: 34px;
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -1.2px;
        }

        .brandCopy p {
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
          max-width: 700px;
        }

        .heroActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn {
          border: none;
          border-radius: 14px;
          padding: 13px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s ease;
        }

        .btnPrimary {
          color: #04110a;
          background: linear-gradient(135deg, var(--green), var(--green2));
          box-shadow: 0 16px 40px rgba(38,224,127,0.18);
        }

        .btnSecondary {
          color: var(--text);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .heroStats {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .heroStat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 18px;
          min-height: 104px;
        }

        .heroStatLabel {
          color: var(--muted);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .08em;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .heroStatValue {
          font-size: 30px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .heroStatSub {
          margin-top: 8px;
          color: #b3c0bc;
          font-size: 13px;
        }

        .layout {
          display: grid;
          grid-template-columns: 1.1fr 2fr;
          gap: 24px;
        }

        .panel {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 28px;
          box-shadow: var(--shadow);
          padding: 24px;
        }

        .panelHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .panelTitle {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        .panelSubtitle {
          color: var(--muted);
          font-size: 13px;
          margin-top: 6px;
        }

        .healthList {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .healthItem {
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          border-radius: 18px;
          padding: 18px;
        }

        .healthTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .healthName {
          font-size: 16px;
          font-weight: 800;
        }

        .badge {
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .06em;
          white-space: nowrap;
        }

        .badgeGood {
          background: rgba(38,224,127,0.14);
          border: 1px solid rgba(38,224,127,0.18);
          color: #99ffc0;
        }

        .badgeMid {
          background: rgba(255,216,107,0.12);
          border: 1px solid rgba(255,216,107,0.18);
          color: #ffe8a4;
        }

        .badgeBad {
          background: rgba(255,127,143,0.12);
          border: 1px solid rgba(255,127,143,0.18);
          color: #ffc1ca;
        }

        .progress {
          width: 100%;
          height: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progressFill {
          height: 100%;
          border-radius: 999px;
        }

        .healthGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .healthKpi {
          background: rgba(0,0,0,0.14);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 14px;
          padding: 12px;
          text-align: center;
        }

        .healthKpiValue {
          font-size: 21px;
          font-weight: 900;
        }

        .healthKpiLabel {
          margin-top: 6px;
          color: var(--muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .06em;
          font-weight: 700;
        }

        .routeCards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .routeCard {
          border-radius: 24px;
          overflow: hidden;
          min-height: 320px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)),
            radial-gradient(circle at top right, rgba(38,224,127,0.08), transparent 28%),
            linear-gradient(180deg, #0b141f, #0a1119);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 20px 44px rgba(0,0,0,0.22);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .routeCardBody {
          padding: 22px;
        }

        .routeHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 18px;
        }

        .routeTitle {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.8px;
          margin: 0;
        }

        .routeMeta {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          margin-top: 8px;
        }

        .routeScore {
          min-width: 88px;
          height: 88px;
          border-radius: 22px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .routeScoreValue {
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }

        .routeScoreLabel {
          margin-top: 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: var(--muted);
          font-weight: 700;
        }

        .routeStatus {
          margin-top: 8px;
          margin-bottom: 18px;
          font-size: 15px;
          line-height: 1.6;
          color: #dce9e4;
        }

        .routeKpis {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .routeKpi {
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 14px 12px;
        }

        .routeKpiValue {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .routeKpiLabel {
          color: var(--muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .06em;
          font-weight: 700;
        }

        .ownersBox {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 16px;
          margin-top: 16px;
        }

        .ownersTitle {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .08em;
          font-weight: 800;
          color: var(--muted);
          margin-bottom: 10px;
        }

        .ownersText {
          color: #dbe9e3;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-line;
        }

        .routeActions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 0 22px 22px;
        }

        .routeLink {
          text-decoration: none;
          color: var(--text);
          border-radius: 12px;
          padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 13px;
          font-weight: 700;
        }

        .statusPill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .statusLoading {
          color: #d7fbe6;
          background: rgba(38,224,127,0.08);
          border: 1px solid rgba(38,224,127,0.14);
        }

        .statusError {
          color: #ffd3da;
          background: rgba(255,127,143,0.10);
          border: 1px solid rgba(255,127,143,0.16);
        }

        .footerNote {
          text-align: center;
          color: var(--muted);
          font-size: 12px;
          margin-top: 18px;
          opacity: 0.85;
        }

        .emptyBox {
          padding: 24px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--muted);
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .routeCards {
            grid-template-columns: 1fr;
          }

          .heroStats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .page {
            padding: 16px;
          }

          .hero {
            padding: 20px;
          }

          .brand {
            align-items: flex-start;
          }

          .brandCopy h1 {
            font-size: 28px;
          }

          .heroStats {
            grid-template-columns: 1fr;
          }

          .healthGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .routeKpis {
            grid-template-columns: 1fr;
          }

          .routeHeader {
            flex-direction: column;
          }
        }
      `}</style>

      <main className="page">
        <div className="bgGrid" />

        <div className="shell">
          <section className="hero">
            <div className="heroTop">
              <div className="brand">
                <div className="brandLogo">
                  <img src={CONFIG.logoUrl} alt="Z-Radar" />
                </div>

                <div className="brandCopy">
                  <h1>{data?.productName || "Z-Radar"}</h1>
                  <p>
                    Auditoria e monitoramento inteligente da documentação, com
                    visão consolidada das rotas, saúde geral, pendências por
                    responsável e acesso rápido aos artefatos.
                  </p>
                </div>
              </div>

              <div className="heroActions">
                <button className="btn btnSecondary" onClick={loadDashboard}>
                  Atualizar
                </button>
                <a
                  className="btn btnPrimary"
                  href={CONFIG.apiUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir API
                </a>
              </div>
            </div>

            <div className="heroStats">
              <div className="heroStat">
                <div className="heroStatLabel">Rotas monitoradas</div>
                <div className="heroStatValue">{summary.totalRoutes}</div>
                <div className="heroStatSub">Dados reais do Worker</div>
              </div>

              <div className="heroStat">
                <div className="heroStatLabel">Saúde média</div>
                <div className="heroStatValue">{summary.avgHealth}%</div>
                <div className="heroStatSub">Média consolidada</div>
              </div>

              <div className="heroStat">
                <div className="heroStatLabel">Páginas auditadas</div>
                <div className="heroStatValue">{summary.totalPages}</div>
                <div className="heroStatSub">
                  {summary.totalOutdated} desatualizadas
                </div>
              </div>

              <div className="heroStat">
                <div className="heroStatLabel">Críticas</div>
                <div className="heroStatValue">{summary.totalCritical}</div>
                <div className="heroStatSub">Itens com atenção imediata</div>
              </div>
            </div>
          </section>

          <div className="layout">
            <section className="panel">
              <div className="panelHeader">
                <div>
                  <div className="panelTitle">Saúde por rota</div>
                  <div className="panelSubtitle">
                    Resumo rápido das auditorias
                  </div>
                </div>

                {loading ? (
                  <div className="statusPill statusLoading">Carregando</div>
                ) : error ? (
                  <div className="statusPill statusError">Erro</div>
                ) : (
                  <div className="statusPill statusLoading">Atualizado</div>
                )}
              </div>

              {loading ? (
                <div className="emptyBox">Carregando dados do dashboard...</div>
              ) : error ? (
                <div className="emptyBox">{error}</div>
              ) : (
                <div className="healthList">
                  {data?.routes.map((route) => {
                    const health = toNumber(route.health_percent);

                    return (
                      <div className="healthItem" key={route.key}>
                        <div className="healthTop">
                          <div className="healthName">📍 {route.label}</div>
                          <div
                            className={`badge ${getHealthBadgeClass(health)}`}
                          >
                            {getHealthLabel(health)}
                          </div>
                        </div>

                        <div className="progress">
                          <div
                            className="progressFill"
                            style={{
                              width: `${health}%`,
                              ...getProgressStyle(health),
                            }}
                          />
                        </div>

                        <div className="healthGrid">
                          <div className="healthKpi">
                            <div className="healthKpiValue">{health}%</div>
                            <div className="healthKpiLabel">Saúde</div>
                          </div>
                          <div className="healthKpi">
                            <div className="healthKpiValue">
                              {toNumber(route.total_pages)}
                            </div>
                            <div className="healthKpiLabel">Total</div>
                          </div>
                          <div className="healthKpi">
                            <div className="healthKpiValue">
                              {toNumber(route.outdated_pages)}
                            </div>
                            <div className="healthKpiLabel">Desatual.</div>
                          </div>
                          <div className="healthKpi">
                            <div className="healthKpiValue">
                              {toNumber(route.critical_pages)}
                            </div>
                            <div className="healthKpiLabel">Críticas</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="panel">
              <div className="panelHeader">
                <div>
                  <div className="panelTitle">Visão detalhada</div>
                  <div className="panelSubtitle">
                    Cards usando os dados reais da API
                  </div>
                </div>

                {loading ? (
                  <div className="statusPill statusLoading">Carregando</div>
                ) : error ? (
                  <div className="statusPill statusError">Erro</div>
                ) : (
                  <div className="statusPill statusLoading">Dados reais</div>
                )}
              </div>

              {loading ? (
                <div className="emptyBox">Montando cards...</div>
              ) : error ? (
                <div className="emptyBox">{error}</div>
              ) : (
                <div className="routeCards">
                  {data?.routes.map((route) => {
                    const health = toNumber(route.health_percent);
                    const rerunUrl = `https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=${encodeURIComponent(
                      route.key
                    )}`;

                    return (
                      <article className="routeCard" key={route.key}>
                        <div className="routeCardBody">
                          <div className="routeHeader">
                            <div>
                              <h2 className="routeTitle">{route.label}</h2>
                              <div className="routeMeta">
                                Chave: {route.key}
                                <br />
                                Última execução:{" "}
                                {route.lastExecution || "Sem informação"}
                              </div>
                            </div>

                            <div className="routeScore">
                              <div className="routeScoreValue">{health}%</div>
                              <div className="routeScoreLabel">Saúde</div>
                            </div>
                          </div>

                          <div className={`badge ${getHealthBadgeClass(health)}`}>
                            {route.status_title || getHealthLabel(health)}
                          </div>

                          <div className="routeStatus">
                            {route.status_text || "Sem descrição disponível."}
                          </div>

                          <div className="routeKpis">
                            <div className="routeKpi">
                              <div className="routeKpiValue">
                                {toNumber(route.total_pages)}
                              </div>
                              <div className="routeKpiLabel">
                                Total de páginas
                              </div>
                            </div>

                            <div className="routeKpi">
                              <div className="routeKpiValue">
                                {toNumber(route.outdated_pages)}
                              </div>
                              <div className="routeKpiLabel">
                                Desatualizadas
                              </div>
                            </div>

                            <div className="routeKpi">
                              <div className="routeKpiValue">
                                {toNumber(route.critical_pages)}
                              </div>
                              <div className="routeKpiLabel">Críticas</div>
                            </div>
                          </div>

                          <div className="ownersBox">
                            <div className="ownersTitle">Documento auditado</div>
                            <div className="ownersText">
                              {route.doc_title || "Sem título"}
                            </div>
                          </div>

                          <div className="ownersBox">
                            <div className="ownersTitle">
                              Pendências por responsável
                            </div>
                            <div className="ownersText">
                              {route.ownersPendingMessage ||
                                "Nenhuma pendência identificada."}
                            </div>
                          </div>
                        </div>

                        <div className="routeActions">
                          {route.pdf_link ? (
                            <a
                              className="routeLink"
                              href={route.pdf_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              📄 Abrir PDF
                            </a>
                          ) : null}

                          {route.doc_link ? (
                            <a
                              className="routeLink"
                              href={route.doc_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              📚 Abrir ClickUp
                            </a>
                          ) : null}

                          <a
                            className="routeLink"
                            href={rerunUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🔁 Reexecutar auditoria
                          </a>

                          {route.ai_generation_url ? (
                            <a
                              className="routeLink"
                              href={route.ai_generation_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              ✨ Gerar texto com IA
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <div className="footerNote">
            {data?.routes?.some((item) => item.captured_at)
              ? `Última captura: ${
                  data.routes
                    .map((item) => item.captured_at)
                    .filter(Boolean)
                    .sort()
                    .pop() || "-"
                }`
              : "Dashboard carregado."}
          </div>
        </div>
      </main>
    </>
  );
}