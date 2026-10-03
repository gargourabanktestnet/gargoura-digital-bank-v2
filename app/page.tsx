"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [gdbAddr,setGdbAddr]=useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [userName,setUserName]=useState("GARGOURA PIONNIER")
const [kycOk,setKycOk]=useState(false)
const [zone,setZone]=useState("CEMAC")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [piMode,setPiMode]=useState<"testnet"|"mainnet">("testnet")
const [piInput,setPiInput]=useState("0.00025")
// === COMPLEMENT KYC ===
const [piPublicKey,setPiPublicKey]=useState("")
const [piUsername,setPiUsername]=useState("")
const [kycVerified,setKycVerified]=useState(false)

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

// === SAUVEGARDE QR ===
useEffect(()=>{
 if(piPublicKey) localStorage.setItem("gdb_pi_pubkey", piPublicKey)
 if(piUsername) localStorage.setItem("gdb_pi_username", piUsername)
 if(kycVerified) localStorage.setItem("gdb_kyc_verified", "true")
 if(gdbAddr) localStorage.setItem("gdb_pi_addr", gdbAddr)
},[piPublicKey, piUsername, kycVerified, gdbAddr])

// === VERIFICATION KYC OFFICIELLE PI ===
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
     alert("✅ KYC Pi Vérifié @"+auth.user.username+"\nQR lié à "+wallet.slice(0,15)+"...")
   }else{
     alert("KYC non trouvé, assure-toi d'avoir passé KYC Pi")
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
   if(finalAmount < 0.0000001){ alert("Min 0.0000001 Pi"); setPaying(false); return }
   if(typeof window!=="undefined" && window.Pi){
     const scopes=["payments","username","wallet_address"]
     await window.Pi.authenticate(scopes, ()=>{})
     await window.Pi.createPayment({
       amount: finalAmount,
       memo: memo + " - GARGOURA ["+piMode.toUpperCase()+"]",
       metadata: {gdb_addr:gdbAddr, pi_pubkey: piPublicKey, pi_username: piUsername, mode:piMode, zone:zone}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         const r = await fetch("/api/pi/approve",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, mode:piMode})
         })
         if(!r.ok) throw new Error("Approve fail")
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         await fetch("/api/pi/complete",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, txid, mode:piMode})
         })
         alert("✅ Paiement "+piMode.toUpperCase()+" OK\nTx: "+txid)
         setPaying(false)
       },
       onCancel: ()=> setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+JSON.stringify(err)); setPaying(false) }
     })
   }else{
     alert("Ouvre dans Pi Browser - Simu "+finalAmount+" Pi")
     setPaying(false)
   }
 }catch(e:any){ alert(e.message); setPaying(false) }
}

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:90, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:12}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span></span>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE • {piMode.toUpperCase()} • {kycVerified? "✅ KYC Pi OFFICIEL" : "KYC REQUIS"}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE"}</span></div>

{/* === BADGE KYC === */}
<div style={{background: kycVerified? "linear-gradient(135deg,#065f46,#10b981)" : "linear-gradient(135deg,#7f1d1d,#ef4444)", borderRadius:10, padding:10, marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><div style={{color:"#fff", fontSize:9, fontWeight:800}}>{kycVerified? `✅ @${piUsername} KYC Pi Vérifié` : "⚠️ KYC Pi Requis"}</div><div style={{color:"#fff", fontSize:8, opacity:0.9}}>{kycVerified? `${piPublicKey.slice(0,12)}... lié au QR` : "Vérifie pour débloquer QR"}</div></div>
<button onClick={verifyPiKYC} style={{background:"#fff", color:kycVerified? "#065f46" : "#7f1d1d", border:"none", borderRadius:15, padding:"6px 12px", fontSize:9, fontWeight:900}}>{kycVerified? "Changer" : "Vérifier KYC"}</button>
</div>

<div style={{display:"flex", gap:6, marginTop:12, background:"#fff", borderRadius:20, padding:4, border:"1.5px solid #C9A86A"}}>
<button onClick={()=>setPiMode("testnet")} style={{flex:1, padding:"9px", borderRadius:15, border:"none", background:piMode==="testnet"?"#0A1931":"transparent", color:piMode==="testnet"?"#C9A86A":"#0A1931", fontWeight:900, fontSize:9}}>🧪 TESTNET</button>
<button onClick={()=>setPiMode("mainnet")} style={{flex:1, padding:"9px", borderRadius:15, border:"none", background:piMode==="mainnet"?"#C9A86A":"transparent", color:"#0A1931", fontWeight:900, fontSize:9}}>💎 MAINNET</button>
</div>

<div style={{background:"rgba(255,255,255,0.08)", borderRadius:12, padding:10, marginTop:10, border:"1px dashed #C9A86A"}}>
<div style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>MONTANT MICRONS PI</div>
<input value={piInput} onChange={e=>setPiInput(e.target.value)} type="number" step="0.0000001" min="0.0000001" style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #C9A86A", background:"#0A1931", color:"#fff", fontSize:11}} />
</div>
<button onClick={()=>handlePiPayment(parseFloat(piInput)||0.00025, "Recharge GARGOURA")} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:piMode==="testnet"?"#1e3a8a":"#C9A86A", color:piMode==="testnet"?"#fff":"#0A1931", fontWeight:900, border:"none", fontSize:11}}>{paying? "⏳..." : `💎 PAYER ${piInput} Pi ${piMode.toUpperCase()}`}</button>
</div>

<div style={{padding:12}}>
{/* === QR LIÉ À CLÉ PUBLIQUE === */}
<div style={{background:"#fff", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #e2e8f0"}}>
<div style={{fontSize:10, fontWeight:800}}>QR {kycVerified? `@${piUsername} ✅` : "Gargoura"} • {piMode.toUpperCase()}</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} style={{width:160, height:160, marginTop:8, border:"3px solid #C9A86A", borderRadius:12}} alt="QR"/>
<div style={{fontSize:7, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8, wordBreak:"break-all"}}>{gdbAddr}</div>
<div style={{fontSize:7, marginTop:6, color:kycVerified? "#065f46" : "#7f1d1d", fontWeight:800}}>
{kycVerified? `Clé Publique Pi liée • @${piUsername} • Statut Gargoura = KYC Officiel Pi Network` : "Vérifie KYC pour lier ton G... à ton QR"}
</div>
</div>

{/* === INPUT MANUEL G... === */}
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{fontSize:9, fontWeight:900}}>🔑 Vérification par Clé Publique Pi (G...)</div>
<input value={piPublicKey} onChange={e=>setPiPublicKey(e.target.value)} placeholder="GABT7D5L7KQ9..." style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:9}}/>
<input value={piUsername} onChange={e=>setPiUsername(e.target.value)} placeholder="@username Pi" style={{width:"100%", marginTop:6, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:9}}/>
<button onClick={handleManualKyc} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#F9E2AF", border:"none", fontWeight:900, fontSize:9}}>Lier Clé au QR Gargoura</button>
</div>
</div>
</div>
)
}
