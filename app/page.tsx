"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, CartesPro, EpargnePro, PaiementPro, PlusPro, PiDex } from "./Components"

export default function Page(){
const [tab,setTab] = useState("accueil")
const [hide,setHide] = useState(false)
const [menuOpen,setMenuOpen] = useState(false)
const [lang,setLang] = useState("FR")
const [rtl,setRtl] = useState(false)
const [gdbAddr,setGdbAddr] = useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [userName,setUserName] = useState("GARGOURA PIONNIER")
const [kycOk,setKycOk] = useState(false)

useEffect(()=>{
 try{
  const a = localStorage.getItem("gdb_pi_addr")
  const u = localStorage.getItem("gdb_pi_user")
  const k = localStorage.getItem("gdb_kyc_verified")
  const l = localStorage.getItem("gdb_lang")
  if(a) setGdbAddr(a)
  if(u) setUserName(u.toUpperCase())
  if(k==="true") setKycOk(true)
  if(l) setLang(l)
 }catch{}
},[])

const wallets = [
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"≈ $3.9B • 1 PI=314,159$", flag:"🟣", type:"courant"},
 {id:"usd", name:"USD Courant", bal:"$42,850.00", sub:"SWIFT", flag:"🇺🇸", type:"courant"},
 {id:"eur", name:"EUR Epargne", bal:"€38,200.00", sub:"SEPA 2.5%", flag:"🇪🇺", type:"epargne"},
 {id:"xaf", name:"XAF CEMAC", bal:"24,500,000 FCFA", sub:"BEAC", flag:"🇹🇩", type:"epargne"},
]

return(
<div dir={rtl ? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:90, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:20}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" style={{width:32, height:32, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:12}}>GARGOURA BANK</span>
</div>
<div style={{display:"flex", gap:8, alignItems:"center"}}>
<select value={lang} onChange={(e)=>{setLang(e.target.value); localStorage.setItem("gdb_lang", e.target.value); setRtl(e.target.value==="AR")}} style={{background:"#142850", color:"#C9A86A", border:"1px solid #C9A86A", borderRadius:6, fontSize:10, padding:3}}>
<option>FR</option><option>EN</option><option>AR</option><option>ES</option><option>ZH</option><option>RU</option><option>IT</option><option>VI</option><option>AM</option>
</select>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"4px 8px"}}>{hide ? "🙈" : "👁️"}</button>
</div>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.6)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"80%", maxWidth:320, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>MENU MONDIAL</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 10px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{["accueil","paiement","cartes","epargne","plus"].map((t)=>(
<button key={t} onClick={()=>{setTab(t); setMenuOpen(false)}} style={{textAlign:"left", background:tab===t?"#C9A86A":"rgba(255,255,255,0.06)", color:tab===t?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{t.toUpperCase()}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(201,168,106,0.1)", borderRadius:10, padding:10, color:"#fff", fontSize:9}}><b style={{color:"#C9A86A"}}>CEMAC UEMOA GOLFE</b><div>Multi-devises FX reel</div><div>RTL Arabe • RGPD PCI-DSS</div><div>Mobile Money 15 operateurs</div><div>Halal sans Riba</div></div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:10}}>SYNTHESE TEMPS REEL</span><span style={{color:hide?"#ef4444":"#10b981", fontSize:9}}>{hide ? "MASQUE" : "LIVE GCV"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15, marginTop:2}}>{hide ? "•••• ••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div><div style={{fontSize:10, color:"#fff", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"4px 8px", height:22}}>{w.type}</div>
</div>
))}
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{fontSize:9, color:"#64748b"}}>Reception Permanente</div><div style={{fontSize:10, fontWeight:900}}>{hide ? "G••••A8" : gdbAddr.slice(0,16)+"..."+gdbAddr.slice(-6)}</div></div>
<button onClick={()=>setTab("paiement")} style={{background:"#C9A86A", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:10, color:"#0A1931"}}>QR Recevoir</button>
</div>
</div>
<div style={{padding:12}}>
<div style={{fontWeight:900, fontSize:11, color:"#0A1931"}}>HISTORIQUE INTELLIGENT</div>
<div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:10, marginTop:6, display:"flex", justifyContent:"space-between"}}><div><div style={{fontSize:8, color:"#64748b"}}>🛒 Alimentation • CEMAC</div><div style={{fontSize:11, fontWeight:800}}>Carrefour N'Djamena</div></div><div style={{fontWeight:900, color:"#ef4444", fontSize:11}}>{hide ? "••••" : "-12.50 PI"}</div></div>
<div style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:10, marginTop:6, display:"flex", justifyContent:"space-between"}}><div><div style={{fontSize:8, color:"#64748b"}}>🏦 SWIFT • JORDANIE</div><div style={{fontSize:11, fontWeight:800}}>Arab Bank Jordanie</div></div><div style={{fontWeight:900, color:"#10b981", fontSize:11}}>{hide ? "••••" : "+1,200 JOD"}</div></div>
</div>
</div>
)}

{tab==="paiement" && <div style={{padding:12}}><PaiementPro gdb={gdbAddr} /></div>}
{tab==="cartes" && <div style={{padding:12}}><CartesPro user={userName} gdb={gdbAddr} /></div>}
{tab==="epargne" && <div style={{padding:12}}><EpargnePro /></div>}
{tab==="plus" && <div style={{padding:12}}><PlusPro gdb={gdbAddr} kyc={kycOk} setKyc={setKycOk} lang={lang} rtl={rtl} setRtl={setRtl} /></div>}

<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"94%", maxWidth:440, background:"#fff", borderRadius:22, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", border:"1px solid #E2E8F0", display:"flex", justifyContent:"space-around", padding:"6px 0", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Accueil"},{id:"paiement", ic:"💸", l:"Paiement"},{id:"cartes", ic:"💳", l:"Cartes"},{id:"epargne", ic:"📈", l:"Epargne"},{id:"plus", ic:"☰", l:"Plus"}].map((b)=>(
<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none", background:tab===b.id?"#0A1931":"transparent", color:tab===b.id?"#C9A86A":"#0A1931", borderRadius:14, padding:"6px 10px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:8, fontWeight:800}}>
<span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span>
</button>
))}
</div>

</div>
)
}
