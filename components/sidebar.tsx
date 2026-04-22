"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/", active: true, soon: false },
  { label: "Auditoria documental", href: "#", active: false, soon: true },
  { label: "Histórico", href: "#historico", active: false, soon: true },
  { label: "Pendências", href: "#pendencias", active: false, soon: true },
  { label: "Insights", href: "#insights", active: false, soon: true },
  { label: "Configurações", href: "#configuracoes", active: false, soon: true },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebarTop">
        <button
          type="button"
          className="iconButton"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label="Alternar menu"
        >
          ☰
        </button>

        <div className="brandBlock">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663074205059/YYysBrVmJpSmKDAW.png"
            alt="Z-Radar"
            className="brandIcon"
          />
          {!collapsed && (
            <div>
              <div className="brandTitle">Z-Radar</div>
              <div className="brandSubtitle">Plataforma operacional</div>
            </div>
          )}
        </div>
      </div>

      {!collapsed && (
        <>
          <div className="sidebarSectionLabel">Navegação</div>

          <nav className="sidebarNav">
            {navItems.map((item) =>
              item.soon ? (
                <div key={item.label} className="navItem muted">
                  <span>{item.label}</span>
                  <span className="soonBadge">Em breve</span>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="navItem active">
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>

          <div className="sidebarMiniCard">
            <div className="miniCardKicker">Módulo ativo</div>
            <div className="miniCardTitle">Auditoria documental</div>
            <p className="miniCardText">
              O fluxo atual já está operacional e serve como base para os próximos módulos.
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
    </aside>
  );
}