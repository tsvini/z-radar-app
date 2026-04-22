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
      <div className="upcomingBadge">Em breve</div>
      <h3 className="upcomingTitle">{title}</h3>
      <p className="upcomingDescription">{description}</p>
    </article>
  );
}