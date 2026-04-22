type StatCardProps = {
  title: string;
  value: string;
  footnote: string;
};

export function StatCard({ title, value, footnote }: StatCardProps) {
  return (
    <article className="statCard">
      <span className="statLabel">{title}</span>
      <strong className="statValue">{value}</strong>
      <span className="statFootnote">{footnote}</span>
    </article>
  );
}