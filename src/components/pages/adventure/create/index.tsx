"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import HeaderArrow from "@/components/common/Header/HeaderArrow";

interface PriceEntry {
  persons: number;
  price: number;
}

export default function CreateAdventurePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minPeople, setMinPeople] = useState(1);
  const [maxPeople, setMaxPeople] = useState(10);
  const [priceTable, setPriceTable] = useState<PriceEntry[]>([
    { persons: 1, price: 0 },
  ]);

  // Funções para manipular a tabela de preços dinâmica
  const addPriceRow = () =>
    setPriceTable([...priceTable, { persons: 1, price: 0 }]);

  const removePriceRow = (index: number) => {
    if (priceTable.length > 1) {
      setPriceTable(priceTable.filter((_, i) => i !== index));
    }
  };

  const updatePriceRow = (
    index: number,
    field: keyof PriceEntry,
    value: number,
  ) => {
    const newTable = [...priceTable];
    newTable[index][field] = value;
    setPriceTable(newTable);
  };

  const calculatedMinTariff =
    priceTable.length > 0
      ? Math.min(...priceTable.map((item) => item.price))
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Você precisa estar logado!");

    setLoading(true);

    const adventureData = {
      name,
      destination,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      minPeople: Number(minPeople),
      maxPeople: Number(maxPeople),
      priceTable, // Enviado como JSON para o jsonb do Drizzle
      minTariff: calculatedMinTariff,
      creatorId: user.id,
      status: "pending_group",
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + "/api/adventure/adventures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adventureData),
      });

      if (response.ok) {
        alert("Aventura criada com sucesso!");
        router.push("/");
      } else {
        throw new Error("Erro ao salvar");
      }
    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar aventura.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <HeaderArrow />

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white">
            <h1 className="text-2xl font-black">Criar Nova Expedição</h1>
            <p className="text-indigo-100 opacity-80">
              Preencha os detalhes para abrir uma nova aventura.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Nome da Aventura
                </label>
                <div className="relative">
                  <Compass className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Trilha das Sete Quedas"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Destino
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ex: Chapada dos Veadeiros"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Data de Início
                </label>
                <input
                  required
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Data de Término
                </label>
                <input
                  required
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Configuração de Grupo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Mín. Pessoas
                </label>
                <input
                  type="number"
                  value={minPeople}
                  onChange={(e) => setMinPeople(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Máx. Pessoas
                </label>
                <input
                  type="number"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Menor Tarifa Detectada (R$)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-indigo-500 font-bold">
                    R$
                  </div>
                  <input
                    type="number"
                    value={calculatedMinTariff}
                    readOnly // Impede que o usuário mude manualmente
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700 font-black outline-none cursor-not-allowed"
                    placeholder="Calculado automaticamente..."
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  * Baseado no menor valor inserido na tabela progressiva
                  abaixo.
                </p>
              </div>
            </div>

            {/* Tabela de Preços Progressiva (JSONB) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Tabela de Preços Progressiva
                </label>
                <button
                  type="button"
                  onClick={addPriceRow}
                  className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Adicionar Faixa
                </button>
              </div>

              <div className="space-y-3">
                {priceTable.map((row, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Qtd Pessoas"
                        value={row.persons}
                        onChange={(e) =>
                          updatePriceRow(
                            index,
                            "persons",
                            Number(e.target.value),
                          )
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Preço Individual"
                        value={row.price}
                        onChange={(e) =>
                          updatePriceRow(index, "price", Number(e.target.value))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePriceRow(index)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                "Salvando..."
              ) : (
                <>
                  <Save size={20} /> Publicar Aventura
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Compass = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
