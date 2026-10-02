"use client"
import { useState, useEffect } from "react"

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [lang,setLang]=useState("FR")
const [rtl,setRtl]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [userName,setUserName]=useState("GARGOURA PIONNIER")
const [kycOk,setKycOk]=useState(false)
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")

useEffect(()=>{
 try{
  const a=localStorage.getItem("gdb_pi_addr")
  const u=localStorage.getItem("gdb_pi_user")
  const k=localStorage.getItem("gdb_kyc_verified")
  if(a) setGdbAddr(a)
  if(u) setUserName(u.toUpperCase())
  if(k==="true") setKycOk(true)
 }catch{}
},[])

const wallets=[
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"1 PI=314159$ GCV", flag:"🟣"},
 {id:"usd", name:"USD Courant", bal:"$42,850.00", sub:"SWIFT", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne", bal:"€38,200.00", sub:"SEPA", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC", bal:"24,500,000 FCFA", sub:"BEAC", flag:"🇹🇩"},
]

const zones:any={
 "CEMAC":["Tchad BEAC","Cameroun","Gabon","Congo","RCA","Guinee Eq"],
 "UEMOA":["Senegal","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger"],
 "DOLLAR":["USA Chase","USA BoA","Canada"],
 "JORDANIE":["Jordan Ahli Bank","Arab Bank JO"],
 "GOLFE":["UAE FAB","Saudi Al Rajhi","Qatar QNB","Kuwait","Bahrein","Oman"],
 "MOYEN-ORIENT":["Turquie","Liban","Egypte"],
 "INTERNATIONAL":["UK","France SEPA","Allemagne","Chine","Inde"]
}

