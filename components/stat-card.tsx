type StatCardProps = {
  title: string;
  value: string;
  footnote: string;
};

export function StatCard({ title, value, footnote }: StatCardProps) {
  return (
    <article className="statCard">
      <div className="statLabel">{title}</div>
      <div className="statValue">{value}</div>
      <div className="statFootnote">{footnote}</div>
    </article>
  );
}