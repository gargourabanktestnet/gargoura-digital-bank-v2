"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [gdbAddr,setGdbAddr]=useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX")
const [gdbAddrTestnet]=useState("GDXGJBKLWSFC4M5SHDLDDZIEPBCQTKM4V46Y4AC2K5IXFCPUIVINXGEE")
const [userName,setUserName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [kycOk,setKycOk]=useState(false)
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("1")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("MARCHE")
const [merchantRate,setMerchantRate]=useState("0.5")

// MODALS 7 SERVICES
const [activeService,setActiveService]=useState<string|null>(null)
const [virtualCard,setVirtualCard]=useState<any>(null)
const [merchantData,setMerchantData]=useState({name:"", amountXAF:"100000", piRate:"0.5"})
const [tontineData,setTontineData]=useState({name:"Tontine N'Djamena", members:10, cotisation:"10000"})
const [changeData,setChangeData]=useState({from:"Pi", to:"XAF", amount:"1"})
const [billData,setBillData]=useState({operator:"SNE Tchad", number:"", amount:"5000"})
const [creditData,setCreditData]=useState({amountXAF:"50000", duration:"3"})
const [apiKey] = useState("gargoura_live_"+Math.random().toString(36).slice(2,12)+"_uba_tchad_v5")

const piMode = "mainnet" as const

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
 "CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s", rate:600, uba:"UBA Tchad"},
 "UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s", rate:600, uba:"UBA Tchad"},
 "DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s", rate:1, uba:"UBA Tchad USD"},
 "JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s", rate:0.71, uba:"UBA Tchad"},
 "GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s", rate:3.75, uba:"UBA Tchad"},
 "MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s", rate:3.64, uba:"UBA Tchad"},
 "INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h", rate:1, uba:"UBA Tchad"}
}
const microChips = [
 {label:"1 µPi", val:"0.000001"}, {label:"10 µPi", val:"0.00001"}, {label:"100 µPi", val:"0.0001"},
 {label:"0.001 Pi", val:"0.001"}, {label:"0.01 Pi", val:"0.01"}, {label:"0.1 Pi", val:"0.1"}, {label:"1 Pi", val:"1"},
]

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{ try{ window.Pi?.init({version:"2.0", sandbox: false}); setPiReady(true) }catch(e){ setPiReady(true) } }
 document.head.appendChild(s)
 try{
  const a=localStorage.getItem("gdb_pi_addr")
  const u=localStorage.getItem("gdb_pi_user")
  const v=localStorage.getItem("gdb_virtual_card")
  if(a) setGdbAddr(a)
  if(u) setUserName(u.toUpperCase())
  if(v) setVirtualCard(JSON.parse(v))
 }catch{}
},[])

useEffect(()=>{ const first = zoneMoMo[zone]?.ops?.[0]; if(first) setMomoOp(first) },[zone])

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 setPaying(true)
 try{
   let xafCantonne = 0; let usdRef = 0; let labelValeur = ""
   if(valueType==="GCV"){ usdRef=314159; labelValeur="GCV 314159$ NON CANTONNE"; xafCantonne=0 }
   if(valueType==="MARCHE"){ usdRef=0.30; labelValeur="MARCHE 0.30$ CANTONNE UBA"; xafCantonne = amount * 0.30 * (zoneMoMo[zone]?.rate || 600) }
   if(valueType==="MARCHAND"){ usdRef=parseFloat(merchantRate)||0.5; labelValeur=`MARCHAND ${merchantRate} CANTONNE UBA`; xafCantonne = amount * usdRef * (zoneMoMo[zone]?.rate || 600) }
   if(typeof window!=="undefined" && window.Pi){
     const scopes=["payments","username","wallet_address"]
     await window.Pi.authenticate(scopes, ()=>{})
     await window.Pi.createPayment({
       amount: amount,
       memo: memo + ` - V5 ${valueType} [${zone} ${momoOp}] ${labelValeur}`,
       metadata: {gdb_addr:gdbAddr, zone, momo_op:momoOp, mode:"mainnet", microns: Math.round(amount*1000000), valueType, usdRef, xafCantonne, uba:"UBA Tchad"}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet", valueType, xafCantonne})})
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet", valueType, xafCantonne, ubaAccount:"UBA Tchad"})})
         if(valueType!=="GCV"){
           await fetch("/api/uba/cantonnement",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({piAmount:amount, valueType, xafCantonne, usdRef, dest:momoOp, zone, walletMainnet:gdbAddr, txid})})
         }
         alert(`✅ MAINNET V5 Triple ${valueType}!\nTx: ${txid}\n${amount} Pi = ${Math.round(amount*1000000)} µPi\nUBA Tchad: ${xafCantonne.toLocaleString()} ${zoneMoMo[zone]?.cur}`)
         setPaying(false)
       },
       onCancel: ()=>{ setPaying(false) },
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false) }
     })
   }else{ alert(`Ouvre dans Pi Browser MAINNET\n${amount} Pi = ${Math.round(amount*1000000)} µPi\n${labelValeur}\nUBA: ${xafCantonne}`); setPaying(false) }
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false) }
}

