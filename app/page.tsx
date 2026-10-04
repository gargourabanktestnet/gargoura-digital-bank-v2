"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [piMode,setPiMode]=useState<"testnet"|"mainnet">("testnet")
const [piInput,setPiInput]=useState("0.00025")
const [paying,setPaying]=useState(false)
const [piPublicKey,setPiPublicKey]=useState("")
const [piUsername,setPiUsername]=useState("")
const [kycVerified,setKycVerified]=useState(false)

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{ try{ (window as any).Pi?.init({version:"2.0", sandbox: piMode==="testnet"}) }catch{} }
 document.head.appendChild(s)
 try{
  const pk=localStorage.getItem("gdb_pi_pubkey")
  const pun=localStorage.getItem("gdb_pi_username")
  const pm=localStorage.getItem("gdb_pi_mode") as any
  if(pk){ setPiPublicKey(pk); setKycVerified(true); setGdbAddr(pk) }
  if(pun) setPiUsername(pun)
  if(pm) setPiMode(pm)
 }catch{}
},[])

useEffect(()=>{
 if(piPublicKey) localStorage.setItem("gdb_pi_pubkey", piPublicKey)
 if(piUsername) localStorage.setItem("gdb_pi_username", piUsername)
 if(kycVerified) localStorage.setItem("gdb_kyc_verified", "true")
 localStorage.setItem("gdb_pi_mode", piMode)
 if(typeof window!=="undefined" && (window as any).Pi){
   try{ (window as any).Pi.init({version:"2.0", sandbox: piMode==="testnet"}) }catch{}
 }
},[piMode, piPublicKey, piUsername, kycVerified])

const verifyPiKYC = async ()=>{
 try{
   const w = window as any
   if(!w.Pi){ alert("Ouvre dans Pi Browser"); return }
   const auth = await w.Pi.authenticate(["username","wallet_address","payments"], ()=>{})
   const wallet = auth?.user?.wallet_address
   if(wallet?.startsWith("G")){ setPiPublicKey(wallet); setPiUsername(auth.user.username); setKycVerified(true); setGdbAddr(wallet); alert("✅ KYC @"+auth.user.username) }
 }catch(e:any){ alert("Erreur KYC: "+e.message) }
}
const handleManualKyc = ()=>{
 if(!piPublicKey.startsWith("G") || piPublicKey.length<40){ alert("Clé G... invalide"); return }
 setKycVerified(true); setGdbAddr(piPublicKey); alert("✅ QR lié")
}
const handlePiPayment = async (a:number, m:string)=>{
 if(paying) return
 setPaying(true)
 try{
   const amt = isNaN(a)? parseFloat(piInput) : a
   const w = window as any
   if(w.Pi){
     await w.Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await w.Pi.createPayment({amount: amt, memo: m, metadata:{gdb_addr:gdbAddr, pi_pubkey:piPublicKey, pi_username:piUsername, mode:piMode}},{
       onReadyForServerApproval: async (id:string)=>{
         await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id})})
       },
       onReadyForServerCompletion: async (id:string, txid:string)=>{
         await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id, txid})})
         alert("✅ Paiement OK Tx: "+txid.slice(0,12))
         setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: ()=>setPaying(false)
     })
   }else{ setPaying(false); alert("Ouvre Pi Browser") }
 }catch{ setPaying(false) }
}

