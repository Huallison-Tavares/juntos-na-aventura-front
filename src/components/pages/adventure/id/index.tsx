  import { EnrollButton } from '@/components/common/Buttons/EnrollButton';
  import HeaderArrow from '@/components/common/Header/HeaderArrow';
  import { LeaderPaymentAlert } from '@/components/common/LeaderPaymentAlert';
  import { getAdventureById } from '@/services/adventures';
  import { Adventure } from '@/types/Adventure';
  import { Calendar, Users, MapPin, Info } from 'lucide-react';
import { notFound } from 'next/navigation';

  interface AdventurePageProps {
    id: string;
  }
  export default async function AdventureDetailsPage({id} : AdventurePageProps) {
    const adventureId = Number(id);
    if (isNaN(adventureId)) {
      notFound();
    }

    let adventure: Adventure;

    try{
      adventure = await getAdventureById(adventureId);
    }catch {
      notFound();
    }

    const currentMembersCount = adventure.members?.length || 1;

    const applicablePrices = adventure.priceTable
      .filter(item => currentMembersCount >= item.persons)
      .sort((a, b) => b.persons - a.persons);

    const currentIndividualValue = applicablePrices.length > 0 
      ? applicablePrices[0].price 
      : adventure.minTariff;

    const statusConfig = {
      pending_group: { label: 'Aguardando Grupo', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmado', color: 'bg-green-100 text-green-800' },
      full: { label: 'Esgotado', color: 'bg-red-100 text-red-800' },
    };

    return (
      <div className="min-h-screen bg-white">
        {/* Header de Navegação */}
        <HeaderArrow />

        <LeaderPaymentAlert
          adventureId={adventure.id}
          creatorId={adventure.creatorId}
          paymentStatus={adventure.paymentStatus}
        />

        <main className="max-w-5xl mx-auto py-8 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Coluna da Esquerda: Informações Principais */}
            <div className="lg:col-span-2 space-y-8">
              <header>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusConfig[adventure.status].color}`}>
                  {statusConfig[adventure.status].label}
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 mt-4">{adventure.name}</h1>
                <div className="flex items-center text-slate-500 mt-2 text-lg">
                  <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                  {adventure.destination}
                </div>
              </header>

              <div className="aspect-video w-full bg-slate-200 rounded-2xl overflow-hidden relative">
                {/* Espaço para imagem principal */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    Imagem do Destino
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">Sobre a Aventura</h2>
                <p className="text-slate-600 leading-relaxed">
                  Prepare-se para uma jornada inesquecível em {adventure.destination}. 
                  Esta expedição foi desenhada para quem busca conexão com a natureza e 
                  novas amizades. O roteiro inclui trilhas, pontos históricos e vivências locais.
                </p>
              </section>

              {/* Tabela de Preços Progressiva */}
              <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-indigo-500" />
                  Preços por tamanho do grupo
                </h3>
                <div className="space-y-3">
                  {adventure.priceTable.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                      <span className="text-slate-600 font-medium">A partir de {item.persons} pessoas</span>
                      <span className="text-lg font-bold text-slate-900">
                        R$ {item.price.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 italic">
                  * Quanto mais pessoas entrarem no grupo, menor o valor para todos!
                </p>
              </section>
            </div>

            {/* Coluna da Direita: Card de Ação (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 border border-slate-200 rounded-2xl p-6 shadow-lg bg-white space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center text-slate-700">
                    <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Data</p>
                      <p className="text-sm font-medium">
                        {new Date(adventure.startDate).toLocaleDateString('pt-BR')} até {new Date(adventure.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-700">
                    <Users className="mr-3 h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Capacidade</p>
                      <p className="text-sm font-medium">{adventure.minPeople} a {adventure.maxPeople} pessoas</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 mb-1">Valor atual individual</p>
                  <p className="text-3xl font-black text-indigo-600">
                    R$ {currentIndividualValue.toLocaleString('pt-BR')}
                  </p>
                </div>

                <EnrollButton
                  adventureId={adventure.id}
                  status={adventure.status}
                  members={adventure.members} 
                  paymentStatus={!adventure.paymentStatus}
            />
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }