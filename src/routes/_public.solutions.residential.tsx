import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { SolutionTemplate } from "./_public.solutions.industrial";

export const Route = createFileRoute("/_public/solutions/residential")({
  head: () => ({
    meta: [
      { title: "Residential Solar Systems — SolarFlow" },
      { name: "description", content: "Hybrid home solar with battery backup. Quiet, clean power that beats the grid and replaces your generator." },
      { property: "og:title", content: "Residential Solar — SolarFlow" },
      { property: "og:description", content: "Quiet, clean home energy. Battery-backed solar for African homes." },
    ],
  }),
  component: () => (
    <SolutionTemplate
      icon={Home}
      eyebrow="Home Solar"
      title="Quiet, clean energy for the modern home"
      description="Hybrid solar with battery backup. Run your home through outages, ditch the generator, and lock in your energy bill for 25 years."
      sizeRange="3 kW – 20 kW"
      payback="3–4 years"
      bullets={[
        "Hybrid inverter + lithium battery storage",
        "Mobile app for live monitoring",
        "Silent backup — no fuel, no fumes",
        "Pay-as-you-save financing available",
        "Free site survey and design",
        "10-year workmanship warranty",
      ]}
    />
  ),
});
