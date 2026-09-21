export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  image: string;
};

export type BusinessHours = {
  open?: string; // HH:mm
  close?: string; // HH:mm
  closedAllDay?: boolean;
};

export const restaurante = {
  name: "Artesanal Burger",
  domain: "https://artesanalburger.exemplo.com", // Used for metadataBase
  cnpj: "12.345.678/0001-99",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  privacyPolicyUrl: "",
  colors: {
    primary: "#f59e0b", // Amber-500
    background: "#09090b", // Zinc-950
    foreground: "#fafafa", // Zinc-50
  },
  hero: {
    title: "O Verdadeiro Sabor do Hambúrguer Artesanal",
    subtitle: "Carne fresca todos os dias, blends exclusivos e entrega rápida em até 30 minutos.",
    backgroundImage: "/images/hero-burger.webp",
  },
  highlights: [
    {
      id: "1",
      name: "Classic Smash",
      description: "Pão brioche, 2 smash burgers 90g, queijo cheddar, picles e molho especial.",
      price: 32.90,
      image: "/images/burger-1.webp",
    },
    {
      id: "2",
      name: "Bacon Lovers",
      description: "Pão australiano, blend 160g, muito bacon crocante, cheddar inglês e cebola caramelizada.",
      price: 38.90,
      image: "/images/burger-2.webp",
    },
    {
      id: "3",
      name: "Veggie Master",
      description: "Pão brioche, hambúrguer de grão de bico 150g, queijo prato, alface, tomate e maionese verde.",
      price: 34.90,
      image: "/images/burger-3.webp",
    },
  ] as Product[],
  socialProof: {
    googleRating: 4.8,
    reviewsCount: 1250,
    yearsInBusiness: 5,
    ordersDelivered: 50000,
    testimonials: [
      {
        id: "t1",
        name: "Carlos Silva",
        text: "O melhor hambúrguer da cidade! Chega sempre quente e a entrega é super rápida.",
        image: "/images/avatar-1.webp",
      },
      {
        id: "t2",
        name: "Mariana Costa",
        text: "Ambiente incrível e sabor inigualável. O Bacon Lovers é sensacional.",
        image: "/images/avatar-2.webp",
      },
      {
        id: "t3",
        name: "João Pedro",
        text: "Sou cliente toda semana. Ingredientes de alta qualidade e atendimento nota 10.",
        image: "/images/avatar-3.webp",
      },
    ] as Testimonial[],
  },
  objections: {
    titles: {
      deliveryTime: "Entrega Rápida",
      deliveryFee: "Taxa de Entrega",
      paymentMethods: "Formas de Pagamento",
      coverage: "Área de Atendimento",
    },
    deliveryTime: "30-45 min",
    deliveryFee: "Grátis no centro",
    paymentMethods: "Pix, Cartão e Dinheiro",
    coverage: "Atendemos toda a cidade",
  },
  location: {
    address: "Rua das Delícias, 123 - Centro, São Paulo - SP",
    staticFacadeUrl: "/images/facade.webp",
  },
  // Record of BusinessHours where key is day of week (0 = Sunday, 1 = Monday, etc.)
  schedule: {
    0: { open: "18:00", close: "23:00" },
    1: { closedAllDay: true }, // Monday closed
    2: { open: "18:00", close: "01:00" },
    3: { open: "18:00", close: "01:00" },
    4: { open: "18:00", close: "01:00" },
    5: { open: "18:00", close: "02:00" }, // Friday
    6: { open: "18:00", close: "02:00" }, // Saturday
  } as Record<number, BusinessHours>,
  seo: {
    title: "Artesanal Burger | O Melhor Hambúrguer da Cidade",
    description: "Carne fresca todos os dias, blends exclusivos e entrega rápida. Peça agora pelo WhatsApp!",
    keywords: ["hambúrguer", "artesanal", "delivery", "burger", "comida"],
  }
};
