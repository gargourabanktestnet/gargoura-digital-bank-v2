"use client";
import { useState } from "react";
export default function GargouraMainnet() {
  const [solde, setSolde] = useState(1.00);
  const Card = ({ title, sub, icon }: any) => (
    <div className="bg-white border border-gray-200 rounded-[16px] p-4 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#1e40af] text-xl">{icon}</div>
      <div><div className="font-bold text-[15px]">{title}</div><div className="text-[13px] text-gray-500">{sub}</div></div>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-[90px]">
      <div className="bg-[#1e4bd8] text-white px-4 py-3"><div className="font-extrabold text-[22px]">Gargoura</div><div className="text-[13px]">Gargoura Digital Bank</div></div>
      <div className="p-3 space-y-4">
        <div className="bg-white rounded-[20px] p-5 border"><div className="bg-[#d1fae5] inline-block px-3 py-1 rounded-lg text-[12px] font-bold mb-2">MODE MAINNET - Vrai Pi</div><div className="text-[36px] font-extrabold text-[#15803d]">{solde.toFixed(2)} Pi</div><button onClick={()=>setSolde(solde+1)} className="w-full bg-[#15803d] text-white py-3 rounded-xl mt-3 font-bold">+ Deposer 1 Pi</button></div>
        <Card title="Mobile Money" sub="Zone CEMAC & UEMOA" icon="📱" />
        <Card title="Trading Pi" sub="10 paires en temps réel" icon="📈" />
        <Card title="Sécurité" sub="Protection avancée" icon="🛡️" />
      </div>
    </div>
  );
      }
