'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  Compass, 
  Map, 
  User, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle = useMemo(() => {
    return (path: string) =>
      `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === path
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`;
  }, [pathname]);
  
  if (loading) {
    return <div className="h-16 bg-white border-b" />;
  }

  const firstName = user?.name?.split(' ')[0] || 'Usuário';

  const handleNavigation = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" onClick={handleNavigation} className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Juntos na <span className="text-indigo-600">Aventura</span>
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className={linkStyle('/')}>
              <Map className="h-4 w-4" />
              Explorar Aventuras
            </Link>

            {isAuthenticated && (
              <Link href="/my-adventures" className={linkStyle('/my-adventures')}>
                <Compass className="h-4 w-4" />
                Minhas Aventuras
              </Link>
            )}

            <div className="h-6 w-[1px] bg-slate-200 mx-2" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                    <User className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold">{firstName}</span>
                </div>

                <button 
                  onClick={logout}
                  aria-label="Sair"
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
              >
                Entrar
              </Link>
            )}
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="Abrir menu"
              className="p-2 text-slate-600"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 shadow-xl">
          <Link href="/" className={linkStyle('/')} onClick={handleNavigation}>
            Explorar Aventuras
          </Link>

          {isAuthenticated && (
            <Link 
              href="/my-adventures" 
              className={linkStyle('/my-adventures')} 
              onClick={handleNavigation}
            >
              Minhas Aventuras
            </Link>
          )}

          {!isAuthenticated && (
            <Link 
              href="/login" 
              onClick={handleNavigation}
              className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-bold"
            >
              Entrar
            </Link>
          )}

          {isAuthenticated && (
            <button 
              onClick={() => {
                logout();
                handleNavigation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium border border-red-100 rounded-lg"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          )}
        </div>
      )}
    </header>
  );
}