const wallets=[
 {id:"pi", name:"PI GCV Principal", bal:"12,465.82 PI", sub:"≈ $3,914,xxx • Courant", flag:"🟣", bg:"linear-gradient(135deg,#0A1931 0%,#1e3a5f 100%)"},
 {id:"usd", name:"USD Courant SWIFT", bal:"$42,850.00", sub:"IBAN virtuel • Courant", flag:"🇺🇸", bg:"linear-gradient(135deg,#0f172a,#334155)"},
 {id:"eur", name:"EUR Epargne SEPA", bal:"€38,200.00", sub:"2.5% • Epargne", flag:"🇪🇺", bg:"linear-gradient(135deg,#1e293b,#475569)"},
 {id:"xaf", name:"XAF CEMAC BEAC", bal:"24,500,000 FCFA", sub:"Tchad • Epargne", flag:"🇹🇩", bg:"linear-gradient(135deg,#14532d,#16a34a)"},
]
const cards=[
 {id:"visa", name:"VISA CLASSIC", num:"4242 1234 5678 4582", exp:"08/29", holder:"GARGOURA PIONNIER", cvv:"123", color:"linear-gradient(135deg,#0A1931 0%,#1e3a8a 50%,#3b82f6 100%)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM", num:"4000 9876 5432 1098", exp:"11/30", holder:"GARGOURA GOLD", cvv:"456", color:"linear-gradient(135deg,#7a5a2a 0%,#C9A86A 25%,#F9E2AF 50%,#C9A86A 75%,#8B7355 100%)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD ELITE", num:"5555 4444 3333 9012", exp:"05/28", holder:"GARGOURA ELITE", cvv:"789", color:"linear-gradient(135deg,#000 0%,#1c1c1c 50%,#2d2d2d 100%)", t:"#C9A86A"},
]

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:110, fontFamily:"Inter, system-ui"}}>
<div style={{background:"linear-gradient(135deg,#0A1931 0%,#142850 100%)", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30, borderBottom:"2px solid #C9A86A"}}>
<div style={{display:"flex", alignItems:"center", gap:10}}>
<img src="/logo.png" alt="Gargoura Logo" style={{width:36, height:36, borderRadius:10, objectFit:"cover", border:"1.5px solid #C9A86A", boxShadow:"0 2px 8px rgba(201,168,106,0.4)", background:"#fff"}} />
<div><div style={{color:"#F9E2AF", fontWeight:900, fontSize:13, letterSpacing:1}}>GARGOURA</div><div style={{color:"#fff", fontWeight:300, fontSize:10, letterSpacing:2, marginTop:-2}}>DIGITAL BANK</div></div>
</div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(201,168,106,0.15)", border:"1px solid #C9A86A", borderRadius:20, padding:"6px 12px", color:"#F9E2AF", fontSize:10, fontWeight:800}}>{hide? "🙈 MASQUÉ" : "👁️ LIVE"}</button>
</div>

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 24px 24px", borderBottom:"3px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:900}}>SYNTHESE • {piMode.toUpperCase()} • {kycVerified? "✅ KYC Pi OFFICIEL" : "KYC REQUIS"}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:8, background:"rgba(255,255,255,0.1)", padding:"3px 8px", borderRadius:10}}>{hide? "MASQUÉ" : "● LIVE"}</span></div>
<div style={{background: kycVerified? "linear-gradient(135deg,#065f46,#10b981)" : "linear-gradient(135deg,#7f1d1d,#ef4444)", borderRadius:12, padding:12, marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{color:"#fff", fontSize:10, fontWeight:900}}>{kycVerified? `✅ @${piUsername} KYC Pi Vérifié` : "⚠️ KYC Pi Requis"}</div><div style={{color:"#fff", fontSize:8, opacity:0.9, marginTop:2}}>{kycVerified? `${piPublicKey.slice(0,16)}... lié au QR` : "Vérifie pour débloquer"}</div></div>
<button onClick={verifyPiKYC} style={{background:"#fff", color:kycVerified? "#065f46" : "#7f1d1d", border:"none", borderRadius:20, padding:"7px 14px", fontSize:9, fontWeight:900}}>{kycVerified? "Changer" : "Vérifier KYC"}</button>
</div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.bg, border:"1.5px solid #C9A86A", borderRadius:16, padding:14, marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}>
<div><div style={{color:"#F9E2AF", fontSize:9, fontWeight:700}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:17, marginTop:4}}>{hide? "••••••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8, marginTop:2}}>{w.sub}</div></div>
<div style={{width:36, height:36, background:"rgba(255,255,255,0.12)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12}}>↗️</div>
</div>
))}
<div style={{display:"flex", gap:6, marginTop:14, background:"#fff", borderRadius:20, padding:4, border:"1.5px solid #C9A86A"}}>
<button onClick={()=>setPiMode("testnet")} style={{flex:1, padding:"10px", borderRadius:15, border:"none", background:piMode==="testnet"?"#0A1931":"transparent", color:piMode==="testnet"?"#C9A86A":"#0A1931", fontWeight:900, fontSize:9}}>🧪 TESTNET</button>
<button onClick={()=>setPiMode("mainnet")} style={{flex:1, padding:"10px", borderRadius:15, border:"none", background:piMode==="mainnet"?"linear-gradient(135deg,#C9A86A,#F9E2AF)":"transparent", color:"#0A1931", fontWeight:900, fontSize:9}}>💎 MAINNET</button>
</div>
<div style={{background:"rgba(255,255,255,0.08)", borderRadius:14, padding:12, marginTop:12, border:"1.5px dashed #C9A86A"}}>
<div style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>MONTANT MICRONS PI</div>
<input value={piInput} onChange={e=>setPiInput(e.target.value)} type="number" step="0.0000001" style={{width:"100%", marginTop:8, padding:12, borderRadius:10, border:"1px solid #C9A86A", background:"#0A1931", color:"#fff", fontSize:12, fontWeight:700}} />
</div>
<button onClick={()=>handlePiPayment(parseFloat(piInput)||0.00025, "Recharge GARGOURA")} style={{width:"100%", marginTop:14, padding:14, borderRadius:12, background:piMode==="testnet"?"linear-gradient(135deg,#1e3a8a,#3b82f6)":"linear-gradient(135deg,#C9A86A,#F9E2AF)", color:piMode==="testnet"?"#fff":"#0A1931", fontWeight:900, border:"none", fontSize:12}}>{paying? "⏳..." : `💎 PAYER ${piInput} Pi`}</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:16, padding:14, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:11, fontWeight:900, color:"#0A1931"}}>QR Gargoura • {kycVerified? `@${piUsername} ✅` : "KYC requis"} • {piMode.toUpperCase()}</div>
<div style={{marginTop:10, display:"inline-block", padding:8, background:"#fff", borderRadius:16, border:"3px solid #C9A86A"}}>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{width:160, height:160, borderRadius:8}} />
</div>
<div style={{fontSize:8, marginTop:10, background:"linear-gradient(135deg,#0A1931,#142850)", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all", border:"1px solid #C9A86A", fontFamily:"monospace"}}>{gdbAddr}</div>
</div>
</div>
</div>
)}
{tab==="cartes" && (<div style={{padding:14}}>{cards.map((c)=>(<div key={c.id} style={{background:c.color, borderRadius:20, padding:18, marginTop:14, color:c.t, boxShadow:"0 8px 25px rgba(0,0,0,0.15)"}}><div style={{fontWeight:900, fontSize:11}}>{c.name}</div><div style={{marginTop:14, fontFamily:"monospace", fontSize:16}}>{hide? "•••• •••• •••• "+c.num.slice(-4) : c.num}</div><div style={{display:"flex", justifyContent:"space-between", marginTop:14, fontSize:9}}><span>{c.holder}</span><span>{c.exp}</span></div></div>))}</div>)}
{tab==="paiement" && <div style={{padding:14}}><button onClick={()=>handlePiPayment(parseFloat(piInput)||0.00025, "P2P")} style={{width:"100%", padding:14, borderRadius:12, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Envoyer {piInput} Pi</button></div>}
{tab==="epargne" && <div style={{padding:14}}>Epargne PFM</div>}
{tab==="plus" && <div style={{padding:14}}><button onClick={verifyPiKYC} style={{width:"100%", padding:12, borderRadius:10, background:"#C9A86A", color:"#0A1931", border:"none", fontWeight:900}}>Vérifier KYC Pi</button></div>}

<div style={{position:"fixed", bottom:12, left:"50%", transform:"translateX(-50%)", width:"92%", maxWidth:420, background:"rgba(255,255,255,0.98)", borderRadius:24, boxShadow:"0 10px 40px rgba(10,25,49,0.2), 0 0 0 1px #C9A86A", display:"flex", justifyContent:"space-around", padding:"8px 6px", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Accueil"},{id:"paiement", ic:"💸", l:"Paiement"},{id:"cartes", ic:"💳", l:"Cartes"},{id:"epargne", ic:"📈", l:"Epargne"},{id:"plus", ic:"☰", l:"Plus"}].map((b)=>(
<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none", background:tab===b.id? "linear-gradient(135deg,#0A1931,#142850)" : "transparent", color:tab===b.id? "#C9A86A" : "#64748b", borderRadius:16, padding:"8px 12px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:8, fontWeight:800, minWidth:56}}><span style={{fontSize:18}}>{b.ic}</span><span>{b.l}</span></button>
))}
</div>
</div>
)
}
