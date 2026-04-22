import Link from "next/link";
import { getDashboardData, getHealthLabel, getHealthTone } from "../../../lib/dashboard";

type Props = {
  params: Promise<{ routeKey: string }>;
};

function toneClass(percent: number) {
  const tone = getHealthTone(percent);
  if (tone === "danger") return "toneDanger";
  if (tone === "warning") return "toneWarning";
  return "toneSuccess";
}

export default async function HistoricoPage({ params }: Props) {
  const { routeKey } = await params;
  const data = await getDashboardData();
  const route = data.routes.find((item) => item.key === routeKey);

  if (!route) {
    return (
      <div className="sectionCard">
        <h2 className="sectionTitle">Rota não encontrada</h2>
        <p className="sectionSubtitle">Nenhum dado disponível para {routeKey}.</p>
        <div style={{ marginTop: 16 }}>
          <Link className="actionBtn" href="/">
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboardWrap">
      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle">{route.label}</h2>
            <p className="sectionSubtitle">Detalhamento da rota selecionada</p>
          </div>

          <div className={`badge ${toneClass(route.health_percent)}`}>
            {route.status_title || getHealthLabel(route.health_percent)}
          </div>
        </div>

        <div className="statsGrid">
          <div className="statCard">
            <div className="statLabel">Saúde</div>
            <div className="statValue">{route.health_percent}%</div>
            <div className="statHint">{getHealthLabel(route.health_percent)}</div>
          </div>

          <div className="statCard">
            <div className="statLabel">Total</div>
            <div className="statValue">{route.total_pages}</div>
            <div className="statHint">Páginas auditadas</div>
          </div>

          <div className="statCard">
            <div className="statLabel">Desatualizadas</div>
            <div className="statValue">{route.outdated_pages}</div>
            <div className="statHint">Precisam revisão</div>
          </div>

          <div className="statCard">
            <div className="statLabel">Críticas</div>
            <div className="statValue">{route.critical_pages}</div>
            <div className="statHint">Ação imediata</div>
          </div>
        </div>

        <div className="block" style={{ marginTop: 20 }}>
          <div className="blockTitle">Status</div>
          <div className="blockText">{route.status_text}</div>
        </div>

        <div className="block" style={{ marginTop: 20 }}>
          <div className="blockTitle">Documento auditado</div>
          <div className="blockText">{route.doc_title}</div>
        </div>

        <div className="block" style={{ marginTop: 20 }}>
          <div className="blockTitle">Pendências por responsável</div>
          <div className="blockText preserve">{route.ownersPendingMessage}</div>
        </div>

        <div className="routeActions" style={{ marginTop: 20 }}>
          <Link className="actionBtn" href="/">
            ← Voltar ao dashboard
          </Link>

          {route.doc_link ? (
            <a className="actionBtn" href={route.doc_link} target="_blank" rel="noreferrer">
              📚 Abrir ClickUp
            </a>
          ) : null}

          {route.pdf_link ? (
            <a className="actionBtn" href={route.pdf_link} target="_blank" rel="noreferrer">
              📄 Abrir PDF
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}