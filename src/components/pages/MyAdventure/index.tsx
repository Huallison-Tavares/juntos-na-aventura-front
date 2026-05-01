'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { getAdventureByUser } from '@/services/adventures';
import { Adventure } from '@/types/Adventure';
import HeaderArrow from '@/components/common/Header/HeaderArrow';
import { MyAdventureHeader } from './components/Header';
import { MyAdventureFilter } from './components/Filter';
import { MyAdventureCard } from './components/AdventureCard';

export type AdventureTab = 'all' | 'leader' | 'participant';

export default function MyAdventuresPage() {
  const { user, loading: authLoading } = useAuth();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdventureTab>('all');

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
          <MyAdventureHeader />

          {/* Filtros (Tabs) */}
          <MyAdventureFilter activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Lista de Aventuras */}
          {filteredAdventures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAdventures.map((adv) => (
                <MyAdventureCard 
                  key={adv.id}
                  adventure={adv}
                  user={user}
                /> 
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