"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [balance, setBalance] = useState(1.00);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const pi: any = (window as any).Pi;
    if (pi) pi.init({ version: "2.0" });
  }, []);

  const loginPi = async () => {
    const pi: any = (window as any).Pi;
    try {
      const auth = await pi.authenticate(["username","payments"], (p:any)=>p);
      setUser(auth.user);
    } catch(e){ alert("Connecte-toi dans Pi Browser") }
  };

  const Item = ({t,d,i}:any) => (
    <div className="flex items-center gap-4 bg-white border rounded-2xl p-4 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-[#eef3ff] flex items-center justify-center text-xl">{i}</div>
      <div><div className="font-bold text-[14px]">{t}</div><div className="text-[12px] text-gray-500">{d}</div></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-24">
      <div className="bg-[#1742d6] text-white p-4 flex justify-between items-center sticky top-0">
        <div><div className="font-black text-xl">Gargoura</div><div className="text-xs opacity-80">Gargoura Digital Bank</div></div>
        <div className="flex gap-3 text-lg"><span>⚙️</span><span>👤</span></div>
      </div>

      <div className="p-3 space-y-3">
        <div className="bg-white rounded-2xl p-5 border">
          <span className="bg-green-100 text-green-700 text-[11px] font-bold px-2 py-1 rounded">MODE MAINNET - Vrai Pi</span>
          <div className="text-sm mt-2">Solde Gargoura</div>
          <div className="text-4xl font-black text-green-700">{balance.toFixed(2)} Pi</div>
          <div className="text-xs text-gray-400 mt-1">{user? `Bonjour ${user.username}` : "Non connecté"}</div>
          <button onClick={()=>setBalance(balance+1)} className="w-full mt-3 bg-green-700 text-white py-3 rounded-xl font-bold">+ Deposer 1 Pi (Test)</button>
          <button onClick={loginPi} className="w-full mt-2 bg-[#1742d6] text-white py-3 rounded-xl font-bold">Connexion Pi Network</button>
        </div>

        <div className="text-[11px] font-bold text-gray-400">SERVICES BANCAIRES</div>
        <Item t="Mobile Money" d="Zone CEMAC & UEMOA" i="📱" />
        <Item t="Paiement Factures" d="Eau, Électricité, etc." i="🧾" />
        <Item t="Convertisseur" d="93 devises mondiales" i="💱" />

        <div className="text-[11px] font-bold text-gray-400 mt-2">TRADING & INVESTISSEMENTS</div>
        <Item t="Trading Pi" d="10 paires en temps réel" i="📈" />
        <Item t="Pi DEX & AMM" d="Échange décentralisé Web 3.0" i="🔗" />
        <Item t="Staking Crypto" d="12 cryptomonnaies" i="💹" />

        <div className="text-[11px] font-bold text-gray-400 mt-2">SÉCURITÉ & CONFORMITÉ</div>
        <Item t="E-Commerce" d="8 plateformes mondiales" i="🛒" />
        <Item t="Partenariat Automobile" d="18 marques disponibles" i="🚗" />
        <Item t="Sécurité" d="Protection avancée" i="🛡️" />
        <Item t="Conformité" d="Normes internationales" i="⚖️" />
        <Item t="Surveillance IA" d="Monitoring intelligent" i="🧠" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-[9px] text-gray-400">
        <div className="text-[#1742d6] font-bold text-center">🏠<br/>Accueil</div>
        <div className="text-center">⇄<br/>Paiements</div>
        <div className="text-center">📈<br/>Trading</div>
        <div className="text-center">🏦<br/>Services</div>
        <div className="text-center">🛡️<br/>Sécurité</div>
      </div>
    </div>
  )
}
