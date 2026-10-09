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

// TRANSFERT STATES
const [transferTab,setTransferTab]=useState<"interne"|"externe">("interne")
const [transferZone,setTransferZone]=useState("CEMAC")
const [transferCountry,setTransferCountry]=useState("Tchad BEAC")
const [transferBank,setTransferBank]=useState("UBA Tchad")
const [transferAccount,setTransferAccount]=useState("")
const [transferPhone,setTransferPhone]=useState("")
const [transferOperator,setTransferOperator]=useState("Orange Money")
const [transferAmount,setTransferAmount]=useState("")
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
 else if(f.action==="blockchain"){ alert(`⛓️ Blockchain\nKYC: ${gdbAddr}\nBANQUE: ${gdbAddrBankFuture}\nTx 2c314c09... 6ec364f8...`) }
 else if(f.action==="gestion"){ generateRelevePDF() }
 else setTab("accueil")
}

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 if(typeof window!=="undefined"){
  const kyc=localStorage.getItem("gdb_kyc_verified")
  if(kyc!=="true" &&!kycOk){ alert("⚠️ KYC requis"); setTab("plus"); setActiveBankService("kyc"); return }
 }
 setPaying(true)
 try{
   let xafCantonne=amount*0.30*(zoneMoMo[zone]?.rate||600)
   if(typeof window!=="undefined" && (window as any).Pi){
     await (window as any).Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await (window as any).Pi.createPayment({amount, memo: memo+` - V5.0.5 ${valueType} [${zone} ${momoOp}] KYC GAS5`, metadata:{gdb_addr:gdbAddr, zone, momo_op:momoOp, mode:"mainnet", microns:Math.round(amount*1000000)}},{
       onReadyForServerApproval: async (paymentId:string)=>{ try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId})}) }catch{} },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         const newTx={id:txid, txid, paymentId, amount, microns:Math.round(amount*1000000), zone, momoOp, status:"confirmé BEAC", date:new Date().toISOString(), wallet:gdbAddr}
         const updated=[newTx,...txHistory].slice(0,100)
         setTxHistory(updated)
         try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)) }catch{}
         alert(`✅ Paiement V5.0.5!\nTx: ${txid}`); setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
     })
   }else{ alert(`Ouvre Pi Browser MAINNET`); setPaying(false)}
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false)}
}

const handleTransferSend = ()=>{
 if(!transferAmount || parseFloat(transferAmount)<=0){ alert("Montant invalide"); return }
 if(transferTab==="interne" &&!transferAccount &&!transferPhone){ alert("IBAN / Adresse Pi / Téléphone requis"); return }
 if(transferTab==="externe" &&!transferAccount){ alert("Numéro de compte bancaire requis"); return }
 const newTx={
  id:"TRF_"+Date.now(),
  txid:"TRF_"+Date.now(),
  amount:parseFloat(transferAmount),
  type: transferTab==="interne"? "P2P INTERNE":"P2P EXTERNE",
  zone: transferZone,
  country: transferCountry,
  bank: transferBank,
  account: transferAccount,
  phone: transferPhone,
  operator: transferOperator,
  currency: transferCurrency,
  motif: transferMotif,
  status:"confirmé BEAC - instantané interopérable",
  date:new Date().toISOString(),
  wallet:gdbAddr,
  uba:"UBA Tchad Pièce 17"
 }
 const updated=[newTx,...txHistory].slice(0,100)
 setTxHistory(updated)
 try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updated)); localStorage.setItem("gdb_last_tx", JSON.stringify(newTx)) }catch{}
 alert(`✅ ${transferTab==="interne"?"TRANSFERT P2P INTERNE":"TRANSFERT VERS BANQUE EXTERNE"} RÉUSSI!\n\nZone: ${transferZone} - ${transferCountry}\nBanque: ${transferBank}\n${transferTab==="interne"?`Compte/IBAN/Pi: ${transferAccount||transferPhone}\nOpérateur: ${transferOperator}`:`Compte: ${transferAccount}\nDevise: ${transferCurrency}`}\nMontant: ${transferAmount} ${transferCurrency}\nMotif: ${transferMotif}\n\n⚡ Transfert instantané et interopérable - Confirmé BEAC COBAC\nKYC GAS5...QVK ✅\nTx ${newTx.id}`)
 setActiveBankService(null)
 setTransferAccount(""); setTransferPhone(""); setTransferAmount(""); setTransferMotif("")
}

