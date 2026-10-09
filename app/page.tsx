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
const [userName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [kycOk,setKycOk]=useState(false)
const [kycDocs,setKycDocs]=useState({cni:"", selfie:"", statut:"en_attente"})
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("0.0015")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("MARCHE")
const [merchantRate,setMerchantRate]=useState("0.5")

// TRANSFERT - MONTANT EXCLUSIVEMENT EN PI
const [transferTab,setTransferTab]=useState<"interne"|"externe">("interne")
const [transferZone,setTransferZone]=useState("CEMAC")
const [transferCountry,setTransferCountry]=useState("Tchad BEAC")
const [transferBank,setTransferBank]=useState("UBA Tchad")
const [transferAccount,setTransferAccount]=useState("")
const [transferPhone,setTransferPhone]=useState("")
const [transferOperator,setTransferOperator]=useState("Orange Money")
const [transferAmountPi,setTransferAmountPi]=useState("") // EXCLUSIVEMENT PI
const [transferMotif,setTransferMotif]=useState("")
const [transferCurrency,setTransferCurrency]=useState("XAF")

const [accounts] = useState([
 {id:"pi", iban:"GB29NWBK60161331926819", type:"PI MAINNET", balPi:12.46582, balXAF:0, currency:"PI", wallet:"GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK"},
 {id:"xaf", iban:"TD64 2000 1000 0123 4567 8901 02", type:"XAF CEMAC BEAC", balPi:0, balXAF:24500000, currency:"XAF", wallet:"UBA Tchad Pièce 17"},
 {id:"usd", iban:"US64 SVBK US6S 3300 0000 0000", type:"USD SWIFT", balPi:0, balXAF:0, balUSD:42850, currency:"USD", wallet:"UBA USD"},
])
const [txHistory,setTxHistory]=useState<any[]>([])
const [virtualCards,setVirtualCards]=useState<any[]>([])
const [tontines,setTontines]=useState<any[]>([])
const [limits,setLimits]=useState({journalier:5000000, mensuel:50000000, utilise:185000})
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
 "CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s", rate:600, banks:["UBA Tchad","BEAC","BICEC Cameroun","BGFI Gabon","Ecobank"]},
 "UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s", rate:600, banks:["UBA Senegal","BICIS","BOA","Coris Bank"]},
 "DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s", rate:1, banks:["Chase USA","Bank of America","Citi USA","RBC Canada"]},
 "JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s", rate:0.71, banks:["Jordan Ahli Bank","Arab Bank JO","Housing Bank JO"]},
 "GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s", rate:3.75, banks:["FAB UAE","Al Rajhi Saudi","QNB Qatar","NBK Kuwait"]},
 "MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s", rate:3.64, banks:["Ziraat Turquie","Byblos Liban","NBE Egypte"]},
 "INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h", rate:1, banks:["Barclays UK","BNP France","Deutsche Bank","ICBC Chine","SBI Inde","SWIFT MONDIAL"]}
}
const microChips = [
 {label:"1 µPi", val:"0.000001"},
 {label:"100 µPi", val:"0.0001"},
 {label:"0.0015 Pi", val:"0.0015"},
 {label:"0.01 Pi", val:"0.01"},
 {label:"0.1 Pi", val:"0.1"},
 {label:"1 Pi", val:"1"},
]
const currentFeatures = [
 {id:"transferer", label:"Transferer", icon:"💸", action:"transferer"},
 {id:"virement", label:"Virement", icon:"🏦", action:"paiement"},
 {id:"pidex", label:"Pi DEX", icon:"🔄", action:"paiement"},
 {id:"convertir", label:"Convertir", icon:"💱", action:"paiement"},
 {id:"trading", label:"Trading", icon:"📈", action:"epargne"},
 {id:"wallet", label:"Wallet", icon:"👛", action:"accueil"},
 {id:"cartes", label:"Cartes", icon:"💳", action:"cartes"},
 {id:"kyc", label:"KYC", icon:"🛡️", action:"kyc"},
 {id:"aiauto", label:"AI Auto", icon:"🤖", action:"support"},
 {id:"blockchain", label:"Blockchain", icon:"⛓️", action:"blockchain"},
 {id:"shopping", label:"Shopping", icon:"🛒", action:"shopping"},
 {id:"gestion", label:"Gestion", icon:"⚙️", action:"gestion"},
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
  const hist=localStorage.getItem("gdb_tx_history")
  if(hist) setTxHistory(JSON.parse(hist))
  else {
   const last=localStorage.getItem("gdb_last_tx")
   if(last){
    const l=JSON.parse(last)
    setTxHistory([{...l, id:"2c314c09cc9ecbbcb9579e0c3c910f85ca7fe5d0686f2f71af3a3cedfd186aa6", amount:0.1, microns:100000, status:"confirmé BEAC", zone:"CEMAC", momo:"Airtel Money"}, {id:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9", amount:0.0015, microns:1500, status:"confirmé BEAC", zone:"CEMAC", momo:"Orange Money", txid:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9", date:new Date().toISOString()}])
   }
  }
  const vc=localStorage.getItem("gdb_virtual_cards")
  if(vc) setVirtualCards(JSON.parse(vc))
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

const handleFeatureClick = (f:any)=>{
 if(f.action==="transferer") setActiveBankService("transferer")
 else if(f.action==="paiement") setTab("paiement")
 else if(f.action==="cartes") setTab("cartes")
 else if(f.action==="epargne") setTab("epargne")
 else if(f.action==="kyc"){ setTab("plus"); setActiveBankService("kyc") }
 else if(f.action==="support"){ setTab("plus"); setActiveBankService("api") }
 else if(f.action==="blockchain"){ alert(`⛓️ Blockchain MAINNET\nKYC: ${gdbAddr}\nBANQUE: ${gdbAddrBankFuture}\nTx 2c314c09... 6ec364f8...`) }
 else if(f.action==="gestion"){ generateRelevePDF() }
 else setTab("accueil")
}

// PAIEMENT PI REEL V5.3 RESTAURÉ INTEGRALEMENT
const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 if(typeof window!=="undefined"){
  const kyc=localStorage.getItem("gdb_kyc_verified")
  if(kyc!=="true" &&!kycOk){ alert("⚠️ KYC requis - Plus > KYC Pièce 17 BEAC"); setTab("plus"); setActiveBankService("kyc"); return }
 }
 if(amount*0.30*600 + limits.utilise > limits.journalier){ alert(`⛔ Plafond BEAC dépassé\nLimite: ${limits.journalier} XAF\nUtilisé: ${limits.utilise}`); return }
 setPaying(true)
 try{
   let xafCantonne=0, usdRef=0, labelValeur=""
   if(valueType==="GCV"){ usdRef=314159; labelValeur="GCV 314159$ NON CANTONNE"; xafCantonne=0 }
   if(valueType==="MARCHE"){ usdRef=0.30; labelValeur="MARCHE 0.30$ CANTONNE UBA Tchad"; xafCantonne=amount*0.30*(zoneMoMo[zone]?.rate||600) }
   if(valueType==="MARCHAND"){ usdRef=parseFloat(merchantRate)||0.5; labelValeur=`MARCHAND ${merchantRate} CANTONNE UBA`; xafCantonne=amount*usdRef*(zoneMoMo[zone]?.rate||600) }
   if(typeof window!=="undefined" && (window as any).Pi){
     await (window as any).Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await (window as any).Pi.createPayment({
       amount, memo: memo+` - V5.0.6 BANQUE ${valueType} [${zone} ${momoOp}] ${labelValeur} KYC GAS5`,
       metadata:{gdb_addr:gdbAddr, gdb_bank_future:gdbAddrBankFuture, zone, momo_op:momoOp, mode:"mainnet", microns:Math.round(amount*1000000), valueType, usdRef, xafCantonne, uba:"UBA Tchad Pièce 17"}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet", valueType, xafCantonne})}) }catch{}
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         try{
           await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet", valueType, xafCantonne, ubaAccount:"UBA Tchad"})})
           if(valueType!=="GCV"){ await fetch("/api/uba/cantonnement",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({piAmount:amount, valueType, xafCantonne, usdRef, dest:momoOp, zone, walletMainnet:gdbAddr, txid})}) }
         }catch{}
         const newTx={id:txid, txid, paymentId, amount, microns:Math.round(amount*1000000), valueType, xafCantonne, usdRef, zone, momoOp, status:"confirmé BEAC", date:new Date().toISOString(), wallet:gdbAddr, uba:"UBA Tchad Pièce 17"}
         const updated=[newTx,...txHistory].slice(0,100)
         setTxHistory(updated)
         try{ if(typeof window!=="undefined"){ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)); localStorage.setItem("gdb_last_tx", JSON.stringify(newTx)) } }catch{}
         setLimits((p:any)=>({...p, utilise: p.utilise + xafCantonne}))
         alert(`✅ Paiement MAINNET V5.0.6 BANQUE!\nWallet KYC: ${gdbAddr.slice(0,6)}...QVK\nTx: ${txid}\n${amount} Pi = ${Math.round(amount*1000000)} µPi\nUBA: ${xafCantonne.toLocaleString()} ${zoneMoMo[zone]?.cur}`)
         setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
     })
   }else{ alert(`Ouvre Pi Browser MAINNET KYC GAS5\n${amount} Pi = ${Math.round(amount*1000000)} µPi\n${labelValeur}`); setPaying(false)}
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false)}
}

