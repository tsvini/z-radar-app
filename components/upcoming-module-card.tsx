type UpcomingModuleCardProps = {
  title: string;
  description: string;
};

export function UpcomingModuleCard({
  title,
  description,
}: UpcomingModuleCardProps) {
  return (
    <article className="upcomingModuleCard">
      <span className="upcomingBadge">Em breve</span>
      <h3 className="upcomingTitle">{title}</h3>
      <p className="upcomingDescription">{description}</p>
    </article>
  );
}