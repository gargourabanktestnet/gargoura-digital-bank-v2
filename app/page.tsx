"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, PiDex, ConvertirComp, TradingComp, PortefeuilleComp, Cartes, KYCComp, AIAutoComp, BlockchainComp, ShoppingComp, AutomobileComp, AgregationComp, GestionComp } from "./Components"

export default function Page(){
const [tab,setTab]=useState("accueil")
const [menuOpen,setMenuOpen]=useState(false)
const [lang,setLang]=useState("FR")
const [rtl,setRtl]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [kycOk,setKycOk]=useState(false)
const [cards,setCards]=useState([{id:"visa",name:"VISA GOLD",num:"... 4582",blocked:false,limit:5000},{id:"mc",name:"MASTERCARD WORLD",num:"... 9012",blocked:false,limit:8000}])

useEffect(()=>{
  try{
    const a=localStorage.getItem("gdb_pi_addr")
    const k=localStorage.getItem("gdb_kyc_verified")
    if(a) setGdbAddr(a)
    if(k==="true") setKycOk(true)
    const l=localStorage.getItem("gdb_lang")
    if(l) setLang(l)
  }catch{}
},[])

const t = (fr:string, en:string)=> lang==="FR"?fr:en

// DONNEES MONDIALES
const wallets = [
{name:"PI GCV",bal:"12,465.82 PI",usd:"≈ $3,915,284,210",flag:"🟣",color:"#0A1931"},
{name:"USD",bal:"$ 42,850.00",usd:"USD",flag:"🇺🇸",color:"#1e3a8a"},
{name:"EUR",bal:"€ 38,200.00",usd:"EUR",flag:"🇪🇺",color:"#0f172a"},
{name:"XAF",bal:"24,500,000 FCFA",usd:"XAF",flag:"🌍",color:"#14532d"},
]

return(
<div dir={rtl?"rtl":"ltr"} style={{maxWidth:440,margin:"0 auto",background:"#F5F7FA",minHeight:"100vh",paddingBottom:90,fontFamily:"Inter,sans-serif"}}>

{/* TOP BAR HAMBURGER */}
<div style={{background:"#0A1931",color:"#fff",padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:15}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none",border:"none",color:"#C9A86A",fontSize:22,fontWeight:900}}>☰</button>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<img src="/logo.png" alt="GDB" style={{width:30,height:30,borderRadius:8,background:"#fff",padding:2}} onError={e=>(e.currentTarget.style.display='none')} />
<div style={{fontWeight:900,fontSize:12,letterSpacing:1}}><span style={{color:"#F9E2AF"}}>GARGOURA</span> <span style={{fontWeight:300}}>BANK</span></div>
</div>
<div style={{display:"flex",gap:8}}><select value={lang} onChange={e=>{setLang(e.target.value); localStorage.setItem("gdb_lang",e.target.value)}} style={{background:"#142850",color:"#C9A86A",border:"1px solid #C9A86A",borderRadius:6,fontSize:10,fontWeight:800,padding:"3px"}}><option>FR</option><option>EN</option><option>AR</option><option>ES</option><option>ZH</option></select><span>🔔</span></div>
</div>

{/* MENU HAMBURGER DRAWER */}
{menuOpen && (
<div style={{position:"fixed",inset:0,background:"rgba(10,25,49,0.6)",zIndex:50,display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"78%",maxWidth:320,background:"#0A1931",height:"100%",padding:18,overflowY:"auto",borderRight:"2px solid #C9A86A"}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><img src="/logo.png" style={{width:40,height:40,borderRadius:10,background:"#fff"}} /><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A",border:"none",borderRadius:20,padding:"6px 12px",fontWeight:900,color:"#0A1931"}}>✕</button></div>
<div style={{marginTop:16,color:"#F9E2AF",fontWeight:900,fontSize:12}}>MENU MONDIAL • GLOBAL MENU</div>
<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
{[
{label:"🏠 Accueil / Dashboard",id:"accueil"},
{label:"💸 Paiement & Transferts",id:"paiement"},
{label:"💳 Cartes VISA/GOLD/MC",id:"cartes"},
{label:"📈 Epargne & Investissements",id:"epargne"},
{label:"🛡️ KYC Securite",id:"kyc"},
{label:"🤖 AI Auto",id:"ai"},
{label:"⛓️ Blockchain",id:"block"},
{label:"🛒 Shopping",id:"shopping"},
{label:"🚗 Automobile",id:"auto"},
{label:"🔗 Agregation",id:"agreg"},
{label:"⚙️ Gestion & Profil",id:"gestion"},
{label:"💬 Support 24/7 Chat",id:"support"},
].map(i=><button key={i.id} onClick={()=>{setTab(i.id==="support"||i.id==="gestion"||i.id==="kyc"||i.id==="ai"||i.id==="block"||i.id==="shopping"||i.id==="auto"||i.id==="agreg"?"plus":i.id); setMenuOpen(false); if(i.id!=="accueil"&&i.id!=="paiement"&&i.id!=="cartes"&&i.id!=="epargne") localStorage.setItem("gdb_plus_view",i.id)}} style={{textAlign:"left",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(201,168,106,0.2)",borderRadius:10,padding:"12px",color:"#fff",fontSize:12,fontWeight:700}}>{i.label}</button>)}
</div>
<div style={{marginTop:16,background:"rgba(201,168,106,0.1)",borderRadius:10,padding:10}}>
<div style={{color:"#C9A86A",fontSize:10,fontWeight:800}}>INCLUSION MONDIALE</div>
<div style={{color:"#fff",fontSize:10,marginTop:4}}>✓ Multi-devises FX reel (Wise)</div><div style={{color:"#fff",fontSize:10}}>✓ RTL Arabe/Hebreu</div><div style={{color:"#fff",fontSize:10}}>✓ Mobile Money Afrique/Asie</div><div style={{color:"#fff",fontSize:10}}>✓ RGPD PCI-DSS FaceID</div><div style={{color:"#fff",fontSize:10}}>✓ Finance Islamique sans Riba</div>
<button onClick={()=>setRtl(!rtl)} style={{marginTop:8,width:"100%",padding:8,borderRadius:8,border:"1px solid #C9A86A",background:rtl?"#C9A86A":"transparent",color:rtl?"#0A1931":"#C9A86A",fontWeight:900,fontSize:10}}>{rtl?"RTL ON • عربي":"Activer RTL • العربية"}</button>
</div>
<div style={{marginTop:12,fontSize:9,color:"#94a3b8"}}>GDB v2 • PI 314159$ GCV • ISO20022 • SWIFT • SEPA</div>
</div>
</div>
)}

{/* CONTENU PAR ONGLET */}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)",padding:"16px",borderRadius:"0 0 22px 22px"}}>
<div style={{color:"#C9A86A",fontSize:10,letterSpacing:1}}>SYNTHESE DE COMPTE EN TEMPS REEL • REAL-TIME</div>
{wallets.map(w=>(
<div key={w.name} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)",border:"1.2px solid #C9A86A",borderRadius:14,padding:12,marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#F9E2AF",fontSize:10}}>{w.flag} {w.name}</div><div style={{color:"#fff",fontSize:16,fontWeight:900,marginTop:2}}>{w.bal}</div><div style={{color:"#C9A86A",fontSize:9,marginTop:2}}>{w.usd}</div></div>
<div style={{width:40,height:40,background:"#C9A86A",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👁️</div>
</div>
))}
<div style={{background:"#fff",borderRadius:12,padding:10,marginTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:10,color:"#64748b"}}>Permanent Reception</div><div style={{fontSize:10,fontWeight:900}}>{gdbAddr.slice(0,18)}...</div></div>
<button onClick={()=>setTab("paiement")} style={{padding:"8px 12px",borderRadius:8,background:"#0A1931",color:"#C9A86A",border:"none",fontWeight:900,fontSize:10}}>Recevoir QR</button>
</div>
</div>

<div style={{padding:12}}>
<div style={{fontWeight:900,fontSize:12,color:"#0A1931",marginBottom:8}}>HISTORIQUE INTELLIGENT • SMART HISTORY</div>
{[
{cat:"🛒 Shopping",name:"Carrefour N'Djamena",amt:"-12.50 PI",color:"#ef4444"},
{cat:"💸 Transfert Recu",name:"Pi Pionnier France",amt:"+250 PI",color:"#10b981"},
{cat:"🏦 Virement SEPA",name:"Banque Europe",amt:"+1,200 EUR",color:"#10b981"},
{cat:"⛽ Auto",name:"Station GDB Fuel",amt:"-2.1 PI",color:"#ef4444"},
].map((t,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:10,marginTop:6,display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:10,color:"#64748b"}}>{t.cat}</div><div style={{fontSize:11,fontWeight:800}}>{t.name}</div></div><div style={{fontWeight:900,color:t.color,fontSize:11}}>{t.amt}</div></div>)}
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900,fontSize:14,color:"#0A1931"}}>{t("Paiement & Transferts","Payment & Transfers")}</div>
<div style={{fontSize:10,color:"#64748b",marginTop:2}}>Hub central SEPA SWIFT P2P Mobile Money</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
<button onClick={()=>{ const el=document.getElementById("transfert-detail"); if(el) el.scrollIntoView()}} style={{background:"#0A1931",color:"#C9A86A",border:"1.5px solid #C9A86A",borderRadius:12,padding:14,fontWeight:900}}>💸 {t("Transferer","Transfer")}<div style={{fontSize:9,marginTop:4,fontWeight:400,color:"#fff"}}>P2P Interne/Externe ISO20022</div></button>
<button onClick={()=>{ const el=document.getElementById("virement-detail"); if(el) el.scrollIntoView()}} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:14,fontWeight:900,color:"#0A1931"}}>🏦 Virement<div style={{fontSize:9,marginTop:4,fontWeight:400}}>SEPA SWIFT $ € XAF</div></button>
</div>

<div style={{background:"#fff",borderRadius:12,padding:10,marginTop:10,display:"flex",gap:8}}>
<div style={{flex:1,background:"#000",color:"#fff",borderRadius:8,padding:8,textAlign:"center",fontWeight:900,fontSize:10}}> Apple Pay</div>
<div style={{flex:1,background:"#4285F4",color:"#fff",borderRadius:8,padding:8,textAlign:"center",fontWeight:900,fontSize:10}}>G Pay</div>
<div style={{flex:1,background:"#0A1931",color:"#C9A86A",borderRadius:8,padding:8,textAlign:"center",fontWeight:900,fontSize:10}}>📱 QR Marchand</div>
</div>

<div id="transfert-detail" style={{marginTop:14}}><Transferer gdb={gdbAddr} /></div>
<div id="virement-detail" style={{marginTop:14}}><Virement gdb={gdbAddr} /></div>
<div style={{marginTop:14}}><PiDex gdb={gdbAddr} /></div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)",borderRadius:12,padding:12,marginTop:12,color:"#fff"}}>
<div style={{fontWeight:900,fontSize:11}}>TRANSFERT HYBRIDE MONDIAL • REMITTANCES</div>
<div style={{fontSize:10,marginTop:4}}>Mobile Money Afrique (Orange, MTN, Wave), AsiaPay, LatAm, SEPA, SWIFT, Pi Network</div>
<div style={{display:"flex",gap:6,marginTop:8}}><span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 8px",fontSize:9}}>🇹🇩 Tchad</span><span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 8px",fontSize:9}}>🇸🇳 Senegal</span><span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 8px",fontSize:9}}>🇳🇬 Nigeria</span><span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 8px",fontSize:9}}>🇫🇷 France</span></div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900,fontSize:14,color:"#0A1931"}}>Cartes Reutilisables • Visa Gold Mastercard</div>
{cards.map((c,i)=>(
<div key={i} style={{background:i===0?"linear-gradient(135deg,#C9A86A,#F9E2AF)":"linear-gradient(135deg,#0A1931,#1e3a8a)",borderRadius:16,padding:14,marginTop:12,color:i===0?"#0A1931":"#fff",position:"relative"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:900,fontSize:12}}>{c.name}</div><div style={{fontSize:10}}>{c.blocked?"🔒 BLOQUEE":"🟢 Active"} • NFC</div></div>
<div style={{fontSize:14,letterSpacing:2,marginTop:14,fontWeight:800}}>4000 1234 5678 {c.num.slice(-4)}</div>
<div style={{display:"flex",gap:8,marginTop:14}}>
<button onClick={()=>{ const nc=[...cards]; nc[i].blocked=!nc[i].blocked; setCards(nc)}} style={{flex:1,padding:8,borderRadius:8,border:"none",background: c.blocked?"#10b981":"#ef4444",color:"#fff",fontWeight:900,fontSize:10}}>{c.blocked?"Debloquer":"Bloquer Instantane"}</button>
<button onClick={()=>alert(`Plafond actuel: ${c.limit} PI - Modifier dans Gestion`)} style={{flex:1,padding:8,borderRadius:8,border:"1px solid",background:"rgba(255,255,255,0.2)",fontWeight:900,fontSize:10}}>Plafond {c.limit} PI</button>
<button onClick={()=>alert("PIN: •••• 4582 - Affiche apres FaceID")} style={{padding:8,borderRadius:8,border:"none",background:"#fff",color:"#0A1931",fontWeight:900,fontSize:10}}>PIN</button>
</div>
</div>
))}
<div style={{marginTop:14}}><Cartes gdb={gdbAddr} rcv={gdbAddr.slice(0,12)} /></div>
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900,fontSize:14,color:"#0A1931"}}>Epargne & Investissements • Growth</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800,fontSize:11}}>Outils de Budgetisation PFM</div>
<div style={{display:"flex",gap:4,marginTop:8,alignItems:"flex-end",height:50}}>
{[40,70,50,90,60,80,30].map((h,i)=><div key={i} style={{flex:1,background:i===3?"#C9A86A":"#0A1931",height:`${h}%`,borderRadius:4}}></div>)}
</div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#64748b",marginTop:6}}><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></div>
<div style={{marginTop:8,fontSize:10}}>Objectif Vacances: 450 PI / 800 PI <div style={{background:"#e2e8f0",height:6,borderRadius:10,marginTop:4}}><div style={{background:"#C9A86A",width:"56%",height:6,borderRadius:10}}></div></div></div>
</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
<div style={{background:"linear-gradient(135deg,#0A1931,#142850)",borderRadius:12,padding:12,color:"#F9E2AF"}}><div style={{fontSize:10}}>Coffre Virtuel</div><div style={{fontWeight:900,marginTop:4}}>🏦 Arrondi auto</div><div style={{fontSize:9,marginTop:4,color:"#fff"}}>+2.34 PI cette semaine sur achats</div></div>
<div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0"}}><div style={{fontSize:10}}>Micro-credit Express</div><div style={{fontWeight:900,marginTop:4,color:"#0A1931"}}>💰 50-5000 PI</div><div style={{fontSize:9,marginTop:4}}>Reponse immediate IA</div></div>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800,fontSize:11}}>Investissements Accessibles • Debutants</div>
<div style={{display:"flex",gap:6,marginTop:8}}>
<span style={{background:"#f1f5f9",padding:"6px 10px",borderRadius:20,fontSize:9,fontWeight:800}}>📈 ETF</span>
<span style={{background:"#f1f5f9",padding:"6px 10px",borderRadius:20,fontSize:9,fontWeight:800}}>₿ Crypto</span>
<span style={{background:"#f1f5f9",padding:"6px 10px",borderRadius:20,fontSize:9,fontWeight:800}}>🥇 Or</span>
<span style={{background:"#dcfce7",padding:"6px 10px",borderRadius:20,fontSize:9,fontWeight:800}}>🌱 Vert/Ethique</span>
<span style={{background:"#fef3c7",padding:"6px 10px",borderRadius:20,fontSize:9,fontWeight:800}}>☪️ Halal</span>
</div>
<div style={{marginTop:10}}><TradingComp /></div>
</div>

