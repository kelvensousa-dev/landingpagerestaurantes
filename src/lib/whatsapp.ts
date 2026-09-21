import { restaurante } from "../config/restaurante";

export function generateWhatsAppLink(message: string): string {
  const number = restaurante.whatsappNumber;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function getPrefilledMessage(origin: string, productName?: string): string {
  switch (origin) {
    case "hero":
      return "Olá! Gostaria de fazer um pedido.";
    case "product":
      return `Olá! Gostaria de pedir um ${productName}.`;
    case "final_call":
      return "Olá! Vi o site e quero fazer um pedido.";
    case "floating":
      return "Olá! Gostaria de tirar uma dúvida ou fazer um pedido.";
    default:
      return "Olá! Gostaria de fazer um pedido.";
  }
}
