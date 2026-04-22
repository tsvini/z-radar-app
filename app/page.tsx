import { HeroBanner } from "@/components/hero-banner";
import { RouteDetailCard } from "@/components/route-detail-card";
import { RouteHealthCard } from "@/components/route-health-card";
import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/stat-card";
import { UpcomingModuleCard } from "@/components/upcoming-module-card";
import { getDashboardData } from "@/lib/dashboard";

const upcomingModules = [
  {
    title: "Histórico consolidado",
    description: "Linha do tempo completa das execuções, tendências e evolução da saúde documental.",
  },
  {
    title: "Pendências operacionais",
    description: "Gestão visual das pendências por responsável, com foco em criticidade e prioridade.",
  },
  {
    title: "Insights executivos",
    description: "Leitura gerencial da plataforma com indicadores, alertas e destaques automáticos.",
  },
  {
    title: "Configurações",
    description: "Gestão de rotas, parâmetros, responsáveis, integrações e comportamento do painel.",
  },
];

export default async function HomePage() {
  const data = await getDashboardData();

  const totalRoutes = data.routes.length;
  const totalPages = data.routes.reduce((acc, item) => acc + Number(item.total_pages || 0), 0);
  const totalOutdated = data.routes.reduce((acc, item) => acc + Number(item.outdated_pages || 0), 0);
  const totalCritical = data.routes.reduce((acc, item) => acc + Number(item.critical_pages || 0), 0);
  const avgHealth = totalRoutes
    ? Math.round(
        data.routes.reduce((acc, item) => acc + Number(item.health_percent || 0), 0) / totalRoutes
      )
    : 0;

  return (
    <main className="appShell">
      <div className="auroraBg" />

      <Sidebar />

      <section className="contentArea">
        <header className="topbar">
          <div className="topbarLeft">
            <span className="topbarTitle">Dashboard</span>
          </div>

          <div className="topbarRight">
            <button className="topbarButton muted">Perfil</button>
            <button className="topbarButton muted">Configurações</button>
            <button className="topbarButton danger">Sair</button>
          </div>
        </header>

        <HeroBanner apiUrl={process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "#"} />

        {!data.ok && (
          <div className="warningBanner">
            Não foi possível carregar os dados reais da API. {data.error}
          </div>
        )}

        <section className="statsGrid">
          <StatCard label="Rotas monitoradas" value={totalRoutes} helper="Dados reais do Worker" />
          <StatCard label="Saúde média" value={`${avgHealth}%`} helper="Média consolidada" />
          <StatCard label="Páginas auditadas" value={totalPages} helper={`${totalOutdated} desatualizadas`} />
          <StatCard label="Críticas" value={totalCritical} helper="Itens com atenção imediata" />
        </section>

        <section className="sectionCard compact">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Saúde por rota</h2>
              <p className="sectionSubtitle">Resumo rápido das auditorias</p>
            </div>
          </div>

          <div className="healthGrid">
            {data.routes.map((route) => (
              <RouteHealthCard key={route.key} route={route} />
            ))}
          </div>
        </section>

        <section className="sectionCard compact">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Visão detalhada</h2>
              <p className="sectionSubtitle">Cards usando os dados reais da API</p>
            </div>
          </div>

          <div className="detailGrid">
            {data.routes.map((route) => (
              <RouteDetailCard key={route.key} route={route} />
            ))}
          </div>
        </section>

        <section className="sectionCard compact">
          <div className="sectionHeader">
            <div>
              <h2 className="sectionTitle">Módulos complementares</h2>
              <p className="sectionSubtitle">Funcionalidades previstas para a evolução do painel</p>
            </div>
          </div>

          <div className="upcomingGrid">
            {upcomingModules.map((item) => (
              <UpcomingModuleCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <footer className="footer">
          Criado por Vinicius Torales de Souza
        </footer>
      </section>
    </main>
  );
}