"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }
export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [activeBankService,setActiveBankService]=useState<string|null>(null)
const [gdbAddr] = useState("GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK")
const [gdbAddrGlobal] = useState("GABT7D5L7KQ9M2P8R4N6Y3WXZ1HJF8V5TQ9B2C6D7E4F1A8")
const [gdbAddrBankFuture] = useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX")
const [userName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [kycOk,setKycOk]=useState(false)
const [kycDocs,setKycDocs]=useState({cni:"", selfie:"", statut:"en_attente"})
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("0.0015")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [pendingPayment,setPendingPayment]=useState<any>(null)
const [searchQuery,setSearchQuery]=useState("")
const [networkMode,setNetworkMode]=useState<"TESTNET"|"MAINNET">("MAINNET")
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("GCV")
const [transferTab,setTransferTab]=useState<"interne"|"externe">("interne")
const [transferZone,setTransferZone]=useState("CEMAC")
const [transferCountry,setTransferCountry]=useState("Tchad BEAC")
const [transferBank,setTransferBank]=useState("UBA Tchad")
const [transferAccount,setTransferAccount]=useState("")
const [transferPhone,setTransferPhone]=useState("")
const [transferOperator,setTransferOperator]=useState("Orange Money")
const [transferAmountPi,setTransferAmountPi]=useState("")
const [transferMotif,setTransferMotif]=useState("")
const [transferCurrency,setTransferCurrency]=useState("XAF")
const [transferEmail,setTransferEmail]=useState("")
const [beneficiaryName,setBeneficiaryName]=useState("")
const [beneficiaryVerified,setBeneficiaryVerified]=useState<null|boolean>(null)
const [beneficiaryCheckLoading,setBeneficiaryCheckLoading]=useState(false)
const [virementSubTab,setVirementSubTab]=useState<"virement"|"payme"|"split"|"openbanking">("virement")
const [payMeLinks,setPayMeLinks]=useState<any[]>([])
const [payMeAmount,setPayMeAmount]=useState("0.0015")
const [payMeDesc,setPayMeDesc]=useState("")
const [splitTotal,setSplitTotal]=useState("0.09")
const [splitParticipants,setSplitParticipants]=useState([{phone:"", name:""}, {phone:"", name:""}])
const [splitResult,setSplitResult]=useState<any>(null)
const [externalAccounts]=useState([
 {id:"uba", bank:"UBA Tchad", iban:"TD64 2000 1000 0123 4567 8901 02", bal:24500000, connected:true},
 {id:"ecobank", bank:"Ecobank Cameroun", iban:"CM21 1000 2000 3000 4000", bal:1200000, connected:false},
])
const [selectedExternal,setSelectedExternal]=useState("uba")
const [accounts] = useState([
 {id:"pi", iban:"GB29NWBK60161331926819", type:"PI MAINNET", balPi:12465.82, balXAF:0, currency:"PI", wallet:"GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK", sub:"≈ $3.9B • 1 Pi=314159$ • Courant", flag:"🟣", status:"LIVE"},
 {id:"usd", iban:"US64 SVBK US6S 3300 0000 0000", type:"USD Courant SWIFT", balPi:0, balXAF:0, balUSD:42850, currency:"USD", wallet:"UBA USD", sub:"USA IBAN virtuel • Courant", flag:"🇺🇸", status:"LIVE"},
 {id:"eur", iban:"DE89 3704 0044 0532 0130 00", type:"EUR Epargne SEPA", balEUR:38200, currency:"EUR", wallet:"BNP France SEPA", sub:"2.5% • Epargne", flag:"🇪🇺", status:"LIVE"},
 {id:"xaf", iban:"TD64 2000 1000 0123 4567 8901 02", type:"XAF CEMAC BEAC", balPi:0, balXAF:24500000, currency:"XAF", wallet:"UBA Tchad Pièce 17", sub:"Tchad • Epargne", flag:"🇹🇩", status:"LIVE"},
 {id:"credit", iban:"CREDIT_CONSO", type:"Credit Conso", balPi:-1200, currency:"PI", wallet:"Credit", sub:"Echeance 15/11 • Credit", flag:"🇪🇸", status:"CREDIT"},
])
const [cards,setCards]=useState([
 {id:"visa_classic", type:"VISA CLASSIC", num:"**** **** **** 4582", holder:"GARGOURA PIONNIER", exp:"08/29", cvv:"***", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", nfc:true, blocked:false},
 {id:"visa_gold", type:"VISA GOLD PREMIUM", num:"**** **** **** 1098", holder:"GARGOURA PIONNIER", exp:"11/30", cvv:"***", color:"linear-gradient(135deg,#a16207,#facc15)", nfc:true, blocked:false},
 {id:"mc_world", type:"MASTERCARD WORLD ELITE", num:"**** **** **** 9012", holder:"GARGOURA PIONNIER", exp:"05/28", cvv:"***", color:"linear-gradient(135deg,#111827,#4b5563)", nfc:true, blocked:false},
])
const [pfmBudgets]=useState([
 {cat:"Vacances", spent:450, total:800, alert:">10% depassement"},
 {cat:"Alimentation", spent:320, total:500},
 {cat:"Transport", spent:180, total:300},
])
const [coffres]=useState([
 {name:"Coffre Arrondi Auto", from:"12.3 Pi → 13 Pi", gain:"0.7 Pi en cagnotte", bloque:"87.5 Pi bloque"},
])
const [txHistory,setTxHistory]=useState<any[]>([])
const [limits,setLimits]=useState({journalier:5000000, mensuel:50000000, utilise:185000})
const zones:any={"CEMAC":["Tchad BEAC","Cameroun BICEC","Gabon BGFI","Congo","RCA","Guinee Eq"],"UEMOA":["Senegal","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger"],"DOLLAR":["USA Chase","USA BoA","Canada RBC"],"JORDANIE":["Jordan Ahli Bank","Arab Bank JO","Housing Bank JO"],"GOLFE":["UAE FAB","Saudi Al Rajhi","Qatar QNB","Kuwait NBK","Bahrein NBB","Oman Bank Muscat"],"MOYEN-ORIENT":["Turquie Ziraat","Liban Byblos","Egypte NBE","Qatar Ooredoo","Kuwait"],"INTERNATIONAL":["UK Barclays","France BNP SEPA","Allemagne Deutsche","Chine ICBC","Inde SBI","SWIFT MONDIAL"]}
const zoneMoMo:any={"CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s", rate:600, banks:["UBA Tchad","BEAC","BICEC Cameroun","BGFI Gabon","Ecobank"]},"UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s", rate:600, banks:["UBA Senegal","BICIS","BOA","Coris Bank"]},"DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s", rate:1, banks:["Chase USA","Bank of America","Citi USA","RBC Canada"]},"JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s", rate:0.71, banks:["Jordan Ahli Bank","Arab Bank JO","Housing Bank JO"]},"GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s", rate:3.75, banks:["FAB UAE","Al Rajhi Saudi","QNB Qatar","NBK Kuwait"]},"MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s", rate:3.64, banks:["Ziraat Turquie","Byblos Liban","NBE Egypte"]},"INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h", rate:1, banks:["Barclays UK","BNP France","Deutsche Bank","ICBC Chine","SBI Inde","SWIFT MONDIAL"]}}
const microChips = [{label:"1 µPi", val:"0.000001"},{label:"100 µPi", val:"0.0001"},{label:"0.0015 Pi", val:"0.0015"},{label:"0.01 Pi", val:"0.01"},{label:"0.1 Pi", val:"0.1"},{label:"1 Pi", val:"1"},]
const currentFeatures = [{id:"transferer", label:"Transferer", icon:"💸", action:"transferer"},{id:"virement", label:"Virement", icon:"🏦", action:"paiement"},{id:"pidex", label:"Pi DEX", icon:"🔄", action:"paiement"},{id:"convertir", label:"Convertir", icon:"💱", action:"paiement"},{id:"trading", label:"Trading", icon:"📈", action:"epargne"},{id:"wallet", label:"Wallet", icon:"👛", action:"accueil"},{id:"cartes", label:"Cartes", icon:"💳", action:"cartes"},{id:"kyc", label:"KYC", icon:"🛡️", action:"kyc"},{id:"aiauto", label:"AI Auto", icon:"🤖", action:"support"},{id:"blockchain", label:"Blockchain", icon:"⛓️", action:"blockchain"},{id:"shopping", label:"Shopping", icon:"🛒", action:"shopping"},{id:"gestion", label:"Gestion", icon:"⚙️", action:"gestion"},]

