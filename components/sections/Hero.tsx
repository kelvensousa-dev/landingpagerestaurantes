"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateWhatsAppLink, getPrefilledMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { isOpen } from "@/lib/time";
import { Clock } from "lucide-react";

export function Hero() {
  const [openStatus, setOpenStatus] = useState<boolean | null>(null);

  useEffect(() => {
    // Calcular apenas no cliente para evitar hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenStatus(isOpen(new Date()));
    
    // Atualizar a cada minuto
    const interval = setInterval(() => {
      setOpenStatus(isOpen(new Date()));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("hero");
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const dest = document.getElementById("destaques");
    if (dest) {
      dest.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={restaurante.hero.backgroundImage}
          alt={`Fundo do restaurante ${restaurante.name}`}
          fill
          priority
          className="object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <Badge 
          variant={openStatus === null ? "secondary" : openStatus ? "success" : "secondary"} 
          className="mb-6 py-1 px-4 text-sm gap-2"
        >
          <Clock className="w-4 h-4" />
          {openStatus === null ? "Verificando..." : openStatus ? "Aberto agora" : "Fechado agora"}
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50 mb-4 font-display">
          {restaurante.hero.title}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
          {restaurante.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button 
            asChild
            size="lg" 
            className="text-base font-bold bg-[#f59e0b] text-[#09090b] hover:bg-[#f59e0b]/90 h-14 px-8 w-full sm:w-auto hero-wa-btn"
          >
            <a 
              href={generateWhatsAppLink(getPrefilledMessage("hero"))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
            >
              Pedir no WhatsApp
            </a>
          </Button>
          
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="text-base h-14 px-8 w-full sm:w-auto"
          >
            <a href="#destaques" onClick={handleMenuClick}>
              Ver cardápio
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
