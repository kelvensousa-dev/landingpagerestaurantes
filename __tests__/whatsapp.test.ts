import { describe, it, expect } from 'vitest';
import { generateWhatsAppLink, getPrefilledMessage } from '../src/lib/whatsapp';
import { restaurante } from '../src/config/restaurante';

describe('WhatsApp Link Generator', () => {
  it('should generate a valid whatsapp link with encoded message', () => {
    const message = "Olá! Gostaria de fazer um pedido.";
    const link = generateWhatsAppLink(message);
    const expected = `https://wa.me/${restaurante.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido.`;
    expect(link).toBe(expected);
  });

  it('should generate correct prefilled message for hero', () => {
    expect(getPrefilledMessage('hero')).toBe("Olá! Gostaria de fazer um pedido.");
  });

  it('should generate correct prefilled message for a product', () => {
    expect(getPrefilledMessage('product', 'Classic Smash')).toBe("Olá! Gostaria de pedir um Classic Smash.");
  });

  it('should generate correct prefilled message for final call', () => {
    expect(getPrefilledMessage('final_call')).toBe("Olá! Vi o site e quero fazer um pedido.");
  });

  it('should generate correct prefilled message for floating button', () => {
    expect(getPrefilledMessage('floating')).toBe("Olá! Gostaria de tirar uma dúvida ou fazer um pedido.");
  });
});