const cards=[
 {id:"visa", name:"VISA CLASSIC", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD", num:"5555 4444 3333 9012", exp:"05/28", cvv:"789", color:"linear-gradient(135deg,#0A1931,#111827)", t:"#fff"},
]

return(
<div dir={rtl? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:90, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:20}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="G" style={{width:32, height:32, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:12}}>GARGOURA BANK</span></div>
<div style={{display:"flex", gap:8}}><button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"4px 8px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button></div>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.6)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"80%", maxWidth:320, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>MENU MONDIAL</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 10px"}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>{["accueil","paiement","cartes","epargne","plus"].map((t)=>(
<button key={t} onClick={()=>{setTab(t); setMenuOpen(false)}} style={{textAlign:"left", background:tab===t?"#C9A86A":"rgba(255,255,255,0.06)", color:tab===t?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800}}>{t.toUpperCase()}</button>
))}</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{color:"#fff", fontSize:10, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"4px 8px", height:22}}>LIVE</div>
</div>
))}
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{fontSize:9, color:"#64748b"}}>Reception PI</div><div style={{fontSize:10, fontWeight:900}}>{gdbAddr.slice(0,16)}...{gdbAddr.slice(-4)}</div></div>
<div style={{display:"flex", gap:6}}><button onClick={()=>setTab("paiement")} style={{background:"#0A1931", color:"#C9A86A", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:10}}>Envoyer</button><button onClick={()=>{setTab("plus")}} style={{background:"#C9A86A", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:10, color:"#0A1931"}}>QR</button></div>
</div>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:6, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Mondiale - Reel</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:140, height:140, border:"2px solid #C9A86A", borderRadius:10}} />
<div style={{fontSize:8, marginTop:6, wordBreak:"break-all", background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8}}>{gdbAddr}</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Paiement & Transferts Mondial</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:8}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"6px 10px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z?"#C9A86A":"#fff", fontSize:9, fontWeight:800}}>{z}</button>
))}</div>
<select style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0"}}>{zones[zone].map((p:string)=><option key={p}>{p}</option>)}</select>
<input placeholder="IBAN / Mobile Money / Adresse PI G..." style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0"}} />
<button style={{width:"100%", marginTop:8, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Envoyer Instantane ISO20022</button>

<div style={{display:"flex", gap:6, marginTop:12}}>
<div style={{flex:1, background:"#000", color:"#fff", borderRadius:10, padding:10, textAlign:"center", fontWeight:900, fontSize:10}}> Apple Pay<br/><span style={{fontSize:8}}>Enrole • NFC</span></div>
<div style={{flex:1, background:"#4285F4", color:"#fff", borderRadius:10, padding:10, textAlign:"center", fontWeight:900, fontSize:10}}>G Pay<br/><span style={{fontSize:8}}>Enrole</span></div>
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:12, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>Mobile Money • 12 Operateurs</div>
<div style={{fontSize:8, marginTop:4}}>Orange MTN Wave Moov Airtel M-Pesa STC Pay UAE Etisalat Jawwal JO</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>Notifications Push Intelligentes</div>
<div style={{fontSize:8, marginTop:4}}>Transaction -12.5 PI • Solde bas EUR • Connexion suspecte Paris • Push son + vibration instantanee</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Cartes Embellies • VISA GOLD MASTERCARD</div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t, boxShadow:"0 8px 24px rgba(0,0,0,0.2)"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:11}}>{c.name}</span><span style={{fontSize:9}}>{blocked[i]? "🔒 BLOQUEE" : "🟢 Active • NFC"}</span></div>
<div style={{marginTop:14, fontSize:13, letterSpacing:2, fontWeight:800}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10}}><div><div style={{opacity:0.7}}>TITULAIRE</div><div style={{fontWeight:800}}>{userName}</div></div><div><div style={{opacity:0.7}}>EXP</div><div style={{fontWeight:800}}>{c.exp}</div></div><div><div style={{opacity:0.7}}>CVV</div><div style={{fontWeight:800}}>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:8, borderRadius:8, border:"none", background:blocked[i]?"#10b981":"#ef4444", color:"#fff", fontWeight:800, fontSize:9}}>{blocked[i]? "Debloquer" : "Bloquer"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:8, borderRadius:8, border:"1px solid rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.15)", fontSize:9, fontWeight:800}}>PIN {showCVV? "Masquer" : "Voir"}</button>
</div>
</div>
))}
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Epargne & Investissements • PFM</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800, fontSize:10}}>Budgetisation • Depassement Alerte</div>
<div style={{display:"flex", gap:3, alignItems:"flex-end", height:50, marginTop:8}}>{[40,70,55,90,60,80].map((h,i)=><div key={i} style={{flex:1, background:i===3?"#C9A86A":"#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{fontSize:8, marginTop:6}}>Objectif Vacances 450/800 PI • Alerte si depassement 10%</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<div style={{background:"#0A1931", color:"#F9E2AF", borderRadius:12, padding:12}}><div style={{fontSize:9}}>Coffre Virtuel</div><div style={{fontSize:10, marginTop:4, color:"#fff"}}>Arrondi auto: achat 12.3 PI → 13 PI, 0.7 PI en cagnotte vacances. Solde 87.5 PI</div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit Express</div><div style={{fontSize:10, marginTop:4}}>50-5000 PI • Reponse IA immediate • Taux Halal 2.5%</div><button style={{width:"100%", marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:9, fontWeight:800}}>Simuler</button></div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0", fontSize:9}}><b>Investissements:</b> Actions ETF Crypto Or • Filtres Vert ESG • Halal sans Riba Mudaraba Musharaka • Debutant 10 PI</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}>
<img src="/logo.png" style={{width:44, height:44, borderRadius:10, background:"#fff"}} alt="logo" /><div><div style={{color:"#F9E2AF", fontWeight:900}}>Profil & Support</div><div style={{fontSize:9}}>{gdbAddr.slice(0,20)}... • {kycOk? "✅ RGPD Verifie" : "KYC"}</div></div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>Multi-devises FX Reduits • Wise type</div>
<div style={{fontSize:8, marginTop:4}}>12 devises, IBAN virtuel US/EU/XAF, taux interbancaire reel, frais 0.43%, conversion PI Fiat instantanee</div>
<div style={{display:"flex", gap:6, marginTop:8}}><span style={{background:"#f1f5f9", padding:"4px 8px", borderRadius:20, fontSize:8}}>USD/EUR/XAF/JOD/AED/PI</span></div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>Conformite RGPD PCI-DSS • FaceID</div>
<div style={{fontSize:8, marginTop:4}}>AES-256, tokenisation cartes, CVV non stocke, 3D Secure, ISO20022 SWIFT gpi, E2E chat</div>
<button onClick={()=>setKycOk(true)} style={{marginTop:8, width:"100%", padding:10, borderRadius:8, background:kycOk?"#10b981":"#0A1931", color:kycOk?"#fff":"#C9A86A", border:"none", fontWeight:900, fontSize:10}}>{kycOk? "✅ Securise" : "Activer KYC + FaceID"}</button>
</div>
<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:12, padding:12, marginTop:10}}>
<div style={{fontWeight:900, fontSize:10, color:"#92400e"}}>Finance Inclusive • Halal Vert</div>
<div style={{fontSize:8, marginTop:4, color:"#78350f"}}>Mudaraba Musharaka Murabaha sans Riba, AAOIFI, Zakat 2.5% auto, projets solaire Tchad, ESG 8.5/10</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>Support 24/7 Chat • 9 Langues • RTL</div>
<div style={{fontSize:8, marginTop:4}}>FR EN AR ES ZH RU IT VI AM • RTL Arabe Hebreu reel • Chatbot + humain &lt;30s</div>
<div style={{display:"flex", gap:6, marginTop:8}}><input placeholder="Message..." style={{flex:1, padding:8, borderRadius:20, border:"1px solid #e2e8f0", fontSize:9}} /><button style={{background:"#0A1931", color:"#C9A86A", border:"none", borderRadius:20, padding:"8px 12px", fontSize:9, fontWeight:900}}>Envoyer</button></div>
</div>
</div>
)}

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
