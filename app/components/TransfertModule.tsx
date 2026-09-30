"use client";
import { useState } from "react";

export default function TransfertModule() {
  const [tab, setTab] = useState<"interne" | "externe">("interne");
  const [deviseType, setDeviseType] = useState<"crypto" | "locale">("crypto");
  const [montant, setMontant] = useState("");

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-0">
      {/* Tabs P2P Interne / Externe */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-full mb-4">
        <button
          onClick={() => setTab("interne")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition ${
            tab === "interne" ? "bg-white shadow text-[#1e40af]" : "text-gray-600"
          }`}
        >
          📞 P2P Interne
        </button>
        <button
          onClick={() => setTab("externe")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-bold transition ${
            tab === "externe" ? "bg-white shadow text-[#1e40af]" : "text-gray-600"
          }`}
        >
          🌐 P2P Externe
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {tab === "interne" ? (
          <>
            <h3 className="font-bold text-lg mb-4">Transfert Interne Gargoura</h3>
            
            <label className="text-sm font-semibold">Destinataire</label>
            <div className="flex gap-2 mb-3">
              <input placeholder="Numéro de téléphone ou ID" className="flex-1 border rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#1e40af]" />
              <button className="w-10 h-10 rounded-full border flex items-center justify-center">⊞</button>
            </div>

            <label className="text-sm font-semibold">Cryptomonnaie</label>
            <select className="w-full border rounded-full px-4 py-2.5 text-sm mb-3">
              <option>π PiCoin (314,159.00 USD)</option>
            </select>

            <label className="text-sm font-semibold">Montant</label>
            <input value={montant} onChange={e=>setMontant(e.target.value)} placeholder="0.00" className="w-full border rounded-full px-4 py-2.5 text-sm mb-3" />

            <label className="text-sm font-semibold">Note (optionnel)</label>
            <input placeholder="Ajouter une note" className="w-full border rounded-full px-4 py-2.5 text-sm mb-4" />

            <button className="w-full bg-[#1e40af] text-white font-bold py-3 rounded-full hover:bg-blue-800">
              Envoyer
            </button>
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg">Transfert Externe</h3>
            <p className="text-xs text-[#1e40af] font-semibold mb-4 mt-1">🏦 Conforme ISO 20022 • SWIFT • SEPA</p>
            
            <label className="text-sm font-semibold">Banque Partenaire</label>
            <select className="w-full border rounded-full px-4 py-2.5 text-sm mb-3">
              <option>Choisir une banque</option>
              <option>BEAC - CEMAC</option>
              <option>BCEAO - UEMOA</option>
              <option>SAMA - Arabie</option>
              <option>UAE Central Bank</option>
              <option>SEPA Europe</option>
            </select>

            <label className="text-sm font-semibold">Numéro de Compte</label>
            <input placeholder="Entrer le numéro de compte" className="w-full border rounded-full px-4 py-2.5 text-sm mb-3" />

            <label className="text-sm font-semibold">Type de Devise</label>
            <div className="flex bg-gray-100 rounded-full p-1 mb-3">
              <button onClick={()=>setDeviseType("crypto")} className={`flex-1 py-1.5 rounded-full text-sm font-bold ${deviseType==="crypto"?"bg-white shadow":""}`}>Cryptomonnaies</button>
              <button onClick={()=>setDeviseType("locale")} className={`flex-1 py-1.5 rounded-full text-sm font-bold ${deviseType==="locale"?"bg-white shadow":""}`}>Devises Locales</button>
            </div>

            <select className="w-full border rounded-full px-4 py-2.5 text-sm mb-3">
              {deviseType==="crypto" ? <option>π PiCoin (314,159.00 USD)</option> : <>
                <option>XAF - Franc CFA CEMAC</option>
                <option>XOF - Franc CFA UEMOA</option>
                <option>SAR - Riyal Saoudien</option>
                <option>AED - Dirham UAE</option>
              </>}
            </select>

            <label className="text-sm font-semibold">Montant</label>
            <input placeholder="0.00" className="w-full border rounded-full px-4 py-2.5 text-sm mb-3" />

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 font-semibold mb-4 flex gap-2">
              <span>⚡</span> Transfert instantané via système interopérable
            </div>

            <button className="w-full bg-[#1e40af] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
              ⚡ sendToExternalBank
            </button>
          </>
        )}
      </div>
    </div>
  );
}
