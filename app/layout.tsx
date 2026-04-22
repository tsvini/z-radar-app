import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Z-Radar",
  description: "Auditoria e monitoramento inteligente da documentação",
  icons: {
    icon: "/favicon.ico",
  },
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
        <div className="appShell">{children}</div>
      </body>
    </html>
  );
}