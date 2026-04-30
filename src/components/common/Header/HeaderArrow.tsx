'use client';

import { ArrowLeft } from "lucide-react";

export default function HeaderArrow(){
    
    return (
      <nav className="p-4 border-b">
        <button onClick={() => window.history.back()} className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para aventuras
        </button>
      </nav>
    );
}