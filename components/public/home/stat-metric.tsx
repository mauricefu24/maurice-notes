type StatMetricProps = {
  value: string;
  label: string;
};

export function StatMetric({ value, label }: StatMetricProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold tracking-normal text-note-ink">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
