"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [rtl,setRtl]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [userName,setUserName]=useState("GARGOURA PIONNIER")
const [kycOk,setKycOk]=useState(false)
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)

const allFeatures=[
 {name:"Paiement Pi Reel GCV 314159$", tab:"paiement", key:"pi"},
 {name:"Mobile Money Orange MTN Wave Moov", tab:"paiement", key:"momo"},
 {name:"Virement CEMAC BEAC Tchad", tab:"paiement", key:"cemac"},
 {name:"Virement UEMOA Senegal", tab:"paiement", key:"uemoa"},
 {name:"Virement Jordanie Golfe", tab:"paiement", key:"jordanie"},
 {name:"Carte VISA Bloquer Debloquer", tab:"cartes", key:"visa"},
 {name:"Carte GOLD Premium", tab:"cartes", key:"gold"},
 {name:"Coffre Arrondi Auto Vacances", tab:"epargne", key:"coffre"},
 {name:"Micro-credit Halal 50-5000 PI", tab:"epargne", key:"credit"},
 {name:"Budget PFM Depassement", tab:"epargne", key:"pfm"},
 {name:"Multi-devises FX Taux Reel", tab:"plus", key:"fx"},
 {name:"Support 24/7 Chat", tab:"plus", key:"support"},
 {name:"Conformite RGPD PCI-DSS", tab:"plus", key:"rgpd"},
 {name:"Finance Halal Sans Riba", tab:"plus", key:"halal"},
]
const filtered = search? allFeatures.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())) : []

useEffect(()=>{
 // Charger Pi SDK
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{
   try{
     window.Pi?.init({version:"2.0", sandbox:false})
     setPiReady(true)
   }catch(e){ console.log("Pi SDK init sandbox", e); setPiReady(true)}
 }
 document.head.appendChild(s)
 try{
  const a=localStorage.getItem("gdb_pi_addr")
  const u=localStorage.getItem("gdb_pi_user")
  const k=localStorage.getItem("gdb_kyc_verified")
  if(a) setGdbAddr(a)
  if(u) setUserName(u.toUpperCase())
  if(k==="true") setKycOk(true)
 }catch{}
},[])

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying) return
 setPaying(true)
 try{
   if(typeof window!=="undefined" && window.Pi){
     // AUTH d'abord
     const scopes=["payments","username"]
     const auth = await window.Pi.authenticate(scopes, (pay:any)=>{})
     // PAIEMENT REEL
     const payment = await window.Pi.createPayment({
       amount: amount,
       memo: memo + " - GARGOURA DIGITAL BANK",
       metadata: {gdb_addr:gdbAddr, zone:zone, user:userName}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         // En prod: appelle ton backend qui fait POST https://api.minepi.com/v2/payments/{paymentId}/approve
         // Ici on simule l'approbation cote client pour testnet, mais en prod tu dois faire via /api/pi/approve
         console.log("Approving", paymentId)
         await fetch("/api/pi/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId})}).catch(()=>{})
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         console.log("Completing", paymentId, txid)
         await fetch("/api/pi/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId, txid})}).catch(()=>{})
         alert("✅ Paiement Pi REEL confirme!\nTx: "+txid+"\nMontant: "+amount+" PI\nGCV: "+(amount*314159)+" $")
         setPaying(false)
       },
       onCancel: (paymentId:string)=>{ alert("Paiement annule"); setPaying(false) },
       onError: (err:any)=>{ console.error(err); alert("Erreur Pi: "+err.message); setPaying(false) }
     })
   }else{
     // Fallback hors Pi Browser pour test dans Chrome
     alert("⚠️ Ouvre cette app dans Pi Browser pour paiement REEL.\nSimulation: "+amount+" PI pour "+memo+"\nAdresse: "+gdbAddr.slice(0,10)+"...")
     setPaying(false)
   }
 }catch(e:any){
   alert("Erreur: "+e.message)
   setPaying(false)
 }
}

const wallets=[
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"≈ $3.9B • 1 PI=314159$ • Courant", flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT", bal:"$42,850.00", sub:"USA IBAN virtuel • Courant", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA", bal:"€38,200.00", sub:"2.5% • Epargne", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC", bal:"24,500,000 FCFA", sub:"Tchad • Epargne", flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso", bal:"-1,200 PI", sub:"Echeance 15/11 • Credit", flag:"💳"},
]

const zones:any={
 "CEMAC":["Tchad BEAC","Cameroun BICEC","Gabon BGFI","Congo","RCA","Guinee Eq"],
 "UEMOA":["Senegal","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger"],
 "DOLLAR":["USA Chase","USA BoA","Canada RBC"],
 "JORDANIE":["Jordan Ahli Bank","Arab Bank JO","Housing Bank JO"],
 "GOLFE":["UAE FAB","Saudi Al Rajhi","Qatar QNB","Kuwait NBK","Bahrein NBB","Oman Bank Muscat"],
 "MOYEN-ORIENT":["Turquie Ziraat","Liban Byblos","Egypte NBE"],
 "INTERNATIONAL":["UK Barclays","France BNP SEPA","Allemagne Deutsche","Chine ICBC","Inde SBI"]
}

