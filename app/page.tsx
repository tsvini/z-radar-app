import { HeroBanner } from "@/components/hero-banner";
import { RouteDetailCard } from "@/components/route-detail-card";
import { RouteHealthCard } from "@/components/route-health-card";
import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/stat-card";
import { UpcomingModuleCard } from "@/components/upcoming-module-card";
import { getDashboardData, sumBy } from "@/lib/dashboard";

const upcomingModules = [
  {
    title: "Análise com IA",
    description:
      "Geração de resumos executivos, diagnósticos e recomendações a partir dos resultados da auditoria.",
  },
  {
    title: "Histórico de execuções",
    description:
      "Visualização consolidada das execuções anteriores, evolução dos indicadores e rastreabilidade.",
  },
  {
    title: "Pendências por responsável",
    description:
      "Distribuição das pendências identificadas por responsável, com foco em criticidade e priorização.",
  },
  {
    title: "Alertas automáticos",
    description:
      "Notificações inteligentes para alterações críticas, degradação da saúde documental e necessidade de ação.",
  },
  {
    title: "Insights executivos",
    description:
      "Visão gerencial com leitura consolidada da saúde documental, tendências e pontos de atenção.",
  },
  {
    title: "Configurações de rotas",
    description:
      "Gestão de projetos, rotas monitoradas, responsáveis e parâmetros operacionais do Z-Radar.",
  },
];

export default async function HomePage() {
  const data = await getDashboardData();

  const totalRoutes = data.routes.length;
  const totalPages = sumBy(data.routes, "total_pages");
  const totalCritical = sumBy(data.routes, "critical_pages");
  const totalOutdated = sumBy(data.routes, "outdated_pages");
  const avgHealth = totalRoutes
    ? Math.round(sumBy(data.routes, "health_percent") / totalRoutes)
    : 0;

  return (
    <main className="appShell">
      <div className="auroraBg" />
      <Sidebar />

      <section className="pageContent">
        <div className="dashboardWrap">
          <HeroBanner productName={data.productName || "Z-Radar"} />

          {!data.ok ? (
            <div className="emptyState">
              Não foi possível carregar os dados reais da API. {data.error || ""}
            </div>
          ) : null}

          <div className="statsGrid">
            <StatCard
              label="Rotas monitoradas"
              value={totalRoutes}
              helper="Dados reais do Worker"
            />
            <StatCard
              label="Saúde média"
              value={`${avgHealth}%`}
              helper="Média consolidada"
            />
            <StatCard
              label="Páginas auditadas"
              value={totalPages}
              helper={`${totalOutdated} desatualizadas`}
            />
            <StatCard
              label="Críticas"
              value={totalCritical}
              helper="Itens com atenção imediata"
            />
          </div>

          <section className="sectionCard">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Saúde por rota</h2>
                <p className="sectionSubtitle">Resumo rápido das auditorias</p>
              </div>
            </div>

            <div className="routeHealthGrid">
              {data.routes.map((route) => (
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

            <div className="detailGridWrap">
              {data.routes.map((route) => (
                <RouteDetailCard key={route.key} route={route} />
              ))}
            </div>
          </section>

          <section className="sectionCard">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Próximos módulos</h2>
                <p className="sectionSubtitle">
                  Estrutura preparada para crescimento do produto
                </p>
              </div>
            </div>

            <div className="upcomingGrid">
              {upcomingModules.map((module) => (
                <UpcomingModuleCard
                  key={module.title}
                  title={module.title}
                  description={module.description}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}