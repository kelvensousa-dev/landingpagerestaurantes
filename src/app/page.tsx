import { Hero } from "@/components/sections/Hero";
import { Destaques } from "@/components/sections/Destaques";
import { ProvaSocial } from "@/components/sections/ProvaSocial";
import { Objecoes } from "@/components/sections/Objecoes";
import { Localizacao } from "@/components/sections/Localizacao";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Destaques />
      <ProvaSocial />
      <Objecoes />
      <Localizacao />
      <ChamadaFinal />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