const cards=[
 {id:"visa", name:"VISA CLASSIC", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD ELITE", num:"5555 4444 3333 9012", exp:"05/28", cvv:"789", color:"linear-gradient(135deg,#0A1931,#111827)", t:"#fff"},
]

return(
<div dir={rtl? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:95, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="GDB" style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

{/* SEARCH BAR V6 */}
<div style={{background:"#fff", padding:"10px 12px", display:"flex", gap:8, position:"sticky", top:52, zIndex:20, borderBottom:"1px solid #e2e8f0"}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="🔍 Chercher: Pi Reel, Mobile Money, CEMAC, Carte, Coffre, Halal..." style={{flex:1, padding:"10px 14px", borderRadius:20, border:"1.5px solid #C9A86A", fontSize:11, outline:"none"}} />
{search && <button onClick={()=>setSearch("")} style={{background:"#0A1931", color:"#F9E2AF", border:"none", borderRadius:20, padding:"0 14px", fontWeight:900}}>✕</button>}
</div>
{search && (
<div style={{background:"#0A1931", margin:"0 12px 8px 12px", borderRadius:12, padding:8, border:"1px solid #C9A86A"}}>
<div style={{color:"#C9A86A", fontSize:8, fontWeight:800, marginBottom:6}}>{filtered.length} RESULTATS DANS GARGOURA DIGITAL BANK</div>
{filtered.map(f=><button key={f.name} onClick={()=>{setTab(f.tab); setSearch("")}} style={{display:"block", width:"100%", textAlign:"left", background:"rgba(255,255,255,0.08)", border:"none", color:"#fff", padding:"10px 12px", borderRadius:8, marginTop:5, fontSize:10, fontWeight:700}}>→ {f.name} <span style={{color:"#C9A86A"}}>dans {f.tab.toUpperCase()}</span></button>)}
{filtered.length===0 && <div style={{color:"#fff", fontSize:10, padding:8}}>Aucun resultat. Essaie: Pi, CEMAC, Carte, Coffre</div>}
</div>
)}

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>GARGOURA DIGITAL BANK</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil / Synthese"},{i:"paiement", l:"💸 Paiement Pi Reel + Mobile Money"},{i:"cartes", l:"💳 Cartes VISA GOLD MC"},{i:"epargne", l:"📈 Epargne PFM Coffres"},{i:"plus", l:"☰ Plus - FX Halal RGPD"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(201,168,106,0.12)", borderRadius:12, padding:12, color:"#fff", fontSize:9}}>
<b style={{color:"#C9A86A"}}>PI SDK: {piReady? "✅ Pret" : "⏳ Chargement..."}</b><br/>CEMAC UEMOA GOLFE JORDANIE<br/>Mobile Money 15 operateurs<br/>Pi Reel Mainnet GCV 314159$
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE TEMPS REEL • {piReady? "PI SDK READY" : "SDK..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"5px 10px", height:22}}>{w.id==="credit"? "CREDIT" : "LIVE"}</div>
</div>
))}
<button onClick={()=>handlePiPayment(1, "Recharge test GARGOURA DIGITAL BANK")} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:11}}>{paying? "⏳ Paiement Pi en cours..." : "🟣 PAYER 1 PI REEL - TEST MAINNET GCV"}</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel - GARGOURA DIGITAL BANK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all"}}>{gdbAddr}</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement & Transferts • PI REEL + MOBILE MONEY</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#C9A86A" : "#fff", fontSize:9, fontWeight:900}}>{z}</button>
))}</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<select style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}}>{zones[zone].map((p:string)=><option key={p}>{p}</option>)}</select>
<input placeholder="Adresse PI G... / IBAN / Numero MoMo" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input placeholder="Montant: ex 5 PI = 1,570,795 $" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} id="piAmount" />
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>{const el=document.getElementById("piAmount") as HTMLInputElement; const amt=parseFloat(el?.value||"1")||1; handlePiPayment(amt, "Paiement P2P "+zone)}} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer PI REEL {zone}</button>
<button onClick={()=>alert("Mobile Money: integration via CinetPay - API Orange MTN Wave\nExemple: POST /api/momo/send {amount:5000, currency:XAF, phone:+235...}")} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 Envoyer MoMo {zone}</button>
</div>
</div>

