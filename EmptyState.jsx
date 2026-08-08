export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <div className="text-lg font-medium">{title}</div>
      {message && <div className="mt-1 mb-4 text-sm text-muted-foreground">{message}</div>}
      {action}
    </div>
  );
}