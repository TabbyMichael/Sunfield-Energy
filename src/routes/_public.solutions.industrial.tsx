import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/solutions/industrial")({
  head: () => ({
    meta: [
      { title: "Industrial Solar Systems — SolarFlow" },
      { name: "description", content: "Megawatt-scale solar PV plants, ground-mount and rooftop systems for factories, mines, and heavy industry." },
      { property: "og:title", content: "Industrial Solar — SolarFlow" },
      { property: "og:description", content: "MW-scale solar plants for industry — engineered, financed, monitored." },
    ],
  }),
  component: IndustrialPage,
});

function IndustrialPage() {
  return <SolutionTemplate
    icon={Factory}
    eyebrow="Industrial Solar"
    title="Megawatt-scale clean energy for heavy industry"
    description="From mining operations to manufacturing plants, our industrial solar systems deliver reliable baseload power at a fraction of grid costs."
    sizeRange="100 kW – 50 MW"
    payback="3–5 years"
    bullets={[
      "Ground-mount and large rooftop arrays",
      "Battery storage and diesel hybridization",
      "SCADA-grade monitoring and remote control",
      "Performance guarantees and O&M contracts",
      "EPC delivery, financing options available",
      "Grid-tied or off-grid configurations",
    ]}
  />;
}

interface SolutionProps {
  icon: typeof Factory;
  eyebrow: string;
  title: string;
  description: string;
  sizeRange: string;
  payback: string;
  bullets: string[];
}

export function SolutionTemplate({ icon: Icon, eyebrow, title, description, sizeRange, payback, bullets }: SolutionProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Icon className="h-3 w-3" /> {eyebrow}
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/quote">
              <Button size="lg" className="bg-gradient-solar text-primary-foreground shadow-glow hover:opacity-90">
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 bg-surface p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">System size</div>
              <div className="mt-2 font-display text-3xl font-bold text-gradient-solar">{sizeRange}</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-surface p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Payback</div>
              <div className="mt-2 font-display text-3xl font-bold text-gradient-solar">{payback}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-surface p-6">
            <h3 className="font-semibold">What's included</h3>
            <ul className="mt-4 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
