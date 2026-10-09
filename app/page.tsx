"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [activeBankService,setActiveBankService]=useState<string|null>(null)

const [gdbAddr] = useState("GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK")
const [gdbAddrBankFuture] = useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX")
const [gdbAddrTestnet] = useState("GDXGJBKLWSFC4M5SHDLDDZIEPBCQTKM4V46Y4AC2K5IXFCPUIVINXGEE")
const [userName,setUserName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [kycOk,setKycOk]=useState(false)
const [kycDocs,setKycDocs]=useState({cni:"", selfie:"", statut:"en_attente"})
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("0.0015")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("MARCHE")
const [merchantRate,setMerchantRate]=useState("0.5")

const [accounts] = useState([
 {id:"pi", iban:"GB29NWBK60161331926819", type:"PI MAINNET", balPi:12.46582, balXAF:0, currency:"PI", wallet:"GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK"},
 {id:"xaf", iban:"TD64 2000 1000 0123 4567 8901 02", type:"XAF CEMAC BEAC", balPi:0, balXAF:24500000, currency:"XAF", wallet:"UBA Tchad Pièce 17"},
 {id:"usd", iban:"US64 SVBK US6S 3300 0000 0000", type:"USD SWIFT", balPi:0, balXAF:0, balUSD:42850, currency:"USD", wallet:"UBA USD"},
])
const [txHistory,setTxHistory]=useState<any[]>([])
const [virtualCards,setVirtualCards]=useState<any[]>([])
const [tontines,setTontines]=useState<any[]>([])
const [limits,setLimits]=useState({journalier:5000000, mensuel:50000000, utilise:185000, devise:"XAF"})
const [supportTickets,setSupportTickets]=useState<any[]>([])

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
 "CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s", rate:600},
 "UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s", rate:600},
 "DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s", rate:1},
 "JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s", rate:0.71},
 "GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s", rate:3.75},
 "MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s", rate:3.64},
 "INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h", rate:1}
}
const microChips = [
 {label:"1 µPi", val:"0.000001"},
 {label:"100 µPi", val:"0.0001"},
 {label:"0.0015 Pi", val:"0.0015"},
 {label:"0.01 Pi", val:"0.01"},
 {label:"0.1 Pi", val:"0.1"},
 {label:"1 Pi", val:"1"},
]

// 12 FONCTIONNALITES COURANTES - MAPPING IMAGE
const currentFeatures = [
 {id:"transferer", label:"Transferer", icon:"💸", action:"paiement", desc:"P2P Pi Triple 7 Zones"},
 {id:"virement", label:"Virement", icon:"🏦", action:"paiement", desc:"IBAN TD64... BEAC"},
 {id:"pidex", label:"Pi DEX", icon:"🔄", action:"paiement", desc:"GCV 314159$ / MARCHE"},
 {id:"convertir", label:"Convertir", icon:"💱", action:"paiement", desc:"Pi → XAF/XOF/USD"},
 {id:"trading", label:"Trading", icon:"📈", action:"epargne", desc:"PFM Chart UBA"},
 {id:"wallet", label:"Wallet", icon:"👛", action:"accueil", desc:"GAS5...QVK MAINNET"},
 {id:"cartes", label:"Cartes", icon:"💳", action:"cartes", desc:"VISA GOLD UBA"},
 {id:"kyc", label:"KYC", icon:"🛡️", action:"kyc", desc:"Pièce 17 BEAC"},
 {id:"aiauto", label:"AI Auto", icon:"🤖", action:"support", desc:"Support AI UBA"},
 {id:"blockchain", label:"Blockchain", icon:"⛓️", action:"blockchain", desc:"Tx 2c31... 6ec3..."},
 {id:"shopping", label:"Shopping", icon:"🛒", action:"shopping", desc:"QR Merchant Pay"},
 {id:"gestion", label:"Gestion", icon:"⚙️", action:"gestion", desc:"Relevé BEAC PDF"},
]

