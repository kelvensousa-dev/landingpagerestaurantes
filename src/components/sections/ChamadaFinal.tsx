"use client";

import { Button } from "@/components/ui/button";
import { generateWhatsAppLink, getPrefilledMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Smartphone } from "lucide-react";

export function ChamadaFinal() {
  return (
    <section className="py-24 bg-primary text-background text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 font-display">
          Bateu aquela fome?
        </h2>
        <p className="text-xl md:text-2xl font-medium mb-10 opacity-90 max-w-xl mx-auto">
          Não passe vontade. Faça seu pedido agora e receba em casa com a mesma qualidade de sempre!
        </p>
        
        <Button 
          asChild
          size="lg" 
          className="text-lg font-bold bg-background text-foreground hover:bg-background/80 h-16 px-10 rounded-full shadow-xl shadow-black/20 hover:scale-105 transition-transform"
        >
          <a 
            href={generateWhatsAppLink(getPrefilledMessage("final_call"))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("final_call")}
          >
            <Smartphone className="w-6 h-6 mr-2" />
            Pedir no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}
