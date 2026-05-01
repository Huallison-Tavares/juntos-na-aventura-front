import Link from 'next/link';
import { Compass, Map, ArrowLeft } from 'lucide-react';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  titlePage: "404 - Rota Perdida",
  description: "Parece que você saiu da trilha. Não se preocupe, vamos te ajudar a encontrar o caminho de volta.",
  noIndex: true
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Ícone Decorativo */}
      <div className="relative mb-8">
        <Map className="w-24 h-24 text-slate-200 animate-pulse" />
        <Compass className="w-12 h-12 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
      </div>

      {/* Texto de Erro */}
      <h1 className="text-9xl font-bold text-slate-900">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mt-4">
        Ops! Você saiu da trilha.
      </h2>
      <p className="text-slate-600 mt-2 mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida para uma nova expedição. 
        Que tal voltar para o acampamento principal?
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>
        
        <Link
          href="/adventures"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Explorar Aventuras
        </Link>
      </div>

      {/* Rodapé decorativo */}
      <div className="absolute bottom-8 text-slate-400 text-sm">
        Juntos na Viagem &copy; {new Date().getFullYear()} — Explore o mundo conosco.
      </div>
    </div>
  );
}