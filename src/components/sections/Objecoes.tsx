import { Clock, MapPin, CreditCard, Bike } from "lucide-react";
import { restaurante } from "@/config/restaurante";

export function Objecoes() {
  const { objections } = restaurante;

  const items = [
    {
      icon: <Clock className="w-8 h-8 mb-4 text-primary" />,
      title: objections.titles.deliveryTime,
      description: objections.deliveryTime,
    },
    {
      icon: <Bike className="w-8 h-8 mb-4 text-primary" />,
      title: objections.titles.deliveryFee,
      description: objections.deliveryFee,
    },
    {
      icon: <CreditCard className="w-8 h-8 mb-4 text-primary" />,
      title: objections.titles.paymentMethods,
      description: objections.paymentMethods,
    },
    {
      icon: <MapPin className="w-8 h-8 mb-4 text-primary" />,
      title: objections.titles.coverage,
      description: objections.coverage,
    },
  ];

  return (
    <section className="py-16 bg-primary/10 border-y border-primary/20">
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
