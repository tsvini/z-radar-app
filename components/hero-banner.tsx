type HeroBannerProps = {
  productName: string;
};

export function HeroBanner({ productName }: HeroBannerProps) {
  return (
    <section className="heroCard">
      <div className="heroBadge">✦ Z-Radar Platform</div>

      <div className="heroTop">
        <div className="heroLeft">
          <div className="heroLogoBox">
            <div className="heroLogo">Z</div>
          </div>

          <div className="heroTextWrap">
            <div className="heroOverline">Painel central de auditoria e monitoramento documental</div>
            <h1 className="heroTitle visuallyTighter">{productName}</h1>
            <p className="heroText">
              Auditoria e monitoramento inteligente da documentação, com visão
              consolidada das rotas, saúde geral, pendências por responsável e
              acesso rápido aos artefatos.
            </p>
          </div>
        </div>

        <div className="heroActions">
          <a
            className="btn btnGhost"
            href="https://wandering-disk-47a9.tsvini111.workers.dev/api/dashboard"
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