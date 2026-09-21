export function trackWhatsAppClick(origin: string, productName?: string) {
  // Abstract function to track clicks
  // In a real scenario, this could be Google Analytics, Facebook Pixel, etc.
  console.log(`[Analytics] WhatsApp click tracked - Origin: ${origin}${productName ? `, Product: ${productName}` : ""}`);
}
