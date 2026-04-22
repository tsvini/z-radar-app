import Link from "next/link";
import { RouteDetailCard } from "@/components/route-detail-card";
import { Sidebar } from "@/components/sidebar";
import { getDashboardData } from "@/lib/dashboard";

type Props = {
  params: Promise<{ routeKey: string }>;
};

export default async function RouteHistoryPage({ params }: Props) {
  const { routeKey } = await params;
  const data = await getDashboardData();
  const route = data.routes.find((item) => item.key === routeKey);

  return (
    <main className="appShell">
      <div className="auroraBg" />
      <Sidebar />

      <section className="pageContent">
        <div className="dashboardWrap">
          <section className="sectionCard">
            <div className="sectionHeader">
              <div>
                <h1 className="sectionTitle">
                  {route ? `Histórico da rota ${route.label}` : "Rota não encontrada"}
                </h1>
                <p className="sectionSubtitle">
                  Visão detalhada da rota selecionada
                </p>
              </div>

              <Link href="/" className="btn btnGhost">
                Voltar ao dashboard
              </Link>
            </div>

            {!route ? (
              <div className="emptyState">
                Nenhum dado disponível para a rota <strong>{routeKey}</strong>.
              </div>
            ) : (
              <RouteDetailCard route={route} />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}