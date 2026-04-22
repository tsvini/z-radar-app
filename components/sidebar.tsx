"use client";

import { useState } from "react";

const navItems = [
  { icon: "▦", label: "Dashboard", href: "#", active: true, soon: false },
  { icon: "◫", label: "Auditoria documental", href: "#", active: false, soon: true },
  { icon: "↺", label: "Histórico", href: "#", active: false, soon: true },
  { icon: "△", label: "Pendências", href: "#", active: false, soon: true },
  { icon: "◌", label: "Insights", href: "#", active: false, soon: true },
  { icon: "⚙", label: "Configurações", href: "#", active: false, soon: true },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebarTop">
        <button
          type="button"
          className="sidebarToggle"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          <span className="sidebarToggleIcon">{collapsed ? "›" : "‹"}</span>
        </button>

        <div className="sidebarBrand">
          <div className="sidebarLogoWrap">
            <img src="/zradar-logo.png" alt="Z-Radar" className="sidebarLogo" />
          </div>

          {!collapsed && (
            <div className="sidebarBrandText">
              <strong>Z-Radar</strong>
              <span>Plataforma operacional</span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebarSection">
        {!collapsed && <div className="sidebarTitle">Navegação</div>}

        <nav className="sidebarNav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`sidebarItem ${item.active ? "active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebarItemIcon">{item.icon}</span>

              {!collapsed && (
                <>
                  <span className="sidebarItemLabel">{item.label}</span>
                  {item.soon && <span className="soonBadge">Em breve</span>}
                </>
              )}
            </a>
          ))}
        </nav>
      </div>

      {!collapsed && (
        <>
          <div className="sidebarInfoCard">
            <span className="sidebarInfoKicker">Módulo ativo</span>
            <strong>Auditoria documental</strong>
            <p>
              O fluxo atual já está operacional e serve como base visual e técnica
              para os próximos módulos.
            </p>
          </div>

          <div className="sidebarInfoCard">
            <span className="sidebarInfoKicker">Próximo passo</span>
            <strong>Integração completa</strong>
            <p>
              Histórico, IA, pendências e ações operacionais no mesmo layout.
            </p>
          </div>
        </>
      )}
    </aside>
  );
}