import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="heroCard">
      <div className="heroBadge">Plataforma operacional</div>

      <div className="heroHeader">
        <div className="heroBrand">
          <Image
            src="/zradar-logo.png"
            alt="Z-Radar"
            width={260}
            height={90}
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
              acompanhamento executivo dos artefatos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}