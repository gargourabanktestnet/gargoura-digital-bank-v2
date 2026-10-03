"use client"
import { useState } from "react"

export default function MomoManuel() {
  const [montant, setMontant] = useState("")
  const [tel, setTel] = useState("")
  const [txid, setTxid] = useState("")

  // TON NUMERO MOMO - CHANGE ICI
  const TON_NUMERO_MOMO = "Ton numero Moov/Airtel ici"
  const TON_WHATSAPP = "235XXXXXXXX" // ton WhatsApp sans +

  const handleSubmit = () => {
    if(!montant ||!tel ||!txid) {
      alert("Remplis tout")
      return
    }
    const message = `GARGOURA RECHARGE MANUELLE%0A%0AMontant: ${montant} FCFA%0ATel MoMo: ${tel}%0AID Transaction: ${txid}%0AUsername: (demande à l'utilisateur son username)%0A%0AJe viens de faire le depot MoMo`
    const waUrl = `https://wa.me/${TON_WHATSAPP}?text=${message}`

    // Sauvegarde locale en attendant admin
    const demandes = JSON.parse(localStorage.getItem("gargoura_momo_demands") || "[]")
    demandes.push({ montant, tel, txid, date: new Date().toISOString(), status: "en attente" })
    localStorage.setItem("gargoura_momo_demands", JSON.stringify(demandes))

    window.open(waUrl, "_blank")
    alert("Demande envoyée! J'ai reçu sur WhatsApp, je crédite dans 5 min.")
  }

  return (
    <div className="border border-yellow-500/30 bg-yellow-500/10 p-4 rounded-xl mt-4">
      <h3 className="font-bold text-yellow-400 mb-2">🔶 Recharge MoMo Manuelle - Tchad</h3>
      <p className="text-xs text-gray-400 mb-3">
        1. Envoie {montant || "[montant]"} FCFA au <b>{TON_NUMERO_MOMO}</b> (Moov/Airtel)<br/>
        2. Mets ton username Gargoura en motif<br/>
        3. Remplis ci-dessous et envoie preuve WhatsApp
      </p>

      <input className="w-full mb-2 p-2 rounded bg-black border border-white/20 text-white" placeholder="Montant FCFA ex: 5000" type="number" value={montant} onChange={e=>setMontant(e.target.value)} />
      <input className="w-full mb-2 p-2 rounded bg-black border border-white/20 text-white" placeholder="Ton numero MoMo" value={tel} onChange={e=>setTel(e.target.value)} />
      <input className="w-full mb-3 p-2 rounded bg-black border border-white/20 text-white" placeholder="ID Transaction MoMo (ex: MP...)" value={txid} onChange={e=>setTxid(e.target.value)} />

      <button onClick={handleSubmit} className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400">
        J'ai payé, envoyer preuve WhatsApp
      </button>

      <p className="text-[10px] text-gray-500 mt-2">Taux: 1000 FCFA = 0.01 Pi (exemple, tu peux changer). Crédit manuel sous 10 min.</p>
    </div>
  )
  }
