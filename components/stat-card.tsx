type StatCardProps = {
  label: string;
  value: string | number;
  helper: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="statCard">
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
      <div className="statHelper">{helper}</div>
    </div>
  );
}