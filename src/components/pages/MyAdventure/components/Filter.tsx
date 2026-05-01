import { ShieldCheck, Users } from "lucide-react";
import { AdventureTab } from "..";

interface MyAdventureFilterProps {
    activeTab: AdventureTab;
    setActiveTab: React.Dispatch<React.SetStateAction<AdventureTab>>;
}

export function MyAdventureFilter({
    activeTab,
    setActiveTab
}: MyAdventureFilterProps) {
    return (
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-8 w-fit">
            {[
                { id: 'all', label: 'Todas', icon: null },
                { id: 'leader', label: 'Eu Lidero', icon: <ShieldCheck className="h-4 w-4" /> },
                { id: 'participant', label: 'Participando', icon: <Users className="h-4 w-4" /> },
            ].map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdventureTab)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
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
    )
}