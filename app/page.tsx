import { HeroBanner } from "@/components/hero-banner";
import { RouteDetailCard } from "@/components/route-detail-card";
import { StatCard } from "@/components/stat-card";
import { UpcomingModuleCard } from "@/components/upcoming-module-card";
import { getDashboardData, type DashboardRoute } from "@/lib/dashboard";

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

  const errorMessage =
    typeof data?.error === "string" && data.error.trim() ? data.error : "";

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
      <HeroBanner />

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
            <h2 className="sectionTitle">Visão detalhada</h2>
            <p className="sectionSubtitle">
              Consolidado executivo das rotas auditadas
            </p>
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