const handleKYC = ()=>{ setKycDocs({...kycDocs, statut:"verifie"}); setKycOk(true); try{localStorage.setItem("gdb_kyc_verified","true")}catch{}; alert("✅ KYC vérifié!"); setActiveBankService(null) }
const createVirtualCardBank = ()=>{
  const card={id:"VCARD_"+Date.now(), number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, iban:accounts[1].iban, wallet:gdbAddr, status:"active", created:new Date().toISOString()}
  const newCards=[card,...virtualCards]; setVirtualCards(newCards); try{localStorage.setItem("gdb_virtual_cards", JSON.stringify(newCards))}catch{}; alert(`💳 Carte créée!`)
}
const generateRelevePDF = ()=>{
  const totalXAF=txHistory.reduce((s:any,t:any)=>s+(t.xafCantonne||0),0)
  alert(`📄 Relevé BEAC PDF\nTx: ${txHistory.length}\nTotal: ${totalXAF.toLocaleString()} XAF\nIBAN ${accounts[1].iban}`)
}

const parseAmt = parseFloat(piAmount) || 0
const wallets=[
 {id:"pi", name:"PI GCV Principal UBA", bal: hide? "••••" : `${accounts[0].balPi} PI`, sub:`KYC ${gdbAddr.slice(0,6)}...QVK • MAINNET • UBA Pièce 17`, flag:"🟣"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal: hide? "••••" : `${accounts[1].balXAF.toLocaleString()} FCFA`, sub:`Tchad • Cantonnement UBA Tchad • MAINNET • ${accounts[1].iban}`, flag:"🇹🇩"},
]

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:110, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}>
<img src="/logo.png" alt="GDB" width={34} height={34} style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2, objectFit:"contain"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● V5.0.5 KYC {kycOk?"✅":"⚠️"}</span></span>
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
{[{i:"accueil", l:"🏠 Accueil V5.0.5"},{i:"paiement", l:"💸 Paiement Pi 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD"},{i:"epargne", l:"📈 Epargne Tontine"},{i:"plus", l:"☰ Plus"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:"auto", paddingTop:16, borderTop:"1px solid rgba(201,168,106,0.2)"}}>
<div style={{background:"rgba(201,168,106,0.08)", border:"1px solid #C9A86A33", borderRadius:12, padding:12, textAlign:"center"}}>
<img src="/logo.png" alt="GDB" width={44} height={44} style={{width:44, height:44, borderRadius:10, background:"#fff", padding:4, margin:"0 auto 8px", display:"block"}} onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display="none"}} />
<div style={{fontSize:13, fontWeight:900, color:"#C9A86A"}}>V 5.0.3</div>
<div style={{fontSize:8, color:"#F9E2AF", marginTop:4}}>GARGOURA DIGITAL BANK</div>
<div style={{fontSize:6, color:"#9ca3af", marginTop:3}}>UBA Tchad Pièce 17 • BEAC • KYC GAS5...QVK ✅</div>
</div>
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE V5.0.5 • TRANSFERT P2P • {piReady? "READY" : "..."}</span><span style={{color:"#10b981", fontSize:9}}>LIVE UBA</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
</div>
))}
</div>
<div style={{padding:12}}>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
<span style={{fontWeight:900, fontSize:13, color:"#0A1931"}}>Fonctionnalites Courantes • 12</span>
<span style={{fontSize:8, fontWeight:800, color:"#10b981", background:"#10b98122", border:"1px solid #10b981", padding:"4px 10px", borderRadius:20}}>V5.0.5 TRANSFERT ACTIF</span>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10}}>
{currentFeatures.map((f)=>(
<button key={f.id} onClick={()=>handleFeatureClick(f)} style={{background:f.id==="transferer"?"#0A1931":"#fff", border:f.id==="transferer"?"2px solid #C9A86A":"1px solid #E2E8F0", borderRadius:18, padding:"12px 4px", display:"flex", flexDirection:"column", alignItems:"center", gap:8}}>
<div style={{width:48, height:48, borderRadius:14, background:f.id==="transferer"?"#C9A86A":"#0A1931", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>{f.icon}</div>
<span style={{fontSize:9, fontWeight:800, color:f.id==="transferer"?"#C9A86A":"#0A1931"}}>{f.label}</span>
</button>
))}
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement V5.0.5 • 7 Zones</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900}}>{z}</button>
))}</div>
<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="Montant Pi" style={{width:"100%", marginTop:10, padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontWeight:800}} />
<button onClick={()=>handlePiPayment(parseAmt, "Paiement P2P")} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>🟣 Envoyer {parseAmt} PI</button>
</div>
)}
{tab==="cartes" && (<div style={{padding:12}}><button onClick={createVirtualCardBank} style={{width:"100%", padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Créer Carte Virtuelle</button></div>)}
{tab==="epargne" && (<div style={{padding:12}}><div style={{fontWeight:900}}>Epargne Tontine</div></div>)}
{tab==="plus" && (<div style={{padding:12}}><button onClick={()=>setActiveBankService("kyc")} style={{width:"100%", padding:10, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>KYC {kycOk?"✅":"⚠️"}</button></div>)}

{/* TRANSFERT MODAL COMPLET */}
{activeBankService==="transferer" && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.9)", zIndex:100, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:10, overflowY:"auto"}}>
<div style={{background:"#F5F7FB", borderRadius:16, width:"100%", maxWidth:420, border:"2px solid #C9A86A", maxHeight:"96vh", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{background:"#0A1931", padding:14, borderRadius:"14px 14px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:2}}>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="" width={28} height={28} style={{width:28, height:28, borderRadius:6, background:"#fff", padding:2}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:12}}>TRANSFÉRER • 7 ZONES • KYC GAS5...QVK</span></div>
<button onClick={()=>setActiveBankService(null)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"4px 10px", fontWeight:900}}>✕</button>
</div>

<div style={{padding:12}}>
<div style={{display:"flex", gap:6, background:"#fff", padding:4, borderRadius:12, border:"1px solid #E2E8F0"}}>
<button onClick={()=>setTransferTab("interne")} style={{flex:1, padding:10, borderRadius:10, border:"none", background:transferTab==="interne"?"#0A1931":"#F5F7FB", color:transferTab==="interne"?"#C9A86A":"#64748b", fontWeight:900, fontSize:10}}>P2P INTERNE</button>
<button onClick={()=>setTransferTab("externe")} style={{flex:1, padding:10, borderRadius:10, border:"none", background:transferTab==="externe"?"#0A1931":"#F5F7FB", color:transferTab==="externe"?"#C9A86A":"#64748b", fontWeight:900, fontSize:10}}>P2P EXTERNE</button>
</div>

<div style={{marginTop:10}}>
<div style={{fontSize:9, fontWeight:900, color:"#0A1931", marginBottom:6}}>1. CHOISIR ZONE DE TRANSFERT (7 Zones)</div>
<div style={{display:"flex", gap:4, overflowX:"auto", paddingBottom:4}}>
{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setTransferZone(z)} style={{padding:"6px 10px", borderRadius:20, border:"1px solid #C9A86A", background:transferZone===z?"#0A1931":"#fff", color:transferZone===z?"#C9A86A":"#0A1931", fontSize:8, fontWeight:900, whiteSpace:"nowrap"}}>{zoneMoMo[z]?.flag} {z}</button>
))}
</div>
</div>

<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
<div>
<div style={{fontSize:8, fontWeight:800, color:"#0A1931"}}>2. Pays</div>
<select value={transferCountry} onChange={(e)=>setTransferCountry(e.target.value)} style={{width:"100%", padding:10, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:9, fontWeight:700, marginTop:4}}>
{zones[transferZone]?.map((c:string)=><option key={c} value={c}>{c}</option>)}
</select>
</div>
<div>
<div style={{fontSize:8, fontWeight:800, color:"#0A1931"}}>3. Banque Partenaire</div>
<select value={transferBank} onChange={(e)=>setTransferBank(e.target.value)} style={{width:"100%", padding:10, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:9, fontWeight:700, marginTop:4}}>
{zoneMoMo[transferZone]?.banks?.map((b:string)=><option key={b} value={b}>{b}</option>)}
</select>
</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:10, marginTop:10, border:"1px solid #E2E8F0"}}>
<div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>4. Informations Destinataire</div>

{transferTab==="interne" && (
<>
<input value={transferAccount} onChange={(e)=>setTransferAccount(e.target.value)} placeholder="IBAN / Adresse Publique Pi Network GAS5... / Compte Bancaire" style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700, marginTop:8}} />
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<select value={transferOperator} onChange={(e)=>setTransferOperator(e.target.value)} style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}}>
{zoneMoMo[transferZone]?.ops?.map((op:string)=><option key={op} value={op}>{op}</option>)}
</select>
<input value={transferPhone} onChange={(e)=>setTransferPhone(e.target.value)} placeholder="Numéro Tel MoMo si MoMo" style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}} />
</div>
</>
)}

