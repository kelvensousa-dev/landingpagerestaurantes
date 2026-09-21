"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink, getPrefilledMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide floating button when Hero's main WhatsApp button is visible
    const heroBtn = document.querySelector(".hero-wa-btn");
    
    if (!heroBtn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroBtn);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={generateWhatsAppLink(getPrefilledMessage("floating"))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating")}
      aria-label="Falar conosco no WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-black/20 hover:scale-110 transition-transform hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] motion-safe:animate-[pulse-ring_8s_ease-in-out_infinite]"
    >
      <MessageCircle className="w-8 h-8" />
      {/* 
        Custom animation defined in globals.css 
        @keyframes pulse-ring {
          0%, 10% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          15% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          20%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      */}
    </a>
  );
}
