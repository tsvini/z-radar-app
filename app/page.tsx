import { HeroBanner } from "@/components/hero-banner";
import { RoutesExplorer } from "@/components/routes-explorer";
import { StatCard } from "@/components/stat-card";
import { UpcomingModuleCard } from "@/components/upcoming-module-card";
import { formatBrazilDate, getDashboardData, type DashboardRoute } from "@/lib/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  const routes: DashboardRoute[] = Array.isArray(data?.routes) ? data.routes : [];

  const totalRoutes = routes.length;

  const totalPages = routes.reduce((acc, item) => {
    return acc + Number(item.total_pages || 0);
  }, 0);

  const totalOutdated = routes.reduce((acc, item) => {
    return acc + Number(item.outdated_pages || 0);
  }, 0);

  const totalCritical = routes.reduce((acc, item) => {
    return acc + Number(item.critical_pages || 0);
  }, 0);

  const avgHealth =
    totalRoutes > 0
      ? Math.round(
          routes.reduce((acc, item) => {
            return acc + Number(item.health_percent || 0);
          }, 0) / totalRoutes
        )
      : 0;

  const latestCapturedAt = routes
    .map((route) => (route.captured_at ? new Date(route.captured_at) : null))
    .filter((date): date is Date => Boolean(date && !Number.isNaN(date.getTime())))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const lastUpdatedValue = latestCapturedAt
    ? formatBrazilDate(latestCapturedAt.toISOString())
    : "Sem registro";

  const healthTone = avgHealth < 40 ? "danger" : avgHealth < 75 ? "warning" : "success";
  const criticalTone = totalCritical === 0 ? "success" : totalCritical < 5 ? "warning" : "danger";

  const errorMessage =
    typeof data?.error === "string" && data.error.trim() ? data.error : "";

  const rerunBaseUrl =
    process.env.NEXT_PUBLIC_WORKER_RERUN_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_RERUN_URL ||
    "https://wandering-disk-47a9.tsvini111.workers.dev/";

  const upcomingModules = [
    {
      title: "Histórico executivo",
      description:
        "Linha do tempo das execuções, evolução da saúde documental e rastreabilidade consolidada.",
    },
    {
      title: "Pendências",
      description:
        "Visão consolidada das pendências por responsável, com foco em criticidade e priorização.",
    },
    {
      title: "Insights",
      description:
        "Leitura executiva da operação com destaques, tendências e pontos de atenção automáticos.",
    },
    {
      title: "Configurações",
      description:
        "Gestão de rotas monitoradas, preferências operacionais e parâmetros do produto.",
    },
  ];

  return (
    <div className="dashboardWrap">
      <HeroBanner lastUpdatedValue={lastUpdatedValue} />

      {errorMessage ? (
        <div className="errorBanner">
          Não foi possível carregar os dados reais da API. {errorMessage}
        </div>
      ) : null}

      <section className="statsGrid">
        <StatCard
          title="Rotas monitoradas"
          value={String(totalRoutes)}
          footnote="Dados reais do Worker"
          icon="routes"
          tone={totalRoutes > 0 ? "success" : "neutral"}
        />

        <StatCard
          title="Saúde média"
          value={`${avgHealth}%`}
          footnote="Média consolidada"
          icon="health"
          tone={totalRoutes > 0 ? healthTone : "neutral"}
        />

        <StatCard
          title="Páginas auditadas"
          value={String(totalPages)}
          footnote={`${totalOutdated} desatualizadas`}
          icon="pages"
          tone={totalPages > 0 ? "neutral" : "neutral"}
        />

        <StatCard
          title="Críticas"
          value={String(totalCritical)}
          footnote="Itens com atenção imediata"
          icon="critical"
          tone={totalRoutes > 0 ? criticalTone : "neutral"}
        />
      </section>

      <RoutesExplorer
        routes={routes}
        rerunBaseUrl={rerunBaseUrl}
        title="Visão detalhada"
        subtitle="Consolidado executivo das rotas auditadas"
      />

      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle">Módulos complementares</h2>
            <p className="sectionSubtitle">
              Funcionalidades previstas para a evolução do painel
            </p>
          </div>
        </div>

        <div className="upcomingModulesGrid">
          {upcomingModules.map((module) => (
            <UpcomingModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
            />
          ))}
        </div>
      </section>

      <div className="footerNote">Criado por Vinicius Torales de Souza</div>
    </div>
  );
}
