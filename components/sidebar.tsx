"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  soon?: boolean;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Auditoria documental",
    href: "#",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm6 1.5V9h4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Histórico",
    href: "#",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M12 8v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pendências",
    href: "#",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M12 9v4M12 17h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.3 4.8 3.9 16a2 2 0 0 0 1.74 3h12.72A2 2 0 0 0 20.1 16L13.7 4.8a2 2 0 0 0-3.48 0Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Insights",
    href: "#",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M12 3a7 7 0 0 0-4 12.75c.6.42 1 .96 1.14 1.62L9.3 18h5.4l.16-.63c.14-.66.53-1.2 1.14-1.62A7 7 0 0 0 12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 21h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Configurações",
    href: "#",
    soon: true,
    icon: (
      <svg viewBox="0 0 24 24" className="navIconSvg" aria-hidden="true">
        <path d="M12 8.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 1 0 12 8.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.04.04a1.2 1.2 0 0 1 0 1.7l-1.2 1.2a1.2 1.2 0 0 1-1.7 0l-.04-.04a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.92V20a1.2 1.2 0 0 1-1.2 1.2h-1.7A1.2 1.2 0 0 1 11 20v-.06a1 1 0 0 0-.6-.92 1 1 0 0 0-1.1.2l-.04.04a1.2 1.2 0 0 1-1.7 0l-1.2-1.2a1.2 1.2 0 0 1 0-1.7l.04-.04a1 1 0 0 0 .2-1.1 1 1 0 0 0-.92-.6H4A1.2 1.2 0 0 1 2.8 13v-2A1.2 1.2 0 0 1 4 9.8h.06a1 1 0 0 0 .92-.6 1 1 0 0 0-.2-1.1l-.04-.04a1.2 1.2 0 0 1 0-1.7l1.2-1.2a1.2 1.2 0 0 1 1.7 0l.04.04a1 1 0 0 0 1.1.2H8.8A1 1 0 0 0 9.4 4.5V4A1.2 1.2 0 0 1 10.6 2.8h2.8A1.2 1.2 0 0 1 14.6 4v.06a1 1 0 0 0 .6.92 1 1 0 0 0 1.1-.2l.04-.04a1.2 1.2 0 0 1 1.7 0l1.2 1.2a1.2 1.2 0 0 1 0 1.7l-.04.04a1 1 0 0 0-.2 1.1v.02a1 1 0 0 0 .92.6H20A1.2 1.2 0 0 1 21.2 11v2A1.2 1.2 0 0 1 20 14.2h-.06a1 1 0 0 0-.54.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebarInner">
        <div className="sidebarTop">
          <button
            type="button"
            className="collapseButton"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label="Alternar menu lateral"
            title="Alternar menu lateral"
          >
            <span className={`collapseArrow ${collapsed ? "isCollapsed" : ""}`}>⌃</span>
          </button>

          <div className="brandBlock">
            <img src="/zradar-logo.png" alt="Z-Radar" className="brandIcon" />
            {!collapsed && (
              <div>
                <div className="brandTitle">Z-Radar</div>
                <div className="brandSubtitle">Plataforma operacional</div>
              </div>
            )}
          </div>
        </div>

        <div className="sidebarSectionLabel">{!collapsed ? "Navegação" : "Menu"}</div>

        <nav className="sidebarNav">
          {navItems.map((item) =>
            item.soon ? (
              <div
                key={item.label}
                className="navItem"
                title={collapsed ? `${item.label} · Em breve` : item.label}
              >
                <span className="navIcon">{item.icon}</span>

                {!collapsed && (
                  <>
                    <span className="navLabel">{item.label}</span>
                    <span className="soonBadge">Em breve</span>
                  </>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="navItem active"
                title={collapsed ? item.label : undefined}
              >
                <span className="navIcon">{item.icon}</span>
                {!collapsed && <span className="navLabel">{item.label}</span>}
              </Link>
            )
          )}
        </nav>

        {!collapsed && (
          <>
            <div className="sidebarMiniCard">
              <div className="miniCardKicker">Módulo ativo</div>
              <div className="miniCardTitle">Auditoria documental</div>
              <p className="miniCardText">
                O fluxo atual já está operacional e serve como base visual e técnica
                para os próximos módulos.
              </p>
            </div>

            <div className="sidebarMiniCard">
              <div className="miniCardKicker">Próximo passo</div>
              <div className="miniCardTitle">Integração completa</div>
              <p className="miniCardText">
                Histórico, IA, pendências e ações operacionais no mesmo layout.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}