"use client";

import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink, getPrefilledMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function Destaques() {
  return (
    <section id="destaques" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-display">Mais Pedidos</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Os favoritos da casa, preparados com ingredientes frescos e muito carinho.
        </p>
      </div>

      {/* Grid for desktop, horizontal scroll for mobile */}
      <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar">
        {restaurante.highlights.map((product) => (
          <Card key={product.id} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-t-xl bg-zinc-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="flex-grow">
              <div className="flex justify-between items-start gap-4 mb-2">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <span className="font-bold text-[#f59e0b] whitespace-nowrap">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <CardDescription className="text-sm">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                asChild 
                className="w-full bg-[#f59e0b] text-[#09090b] hover:bg-[#f59e0b]/90 font-semibold"
                onClick={() => trackWhatsAppClick("product", product.name)}
              >
                <a 
                  href={generateWhatsAppLink(getPrefilledMessage("product", product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir este
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
