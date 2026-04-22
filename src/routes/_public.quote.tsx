import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_public/quote")({
  head: () => ({
    meta: [
      { title: "Request a Solar Quote — SolarFlow" },
      { name: "description", content: "Get a tailored solar quote in minutes. Tell us about your energy needs and our engineers will design a system for you." },
    ],
  }),
  component: QuotePage,
});

const steps = ["Your details", "Energy needs", "Location", "System recommendation", "Submit"];

function QuotePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "", email: "", phone: "",
    propertyType: "Residential", monthlyBill: 50000, backupHours: 6,
    address: "", city: "Lagos",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const recommendedKw = Math.max(3, Math.round((data.monthlyBill / 6500) * 1.2));
  const panelCount = recommendedKw * 2;
  const estimatedPrice = recommendedKw * 1400;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/login" }), 2500);
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-solar shadow-glow">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold">Quote request received</h1>
          <p className="mt-3 text-muted-foreground">
            Our engineers will review your details and send a tailored proposal within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="mt-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sun className="h-4 w-4 text-primary" />
          Step {step + 1} of {steps.length} — {steps[step]}
        </div>
        <div className="mt-3 flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-gradient-solar" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border/60 bg-surface p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-3xl font-bold">Tell us about you</h2>
                <div className="grid gap-4">
                  <div><Label>Full name</Label><Input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Adeola" /></div>
                  <div><Label>Email</Label><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" /></div>
                  <div><Label>Phone</Label><Input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234..." /></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-3xl font-bold">Your energy needs</h2>
                <div className="space-y-2">
                  <Label>Property type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Residential", "Commercial", "Industrial"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => update("propertyType", t)}
                        className={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                          data.propertyType === t
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/60 text-muted-foreground hover:border-border"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Monthly electricity bill (₦)</Label>
                  <Input
                    type="number"
                    value={data.monthlyBill}
                    onChange={(e) => update("monthlyBill", Number(e.target.value))}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Used to estimate your daily energy consumption.</p>
                </div>
                <div>
                  <Label>Backup hours needed: {data.backupHours}h</Label>
                  <input
                    type="range"
                    min={2}
                    max={24}
                    value={data.backupHours}
                    onChange={(e) => update("backupHours", Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-3xl font-bold">Where will it be installed?</h2>
                <div><Label>Address</Label><Input value={data.address} onChange={(e) => update("address", e.target.value)} placeholder="12 Palm Grove" /></div>
                <div><Label>City</Label><Input value={data.city} onChange={(e) => update("city", e.target.value)} /></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold">Recommended system</h2>
                <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
                  <div className="text-xs uppercase tracking-wider text-primary">Optimal for you</div>
                  <div className="mt-2 font-display text-4xl font-bold text-gradient-solar">{recommendedKw} kW</div>
                  <div className="mt-1 text-sm text-muted-foreground">{data.propertyType} hybrid system</div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Stat label="Panels" value={`${panelCount}`} />
                  <Stat label="Battery backup" value={`${data.backupHours}h`} />
                  <Stat label="Est. price" value={`$${estimatedPrice.toLocaleString()}`} />
                  <Stat label="Monthly savings" value={`₦${(data.monthlyBill * 0.7).toLocaleString()}`} />
                  <Stat label="ROI" value="3-5 yrs" />
                  <Stat label="CO₂ saved/yr" value={`${(recommendedKw * 1.2).toFixed(1)}t`} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-bold">Review and submit</h2>
                <p className="text-muted-foreground">We'll have an engineer reach out within 24 hours.</p>
                <div className="rounded-xl border border-border/60 bg-background p-5 text-sm">
                  <Row label="Name" value={data.name || "—"} />
                  <Row label="Email" value={data.email || "—"} />
                  <Row label="Property" value={data.propertyType} />
                  <Row label="Location" value={`${data.address || "—"}, ${data.city}`} />
                  <Row label="Recommended" value={`${recommendedKw} kW system`} />
                  <Row label="Estimated price" value={`$${estimatedPrice.toLocaleString()}`} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="bg-gradient-solar text-primary-foreground hover:opacity-90">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-gradient-solar text-primary-foreground hover:opacity-90">
              Submit Request <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