<div style={{marginTop:12}}><ConvertirComp /></div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{fontWeight:900,fontSize:14,color:"#0A1931"}}>Menu Plus • Profil & Support Mondial</div>

<div style={{background:"#0A1931",borderRadius:12,padding:12,marginTop:10,color:"#fff",display:"flex",gap:10,alignItems:"center"}}>
<img src="/logo.png" style={{width:48,height:48,borderRadius:12,background:"#fff"}} />
<div><div style={{fontWeight:900,color:"#F9E2AF"}}>Pionnier GCV</div><div style={{fontSize:10,color:"#94a3b8"}}>{gdbAddr.slice(0,20)}...</div><div style={{fontSize:9,color:kycOk?"#10b981":"#f59e0b",marginTop:2}}>{kycOk?"✅ KYC Verifie RGPD":"⏳ KYC en attente"}</div></div>
<button onClick={()=>{ const v=localStorage.getItem("gdb_plus_view")||"gestion"; if(v==="gestion") setTab("plus"); }} style={{marginLeft:"auto",background:"#C9A86A",border:"none",borderRadius:8,padding:"6px 10px",fontWeight:900,color:"#0A1931",fontSize:10}}>Edit</button>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800,fontSize:11}}>Messagerie & Support In-App 24/7</div>
<div style={{background:"#f8fafc",borderRadius:8,padding:8,marginTop:8,fontSize:10}}>
<div style={{background:"#0A1931",color:"#C9A86A",padding:"6px 10px",borderRadius:12,borderBottomLeftRadius:2,display:"inline-block"}}>Salam! Comment aider? 🌍</div>
<div style={{background:"#e2e8f0",padding:"6px 10px",borderRadius:12,borderBottomRightRadius:2,marginTop:6,display:"inline-block",marginLeft:"auto"}}>Probleme virement XAF?</div>
</div>
<div style={{display:"flex",gap:6,marginTop:8}}><input placeholder="Ecrivez ici..." style={{flex:1,padding:8,borderRadius:20,border:"1px solid #e2e8f0",fontSize:10}} /><button style={{background:"#0A1931",color:"#C9A86A",border:"none",borderRadius:20,padding:"8px 14px",fontWeight:900}}>Send</button></div>
<div style={{marginTop:8,fontSize:9,color:"#64748b"}}>📞 (+235) 92 82 52 62 • gargouradigitalbank@gmail.com</div>
</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
<button onClick={()=>alert("FaceID / Empreinte activee - PCI-DSS Conforme")} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:10,fontSize:10,fontWeight:800}}>🔐 Biometrie FaceID</button>
<button onClick={()=>alert("Notifications Push actives")} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:10,fontSize:10,fontWeight:800}}>🔔 Push Intelligentes</button>
</div>

