import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sun, Factory, Building2, Home as HomeIcon, ArrowRight, Zap, ShieldCheck,
  TrendingUp, Battery, Wrench, BarChart3, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardMap from "@/components/dashboard/DashboardMap";
import heroImage from "@/assets/hero-solar.jpg";
import { useEffect, useState } from "react";
import { installationMapLocations } from "@/lib/mock-data";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "SolarFlow — Clean Solar Energy for Homes, Businesses & Industry" },
      { name: "description", content: "Industrial, commercial and residential solar systems with full lifecycle management. Get your free solar quote today." },
      { property: "og:title", content: "SolarFlow — Solar Energy Platform" },
      { property: "og:description", content: "Clean solar energy with intelligent quote, install and monitoring." },
    ],
  }),
  component: HomePage,
});

const segments = [
  { icon: Factory, title: "Industrial", desc: "Megawatt-scale ground-mount and rooftop systems for factories, mines, and large facilities.", to: "/solutions/industrial" as const, gradient: "from-primary/20 to-warning/10" },
  { icon: Building2, title: "Commercial", desc: "Reliable solar for malls, offices, hotels, schools and warehouses — cut energy costs by up to 60%.", to: "/solutions/commercial" as const, gradient: "from-secondary/20 to-primary/10" },
  { icon: HomeIcon, title: "Residential", desc: "Hybrid home solar with battery backup. Beat the grid, escape the noise of generators.", to: "/solutions/residential" as const, gradient: "from-success/20 to-secondary/10" },
];

const stats = [
  { label: "MW Installed", value: "184" },
  { label: "Active Sites", value: "2,400+" },
  { label: "Tons CO₂ Avoided", value: "92K" },
  { label: "Avg Customer Savings", value: "58%" },
];

const features = [
  { icon: Zap, title: "Live performance monitoring", desc: "Track energy production, savings, and system health in real time." },
  { icon: ShieldCheck, title: "25-year panel warranty", desc: "Tier-1 panels with industry-leading warranty and support." },
  { icon: Battery, title: "Hybrid battery backup", desc: "Lithium-ion storage keeps you powered through outages and at night." },
  { icon: Wrench, title: "Turnkey installation", desc: "From site survey to commissioning — handled by our certified crews." },
  { icon: TrendingUp, title: "ROI in 3-5 years", desc: "Most systems pay for themselves within five years of operation." },
  { icon: BarChart3, title: "Operator dashboards", desc: "Enterprise-grade tools for installers, staff, and customers." },
];

function HomePage() {
  const [locations, setLocations] = useState(installationMapLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch installation locations from API (public endpoint - no auth needed)
    fetch('http://127.0.0.1:8000/api/v1/installations/map-locations')
      .then(res => res.json())
      .then(data => {
        setLocations(Array.isArray(data) && data.length > 0 ? data : installationMapLocations);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching locations:', err);
        setLocations(installationMapLocations);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/95" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sun className="h-3 w-3" /> Clean energy for Africa
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Sunlight, <span className="text-gradient-solar">captured.</span><br />
              Power, delivered.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground font-medium">
              SolarFlow designs, installs and monitors solar energy systems for industrial,
              commercial and residential customers. One platform. Total visibility.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/quote">
                <Button size="lg" className="bg-gradient-solar text-primary-foreground shadow-glow hover:opacity-90">
                  Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/solutions/industrial">
                <Button size="lg" variant="outline" className="border-border/60">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative mt-20 grid grid-cols-2 gap-px rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-4 overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-background/40 p-6 backdrop-blur-sm">
                <div className="font-display text-3xl font-bold text-gradient-solar">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Solutions</div>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Built for every scale of energy demand
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <Link
                key={seg.title}
                to={seg.to}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-8 transition-all hover:border-primary/40 hover:shadow-glow"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${seg.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{seg.title} Solar</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{seg.desc}</p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features grid */}
      <section className="border-y border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">Why SolarFlow</div>
              <h2 className="mt-3 font-display text-4xl font-bold">An end-to-end solar operating system</h2>
              <p className="mt-4 text-muted-foreground">
                We don't just install panels. We deliver a connected energy platform that
                covers every step from lead to lifetime monitoring.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-xl border border-border/60 bg-background p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <h4 className="mt-3 font-semibold">{f.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Locations Map */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <MapPin className="h-4 w-4" />
              Our Presence
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold">Powering across the region</h2>
            <p className="mt-4 text-muted-foreground">
              Explore our growing network of solar installations. From industrial facilities to
              residential homes, we're powering the future with clean energy.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">Scheduled installations</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-muted-foreground">In progress</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Completed systems</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-surface shadow-card">
              <div className="absolute inset-x-0 top-0 z-[1001] flex items-center justify-between gap-4 border-b border-white/10 bg-background/70 px-5 py-4 backdrop-blur-md">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-primary">Live network map</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {loading ? "Syncing installation locations..." : `${locations.length} active locations on the map`}
                  </div>
                </div>
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  OpenStreetMap
                </div>
              </div>
              <DashboardMap locations={locations} height="500px" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-energy p-10 sm:p-16">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-secondary-foreground">
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Ready to switch to solar?</h2>
              <p className="mt-4 max-w-md opacity-90">
                Get a tailored quote in minutes. Our engineers will design a system that
                fits your energy needs and budget.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/quote">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                  Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Customer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