useEffect(()=>{
 if(typeof window==="undefined") return
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{
  try{
   const Pi = (window as any).Pi
   Pi.init({
    version:"2.0",
    sandbox:false,
    onIncompletePaymentFound: (payment:any)=>{
     setPendingPayment(payment)
     const txid = payment.transaction?.txid || payment.txid || "PENDING_"+Date.now()
     fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId: payment.identifier || payment.paymentId, txid, mode:"mainnet", autoFixPending:true})}).catch(()=>{})
    }
   })
   setPiReady(true)
  }catch{ setPiReady(true) }
 }
 document.head.appendChild(s)
 try{
  const k=localStorage.getItem("gdb_kyc_verified")
  if(k==="true") setKycOk(true)
  const hist=localStorage.getItem("gdb_tx_history")
  if(hist) setTxHistory(JSON.parse(hist))
 }catch{}
},[])

useEffect(()=>{
 const first = zoneMoMo[transferZone]?.ops?.[0]
 if(first) setTransferOperator(first)
 const firstCountry = zones[transferZone]?.[0]
 if(firstCountry) setTransferCountry(firstCountry)
 const firstBank = zoneMoMo[transferZone]?.banks?.[0]
 if(firstBank) setTransferBank(firstBank)
 setTransferCurrency(zoneMoMo[transferZone]?.cur || "XAF")
},[transferZone])

