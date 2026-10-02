"use client"
import { useState, useEffect } from "react"

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [rtl,setRtl]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [userName,setUserName]=useState("GARGOURA PIONNIER")
const [kycOk,setKycOk]=useState(false)
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [objectif,setObjectif]=useState(56)

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
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"≈ $3,915,284,210 • 1 PI=314159$ • Courant", flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT", bal:"$42,850.00", sub:"USA - IBAN US virtuel • Courant", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA", bal:"€38,200.00", sub:"2.5% interet • Epargne", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC", bal:"24,500,000 FCFA", sub:"Tchad Cameroun • Epargne", flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso", bal:"-1,200 PI", sub:"Reste du • Echeance 15/11 • Credit", flag:"💳"},
]

const zones:any={
 "CEMAC":["Tchad BEAC","Cameroun BICEC","Gabon BGFI","Congo","RCA","Guinee Eq"],
 "UEMOA":["Senegal Orange","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger","Guinee Bissau"],
 "DOLLAR":["USA Chase Bank","USA Bank of America","Canada RBC"],
 "JORDANIE":["Jordan Ahli Bank","Arab Bank Jordanie","Housing Bank JO"],
 "GOLFE":["UAE FAB First Abu Dhabi","Saudi Al Rajhi","Qatar QNB","Kuwait NBK","Bahrein NBB","Oman Bank Muscat"],
 "MOYEN-ORIENT":["Turquie Ziraat","Liban Byblos","Egypte NBE","Israel Leumi"],
 "INTERNATIONAL":["UK Barclays","France SEPA BNP","Allemagne Deutsche","Chine ICBC","Inde SBI"]
}

const cards=[
 {id:"visa", name:"VISA CLASSIC", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD ELITE", num:"5555 4444 3333 9012", exp:"05/28", cvv:"789", color:"linear-gradient(135deg,#0A1931,#111827)", t:"#fff"},
]

return(
<div dir={rtl? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:90, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:20}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} />
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span></span>
</div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF", fontSize:12}}>MENU MONDIAL GDB</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil / Tableau de bord"},{i:"paiement", l:"💸 Paiement & Transferts"},{i:"cartes", l:"💳 Cartes VISA GOLD MC"},{i:"epargne", l:"📈 Epargne & Investissements"},{i:"plus", l:"☰ Plus - Profil & Support"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(201,168,106,0.12)", borderRadius:12, padding:12, color:"#fff", fontSize:9, lineHeight:1.6}}>
<b style={{color:"#C9A86A"}}>INFRASTRUCTURE MONDIALE</b><br/>
✓ CEMAC UEMOA DOLLAR JORDANIE GOLFE<br/>
✓ Multi-devises 12 • FX taux reel Wise<br/>
✓ 9 langues + RTL Arabe Hebreu reel<br/>
✓ Mobile Money 15 operateurs<br/>
✓ RGPD PCI-DSS FaceID Empreinte<br/>
✓ Finance Halal sans Riba • Vert ESG
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE TEMPS REEL • MASQUAGE SECURISE {hide? "ON" : "OFF"}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "● MASQUE" : "● LIVE GCV"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15, marginTop:2}}>{hide? "•••• •••• PI" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8, marginTop:2}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"5px 10px", height:22}}>{w.id==="credit"? "CREDIT" : w.id==="pi"? "PRINCIPAL" : "LIVE"}</div>
</div>
))}
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{fontSize:9, color:"#64748b"}}>Reception Permanente PI</div><div style={{fontSize:10, fontWeight:900}}>{hide? "G••••••••••••A8" : gdbAddr.slice(0,16)+"..."+gdbAddr.slice(-6)}</div></div>
<div style={{display:"flex", gap:6}}><button onClick={()=>setTab("paiement")} style={{background:"#0A1931", color:"#C9A86A", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:9}}>Envoyer</button><button onClick={()=>setTab("plus")} style={{background:"#C9A86A", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:9, color:"#0A1931"}}>QR</button></div>
</div>
</div>
<div style={{padding:12}}>
<div style={{fontWeight:900, fontSize:11, color:"#0A1931"}}>HISTORIQUE INTELLIGENT • CATEGORISATION AUTO</div>
{[
{cat:"🛒 Alimentation CEMAC", n:"Carrefour N'Djamena", a:"-12.50 PI", c:"#ef4444"},
{cat:"💸 Recu P2P UEMOA", n:"Pionnier Senegal", a:"+250 PI", c:"#10b981"},
{cat:"🏦 SWIFT JORDANIE", n:"Arab Bank Amman", a:"+1,200 JOD", c:"#10b981"},
{cat:"💳 Carte GOLD GOLFE", n:"Dubai Mall", a:"-45.00 PI", c:"#ef4444"},
].map((x,i)=><div key={i} style={{background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:10, marginTop:6, display:"flex", justifyContent:"space-between"}}><div><div style={{fontSize:8, color:"#64748b"}}>{x.cat}</div><div style={{fontSize:11, fontWeight:800}}>{x.n}</div></div><div style={{fontWeight:900, color:x.c, fontSize:11}}>{hide? "••••" : x.a}</div></div>)}
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Mondiale - Reel GARGOURA DIGITAL BANK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, wordBreak:"break-all", background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10}}>{gdbAddr}</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement & Transferts - Hub Central Mondial</div>
<div style={{fontSize:9, color:"#64748b"}}>SEPA SWIFT P2P Interne Externe • CEMAC UEMOA DOLLAR JORDANIE GOLFE MOYEN-ORIENT INTERNATIONAL</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#C9A86A" : "#fff", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<select style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, fontWeight:700}}>{zones[zone].map((p:string)=><option key={p}>{p}</option>)}</select>
<input placeholder="IBAN / Numero Mobile Money / Adresse PI G..." style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input placeholder="Montant PI / USD / EUR / XAF / JOD / AED" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<button style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:11}}>Envoyer Instantane • ISO20022 • Frais 0.5%</button>
</div>