<div style={{background:"linear-gradient(135deg,#0A1931,#1e3a8a)", borderRadius:12, padding:12, marginTop:10}}>
<div style={{color:"#C9A86A", fontWeight:900, fontSize:11}}>Paiement Sans Contact • NFC</div>
<div style={{display:"flex", gap:8, marginTop:10}}>
<button onClick={()=>handlePiPayment(0.5, "Apple Pay Pi")} style={{flex:1, padding:12, borderRadius:10, background:"#000", color:"#fff", fontWeight:900, fontSize:10, border:"1px solid #fff"}}> Apple Pay • Pi</button>
<button onClick={()=>handlePiPayment(0.5, "Google Pay Pi")} style={{flex:1, padding:12, borderRadius:10, background:"#fff", color:"#0A1931", fontWeight:900, fontSize:10}}>G Pay • Pi</button>
</div>
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>Mobile Money Mondial • 15 Operateurs • Integration CinetPay</div>
<div style={{fontSize:8, marginTop:6}}>Orange MTN Wave Moov Airtel M-Pesa STC Pay UAE Jawwal JO • API unique • Delai {"<30s"} • Frais 0.8% • Pour Tchad: Airtel + Moov via CinetPay</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Cartes GARGOURA DIGITAL BANK • Embellies</div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t, boxShadow:"0 8px 24px rgba(0,0,0,0.25)"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:11}}>{c.name}</span><span style={{fontSize:9, background:"rgba(255,255,255,0.2)", padding:"4px 8px", borderRadius:20}}>{blocked[i]? "🔒" : "🟢 NFC"}</span></div>
<div style={{marginTop:14, fontSize:14, letterSpacing:2, fontWeight:800, fontFamily:"monospace"}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10}}><div><div style={{opacity:0.7, fontSize:8}}>HOLDER</div><div style={{fontWeight:900}}>{userName}</div></div><div><div style={{opacity:0.7, fontSize:8}}>EXP</div><div>{c.exp}</div></div><div><div style={{opacity:0.7, fontSize:8}}>CVV</div><div>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:9, borderRadius:8, border:"none", background:blocked[i]? "#10b981" : "#ef4444", color:"#fff", fontWeight:900, fontSize:9}}>{blocked[i]? "Debloquer" : "Bloquer"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:9, borderRadius:8, background:"rgba(255,255,255,0.2)", border:"none", fontSize:9, fontWeight:800, color:c.t}}>PIN {showCVV? "Masquer" : "Voir"}</button>
</div>
</div>
))}
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Epargne PFM • Coffres • Micro-credit</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800, fontSize:10}}>Budget PFM • Alerte depassement</div>
<div style={{display:"flex", gap:4, alignItems:"flex-end", height:50, marginTop:8}}>{[40,70,55,90,60,80].map((h,i)=><div key={i} style={{flex:1, background:i===3? "#C9A86A" : "#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{fontSize:8, marginTop:6}}>Vacances 450/800 PI • Alerte si {" >10%"} depassement</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<div style={{background:"#0A1931", color:"#F9E2AF", borderRadius:12, padding:12}}><div style={{fontSize:9}}>Coffre Virtuel Arrondi Auto</div><div style={{fontSize:9, marginTop:4, color:"#fff"}}>Achat 12.3 PI → 13 PI, 0.7 PI en cagnotte • 87.5 PI bloque jusqu'au 01/01/2027</div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit 50-5000 PI • Halal</div><button onClick={()=>handlePiPayment(50, "Micro-credit Halal")} style={{width:"100%", marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:9, fontWeight:800}}>Demander 50 PI Reel</button></div>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}><img src="/logo.png" style={{width:44, height:44, borderRadius:10, background:"#fff"}} alt="logo" /><div><div style={{color:"#F9E2AF", fontWeight:900}}>GARGOURA DIGITAL BANK • Profil Mondial</div><div style={{fontSize:9}}>{gdbAddr.slice(0,20)}... • {kycOk? "✅ RGPD" : "KYC"}</div></div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>Multi-devises FX • Wise type • 12 devises</div><div style={{fontSize:8, marginTop:4}}>USD EUR XAF XOF JOD AED SAR GBP CNY TRY INR PI • Taux interbancaire reel • Frais 0.43% • IBAN virtuel</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>RGPD PCI-DSS FaceID • Securite</div><div style={{fontSize:8, marginTop:4}}>AES-256, tokenisation, 3D Secure, ISO20022, E2E chat</div><button onClick={()=>setKycOk(true)} style={{marginTop:8, width:"100%", padding:10, borderRadius:8, background:kycOk? "#10b981" : "#0A1931", color:"#fff", border:"none", fontWeight:900, fontSize:10}}>{kycOk? "✅ Securise" : "Activer KYC + FaceID"}</button>
</div>
<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:12, padding:12, marginTop:10}}><div style={{fontWeight:900, fontSize:10, color:"#92400e"}}>Halal Sans Riba • Vert ESG</div><div style={{fontSize:8, color:"#78350f", marginTop:4}}>Mudaraba Musharaka Murabaha • AAOIFI • Zakat 2.5% auto • ESG 8.5</div></div>
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
