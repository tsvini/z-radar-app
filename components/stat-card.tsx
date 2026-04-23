type StatCardProps = {
  title: string;
  value: string;
  footnote: string;
  icon?: "routes" | "health" | "pages" | "critical";
  tone?: "success" | "warning" | "danger" | "neutral";
};

function StatIcon({ name }: { name: NonNullable<StatCardProps["icon"]> }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "routes":
      return (
        <svg {...common}>
          <path d="M4 6h10" />
          <path d="M4 12h16" />
          <path d="M4 18h13" />
          <path d="M18 5l2 1-2 1" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M12 21s-6-4.3-8.5-8.2C1.2 9.3 3.2 6 7 6c2 0 3.4 1 5 3 1.6-2 3-3 5-3 3.8 0 5.8 3.3 3.5 6.8C18 16.7 12 21 12 21z" />
        </svg>
      );
    case "pages":
      return (
        <svg {...common}>
          <path d="M8 3h8l5 5v13H8z" />
          <path d="M16 3v5h5" />
          <path d="M11 12h6" />
          <path d="M11 16h6" />
        </svg>
      );
    case "critical":
      return (
        <svg {...common}>
          <path d="M12 3l9 16H3z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    default:
      return null;
  }
}

export function StatCard({ title, value, footnote, icon, tone = "neutral" }: StatCardProps) {
  return (
    <article className={`statCard ${tone}`}>
      <div className="statTop">
        {icon ? (
          <div className={`statIconWrap ${tone}`} aria-hidden="true">
            <StatIcon name={icon} />
          </div>
        ) : null}

        <div className="statText">
          <div className="statLabel">{title}</div>
          <div className="statValue">{value}</div>
        </div>
      </div>

      <div className="statFootnote">{footnote}</div>
    </article>
  );
}