{/* VUES DYNAMIQUES PLUS */}
<div style={{marginTop:14}}>
{(() => {
  const view = typeof window!== "undefined"? localStorage.getItem("gdb_plus_view") : "gestion"
  if(view==="kyc") return <KYCComp gdb={gdbAddr} onVerified={()=>setKycOk(true)} />
  if(view==="ai") return <AIAutoComp />
  if(view==="block") return <BlockchainComp />
  if(view==="shopping") return <ShoppingComp />
  if(view==="auto") return <AutomobileComp />
  if(view==="agreg") return <AgregationComp />
  return <GestionComp />
})()}
</div>

<div style={{marginTop:14,background:"linear-gradient(135deg,#C9A86A,#F9E2AF)",borderRadius:12,padding:12}}>
<div style={{fontWeight:900,fontSize:11,color:"#0A1931"}}>COMPTES MULTI-DEVISES & FX REDUITS • Type Wise</div>
<div style={{fontSize:10,marginTop:4,color:"#0A1931"}}>Detenez, recevez, echangez sans frais caches, taux interbancaire reel. 0% commission sur GCV.</div>
<div style={{display:"flex",gap:6,marginTop:8}}><span style={{background:"#0A1931",color:"#C9A86A",padding:"4px 8px",borderRadius:20,fontSize:9}}>USD/EUR/XAF/PI</span><span style={{background:"#fff",padding:"4px 8px",borderRadius:20,fontSize:9}}>FX -0.5%</span></div>
</div>

</div>
)}

{/* BOTTOM NAV 5 ONGLETS MONDIAUX */}
<div style={{position:"fixed",bottom:10,left:"50%",transform:"translateX(-50%)",width:"94%",maxWidth:440,background:"#fff",borderRadius:22,boxShadow:"0 8px 32px rgba(0,0,0,0.15)",border:"1px solid #E2E8F0",display:"flex",justifyContent:"space-around",padding:"6px 0",zIndex:20}}>
{[
{id:"accueil",icon:"🏠",label:"Accueil"},
{id:"paiement",icon:"💸",label:"Paiement"},
{id:"cartes",icon:"💳",label:"Cartes"},
{id:"epargne",icon:"📈",label:"Epargne"},
{id:"plus",icon:"☰",label:"Plus"},
].map(b=>(
<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none",background:tab===b.id?"#0A1931":"none",color:tab===b.id?"#C9A86A":"#0A1931",borderRadius:14,padding:"6px 12px",display:"flex",flexDirection:"column",alignItems:"center",fontSize:9,fontWeight:800}}>
<span style={{fontSize:16}}>{b.icon}</span><span style={{marginTop:2}}>{b.label}</span>
</button>
))}
</div>

</div>
)
}