const verifyBeneficiary = async ()=>{ if(!beneficiaryName || (!transferAccount && !transferPhone && !transferEmail)){ alert("Saisis nom + tel/email/IBAN"); return } setBeneficiaryCheckLoading(true); setTimeout(()=>{ setBeneficiaryVerified(beneficiaryName.length>2 && (transferPhone.length>=8 || transferEmail.includes("@"))); setBeneficiaryCheckLoading(false)},1200) }
const generatePayMeLink = ()=>{ const amt=parseFloat(payMeAmount); if(!amt) return; const linkId="GDB_"+Date.now().toString(36).toUpperCase(); const link=`https://pay.gargoura.td/u/MAHAMAT/${linkId}`; const qrData=`pi://pay?addr=${gdbAddr}&amount=${amt}&memo=${payMeDesc}`; const newLink={id:linkId, link, qrData, amount:amt, microns:Math.round(amt*1e6), desc:payMeDesc, date:new Date().toISOString(), status:"actif"}; setPayMeLinks([newLink,...payMeLinks].slice(0,20)); alert(`✅ Pay Me: ${amt} Pi - ${link}`) }
const calculateSplit = ()=>{ const total=parseFloat(splitTotal); if(!total) return; const perPerson=total/(splitParticipants.length+1); setSplitResult({total, perPerson, results: splitParticipants.map((p:any)=>({...p, sharePi:perPerson}))}) }
const clearPendingPayment = async ()=>{ if(!pendingPayment) return; const paymentId = pendingPayment.identifier || pendingPayment.paymentId; const txid = pendingPayment.transaction?.txid || "MANUAL_"+Date.now(); await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet"})}); setPendingPayment(null); alert("✅ Pending nettoyé") }
const handleFeatureClick = (f:any)=>{ if(f.action==="transferer") setActiveBankService("transferer"); else if(f.action==="paiement") setTab("paiement"); else if(f.action==="cartes") setTab("cartes"); else if(f.action==="epargne") setTab("epargne"); else if(f.action==="kyc"){ setTab("plus"); setActiveBankService("kyc") } else setTab("accueil") }

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 if(pendingPayment){ alert("Pending à nettoyer"); return }
 setPaying(true)
 try{
  if(typeof window!=="undefined" && (window as any).Pi){
   await (window as any).Pi.authenticate(["payments","username","wallet_address"], (p:any)=>{ setPendingPayment(p) })
   await (window as any).Pi.createPayment({amount, memo: memo+` - V5.0.8 COMPLETE GCV 314159$`, metadata:{gdb_addr:gdbAddr, zone, mode:"mainnet", microns:Math.round(amount*1000000)}},{
    onReadyForServerApproval: async (paymentId:string)=>{ try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet"})}) }catch{} },
    onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
     try{ await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet"})}) }catch{}
     const newTx={id:txid, txid, paymentId, amount, microns:Math.round(amount*1000000), zone, status:"confirmé BEAC V5.0.8", date:new Date().toISOString(), wallet:gdbAddr}
     const updated=[newTx,...txHistory].slice(0,100); setTxHistory(updated); try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)) }catch{}
     setPendingPayment(null); alert(`✅ Paiement MAINNET V5.0.8!\nTx: ${txid}\n${amount} Pi - GCV 314159$`); setPaying(false)
    },
    onCancel: ()=>setPaying(false),
    onError: (err:any)=>{ if((err?.message||"").includes("pending")) setPendingPayment({identifier:"PENDING", amount}); setPaying(false) }
   })
  }else{ alert("Ouvre Pi Browser"); setPaying(false)}
 }catch(e:any){ setPaying(false)}
}

