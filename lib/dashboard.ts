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

export async function getDashboardData(): Promise<DashboardResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
  const apiToken = process.env.DASHBOARD_API_TOKEN;

  if (!apiUrl) {
    return {
      ok: false,
      productName: "Z-Radar",
      routes: [],
      error: "NEXT_PUBLIC_DASHBOARD_API_URL não configurada.",
    };
  }

  if (!apiToken) {
    return {
      ok: false,
      productName: "Z-Radar",
      routes: [],
      error: "DASHBOARD_API_TOKEN não configurado.",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = (await response.json()) as DashboardResponse;

    if (!response.ok) {
      return {
        ok: false,
        productName: "Z-Radar",
        routes: [],
        error: data?.error || `Erro HTTP ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    return {
      ok: false,
      productName: "Z-Radar",
      routes: [],
      error: error instanceof Error ? error.message : "Erro ao buscar dashboard.",
    };
  }
}