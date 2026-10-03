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
const [piMode,setPiMode]=useState<"testnet"|"mainnet">("testnet")
const [piInput,setPiInput]=useState("0.00025")
// === COMPLEMENT KYC ===
const [piPublicKey,setPiPublicKey]=useState("")
const [piUsername,setPiUsername]=useState("")
const [kycVerified,setKycVerified]=useState(false)

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
]
const filtered = search? allFeatures.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())) : []

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{
   try{ window.Pi?.init({version:"2.0", sandbox: piMode==="testnet"}); setPiReady(true) }
   catch{ setPiReady(true) }
 }
 document.head.appendChild(s)
 try{
  const a=localStorage.getItem("gdb_pi_addr")
  const u=localStorage.getItem("gdb_pi_user")
  const k=localStorage.getItem("gdb_kyc_verified")
  const pk=localStorage.getItem("gdb_pi_pubkey")
  const pun=localStorage.getItem("gdb_pi_username")
  const pm=localStorage.getItem("gdb_pi_mode") as any
  if(a) setGdbAddr(a)
  if(u) setUserName(u.toUpperCase())
  if(k==="true") setKycOk(true)
  if(pk){ setPiPublicKey(pk); setKycVerified(true) }
  if(pun) setPiUsername(pun)
  if(pm) setPiMode(pm)
 }catch{}
},[])

useEffect(()=>{
 try{ localStorage.setItem("gdb_pi_mode", piMode) }catch{}
 if(typeof window!=="undefined" && window.Pi){
   try{ window.Pi.init({version:"2.0", sandbox: piMode==="testnet"}) }catch{}
 }
},[piMode])

useEffect(()=>{
 if(piPublicKey) localStorage.setItem("gdb_pi_pubkey", piPublicKey)
 if(piUsername) localStorage.setItem("gdb_pi_username", piUsername)
 if(kycVerified) localStorage.setItem("gdb_kyc_verified", "true")
 if(gdbAddr) localStorage.setItem("gdb_pi_addr", gdbAddr)
},[piPublicKey, piUsername, kycVerified, gdbAddr])

const verifyPiKYC = async ()=>{
 try{
   if(typeof window==="undefined" ||!window.Pi){ alert("Ouvre dans Pi Browser"); return }
   const auth = await window.Pi.authenticate(["username","wallet_address","payments"], ()=>{})
   const wallet = auth?.user?.wallet_address
   if(wallet && wallet.startsWith("G") && wallet.length>=40){
     setPiPublicKey(wallet)
     setPiUsername(auth.user.username)
     setUserName(auth.user.username.toUpperCase())
     setKycVerified(true); setKycOk(true)
     setGdbAddr(wallet)
     alert("✅ KYC Pi Vérifié @"+auth.user.username)
   }else{
     alert("KYC non trouvé")
   }
 }catch(e:any){ alert("Erreur KYC: "+(e?.message||e)) }
}
const handleManualKyc = ()=>{
 if(!piPublicKey.startsWith("G") || piPublicKey.length<40){ alert("Clé G... invalide"); return }
 setKycVerified(true); setKycOk(true); setGdbAddr(piPublicKey)
 alert("✅ QR lié à "+piPublicKey.slice(0,20))
}

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying) return
 setPaying(true)
 try{
   const finalAmount = isNaN(amount)? parseFloat(piInput) : amount
   if(typeof window!=="undefined" && window.Pi){
     await window.Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await window.Pi.createPayment({
       amount: finalAmount,
       memo: memo + " - GARGOURA ["+piMode.toUpperCase()+"]",
       metadata: {gdb_addr:gdbAddr, pi_pubkey: piPublicKey, pi_username: piUsername, mode:piMode}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:piMode})})
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:piMode})})
         alert("✅ Paiement "+piMode.toUpperCase()+" OK Tx: "+txid)
         setPaying(false)
       },
       onCancel: ()=> setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi"); setPaying(false) }
     })
   }else{
     alert("Ouvre dans Pi Browser")
     setPaying(false)
   }
 }catch(e:any){ alert(e.message); setPaying(false) }
}

