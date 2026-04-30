import { Adventure, PriceTable } from '@/types/Adventure';
import { Calendar, Users, MapPin, Info, CheckCircle2, Flame } from 'lucide-react';
import { EnrollButton } from '../Buttons/EnrollButton';

export function AdventureCard({ adventure }: { adventure: Adventure }) {
  const currentParticipants = adventure.members?.length || 0;
  const isFull = currentParticipants >= adventure.maxPeople;
  const isConfirmed = currentParticipants >= adventure.minPeople;
  
  // Busca a menor tarifa na priceTable para exibir no cenário 2 e 3
  const minPossibleTariff = Math.min(...adventure.priceTable.map((p: PriceTable) => p.price));
  const missingToConfirm = adventure.minPeople - currentParticipants;
  
  // Lógica para encontrar quantos faltam para baixar o preço (Cenário 2)
  const nextTier = adventure.priceTable
    .filter((p: PriceTable) => p.persons > currentParticipants)
    .sort((a: PriceTable, b: PriceTable) => a.persons - b.persons)[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-800">{adventure.name}</h3>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            isFull ? 'bg-red-100 text-red-700' : isConfirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isFull ? 'Esgotado' : isConfirmed ? 'Confirmado' : 'Em formação'}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-slate-500 gap-2 text-sm">
            <MapPin size={14} /> <span>{adventure.destination}</span>
          </div>
          <div className="flex items-center text-slate-500 gap-2 text-sm">
            <Calendar size={14} /> 
            <span>{new Date(adventure.startDate).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* --- SEÇÃO DE MENSAGENS DINÂMICAS --- */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 mb-6 text-sm leading-relaxed">
          {isFull ? (
            <div className="text-slate-600 flex gap-2">
              <Info size={18} className="text-slate-400 shrink-0" />
              <p>Esta aventura já atingiu o limite máximo de participantes. Fique de olho para novas datas!</p>
            </div>
          ) : !isConfirmed ? (
            <div className="text-amber-800 flex gap-2">
              <Users size={18} className="text-amber-600 shrink-0" />
              <p>
                Esta saída precisa de <strong>{adventure.minPeople} pessoas</strong> para ser confirmada. 
                Já temos {currentParticipants} viajantes interessados. 
                Faltam apenas <strong>{missingToConfirm}</strong> para garantir a aventura!
              </p>
            </div>
          ) : currentParticipants < adventure.maxPeople && nextTier ? (
            <div className="text-emerald-800 flex gap-2">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <p>
                🎉 <strong>Saída Confirmada!</strong> O valor atual é de {formatCurrency(adventure.minTariff)} por pessoa, mas pode ficar ainda melhor. 
                Faltam {nextTier.persons - currentParticipants} pessoas para atingir a tarifa mínima de <strong>{formatCurrency(minPossibleTariff)}</strong>.
              </p>
            </div>
          ) : (
            <div className="text-indigo-800 flex gap-2">
              <Flame size={18} className="text-indigo-600 shrink-0" />
              <p>
                🔥 <strong>Tarifa mínima atingida!</strong> O grupo garantiu o melhor valor de 
                <strong> {formatCurrency(minPossibleTariff)}</strong> por pessoa. Junte-se antes que as vagas acabem!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <EnrollButton adventureId={adventure.id} members={adventure.members} status={adventure.status} isHomePage={true}/>
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}