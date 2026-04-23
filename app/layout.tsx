import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Z-Radar",
  description: "Dashboard executivo de auditoria documental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="aurora-bg" />
        <div className="appShell">
          <Sidebar />
          <main className="appContent">
            <div className="contentInner">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