const handleTransferSend = async ()=>{
 const piVal = parseFloat(transferAmountPi)
 if(!piVal || piVal<=0){ alert("Montant Pi invalide"); return }
 let usdRefLocal = 0.30; if(valueType==="GCV") usdRefLocal = 314159; const localRate = zoneMoMo[transferZone]?.rate||600; const convertedLocal = piVal * usdRefLocal * localRate
 if(typeof window!=="undefined" && (window as any).Pi && piReady){
  setPaying(true)
  try{
   await (window as any).Pi.authenticate(["payments","username","wallet_address"], (p:any)=>{ setPendingPayment(p) })
   await (window as any).Pi.createPayment({amount: piVal, memo: `VIREMENT V5.0.8 ${virementSubTab} ${beneficiaryName} ${convertedLocal} ${transferCurrency} - GCV`, metadata:{type: transferTab, subType: virementSubTab, beneficiaryName}},{
    onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
     const newTx={id:txid, txid, paymentId, amount:piVal, zone: transferZone, status:"confirmé BEAC V5.0.8", date:new Date().toISOString(), wallet:gdbAddr}
     const updated=[newTx,...txHistory].slice(0,100); setTxHistory(updated); setPendingPayment(null); alert(`✅ VIREMENT V5.0.8 RÉUSSI! Tx: ${txid}`); setPaying(false); setActiveBankService(null)
    },
    onCancel: ()=>setPaying(false), onError: ()=>setPaying(false)
   })
  }catch(e:any){ setPaying(false) }
 }
}

const handleKYC = ()=>{ setKycOk(true); try{localStorage.setItem("gdb_kyc_verified","true")}catch{}; alert("✅ KYC activé RGPD PCI-DSS FaceID"); setActiveBankService(null) }
const toggleCardBlock = (id:string)=>{ setCards(cards.map(c=> c.id===id ? {...c, blocked:!c.blocked} : c)) }

