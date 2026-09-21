"use client";

import { useState } from "react";
import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Localizacao() {
  const [showIframe, setShowIframe] = useState(false);

  // Generate directions URL (Google Maps format based on address)
  const encodedAddress = encodeURIComponent(restaurante.location.address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const embedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-display">Nossa Localização</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Venha nos visitar e conhecer o espaço!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800">
        
        {/* Info Column */}
        <div className="p-8 md:p-12 flex flex-col items-center md:items-start text-center md:text-left">
          <MapPin className="w-12 h-12 text-primary mb-6" />
          <h3 className="text-2xl font-bold mb-4">{restaurante.name}</h3>
          <p className="text-lg text-zinc-300 mb-8 max-w-md">
            {restaurante.location.address}
          </p>
          <Button 
            asChild
            size="lg" 
            className="w-full sm:w-auto bg-primary text-background hover:bg-primary/90 font-bold h-12 px-8"
          >
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Como chegar
            </a>
          </Button>
        </div>

        {/* Map Column */}
        <div className="relative h-[300px] md:h-full w-full min-h-[300px] bg-zinc-800">
          {!showIframe ? (
            <div 
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setShowIframe(true)}
              role="button"
              tabIndex={0}
              aria-label="Carregar mapa interativo"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowIframe(true);
                }
              }}
            >
              <Image 
                src={restaurante.location.staticFacadeUrl} 
                alt="Fachada do restaurante" 
                fill 
                className="object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                <div className="bg-black/80 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm border border-white/20">
                  Ver no mapa interativo
                </div>
              </div>
            </div>
          ) : (
            <iframe 
              src={embedUrl} 
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de localização do restaurante"
            />
          )}
        </div>
      </div>
    </section>
  );
}
