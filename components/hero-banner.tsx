import Image from "next/image";
import Link from "next/link";

type HeroBannerProps = {
  lastUpdatedLabel?: string;
  lastUpdatedValue?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function HeroBanner({
  lastUpdatedLabel = "Última atualização",
  lastUpdatedValue = "Sem registro",
  primaryHref = "/historico",
  primaryLabel = "Abrir histórico",
  secondaryHref,
  secondaryLabel,
}: HeroBannerProps) {
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
              Governança e qualidade documental
            </p>
            <h1 className="heroTitle">Visão executiva das métricas</h1>
            <p className="heroDescription">
              Acompanhe indicadores por rota, saúde geral, criticidade e pendências por responsável, com rastreabilidade para apoiar decisões e priorização dos times.
            </p>
          </div>
        </div>

        <div className="heroRight">
          <div className="heroMetaCard">
            <div className="heroMetaLabel">{lastUpdatedLabel}</div>
            <div className="heroMetaValue">{lastUpdatedValue}</div>
          </div>

          <div className="heroActions">
            <Link className="secondaryButton primary" href={primaryHref}>
              {primaryLabel}
            </Link>

            {secondaryHref && secondaryLabel ? (
              <a className="secondaryButton" href={secondaryHref} target="_blank" rel="noreferrer">
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
