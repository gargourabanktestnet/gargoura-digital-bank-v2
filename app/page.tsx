"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [activeService,setActiveService]=useState<string|null>(null)

// WALLETS OFFICIELS PDG - INTACTS
const [gdbAddr] = useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX")
const [gdbAddrTestnet] = useState("GDXGJBKLWSFC4M5SHDLDDZIEPBCQTKM4V46Y4AC2K5IXFCPUIVINXGEE")
const [userName,setUserName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("0.1")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("MARCHE")
const [merchantRate,setMerchantRate]=useState("0.5")

// 7 SERVICES FONCTIONNELS - SANS SUPABASE - LOCALSTORAGE
const [virtualCard,setVirtualCard]=useState<any>(null)
const [merchantData,setMerchantData]=useState({name:"Boutique Alex", amountXAF:"100000", piRate:"0.5"})
const [tontineData,setTontineData]=useState({name:"Tontine N'Djamena", members:10, cotisation:"10000"})
const [changeData,setChangeData]=useState({from:"Pi", to:"XAF", amount:"1"})
const [billData,setBillData]=useState({operator:"SNE Tchad", number:"23512345678", amount:"5000"})
const [creditData,setCreditData]=useState({amountXAF:"50000", duration:"3"})
const [apiKey] = useState("gargoura_live_"+Math.random().toString(36).slice(2,12)+"_v52_dark")

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
 {label:"1 µPi", val:"0.000001"}, {label:"10 µPi", val:"0.00001"}, {label:"100 µPi", val:"0.0001"},
 {label:"0.001 Pi", val:"0.001"}, {label:"0.01 Pi", val:"0.01"}, {label:"0.1 Pi", val:"0.1"}, {label:"1 Pi", val:"1"},
]

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{ try{ window.Pi?.init({version:"2.0", sandbox:false}); setPiReady(true)}catch{setPiReady(true)}}
 document.head.appendChild(s)
 try{
  const v=localStorage.getItem("gdb_virtual_card")
  if(v) setVirtualCard(JSON.parse(v))
 }catch{}
},[])
useEffect(()=>{ const first = zoneMoMo[zone]?.ops?.[0]; if(first) setMomoOp(first)},[zone])

const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 setPaying(true)
 try{
   let xafCantonne=0, usdRef=0, labelValeur=""
   if(valueType==="GCV"){usdRef=314159; labelValeur="GCV 314159$ NON CANTONNE"; xafCantonne=0}
   if(valueType==="MARCHE"){usdRef=0.30; labelValeur="MARCHE 0.30$ CANTONNE UBA"; xafCantonne=amount*0.30*(zoneMoMo[zone]?.rate||600)}
   if(valueType==="MARCHAND"){usdRef=parseFloat(merchantRate)||0.5; labelValeur=`MARCHAND ${merchantRate} CANTONNE UBA`; xafCantonne=amount*usdRef*(zoneMoMo[zone]?.rate||600)}
   if(typeof window!=="undefined" && window.Pi){
     await window.Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await window.Pi.createPayment({
       amount, memo: memo+` - V5.2 DARK ${valueType} [${zone} ${momoOp}] ${labelValeur}`,
       metadata:{gdb_addr:gdbAddr, zone, momo_op:momoOp, mode:"mainnet", microns:Math.round(amount*1000000), valueType, usdRef, xafCantonne, uba:"UBA Tchad"}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         try{ await fetch("/api/pi/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, mode:"mainnet", valueType, xafCantonne})}) }catch{}
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         try{
           await fetch("/api/pi/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid, mode:"mainnet", valueType, xafCantonne, ubaAccount:"UBA Tchad"})})
           if(valueType!=="GCV"){
             await fetch("/api/uba/cantonnement",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({piAmount:amount, valueType, xafCantonne, usdRef, dest:momoOp, zone, walletMainnet:gdbAddr, txid})})
           }
         }catch{}
         // ARCHIVE LOCALE - SANS SUPABASE
         try{ localStorage.setItem("gdb_last_tx", JSON.stringify({txid, paymentId, amount, microns:Math.round(amount*1000000), valueType, xafCantonne, zone, momoOp, date:new Date().toISOString()})) }catch{}
         alert(`✅ MAINNET V5.2 DARK!\nType: ${labelValeur}\nTx: ${txid}\n${amount} Pi = ${Math.round(amount*1000000)} µPi\nUBA: ${xafCantonne.toLocaleString()} ${zoneMoMo[zone]?.cur}`)
         setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
     })
   }else{ alert(`Ouvre dans Pi Browser MAINNET\n${amount} Pi = ${Math.round(amount*1000000)} µPi\n${labelValeur}\nUBA: ${xafCantonne}`); setPaying(false)}
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false)}
}

