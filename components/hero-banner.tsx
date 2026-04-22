import Image from "next/image";

type HeroBannerProps = {
  apiUrl: string;
};

export function HeroBanner({ apiUrl }: HeroBannerProps) {
  return (
    <section className="heroCard">
      <div className="heroBadge">✦ Plataforma operacional</div>

      <div className="heroHeader">
        <div className="heroBrand">
          <Image
            src="/zradar-logo.png"
            alt="Z-Radar"
            width={420}
            height={140}
            className="heroLogo"
            priority
          />

          <div className="heroCopy">
            <p className="heroEyebrow">
              Painel central de auditoria e monitoramento documental
            </p>

            <p className="heroDescription">
              Auditoria e monitoramento inteligente da documentação, com visão
              consolidada das rotas, saúde geral, pendências por responsável e
              acesso rápido aos artefatos.
            </p>
          </div>
        </div>

        <div className="heroActions">
          <a
            className="ghostButton"
            href={apiUrl}
            target="_blank"
            rel="noreferrer"
          >
            Abrir API
          </a>
        </div>
      </div>
    </section>
  );
}