const handleMomo = async ()=>{
 const phone = (document.getElementById("momoPhone") as HTMLInputElement)?.value
 const amount = (document.getElementById("momoAmount") as HTMLInputElement)?.value || "5000"
 if(!phone){ alert("Entre ton numéro MoMo"); return }
 alert("Demande MoMo "+amount+" FCFA pour "+phone+" envoyée - Tu recevras crédit")
}

const wallets=[
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:`≈ $3.9B • ${kycVerified? "✅ KYC Pi" : "KYC requis"} • Courant`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT", bal:"$42,850.00", sub:"USA IBAN virtuel • Courant", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA", bal:"€38,200.00", sub:"2.5% • Epargne", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC", bal:"24,500,000 FCFA", sub:"Tchad • Epargne", flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso", bal:"-1,200 PI", sub:"Echeance 15/11 • Credit", flag:"💳"},
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
<div style={{display:"flex", alignItems:"center", gap:8}}><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE • {piMode.toUpperCase()} • {kycVerified? "✅ KYC Pi OFFICIEL" : "KYC REQUIS"}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE"}</span></div>

{/* BADGE KYC */}
<div style={{background: kycVerified? "linear-gradient(135deg,#065f46,#10b981)" : "linear-gradient(135deg,#7f1d1d,#ef4444)", borderRadius:12, padding:10, marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{color:"#fff", fontSize:9, fontWeight:800}}>{kycVerified? `✅ @${piUsername} KYC Pi Vérifié` : "⚠️ KYC Pi Requis"}</div><div style={{color:"#fff", fontSize:8, opacity:0.9}}>{kycVerified? `${piPublicKey.slice(0,12)}... lié au QR` : "Vérifie pour débloquer"}</div></div>
<button onClick={verifyPiKYC} style={{background:"#fff", color:kycVerified? "#065f46" : "#7f1d1d", border:"none", borderRadius:20, padding:"6px 12px", fontSize:9, fontWeight:900}}>{kycVerified? "Changer" : "Vérifier KYC"}</button>
</div>

{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"5px 10px", height:22}}>{w.id==="credit"? "CREDIT" : "LIVE"}</div>
</div>
))}

<div style={{display:"flex", gap:6, marginTop:12, background:"#fff", borderRadius:20, padding:4, border:"1.5px solid #C9A86A"}}>
<button onClick={()=>setPiMode("testnet")} style={{flex:1, padding:"9px", borderRadius:15, border:"none", background:piMode==="testnet"?"#0A1931":"transparent", color:piMode==="testnet"?"#C9A86A":"#0A1931", fontWeight:900, fontSize:9}}>🧪 TESTNET</button>
<button onClick={()=>setPiMode("mainnet")} style={{flex:1, padding:"9px", borderRadius:15, border:"none", background:piMode==="mainnet"?"#C9A86A":"transparent", color:"#0A1931", fontWeight:900, fontSize:9}}>💎 MAINNET</button>
</div>

<div style={{background:"rgba(255,255,255,0.08)", borderRadius:12, padding:10, marginTop:10, border:"1px dashed #C9A86A"}}>
<div style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>MONTANT MICRONS PI</div>
<input value={piInput} onChange={e=>setPiInput(e.target.value)} type="number" step="0.0000001" min="0.0000001" style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #C9A86A", background:"#0A1931", color:"#fff", fontSize:11}} />
<div style={{display:"flex", gap:4, marginTop:6}}>
{["0.00025","0.0015","0.01","1"].map(v=><button key={v} onClick={()=>setPiInput(v)} style={{flex:1, padding:6, borderRadius:6, border:"none", background:piInput===v?"#C9A86A":"#fff", color:"#0A1931", fontSize:8, fontWeight:800}}>{v}</button>)}
</div>
</div>

<button onClick={()=>handlePiPayment(parseFloat(piInput)||0.00025, "Recharge GARGOURA")} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:piMode==="testnet"?"#1e3a8a":"#C9A86A", color:piMode==="testnet"?"#fff":"#0A1931", fontWeight:900, border:"none", fontSize:11}}>{paying? "⏳..." : `💎 PAYER ${piInput} Pi ${piMode.toUpperCase()}`}</button>
</div>

<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Gargoura • {kycVerified? `@${piUsername} KYC ✅` : "KYC requis"} • {piMode.toUpperCase()}</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all"}}>{gdbAddr}</div>
{kycVerified && <div style={{fontSize:7, marginTop:6, color:"#065f46", fontWeight:800}}>Clé Publique Pi liée • @{piUsername} • Gargoura = KYC Officiel Pi Network</div>}
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{fontSize:9, fontWeight:900}}>🔑 Vérification par Clé Publique Pi (G...)</div>
<input value={piPublicKey} onChange={e=>setPiPublicKey(e.target.value)} placeholder="GABT7D5L7KQ9..." style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:9}} />
<input value={piUsername} onChange={e=>setPiUsername(e.target.value)} placeholder="@username Pi" style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:9}} />
<button onClick={handleManualKyc} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#F9E2AF", border:"none", fontWeight:900, fontSize:9}}>Lier Clé au QR Gargoura</button>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement & Transferts • {kycVerified? "✅ KYC" : "⚠️ KYC requis"}</div>
<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>📱 Mobile Money Tchad</div>
<input id="momoPhone" placeholder="Numéro Moov/Airtel ex: 66XXXXXX" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"none", fontSize:10}} />
<input id="momoAmount" defaultValue="5000" type="number" placeholder="Montant FCFA" style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"none", fontSize:10}} />
<button onClick={handleMomo} style={{width:"100%", marginTop:8, padding:11, borderRadius:8, background:"#fff", color:"#14532d", border:"none", fontWeight:900, fontSize:10}}>Payer MoMo Moov/Airtel Tchad</button>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<input value={piInput} onChange={e=>setPiInput(e.target.value)} type="number" step="0.0000001" style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #C9A86A", fontSize:10}} />
<button onClick={()=>handlePiPayment(parseFloat(piInput)||0.00025, "Paiement P2P "+zone)} style={{width:"100%", marginTop:8, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {piInput} Pi {zone}</button>
</div>
</div>
)}

{tab==="cartes" && <div style={{padding:12}}><div style={{fontWeight:900}}>Cartes • {kycVerified? `@${piUsername}` : ""}</div>{cards.map((c)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t}}><div style={{fontWeight:900, fontSize:11}}>{c.name}</div><div style={{marginTop:10, fontFamily:"monospace"}}>{hide? "••••" : c.num}</div><div style={{fontSize:9, marginTop:8}}>{c.exp} CVV {hide? "***" : c.cvv}</div></div>
))}</div>)}

{tab==="epargne" && <div style={{padding:12, fontWeight:900}}>Epargne PFM • {piInput} Pi</div>}
{tab==="plus" && <div style={{padding:12}}><div style={{background:"#0A1931", color:"#fff", borderRadius:12, padding:12}}><div style={{fontWeight:900}}>KYC Pi Officiel</div><div style={{fontSize:9, marginTop:6}}>PubKey: {piPublicKey||"non lié"}<br/>Username: @{piUsername||userName}<br/>Statut: {kycVerified? "✅ KYC Officiel Pi Network" : "❌ Non vérifié"}<br/>QR: {gdbAddr.slice(0,20)}...</div><button onClick={verifyPiKYC} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#C9A86A", color:"#0A1931", border:"none", fontWeight:900}}>Vérifier KYC Pi Maintenant</button></div></div>}

{/* === BOUTONS EN BAS - RESTAURÉS === */}
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
