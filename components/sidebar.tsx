"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "document" | "history" | "warning" | "insight" | "settings" | "profile" | "logout";
  soon?: boolean;
  active?: boolean;
};

const mainItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard", active: true },
  { label: "Auditoria documental", href: "#", icon: "document", soon: true },
  { label: "Histórico", href: "#", icon: "history", soon: true },
  { label: "Pendências", href: "#", icon: "warning", soon: true },
  { label: "Insights", href: "#", icon: "insight", soon: true },
];

const bottomItems: NavItem[] = [
  { label: "Perfil", href: "#", icon: "profile", soon: true },
  { label: "Configurações", href: "#", icon: "settings", soon: true },
  { label: "Sair", href: "#", icon: "logout", soon: true },
];

function SidebarIcon({ name }: { name: NavItem["icon"] }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M8 3h6l5 5v13H8z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M12 3l9 16H3z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "insight":
      return (
        <svg {...common}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.8c.6.4 1 1.1 1.2 1.9h5.6c.2-.8.6-1.5 1.2-1.9A7 7 0 0 0 12 2z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M15 17l5-5-5-5" />
          <path d="M20 12H9" />
          <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" />
        </svg>
      );
    default:
      return null;
  }
}

function SidebarButton({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const content = (
    <>
      <span className="sidebarItemIcon">
        <SidebarIcon name={item.icon} />
      </span>

      {!collapsed && <span className="sidebarItemLabel">{item.label}</span>}

      {!collapsed && item.soon && <span className="soonBadge">Em breve</span>}
    </>
  );

  if (item.href === "#") {
    return (
      <button
        type="button"
        className={`sidebarItem ${item.active ? "active" : ""} ${
          collapsed ? "isCollapsed" : ""
        }`}
        title={collapsed ? item.label : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      className={`sidebarItem ${item.active ? "active" : ""} ${
        collapsed ? "isCollapsed" : ""
      }`}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </Link>
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
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          <span className="sidebarToggleIcon">{collapsed ? "›" : "‹"}</span>
        </button>

        <div className={`sidebarBrand ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebarLogoWrap">
            <Image
              src="/z-sidebar-icon.png"
              alt="Z"
              width={44}
              height={44}
              className="sidebarLogo"
            />
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
          {mainItems.map((item) => (
            <SidebarButton
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
              <p>Fluxo principal já operacional, com visão consolidada da saúde documental.</p>
            </div>

            <div className="sidebarInfoCard">
              <span className="sidebarInfoKicker">Próximo passo</span>
              <strong>Integração completa</strong>
              <p>Histórico, pendências, insights e ações executivas no mesmo painel.</p>
            </div>
          </>
        )}

        <nav className="sidebarSystemNav">
          {bottomItems.map((item) => (
            <SidebarButton
              key={item.label}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}