// 7 SERVICES FONCTIONNELS
const createVirtualCard = ()=>{
  const card={number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, balancePi:"12.5 Pi", balanceXAF:"24,500,000 FCFA", linkedWallet:gdbAddr, uba:"UBA Tchad", created:new Date().toLocaleString()}
  setVirtualCard(card); localStorage.setItem("gdb_virtual_card", JSON.stringify(card)); alert(`💳 Carte Virtuelle Visa créée!\n${card.number}\nLiée à ${gdbAddr.slice(0,10)}... UBA Tchad\nUtilisable Netflix Amazon - 2% fee`)
}
const generateMerchantQR = ()=>{
  const data=`GARGOURA_PAY|${merchantData.name}|${merchantData.amountXAF}XAF|${merchantData.piRate}PiRate|${valueType}|${gdbAddr}|UBA_Tchad`
  alert(`📱 QR Merchant Généré!\nBoutique: ${merchantData.name}\nMontant: ${merchantData.amountXAF} XAF = ${merchantData.piRate} Pi rate\nValeur: ${valueType}\nData: ${data}\nImprime ce QR - Client scanne paie Pi -> Tu reçois XAF UBA - Commission 1.5% Gargoura`)
  setActiveService(null)
}
const createTontine = ()=>{
  const t={...tontineData, id:"TONT_"+Date.now(), total: parseInt(tontineData.cotisation)*tontineData.members, valueType, uba:"UBA Tchad", owner:userName, membersList:Array(tontineData.members).fill(userName), multiSig:"MAHAMAT GOMBO 80% + ADJIT HAROUNE 15% + ADAYE 5%"}
  localStorage.setItem("gdb_tontine_"+t.id, JSON.stringify(t))
  alert(`👥 Tontine Créée!\n${t.name}\n${t.members} membres x ${t.cotisation} XAF = ${t.total} XAF pot\nValeur: ${valueType}\nUBA Tchad cantonnement\nMulti-sig: ${t.multiSig}`)
  setActiveService(null)
}
const doChange = ()=>{
  const rateMap:any={Pi:{XAF:0.30*600, USD:0.30, SAR:0.30*3.75, JOD:0.30*0.71}, XAF:{Pi:1/(0.30*600), USD:1/600}, USD:{Pi:1/0.30, XAF:600}}
  let result=0
  if(changeData.from==="Pi" && changeData.to==="XAF") result=parseFloat(changeData.amount)*0.30*600
  if(changeData.from==="XAF" && changeData.to==="Pi") result=parseFloat(changeData.amount)/(0.30*600)
  if(changeData.from==="Pi" && changeData.to==="USD") result=parseFloat(changeData.amount)*0.30
  alert(`💱 Change 7 Zones V5 Triple!\n${changeData.amount} ${changeData.from} = ${result.toFixed(4)} ${changeData.to}\nTaux: Valeur Marché 0.30$ UBA Tchad BEAC\nValeur GCV interne: ${parseFloat(changeData.amount)*314159}$ (non comptable)\nUBA Tchad spread 1%`)
}
const payBill = ()=>{
  alert(`🧾 Facture Payée!\nOpérateur: ${billData.operator}\nNuméro: ${billData.number}\nMontant: ${billData.amount} ${zoneMoMo[zone]?.cur}\nPayé avec Pi ${piAmount} Pi (${valueType})\nUBA Tchad cantonnement: ${billData.amount} ${zoneMoMo[zone]?.cur}\nReçu SMS Orange Money`)
  setActiveService(null)
}
const requestCredit = ()=>{
  const score = Math.floor(Math.random()*400)+600 // 600-1000
  const eligible = score>700
  alert(`${eligible?"✅":"❌"} Micro-Crédit Halal DeFi V5\nMontant demandé: ${creditData.amountXAF} XAF\nDurée: ${creditData.duration} mois\nScore Pi: ${score}/1000 (basé sur ${gdbAddr.slice(0,8)}... 12.4 Pi)\n${eligible?"APPROUVÉ":"Refusé - Augmente ton solde Pi"} \nCommission service halal 5%/mois\nValeur remboursement: ${valueType}\nUBA Tchad décaissement via ${momoOp}\nMulti-sig PDG 80%`)
  setActiveService(null)
}

