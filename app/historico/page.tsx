import { RoutesExplorer } from "@/components/routes-explorer";
import { getDashboardData, type DashboardRoute } from "@/lib/dashboard";

export default async function HistoricoIndexPage() {
  const data = await getDashboardData();
  const routes: DashboardRoute[] = Array.isArray(data?.routes) ? data.routes : [];

  const errorMessage =
    typeof data?.error === "string" && data.error.trim() ? data.error : "";

  const rerunBaseUrl =
    process.env.NEXT_PUBLIC_WORKER_RERUN_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_RERUN_URL ||
    "https://wandering-disk-47a9.tsvini111.workers.dev/";

  return (
    <div className="dashboardWrap">
      {errorMessage ? (
        <div className="errorBanner">
          Não foi possível carregar os dados reais da API. {errorMessage}
        </div>
      ) : null}

      <RoutesExplorer
        routes={routes}
        rerunBaseUrl={rerunBaseUrl}
        title="Histórico"
        subtitle="Acesse o detalhamento por rota e compare snapshots ao longo do tempo."
        primaryLabel="Ver detalhes"
      />
    </div>
  );
}