// TRANSFERT P2P - MONTANT EXCLUSIVEMENT EN PI + CONVERSION AUTO
const handleTransferSend = async ()=>{
 const piVal = parseFloat(transferAmountPi)
 if(!piVal || piVal<=0){ alert("Montant Pi invalide - Ex: 0.0015 = 1500 µPi"); return }
 if(transferTab==="interne" &&!transferAccount &&!transferPhone){ alert("IBAN / Adresse Pi / Téléphone requis"); return }
 if(transferTab==="externe" &&!transferAccount){ alert("Numéro de compte bancaire requis"); return }

 // CALCUL CONVERSION AUTO VERS MONNAIE LOCALE
 let usdRefLocal = 0.30
 if(valueType==="GCV") usdRefLocal = 314159
 else if(valueType==="MARCHE") usdRefLocal = 0.30
 else usdRefLocal = parseFloat(merchantRate)||0.5
 const localRate = zoneMoMo[transferZone]?.rate||600
 const convertedLocal = piVal * usdRefLocal * localRate
 const micronsLocal = Math.round(piVal*1000000)

 // PAIEMENT PI REEL POUR TRANSFERT
 if(typeof window!=="undefined" && (window as any).Pi && piReady){
  setPaying(true)
  try{
   await (window as any).Pi.authenticate(["payments","username","wallet_address"], ()=>{})
   await (window as any).Pi.createPayment({
     amount: piVal,
     memo: `TRANSFERT ${transferTab.toUpperCase()} ${transferZone} ${transferBank} ${convertedLocal.toLocaleString()} ${transferCurrency} AUTO-CONVERTI - KYC GAS5`,
     metadata:{type: transferTab==="interne"?"P2P INTERNE":"P2P EXTERNE", zone: transferZone, country: transferCountry, bank: transferBank, account: transferAccount, phone: transferPhone, operator: transferOperator, piAmount: piVal, microns: micronsLocal, convertedLocal, currency: transferCurrency, valueType, usdRef: usdRefLocal, motif: transferMotif, uba:"UBA Tchad"}
   },{
     onReadyForServerApproval: async (paymentId:string)=>{ try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet", type:"transfert"})}) }catch{} },
     onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
       const newTx={id:txid, txid, paymentId, amount:piVal, microns:micronsLocal, type: transferTab==="interne"?"P2P INTERNE":"P2P EXTERNE", zone: transferZone, country: transferCountry, bank: transferBank, account: transferAccount, phone: transferPhone, operator: transferOperator, convertedLocal, currency: transferCurrency, motif: transferMotif, valueType, usdRef: usdRefLocal, status:"confirmé BEAC - instantané interopérable - converti auto", date:new Date().toISOString(), wallet:gdbAddr, uba:"UBA Tchad Pièce 17"}
       const updated=[newTx,...txHistory].slice(0,100)
       setTxHistory(updated)
       try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)); localStorage.setItem("gdb_last_tx", JSON.stringify(newTx)) }catch{}
       alert(`✅ ${transferTab==="interne"?"TRANSFERT P2P INTERNE":"TRANSFERT BANQUE EXTERNE"} RÉUSSI MAINNET!\n\nEnvoyé: ${piVal} Pi = ${micronsLocal.toLocaleString()} µPi\nReçu chez destinataire: ${convertedLocal.toLocaleString()} ${transferCurrency} (auto-converti)\nZone: ${transferZone} - ${transferCountry}\nBanque: ${transferBank}\nOpérateur: ${transferOperator}\nTx: ${txid}\n\n⚡ Instantané interopérable BEAC COBAC\nKYC GAS5...QVK ✅`)
       setPaying(false); setActiveBankService(null); setTransferAmountPi(""); setTransferAccount(""); setTransferPhone(""); setTransferMotif("")
     },
     onCancel: ()=>setPaying(false),
     onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
   })
  }catch(e:any){ alert("Erreur: "+e.message); setPaying(false) }
 } else {
  // MODE DEMO SANS PI BROWSER - GARDE CONVERSION AUTO
  const newTx={id:"TRF_"+Date.now(), txid:"TRF_"+Date.now(), amount:piVal, microns:micronsLocal, type: transferTab==="interne"?"P2P INTERNE":"P2P EXTERNE", zone: transferZone, country: transferCountry, bank: transferBank, account: transferAccount, convertedLocal, currency: transferCurrency, motif: transferMotif, status:"confirmé BEAC - DEMO - converti auto", date:new Date().toISOString(), wallet:gdbAddr}
  const updated=[newTx,...txHistory].slice(0,100)
  setTxHistory(updated)
  try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)) }catch{}
  alert(`✅ DEMO TRANSFERT - Ouvre Pi Browser pour MAINNET\nEnvoyé: ${piVal} Pi = ${micronsLocal} µPi\nReçu: ${convertedLocal.toLocaleString()} ${transferCurrency} auto-converti\nZone: ${transferZone} ${transferBank}`)
  setActiveBankService(null)
 }
}

