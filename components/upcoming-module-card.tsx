type Props = {
  title: string;
  description: string;
};

export function UpcomingModuleCard({ title, description }: Props) {
  return (
    <div className="upcomingCard">
      <div className="comingSoonPill">Em breve</div>
      <h3 className="upcomingTitle">{title}</h3>
      <p className="upcomingText">{description}</p>
    </div>
  );
}