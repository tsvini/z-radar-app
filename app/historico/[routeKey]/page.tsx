import Link from "next/link";
import { RouteDetailCard } from "@/components/route-detail-card";
import { Sidebar } from "@/components/sidebar";
import { getDashboardData } from "@/lib/dashboard";

type Props = {
  params: Promise<{ routeKey: string }>;
};

export default async function HistoricoRoutePage({ params }: Props) {
  const { routeKey } = await params;
  const data = await getDashboardData();
  const route = data.routes.find((item) => item.key === routeKey);

  return (
    <main className="appShell">
      <div className="auroraBg" />
      <Sidebar />

      <section className="contentArea">
        <header className="topbar">
          <div className="topbarLeft">
            <span className="topbarTitle">Detalhes da rota</span>
          </div>

          <div className="topbarRight">
            <Link href="/" className="topbarButton muted">
              Voltar
            </Link>
          </div>
        </header>

        <section className="sectionCard compact">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">{route?.label || "Rota não encontrada"}</h2>
              <p className="sectionSubtitle">Detalhamento individual da auditoria</p>
            </div>
          </div>

          {route ? (
            <RouteDetailCard route={route} />
          ) : (
            <div className="emptyState">
              Nenhum dado disponível para a rota <strong>{routeKey}</strong>.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}