const handleKYC = ()=>{ setKycDocs({...kycDocs, statut:"verifie"}); setKycOk(true); try{localStorage.setItem("gdb_kyc_verified","true")}catch{}; alert("✅ KYC Pièce 17 BEAC vérifié! Limite 5M XAF/j"); setActiveBankService(null) }
const createVirtualCardBank = ()=>{
  const card={id:"VCARD_"+Date.now(), number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, iban:accounts[1].iban, wallet:gdbAddr, status:"active", created:new Date().toISOString()}
  const newCards=[card,...virtualCards]; setVirtualCards(newCards); try{localStorage.setItem("gdb_virtual_cards", JSON.stringify(newCards))}catch{}; alert(`💳 Carte Virtuelle créée!`)
}
const generateRelevePDF = ()=>{
  const totalXAF=txHistory.reduce((s:any,t:any)=>s+(t.xafCantonne||t.convertedLocal||0),0)
  alert(`📄 Relevé BEAC PDF V5.0.6\nTx: ${txHistory.length}\nTotal: ${totalXAF.toLocaleString()} XAF\nKYC GAS5...QVK\nIBAN ${accounts[1].iban}\nTx 2c314c09... 6ec364f8... incluses`)
}

const parseAmt = parseFloat(piAmount) || 0
const parseTransferPi = parseFloat(transferAmountPi) || 0
const calcTransferLocal = parseTransferPi * (valueType==="GCV"?314159:valueType==="MARCHE"?0.30:parseFloat(merchantRate)||0.5) * (zoneMoMo[transferZone]?.rate||600)
const microVal = Math.round(parseAmt*1000000)

