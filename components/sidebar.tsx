"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon:
    | "dashboard"
    | "document"
    | "history"
    | "warning"
    | "insight"
    | "settings"
    | "profile"
    | "logout";
  soon?: boolean;
};

const mainItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Auditoria documental", href: "#", icon: "document", soon: true },
  { label: "Histórico", href: "/historico", icon: "history" },
  { label: "Pendências", href: "#", icon: "warning", soon: true },
  { label: "Insights", href: "#", icon: "insight", soon: true },
];

const bottomItems: NavItem[] = [
  { label: "Perfil", href: "#", icon: "profile" },
  { label: "Configurações", href: "#", icon: "settings" },
  { label: "Sair", href: "#", icon: "logout" },
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
          <path d="M12 2v10" />
          <path d="M6.3 4.9a9 9 0 1 0 11.4 0" />
        </svg>
      );
    default:
      return null;
  }
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function SidebarButton({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const content = (
    <>
      <span className="sidebarItemIcon">
        <SidebarIcon name={item.icon} />
      </span>

      <span className="sidebarItemLabel">{item.label}</span>

      {item.soon && <span className="soonBadge">Em breve</span>}
    </>
  );

  const isDisabled = item.href === "#" || Boolean(item.soon);

  if (isDisabled) {
    return (
      <button
        type="button"
        className={`sidebarItem disabled ${active ? "active" : ""}`}
        data-tooltip={item.label}
        aria-label={item.label}
        aria-disabled="true"
        tabIndex={-1}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      className={`sidebarItem ${active ? "active" : ""}`}
      data-tooltip={item.label}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </Link>
  );
}

function isActivePath(pathname: string, href: string) {
  if (!href || href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname() || "/";

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
          <span className="sidebarToggleIcon">
            <ChevronIcon />
          </span>
        </button>

        <div className="sidebarHeader">
          <div className="sidebarBrand">
            <div className="sidebarLogoWrap">
              <Image
                src="/z-sidebar-icon.png"
                alt="Z"
                width={44}
                height={44}
                className="sidebarLogo"
              />
            </div>

            <div className="sidebarBrandText">
              <strong>Z-Radar</strong>
              <span>Plataforma operacional</span>
            </div>
          </div>
        </div>

      </div>

      <div className="sidebarCenter">
        <nav className="sidebarNav">
          {mainItems.map((item) => (
            <SidebarButton
              key={item.label}
              item={item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>
      </div>

      <div className="sidebarBottom">
        <nav className="sidebarSystemNav">
          {bottomItems.map((item) => (
            <SidebarButton
              key={item.label}
              item={item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
