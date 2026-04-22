import { HeroBanner } from "@/components/hero-banner";
import { RouteDetailCard } from "@/components/route-detail-card";
import { RouteHealthCard } from "@/components/route-health-card";
import { StatCard } from "@/components/stat-card";
import { UpcomingModuleCard } from "@/components/upcoming-module-card";
import { getDashboardData } from "@/lib/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  const routes = Array.isArray(data.routes) ? data.routes : [];
  const totalRoutes = routes.length;

  const totalPages = totalRoutes
    ? routes.reduce((acc, item) => acc + Number(item.total_pages || 0), 0)
    : 0;

  const totalOutdated = totalRoutes
    ? routes.reduce((acc, item) => acc + Number(item.outdated_pages || 0), 0)
    : 0;

  const totalCritical = totalRoutes
    ? routes.reduce((acc, item) => acc + Number(item.critical_pages || 0), 0)
    : 0;

  const avgHealth = totalRoutes
    ? Math.round(
        routes.reduce(
          (acc, item) => acc + Number(item.health_percent || 0),
          0
        ) / totalRoutes
      )
    : 0;

  const errorMessage =
    data.error && data.error.trim() ? data.error : "";

  const apiUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
    "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard";

  return (
    <div className="dashboardWrap">
      <HeroBanner apiUrl={apiUrl} />

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
        />
        <StatCard
          title="Saúde média"
          value={`${avgHealth}%`}
          footnote="Média consolidada"
        />
        <StatCard
          title="Páginas auditadas"
          value={String(totalPages)}
          footnote={`${totalOutdated} desatualizadas`}
        />
        <StatCard
          title="Críticas"
          value={String(totalCritical)}
          footnote="Itens com atenção imediata"
        />
      </section>

      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle">Saúde por rota</h2>
            <p className="sectionSubtitle">Resumo rápido das auditorias</p>
          </div>
        </div>

        <div className="routeHealthGrid">
          {routes.map((route) => (
            <RouteHealthCard key={route.key} route={route} />
          ))}
        </div>
      </section>

      <section className="sectionCard">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle">Visão detalhada</h2>
            <p className="sectionSubtitle">Cards usando os dados reais da API</p>
          </div>
        </div>

        <div className="routeDetailsGrid">
          {routes.map((route) => (
            <RouteDetailCard key={route.key} route={route} />
          ))}
        </div>
      </section>

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
          <UpcomingModuleCard
            title="Histórico"
            description="Linha do tempo das execuções, evolução da saúde documental e rastreabilidade das auditorias."
          />
          <UpcomingModuleCard
            title="Pendências"
            description="Visão consolidada das pendências por responsável, com foco em criticidade e priorização."
          />
          <UpcomingModuleCard
            title="Insights"
            description="Leitura executiva da operação com destaques, tendências e pontos de atenção automáticos."
          />
          <UpcomingModuleCard
            title="Configurações"
            description="Gestão de rotas monitoradas, preferências operacionais, parâmetros e acessos do produto."
          />
        </div>
      </section>
    </div>
  );
}