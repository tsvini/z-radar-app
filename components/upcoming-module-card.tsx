type UpcomingModuleCardProps = {
  title: string;
  description: string;
};

export function UpcomingModuleCard({ title, description }: UpcomingModuleCardProps) {
  return (
    <div className="upcomingCard">
      <div className="soonBadge solid">Em breve</div>
      <h3 className="upcomingTitle">{title}</h3>
      <p className="upcomingText">{description}</p>
    </div>
  );
}