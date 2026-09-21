import { Clock, MapPin, CreditCard, Bike } from "lucide-react";
import { restaurante } from "@/config/restaurante";

export function Objecoes() {
  const { objections } = restaurante;

  const items = [
    {
      icon: <Clock className="w-8 h-8 mb-4 text-[#f59e0b]" />,
      title: "Entrega Rápida",
      description: objections.deliveryTime,
    },
    {
      icon: <Bike className="w-8 h-8 mb-4 text-[#f59e0b]" />,
      title: "Taxa Justa",
      description: objections.deliveryFee,
    },
    {
      icon: <CreditCard className="w-8 h-8 mb-4 text-[#f59e0b]" />,
      title: "Pagamento Facilitado",
      description: objections.paymentMethods,
    },
    {
      icon: <MapPin className="w-8 h-8 mb-4 text-[#f59e0b]" />,
      title: "Área de Cobertura",
      description: objections.coverage,
    },
  ];

  return (
    <section className="py-16 bg-[#f59e0b]/10 border-y border-[#f59e0b]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.icon}
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
