'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HeaderArrowProps {
  message?: string;
}

export default function HeaderArrow({
  message
}:HeaderArrowProps){
    
    return (
      <nav className="p-4 ">
        <Link href={`/`} className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
          <ArrowLeft className="mr-2 h-5 w-5" />
          {message ?? "Voltar para aventuras"}
        </Link>
      </nav>
    );
}