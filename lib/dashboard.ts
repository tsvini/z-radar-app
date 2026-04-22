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
  error?: string;
  productName: string;
  routes: DashboardRoute[];
};

export async function getDashboardData(): Promise<DashboardResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
  const token = process.env.DASHBOARD_API_TOKEN;

  if (!apiUrl) {
    return {
      ok: false,
      error: "NEXT_PUBLIC_DASHBOARD_API_URL não configurada.",
      productName: "Z-Radar",
      routes: [],
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error || `Erro ${response.status}`,
        productName: "Z-Radar",
        routes: [],
      };
    }

    return {
      ok: true,
      productName: data.productName || "Z-Radar",
      routes: Array.isArray(data.routes) ? data.routes : [],
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Falha ao buscar dados da API.",
      productName: "Z-Radar",
      routes: [],
    };
  }
}

export function hasAuditData(route: DashboardRoute) {
  return (
    Number(route.total_pages || 0) > 0 ||
    Number(route.outdated_pages || 0) > 0 ||
    Number(route.critical_pages || 0) > 0 ||
    Number(route.health_percent || 0) > 0 ||
    Boolean(route.status_title) ||
    Boolean(route.status_text) ||
    Boolean(route.doc_title) ||
    Boolean(route.captured_at)
  );
}

export function getHealthTone(percent: number, route?: DashboardRoute) {
  if (route && !hasAuditData(route)) return "neutral";
  if (percent < 40) return "danger";
  if (percent < 75) return "warning";
  return "success";
}

export function getHealthLabel(percent: number, route?: DashboardRoute) {
  if (route && !hasAuditData(route)) return "Sem auditoria";
  if (percent < 40) return "Crítico";
  if (percent < 75) return "Atenção";
  return "Saudável";
}

export function getRerunUrl(routeKey: string) {
  return `https://wandering-disk-47a9.tsvini111.workers.dev/?routeKey=${encodeURIComponent(routeKey)}`;
}