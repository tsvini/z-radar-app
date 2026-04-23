"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { DashboardRoute } from "@/lib/dashboard";
import { hasRealSnapshot } from "@/lib/dashboard";
import { RouteDetailCard } from "@/components/route-detail-card";

type SortKey = "critical" | "outdated" | "health" | "name";

type RoutesExplorerProps = {
  routes: DashboardRoute[];
  rerunBaseUrl?: string;
  title: string;
  subtitle: string;
  primaryLabel?: string;
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function compareNumberDesc(a: number, b: number) {
  return b - a;
}

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "critical", label: "Prioridade (críticas)" },
  { value: "outdated", label: "Desatualizadas" },
  { value: "health", label: "Saúde" },
  { value: "name", label: "Nome" },
];

export function RoutesExplorer({
  routes,
  rerunBaseUrl,
  title,
  subtitle,
  primaryLabel,
}: RoutesExplorerProps) {
  const reactId = useId();
  const instanceId = reactId.replace(/:/g, "");
  const ownerDropdownId = `owner-dropdown-${instanceId}`;
  const ownerTriggerId = `owner-trigger-${instanceId}`;
  const ownerMenuId = `owner-menu-${instanceId}`;
  const ownerTriggerLabelId = `owner-trigger-label-${instanceId}`;
  const ownerFilterId = `owner-filter-${instanceId}`;

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("critical");
  const [onlyAudited, setOnlyAudited] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortWrapRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const base = onlyAudited ? routes.filter((route) => hasRealSnapshot(route)) : routes;

    const searched = q
      ? base.filter((route) => {
          const haystack = normalizeText(`${route.label} ${route.key}`);
          return haystack.includes(q);
        })
      : base;

    const sorted = [...searched].sort((a, b) => {
      const aCritical = Number(a.critical_pages || 0);
      const bCritical = Number(b.critical_pages || 0);
      const aOutdated = Number(a.outdated_pages || 0);
      const bOutdated = Number(b.outdated_pages || 0);
      const aHealth = Number(a.health_percent || 0);
      const bHealth = Number(b.health_percent || 0);

      if (sortKey === "critical") {
        const byCritical = compareNumberDesc(aCritical, bCritical);
        if (byCritical !== 0) return byCritical;
        const byOutdated = compareNumberDesc(aOutdated, bOutdated);
        if (byOutdated !== 0) return byOutdated;
        return compareNumberDesc(aHealth, bHealth);
      }

      if (sortKey === "outdated") {
        const byOutdated = compareNumberDesc(aOutdated, bOutdated);
        if (byOutdated !== 0) return byOutdated;
        return compareNumberDesc(aHealth, bHealth);
      }

      if (sortKey === "health") {
        const byHealth = compareNumberDesc(aHealth, bHealth);
        if (byHealth !== 0) return byHealth;
        return compareNumberDesc(aCritical, bCritical);
      }

      return String(a.label || "").localeCompare(String(b.label || ""), "pt-BR", {
        sensitivity: "base",
      });
    });

    return sorted;
  }, [onlyAudited, query, routes, sortKey]);

  const total = routes.length;
  const visible = filtered.length;

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortKey)?.label ||
    "Prioridade (críticas)";

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (!sortWrapRef.current) return;
      if (!sortWrapRef.current.contains(target)) setSortOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSortOpen(false);
    }

    if (sortOpen) {
      window.addEventListener("pointerdown", onPointerDown, { capture: true });
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sortOpen]);

  return (
    <section className="sectionCard">
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{title}</h2>
          <p className="sectionSubtitle">{subtitle}</p>
        </div>

        <div className="sectionTools">
          <label className="toggleChip">
            <input
              type="checkbox"
              checked={onlyAudited}
              onChange={(event) => setOnlyAudited(event.target.checked)}
            />
            <span>Somente auditadas</span>
          </label>

          <input
            className="searchInput"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar rota…"
            aria-label="Buscar rota"
          />

          <div className="owner-dropdown" id={ownerDropdownId} ref={sortWrapRef}>
            <button
              type="button"
              className={`owner-dropdown-trigger ${sortOpen ? "open" : ""}`}
              onClick={() => setSortOpen((value) => !value)}
              id={ownerTriggerId}
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              aria-label="Ordenar rotas"
            >
              <span className="owner-dropdown-trigger-label" id={ownerTriggerLabelId}>
                {sortLabel}
              </span>
              <span className="owner-dropdown-chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            <div
              className={`owner-dropdown-menu ${sortOpen ? "show" : ""}`}
              id={ownerMenuId}
              role="menu"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option.value === sortKey}
                  className={`owner-dropdown-item ${option.value === sortKey ? "active" : ""}`}
                  onClick={() => {
                    setSortKey(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <input type="hidden" id={ownerFilterId} value={sortKey} readOnly />
        </div>
      </div>

      <div className="sectionMeta">
        Exibindo <strong>{visible}</strong> de <strong>{total}</strong> rotas
      </div>

      {visible === 0 ? (
        <div className="emptyState">Nenhuma rota encontrada com os filtros atuais.</div>
      ) : (
        <div className="routeDetailsGrid">
          {filtered.map((route) => (
            <RouteDetailCard
              key={route.key}
              route={route}
              rerunBaseUrl={rerunBaseUrl}
              primaryLabel={primaryLabel}
            />
          ))}
        </div>
      )}
    </section>
  );
}

