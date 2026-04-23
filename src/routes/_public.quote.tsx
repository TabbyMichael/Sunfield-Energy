import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sun,
  Trash2,
  ShoppingCart,
  LocateFixed,
  Loader2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import AddressAutocomplete from "@/components/location/AddressAutocomplete";

export const Route = createFileRoute("/_public/quote")({
  head: () => ({
    meta: [
      { title: "Request a Solar Quote â€” SolarFlow" },
      { name: "description", content: "Get a tailored solar quote in minutes. Tell us about your energy needs and our engineers will design a system for you." },
    ],
  }),
  component: QuotePage,
});

const steps = ["Your details", "Energy needs", "Location", "System recommendation", "Submit"];

function QuotePage() {
  const navigate = useNavigate();
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Residential",
    monthlyBill: 50000,
    backupHours: 6,
    address: "",
    city: "Lagos",
    state: "",
    country: "",
    postalCode: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationStatus, setLocationStatus] = useState("Type an address to see suggestions, or use your current location.");

  const update = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const recommendedKw = Math.max(3, Math.round((data.monthlyBill / 6500) * 1.2));
  const panelCount = recommendedKw * 2;
  const estimatedPrice = recommendedKw * 1400;

  const handleSubmit = () => {
    setSubmitted(true);
    clearCart();
    setTimeout(() => navigate({ to: "/login" }), 2500);
  };

  const handleAddressSelect = (address: string, lat: number, lng: number, details: any) => {
    setLocationError("");
    setLocationStatus("Address selected from OpenStreetMap.");
    setData((current) => ({
      ...current,
      address,
      city: details.city || current.city,
      state: details.state || "",
      country: details.country || "",
      postalCode: details.postal_code || "",
      latitude: lat,
      longitude: lng,
    }));
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    if (!response.ok) {
      throw new Error("Unable to look up your current address.");
    }

    const result = await response.json();
    const address = result.address ?? {};
    const city = address.city || address.town || address.village || address.county || "";

    setData((current) => ({
      ...current,
      address: result.display_name || current.address,
      city: city || current.city,
      state: address.state || "",
      country: address.country || "",
      postalCode: address.postcode || "",
      latitude,
      longitude,
    }));
  };

  const handleUseCurrentLocation = async () => {
    if (!("geolocation" in navigator)) {
      setLocationError("This browser does not support location access.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");
    setLocationStatus("Waiting for your permission to access location...");

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      setLocationStatus("Permission granted. Looking up your address...");
      await reverseGeocode(position.coords.latitude, position.coords.longitude);
      setLocationStatus("Current location added to your quote.");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error) {
        const geoError = error as GeolocationPositionError;
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError("Location permission was denied. You can still search for the address manually.");
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setLocationError("Your location could not be determined right now.");
        } else if (geoError.code === geoError.TIMEOUT) {
          setLocationError("The location request timed out. Please try again.");
        } else {
          setLocationError("Unable to access your location.");
        }
      } else if (error instanceof Error) {
        setLocationError(error.message);
      } else {
        setLocationError("Unable to access your location.");
      }
      setLocationStatus("Search for your address to continue.");
    } finally {
      setLocationLoading(false);
    }
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
          Step {step + 1} of {steps.length} â€” {steps[step]}
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
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold">Tell us about you</h2>

                {items.length > 0 && (
                  <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                      <ShoppingCart className="h-4 w-4" />
                      Products in your quote ({items.length})
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.sku} className="flex items-center justify-between rounded-lg border border-border/40 bg-background/50 p-2 text-sm">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img src={item.image} alt="" className="h-10 w-10 rounded border border-border/60 object-cover" />
                            )}
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">SKU: {item.sku} x {item.quantity}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="font-bold">${(item.price * item.quantity).toLocaleString()}</div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.sku)}
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-border/40 pt-2 font-bold text-primary">
                        <span>Equipment Subtotal</span>
                        <span>${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

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
                  <Label>Monthly electricity bill (Naira)</Label>
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

                <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold">Search like a map app</div>
                      <div className="text-sm text-muted-foreground">
                        Start typing to get address suggestions, or let the browser prompt for your location.
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUseCurrentLocation}
                      disabled={locationLoading}
                      className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                    >
                      {locationLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LocateFixed className="mr-2 h-4 w-4" />}
                      Use current location
                    </Button>
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{locationError || locationStatus}</span>
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <AddressAutocomplete
                    value={data.address}
                    onChange={(value) => update("address", value)}
                    onSelect={handleAddressSelect}
                    placeholder="Search for an address or landmark"
                    inputClassName="border-border/60 bg-background text-foreground placeholder:text-muted-foreground shadow-none focus:border-primary focus:ring-primary/30"
                    dropdownClassName="border-border/60 bg-popover"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>City</Label><Input value={data.city} onChange={(e) => update("city", e.target.value)} /></div>
                  <div><Label>State / Region</Label><Input value={data.state} onChange={(e) => update("state", e.target.value)} placeholder="Lagos State" /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>Country</Label><Input value={data.country} onChange={(e) => update("country", e.target.value)} placeholder="Nigeria" /></div>
                  <div><Label>Postal code</Label><Input value={data.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="100001" /></div>
                </div>
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
                  <Stat label="Monthly savings" value={`N${(data.monthlyBill * 0.7).toLocaleString()}`} />
                  <Stat label="ROI" value="3-5 yrs" />
                  <Stat label="CO2 saved/yr" value={`${(recommendedKw * 1.2).toFixed(1)}t`} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-bold">Review and submit</h2>
                <p className="text-muted-foreground">We'll have an engineer reach out within 24 hours.</p>
                <div className="rounded-xl border border-border/60 bg-background p-5 text-sm">
                  <Row label="Name" value={data.name || "-"} />
                  <Row label="Email" value={data.email || "-"} />
                  <Row label="Property" value={data.propertyType} />
                  <Row label="Location" value={[data.address || "-", data.city, data.state, data.country].filter(Boolean).join(", ")} />
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