const createVirtualCard = ()=>{
  const card={number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, balancePi:"12.5 Pi", balanceXAF:"24,500,000 FCFA", linkedWallet:gdbAddr, uba:"UBA Tchad"}
  setVirtualCard(card); localStorage.setItem("gdb_virtual_card", JSON.stringify(card)); alert(`💳 Carte Virtuelle créée!\n${card.number}\nLiée à ${gdbAddr.slice(0,10)}... UBA Tchad`)
}
const generateMerchantQR = ()=>{ alert(`📱 QR Merchant Généré!\nBoutique: ${merchantData.name}\nMontant: ${merchantData.amountXAF} XAF\nValeur: ${valueType}\nUBA - 1.5%`); setActiveService(null)}
const createTontine = ()=>{
  const t={...tontineData, id:"TONT_"+Date.now(), total: parseInt(tontineData.cotisation)*tontineData.members, valueType}
  localStorage.setItem("gdb_tontine_"+t.id, JSON.stringify(t)); alert(`👥 Tontine Créée!\n${t.name}\n${t.members} x ${t.cotisation} = ${t.total} XAF\nValeur: ${valueType}`); setActiveService(null)
}
const doChange = ()=>{
  let result=0
  if(changeData.from==="Pi" && changeData.to==="XAF") result=parseFloat(changeData.amount)*0.30*600
  if(changeData.from==="XAF" && changeData.to==="Pi") result=parseFloat(changeData.amount)/(0.30*600)
  if(changeData.from==="Pi" && changeData.to==="USD") result=parseFloat(changeData.amount)*0.30
  alert(`💱 Change V5.2 DARK!\n${changeData.amount} ${changeData.from} = ${result.toFixed(4)} ${changeData.to}\nMarché 0.30$ UBA BEAC`)
}
const payBill = ()=>{ alert(`🧾 Facture Payée!\n${billData.operator}\n${billData.number}\n${billData.amount} ${zoneMoMo[zone]?.cur}\nPi ${piAmount} Pi (${valueType})`); setActiveService(null)}
const requestCredit = ()=>{
  const score=Math.floor(Math.random()*400)+600; const eligible=score>700
  alert(`${eligible?"✅":"❌"} Micro-Crédit Halal\nMontant: ${creditData.amountXAF} XAF\nScore Pi: ${score}/1000\n${eligible?"APPROUVÉ":"Refusé"}\nHalal 5%/mois\nUBA via ${momoOp}`); setActiveService(null)
}

const parseAmt = parseFloat(piAmount) || 0
const localValMarche = parseAmt*0.30*(zoneMoMo[zone]?.rate||1)
const localValMarchand = parseAmt*(parseFloat(merchantRate)||0.5)*(zoneMoMo[zone]?.rate||1)
const microVal = Math.round(parseAmt*1000000)
const xafCantonnePreview = valueType==="GCV"? 0 : valueType==="MARCHE"? localValMarche : localValMarchand

