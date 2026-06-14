import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; 

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Condomínio Residencial Vida Nova',
  description: 'Sistema Inteligente de Gestão de Encomendas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-slate-900" suppressHydrationWarning>
        
        {/* CABEÇALHO */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0">
          <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo icon (abstract tree shape) */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 via-blue-400 to-pink-500 flex items-center justify-center overflow-hidden">
                 <div className="w-4 h-6 bg-[#5D4037] rounded-sm mt-3" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl md:text-2xl text-[#2E1065] tracking-tight leading-none">
                  Vida Nova
                </h1>
                <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Gestão de Encomendas
                </p>
              </div>
            </div>
            {/* Opcional: Info de status (como no bento grid design) */}
            <div className="hidden md:flex items-center gap-4">
               <div className="text-right">
                 <p className="text-xs font-bold text-slate-700">Painel do Sistema</p>
                 <p className="text-[10px] text-slate-400">Ativo • Online</p>
               </div>
               <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                  <span className="material-symbols-outlined shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
               </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* RODAPÉ COM DADOS DO CLIENTE */}
        <footer className="bg-white border-t border-slate-200 mt-auto shrink-0">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 uppercase tracking-wider font-semibold text-center md:text-left">
              <span>Condomínio Residencial Vida Nova</span>
              <span className="hidden md:inline">•</span>
              <span>Estrada São Francisco, 1900 • Taboão da Serra-SP</span>
              <span className="hidden md:inline">•</span>
              <span>CNPJ: 04.743.808/0001-10</span>
            </div>
            <div className="flex items-center justify-center gap-2 font-semibold uppercase tracking-wider mt-2 md:mt-0">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Sistema Online • Versão 1.2.0</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
