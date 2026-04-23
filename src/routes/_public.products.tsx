import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Zap, Battery, Package, ArrowRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/_public/products")({
  head: () => ({
    meta: [
      { title: "SolarFlow — Products Catalog" },
      { name: "description", content: "Browse our complete catalog of premium solar panels, inverters, and batteries." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  // Solar Panels
  { name: "Jinko Tiger Neo 580W", category: "Solar Panel", icon: Sun, desc: "High-efficiency N-type TOPCon technology with 25-year linear power warranty.", sku: "JKM-580N", price: 230, stock: 1240, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Jinko Tiger Neo 570W", category: "Solar Panel", icon: Sun, desc: "N-type TOPCon with excellent low-light performance and 84.3% bifaciality.", sku: "JKM-570N", price: 225, stock: 980, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Canadian Solar 550W", category: "Solar Panel", icon: Sun, desc: "Reliable half-cut cell design with excellent low-light performance.", sku: "CS-550M", price: 215, stock: 860, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Canadian Solar 540W", category: "Solar Panel", icon: Sun, desc: "High-performance half-cut module with PID resistance.", sku: "CS-540M", price: 210, stock: 720, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Trina Vertex S+ 550W", category: "Solar Panel", icon: Sun, desc: "Multi-busbar technology with 21.8% module efficiency.", sku: "TV-550S", price: 235, stock: 650, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Trina Vertex S+ 540W", category: "Solar Panel", icon: Sun, desc: "Dual-glass design for enhanced durability and performance.", sku: "TV-540S", price: 230, stock: 580, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Longi Hi-MO 6 580W", category: "Solar Panel", icon: Sun, desc: "HPBC cell technology with 22.8% efficiency.", sku: "LR-HM6-580", price: 245, stock: 890, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Longi Hi-MO 6 570W", category: "Solar Panel", icon: Sun, desc: "Back-contact technology for superior aesthetics and performance.", sku: "LR-HM6-570", price: 240, stock: 750, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "JA Solar JAM72S30 550W", category: "Solar Panel", icon: Sun, desc: "72-cell bifacial module with 21.5% efficiency.", sku: "JA-550M", price: 220, stock: 920, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "JA Solar JAM72S30 540W", category: "Solar Panel", icon: Sun, desc: "Half-cut cell design with improved shading tolerance.", sku: "JA-540M", price: 215, stock: 810, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Risen RSM 550W", category: "Solar Panel", icon: Sun, desc: "Heterojunction technology with 22% efficiency.", sku: "RN-550H", price: 225, stock: 670, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Risen RSM 540W", category: "Solar Panel", icon: Sun, desc: "Dual-glass bifacial module with 30-year warranty.", sku: "RN-540H", price: 220, stock: 590, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Seraphim SRP-550W", category: "Solar Panel", icon: Sun, desc: "Ultra-high power density with multi-busbar design.", sku: "SF-550M", price: 218, stock: 720, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Seraphim SRP-540W", category: "Solar Panel", icon: Sun, desc: "Hot-spot free technology for enhanced safety.", sku: "SF-540M", price: 213, stock: 680, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Astronergy 550W", category: "Solar Panel", icon: Sun, desc: "TOPCon technology with 21.8% efficiency.", sku: "AS-550T", price: 212, stock: 850, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Astronergy 540W", category: "Solar Panel", icon: Sun, desc: "Half-cut bifacial module with excellent degradation rate.", sku: "AS-540T", price: 207, stock: 790, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  { name: "Phono Solar 550W", category: "Solar Panel", icon: Sun, desc: "Half-cut PERC technology with 21.5% efficiency.", sku: "PS-550M", price: 216, stock: 640, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
  { name: "Phono Solar 540W", category: "Solar Panel", icon: Sun, desc: "Anti-PID design with enhanced salt mist resistance.", sku: "PS-540M", price: 211, stock: 580, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=400&h=300&fit=crop" },
  
  // Inverters
  { name: "Sungrow SG250HX", category: "Inverter", icon: Zap, desc: "250kW three-phase string inverter with smart monitoring and protection.", sku: "SG-250HX", price: 6800, stock: 14, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Sungrow SG125HX", category: "Inverter", icon: Zap, desc: "125kW string inverter with 12 MPPTs for flexible design.", sku: "SG-125HX", price: 4200, stock: 28, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Sungrow SG100CX", category: "Inverter", icon: Zap, desc: "100kW three-phase inverter with 6 MPPTs.", sku: "SG-100CX", price: 3500, stock: 35, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Sungrow SG50CX", category: "Inverter", icon: Zap, desc: "50kW commercial inverter with arc fault protection.", sku: "SG-50CX", price: 1800, stock: 52, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Deye SUN-12K Hybrid", category: "Inverter", icon: Zap, desc: "12kW hybrid inverter for off-grid and backup applications with MPPT.", sku: "DY-12K", price: 1850, stock: 32, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Deye SUN-8K Hybrid", category: "Inverter", icon: Zap, desc: "8kW hybrid inverter with dual MPPT and battery support.", sku: "DY-8K", price: 1350, stock: 45, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Deye SUN-5K Hybrid", category: "Inverter", icon: Zap, desc: "5kW hybrid inverter for residential systems with battery backup.", sku: "DY-5K", price: 950, stock: 68, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Huawei SUN2000-100KTL", category: "Inverter", icon: Zap, desc: "100kW smart string inverter with AI-powered diagnostics.", sku: "HW-100K", price: 3800, stock: 22, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Huawei SUN2000-50KTL", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with smart PID recovery.", sku: "HW-50K", price: 1900, stock: 38, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Solis 50K-4G", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with 6 MPPTs and IP65 rating.", sku: "SL-50K", price: 1750, stock: 41, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Solis 30K-4G", category: "Inverter", icon: Zap, desc: "30kW commercial inverter with flexible string configuration.", sku: "SL-30K", price: 1200, stock: 55, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Solis 20K-4G", category: "Inverter", icon: Zap, desc: "20kW three-phase inverter with built-in monitoring.", sku: "SL-20K", price: 950, stock: 62, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Growatt 50KTL", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with smart monitoring features.", sku: "GT-50K", price: 1650, stock: 48, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Growatt 30KTL", category: "Inverter", icon: Zap, desc: "30kW commercial inverter with optional battery integration.", sku: "GT-30K", price: 1100, stock: 59, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Growatt 20KTL", category: "Inverter", icon: Zap, desc: "20kW three-phase inverter with MPPT tracking.", sku: "GT-20K", price: 880, stock: 71, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Fronius Eco 27.0", category: "Inverter", icon: Zap, desc: "27kW three-phase inverter with superFlex design.", sku: "FR-27K", price: 3200, stock: 18, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  { name: "Fronius Galvo 3.0", category: "Inverter", icon: Zap, desc: "3kW single-phase inverter with dynamic power manager.", sku: "FR-3K", price: 850, stock: 84, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
  
  // Batteries
  { name: "Pylontech US3000C 3.5kWh", category: "Battery", icon: Battery, desc: "Modular lithium battery with built-in BMS and 95% DOD capability.", sku: "PT-3000C", price: 1450, stock: 56, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Pylontech US2000C 2.4kWh", category: "Battery", icon: Battery, desc: "2.4kWh lithium battery with 95% DOD and 6000 cycles.", sku: "PT-2000C", price: 980, stock: 78, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "BYD Battery-Box Premium 10kWh", category: "Battery", icon: Battery, desc: "High-capacity storage system with modular design and 10-year warranty.", sku: "BYD-10K", price: 4200, stock: 18, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "BYD Battery-Box Premium 13.8kWh", category: "Battery", icon: Battery, desc: "13.8kWh modular battery system with 6000 cycle life.", sku: "BYD-13K", price: 5800, stock: 12, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Tesla Powerwall 3 13.5kWh", category: "Battery", icon: Battery, desc: "13.5kWh AC-coupled battery with built-in inverter.", sku: "TW-PW3", price: 8500, stock: 8, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "LG RESU 10H 9.6kWh", category: "Battery", icon: Battery, desc: "9.6kWh lithium battery with 10-year warranty.", sku: "LG-10H", price: 5200, stock: 15, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "LG RESU 16H 16kWh", category: "Battery", icon: Battery, desc: "16kWh high-capacity battery with 95% DOD.", sku: "LG-16H", price: 7800, stock: 10, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Sonnen 10kWh", category: "Battery", icon: Battery, desc: "10kWh lithium battery with intelligent energy management.", sku: "SN-10K", price: 6500, stock: 14, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "SolaX Power 3.3kWh", category: "Battery", icon: Battery, desc: "3.3kWh modular battery with wall-mount design.", sku: "SX-3.3K", price: 1100, stock: 92, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "SolaX Power 6.4kWh", category: "Battery", icon: Battery, desc: "6.4kWh lithium battery with 95% DOD capability.", sku: "SX-6.4K", price: 2100, stock: 65, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Huawei LUNA2000-5kWh", category: "Battery", icon: Battery, desc: "5kWh lithium battery with smart BMS and 6000 cycles.", sku: "HW-5K", price: 1800, stock: 48, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Huawei LUNA2000-10kWh", category: "Battery", icon: Battery, desc: "10kWh modular battery system with stackable design.", sku: "HW-10K", price: 3500, stock: 32, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Alpha ESS Smile 5 5kWh", category: "Battery", icon: Battery, desc: "5kWh lithium battery with 10-year warranty.", sku: "AL-5K", price: 1650, stock: 55, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Alpha ESS Smile 10 10kWh", category: "Battery", icon: Battery, desc: "10kWh battery system with app monitoring.", sku: "AL-10K", price: 3200, stock: 28, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Enphase IQ Battery 5 3.36kWh", category: "Battery", icon: Battery, desc: "3.36kWh AC battery with plug-and-play installation.", sku: "EN-5", price: 2800, stock: 68, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "Enphase IQ Battery 10 10.08kWh", category: "Battery", icon: Battery, desc: "10.08kWh modular battery system with stackable design.", sku: "EN-10", price: 8400, stock: 22, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "SimpliPhi 3.5kWh", category: "Battery", icon: Battery, desc: "3.5kWh lithium iron phosphate battery with non-toxic chemistry.", sku: "SP-3.5K", price: 1950, stock: 42, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
  { name: "SimpliPhi 4.9kWh", category: "Battery", icon: Battery, desc: "4.9kWh battery with 100% DOD and 10,000 cycles.", sku: "SP-4.9K", price: 2750, stock: 35, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=300&fit=crop" },
];

const ITEMS_PER_PAGE = 12;

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Products Catalog</h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our complete inventory of premium solar panels, inverters, and batteries.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.sku}
              onClick={() => {
                navigate({ to: `/products/${p.sku}` });
              }}
              className="group cursor-pointer"
            >
              <div className="h-full rounded-2xl border border-border/60 bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-glow">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-solar">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-end justify-between border-t border-border/40 pt-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Unit price</div>
                    <div className="font-display text-xl font-bold">${p.price.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">In stock</div>
                    <div className="font-display text-xl font-bold">{p.stock}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
