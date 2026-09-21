"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { restaurante } from "@/config/restaurante";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Counter({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime: number | null = null;
        
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          setCount(Math.floor(progress * end));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold font-display text-[#f59e0b]">
      {count.toLocaleString('pt-BR')}{suffix}
    </div>
  );
}

export function ProvaSocial() {
  const { socialProof } = restaurante;

  return (
    <section className="py-20 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-16">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex gap-1 text-[#f59e0b] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-current w-8 h-8" />
              ))}
            </div>
            <div className="text-2xl font-bold">{socialProof.googleRating} de 5 no Google</div>
            <div className="text-zinc-400">Baseado em +{socialProof.reviewsCount} avaliações</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <Counter end={socialProof.ordersDelivered} suffix="+" />
              <div className="text-sm text-zinc-400 uppercase tracking-wider mt-2">Pedidos Entregues</div>
            </div>
            <div>
              <Counter end={socialProof.yearsInBusiness} suffix=" anos" />
              <div className="text-sm text-zinc-400 uppercase tracking-wider mt-2">De Tradição</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Counter end={socialProof.reviewsCount} suffix="+" />
              <div className="text-sm text-zinc-400 uppercase tracking-wider mt-2">Clientes Satisfeitos</div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 hide-scrollbar">
          {socialProof.testimonials.map((t) => (
            <Card key={t.id} className="min-w-[85vw] sm:min-w-[320px] md:min-w-[350px] snap-center bg-zinc-900 border-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="flex text-[#f59e0b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-current w-3 h-3" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 italic">&quot;{t.text}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