useEffect(()=>{
 if(typeof window==="undefined") return
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{ try{ (window as any).Pi?.init({version:"2.0", sandbox:false}); setPiReady(true)}catch{setPiReady(true)}}
 document.head.appendChild(s)
 try{
  const k=localStorage.getItem("gdb_kyc_verified")
  if(k==="true") setKycOk(true)
  const vc=localStorage.getItem("gdb_virtual_cards")
  if(vc) setVirtualCards(JSON.parse(vc))
  const hist=localStorage.getItem("gdb_tx_history")
  if(hist){ setTxHistory(JSON.parse(hist)) }
  else{
   const last=localStorage.getItem("gdb_last_tx")
   if(last){
    const l=JSON.parse(last)
    setTxHistory([{...l, id:"2c314c09cc9ecbbcb9579e0c3c910f85ca7fe5d0686f2f71af3a3cedfd186aa6", amount:0.1, microns:100000, status:"confirmé BEAC", zone:"CEMAC", momo:"Airtel Money"}, {id:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9", amount:0.0015, microns:1500, status:"confirmé BEAC", zone:"CEMAC", momo:"Orange Money", txid:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9", date:new Date().toISOString()}])
   }
  }
  const t=localStorage.getItem("gdb_tontines")
  if(t) setTontines(JSON.parse(t))
 }catch{}
},[])

useEffect(()=>{
 const first = zoneMoMo[zone]?.ops?.[0]
 if(first) setMomoOp(first)
},[zone])

const handleFeatureClick = (f:any)=>{
 if(f.action==="paiement") setTab("paiement")
 else if(f.action==="cartes") setTab("cartes")
 else if(f.action==="epargne") setTab("epargne")
 else if(f.action==="kyc"){ setTab("plus"); setActiveBankService("kyc") }
 else if(f.action==="support"){ setTab("plus"); setActiveBankService("api") }
 else if(f.action==="blockchain"){ setTab("paiement"); alert(`⛓️ Blockchain MAINNET\nKYC: ${gdbAddr}\nBANQUE: ${gdbAddrBankFuture}\nTx 2c314c09cc9ecbbcb9579e0c3c910f85ca7fe5d0686f2f71af3a3cedfd186aa6\nTx 6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9`) }
 else if(f.action==="shopping"){ setTab("accueil"); window.scrollTo({top:400, behavior:"smooth"}) }
 else if(f.action==="gestion"){ generateRelevePDF() }
 else if(f.action==="accueil"){ setTab("accueil") }
}

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 if(typeof window!=="undefined"){
  const kyc=localStorage.getItem("gdb_kyc_verified")
  if(kyc!=="true" &&!kycOk){ alert("⚠️ KYC requis - Plus > KYC Pièce 17 BEAC"); setTab("plus"); setActiveBankService("kyc"); return }
 }
 if(amount*0.30*600 + limits.utilise > limits.journalier){ alert(`⛔ Plafond BEAC dépassé`); return }
 setPaying(true)
 try{
   let xafCantonne=0, usdRef=0, labelValeur=""
   if(valueType==="GCV"){ usdRef=314159; labelValeur="GCV 314159$ NON CANTONNE"; xafCantonne=0 }
   if(valueType==="MARCHE"){ usdRef=0.30; labelValeur="MARCHE 0.30$ CANTONNE UBA"; xafCantonne=amount*0.30*(zoneMoMo[zone]?.rate||600) }
   if(valueType==="MARCHAND"){ usdRef=parseFloat(merchantRate)||0.5; labelValeur=`MARCHAND ${merchantRate} CANTONNE UBA`; xafCantonne=amount*usdRef*(zoneMoMo[zone]?.rate||600) }
   if(typeof window!=="undefined" && (window as any).Pi){
     await (window as any).Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await (window as any).Pi.createPayment({
       amount, memo: memo+` - V5.0.4 ${valueType} [${zone} ${momoOp}] ${labelValeur} KYC GAS5`,
       metadata:{gdb_addr:gdbAddr, zone, momo_op:momoOp, mode:"mainnet", microns:Math.round(amount*1000000), valueType, usdRef, xafCantonne}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet", valueType, xafCantonne})}) }catch{}
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         try{
           await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet", valueType, xafCantonne})})
           if(valueType!=="GCV"){ await fetch("/api/uba/cantonnement",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({piAmount:amount, valueType, xafCantonne, usdRef, dest:momoOp, zone, walletMainnet:gdbAddr, txid})}) }
         }catch{}
         const newTx={id:txid, txid, paymentId, amount, microns:Math.round(amount*1000000), valueType, xafCantonne, usdRef, zone, momoOp, status:"confirmé BEAC", date:new Date().toISOString(), wallet:gdbAddr, uba:"UBA Tchad Pièce 17"}
         const updated=[newTx,...txHistory].slice(0,100)
         setTxHistory(updated)
         try{ if(typeof window!=="undefined"){ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)); localStorage.setItem("gdb_last_tx", JSON.stringify(newTx)) } }catch{}
         setLimits((p:any)=>({...p, utilise: p.utilise + xafCantonne}))
         alert(`✅ Paiement V5.0.4!\nTx: ${txid}\n${amount} Pi = ${Math.round(amount*1000000)} µPi`)
         setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
     })
   }else{ alert(`Ouvre Pi Browser MAINNET\n${amount} Pi = ${Math.round(amount*1000000)} µPi`); setPaying(false)}
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false)}
}

