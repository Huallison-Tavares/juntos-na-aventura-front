'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Compass, ShieldCheck, Users, Calendar, MapPin, ArrowRight, Plus } from 'lucide-react'; // Adicionei o ícone Plus
import Link from 'next/link';
import { getAdventureByUser } from '@/services/adventures';
import { Adventure } from '@/types/Adventure';
import HeaderArrow from '@/components/common/Header/HeaderArrow';

export default function MyAdventuresPage() {
  const { user, loading: authLoading } = useAuth();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'leader' | 'participant'>('all');

  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          setLoading(true);
          const adventuresByUser = await getAdventureByUser(user.id);
          setAdventures(adventuresByUser);
        } catch (error) {
          console.error("Erro ao carregar aventuras:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [user]);

  const filteredAdventures = adventures.filter(adv => {
    if (activeTab === 'all') return true;
    const isLeader = adv.creatorId == user?.id;
    if (activeTab == "leader" && isLeader) return true;
    if (activeTab == "participant" && !isLeader) return true;
    return false;
  });

  if (authLoading || loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando suas expedições...</div>;
  }

  return (
    <>
      <HeaderArrow />
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER COM BOTÃO DE CRIAR */}
          <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                <Compass className="text-indigo-600 h-8 w-8" />
                Minhas Aventuras
              </h1>
              <p className="text-slate-500 mt-2">Gerencie as expedições que você lidera ou participa.</p>
            </div>

            <Link 
              href="/adventure/create" 
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:scale-95 text-sm"
            >
              <Plus className="h-5 w-5" />
              Nova Aventura
            </Link>
          </header>

          {/* Filtros (Tabs) */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-8 w-fit">
            {[
              { id: 'all', label: 'Todas', icon: null },
              { id: 'leader', label: 'Eu Lidero', icon: <ShieldCheck className="h-4 w-4" /> },
              { id: 'participant', label: 'Participando', icon: <Users className="h-4 w-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'leader' | 'participant')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lista de Aventuras */}
          {filteredAdventures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAdventures.map((adv) => (
                <Link 
                  key={adv.id} 
                  href={`/adventure/${adv.id}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Badge de Role */}
                  <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest ${
                    adv.creatorId == user?.id ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {adv.creatorId == user?.id ? 'Líder' : 'Membro'}
                  </div>

                  {/* Status de Pagamento */}
                  {adv.creatorId == user?.id && (
                    <div className={`absolute top-8 right-4 flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase transition-all ${
                      adv.paymentStatus 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                        : 'bg-rose-50 border-rose-100 text-rose-600 animate-pulse'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${adv.paymentStatus ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {adv.paymentStatus ? 'Depósito Pago' : 'Pagamento Pendente'}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pr-24">
                    {adv.name}
                  </h3>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                      {adv.destination}
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                      {new Date(adv.startDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      adv.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {adv.status === 'confirmed' ? 'Confirmada' : 'Em formação'}
                    </span>

                    <div className="text-indigo-600 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Nenhuma aventura encontrada nesta categoria.</p>
              <Link href={activeTab == 'leader' ? "/adventure/create" : "/"} className="text-indigo-600 font-bold mt-4 inline-block hover:underline">
                {activeTab == "leader" ? "Criar uma nova aventura" : "Explorar novas aventuras"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}