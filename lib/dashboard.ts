export type DashboardRoute = {
  key: string;
  label: string;
  lastExecution: string;
  error: string;
  status_title: string;
  status_text: string;
  doc_title: string;
  total_pages: number;
  outdated_pages: number;
  critical_pages: number;
  health_percent: number;
  ownersPendingMessage: string;
  doc_link: string;
  pdf_link: string;
  ai_generation_url: string;
  captured_at: string;
};

export type DashboardResponse = {
  ok: boolean;
  productName: string;
  routes: DashboardRoute[];
  error?: string;
};

const FALLBACK_API_URL =
  "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard";

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

    const json = (await response.json()) as DashboardResponse;

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

    return {
      ok: Boolean(json?.ok),
      productName: json?.productName || "Z-Radar",
      routes: Array.isArray(json?.routes) ? json.routes : [],
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
      route.total_pages ||
      route.outdated_pages ||
      route.critical_pages ||
      route.health_percent
  );
}

export function getRouteTone(route: DashboardRoute): "success" | "warning" | "danger" | "neutral" {
  if (!hasRealSnapshot(route)) return "neutral";
  if (route.health_percent < 40) return "danger";
  if (route.health_percent < 75) return "warning";
  return "success";
}

export function getRouteBadge(route: DashboardRoute): string {
  if (!hasRealSnapshot(route)) return "Sem auditoria";
  if (route.health_percent < 40) return "Crítico";
  if (route.health_percent < 75) return "Atenção";
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