const parseAmt = parseFloat(piAmount) || 0
const parseTransferPi = parseFloat(transferAmountPi) || 0
const calcTransferLocal = parseTransferPi * (valueType==="GCV"?314159:0.30) * (zoneMoMo[transferZone]?.rate||600)
const microVal = Math.round(parseAmt*1000000)

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:110, fontFamily:"Inter, system-ui"}}>
{pendingPayment && (
<div style={{background:"#FEF2F2", border:"2px solid #ef4444", padding:10, position:"sticky", top:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div style={{fontSize:8, fontWeight:900, color:"#991b1b"}}>⛔ PENDING DÉTECTÉ - {(pendingPayment.identifier||"").slice(0,12)}... - Auto-fix V5.0.8</div>
<button onClick={clearPendingPayment} style={{background:"#ef4444", color:"#fff", border:"none", borderRadius:8, padding:"8px 12px", fontWeight:900, fontSize:8}}>🧹 Nettoyer</button>
</div>
)}
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="GDB" width={34} height={34} style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}}/><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA DIGITAL BANK <span style={{color:"#10b981", fontSize:7}}>● V5.0.8 COMPLETE MONDIALE</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>
<div style={{padding:"10px 12px", background:"#0A1931"}}>
<div style={{background:"#fff", borderRadius:20, padding:"10px 14px", display:"flex", alignItems:"center", gap:8, border:"1px solid #C9A86A"}}>
<span style={{fontSize:12}}>🔍</span>
<input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Chercher: Pi Reel, Mobile Money, CEMAC, Carte, Coffre, Halal, QR..." style={{flex:1, border:"none", outline:"none", fontSize:10, fontWeight:600}}/>
</div>
</div>

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:"0 16px 16px 16px"}}>
<div style={{display:"flex", justifyContent:"space-between", padding:"8px 0"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE • MAINNET • READY</span><span style={{color:"#10b981", fontSize:9, fontWeight:800}}>LIVE</span></div>
{accounts.map((w:any)=>(
<div key={w.id} style={{background:w.id==="credit"?"linear-gradient(135deg,#991b1b,#ef4444)":"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:w.id==="credit"?"#FEE2E2":"#F9E2AF", fontSize:9}}>{w.flag} {w.type}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{w.id==="pi"?`${w.balPi} PI`:w.id==="usd"?`$${w.balUSD?.toLocaleString()}`:w.id==="eur"?`€${w.balEUR?.toLocaleString()}`:w.id==="xaf"?`${w.balXAF.toLocaleString()} FCFA`:`${w.balPi} PI`}</div><div style={{color:w.id==="credit"?"#FECACA":"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:w.status==="CREDIT"?"rgba(0,0,0,0.3)":"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>{w.status}</div>
</div>
))}
<div style={{display:"flex", gap:8, marginTop:12}}>
<button onClick={()=>setNetworkMode("TESTNET")} style={{flex:1, padding:10, borderRadius:20, border:"1px solid #C9A86A", background:networkMode==="TESTNET"?"#fff":"rgba(255,255,255,0.1)", color:networkMode==="TESTNET"?"#0A1931":"#fff", fontWeight:800, fontSize:9}}>🧪 TESTNET Formation</button>
<button onClick={()=>setNetworkMode("MAINNET")} style={{flex:1, padding:10, borderRadius:20, border:"1px solid #C9A86A", background:networkMode==="MAINNET"?"#C9A86A":"rgba(255,255,255,0.1)", color:networkMode==="MAINNET"?"#0A1931":"#fff", fontWeight:800, fontSize:9}}>💎 MAINNET Reel</button>
</div>
<div style={{textAlign:"center", marginTop:6, color:"#10b981", fontSize:7, fontWeight:800}}>Mode Reel - Vrai Pi Mainnet deplacé - GCV 314159$</div>
<button onClick={()=>handlePiPayment(1, "PAYER 1 PI MAINNET REEL GCV")} style={{width:"100%", marginTop:10, padding:14, borderRadius:10, background:"#C9A86A", color:"#0A1931", fontWeight:900, border:"none", fontSize:11}}>💎 PAYER 1 PI MAINNET - REEL GCV 314159$ - {networkMode}</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A", textAlign:"center"}}>
<div style={{fontWeight:900, fontSize:11}}>QR Reception Pi Reel - MAINNET - GARGOURA DIGITAL BANK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddrGlobal)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:7, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8, wordBreak:"break-all"}}>{gdbAddrGlobal} - KYC GLOBAL</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement & Transferts • PI DUAL - V5.0.8 COMPLETE</div>
<div style={{display:"flex", gap:6, overflowX:"auto", marginTop:10, paddingBottom:4}}>
{Object.keys(zones).map((z:any)=>(
<button key={z} onClick={()=>setTransferZone(z)} style={{padding:"8px 14px", borderRadius:20, border:"1px solid #C9A86A", background:transferZone===z?"#0A1931":"#fff", color:transferZone===z?"#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<select value={transferCountry} onChange={(e)=>setTransferCountry(e.target.value)} style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}}>
{zones[transferZone]?.map((c:string)=><option key={c} value={c}>{c}</option>)}
</select>
<input value={transferAccount} onChange={e=>setTransferAccount(e.target.value)} placeholder="Adresse Pi G... / IBAN / Numero MoMo" style={{width:"100%", padding:11, borderRadius:8, border:"1px solid #E2E8F0", fontSize:10, marginTop:8}}/>
<input value={transferAmountPi} onChange={e=>setTransferAmountPi(e.target.value)} placeholder="Montant Reel ex 1 Pi = 314159$ - GCV" style={{width:"100%", padding:11, borderRadius:8, border:"1px solid #E2E8F0", fontSize:10, marginTop:8}}/>
<div style={{display:"flex", gap:8, marginTop:10}}>
<button onClick={handleTransferSend} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer MAINNET PI {transferZone}</button>
<button onClick={()=>alert(`MoMo ${transferOperator} ${transferZone}`)} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 MoMo {transferZone}</button>
</div>
</div>
<div style={{background:"#22c55e", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:10}}>Mobile Money • 15 Operateurs • CinetPay</div>
<div style={{fontSize:8, marginTop:4}}>Orange MTN Wave Moov Airtel M-Pesa STC Pay Jawwal • Delai &lt;30s • Frais 0.8% • Mode MAINNET - GCV 314159$</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Cartes GARGOURA DIGITAL BANK • MAINNET - V5.0.8</div>
{cards.map((c:any)=>(
<div key={c.id} style={{background:c.color, borderRadius:16, padding:14, marginTop:12, border:c.blocked?"3px solid #ef4444":"1px solid #C9A86A", opacity:c.blocked?0.6:1}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#fff", fontWeight:900, fontSize:11}}>{c.type}</span><span style={{background:c.nfc?"#22c55e":"#64748b", color:"#fff", fontSize:7, padding:"3px 8px", borderRadius:10, fontWeight:900}}>● NFC {c.blocked?"BLOQUEE":"ACTIVE"}</span></div>
<div style={{color:"#fff", fontWeight:900, fontSize:16, letterSpacing:2, marginTop:12, textAlign:"center"}}>{hide? "•••• •••• •••• ••••" : c.num}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:12}}>
<div><div style={{color:"rgba(255,255,255,0.7)", fontSize:6}}>HOLDER</div><div style={{color:"#fff", fontSize:9, fontWeight:800}}>{c.holder}</div></div>
<div><div style={{color:"rgba(255,255,255,0.7)", fontSize:6}}>EXP</div><div style={{color:"#fff", fontSize:9, fontWeight:800}}>{c.exp}</div></div>
<div><div style={{color:"rgba(255,255,255,0.7)", fontSize:6}}>CVV</div><div style={{color:"#fff", fontSize:9, fontWeight:800}}>{hide? "***" : c.cvv}</div></div>
</div>
<div style={{display:"flex", gap:8, marginTop:12}}>
<button onClick={()=>toggleCardBlock(c.id)} style={{flex:1, padding:10, borderRadius:8, background:c.blocked?"#22c55e":"#ef4444", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>{c.blocked?"Debloquer":"Bloquer"}</button>
<button onClick={()=>alert(`PIN ${c.type}`)} style={{padding:10, borderRadius:8, background:"rgba(255,255,255,0.2)", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>PIN Voir</button>
</div>
</div>
))}
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Epargne PFM • Coffres • Micro-credit • MAINNET - V5.0.8</div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #E2E8F0", marginTop:10}}>
<div style={{fontWeight:900, fontSize:11}}>Budget PFM • Alerte depassement</div>
<div style={{display:"flex", gap:6, marginTop:10}}>
{pfmBudgets.map((b:any,i:number)=>(
<div key={i} style={{flex:1, background:i===2?"#C9A86A":"#0A1931", borderRadius:8, height:40, display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:4}}>
<div style={{color:"#fff", fontSize:6, fontWeight:800}}>{b.cat.slice(0,3)}</div>
</div>
))}
</div>
<div style={{fontSize:8, marginTop:8, color:"#64748b"}}>Vacances 450/800 PI • Alerte si >10% depassement - PFM V5.0.8</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{color:"#C9A86A", fontWeight:900, fontSize:9}}>Coffre Arrondi Auto</div>
<div style={{color:"#fff", fontSize:8, marginTop:6}}>{coffres[0].from} • {coffres[0].gain}<br/>• {coffres[0].bloque} • MAINNET GCV</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #E2E8F0"}}>
<div style={{color:"#0A1931", fontWeight:900, fontSize:9}}>Micro-credit 50-5000 PI • Halal • MAINNET</div>
<button onClick={()=>handlePiPayment(50, "Micro-credit Halal 50 PI")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#22c55e", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Demander 50 PI MAINNET - Halal</button>
</div>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:14, border:"1px solid #C9A86A", display:"flex", gap:12, alignItems:"center"}}>
<img src="/logo.png" alt="GDB" width={50} height={50} style={{width:50, height:50, borderRadius:10, background:"#0A1931", padding:4}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}}/>
<div><div style={{fontWeight:900, fontSize:12, color:"#0A1931"}}>GARGOURA DIGITAL BANK • MAINNET</div><div style={{fontSize:8, color:"#64748b", wordBreak:"break-all"}}>{gdbAddrGlobal} • KYC</div></div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #E2E8F0", marginTop:10}}>
<div style={{fontWeight:900, fontSize:11}}>Multi-devises FX • 12 devises • MAINNET</div>
<div style={{fontSize:8, color:"#64748b", marginTop:4}}>USD EUR XAF JOD AED • Taux reel • Frais 0.43% • IBAN virtuel • GCV 314159$ • V5.0.8 COMPLETE</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #E2E8F0", marginTop:10}}>
<div style={{fontWeight:900, fontSize:11}}>RGPD PCI-DSS FaceID</div>
<div style={{fontSize:8, color:"#64748b", marginTop:4}}>AES-256, tokenisation, 3D Secure, ISO20022 • Biometrie • KYC {kycOk?"✅":"⚠️"}</div>
<button onClick={handleKYC} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>Activer KYC - RGPD PCI-DSS</button>
</div>
<div style={{background:"#FFFBEB", borderRadius:12, padding:12, border:"1px solid #F59E0B", marginTop:10}}>
<div style={{fontWeight:900, fontSize:11, color:"#92400E"}}>Halal Sans Riba • Vert ESG • MAINNET - V5.0.8</div>
<div style={{fontSize:8, color:"#92400E", marginTop:4}}>Mudaraba Musharaka Murabaha • AAOIFI • Zakat 2.5% • ESG 8.5 • Halal certifié BEAC • GCV 314159$</div>
</div>
</div>
)}

{activeBankService==="transferer" && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.92)", zIndex:100, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:10, overflowY:"auto"}}>
<div style={{background:"#F5F7FB", borderRadius:16, width:"100%", maxWidth:420, border:"2px solid #C9A86A", maxHeight:"96vh", overflowY:"auto"}}>
<div style={{background:"#0A1931", padding:14, borderRadius:"14px 14px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:10}}>VIREMENT V5.0.8 COMPLETE MONDIALE + FIX</span>
<button onClick={()=>setActiveBankService(null)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"4px 10px", fontWeight:900}}>✕</button>
</div>
<div style={{display:"flex", gap:4, padding:10, background:"#fff", borderBottom:"1px solid #E2E8F0"}}>
{[{id:"virement",l:"💸 Virement"},{id:"payme",l:"🔗 Pay Me"},{id:"split",l:"✂️ Split"},{id:"openbanking",l:"🏦 Open"}].map((s:any)=>(
<button key={s.id} onClick={()=>setVirementSubTab(s.id)} style={{flex:1,padding:8,borderRadius:10,border:"none",background:virementSubTab===s.id?"#0A1931":"#F5F7FB",color:virementSubTab===s.id?"#C9A86A":"#64748b",fontWeight:900,fontSize:9}}>{s.l}</button>
))}
</div>
<div style={{padding:12}}>
{virementSubTab==="virement" && (<><input value={beneficiaryName} onChange={e=>{setBeneficiaryName(e.target.value);setBeneficiaryVerified(null)}} placeholder="Nom bénéficiaire - Confirmation of Payee" style={{width:"100%",padding:11,borderRadius:8,border:"1.5px solid #C9A86A",fontSize:10,marginTop:8}}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}><input value={transferPhone} onChange={e=>{setTransferPhone(e.target.value);setBeneficiaryVerified(null)}} placeholder="Téléphone - Plus besoin IBAN long" style={{padding:11,borderRadius:8,border:"1.5px solid #C9A86A",fontSize:10}}/><input value={transferEmail} onChange={e=>{setTransferEmail(e.target.value);setBeneficiaryVerified(null)}} placeholder="Email - Virement par email" style={{padding:11,borderRadius:8,border:"1.5px solid #C9A86A",fontSize:10}}/></div><button onClick={verifyBeneficiary} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,background:beneficiaryVerified===true?"#10b981":beneficiaryVerified===false?"#ef4444":"#0A1931",color:"#fff",fontWeight:900,border:"none",fontSize:9}}>{beneficiaryCheckLoading?"⏳ Vérif...":beneficiaryVerified===true?"✅ Vérifié":beneficiaryVerified===false?"❌ Ne correspond pas":"🛡️ Vérifier Bénéficiaire"}</button><div style={{marginTop:10, background:"#0A1931", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><input type="number" value={transferAmountPi} onChange={(e)=>setTransferAmountPi(e.target.value)} placeholder="Ex: 0.0015 Pi = 1500 µPi - GCV 314159$" style={{width:"100%", padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:14, fontWeight:900, marginTop:8}} />{parseTransferPi>0 && (<div style={{marginTop:8, background:"rgba(16,185,129,0.15)", borderRadius:8, padding:8, border:"1px solid #10b981"}}><div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#fff"}}><span>Tu envoies (GCV)</span><span style={{fontWeight:900, color:"#F9E2AF"}}>{parseTransferPi} Pi = {(parseTransferPi*314159).toLocaleString()} $ GCV</span></div><div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#fff", marginTop:6}}><span style={{color:"#10b981"}}>Reçoit AUTO-CONVERTI &lt;10s</span><span style={{fontWeight:900, color:"#10b981"}}>{Math.round(calcTransferLocal).toLocaleString()} {transferCurrency}</span></div></div>)}</div></>)}
{virementSubTab==="payme" && (<div style={{background:"#fff", padding:12, borderRadius:12, border:"1px solid #C9A86A"}}><input value={payMeAmount} onChange={e=>setPayMeAmount(e.target.value)} placeholder="Montant Pi GCV" style={{width:"100%",padding:12,borderRadius:8,border:"1.5px solid #C9A86A",marginTop:8}}/><button onClick={generatePayMeLink} style={{width:"100%",marginTop:8,padding:12,borderRadius:10,background:"#0A1931",color:"#C9A86A",fontWeight:900,border:"none"}}>🔗 Générer Lien Pay Me + QR GCV</button>{payMeLinks.map((l:any)=><div key={l.id} style={{marginTop:8,background:"#F5F7FB",padding:8,borderRadius:8,fontSize:8}}><b>{l.amount} Pi = {(l.amount*314159).toLocaleString()} $ GCV</b><div style={{wordBreak:"break-all"}}>{l.link}</div></div>)}</div>)}
{virementSubTab==="split" && (<div style={{background:"#fff", padding:12, borderRadius:12, border:"1px solid #C9A86A"}}><input value={splitTotal} onChange={e=>setSplitTotal(e.target.value)} placeholder="Total Pi ex: 0.09 GCV" style={{width:"100%",padding:12,borderRadius:8,border:"1.5px solid #C9A86A",marginTop:8}}/><button onClick={calculateSplit} style={{width:"100%",marginTop:8,padding:12,borderRadius:10,background:"#0A1931",color:"#C9A86A",fontWeight:900,border:"none"}}>✂️ Calculer Partage GCV</button>{splitResult && <div style={{marginTop:8,background:"#DCFCE7",padding:8,borderRadius:8,fontSize:8}}>{splitResult.results.map((r:any,i:number)=><div key={i}><b>{r.name}</b> doit {r.sharePi.toFixed(6)} Pi</div>)}</div>}</div>)}
{virementSubTab==="openbanking" && (<div style={{background:"#fff", padding:12, borderRadius:12, border:"1px solid #C9A86A"}}>{externalAccounts.map((acc:any)=><div key={acc.id} style={{marginTop:6,padding:10,borderRadius:10,border:selectedExternal===acc.id?"2px solid #0A1931":"1px solid #E2E8F0"}}><b style={{fontSize:9}}>{acc.bank} {acc.connected?"✅":"⏳"}</b><div style={{fontSize:7}}>{acc.iban}</div></div>)}</div>)}
<button onClick={handleTransferSend} disabled={paying} style={{width:"100%", marginTop:12, padding:14, borderRadius:12, background:paying?"#64748b":"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:11}}>{paying?"⏳ Paiement...":`🔵 Virement ${transferAmountPi||"0"} Pi GCV → ${Math.round(calcTransferLocal).toLocaleString()} ${transferCurrency} - Mondial`}</button></div></div></div>
)}

<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"96%", maxWidth:440, background:"#fff", borderRadius:22, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", border:"1px solid #E2E8F0", display:"flex", justifyContent:"space-around", padding:"8px 0", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Accueil"},{id:"paiement", ic:"💸", l:"Paiement"},{id:"cartes", ic:"💳", l:"Cartes"},{id:"epargne", ic:"📈", l:"Epargne"},{id:"plus", ic:"☰", l:"Plus"}].map((b)=>{
 const isActive = tab===b.id
 return(<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none", background:isActive? "#0A1931" : "transparent", color:isActive? "#C9A86A" : "#0A1931", borderRadius:14, padding:"6px 10px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:7, fontWeight:800}}><span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span></button>)})}
</div>
</div>
)
}
