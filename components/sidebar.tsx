"use client";

import { useState } from "react";

const items = [
  { icon: "▦", label: "Dashboard", soon: false },
  { icon: "◫", label: "Auditoria documental", soon: true },
  { icon: "↺", label: "Histórico", soon: true },
  { icon: "△", label: "Pendências", soon: true },
  { icon: "◌", label: "Insights", soon: true },
  { icon: "⚙", label: "Configurações", soon: true },
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
          {collapsed ? "→" : "←"}
        </button>

        <div className="sidebarBrand">
          <div className="sidebarLogoWrap">
            <img src="/zradar-logo.png" alt="Z-Radar" className="sidebarLogo" />
          </div>

          {!collapsed ? (
            <div className="sidebarBrandText">
              <strong>Z-Radar</strong>
              <span>Plataforma operacional</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="sidebarSection">
        {!collapsed ? <div className="sidebarTitle">Navegação</div> : null}

        <nav className="sidebarNav">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`sidebarItem ${index === 0 ? "active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebarItemIcon">{item.icon}</span>

              {!collapsed ? (
                <>
                  <span className="sidebarItemLabel">{item.label}</span>
                  {item.soon ? <span className="soonBadge">Em breve</span> : null}
                </>
              ) : null}
            </button>
          ))}
        </nav>
      </div>

      {!collapsed ? (
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
      ) : null}
    </aside>
  );
}