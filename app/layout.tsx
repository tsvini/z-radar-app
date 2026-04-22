import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Z-Radar",
  description: "Auditoria e monitoramento inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="auroraBg" />
        <div className="appShell">
          <Sidebar />

          <div className="mainArea">
            <header className="topbar">
              <div className="topbarLeft">
                <span className="topbarTitle">Dashboard</span>
              </div>

              <div className="topbarRight">
                <button
                  type="button"
                  className="topbarButton muted iconOnly"
                  aria-label="Perfil"
                  title="Perfil"
                >
                  ◉
                </button>

                <button type="button" className="topbarButton muted">
                  Config
                </button>

                <button type="button" className="topbarButton danger">
                  Sair
                </button>
              </div>
            </header>

            <main className="pageContent">{children}</main>

            <footer className="footerBar">
              <span>Criado por Vinicius Torales de Souza</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}