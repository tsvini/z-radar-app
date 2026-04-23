export type DashboardRoute = {
  key: string;
  label: string;
  lastExecution?: string;
  error?: string;
  status_title?: string;
  status_text?: string;
  doc_title?: string;
  total_pages?: number;
  outdated_pages?: number;
  critical_pages?: number;
  health_percent?: number;
  ownersPendingMessage?: string;
  doc_link?: string;
  pdf_link?: string;
  ai_generation_url?: string;
  captured_at?: string;
};

export type DashboardResponse = {
  ok: boolean;
  productName: string;
  routes: DashboardRoute[];
  error?: string;
};

const FALLBACK_API_URL =
  "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard";

function toStringOrEmpty(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toNumberOrZero(value: unknown) {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : 0;
}

function normalizeRoute(value: unknown): DashboardRoute | null {
  if (!value || typeof value !== "object") return null;
  const route = value as Record<string, unknown>;

  const key = toStringOrEmpty(route.key).trim();
  if (!key) return null;

  const labelRaw = toStringOrEmpty(route.label).trim();
  const label = labelRaw || key;

  return {
    key,
    label,
    lastExecution: toStringOrEmpty(route.lastExecution),
    error: toStringOrEmpty(route.error),
    status_title: toStringOrEmpty(route.status_title),
    status_text: toStringOrEmpty(route.status_text),
    doc_title: toStringOrEmpty(route.doc_title),
    total_pages: toNumberOrZero(route.total_pages),
    outdated_pages: toNumberOrZero(route.outdated_pages),
    critical_pages: toNumberOrZero(route.critical_pages),
    health_percent: toNumberOrZero(route.health_percent),
    ownersPendingMessage: toStringOrEmpty(route.ownersPendingMessage),
    doc_link: toStringOrEmpty(route.doc_link),
    pdf_link: toStringOrEmpty(route.pdf_link),
    ai_generation_url: toStringOrEmpty(route.ai_generation_url),
    captured_at: toStringOrEmpty(route.captured_at),
  };
}

export async function getDashboardData(): Promise<DashboardResponse> {
  const apiUrl =
    process.env.DASHBOARD_API_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
    FALLBACK_API_URL;

  const token =
    process.env.DASHBOARD_API_TOKEN ||
    process.env.WORKER_DASHBOARD_TOKEN ||
    "";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });

    const json = (await response.json().catch(() => null)) as DashboardResponse | null;

    if (!response.ok) {
      return {
        ok: false,
        productName: "Z-Radar",
        routes: [],
        error:
          typeof json?.error === "string" && json.error.trim()
            ? json.error
            : `Falha ao consultar a API (${response.status}).`,
      };
    }

    const normalizedRoutes = Array.isArray(json?.routes)
      ? json.routes.map(normalizeRoute).filter(Boolean)
      : [];

    return {
      ok: Boolean(json?.ok),
      productName: json?.productName || "Z-Radar",
      routes: normalizedRoutes as DashboardRoute[],
      error: json?.error || "",
    };
  } catch (error) {
    return {
      ok: false,
      productName: "Z-Radar",
      routes: [],
      error: error instanceof Error ? error.message : "Erro inesperado ao carregar dados.",
    };
  }
}

export function hasRealSnapshot(route: DashboardRoute): boolean {
  return Boolean(
    route.captured_at ||
      route.status_title ||
      route.status_text ||
      route.doc_title ||
      Number(route.total_pages || 0) ||
      Number(route.outdated_pages || 0) ||
      Number(route.critical_pages || 0) ||
      Number(route.health_percent || 0)
  );
}

export function getRouteTone(route: DashboardRoute): "success" | "warning" | "danger" | "neutral" {
  if (!hasRealSnapshot(route)) return "neutral";
  const health = Number(route.health_percent || 0);
  if (health < 40) return "danger";
  if (health < 75) return "warning";
  return "success";
}

export function getRouteBadge(route: DashboardRoute): string {
  if (!hasRealSnapshot(route)) return "Sem auditoria";
  const health = Number(route.health_percent || 0);
  if (health < 40) return "Crítico";
  if (health < 75) return "Atenção";
  return "Saudável";
}

export function formatBrazilDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  return date
    .toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " às");
}