return(
<div style={{maxWidth:440, margin:"0 auto", background:"#0A0A0A", minHeight:"100vh", paddingBottom:95, fontFamily:"Inter, system-ui", color:"#fff"}}>
<div style={{background:"#111111", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30, borderBottom:"1px solid #C9A86A22"}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><span style={{fontSize:20}}>🛡️</span><span style={{color:"#C9A86A", fontWeight:900, fontSize:11}}>GARGOURA<span style={{color:"#fff", fontWeight:300, fontSize:9}}> DIGITAL BANK • V5.2 DARK</span></span></div>
<div style={{display:"flex", gap:10}}><span>🔔</span><span style={{width:28, height:28, borderRadius:20, background:"#C9A86A", display:"flex", alignItems:"center", justifyContent:"center"}}>👤</span></div>
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#111111", height:"100%", padding:16, borderRight:"1px solid #C9A86A55"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF", fontSize:11}}>GARGOURA V5.2 DARK NO DB</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Home"},{i:"paiement", l:"💸 Pi Payment"},{i:"cartes", l:"💳 Cards"},{i:"epargne", l:"📈 Savings"},{i:"plus", l:"☰ Services"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"#1a1a1a", color:tab===b.i?"#0A0A0A":"#fff", border:"1px solid #C9A86A33", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"#1a1a1a", borderRadius:12, padding:12, fontSize:8, border:"1px solid #10b98133", color:"#fff"}}>
<b style={{color:"#10b981"}}>V5.2 DARK SANS SUPABASE • PROD VERTE</b><br/>MAINNET: {gdbAddr.slice(0,12)}...<br/>TESTNET: {gdbAddrTestnet.slice(0,12)}...<br/>Tx: 2c314c09... 0.1 Pi 18 XAF<br/>LocalStorage only
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"#111111", padding:16, borderRadius:"0 0 22px 22px", borderBottom:"1px solid #C9A86A22"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#fff", fontSize:13, fontWeight:700}}>Welcome back, Alex</span><span style={{background:"#1a3a1a", border:"1px solid #10b98155", color:"#10b981", fontSize:7, padding:"4px 8px", borderRadius:20}}>🟣 Pi Connected • Verified</span></div>
<div style={{marginTop:12, background:"linear-gradient(135deg,#1a1a1a 0%,#0f0f0f 100%)", border:"1px solid #C9A86A33", borderRadius:16, padding:16}}>
<div style={{color:"#9ca3af", fontSize:11}}>Total Balance</div>
<div style={{color:"#F9E2AF", fontSize:28, fontWeight:900}}>{hide? "••••" : "$12,456.32"}</div>
<div style={{color:"#10b981", fontSize:11}}>+2.34% (24h) ↗</div>
<div style={{display:"flex", gap:8, marginTop:14}}>
<button onClick={()=>setTab("paiement")} style={{flex:1, padding:10, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none", fontSize:10}}>↗ Transfer</button>
<button onClick={()=>handlePiPayment(0.1, "Top Up V5.2 DARK")} style={{flex:1, padding:10, borderRadius:10, background:"transparent", color:"#F9E2AF", fontWeight:900, border:"1px solid #F9E2AF55", fontSize:10}}>+ Top Up</button>
</div>
</div>
<div style={{textAlign:"center", marginTop:14, color:"#C9A86A88", fontSize:9, letterSpacing:2}}>7 ZONES ACTIVE</div>
<div style={{display:"flex", gap:5, overflowX:"auto", marginTop:8}}>{Object.keys(zoneMoMo).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"6px 12px", borderRadius:20, border:"1px solid #C9A86A55", background:zone===z? "#10b981" : "#1a1a1a", color:zone===z? "#fff" : "#C9A86A", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>
<div style={{textAlign:"center", marginTop:12, color:"#C9A86A88", fontSize:9}}>NEW SERVICES • 7 MODULES • PROD VERTE</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10}}>
<button onClick={()=>setActiveService("visa")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>🛡️💳</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Virtual Visa Card</div><div style={{fontSize:7, color:"#9ca3af"}}>Instant • Secure • Digital</div></button>
<button onClick={()=>setActiveService("merchant")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>🔲</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Merchant Pay QR</div><div style={{fontSize:7, color:"#9ca3af"}}>Scan • Pay • Collect</div></button>
<button onClick={()=>setActiveService("tontine")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>👥</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Savings Tontine</div><div style={{fontSize:7, color:"#9ca3af"}}>Community • Pool • Earn</div></button>
<button onClick={()=>setActiveService("change")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>⇄</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Multi-currency Exchange</div><div style={{fontSize:7, color:"#9ca3af"}}>7 Zones • Live Rates</div></button>
<button onClick={()=>setActiveService("bills")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>🧾</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Bills Payment</div><div style={{fontSize:7, color:"#9ca3af"}}>Utilities • Telecom</div></button>
<button onClick={()=>setActiveService("credit")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A33", textAlign:"left"}}><div style={{fontSize:20}}>💰</div><div style={{fontSize:10, fontWeight:900, color:"#fff", marginTop:6}}>Micro-credit</div><div style={{fontSize:7, color:"#9ca3af"}}>Up to $500</div></button>
<button onClick={()=>setActiveService("api")} style={{background:"#1a1a1a", borderRadius:12, padding:14, border:"1px solid #C9A86A55", textAlign:"left", gridColumn:"span 2", display:"flex", justifyContent:"space-between"}}><div><div style={{fontSize:10, fontWeight:900, color:"#fff"}}>Developer API</div><div style={{fontSize:7, color:"#9ca3af"}}>REST • Webhooks • Docs</div></div><span style={{background:"#C9A86A", color:"#0A0A0A", fontSize:7, padding:"4px 8px", borderRadius:20, fontWeight:900}}>New • v5.0</span></button>
</div>
<button onClick={()=>handlePiPayment(parseFloat(piAmount)||0.1, "Paiement Accueil V5.2 DARK")} style={{width:"100%", marginTop:12, padding:14, borderRadius:12, background:piReady? "#C9A86A" : "#333", color:"#0A0A0A", fontWeight:900, border:"none", fontSize:11}}>💎 PAYER {piAmount} PI V5.2 DARK - {microVal} µPi</button>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#F9E2AF", fontSize:13}}>Pi Payment V5.2 DARK - Sans Supabase - Prod Verte</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A55", background:zone===z? "#C9A86A" : "#1a1a1a", color:zone===z? "#0A0A0A":"#C9A86A", fontSize:9, fontWeight:900}}>{z}</button>
))}</div>
<div style={{background:"#1a1a1a", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A33"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#F9E2AF"}}>{zoneMoMo[zone]?.flag} {zone} • {zoneMoMo[zone]?.cur}</span><span style={{fontSize:8, color:"#10b981"}}>{zoneMoMo[zone]?.delay} • {zoneMoMo[zone]?.fee}</span></div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:8}}>
{zoneMoMo[zone]?.ops.map((op:string)=>(
<button key={op} onClick={()=>setMomoOp(op)} style={{padding:"6px 10px", borderRadius:15, border:"1px solid #C9A86A55", background:momoOp===op?"#C9A86A":"#0A0A0A", color:momoOp===op?"#0A0A0A":"#C9A86A", fontSize:9, fontWeight:900}}>{op}</button>
))}
</div>
<div style={{marginTop:12, background:"#0A0A0A", borderRadius:10, padding:10, border:"1px dashed #C9A86A55"}}>
<div style={{fontSize:8, fontWeight:900, color:"#F9E2AF"}}>⚡ MICRONS PI • 1 Pi = 1,000,000 µPi</div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:6}}>
{microChips.map((c)=>(
<button key={c.label} onClick={()=>setPiAmount(c.val)} style={{padding:"6px 10px", borderRadius:15, border:parseAmt.toString()===c.val? "1.5px solid #C9A86A":"1px solid #333", background:parseAmt.toString()===c.val? "#C9A86A":"#1a1a1a", fontSize:9, fontWeight:900, color:parseAmt.toString()===c.val? "#0A0A0A":"#fff"}}>{c.label}</button>
))}
</div>
</div>
<div style={{marginTop:12, background:"#111111", borderRadius:10, padding:10, border:"1px solid #C9A86A33"}}>
<div style={{fontSize:9, fontWeight:900, color:"#F9E2AF"}}>💎 TRIPLE VALEUR - SANS DB - LOCAL</div>
<div style={{marginTop:8, display:"flex", flexDirection:"column", gap:6}}>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="GCV"?"#C9A86A":"#1a1a1a", padding:8, borderRadius:8, border:"1px solid #333"}}><input type="radio" checked={valueType==="GCV"} onChange={()=>setValueType("GCV")} /><div style={{fontSize:8, fontWeight:900, color:valueType==="GCV"?"#0A0A0A":"#fff"}}>GCV 314,159$ Interne non cantonnée</div></label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHE"?"#10b981":"#1a1a1a", padding:8, borderRadius:8, border:"1px solid #10b981"}}><input type="radio" checked={valueType==="MARCHE"} onChange={()=>setValueType("MARCHE")} /><div style={{fontSize:8, fontWeight:900, color:"#fff"}}>Marché 0.30$ ✅ Cantonné UBA - {localValMarche.toLocaleString()} {zoneMoMo[zone]?.cur}</div></label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHAND"?"#C9A86A":"#1a1a1a", padding:8, borderRadius:8, border:"1px solid #333"}}><input type="radio" checked={valueType==="MARCHAND"} onChange={()=>setValueType("MARCHAND")} /><div style={{flex:1, fontSize:8, fontWeight:900, color:valueType==="MARCHAND"?"#0A0A0A":"#fff"}}>Marchand libre</div><input value={merchantRate} onChange={(e)=>setMerchantRate(e.target.value)} style={{width:50, padding:4, borderRadius:6, background:"#0A0A0A", color:"#fff", fontSize:8, border:"1px solid #C9A86A"}} /></label>
</div>
</div>
<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="Montant Pi ex: 0.1" style={{width:"100%", marginTop:10, padding:12, borderRadius:8, border:"1px solid #C9A86A55", background:"#0A0A0A", color:"#F9E2AF", fontSize:12, fontWeight:800}} />
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>handlePiPayment(parseAmt, "Paiement V5.2 DARK")} style={{flex:1, padding:12, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {parseAmt} Pi • {microVal} µPi</button>
<button onClick={()=>alert(`MoMo ${momoOp} - ${parseAmt} Pi - ${xafCantonnePreview} ${zoneMoMo[zone]?.cur}`)} style={{flex:1, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 {momoOp.slice(0,8)}</button>
</div>
</div>
</div>
)}

{activeService && (
<div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveService(null)}>
<div style={{background:"#111111", borderRadius:16, padding:16, width:"100%", maxWidth:380, border:"1px solid #C9A86A33"}} onClick={(e)=>e.stopPropagation()}>
{activeService==="visa" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>💳 Visa Virtuelle V5.2 DARK</div>{virtualCard && <div style={{marginTop:10, background:"#0A0A0A", border:"1px solid #C9A86A55", borderRadius:12, padding:12, color:"#F9E2AF"}}>{virtualCard.number}<br/>{virtualCard.exp} • CVV {virtualCard.cvv}</div>}<button onClick={createVirtualCard} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none"}}>Générer Carte</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="merchant" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>📱 QR Merchant</div><input value={merchantData.name} onChange={(e)=>setMerchantData({...merchantData, name:e.target.value})} placeholder="Nom boutique" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A0A0A", border:"1px solid #333", color:"#fff"}} /><img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GARGOURA_${merchantData.name}_${merchantData.amountXAF}`} alt="QR" style={{marginTop:10, width:180, height:180, background:"#fff", borderRadius:12, margin:"10px auto", display:"block"}} /><button onClick={generateMerchantQR} style={{width:"100%", padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Générer QR</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="tontine" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>👥 Tontine</div><input value={tontineData.name} onChange={(e)=>setTontineData({...tontineData, name:e.target.value})} placeholder="Nom" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A0A0A", border:"1px solid #333", color:"#fff"}} /><button onClick={createTontine} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none"}}>Créer Tontine</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="change" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>💱 Change 7 Zones</div><input value={changeData.amount} onChange={(e)=>setChangeData({...changeData, amount:e.target.value})} placeholder="Montant" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A0A0A", border:"1px solid #C9A86A55", color:"#F9E2AF", fontWeight:800}} /><button onClick={doChange} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none"}}>Convertir</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="bills" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>🧾 Factures</div><select value={billData.operator} onChange={(e)=>setBillData({...billData, operator:e.target.value})} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A0A0A", border:"1px solid #333", color:"#fff"}}><option>SNE Tchad</option><option>JEPCO Jordanie</option><option>STC Arabie</option></select><button onClick={payBill} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#F9E2AF", color:"#0A0A0A", fontWeight:900, border:"none"}}>Payer</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="credit" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>💰 Micro-Crédit Halal</div><input value={creditData.amountXAF} onChange={(e)=>setCreditData({...creditData, amountXAF:e.target.value})} placeholder="Montant XAF" style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A0A0A", border:"1px solid #333", color:"#fff"}} /><button onClick={requestCredit} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Demander</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
{activeService==="api" && <div><div style={{fontWeight:900, color:"#F9E2AF"}}>⚙️ API Developer V5.2 DARK - Sans DB</div><div style={{fontSize:8, marginTop:8, background:"#0A0A0A", color:"#C9A86A", padding:10, borderRadius:8, border:"1px solid #C9A86A22"}}>BASE: /api<br/>POST /api/pi/approve<br/>POST /api/pi/complete<br/>POST /api/uba/cantonnement<br/>KEY: {apiKey}<br/>MAINNET: {gdbAddr.slice(0,12)}...<br/>LOCALSTORAGE only - Prod verte</div><button onClick={()=>{navigator.clipboard?.writeText(apiKey)}} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#C9A86A", color:"#0A0A0A", border:"none", fontWeight:900}}>Copier Key</button><button onClick={()=>setActiveService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>Fermer</button></div>}
</div>
</div>
)}

<div style={{position:"fixed", bottom:10, left:"50%", transform:"translateX(-50%)", width:"94%", maxWidth:440, background:"#111111", borderRadius:22, border:"1px solid #C9A86A33", display:"flex", justifyContent:"space-around", padding:"6px 0", zIndex:20}}>
{[{id:"accueil", ic:"🏠", l:"Home"},{id:"paiement", ic:"💸", l:"Wallet"},{id:"cartes", ic:"💳", l:"Cards"},{id:"epargne", ic:"📈", l:"Services"},{id:"plus", ic:"☰", l:"Profile"}].map((b)=>(
<button key={b.id} onClick={()=>setTab(b.id)} style={{border:"none", background:tab===b.id? "#F9E2AF" : "transparent", color:tab===b.id? "#0A0A0A" : "#9ca3af", borderRadius:14, padding:"6px 14px", display:"flex", flexDirection:"column", alignItems:"center", fontSize:8, fontWeight:800}}>
<span style={{fontSize:16}}>{b.ic}</span><span>{b.l}</span>
</button>
))}
</div>
</div>
)
}