const handleKYC = ()=>{ setKycDocs({...kycDocs, statut:"verifie"}); setKycOk(true); try{if(typeof window!=="undefined") localStorage.setItem("gdb_kyc_verified","true")}catch{}; alert("✅ KYC Pièce 17 BEAC vérifié!"); setActiveBankService(null) }
const createVirtualCardBank = ()=>{
  const card={id:"VCARD_"+Date.now(), number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, iban:accounts[1].iban, wallet:gdbAddr, status:"active", created:new Date().toISOString()}
  const newCards=[card,...virtualCards]; setVirtualCards(newCards); try{if(typeof window!=="undefined") localStorage.setItem("gdb_virtual_cards", JSON.stringify(newCards))}catch{}; alert(`💳 Carte créée!\n${card.number}`)
}
const createTontineBank = ()=>{
  const t={id:"TONT_"+Date.now(), name:"Tontine "+zone+" "+new Date().getFullYear(), members:10, cotisation:10000, total:100000, pot:0, zone, momoOp, wallet:gdbAddr, owner:userName, status:"collecte", created:new Date().toISOString()}
  const newT=[t,...tontines]; setTontines(newT); try{if(typeof window!=="undefined") localStorage.setItem("gdb_tontines", JSON.stringify(newT))}catch{}; alert(`👥 Tontine créée!\n${t.name}`); setActiveBankService(null)
}
const generateRelevePDF = ()=>{
  const totalXAF=txHistory.reduce((s:any,t:any)=>s+(t.xafCantonne||0),0)
  alert(`📄 Relevé BEAC PDF V5.0.4\nTx: ${txHistory.length}\nTotal: ${totalXAF.toLocaleString()} XAF\nKYC GAS5...QVK\nIBAN ${accounts[1].iban}`)
}
const openSupport = ()=>{
  const ticket={id:"SUP_"+Date.now(), subject:"Support UBA Tchad", status:"ouvert", date:new Date().toISOString()}
  setSupportTickets([ticket,...supportTickets]); alert(`🎧 Ticket ${ticket.id}\nUBA Tchad Pièce 17`); setActiveBankService(null)
}

const parseAmt = parseFloat(piAmount) || 0
const localValMarche = parseAmt*0.30 * (zoneMoMo[zone]?.rate || 1)
const microVal = Math.round(parseAmt*1000000)

