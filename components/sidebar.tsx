import Link from "next/link";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Auditoria documental", href: "/" },
  { label: "Histórico", href: "/historico/edutech" },
  { label: "Pendências", href: "#" },
  { label: "Insights", href: "#" },
  { label: "Configurações", href: "#" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarBrand">
        <div className="sidebarLogoWrap">
          <div className="sidebarLogo">Z</div>
        </div>

        <div>
          <div className="sidebarBrandTitle">Z-Radar</div>
          <div className="sidebarBrandText">Plataforma operacional</div>
        </div>
      </div>

      <div className="sidebarSectionTitle">Navegação</div>

      <nav className="sidebarNav">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="sidebarLink">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebarFooter">
        <div className="sidebarMiniCard">
          <div className="sidebarMiniLabel">Módulo ativo</div>
          <div className="sidebarMiniTitle">Auditoria documental</div>
          <p className="sidebarMiniText">
            O fluxo atual já está operacional e serve como base visual e técnica
            para os próximos módulos.
          </p>
        </div>

        <div className="sidebarMiniCard">
          <div className="sidebarMiniLabel">Próximo passo</div>
          <div className="sidebarMiniTitle">Integração completa</div>
          <p className="sidebarMiniText">
            Integrar os cards reais, histórico, IA e ações operacionais no
            mesmo layout.
          </p>
        </div>
      </div>
    </aside>
  );
}