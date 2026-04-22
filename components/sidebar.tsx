"use client";

import { useState } from "react";

type NavItem = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  soon?: boolean;
};

const primaryItems: NavItem[] = [
  { icon: "▦", label: "Dashboard", href: "#", active: true },
  { icon: "◫", label: "Auditoria documental", href: "#", soon: true },
  { icon: "↺", label: "Histórico", href: "#", soon: true },
  { icon: "△", label: "Pendências", href: "#", soon: true },
  { icon: "◌", label: "Insights", href: "#", soon: true },
];

const secondaryItems: NavItem[] = [
  { icon: "◉", label: "Perfil", href: "#", soon: true },
  { icon: "⚙", label: "Configurações", href: "#", soon: true },
  { icon: "⎋", label: "Sair", href: "#", soon: true },
];

function SidebarItem({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  return (
    <a
      href={item.href}
      className={`sidebarItem ${item.active ? "active" : ""} ${
        collapsed ? "isCollapsed" : ""
      }`}
      title={collapsed ? item.label : undefined}
    >
      <span className="sidebarItemIcon">{item.icon}</span>

      {!collapsed && (
        <>
          <span className="sidebarItemLabel">{item.label}</span>
          {item.soon ? <span className="soonBadge">Em breve</span> : <span />}
        </>
      )}
    </a>
  );
}

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

        <div className={`sidebarBrand ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebarLogoWrap">
            <img src="/zallpy.png" alt="Z-Radar" className="sidebarLogo" />
          </div>

          {!collapsed && (
            <div className="sidebarBrandText">
              <strong>Z-Radar</strong>
              <span>Plataforma operacional</span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebarMain">
        {!collapsed && <div className="sidebarTitle">Navegação</div>}

        <nav className="sidebarNav">
          {primaryItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      <div className="sidebarBottom">
        {!collapsed && (
          <>
            <div className="sidebarInfoCard">
              <span className="sidebarInfoKicker">Módulo ativo</span>
              <strong>Auditoria documental</strong>
              <p>
                Fluxo principal já operacional, com visão consolidada da saúde
                documental.
              </p>
            </div>

            <div className="sidebarInfoCard">
              <span className="sidebarInfoKicker">Próximo passo</span>
              <strong>Integração completa</strong>
              <p>
                Histórico, pendências, insights e ações executivas no mesmo
                painel.
              </p>
            </div>
          </>
        )}

        <div className="sidebarSystemNav">
          {secondaryItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}