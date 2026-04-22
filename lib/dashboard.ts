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
};

function toNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function getHealthTone(percent: number): "success" | "warning" | "danger" {
  if (percent >= 75) return "success";
  if (percent >= 40) return "warning";
  return "danger";
}

export function getHealthLabel(percent: number): string {
  const tone = getHealthTone(percent);
  if (tone === "success") return "Saudável";
  if (tone === "warning") return "Alerta";
  return "Crítico";
}

export function formatCapturedAt(value?: string): string {
  if (!value) return "Sem atualização";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem atualização";

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

export async function getDashboardData(): Promise<DashboardResponse> {
  const apiUrl = process.env.DASHBOARD_API_URL || "https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard";
  const apiToken = process.env.DASHBOARD_API_TOKEN || "";

  if (!apiToken) {
    throw new Error("Defina DASHBOARD_API_TOKEN no .env.local");
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const rawText = await response.text();

  let data: DashboardResponse | null = null;
  try {
    data = JSON.parse(rawText) as DashboardResponse;
  } catch {
    throw new Error("A API do dashboard retornou um JSON inválido.");
  }

  if (!response.ok || !data?.ok) {
    throw new Error((data as any)?.error || `Falha ao consultar dashboard (${response.status}).`);
  }

  return {
    ok: true,
    productName: data.productName || "Z-Radar",
    routes: Array.isArray(data.routes)
      ? data.routes.map((route) => ({
          key: String(route.key || ""),
          label: String(route.label || ""),
          lastExecution: String(route.lastExecution || ""),
          error: String(route.error || ""),
          status_title: String(route.status_title || ""),
          status_text: String(route.status_text || ""),
          doc_title: String(route.doc_title || ""),
          total_pages: toNumber(route.total_pages),
          outdated_pages: toNumber(route.outdated_pages),
          critical_pages: toNumber(route.critical_pages),
          health_percent: toNumber(route.health_percent),
          ownersPendingMessage: String(route.ownersPendingMessage || ""),
          doc_link: String(route.doc_link || ""),
          pdf_link: String(route.pdf_link || ""),
          ai_generation_url: String(route.ai_generation_url || ""),
          captured_at: String(route.captured_at || ""),
        }))
      : [],
  };
}