<div style={{background:"linear-gradient(135deg,#0A1931,#1e3a8a)", borderRadius:12, padding:12, marginTop:10}}>
<div style={{color:"#C9A86A", fontWeight:900, fontSize:11}}>Paiement Mobile & Sans Contact • REEL GARGOURA DIGITAL BANK</div>
<div style={{display:"flex", gap:8, marginTop:10}}>
<button style={{flex:1, padding:12, borderRadius:10, background:"#000", color:"#fff", fontWeight:900, fontSize:10, border:"1px solid #fff"}}> Apple Pay<br/><span style={{fontSize:8, fontWeight:400}}>NFC Reel • Toucher pour payer</span></button>
<button style={{flex:1, padding:12, borderRadius:10, background:"#fff", color:"#0A1931", fontWeight:900, fontSize:10, border:"none"}}>G Pay<br/><span style={{fontSize:8, fontWeight:400}}>Google Pay • Enrole • NFC</span></button>
</div>
<div style={{background:"#fff", borderRadius:10, padding:10, marginTop:10, textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800, color:"#0A1931"}}>QR Marchand - Generer pour encaisser en boutique</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:6, width:120, height:120, border:"2px solid #C9A86A", borderRadius:10}} />
</div>
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>Systeme Transfert Hybride Remittances • Mobile Money Mondial</div>
<div style={{fontSize:8, marginTop:6, lineHeight:1.5}}>Integration avec services locaux tiers pour expatries. Envoyez a vos proches meme sans banque. 15 operateurs: Orange Money BF CMR SN, MTN Money, Wave Senegal CI, Moov Africa, Airtel Money, M-Pesa Kenya, Vodacom, Jawwal Pay JO, STC Pay KSA, Etisalat UAE, bKash BD, GCash PH. Conversion XAF USD JOD AED instantanee. Delai {"<30s"} • Frais 0.8%</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>Notifications Push Intelligentes • Detaillees</div>
<div style={{marginTop:8}}>
<div style={{background:"#f0fdf4", borderRadius:8, padding:8, fontSize:9}}><b>💸 Transaction -12.50 PI</b><div>Carrefour N'Djamena • 10:42 • Solde: 12,453 PI • Son + Vibration</div></div>
<div style={{background:"#fef3c7", borderRadius:8, padding:8, marginTop:6, fontSize:9}}><b>⚠️ Solde bas EUR {"<100€"}</b><div>Votre compte EUR passe sous 100€. Rechargez via PI DEX • Alerte push</div></div>
<div style={{background:"#fef2f2", borderRadius:8, padding:8, marginTop:6, fontSize:9}}><b>🔐 Connexion suspecte</b><div>Nouvel iPhone Paris • 12:00 • Si ce n'est pas vous, bloquez carte immediatement • Email + Push</div></div>
</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:13}}>Cartes Reutilisables • Embellies comme banques reelles</div>
<div style={{fontSize:9, color:"#64748b"}}>Visa Gold Mastercard • Numeros differents • Nom utilisateur • Exp • CVV • Bloquer/debloquer instantane • Plafonds • PIN • NFC Apple Pay G Pay</div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t, boxShadow:"0 8px 24px rgba(0,0,0,0.25)", border:"1px solid rgba(255,255,255,0.2)"}}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><span style={{fontWeight:900, fontSize:11, letterSpacing:1}}>{c.name}</span><span style={{fontSize:9, background:"rgba(255,255,255,0.2)", padding:"4px 8px", borderRadius:20}}>{blocked[i]? "🔒 BLOQUEE" : "🟢 Active • NFC"}</span></div>
<div style={{marginTop:18, fontSize:14, letterSpacing:2.5, fontWeight:800, fontFamily:"monospace"}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:12, fontSize:10}}><div><div style={{opacity:0.7, fontSize:8}}>TITULAIRE / HOLDER</div><div style={{fontWeight:900, marginTop:2}}>{userName}</div></div><div><div style={{opacity:0.7, fontSize:8}}>EXPIRE</div><div style={{fontWeight:800, marginTop:2}}>{c.exp}</div></div><div><div style={{opacity:0.7, fontSize:8}}>CVV</div><div style={{fontWeight:800, marginTop:2}}>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:14}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:9, borderRadius:8, border:"none", background:blocked[i]? "#10b981" : "#ef4444", color:"#fff", fontWeight:900, fontSize:9}}>{blocked[i]? "Debloquer Instantane" : "Bloquer Instantane"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:9, borderRadius:8, border:"1px solid rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.15)", fontWeight:800, fontSize:9, color:c.t}}>PIN {showCVV? "Masquer" : "Afficher"}</button>
<button style={{padding:9, borderRadius:8, background:"#fff", color:"#0A1931", border:"none", fontWeight:800, fontSize:8}}>Plafond 5000 PI</button>
</div>
<div style={{display:"flex", gap:6, marginTop:10}}><span style={{background:"#000", color:"#fff", borderRadius:6, padding:"5px 10px", fontSize:8, fontWeight:900}}> Apple Pay Enrolee</span><span style={{background:"#4285F4", color:"#fff", borderRadius:6, padding:"5px 10px", fontSize:8, fontWeight:900}}>G Pay Enrolee</span></div>
</div>
))}
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Epargne & Investissements • Croissance Financiere</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>Outils de Budgetisation PFM • Graphiques Profonds</div>
<div style={{fontSize:8, color:"#64748b", marginTop:2}}>Analyse depenses, objectifs mensuels, alerte depassement budget 10%</div>
<div style={{display:"flex", gap:4, alignItems:"flex-end", height:60, marginTop:10}}>{[40,70,55,90,60,80,35,65].map((h,i)=><div key={i} style={{flex:1, background:i===3? "#C9A86A" : "#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#64748b", marginTop:6}}><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span><span>Total</span></div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:10, fontSize:8}}>
<div style={{background:"#fef2f2", padding:8, borderRadius:8, border:"1px solid #fecaca"}}><b>🍔 Alimentation 45%</b><br/>450 PI • Depasse! Alerte push</div>
<div style={{background:"#f0fdf4", padding:8, borderRadius:8}}><b>🚗 Transport 12%</b><br/>120 PI • Dans budget</div>
</div>
<div style={{marginTop:10, fontSize:10}}>Objectif Vacances: 450 PI / 800 PI <div style={{background:"#e2e8f0", height:8, borderRadius:10, marginTop:4}}><div style={{background:"#C9A86A", width:objectif+"%", height:8, borderRadius:10}}></div></div><button onClick={()=>setObjectif(o=>o>=100? 20 : o+10)} style={{marginTop:6, padding:6, borderRadius:6, border:"1px solid #C9A86A", background:"#fff", fontSize:9, fontWeight:700}}>Simuler Objectif +10%</button></div>
</div>

