import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ icon: Icon, label, value, accent = "bg-primary/10 text-primary" }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}