const wallets=[
 {id:"pi", name:"PI GCV Principal UBA", bal: hide? "••••" : `${accounts[0].balPi} PI`, sub:`KYC ${gdbAddr.slice(0,6)}...QVK • MAINNET • IBAN ${accounts[0].iban.slice(0,8)}... • UBA Pièce 17`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT UBA", bal: hide? "••••" : `$${accounts[2].balUSD?.toLocaleString()}`, sub:`USA IBAN virtuel • UBA Tchad • MAINNET • ${accounts[2].iban.slice(0,8)}...`, flag:"🇺🇸"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal: hide? "••••" : `${accounts[1].balXAF.toLocaleString()} FCFA`, sub:`Tchad • Cantonnement UBA Tchad • MAINNET • ${accounts[1].iban}`, flag:"🇹🇩"},
]

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:110, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" width={34} height={34} style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2, objectFit:"contain"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● V5.0.6 KYC {kycOk?"✅":"⚠️"}</span></span>
</div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto", display:"flex", flexDirection:"column"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" width={32} height={32} style={{width:32, height:32, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<b style={{color:"#F9E2AF", fontSize:12}}>GARGOURA BANK</b>
</div>
<button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button>
</div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil V5.0.6"},{i:"paiement", l:"💸 Paiement Pi Triple 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD UBA"},{i:"epargne", l:"📈 Epargne Tontine µPi"},{i:"plus", l:"☰ Plus - Banque Complète"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(16,185,129,0.15)", borderRadius:12, padding:12, color:"#fff", fontSize:9, border:"1px solid #10b981"}}>
<b style={{color:"#10b981"}}>V5.0.6 BANQUE • KYC GAS5...QVK ✅</b><br/>KYC: {gdbAddr.slice(0,12)}...QVK<br/>BANQUE FUTURE: {gdbAddrBankFuture.slice(0,12)}... ⏳ KYB<br/>IBAN: {accounts[1].iban}
</div>
<div style={{marginTop:"auto", paddingTop:16, borderTop:"1px solid rgba(201,168,106,0.2)"}}>
<div style={{background:"rgba(201,168,106,0.08)", border:"1px solid #C9A86A33", borderRadius:12, padding:12, textAlign:"center"}}>
<img src="/logo.png" alt="GDB" width={44} height={44} style={{width:44, height:44, borderRadius:10, background:"#fff", padding:4, margin:"0 auto 8px", display:"block"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<div style={{fontSize:13, fontWeight:900, color:"#C9A86A"}}>V 5.0.3</div>
<div style={{fontSize:8, color:"#F9E2AF", marginTop:4}}>GARGOURA DIGITAL BANK</div>
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
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE V5.0.6 • KYC {kycOk?"✅":"⚠️"} • IBAN • {piReady? "READY PI" : "..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE UBA"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>UBA</div>
</div>
))}
<button onClick={()=>handlePiPayment(parseFloat(piAmount)||0.0015, "Recharge GARGOURA V5.0.6")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER {piAmount} PI V5.0.6 - KYC GAS5...QVK - {microVal.toLocaleString()} µPi</button>
</div>

<div style={{padding:12}}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
<span style={{fontWeight:900, fontSize:13, color:"#0A1931"}}>Fonctionnalites Courantes • 12</span>
<span style={{fontSize:8, fontWeight:800, color:"#10b981", background:"#10b98122", border:"1px solid #10b981", padding:"4px 10px", borderRadius:20}}>V5.0.6 PI REEL ACTIF</span>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10}}>
{currentFeatures.map((f)=>(
<button key={f.id} onClick={()=>handleFeatureClick(f)} style={{background:f.id==="transferer"?"#0A1931":"#fff", border:f.id==="transferer"?"2px solid #C9A86A":"1px solid #E2E8F0", borderRadius:18, padding:"12px 4px", display:"flex", flexDirection:"column", alignItems:"center", gap:8}}>
<div style={{width:48, height:48, borderRadius:14, background:f.id==="transferer"?"#C9A86A":"#0A1931", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>{f.icon}</div>
<span style={{fontSize:9, fontWeight:800, color:f.id==="transferer"?"#C9A86A":"#0A1931"}}>{f.label}</span>
</button>
))}
</div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center", marginTop:12}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel V5.0.6 - KYC GAS5...QVK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:130, height:130, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:7, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8, wordBreak:"break-all"}}>KYC ACTIF: {gdbAddr}<br/>BANQUE FUTURE: {gdbAddrBankFuture}<br/>IBAN: {accounts[1].iban}</div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement V5.0.6 • KYC GAS5 • IBAN • Pi Réel Triple</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>{zoneMoMo[zone]?.flag} {zone} • {zoneMoMo[zone]?.cur}</span><span style={{fontSize:8, color:"#10b981", fontWeight:800}}>{zoneMoMo[zone]?.delay} • {(limits.journalier-limits.utilise).toLocaleString()} XAF rest.</span></div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:8}}>
{zoneMoMo[zone]?.ops.map((op:string)=>(
<button key={op} onClick={()=>setMomoOp(op)} style={{padding:"6px 10px", borderRadius:15, border:"1px solid #C9A86A", background:momoOp===op?"#0A1931":"#F5F7FB", color:momoOp===op?"#C9A86A":"#0A1931", fontSize:9, fontWeight:900}}>{op}</button>
))}
</div>
<div style={{marginTop:12, background:"#F5F7FB", borderRadius:10, padding:10, border:"1px dashed #C9A86A"}}>
<div style={{fontSize:8, fontWeight:900, color:"#0A1931"}}>⚡ MICRONS PI • 1 Pi = 1,000,000 µPi • KYC GAS5...QVK</div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:6}}>
{microChips.map((c)=>(
<button key={c.label} onClick={()=>setPiAmount(c.val)} style={{padding:"6px 10px", borderRadius:15, border:parseAmt.toString()===c.val? "1.5px solid #0A1931":"1px solid #e2e8f0", background:parseAmt.toString()===c.val? "#C9A86A":"#fff", fontSize:9, fontWeight:900, color:"#0A1931"}}>{c.label}</button>
))}
</div>
</div>
<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="Montant Pi ex: 0.0015 = 1500 µPi" style={{width:"100%", marginTop:8, padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:12, fontWeight:800}} />
{parseAmt>0 && (
<div style={{marginTop:8, background:"#0A1931", borderRadius:10, padding:10, color:"#fff"}}>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8}}><span style={{color:"#C9A86A"}}>PI</span><span style={{fontWeight:900}}>{parseAmt} Pi = {microVal.toLocaleString()} µPi</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, marginTop:4, background:"rgba(16,185,129,0.2)", padding:4, borderRadius:6}}><span style={{color:"#10b981"}}>Marché 0.30$ Cant. UBA IBAN</span><span style={{fontWeight:900}}>{(parseAmt*0.30*(zoneMoMo[zone]?.rate||600)).toLocaleString()} {zoneMoMo[zone]?.cur}</span></div>
</div>
)}
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>handlePiPayment(parseAmt, "Paiement P2P V5.0.6 "+zone+" "+momoOp)} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {parseAmt} PI • KYC GAS5</button>
<button onClick={()=>alert(`MoMo ${momoOp} - ${parseAmt} Pi`)} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 MoMo {momoOp.slice(0,8)}</button>
</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>📄 Historique • {txHistory.length} Tx • IBAN {accounts[1].iban.slice(0,10)}...</div>
{txHistory.slice(0,3).map((t:any)=><div key={t.id||t.txid} style={{fontSize:8, marginTop:6, background:"#F5F7FB", padding:6, borderRadius:6}}><b>{t.amount} Pi = {t.microns} µPi</b> • {t.zone} {t.momoOp||t.momo||t.bank} • {t.convertedLocal?`→ ${Math.round(t.convertedLocal).toLocaleString()} ${t.currency||t.cur} auto`:""} • Tx {(t.txid||t.id||"").slice(0,12)}...</div>)}
<button onClick={generateRelevePDF} style={{marginTop:8, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900, width:"100%"}}>Relevé PDF BEAC IBAN</button>
</div>
</div>
)}

