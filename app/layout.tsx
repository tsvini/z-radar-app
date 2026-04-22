import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Z-Radar",
  description: "Auditoria e monitoramento inteligente da documentação",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}