{transferTab==="externe" && (
<>
<input value={transferAccount} onChange={(e)=>setTransferAccount(e.target.value)} placeholder="Numéro de Compte Bancaire IBAN Obligatoire" style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700, marginTop:8}} />
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<select value={transferCurrency} onChange={(e)=>setTransferCurrency(e.target.value)} style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}}>
<option value="XAF">XAF - FCFA</option>
<option value="XOF">XOF - FCFA</option>
<option value="USD">USD - Dollar</option>
<option value="EUR">EUR - Euro</option>
<option value="JOD">JOD - Dinar Jordanien</option>
<option value="SAR">SAR - Riyal Saoudien</option>
<option value="QAR">QAR - Riyal Qatari</option>
<option value="PI">PI - Pi Network</option>
<option value="USDC">USDC - Stellar</option>
</select>
<input value={transferOperator} onChange={(e)=>setTransferOperator(e.target.value)} placeholder="Réseau: SWIFT/SEPA" style={{padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:10, fontWeight:700}} />
</div>
</>
)}
</div>

<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
<div>
<div style={{fontSize:8, fontWeight:800, color:"#0A1931"}}>5. Montant à Envoyer</div>
<input type="number" value={transferAmount} onChange={(e)=>setTransferAmount(e.target.value)} placeholder="Ex: 50000" style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:12, fontWeight:900, marginTop:4}} />
</div>
<div>
<div style={{fontSize:8, fontWeight:800, color:"#0A1931"}}>Devise / Réseau</div>
<div style={{padding:11, borderRadius:8, background:"#0A1931", color:"#C9A86A", fontSize:10, fontWeight:900, marginTop:4, textAlign:"center"}}>{transferCurrency} • {zoneMoMo[transferZone]?.flag} {transferZone}</div>
</div>
</div>

