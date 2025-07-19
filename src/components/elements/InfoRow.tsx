const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | React.ReactNode;
}) => (
  <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-background">
    <span className="text-sm font-medium">{label}</span>
    <span className="text-xs font-mono px-3 py-1 bg-muted rounded-md truncate max-w-[200px]">
      {value || <span className="text-muted-foreground italic">N/A</span>}
    </span>
  </div>
);

export default InfoRow;
