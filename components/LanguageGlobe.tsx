"use client"
import { useState } from "react"

const LANGS_BY_CONTINENT = {
  "🌍 Afrique": [
    {code:"fr", name:"Français", flag:"🇫🇷"},
    {code:"ar", name:"العربية", flag:"🇸🇦"},
    {code:"en", name:"English", flag:"🇬🇧"},
    {code:"sw", name:"Swahili", flag:"🇹🇿"},
    {code:"ha", name:"Haoussa", flag:"🇳🇪"},
  ],
  "🌏 Asie-Golfe": [
    {code:"ar-gulf", name:"خليجي", flag:"🇦🇪"},
    {code:"fa", name:"فارسی", flag:"🇮🇷"},
    {code:"ur", name:"اردو", flag:"🇵🇰"},
    {code:"hi", name:"हिन्दी", flag:"🇮🇳"},
    {code:"zh", name:"中文", flag:"🇨🇳"},
    {code:"tr", name:"Türkçe", flag:"🇹🇷"},
  ],
  "🌎 Amériques": [
    {code:"en-us", name:"English US", flag:"🇺🇸"},
    {code:"es", name:"Español", flag:"🇪🇸"},
    {code:"pt", name:"Português", flag:"🇧🇷"},
  ],
  "🌍 Europe": [
    {code:"de", name:"Deutsch", flag:"🇩🇪"},
    {code:"ru", name:"Русский", flag:"🇷🇺"},
  ]
}

export default function LanguageGlobe({ current, onChange }: any) {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <button
        onClick={()=>setOpen(!open)}
        className="w-12 h-12 bg-[#facc15] rounded-full flex items-center justify-center text-xl shadow-xl border-2 border-[#1e40af] animate-pulse"
        title="Langues Mondiales"
      >
        🌐
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-[#0f1a3d] border-2 border-[#facc15] rounded-2xl p-4 shadow-2xl max-h-[70vh] overflow-y-auto">
          <p className="text-[#facc15] font-black text-xs mb-3 text-center">🌐 LANGUES MONDIALES • GDB</p>
          {Object.entries(LANGS_BY_CONTINENT).map(([cont, langs])=>(
            <div key={cont} className="mb-4">
              <p className="text-white/60 text-[11px] font-bold mb-1">{cont}</p>
              <div className="grid grid-cols-1 gap-1">
                {langs.map(l=>(
                  <button
                    key={l.code}
                    onClick={()=>{onChange(l.code); setOpen(false)}}
                    className={`text-left px-3 py-2 rounded-lg text-[13px] flex gap-2 items-center ${current===l.code?'bg-[#1e40af] text-[#facc15]':'text-white/80 hover:bg-white/10'}`}
                  >
                    <span>{l.flag}</span> {l.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
     }