<div style={{marginTop:10}}>
<div style={{fontSize:8, fontWeight:800, color:"#0A1931"}}>6. Motif d'Envoi</div>
<input value={transferMotif} onChange={(e)=>setTransferMotif(e.target.value)} placeholder="Ex: Soutien familial, paiement fournisseur, tontine..." style={{width:"100%", padding:11, borderRadius:8, border:"1.5px solid #E2E8F0", fontSize:10, fontWeight:700, marginTop:4}} />
</div>

<div style={{background:"#0A1931", borderRadius:10, padding:10, marginTop:12, border:"1px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#F9E2AF"}}><span>Frais BEAC</span><span style={{color:"#10b981", fontWeight:900}}>{zoneMoMo[transferZone]?.fee} • {zoneMoMo[transferZone]?.delay}</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#F9E2AF", marginTop:4}}><span>IBAN Source</span><span style={{fontWeight:700}}>{accounts[1].iban.slice(0,18)}...</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, color:"#F9E2AF", marginTop:4}}><span>KYC</span><span style={{fontWeight:700}}>{gdbAddr.slice(0,10)}...QVK ✅</span></div>
</div>

<button onClick={handleTransferSend} style={{width:"100%", marginTop:12, padding:14, borderRadius:12, background:transferTab==="interne"?"#2563eb":"#0A1931", color:transferTab==="interne"?"#fff":"#C9A86A", fontWeight:900, border:"none", fontSize:12}}>
{transferTab==="interne"?"🔵 Envoyer - Transfert Instantané Interopérable":"🌐 Envoyer Vers Banque Externe"}
</button>

<div style={{background:"#FFFBEB", border:"1px solid #F59E0B", borderRadius:8, padding:8, marginTop:8}}>
<div style={{fontSize:7, fontWeight:800, color:"#92400E"}}>ℹ️ Note: Le Transfert est instantané et interopérable. {transferTab==="interne"?"P2P Interne CEMAC/UEMOA via UBA Tchad Pièce 17 BEAC COBAC.":"P2P Externe vers banque partenaire internationale via SWIFT GPI / SEPA / IBAN virtuel."} Confirmation d'envoi disponible dans Historique Tx {txHistory.length}.</div>
</div>

<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>setActiveBankService(null)} style={{flex:1, padding:10, borderRadius:10, background:"#fff", border:"1px solid #E2E8F0", fontWeight:800, fontSize:10}}>Annuler</button>
<button onClick={()=>{alert(`📄 Reçu Transfert\n${transferZone} • ${transferBank}\n${transferAmount} ${transferCurrency}\nKYC GAS5...QVK`)}} style={{flex:1, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #C9A86A", fontWeight:800, fontSize:10}}>Aperçu Reçu</button>
</div>
</div>
</div>
</div>
)}

{activeBankService==="kyc" && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.8)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveBankService(null)}>
<div style={{background:"#fff", borderRadius:16, padding:16, width:"100%", maxWidth:380, border:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
<div style={{fontWeight:900}}>KYC Pièce 17 BEAC</div><button onClick={handleKYC} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", border:"none", fontWeight:900}}>Valider KYC</button><button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0"}}>Fermer</button>
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