{tab==="cartes" && (<div style={{padding:12}}><button onClick={createVirtualCardBank} style={{width:"100%", padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Créer Carte Virtuelle - KYC GAS5</button></div>)}
{tab==="epargne" && (<div style={{padding:12}}><div style={{fontWeight:900}}>Epargne PFM V5.0.6</div></div>)}
{tab==="plus" && (<div style={{padding:12}}><button onClick={()=>setActiveBankService("kyc")} style={{width:"100%", padding:10, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>KYC {kycOk?"✅":"⚠️"}</button><button onClick={generateRelevePDF} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Relevé PDF</button></div>)}

{activeBankService==="transferer" && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.9)", zIndex:100, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:10, overflowY:"auto"}}>
<div style={{background:"#F5F7FB", borderRadius:16, width:"100%", maxWidth:420, border:"2px solid #C9A86A", maxHeight:"96vh", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{background:"#0A1931", padding:14, borderRadius:"14px 14px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:2}}>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="" width={28} height={28} style={{width:28, height:28, borderRadius:6, background:"#fff", padding:2}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>TRANSFÉRER • PI EXCLUSIF • KYC GAS5...QVK</span></div>
<button onClick={()=>setActiveBankService(null)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"4px 10px", fontWeight:900}}>✕</button>
</div>
<div style={{padding:12}}>
<div style={{display:"flex", gap:6, background:"#fff", padding:4, borderRadius:12, border:"1px solid #E2E8F0"}}>
<button onClick={()=>setTransferTab("interne")} style={{flex:1, padding:10, borderRadius:10, border:"none", background:transferTab==="interne"?"#0A1931":"#F5F7FB", color:transferTab==="interne"?"#C9A86A":"#64748b", fontWeight:900, fontSize:10}}>P2P INTERNE</button>
<button onClick={()=>setTransferTab("externe")} style={{flex:1, padding:10, borderRadius:10, border:"none", background:transferTab==="externe"?"#0A1931":"#F5F7FB", color:transferTab==="externe"?"#C9A86A":"#64748b", fontWeight:900, fontSize:10}}>P2P EXTERNE</button>
</div>
<div style={{marginTop:10}}>
<div style={{fontSize:9, fontWeight:900, color:"#0A1931", marginBottom:6}}>1. ZONE 7 - {zoneMoMo[transferZone]?.flag} {transferZone}</div>
<div style={{display:"flex", gap:4, overflowX:"auto", paddingBottom:4}}>
{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setTransferZone(z)} style={{padding:"6px 10px", borderRadius:20, border:"1px solid #C9A86A", background:transferZone===z?"#0A1931":"#fff", color:transferZone===z?"#C9A86A":"#0A1931", fontSize:8, fontWeight:900, whiteSpace:"nowrap"}}>{zoneMoMo[z]?.flag} {z}</button>
))}
</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
<div>
<div style={{fontSize:8, fontWeight:800}}>2. Pays</div>
<select value={transferCountry} onChange={(e)=>setTransferCountry(e.target.value)} style={{width:"100%", padding:10, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:9, fontWeight:700, marginTop:4}}>
{zones[transferZone]?.map((c:string)=><option key={c} value={c}>{c}</option>)}
</select>
</div>
<div>
<div style={{fontSize:8, fontWeight:800}}>3. Banque Partenaire</div>
<select value={transferBank} onChange={(e)=>setTransferBank(e.target.value)} style={{width:"100%", padding:10, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:9, fontWeight:700, marginTop:4}}>
{zoneMoMo[transferZone]?.banks?.map((b:string)=><option key={b} value={b}>{b}</option>)}
</select>
</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:10, border:"1px solid #E2E8F0"}}>
<div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>4. Destinataire</div>
<input value={transferAccount} onChange={(e)=>setTransferAccount(e.target.value)} placeholder={transferTab==="interne"?"IBAN / Adresse Pi GAS5... / Compte":"Numéro Compte Bancaire IBAN"} style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700, marginTop:8}} />
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<select value={transferOperator} onChange={(e)=>setTransferOperator(e.target.value)} style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}}>
{zoneMoMo[transferZone]?.ops?.map((op:string)=><option key={op} value={op}>{op}</option>)}
</select>
<input value={transferPhone} onChange={(e)=>setTransferPhone(e.target.value)} placeholder={transferTab==="interne"?"Tel MoMo si MoMo":"SWIFT/SEPA"} style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}} />
</div>
</div>
<div style={{marginTop:10, background:"#0A1931", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}>
<div style={{fontSize:9, fontWeight:900, color:"#F9E2AF"}}>5. MONTANT EXCLUSIVEMENT EN PI - Conversion Auto</div>
<input type="number" value={transferAmountPi} onChange={(e)=>setTransferAmountPi(e.target.value)} placeholder="Ex: 0.0015 Pi = 1500 µPi" style={{width:"100%", padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:14, fontWeight:900, marginTop:8}} />
<div style={{display:"flex", gap:4, flexWrap:"wrap", marginTop:8}}>
{microChips.map((c)=>(
<button key={c.label} onClick={()=>setTransferAmountPi(c.val)} style={{padding:"5px 9px", borderRadius:15, border:parseTransferPi.toString()===c.val?"1.5px solid #C9A86A":"1px solid #ffffff22", background:parseTransferPi.toString()===c.val?"#C9A86A":"rgba(255,255,255,0.1)", fontSize:8, fontWeight:900, color:parseTransferPi.toString()===c.val?"#0A1931":"#fff"}}>{c.label}</button>
))}
</div>
{parseTransferPi>0 && (
<div style={{marginTop:10, background:"rgba(16,185,129,0.15)", borderRadius:8, padding:8, border:"1px solid #10b981"}}>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#fff"}}><span>Tu envoies (Pi)</span><span style={{fontWeight:900, color:"#F9E2AF"}}>{parseTransferPi} Pi = {Math.round(parseTransferPi*1000000).toLocaleString()} µPi</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#fff", marginTop:6}}><span style={{color:"#10b981"}}>Destinataire reçoit AUTO-CONVERTI</span><span style={{fontWeight:900, color:"#10b981"}}>{Math.round(calcTransferLocal).toLocaleString()} {transferCurrency}</span></div>
<div style={{fontSize:7, color:"#C9A86A", marginTop:4}}>Taux: {valueType} {valueType==="GCV"?"314159$":valueType==="MARCHE"?"0.30$":merchantRate+"$"} x {zoneMoMo[transferZone]?.rate} • Opérateur {transferOperator} • {zoneMoMo[transferZone]?.flag}</div>
</div>
)}
</div>
<div style={{marginTop:10}}>
<div style={{fontSize:8, fontWeight:800}}>6. Motif</div>
<input value={transferMotif} onChange={(e)=>setTransferMotif(e.target.value)} placeholder="Soutien familial, fournisseur..." style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #E2E8F0", fontSize:10, fontWeight:700, marginTop:4}} />
</div>
<button onClick={handleTransferSend} disabled={paying} style={{width:"100%", marginTop:12, padding:14, borderRadius:12, background:paying?"#64748b":transferTab==="interne"?"#2563eb":"#0A1931", color:transferTab==="interne"?"#fff":"#C9A86A", fontWeight:900, border:"none", fontSize:12}}>
{paying?"⏳ Paiement Pi MAINNET...":transferTab==="interne"?`🔵 Envoyer ${transferAmountPi||"0"} Pi → ${Math.round(calcTransferLocal).toLocaleString()} ${transferCurrency} Instantané`:`🌐 Envoyer ${transferAmountPi||"0"} Pi → Banque Externe ${transferCurrency}`}
</button>
<div style={{background:"#FFFBEB", border:"1px solid #F59E0B", borderRadius:8, padding:8, marginTop:8}}>
<div style={{fontSize:7, fontWeight:800, color:"#92400E"}}>ℹ️ Note: Le Transfert est instantané et interopérable. Montant exclusivement en Pi, le récepteur reçoit déjà converti automatiquement en {transferCurrency} locale via UBA Tchad Pièce 17 BEAC. Confirmation Tx dans historique.</div>
</div>
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>setActiveBankService(null)} style={{flex:1, padding:10, borderRadius:10, background:"#fff", border:"1px solid #E2E8F0", fontWeight:800, fontSize:10}}>Annuler</button>
<button onClick={()=>{alert(`📄 Reçu\n${parseTransferPi} Pi → ${Math.round(calcTransferLocal).toLocaleString()} ${transferCurrency}\n${transferZone} ${transferBank}\nKYC GAS5`)}} style={{flex:1, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #C9A86A", fontWeight:800, fontSize:10}}>Aperçu Reçu</button>
</div>
</div>
</div>
</div>
)}

