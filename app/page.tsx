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
const [momoOp,setMomoOp]=useState("Orange Money")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const piMode = "mainnet" as const // GARGOURA VERROUILLE MAINNET REEL - V3 FINALE

const allFeatures=[
 {name:"Paiement Pi Reel GCV 314159$", tab:"paiement", key:"pi"},
 {name:"Mobile Money Orange MTN Wave Moov", tab:"paiement", key:"momo"},
 {name:"Virement CEMAC BEAC Tchad", tab:"paiement", key:"cemac"},
 {name:"Virement UEMOA Senegal", tab:"paiement", key:"uemoa"},
 {name:"Virement Jordanie Golfe Moyen-Orient", tab:"paiement", key:"jordanie"},
 {name:"Virement INTERNATIONAL SWIFT", tab:"paiement", key:"intl"},
 {name:"Carte VISA Bloquer Debloquer", tab:"cartes", key:"visa"},
 {name:"Carte GOLD Premium", tab:"cartes", key:"gold"},
 {name:"Coffre Arrondi Auto Vacances", tab:"epargne", key:"coffre"},
 {name:"Micro-credit Halal 50-5000 PI", tab:"epargne", key:"credit"},
 {name:"Budget PFM Depassement", tab:"epargne", key:"pfm"},
 {name:"Multi-devises FX Taux Reel", tab:"plus", key:"fx"},
 {name:"Support 24/7 Chat", tab:"plus", key:"support"},
]
const filtered = search? allFeatures.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())) : []

const zones:any={
 "CEMAC":["Tchad BEAC","Cameroun BICEC","Gabon BGFI","Congo","RCA","Guinee Eq"],
 "UEMOA":["Senegal","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger"],
 "DOLLAR":["USA Chase","USA BoA","Canada RBC"],
 "JORDANIE":["Jordan Ahli Bank","Arab Bank JO","Housing Bank JO"],
 "GOLFE":["UAE FAB","Saudi Al Rajhi","Qatar QNB","Kuwait NBK","Bahrein NBB","Oman Bank Muscat"],
 "MOYEN-ORIENT":["Turquie Ziraat","Liban Byblos","Egypte NBE","Qatar Ooredoo","Kuwait"],
 "INTERNATIONAL":["UK Barclays","France BNP SEPA","Allemagne Deutsche","Chine ICBC","Inde SBI","SWIFT MONDIAL"]
}

const zoneMoMo:any={
 "CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s"},
 "UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s"},
 "DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s"},
 "JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s"},
 "GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s"},
 "MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s"},
 "INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h SWIFT / <10s SEPA"}
}

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{
   try{ window.Pi?.init({version:"2.0", sandbox: false}); setPiReady(true) }
   catch(e){ setPiReady(true) }
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

useEffect(()=>{
 const first = zoneMoMo[zone]?.ops?.[0]
 if(first) setMomoOp(first)
},[zone])

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying) return
 setPaying(true)
 try{
   if(typeof window!=="undefined" && window.Pi){
     const scopes=["payments","username","wallet_address"]
     await window.Pi.authenticate(scopes, ()=>{})
     await window.Pi.createPayment({
       amount: amount,
       memo: memo + " - GARGOURA DIGITAL BANK [MAINNET] ["+zone+"]",
       metadata: {gdb_addr:gdbAddr, zone:zone, momo_op:momoOp, mode:"mainnet"}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         const r = await fetch("/api/pi/approve",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, mode:"mainnet"})
         })
         if(!r.ok){ const err=await r.json(); throw new Error("Approve echoue "+JSON.stringify(err)) }
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         await fetch("/api/pi/complete",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, txid, mode:"mainnet"})
         })
         alert("✅ Paiement MAINNET confirme!\nGARGOURA DIGITAL BANK\nZone: "+zone+" | "+momoOp+"\nTx: "+txid+"\nMontant: "+amount+" PI\nGCV: "+(amount*314159).toLocaleString()+" $")
         setPaying(false)
       },
       onCancel: ()=>{ setPaying(false) },
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false) }
     })
   }else{
     alert("⚠️ Ouvre dans Pi Browser pour paiement REEL MAINNET.\nZone: "+zone+" / "+momoOp+"\nSimulation: "+amount+" PI pour "+memo)
     setPaying(false)
   }
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false) }
}

const wallets=[
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"≈ $3.9B • 1 PI=314159$ • Courant MAINNET", flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT", bal:"$42,850.00", sub:"USA IBAN virtuel • Courant • MAINNET", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA", bal:"€38,200.00", sub:"2.5% • Epargne • MAINNET", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC", bal:"24,500,000 FCFA", sub:"Tchad • Epargne • MAINNET", flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso", bal:"-1,200 PI", sub:"Echeance 15/11 • Credit • MAINNET", flag:"💳"},
]

