import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Z-Radar",
  description: "Auditoria e monitoramento inteligente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="aurora-bg" />
        <div className="appShell">
          <Sidebar />
          <main className="appContent">{children}</main>
        </div>
      </body>
    </html>
  );
}