import { createFileRoute, Link } from "@tanstack/react-router";
import { Sun, Zap, Battery, ArrowLeft, ShoppingCart, Package, Check, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

const products = [
  // Solar Panels
  { name: "Jinko Tiger Neo 580W", category: "Solar Panel", icon: Sun, desc: "High-efficiency N-type TOPCon technology with 25-year linear power warranty.", sku: "JKM-580N", price: 230, stock: 1240, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "22.5%", power: "580W", type: "N-type TOPCon", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.5kg" } },
  { name: "Jinko Tiger Neo 570W", category: "Solar Panel", icon: Sun, desc: "N-type TOPCon with excellent low-light performance and 84.3% bifaciality.", sku: "JKM-570N", price: 225, stock: 980, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "22.3%", power: "570W", type: "N-type TOPCon", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.2kg" } },
  { name: "Canadian Solar 550W", category: "Solar Panel", icon: Sun, desc: "Reliable half-cut cell design with excellent low-light performance.", sku: "CS-550M", price: 215, stock: 860, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.8%", power: "550W", type: "Half-cut PERC", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.8kg" } },
  { name: "Canadian Solar 540W", category: "Solar Panel", icon: Sun, desc: "High-performance half-cut module with PID resistance.", sku: "CS-540M", price: 210, stock: 720, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.5%", power: "540W", type: "Half-cut PERC", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.5kg" } },
  { name: "Trina Vertex S+ 550W", category: "Solar Panel", icon: Sun, desc: "Multi-busbar technology with 21.8% module efficiency.", sku: "TV-550S", price: 235, stock: 650, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.8%", power: "550W", type: "Multi-busbar", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.0kg" } },
  { name: "Trina Vertex S+ 540W", category: "Solar Panel", icon: Sun, desc: "Dual-glass design for enhanced durability and performance.", sku: "TV-540S", price: 230, stock: 580, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.6%", power: "540W", type: "Dual-glass", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "29.5kg" } },
  { name: "Longi Hi-MO 6 580W", category: "Solar Panel", icon: Sun, desc: "HPBC cell technology with 22.8% efficiency.", sku: "LR-HM6-580", price: 245, stock: 890, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "22.8%", power: "580W", type: "HPBC", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.3kg" } },
  { name: "Longi Hi-MO 6 570W", category: "Solar Panel", icon: Sun, desc: "Back-contact technology for superior aesthetics and performance.", sku: "LR-HM6-570", price: 240, stock: 750, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "22.6%", power: "570W", type: "HPBC", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.0kg" } },
  { name: "JA Solar JAM72S30 550W", category: "Solar Panel", icon: Sun, desc: "72-cell bifacial module with 21.5% efficiency.", sku: "JA-550M", price: 220, stock: 920, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.5%", power: "550W", type: "Bifacial", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.1kg" } },
  { name: "JA Solar JAM72S30 540W", category: "Solar Panel", icon: Sun, desc: "Half-cut cell design with improved shading tolerance.", sku: "JA-540M", price: 215, stock: 810, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.3%", power: "540W", type: "Half-cut", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.8kg" } },
  { name: "Risen RSM 550W", category: "Solar Panel", icon: Sun, desc: "Heterojunction technology with 22% efficiency.", sku: "RN-550H", price: 225, stock: 670, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "22.0%", power: "550W", type: "HJT", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "28.2kg" } },
  { name: "Risen RSM 540W", category: "Solar Panel", icon: Sun, desc: "Dual-glass bifacial module with 30-year warranty.", sku: "RN-540H", price: 220, stock: 590, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.8%", power: "540W", type: "HJT Bifacial", warranty: "30 years", dimensions: "2278×1134×35mm", weight: "29.0kg" } },
  { name: "Seraphim SRP-550W", category: "Solar Panel", icon: Sun, desc: "Ultra-high power density with multi-busbar design.", sku: "SF-550M", price: 218, stock: 720, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.7%", power: "550W", type: "Multi-busbar", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.9kg" } },
  { name: "Seraphim SRP-540W", category: "Solar Panel", icon: Sun, desc: "Hot-spot free technology for enhanced safety.", sku: "SF-540M", price: 213, stock: 680, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.5%", power: "540W", type: "Hot-spot Free", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.6kg" } },
  { name: "Astronergy 550W", category: "Solar Panel", icon: Sun, desc: "TOPCon technology with 21.8% efficiency.", sku: "AS-550T", price: 212, stock: 850, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.8%", power: "550W", type: "TOPCon", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.7kg" } },
  { name: "Astronergy 540W", category: "Solar Panel", icon: Sun, desc: "Half-cut bifacial module with excellent degradation rate.", sku: "AS-540T", price: 207, stock: 790, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.6%", power: "540W", type: "TOPCon Bifacial", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.5kg" } },
  { name: "Phono Solar 550W", category: "Solar Panel", icon: Sun, desc: "Half-cut PERC technology with 21.5% efficiency.", sku: "PS-550M", price: 216, stock: 640, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", specs: { efficiency: "21.5%", power: "550W", type: "Half-cut PERC", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.8kg" } },
  { name: "Phono Solar 540W", category: "Solar Panel", icon: Sun, desc: "Anti-PID design with enhanced salt mist resistance.", sku: "PS-540M", price: 211, stock: 580, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16be9?w=800&h=600&fit=crop", specs: { efficiency: "21.3%", power: "540W", type: "Anti-PID", warranty: "25 years", dimensions: "2278×1134×35mm", weight: "27.4kg" } },
  
  // Inverters
  { name: "Sungrow SG250HX", category: "Inverter", icon: Zap, desc: "250kW three-phase string inverter with smart monitoring and protection.", sku: "SG-250HX", price: 6800, stock: 14, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "250kW", type: "Three-phase", mppt: "12 MPPTs", efficiency: "98.8%", warranty: "10 years", protection: "IP65" } },
  { name: "Sungrow SG125HX", category: "Inverter", icon: Zap, desc: "125kW string inverter with 12 MPPTs for flexible design.", sku: "SG-125HX", price: 4200, stock: 28, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "125kW", type: "Three-phase", mppt: "12 MPPTs", efficiency: "98.6%", warranty: "10 years", protection: "IP65" } },
  { name: "Sungrow SG100CX", category: "Inverter", icon: Zap, desc: "100kW three-phase inverter with 6 MPPTs.", sku: "SG-100CX", price: 3500, stock: 35, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "100kW", type: "Three-phase", mppt: "6 MPPTs", efficiency: "98.5%", warranty: "10 years", protection: "IP65" } },
  { name: "Sungrow SG50CX", category: "Inverter", icon: Zap, desc: "50kW commercial inverter with arc fault protection.", sku: "SG-50CX", price: 1800, stock: 52, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "50kW", type: "Three-phase", mppt: "4 MPPTs", efficiency: "98.3%", warranty: "10 years", protection: "IP65" } },
  { name: "Deye SUN-12K Hybrid", category: "Inverter", icon: Zap, desc: "12kW hybrid inverter for off-grid and backup applications with MPPT.", sku: "DY-12K", price: 1850, stock: 32, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "12kW", type: "Hybrid", mppt: "2 MPPTs", efficiency: "97.5%", warranty: "5 years", protection: "IP65" } },
  { name: "Deye SUN-8K Hybrid", category: "Inverter", icon: Zap, desc: "8kW hybrid inverter with dual MPPT and battery support.", sku: "DY-8K", price: 1350, stock: 45, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "8kW", type: "Hybrid", mppt: "2 MPPTs", efficiency: "97.3%", warranty: "5 years", protection: "IP65" } },
  { name: "Deye SUN-5K Hybrid", category: "Inverter", icon: Zap, desc: "5kW hybrid inverter for residential systems with battery backup.", sku: "DY-5K", price: 950, stock: 68, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "5kW", type: "Hybrid", mppt: "2 MPPTs", efficiency: "97.0%", warranty: "5 years", protection: "IP65" } },
  { name: "Huawei SUN2000-100KTL", category: "Inverter", icon: Zap, desc: "100kW smart string inverter with AI-powered diagnostics.", sku: "HW-100K", price: 3800, stock: 22, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "100kW", type: "Three-phase", mppt: "10 MPPTs", efficiency: "98.7%", warranty: "10 years", protection: "IP65" } },
  { name: "Huawei SUN2000-50KTL", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with smart PID recovery.", sku: "HW-50K", price: 1900, stock: 38, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "50kW", type: "Three-phase", mppt: "6 MPPTs", efficiency: "98.4%", warranty: "10 years", protection: "IP65" } },
  { name: "Solis 50K-4G", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with 6 MPPTs and IP65 rating.", sku: "SL-50K", price: 1750, stock: 41, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "50kW", type: "Three-phase", mppt: "6 MPPTs", efficiency: "98.2%", warranty: "10 years", protection: "IP65" } },
  { name: "Solis 30K-4G", category: "Inverter", icon: Zap, desc: "30kW commercial inverter with flexible string configuration.", sku: "SL-30K", price: 1200, stock: 55, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "30kW", type: "Three-phase", mppt: "4 MPPTs", efficiency: "98.0%", warranty: "10 years", protection: "IP65" } },
  { name: "Solis 20K-4G", category: "Inverter", icon: Zap, desc: "20kW three-phase inverter with built-in monitoring.", sku: "SL-20K", price: 950, stock: 62, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "20kW", type: "Three-phase", mppt: "4 MPPTs", efficiency: "97.8%", warranty: "10 years", protection: "IP65" } },
  { name: "Growatt 50KTL", category: "Inverter", icon: Zap, desc: "50kW three-phase inverter with smart monitoring features.", sku: "GT-50K", price: 1650, stock: 48, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "50kW", type: "Three-phase", mppt: "6 MPPTs", efficiency: "98.1%", warranty: "5 years", protection: "IP65" } },
  { name: "Growatt 30KTL", category: "Inverter", icon: Zap, desc: "30kW commercial inverter with optional battery integration.", sku: "GT-30K", price: 1100, stock: 59, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "30kW", type: "Three-phase", mppt: "4 MPPTs", efficiency: "97.9%", warranty: "5 years", protection: "IP65" } },
  { name: "Growatt 20KTL", category: "Inverter", icon: Zap, desc: "20kW three-phase inverter with MPPT tracking.", sku: "GT-20K", price: 880, stock: 71, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "20kW", type: "Three-phase", mppt: "4 MPPTs", efficiency: "97.6%", warranty: "5 years", protection: "IP65" } },
  { name: "Fronius Eco 27.0", category: "Inverter", icon: Zap, desc: "27kW three-phase inverter with superFlex design.", sku: "FR-27K", price: 3200, stock: 18, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "27kW", type: "Three-phase", mppt: "6 MPPTs", efficiency: "98.3%", warranty: "5 years", protection: "IP65" } },
  { name: "Fronius Galvo 3.0", category: "Inverter", icon: Zap, desc: "3kW single-phase inverter with dynamic power manager.", sku: "FR-3K", price: 850, stock: 84, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", specs: { power: "3kW", type: "Single-phase", mppt: "2 MPPTs", efficiency: "97.2%", warranty: "5 years", protection: "IP65" } },
  
  // Batteries
  { name: "Pylontech US3000C 3.5kWh", category: "Battery", icon: Battery, desc: "Modular lithium battery with built-in BMS and 95% DOD capability.", sku: "PT-3000C", price: 1450, stock: 56, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "3.5kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "95%", warranty: "10 years", weight: "48kg" } },
  { name: "Pylontech US2000C 2.4kWh", category: "Battery", icon: Battery, desc: "2.4kWh lithium battery with 95% DOD and 6000 cycles.", sku: "PT-2000C", price: 980, stock: 78, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "2.4kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "95%", warranty: "10 years", weight: "42kg" } },
  { name: "BYD Battery-Box Premium 10kWh", category: "Battery", icon: Battery, desc: "High-capacity storage system with modular design and 10-year warranty.", sku: "BYD-10K", price: 4200, stock: 18, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "10kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "90%", warranty: "10 years", weight: "185kg" } },
  { name: "BYD Battery-Box Premium 13.8kWh", category: "Battery", icon: Battery, desc: "13.8kWh modular battery system with 6000 cycle life.", sku: "BYD-13K", price: 5800, stock: 12, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "13.8kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "90%", warranty: "10 years", weight: "245kg" } },
  { name: "Tesla Powerwall 3 13.5kWh", category: "Battery", icon: Battery, desc: "13.5kWh AC-coupled battery with built-in inverter.", sku: "TW-PW3", price: 8500, stock: 8, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "13.5kWh", type: "Li-ion", voltage: "AC", cycles: "4000+", dod: "100%", warranty: "10 years", weight: "130kg" } },
  { name: "LG RESU 10H 9.6kWh", category: "Battery", icon: Battery, desc: "9.6kWh lithium battery with 10-year warranty.", sku: "LG-10H", price: 5200, stock: 15, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "9.6kWh", type: "Li-ion NMC", voltage: "400V", cycles: "4000+", dod: "90%", warranty: "10 years", weight: "95kg" } },
  { name: "LG RESU 16H 16kWh", category: "Battery", icon: Battery, desc: "16kWh high-capacity battery with 95% DOD.", sku: "LG-16H", price: 7800, stock: 10, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "16kWh", type: "Li-ion NMC", voltage: "400V", cycles: "4000+", dod: "95%", warranty: "10 years", weight: "145kg" } },
  { name: "Sonnen 10kWh", category: "Battery", icon: Battery, desc: "10kWh lithium battery with intelligent energy management.", sku: "SN-10K", price: 6500, stock: 14, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "10kWh", type: "LiFePO4", voltage: "48V", cycles: "10000+", dod: "80%", warranty: "10 years", weight: "115kg" } },
  { name: "SolaX Power 3.3kWh", category: "Battery", icon: Battery, desc: "3.3kWh modular battery with wall-mount design.", sku: "SX-3.3K", price: 1100, stock: 92, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "3.3kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "90%", warranty: "10 years", weight: "38kg" } },
  { name: "SolaX Power 6.4kWh", category: "Battery", icon: Battery, desc: "6.4kWh lithium battery with 95% DOD capability.", sku: "SX-6.4K", price: 2100, stock: 65, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "6.4kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "95%", warranty: "10 years", weight: "72kg" } },
  { name: "Huawei LUNA2000-5kWh", category: "Battery", icon: Battery, desc: "5kWh lithium battery with smart BMS and 6000 cycles.", sku: "HW-5K", price: 1800, stock: 48, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "5kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "95%", warranty: "10 years", weight: "55kg" } },
  { name: "Huawei LUNA2000-10kWh", category: "Battery", icon: Battery, desc: "10kWh modular battery system with stackable design.", sku: "HW-10K", price: 3500, stock: 32, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "10kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "95%", warranty: "10 years", weight: "110kg" } },
  { name: "Alpha ESS Smile 5 5kWh", category: "Battery", icon: Battery, desc: "5kWh lithium battery with 10-year warranty.", sku: "AL-5K", price: 1650, stock: 55, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "5kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "90%", warranty: "10 years", weight: "52kg" } },
  { name: "Alpha ESS Smile 10 10kWh", category: "Battery", icon: Battery, desc: "10kWh battery system with app monitoring.", sku: "AL-10K", price: 3200, stock: 28, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "10kWh", type: "LiFePO4", voltage: "48V", cycles: "6000+", dod: "90%", warranty: "10 years", weight: "105kg" } },
  { name: "Enphase IQ Battery 5 3.36kWh", category: "Battery", icon: Battery, desc: "3.36kWh AC battery with plug-and-play installation.", sku: "EN-5", price: 2800, stock: 68, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "3.36kWh", type: "LiFePO4", voltage: "AC", cycles: "4000+", dod: "96%", warranty: "10 years", weight: "50kg" } },
  { name: "Enphase IQ Battery 10 10.08kWh", category: "Battery", icon: Battery, desc: "10.08kWh modular battery system with stackable design.", sku: "EN-10", price: 8400, stock: 22, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "10.08kWh", type: "LiFePO4", voltage: "AC", cycles: "4000+", dod: "96%", warranty: "10 years", weight: "150kg" } },
  { name: "SimpliPhi 3.5kWh", category: "Battery", icon: Battery, desc: "3.5kWh lithium iron phosphate battery with non-toxic chemistry.", sku: "SP-3.5K", price: 1950, stock: 42, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "3.5kWh", type: "LiFePO4", voltage: "48V", cycles: "10000+", dod: "100%", warranty: "10 years", weight: "45kg" } },
  { name: "SimpliPhi 4.9kWh", category: "Battery", icon: Battery, desc: "4.9kWh battery with 100% DOD and 10,000 cycles.", sku: "SP-4.9K", price: 2750, stock: 35, image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&h=600&fit=crop", specs: { capacity: "4.9kWh", type: "LiFePO4", voltage: "48V", cycles: "10000+", dod: "100%", warranty: "10 years", weight: "62kg" } },
];

export const Route = createFileRoute("/_public/products/$sku")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { sku } = Route.useParams();
  const product = products.find((p) => p.sku === sku);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                {product.category}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.desc}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="font-display text-4xl font-bold">${product.price.toLocaleString()}</div>
            <div className="text-muted-foreground">per unit</div>
          </div>

          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">
              {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="bg-gradient-solar text-primary-foreground hover:opacity-90 shadow-glow" 
              disabled={product.stock === 0}
              onClick={() => {
                addItem({
                  sku: product.sku,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category
                });
                toast.success(`${product.name} added to your quote`);
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Quote
            </Button>
            <Link to="/quote">
              <Button size="lg" variant="outline">
                Request Custom Quote
              </Button>
            </Link>
          </div>

          {/* Specifications */}
          <div className="rounded-2xl border border-border/60 bg-surface p-6">
            <h2 className="font-display text-xl font-bold">Specifications</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                  <span className="text-sm text-muted-foreground capitalize">{key}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface p-4">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Warranty Coverage</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {product.specs.warranty} manufacturer warranty
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface p-4">
              <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Free Delivery</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  On orders over $5,000
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface p-4">
              <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Quality Assured</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Tier-1 certified components
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface p-4">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Expert Support</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Technical assistance included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