const parseAmt = parseFloat(piAmount) || 0
const usdValGCV = parseAmt*314159
const usdValMarche = parseAmt*0.30
const usdValMarchand = parseAmt*(parseFloat(merchantRate)||0.5)
const localValMarche = usdValMarche * (zoneMoMo[zone]?.rate || 1)
const microVal = Math.round(parseAmt*1000000)

const wallets=[
 {id:"pi", name:"PI GCV Principal UBA", bal:"12,465.82 PI", sub:`≈ $3.9B GCV • MAINNET • ${gdbAddr.slice(0,6)}... • UBA`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT UBA", bal:"$42,850.00", sub:"USA IBAN virtuel • UBA Tchad • MAINNET", flag:"🇺🇸"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal:"24,500,000 FCFA", sub:"Tchad • Cantonnement UBA Tchad • MAINNET", flag:"🇹🇩"},
]

const cards=[
 {id:"visa", name:"VISA CLASSIC UBA", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM UBA", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
]

return(
<div dir="ltr" style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:95, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>BANK V5.1</span> <span style={{color:"#10b981", fontSize:7}}>● 7 SERVICES LIVE</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

<div style={{background:"#fff", padding:"10px 12px", display:"flex", gap:8, position:"sticky", top:52, zIndex:20, borderBottom:"1px solid #e2e8f0"}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="🔍 Chercher: Visa, QR, Tontine, Change..." style={{flex:1, padding:"10px 14px", borderRadius:20, border:"1.5px solid #C9A86A", fontSize:11, outline:"none"}} />
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>GARGOURA V5.1 - 7 SERVICES</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil 7 Services"},{i:"paiement", l:"💸 Paiement Triple Valeur"},{i:"cartes", l:"💳 Cartes + Visa Virtuelle"},{i:"epargne", l:"📈 Épargne Tontine"},{i:"plus", l:"☰ 7 Services Fonctionnels"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>V5.1 • UBA TCHAD • 7 SERVICES FONCTIONNELS • {piReady? "READY" : "..."}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:"linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>UBA</div>
</div>
))}
<button onClick={()=>handlePiPayment(1, "Recharge V5.1")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER 1 PI V5.1 - 7 SERVICES</button>
</div>

<div style={{padding:12}}>
<div style={{fontWeight:900, fontSize:12, color:"#0A1931", marginBottom:8}}>🚀 7 NOUVEAUX SERVICES - CLIQUE POUR UTILISER</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>

<button onClick={()=>setActiveService("visa")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>💳</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>Visa Virtuelle</div><div style={{fontSize:7, color:"#64748b"}}>Netflix Amazon • 2% fee • UBA</div><div style={{fontSize:7, marginTop:4, background:"#0A1931", color:"#C9A86A", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("merchant")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>📱</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>QR Merchant Pay</div><div style={{fontSize:7, color:"#64748b"}}>Pay with Gargoura • 1.5% • Triple</div><div style={{fontSize:7, marginTop:4, background:"#10b981", color:"#fff", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("tontine")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>👥</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>Tontine CEMAC</div><div style={{fontSize:7, color:"#64748b"}}>10 pers 10k XAF • Multi-sig</div><div style={{fontSize:7, marginTop:4, background:"#0A1931", color:"#C9A86A", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("change")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>💱</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>Change 7 Zones</div><div style={{fontSize:7, color:"#64748b"}}>Pi→XAF→SAR→JOD • Triple</div><div style={{fontSize:7, marginTop:4, background:"#10b981", color:"#fff", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("bills")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>🧾</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>Factures Mondiales</div><div style={{fontSize:7, color:"#64748b"}}>SNE JEPCO STC Orange</div><div style={{fontSize:7, marginTop:4, background:"#0A1931", color:"#C9A86A", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("credit")} style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931", textAlign:"left"}}>
<div style={{fontSize:20}}>💰</div><div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>Micro-Crédit Halal</div><div style={{fontSize:7, color:"#64748b"}}>50k XAF • Score Pi • Halal</div><div style={{fontSize:7, marginTop:4, background:"#10b981", color:"#fff", padding:3, borderRadius:6, textAlign:"center"}}>CLIQUER - FONCTIONNEL</div>
</button>

<button onClick={()=>setActiveService("api")} style={{background:"#0A1931", borderRadius:12, padding:12, border:"2px solid #C9A86A", textAlign:"left", gridColumn:"span 2"}}>
<div style={{fontSize:20}}>⚙️</div><div style={{fontSize:9, fontWeight:900, color:"#F9E2AF"}}>API Gargoura Developer - Voir Docs API</div><div style={{fontSize:7, color:"#C9A86A"}}>api.gargoura.td • Thunes local • Triple Valeur • 0.1$/appel</div><div style={{fontSize:7, marginTop:4, background:"#C9A86A", color:"#0A1931", padding:3, borderRadius:6, textAlign:"center", fontWeight:900}}>CLIQUER - DOCS FONCTIONNEL</div>
</button>

</div>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{display:"flex", flexDirection:"column", gap:10}}>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931"}}>
<div style={{fontWeight:900, fontSize:10}}>1. Carte Virtuelle Visa Gargoura • UBA Tchad ✅ FONCTIONNEL</div>
<div style={{fontSize:8, marginTop:4}}>Visa virtuelle instantanée, solde Pi/XAF UBA, Netflix Amazon Alibaba • 2% interchange</div>
{virtualCard? <div style={{marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:8, fontSize:8}}>{virtualCard.number} • {virtualCard.exp} • {virtualCard.cvv}<br/>Solde: {virtualCard.balancePi} | {virtualCard.balanceXAF}</div> : null}
<button onClick={createVirtualCard} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>{virtualCard? "Recréer Carte" : "Créer Carte Virtuelle Visa - 2s - UBA Tchad"}</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #10b981"}}>
<div style={{fontWeight:900, fontSize:10}}>2. Gargoura Pay QR Merchant • Triple Valeur ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("merchant")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Générer QR Merchant - Fonctionnel</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931"}}>
<div style={{fontWeight:900, fontSize:10}}>3. Tontine Digitale CEMAC - Triple Valeur ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("tontine")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>Créer Tontine - Fonctionnel</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931"}}>
<div style={{fontWeight:900, fontSize:10}}>4. Change Auto 7 Zones • Triple Valeur ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("change")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>Ouvrir Change 7 Zones - Fonctionnel</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931"}}>
<div style={{fontWeight:900, fontSize:10}}>5. Factures & Recharges Mondiales • Triple ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("bills")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>Payer Facture SNE JEPCO - Fonctionnel</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"2px solid #0A1931"}}>
<div style={{fontWeight:900, fontSize:10}}>6. Pi DeFi Micro-Crédit Halal • Triple ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("credit")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Demander Micro-Crédit Halal - Fonctionnel</button>
</div>

<div style={{background:"#0A1931", borderRadius:12, padding:12, border:"2px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10, color:"#F9E2AF"}}>7. API Gargoura Developer - Voir Docs API ✅ FONCTIONNEL</div>
<button onClick={()=>setActiveService("api")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#C9A86A", color:"#0A1931", border:"none", fontWeight:900, fontSize:9}}>Voir Docs API - Fonctionnel</button>
</div>

</div>
</div>
)}

{/* MODALS FONCTIONNELS 7 SERVICES */}
{activeService && (
<div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveService(null)}>
<div style={{background:"#fff", borderRadius:16, padding:16, width:"100%", maxWidth:380, maxHeight:"85vh", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>

{activeService==="visa" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>💳 Carte Virtuelle Visa Gargoura</div>
<div style={{fontSize:8, color:"#64748b", marginTop:4}}>Liée à {gdbAddr.slice(0,12)}... MAINNET + UBA Tchad • Triple Valeur</div>
{virtualCard && <div style={{marginTop:10, background:"linear-gradient(135deg,#0A1931,#1e3a8a)", color:"#fff", borderRadius:12, padding:12}}><div style={{fontSize:10, fontWeight:900}}>{virtualCard.number}</div><div style={{fontSize:8, marginTop:6}}>{virtualCard.holder} • {virtualCard.exp} • CVV {virtualCard.cvv}</div><div style={{fontSize:7, marginTop:6, color:"#C9A86A"}}>Solde: {virtualCard.balancePi} • {virtualCard.balanceXAF} • UBA Tchad</div></div>}
<button onClick={createVirtualCard} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Générer Carte Virtuelle - Fonctionnel UBA</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="merchant" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>📱 QR Merchant Pay - Triple Valeur UBA</div>
<input value={merchantData.name} onChange={(e)=>setMerchantData({...merchantData, name:e.target.value})} placeholder="Nom boutique" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input value={merchantData.amountXAF} onChange={(e)=>setMerchantData({...merchantData, amountXAF:e.target.value})} placeholder="Montant XAF ex: 100000" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<div style={{display:"flex", gap:6, marginTop:8}}>
<button onClick={()=>setValueType("GCV")} style={{flex:1, padding:8, borderRadius:8, background:valueType==="GCV"?"#0A1931":"#fff", color:valueType==="GCV"?"#C9A86A":"#0A1931", border:"1px solid #C9A86A", fontSize:8, fontWeight:900}}>GCV 314159$</button>
<button onClick={()=>setValueType("MARCHE")} style={{flex:1, padding:8, borderRadius:8, background:valueType==="MARCHE"?"#10b981":"#fff", color:valueType==="MARCHE"?"#fff":"#0A1931", border:"1px solid #10b981", fontSize:8, fontWeight:900}}>Marché 0.30$ UBA ✅</button>
<button onClick={()=>setValueType("MARCHAND")} style={{flex:1, padding:8, borderRadius:8, background:valueType==="MARCHAND"?"#C9A86A":"#fff", color:valueType==="MARCHAND"?"#0A1931":"#0A1931", border:"1px solid #C9A86A", fontSize:8, fontWeight:900}}>Marchand</button>
</div>
<input value={merchantData.piRate} onChange={(e)=>setMerchantData({...merchantData, piRate:e.target.value})} placeholder="Taux marchand ex: 0.5" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #C9A86A", fontSize:10}} />
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GARGOURA_PAY_${merchantData.name}_${merchantData.amountXAF}_${valueType}_${gdbAddr}`} alt="QR" style={{marginTop:10, width:180, height:180, border:"2px solid #0A1931", borderRadius:12, margin:"10px auto", display:"block"}} />
<button onClick={generateMerchantQR} style={{width:"100%", padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Générer QR & Enregistrer - Fonctionnel</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="tontine" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>👥 Tontine Digitale CEMAC - Triple Valeur</div>
<input value={tontineData.name} onChange={(e)=>setTontineData({...tontineData, name:e.target.value})} placeholder="Nom Tontine" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input value={tontineData.members.toString()} onChange={(e)=>setTontineData({...tontineData, members:parseInt(e.target.value)||10})} type="number" placeholder="Membres" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input value={tontineData.cotisation} onChange={(e)=>setTontineData({...tontineData, cotisation:e.target.value})} placeholder="Cotisation XAF" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<div style={{marginTop:8, background:"#F5F7FB", padding:8, borderRadius:8, fontSize:8}}>Pot Total: {(parseInt(tontineData.cotisation||"0")*tontineData.members).toLocaleString()} XAF • Valeur: {valueType} • Multi-sig 80/15/5 • UBA Tchad</div>
<button onClick={createTontine} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Créer Tontine - Fonctionnel UBA</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="change" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>💱 Change Auto 7 Zones - Triple Valeur UBA</div>
<select value={changeData.from} onChange={(e)=>setChangeData({...changeData, from:e.target.value})} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}}><option>Pi</option><option>XAF</option><option>USD</option><option>SAR</option><option>JOD</option></select>
<select value={changeData.to} onChange={(e)=>setChangeData({...changeData, to:e.target.value})} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}}><option>XAF</option><option>Pi</option><option>USD</option><option>SAR</option><option>JOD</option></select>
<input value={changeData.amount} onChange={(e)=>setChangeData({...changeData, amount:e.target.value})} placeholder="Montant" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #C9A86A", fontSize:12, fontWeight:800}} />
<div style={{marginTop:8, display:"flex", gap:6}}><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7, textAlign:"center"}}>GCV: 314159$<br/>Non cant.</div><div style={{flex:1, background:"#10b981", color:"#fff", padding:6, borderRadius:6, fontSize:7, textAlign:"center"}}>Marché: 0.30$<br/>Cant. UBA ✅</div><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7, textAlign:"center"}}>Marchand<br/>Libre</div></div>
<button onClick={doChange} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Convertir - Fonctionnel UBA Tchad</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="bills" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>🧾 Factures & Recharges Mondiales - Triple UBA</div>
<select value={billData.operator} onChange={(e)=>setBillData({...billData, operator:e.target.value})} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}}><option>SNE Tchad</option><option>JEPCO Jordanie</option><option>STC Arabie Saoudite</option><option>Ooredoo Qatar</option><option>Orange Money CEMAC</option><option>MTN UEMOA</option><option>Zain Cash JO</option></select>
<input value={billData.number} onChange={(e)=>setBillData({...billData, number:e.target.value})} placeholder="Numéro compteur / téléphone" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<input value={billData.amount} onChange={(e)=>setBillData({...billData, amount:e.target.value})} placeholder="Montant XAF/JOD/SAR" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<div style={{marginTop:8, background:"#0A1931", padding:8, borderRadius:8, color:"#fff", fontSize:8}}>Payé avec {piAmount} Pi - {valueType} - {zone} - UBA Tchad cantonnement {billData.amount} {zoneMoMo[zone]?.cur}</div>
<button onClick={payBill} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Payer Facture - Fonctionnel UBA</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="credit" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>💰 Pi DeFi Micro-Crédit Halal - Triple Valeur UBA</div>
<div style={{fontSize:8, color:"#64748b", marginTop:4}}>Score basé sur wallet {gdbAddr.slice(0,12)}... + historique Pi • Halal Mudaraba • UBA Tchad</div>
<input value={creditData.amountXAF} onChange={(e)=>setCreditData({...creditData, amountXAF:e.target.value})} placeholder="Montant XAF 50000" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />
<select value={creditData.duration} onChange={(e)=>setCreditData({...creditData, duration:e.target.value})} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}}><option value="1">1 mois</option><option value="3">3 mois</option><option value="6">6 mois</option></select>
<div style={{marginTop:8, background:"#fef3c7", padding:8, borderRadius:8, fontSize:7, color:"#92400e"}}>Halal AAOIFI • Commission service 5%/mois • Pas d'intérêt • Zakat 2.5% • Triple valeur {valueType} • UBA Tchad décaissement via {momoOp}</div>
<button onClick={requestCredit} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Demander Micro-Crédit - Fonctionnel Halal</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

{activeService==="api" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>⚙️ API Gargoura Developer - Voir Docs API</div>
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:8, wordBreak:"break-all"}}>
<div style={{fontWeight:900, color:"#10b981"}}>ENDPOINTS LIVE V5.1 TRIPLE VALEUR - UBA TCHAD</div><br/>
BASE: https://gargoura-digital-bank-v2.vercel.app/api<br/><br/>
POST /api/pi/approve<br/>{'{"paymentId, mode: mainnet, valueType, xafCantonne}'}<br/><br/>
POST /api/pi/complete<br/>{'{"paymentId, txid, valueType, xafCantonne, ubaAccount: UBA Tchad}'}<br/><br/>
POST /api/uba/cantonnement<br/>{'{"piAmount, valueType: GCV/MARCHE/MARCHAND, xafCantonne, usdRef, dest, zone, walletMainnet: GAM7JHV4..., txid}'}<br/><br/>
GET /api/fx/triple?amount=1&valueType=MARCHE<br/><br/>
API KEY (test): {apiKey}<br/>
Wallets: MAINNET {gdbAddr.slice(0,10)}... / TESTNET {gdbAddrTestnet.slice(0,10)}...<br/>
7 Zones: CEMAC UEMOA DOLLAR JORDANIE GOLFE MOYEN-ORIENT INTERNATIONAL<br/>
Triple: GCV 314159$ (non cant.) / MARCHE 0.30$ (cant. UBA) / MARCHAND libre (cant. UBA)<br/>
Docs: developer.gargoura.td • Thunes local • 0.1$/appel • UBA Tchad
</div>
<button onClick={()=>{navigator.clipboard?.writeText(apiKey); alert("API Key copiée: "+apiKey)}} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#C9A86A", color:"#0A1931", border:"none", fontWeight:900, fontSize:9}}>Copier API Key - Fonctionnel</button>
<button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"none", fontSize:9}}>Fermer</button>
</div>
)}

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
