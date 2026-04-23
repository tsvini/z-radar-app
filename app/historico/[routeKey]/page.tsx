import Link from "next/link";
import { RouteDetailCard } from "@/components/route-detail-card";
import { getDashboardData } from "@/lib/dashboard";

type Props = {
  params: { routeKey: string } | Promise<{ routeKey: string }>;
};

export default async function HistoricoRoutePage({ params }: Props) {
  const { routeKey } = await params;
  const data = await getDashboardData();
  const decodedRouteKey = decodeURIComponent(routeKey);
  const route = data.routes.find((item) => item.key === decodedRouteKey);
  const errorMessage =
    typeof data?.error === "string" && data.error.trim() ? data.error : "";
  const rerunBaseUrl =
    process.env.NEXT_PUBLIC_WORKER_RERUN_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_RERUN_URL ||
    "https://wandering-disk-47a9.tsvini111.workers.dev/";

  return (
    <section className="sectionCard">
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">
            {route?.label || `Rota não encontrada (${decodedRouteKey})`}
          </h2>
          <p className="sectionSubtitle">Detalhamento individual da auditoria</p>
        </div>

        <div className="sectionHeaderActions">
          <Link href="/historico" className="secondaryButton">
            Voltar
          </Link>
        </div>
      </div>

      {errorMessage ? (
        <div className="errorBanner">
          Não foi possível carregar os dados reais da API. {errorMessage}
        </div>
      ) : null}

      {route ? (
        <RouteDetailCard
          route={route}
          rerunBaseUrl={rerunBaseUrl}
          showPrimaryAction={false}
          showResourceActions
        />
      ) : (
        <div className="emptyState">
          Nenhum dado disponível para a rota <strong>{decodedRouteKey}</strong>.
        </div>
      )}
    </section>
  );
}
