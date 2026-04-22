import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { SolutionTemplate } from "./_public.solutions.industrial";

export const Route = createFileRoute("/_public/solutions/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Solar Systems — SolarFlow" },
      { name: "description", content: "Solar PV systems for malls, offices, hotels, schools and warehouses. Cut energy bills by up to 60%." },
      { property: "og:title", content: "Commercial Solar — SolarFlow" },
      { property: "og:description", content: "Solar for businesses — reliable power, lower bills, cleaner brand." },
    ],
  }),
  component: () => (
    <SolutionTemplate
      icon={Building2}
      eyebrow="Commercial Solar"
      title="Power your business with cleaner, cheaper electricity"
      description="Hotels, malls, schools, hospitals and offices choose SolarFlow to slash energy bills, escape grid instability, and meet sustainability goals."
      sizeRange="20 kW – 1 MW"
      payback="4–6 years"
      bullets={[
        "Rooftop and carport solar designs",
        "Net-metering and behind-the-meter solutions",
        "Energy storage for peak shaving",
        "Bill analysis and savings reporting",
        "Lease, PPA and outright purchase options",
        "ESG and sustainability reporting tools",
      ]}
    />
  ),
});
