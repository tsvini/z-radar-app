export type RouteItem = {
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
  routes: RouteItem[];
  error?: string;
};

export async function getDashboardData(): Promise<DashboardResponse> {
  const url = process.env.WORKER_DASHBOARD_URL;
  const token = process.env.WORKER_DASHBOARD_TOKEN;

  if (!url) {
    throw new Error("WORKER_DASHBOARD_URL não configurado.");
  }

  if (!token) {
    throw new Error("WORKER_DASHBOARD_TOKEN não configurado.");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const json = (await response.json()) as DashboardResponse;

  if (!response.ok || !json.ok) {
    throw new Error(json?.error || "Falha ao carregar dashboard.");
  }

  return json;
}

export function getHealthLabel(percent: number) {
  if (percent < 40) return "Crítico";
  if (percent < 75) return "Alerta";
  return "Saudável";
}

export function getHealthTone(percent: number) {
  if (percent < 40) return "danger";
  if (percent < 75) return "warning";
  return "success";
}