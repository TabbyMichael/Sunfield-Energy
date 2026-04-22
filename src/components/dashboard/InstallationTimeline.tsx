import { installationStages, type Installation } from "@/lib/mock-data";
import { Check, Circle, Clock } from "lucide-react";

export function InstallationTimeline({ stage }: { stage: Installation["stage"] }) {
  const currentIndex = installationStages.indexOf(stage);
  return (
    <div className="space-y-1">
      {installationStages.map((s, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        return (
          <div key={s} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  done
                    ? "border-success bg-success/20 text-success"
                    : current
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : current ? <Clock className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
              </div>
              {i < installationStages.length - 1 && (
                <div className={`h-8 w-0.5 ${done ? "bg-success" : "bg-border"}`} />
              )}
            </div>
            <div className="pb-6">
              <div className={`text-sm font-medium ${current ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                {s}
              </div>
              <div className="text-xs text-muted-foreground">
                {done ? "Completed" : current ? "In progress" : "Pending"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
