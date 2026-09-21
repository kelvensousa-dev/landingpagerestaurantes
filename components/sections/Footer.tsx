import { restaurante } from "@/config/restaurante";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 py-12 px-4 border-t border-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold font-display text-zinc-50 mb-2">{restaurante.name}</span>
          <span>CNPJ: 00.000.000/0001-00</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-[#f59e0b] transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="hover:text-[#f59e0b] transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
          <span>&copy; {currentYear} {restaurante.name}. Todos os direitos reservados.</span>
          <a href="#" className="hover:text-zinc-50 underline underline-offset-4">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
