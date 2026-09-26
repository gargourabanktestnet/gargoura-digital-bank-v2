"use client"
import { useState } from "react"

const MENU = {
  "🏦 Banque": ["Tableau de bord", "Portefeuilles 8 wallets", "Virements ISO20022", "Historique"],
  "💳 Paiements": ["Swapper PI/XAF", "Retirer", "Déposer", "Scanner QR", "Mobile Money"],
  "🌐 Mondial": ["Factures par Pays", "Services Gouvernementaux", "Convertisseur", "Pi DEX"],
  "🛡️ Conformité": ["KYC Pi Network", "CEMAC/COBAC", "UEMOA/BCEAO", "GOLFE/SAMA", "EU PSD2"]
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  return (
    <>
      {/* BOUTON HAMBURGER SCELLÉ BLEU/JAUNE */}
      <button
        onClick={()=>setOpen(!open)}
        className="fixed top-4 left-4 z-[100] w-12 h-12 bg-[#1e40af] border-2 border-[#facc15] rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-xl"
      >
        <span className={`w-6 h-0.5 bg-[#facc15] transition ${open?'rotate-45 translate-y-2':''}`} />
        <span className={`w-6 h-0.5 bg-[#facc15] transition ${open?'opacity-0':''}`} />
        <span className={`w-6 h-0.5 bg-[#facc15] transition ${open?'-rotate-45 -translate-y-2':''}`} />
      </button>

      {/* MENU SLIDE */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-[#0f1a3d] border-r-4 border-[#facc15] z-[99] transition-transform duration-300 ${open?'translate-x-0':'-translate-x-full'} overflow-y-auto`}>
        <div className="p-6 pt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#facc15] rounded-full flex items-center justify-center font-black text-[#1e40af]">GDB</div>
            <div>
              <p className="text-[#facc15] font-bold text-sm">GARGOURA DIGITAL BANK</p>
              <p className="text-white/60 text-[10px]">MAINNET • PI 314,159 USD</p>
            </div>
          </div>

          {Object.entries(MENU).map(([cat, items])=>(
            <div key={cat} className="mb-5">
              <button
                onClick={()=>setActive(active===cat?null:cat)}
                className="w-full text-left text-white font-bold text-sm py-2 flex justify-between items-center border-b border-white/10"
              >
                {cat} <span className="text-[#facc15]">{active===cat?'−':'+'}</span>
              </button>
              {active===cat && (
                <div className="mt-2 space-y-1">
                  {items.map(it=>(
                    <button key={it} className="w-full text-left text-white/80 text-[13px] py-2 px-3 rounded-lg hover:bg-[#1e40af] hover:text-[#facc15] transition">
                      • {it}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 p-3 bg-[#1e40af]/30 rounded-xl border border-[#facc15]/30">
            <p className="text-[#facc15] text-[11px] font-bold">🌍 SECURE • SCALABLE • REGULATED</p>
            <p className="text-white/50 text-[10px]">BUILT ON PI NETWORK</p>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && <div onClick={()=>setOpen(false)} className="fixed inset-0 bg-black/60 z-[98]" />}
    </>
  )
    }