const wallets=[
 {id:"pi", name:"PI GCV Principal UBA", bal: hide? "••••" : `${accounts[0].balPi} PI`, sub:`KYC ${gdbAddr.slice(0,6)}...QVK • MAINNET • UBA Pièce 17`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT UBA", bal: hide? "••••" : `$${accounts[2].balUSD?.toLocaleString()}`, sub:`USA IBAN virtuel • UBA Tchad • MAINNET`, flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA UBA", bal: hide? "••••" : `€38,200.00`, sub:`2.5% • Epargne • UBA Tchad • MAINNET`, flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal: hide? "••••" : `${accounts[1].balXAF.toLocaleString()} FCFA`, sub:`Tchad • Cantonnement UBA Tchad • MAINNET • ${accounts[1].iban}`, flag:"🇹🇩"},
]

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:110, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" width={34} height={34} style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2, objectFit:"contain"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● V5.0.4 KYC {kycOk?"✅":"⚠️"}</span></span>
</div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto", display:"flex", flexDirection:"column"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" width={32} height={32} style={{width:32, height:32, borderRadius:8, background:"#fff", padding:2, objectFit:"contain"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<b style={{color:"#F9E2AF", fontSize:12}}>GARGOURA BANK</b>
</div>
<button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button>
</div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil V5.0.4"},{i:"paiement", l:"💸 Paiement Pi 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD"},{i:"epargne", l:"📈 Epargne Tontine"},{i:"plus", l:"☰ Plus - Banque Complète"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(16,185,129,0.15)", borderRadius:12, padding:12, color:"#fff", fontSize:9, border:"1px solid #10b981"}}>
<b style={{color:"#10b981"}}>V5.0.4 • KYC GAS5...QVK ✅</b><br/>KYC: {gdbAddr.slice(0,12)}...QVK<br/>BANQUE: {gdbAddrBankFuture.slice(0,12)}... ⏳ KYB<br/>IBAN: {accounts[1].iban}
</div>
<div style={{marginTop:"auto", paddingTop:16, borderTop:"1px solid rgba(201,168,106,0.2)"}}>
<div style={{background:"rgba(201,168,106,0.08)", border:"1px solid #C9A86A33", borderRadius:12, padding:12, textAlign:"center"}}>
<img src="/logo.png" alt="GDB" width={44} height={44} style={{width:44, height:44, borderRadius:10, background:"#fff", padding:4, objectFit:"contain", margin:"0 auto 8px", display:"block"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<div style={{fontSize:13, fontWeight:900, color:"#C9A86A", letterSpacing:1}}>V 5.0.3</div>
<div style={{fontSize:8, color:"#F9E2AF", marginTop:4, fontWeight:700}}>GARGOURA DIGITAL BANK</div>
<div style={{fontSize:6, color:"#9ca3af", marginTop:3}}>UBA Tchad Pièce 17 • BEAC COBAC • KYC GAS5...QVK ✅</div>
<div style={{fontSize:6, color:"#64748b", marginTop:4}}>Tx 2c314c09... 6ec364f8... • {accounts[1].iban.slice(0,12)}...</div>
</div>
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE V5.0.4 • KYC {kycOk?"✅":"⚠️"} • {piReady? "READY" : "..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE UBA"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>UBA</div>
</div>
))}
<button onClick={()=>handlePiPayment(parseFloat(piAmount)||0.0015, "Recharge GARGOURA V5.0.4")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER {piAmount} PI V5.0.4 - KYC GAS5...QVK</button>
</div>

{/* 12 FONCTIONNALITES COURANTES - NOUVEAU V5.0.4 */}
<div style={{padding:12}}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
<span style={{fontWeight:900, fontSize:13, color:"#0A1931"}}>Fonctionnalites Courantes • 12</span>
<span style={{fontSize:8, fontWeight:800, color:"#C9A86A", border:"1px solid #C9A86A", padding:"4px 10px", borderRadius:20}}>GCV WORLD BANK</span>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10}}>
{currentFeatures.map((f)=>(
<button key={f.id} onClick={()=>handleFeatureClick(f)} style={{background:"#fff", border:"1px solid #E2E8F0", borderRadius:18, padding:"12px 4px", display:"flex", flexDirection:"column", alignItems:"center", gap:8}}>
<div style={{width:48, height:48, borderRadius:14, background:"#0A1931", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>{f.icon}</div>
<span style={{fontSize:9, fontWeight:800, color:"#0A1931", textAlign:"center"}}>{f.label}</span>
</button>
))}
</div>

<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center", marginTop:14}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel V5.0.4 - KYC GAS5...QVK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:130, height:130, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:7, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8, wordBreak:"break-all"}}>KYC: {gdbAddr}<br/>BANQUE FUTURE: {gdbAddrBankFuture}<br/>IBAN: {accounts[1].iban}</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement V5.0.4 • KYC GAS5 • 7 Zones • IBAN</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>{zoneMoMo[zone]?.flag} {zone} • {zoneMoMo[zone]?.cur}</span><span style={{fontSize:8, color:"#10b981", fontWeight:800}}>{zoneMoMo[zone]?.delay}</span></div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:8}}>
{zoneMoMo[zone]?.ops.map((op:string)=>(
<button key={op} onClick={()=>setMomoOp(op)} style={{padding:"6px 10px", borderRadius:15, border:"1px solid #C9A86A", background:momoOp===op?"#0A1931":"#F5F7FB", color:momoOp===op?"#C9A86A":"#0A1931", fontSize:9, fontWeight:900}}>{op}</button>
))}
</div>
<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="0.0015 = 1500 µPi" style={{width:"100%", marginTop:10, padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:12, fontWeight:800}} />
<button onClick={()=>handlePiPayment(parseAmt, "Paiement P2P V5.0.4 "+zone+" "+momoOp)} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {parseAmt} PI • {momoOp}</button>
<div style={{marginTop:8, fontSize:8, background:"#F5F7FB", padding:6, borderRadius:6}}>{txHistory.slice(0,2).map((t:any)=><div key={t.id}><b>{t.amount} Pi</b> • {t.zone} • Tx {(t.txid||t.id||"").slice(0,10)}...</div>)}</div>
</div>
</div>
)}
{tab==="cartes" && (<div style={{padding:12}}><div style={{fontWeight:900, color:"#0A1931"}}>Cartes VISA GOLD • IBAN {accounts[1].iban.slice(0,12)}...</div><button onClick={createVirtualCardBank} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Créer Carte Virtuelle - KYC GAS5</button></div>)}
{tab==="epargne" && (<div style={{padding:12}}><div style={{fontWeight:900, color:"#0A1931"}}>Epargne PFM • Tontine • IBAN</div><button onClick={createTontineBank} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>Créer Tontine 10k XAF</button></div>)}
{tab==="plus" && (<div style={{padding:12}}><div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}><img src="/logo.png" alt="GDB" width={44} height={44} style={{width:44, height:44, borderRadius:10, background:"#fff", padding:3}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} /><div><div style={{color:"#F9E2AF", fontWeight:900}}>GARGOURA V5.0.4 BANQUE • KYC GAS5</div><div style={{fontSize:9}}>IBAN: {accounts[1].iban}</div></div></div><button onClick={()=>setActiveBankService("kyc")} style={{width:"100%", marginTop:10, padding:10, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>KYC Pièce 17 BEAC {kycOk?"✅":"⚠️"}</button><button onClick={generateRelevePDF} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Relevé PDF BEAC</button></div>)}

{activeBankService && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.8)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveBankService(null)}>
<div style={{background:"#fff", borderRadius:16, padding:16, width:"100%", maxWidth:380, border:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
{activeBankService==="kyc" && (<div><div style={{fontWeight:900}}>KYC Pièce 17 BEAC</div><button onClick={handleKYC} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>Valider KYC BEAC</button><button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0"}}>Fermer</button></div>)}
{activeBankService==="api" && (<div><div style={{fontWeight:900}}>API • IBAN {accounts[1].iban} • KYC GAS5</div><div style={{fontSize:7, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:8, marginTop:8}}>WALLET KYC: {gdbAddr}<br/>Tx: 2c314c09... 6ec364f8...</div><button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Fermer</button></div>)}
</div>
</div>
)}

{/* BOTTOM NAV - 6 ITEMS COMME IMAGE */}
<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"96%", maxWidth:440, background:"#fff", borderRadius:22, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", border:"1px solid #E2E8F0", display:"flex", justifyContent:"space-around", padding:"8px 0", zIndex:20}}>
{[
{id:"accueil", ic:"🏠", l:"Accueil"},
{id:"services", ic:"💼", l:"Services"},
{id:"innovation", ic:"🚀", l:"Innovation"},
{id:"wallet", ic:"👜", l:"Wallet"},
{id:"securite", ic:"🛡️", l:"Sécurité"},
{id:"support", ic:"❓", l:"Support"},
].map((b)=>{
 const isActive = (b.id==="accueil" && tab==="accueil") || (b.id==="services" && tab==="paiement") || (b.id==="wallet" && tab==="accueil") || (b.id==="securite" && tab==="plus")
 return(
<button key={b.id} onClick={()=>{ if(b.id==="accueil") setTab("accueil"); if(b.id==="services") setTab("paiement"); if(b.id==="innovation") setTab("epargne"); if(b.id==="wallet") setTab("accueil"); if(b.id==="securite"){ setTab("plus"); setActiveBankService("kyc") } if(b.id==="support"){ setTab("plus"); setActiveBankService("api") } }} style={{border:"none", background:isActive? "#0A1931" : "transparent", color:isActive? "#C9A86A" : "#0A1931", borderRadius:14, padding:"6px 8px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:7, fontWeight:800}}>
<span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span>
</button>
)})}
</div>
</div>
)
}