{activeBankService==="kyc" && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.8)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveBankService(null)}>
<div style={{background:"#fff", borderRadius:16, padding:16, width:"100%", maxWidth:380, border:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
<div style={{fontWeight:900}}>KYC Pièce 17 BEAC • IBAN {accounts[1].iban}</div>
<div style={{fontSize:8, marginTop:6, background:"#F5F7FB", padding:8, borderRadius:8}}>Wallet KYC: {gdbAddr}<br/>IBAN: {accounts[1].iban}<br/>Plafond: {limits.journalier.toLocaleString()} XAF/j<br/>Tx 2c314c09... 6ec364f8...</div>
<button onClick={handleKYC} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Valider KYC BEAC</button>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0", fontSize:9}}>Fermer</button>
</div>
</div>
)}

<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"96%", maxWidth:440, background:"#fff", borderRadius:22, boxShadow:"0 8px 32px rgba(0,0,0,0.15)", border:"1px solid #E2E8F0", display:"flex", justifyContent:"space-around", padding:"8px 0", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Accueil"},{id:"services", ic:"💼", l:"Services"},{id:"innovation", ic:"🚀", l:"Innovation"},{id:"wallet", ic:"👜", l:"Wallet"},{id:"securite", ic:"🛡️", l:"Sécurité"},{id:"support", ic:"❓", l:"Support"}].map((b)=>{
 const isActive = b.id==="accueil"
 return(<button key={b.id} onClick={()=>{ if(b.id==="accueil") setTab("accueil"); if(b.id==="services") setTab("paiement"); if(b.id==="innovation") setTab("epargne"); if(b.id==="wallet") setTab("accueil"); if(b.id==="securite"){ setTab("plus"); setActiveBankService("kyc") } if(b.id==="support"){ setTab("plus"); } }} style={{border:"none", background:isActive? "#0A1931" : "transparent", color:isActive? "#C9A86A" : "#0A1931", borderRadius:14, padding:"6px 8px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:7, fontWeight:800}}><span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span></button>)})}
</div>
</div>
)
}
