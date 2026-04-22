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

const API_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_API_URL ||
  "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard";

const API_TOKEN = process.env.DASHBOARD_API_TOKEN || "";

export async function getDashboardData(): Promise<DashboardResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: API_TOKEN
        ? {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          },
      cache: "no-store",
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      return {
        ok: false,
        productName: "Z-Radar",
        routes: [],
        error: data?.error || `Erro HTTP ${response.status}`,
      };
    }

    return {
      ok: Boolean(data?.ok),
      productName: data?.productName || "Z-Radar",
      routes: Array.isArray(data?.routes) ? data.routes : [],
      error: data?.error,
    };
  } catch (error) {
    return {
      ok: false,
      productName: "Z-Radar",
      routes: [],
      error: error instanceof Error ? error.message : "Erro ao consultar API",
    };
  }
}

export function getHealthTone(percent: number) {
  if (percent < 40) return "danger";
  if (percent < 75) return "warning";
  return "success";
}

export function getHealthLabel(percent: number) {
  if (percent < 40) return "Crítico";
  if (percent < 75) return "Atenção";
  return "Saudável";
}

export function formatOwnersMessage(message?: string) {
  if (!message) return [];

  return message
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function sumBy(
  routes: DashboardRoute[],
  field: keyof Pick<
    DashboardRoute,
    "total_pages" | "outdated_pages" | "critical_pages" | "health_percent"
  >
) {
  return routes.reduce((acc, item) => acc + Number(item[field] || 0), 0);
}