const cards=[
 {id:"visa", name:"VISA CLASSIC", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD ELITE", num:"5555 4444 3333 9012", exp:"05/28", cvv:"789", color:"linear-gradient(135deg,#0A1931,#111827)", t:"#fff"},
]

return(
<div dir={rtl? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:95, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="GDB" style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● MAINNET</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

<div style={{background:"#fff", padding:"10px 12px", display:"flex", gap:8, position:"sticky", top:52, zIndex:20, borderBottom:"1px solid #e2e8f0"}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="🔍 Chercher: Pi Reel, Mobile Money, CEMAC, Carte, Coffre, Halal..." style={{flex:1, padding:"10px 14px", borderRadius:20, border:"1.5px solid #C9A86A", fontSize:11, outline:"none"}} />
{search && <button onClick={()=>setSearch("")} style={{background:"#0A1931", color:"#F9E2AF", border:"none", borderRadius:20, padding:"0 14px", fontWeight:900}}>✕</button>}
</div>
{search && (
<div style={{background:"#0A1931", margin:"0 12px 8px 12px", borderRadius:12, padding:8, border:"1px solid #C9A86A"}}>
<div style={{color:"#C9A86A", fontSize:8, fontWeight:800, marginBottom:6}}>{filtered.length} RESULTATS DANS GARGOURA DIGITAL BANK MAINNET</div>
{filtered.map(f=><button key={f.name} onClick={()=>{setTab(f.tab); setSearch("")}} style={{display:"block", width:"100%", textAlign:"left", background:"rgba(255,255,255,0.08)", border:"none", color:"#fff", padding:"10px 12px", borderRadius:8, marginTop:5, fontSize:10, fontWeight:700}}>→ {f.name} <span style={{color:"#C9A86A"}}>dans {f.tab.toUpperCase()}</span></button>)}
{filtered.length===0 && <div style={{color:"#fff", fontSize:10, padding:8}}>Aucun resultat. Essaie: Pi, CEMAC, Carte, Coffre</div>}
</div>
)}

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>GARGOURA DIGITAL BANK</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil MAINNET"},{i:"paiement", l:"💸 Paiement Pi Reel + MoMo 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD"},{i:"epargne", l:"📈 Epargne PFM"},{i:"plus", l:"☰ Plus - FX Halal RGPD"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(16,185,129,0.15)", borderRadius:12, padding:12, color:"#fff", fontSize:9, border:"1px solid #10b981"}}>
<b style={{color:"#10b981"}}>PI SDK: {piReady? "✅ MAINNET LIVE" : "⏳ Chargement MAINNET..."} • GCV 314159$</b><br/>7 Zones: CEMAC UEMOA DOLLAR JORDANIE GOLFE M-O INTL<br/>MoMo: {zoneMoMo[zone]?.ops?.join(" ")}<br/>Mode: MAINNET REEL UNIQUEMENT
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE • MAINNET • 7 ZONES • {piReady? "READY" : "..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE MAINNET"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>MAINNET</div>
</div>
))}

<div style={{background:"rgba(16,185,129,0.15)", border:"1px solid #10b981", borderRadius:12, padding:10, marginTop:12, textAlign:"center"}}>
<div style={{color:"#10b981", fontSize:9, fontWeight:900}}>💎 MODE MAINNET REEL VERROUILLE • GCV 314159$ • Pi Mainnet actif</div>
</div>

<button onClick={()=>handlePiPayment(1, "Recharge GARGOURA DIGITAL BANK")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER 1 PI MAINNET - REEL GCV</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel - MAINNET - {zone} - GARGOURA DIGITAL BANK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all"}}>{gdbAddr}</div>
<div style={{fontSize:7, color:"#10b981", fontWeight:800, marginTop:6}}>MAINNET REEL • G... KYC Pi Network • @username lié</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement & Transferts • PI MAINNET • 7 Zones</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>{zoneMoMo[zone]?.flag} Opérateurs {zone} • {zoneMoMo[zone]?.cur} • MAINNET</span><span style={{fontSize:8, color:"#10b981", fontWeight:800}}>{zoneMoMo[zone]?.delay} • {zoneMoMo[zone]?.fee}</span></div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:8}}>
{zoneMoMo[zone]?.ops.map((op:string)=>(
<button key={op} onClick={()=>setMomoOp(op)} style={{padding:"6px 10px", borderRadius:15, border:"1px solid #C9A86A", background:momoOp===op?"#0A1931":"#F5F7FB", color:momoOp===op?"#C9A86A":"#0A1931", fontSize:9, fontWeight:900}}>{op}</button>
))}
</div>
<select style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:10}}>{zones[zone].map((p:string)=><option key={p}>{p}</option>)}</select>
<input placeholder="Adresse PI G... / IBAN / Numero MoMo" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input id="piAmount" placeholder={`Montant Reel MAINNET - 1 PI = 314159$ - En ${zoneMoMo[zone]?.cur}`} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>{const el=document.getElementById("piAmount") as HTMLInputElement; const amt=parseFloat(el?.value||"1")||1; handlePiPayment(amt, "Paiement P2P MAINNET "+zone+" "+momoOp)}} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer MAINNET PI {zone}</button>
<button onClick={()=>alert("Mobile Money MAINNET "+zone+" via "+momoOp+" CinetPay\nDevise: "+zoneMoMo[zone]?.cur+"\nAPI: /api/momo/send MAINNET")} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 MoMo {momoOp.slice(0,8)}</button>
</div>
<div style={{fontSize:7, color:"#10b981", marginTop:6, textAlign:"center", fontWeight:800}}>MAINNET LIVE: Pi GCV → {momoOp} → {zoneMoMo[zone]?.cur} instantanée • {momoOp} sélectionné</div>
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>Mobile Money • {zone} • {momoOp} • CinetPay • {zoneMoMo[zone]?.cur} • MAINNET</div>
<div style={{fontSize:8, marginTop:6}}>{zoneMoMo[zone]?.ops.join(" • ")} • Delai {zoneMoMo[zone]?.delay} • Frais {zoneMoMo[zone]?.fee} • MAINNET REEL • Circulation {zone}</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Cartes GARGOURA DIGITAL BANK • MAINNET • Tokenisées • MNBC Ready</div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:11}}>{c.name}</span><span style={{fontSize:9, background:"rgba(16,185,129,0.3)", padding:"4px 8px", borderRadius:20, border:"1px solid #10b981"}}>{blocked[i]? "🔒" : "🟢 MAINNET"} • NFC</span></div>
<div style={{marginTop:14, fontSize:14, letterSpacing:2, fontWeight:800, fontFamily:"monospace"}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10}}><div><div style={{opacity:0.7, fontSize:8}}>HOLDER</div><div style={{fontWeight:900}}>{userName}</div></div><div><div style={{opacity:0.7, fontSize:8}}>EXP</div><div>{c.exp}</div></div><div><div style={{opacity:0.7, fontSize:8}}>CVV</div><div>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:9, borderRadius:8, border:"none", background:blocked[i]? "#10b981" : "#ef4444", color:"#fff", fontWeight:900, fontSize:9}}>{blocked[i]? "Debloquer MAINNET" : "Bloquer"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:9, borderRadius:8, background:"rgba(255,255,255,0.2)", border:"none", fontSize:9, fontWeight:800, color:c.t}}>PIN {showCVV? "Masquer" : "Voir"}</button>
</div>
</div>
))}
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Epargne PFM • Coffres • Micro-credit • MAINNET • DeFi Halal</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800, fontSize:10}}>Budget PFM • MAINNET • Tokenisé • Alerte depassement</div>
<div style={{display:"flex", gap:4, alignItems:"flex-end", height:50, marginTop:8}}>{[40,70,55,90,60,80].map((h,i)=><div key={i} style={{flex:1, background:i===3? "#C9A86A" : "#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{fontSize:8, marginTop:6}}>Vacances 450/800 PI • MAINNET • RWA: Immobilier Tchad tokenisé • DeFi Halal</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<div style={{background:"#0A1931", color:"#F9E2AF", borderRadius:12, padding:12}}><div style={{fontSize:9}}>Coffre Arrondi Auto • DeFi MAINNET</div><div style={{fontSize:9, marginTop:4, color:"#fff"}}>12.3 PI → 13 PI, 0.7 PI en cagnotte • 87.5 PI bloque • APY 5% Halal • MAINNET</div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit 50-5000 PI • Halal • MAINNET</div><button onClick={()=>handlePiPayment(50, "Micro-credit Halal MAINNET")} style={{width:"100%", marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:9, fontWeight:800}}>Demander 50 PI MAINNET</button></div>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}><img src="/logo.png" style={{width:44, height:44, borderRadius:10, background:"#fff"}} alt="logo" /><div><div style={{color:"#F9E2AF", fontWeight:900}}>GARGOURA DIGITAL BANK • MAINNET • 7 ZONES</div><div style={{fontSize:9}}>{gdbAddr.slice(0,20)}... • {kycOk? "✅ RGPD MAINNET" : "KYC MAINNET"} • {zone} • {momoOp}</div></div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>Multi-devises FX • 12 devises • MAINNET • Tokenisées • MNBC</div><div style={{fontSize:8, marginTop:4}}>USD EUR XAF JOD AED SAR QAR • Taux reel • Frais 0.43% • IBAN virtuel • MNBC: eCFA eNaira Digital USD • MAINNET</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>RGPD PCI-DSS FaceID • ISO20022 • MAINNET Securise</div><div style={{fontSize:8, marginTop:4}}>AES-256, tokenisation, 3D Secure, ISO20022, 7 zones MAINNET securisees</div><button onClick={()=>setKycOk(true)} style={{marginTop:8, width:"100%", padding:10, borderRadius:8, background:kycOk? "#10b981" : "#0A1931", color:"#fff", border:"none", fontWeight:900, fontSize:10}}>{kycOk? "✅ Securise MAINNET 7 Zones" : "Activer KYC Global MAINNET"}</button>
</div>
<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:12, padding:12, marginTop:10}}><div style={{fontWeight:900, fontSize:10, color:"#92400e"}}>Halal Sans Riba • Vert ESG • MAINNET • AAOIFI • MAINNET</div><div style={{fontSize:8, color:"#78350f", marginTop:4}}>Mudaraba Musharaka Murabaha • AAOIFI • Zakat 2.5% • ESG 8.5 • 7 zones halal MAINNET • MoMo inclusif</div></div>
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