<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
<div style={{background:"linear-gradient(135deg,#0A1931,#142850)", borderRadius:12, padding:12, color:"#F9E2AF"}}>
<div style={{fontSize:9, fontWeight:800}}>Coffres-fort Epargne Virtuels • Arrondi Auto</div>
<div style={{fontWeight:900, marginTop:6, fontSize:12}}>🏦 Cagnotte Vacances</div>
<div style={{fontSize:9, marginTop:6, color:"#fff", lineHeight:1.5}}>Chaque achat arrondi au centime superieur: Ex achat 12.30 PI → 13 PI, 0.70 PI va en cagnotte automatiquement. Exemple projet vacances ou projet maison. Bloque jusqu'au 01/01/2027. Solde coffre: 87.5 PI. Interet 3% Halal.</div>
<div style={{marginTop:8, background:"rgba(255,255,255,0.15)", borderRadius:8, padding:8, fontSize:9, color:"#fff"}}>🔒 Bloque • +2.34 PI cette semaine</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}>
<div style={{fontSize:9, fontWeight:800}}>Credits & Micro-credits Express • Simulation</div>
<div style={{fontWeight:900, marginTop:4, color:"#0A1931", fontSize:12}}>💰 50 - 5000 PI</div>
<div style={{fontSize:8, marginTop:4, lineHeight:1.4}}>Pret consommation, eco-pret solaire, education. Demande + simulation + reponse principe immediate par IA + score KYC. Mensualite calculee. Taux 2.5% Halal sans Riba option Mudaraba. Delai {"<2min"}</div>
<input type="range" min={50} max={5000} defaultValue={500} style={{width:"100%", marginTop:8}} />
<div style={{fontSize:9, marginTop:4, fontWeight:800}}>Mensualite ~52 PI/mois sur 12 mois</div>
<button style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Demande Immediate • Reponse IA</button>
</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>Investissements Accessibles • Debutant Familiarise Pro</div>
<div style={{fontSize:8, color:"#64748b"}}>Achat simplifie actions, ETF, cryptomonnaies, or, adapte debutants, familiarises et pro</div>
<div style={{display:"flex", gap:6, marginTop:8, flexWrap:"wrap"}}>
{["📈 Tesla","ETF S&P500","₿ BTC/PI","🥇 Or Physique","🌱 Vert ESG 8.5","☪️ Halal Sans Riba"].map(t=><span key={t} style={{background:"#f1f5f9", padding:"6px 10px", borderRadius:20, fontSize:8, fontWeight:800, border:"1px solid #e2e8f0"}}>{t}</span>)}
</div>
<div style={{marginTop:8, fontSize:8, color:"#334155"}}>Debutant 10 PI mini • Familiarise graph avance • Pro levier. Filtre ethique vert, Halal certifie AAOIFI.</div>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10, alignItems:"center"}}>
<img src="/logo.png" style={{width:48, height:48, borderRadius:12, background:"#fff", padding:2}} alt="logo" />
<div><div style={{color:"#F9E2AF", fontWeight:900, fontSize:13}}>GARGOURA DIGITAL BANK</div><div style={{fontSize:9, color:"#94a3b8"}}>{gdbAddr.slice(0,20)}... • {kycOk? "✅ RGPD Verifie" : "KYC en attente"}</div><div style={{fontSize:8, color:"#C9A86A"}}>PROFIL & SUPPORT MONDIAL</div></div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>💱 Comptes Multi-devises & FX Reduits • Type Wise/Revolut • Detaille</div>
<div style={{fontSize:8, marginTop:6, color:"#334155", lineHeight:1.6}}>Possibilite de detenir, recevoir et echanger plusieurs devises sans frais caches, au taux de change interbancaire reel. Detenez 12 devises dans un seul IBAN virtuel: PI GCV, USD, EUR, XAF, XOF, JOD, AED, SAR, GBP, CNY, TRY, INR. Recevez comme un local avec RIB US (ACH), IBAN EU SEPA, numero mobile XAF XOF, JOD IBAN. Echangez au taux interbancaire reel. Exemple: 1000 XAF → 1.52 EUR taux reel, frais 0.43% affiche avant validation. Conversion PI vers Fiat instantanee via PiDEX GCV 314159$ • 0% commission PI. IBAN virtuel gratuit.</div>
<div style={{display:"flex", gap:6, marginTop:10}}><input placeholder="1000 XAF" style={{flex:1, padding:8, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} /><span style={{padding:8, fontWeight:900}}>→</span><input placeholder="1.52 EUR" style={{flex:1, padding:8, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} /></div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>🔐 Conformite & Securite Internationales • Detaille RGPD PCI-DSS</div>
<div style={{fontSize:8, marginTop:6, color:"#334155", lineHeight:1.6}}>
<b>Biometrie forte:</b> FaceID Empreinte TouchID 2FA OTP SMS.<br/>
<b>RGPD Europe:</b> Donnees chiffrees AES-256 region EU, serveurs Frankfurt, droit a l'oubli, consentement explicite, DPO.<br/>
<b>PCI-DSS Niveau 1:</b> Cartes tokenisees, CVV jamais stocke, 3D Secure 2.0, cryptogramme dynamique.<br/>
<b>ISO20022 SWIFT gpi:</b> Tracking bout en bout.<br/>
<b>Alertes:</b> Tentative connexion suspecte = push + blocage + email + SMS.<br/>
<b>Chat securise:</b> Messages E2E chiffrees AES.
</div>
<button onClick={()=>setKycOk(true)} style={{marginTop:8, width:"100%", padding:10, borderRadius:8, background:kycOk? "#10b981" : "#0A1931", color:kycOk? "#fff" : "#C9A86A", border:"none", fontWeight:900, fontSize:10}}>{kycOk? "✅ Securite Active FaceID • RGPD" : "Activer KYC + FaceID + RGPD"}</button>
</div>

<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:12, padding:12, marginTop:10, border:"1px solid #f59e0b"}}>
<div style={{fontWeight:900, fontSize:11, color:"#92400e"}}>☪️ Finance Inclusive/Alternative • Halal Vert Ethique • Detaille</div>
<div style={{fontSize:8, marginTop:6, color:"#78350f", lineHeight:1.5}}>
<b>Halal sans Riba (interet):</b> Pas d'interet. Contrats: Mudaraba (partage profit banque/entrepreneur), Musharaka (co-entreprise profit/perte), Murabaha (achat + marge beneficiaire fixe transparente). Investissements filtres: pas d'alcool, tabac, jeux hasard, armement. Certifie AAOIFI par comite Sharia. Option Zakat automatique 2.5% annuelle calculee sur epargne {" > Nissab"}. Compte Halal sans decouvert.<br/>
<b>Vert ESG:</b> Score ESG 8.5/10, projets solaire Tchad, eolien, eco-pret taux 0% pour panneaux solaires, filtrage entreprises polluantes.<br/>
<b>Inclusif:</b> Compte sans condition revenu, acces Mobile Money pour non-bancarises, KYC simplifie avec piece locale.
</div>
<div style={{display:"flex", gap:6, marginTop:8}}><span style={{background:"#fff", padding:"5px 10px", borderRadius:20, fontSize:8, fontWeight:800}}>✅ Halal ON AAOIFI</span><span style={{background:"#10b981", color:"#fff", padding:"5px 10px", borderRadius:20, fontSize:8, fontWeight:800}}>🌱 Vert ESG 8.5</span></div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:11}}>💬 Messagerie & Support In-App 24/7 • Chatbot + Humain</div>
<div style={{background:"#f8fafc", borderRadius:8, padding:8, marginTop:8, fontSize:9}}>
<div style={{background:"#0A1931", color:"#C9A86A", padding:"6px 10px", borderRadius:12, borderBottomLeftRadius:2, display:"inline-block"}}>Salam! GARGOURA DIGITAL BANK 🌍 Besoin aide transfert CEMAC?</div>
<div style={{textAlign:"right", marginTop:6}}><div style={{background:"#e2e8f0", padding:"6px 10px", borderRadius:12, borderBottomRightRadius:2, display:"inline-block"}}>Probleme virement XAF Tchad?</div></div>
</div>
<div style={{display:"flex", gap:6, marginTop:8}}><input placeholder="Ecrivez ici... Support 24/7" style={{flex:1, padding:10, borderRadius:20, border:"1px solid #e2e8f0", fontSize:9}} /><button style={{background:"#0A1931", color:"#C9A86A", border:"none", borderRadius:20, padding:"10px 16px", fontWeight:900, fontSize:9}}>Envoyer</button></div>
<div style={{fontSize:8, color:"#64748b", marginTop:6}}>📞 (+235) 92 82 52 62 • gargouradigitalbank@gmail.com • Humain {"<30s"} • 9 langues FR EN AR ES ZH RU IT VI AM • RTL Arabe Hebreu reel</div>
</div>
</div>
)}

<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"94%", maxWidth:440, background:"#fff", borderRadius:22, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", border:"1px solid #E2E8F0", display:"flex", justifyContent:"space-around", padding:"6px 0", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Accueil"},{id:"paiement", ic:"💸", l:"Paiement"},{id:"cartes", ic:"💳", l:"Cartes"},{id:"epargne", ic:"📈", l:"Epargne"},{id:"plus", ic:"☰", l:"Plus"}].map((b)=>(
<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none", background:tab===b.id? "#0A1931" : "transparent", color:tab===b.id? "#C9A86A" : "#0A1931", borderRadius:14, padding:"6px 10px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:8, fontWeight:800}}>
<span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span>
</button>
))}
</div>
</div>
)
}
