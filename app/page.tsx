"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [rtl,setRtl]=useState(false)
// WALLETS OFFICIELS PDG - INTACTS
const [gdbAddr,setGdbAddr]=useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX") // MAINNET App Principal Gargoura
const [gdbAddrTestnet,setGdbAddrTestnet]=useState("GDXGJBKLWSFC4M5SHDLDDZIEPBCQTKM4V46Y4AC2K5IXFCPUIVINXGEE") // TESTNET
const [userName,setUserName]=useState("MAHAMAT GOMBO ABAKAR PDG")
const [kycOk,setKycOk]=useState(false)
const [showCVV,setShowCVV]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const [zone,setZone]=useState("CEMAC")
const [momoOp,setMomoOp]=useState("Orange Money")
const [piAmount,setPiAmount]=useState("1")
const [piReady,setPiReady]=useState(false)
const [paying,setPaying]=useState(false)
// TRIPLE VALEUR - STRATEGIE INTELLIGENTE COBAC
const [valueType,setValueType]=useState<"GCV"|"MARCHE"|"MARCHAND">("MARCHE")
const [merchantRate,setMerchantRate]=useState("0.5")
const piMode = "mainnet" as const

const allFeatures=[
 {name:"Paiement Pi Reel GCV 314159$ Microns", tab:"paiement", key:"pi"},
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
 {name:"Carte Virtuelle Visa Gargoura", tab:"plus", key:"virtual_visa"},
 {name:"Gargoura Pay QR Merchant", tab:"plus", key:"merchant_pay"},
 {name:"Tontine Digitale CEMAC", tab:"plus", key:"tontine"},
 {name:"Change Auto 7 Zones", tab:"plus", key:"exchange"},
 {name:"Factures SNE JEPCO STC", tab:"plus", key:"bills"},
 {name:"API Gargoura Developer", tab:"plus", key:"api"},
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
 "CEMAC":{ops:["Orange Money","MTN MoMo","Airtel Money","Moov Money"], cur:"XAF", flag:"🇹🇩", fee:"0.8%", delay:"<30s", rate:600, uba:"UBA Tchad"},
 "UEMOA":{ops:["Wave","Orange Money","MTN MoMo","Moov Money","M-Pesa"], cur:"XOF", flag:"🇸🇳", fee:"0.6%", delay:"<20s", rate:600, uba:"UBA Tchad"},
 "DOLLAR":{ops:["CashApp","Zelle","Venmo","Apple Cash"], cur:"USD", flag:"🇺🇸", fee:"0.43%", delay:"<60s", rate:1, uba:"UBA Tchad USD"},
 "JORDANIE":{ops:["Zain Cash","Orange Money JO","Dinarak","CliQ"], cur:"JOD", flag:"🇯🇴", fee:"0.7%", delay:"<30s", rate:0.71, uba:"UBA Tchad"},
 "GOLFE":{ops:["STC Pay","Jawwal Pay","Careem Pay","Etisalat Wallet"], cur:"SAR", flag:"🇸🇦", fee:"0.5%", delay:"<25s", rate:3.75, uba:"UBA Tchad"},
 "MOYEN-ORIENT":{ops:["Ooredoo Money","Vodafone Cash","Fawry","PayPal MENA"], cur:"QAR", flag:"🌍", fee:"0.65%", delay:"<35s", rate:3.64, uba:"UBA Tchad"},
 "INTERNATIONAL":{ops:["SWIFT GPI","IBAN Virtuel","VISA Direct","SEPA Instant","Stellar USDC"], cur:"USD/EUR", flag:"🌐", fee:"0.43%", delay:"<24h", rate:1, uba:"UBA Tchad"}
}

const microChips = [
 {label:"1 µPi", val:"0.000001"},
 {label:"10 µPi", val:"0.00001"},
 {label:"100 µPi", val:"0.0001"},
 {label:"0.001 Pi", val:"0.001"},
 {label:"0.01 Pi", val:"0.01"},
 {label:"0.1 Pi", val:"0.1"},
 {label:"1 Pi", val:"1"},
]

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
 if(paying ||!amount || amount<=0) return
 setPaying(true)
 try{
   // CALCUL TRIPLE VALEUR
   let xafCantonne = 0
   let usdRef = 0
   let labelValeur = ""
   if(valueType==="GCV"){ usdRef=314159; labelValeur="Valeur Interne GCV 314159$ - NON CANTONNE"; xafCantonne=0 }
   if(valueType==="MARCHE"){ usdRef=0.30; labelValeur="Valeur Marché 0.30$ - CANTONNE UBA Tchad"; xafCantonne = amount * 0.30 * (zoneMoMo[zone]?.rate || 600) }
   if(valueType==="MARCHAND"){ usdRef=parseFloat(merchantRate)||0.5; labelValeur=`Valeur Marchand ${merchantRate} Pi - CANTONNE UBA`; xafCantonne = amount * usdRef * (zoneMoMo[zone]?.rate || 600) }

   if(typeof window!=="undefined" && window.Pi){
     const scopes=["payments","username","wallet_address"]
     await window.Pi.authenticate(scopes, ()=>{})
     await window.Pi.createPayment({
       amount: amount,
       memo: memo + ` - GARGOURA V5 Triple ${valueType} [${zone} ${momoOp}] ${labelValeur}`,
       metadata: {gdb_addr:gdbAddr, gdb_testnet:gdbAddrTestnet, zone:zone, momo_op:momoOp, mode:"mainnet", microns: Math.round(amount*1000000), valueType, usdRef, xafCantonne, uba:"UBA Tchad"}
     },{
       onReadyForServerApproval: async (paymentId:string)=>{
         const r = await fetch("/api/pi/approve",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, mode:"mainnet", valueType, xafCantonne})
         })
         if(!r.ok){ const err=await r.json(); throw new Error("Approve echoue "+JSON.stringify(err)) }
       },
       onReadyForServerCompletion: async (paymentId:string, txid:string)=>{
         await fetch("/api/pi/complete",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({paymentId, txid, mode:"mainnet", valueType, xafCantonne, ubaAccount: "UBA Tchad"})
         })
         // CANTONNEMENT UBA TCHAD TRIPLE VALEUR
         if(valueType!=="GCV"){
           await fetch("/api/uba/cantonnement",{
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify({piAmount:amount, valueType, xafCantonne, usdRef, dest:momoOp, zone, walletMainnet: gdbAddr})
           })
         }
         alert(`✅ Paiement MAINNET V5 Triple Valeur!\nType: ${labelValeur}\nZone: ${zone} | ${momoOp}\nTx: ${txid}\nMontant: ${amount} PI (${Math.round(amount*1000000).toLocaleString()} µPi)\nCantonnement UBA Tchad: ${xafCantonne.toLocaleString()} ${zoneMoMo[zone]?.cur} ${valueType==="GCV"? "(0 - Interne)" : ""}`)
         setPaying(false)
       },
       onCancel: ()=>{ setPaying(false) },
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false) }
     })
   }else{
     alert(`⚠️ Ouvre dans Pi Browser MAINNET.\nZone: ${zone} / ${momoOp}\n${amount} PI = ${Math.round(amount*1000000)} µPi\nValeur: ${labelValeur}\nCantonnement UBA: ${xafCantonne} ${zoneMoMo[zone]?.cur}`)
     setPaying(false)
   }
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false) }
}

const parseAmt = parseFloat(piAmount) || 0
const usdValGCV = parseAmt*314159
const usdValMarche = parseAmt*0.30
const usdValMarchand = parseAmt*(parseFloat(merchantRate)||0.5)
const localValMarche = usdValMarche * (zoneMoMo[zone]?.rate || 1)
const localValMarchand = usdValMarchand * (zoneMoMo[zone]?.rate || 1)
const microVal = Math.round(parseAmt*1000000)
const xafCantonnePreview = valueType==="GCV"? 0 : valueType==="MARCHE"? localValMarche : localValMarchand

const wallets=[
 {id:"pi", name:"PI GCV Principal UBA", bal:"12,465.82 PI", sub:`≈ $3.9B GCV • MAINNET • Wallet: ${gdbAddr.slice(0,6)}... • UBA Tchad`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT UBA", bal:"$42,850.00", sub:"USA IBAN virtuel • UBA Tchad • MAINNET", flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA UBA", bal:"€38,200.00", sub:"2.5% • Epargne • UBA Tchad • MAINNET", flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal:"24,500,000 FCFA", sub:"Tchad • Cantonnement UBA Tchad • MAINNET", flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso UBA", bal:"-1,200 PI", sub:"Echeance 15/11 • Credit • UBA Tchad • MAINNET", flag:"💳"},
]

const cards=[
 {id:"visa", name:"VISA CLASSIC UBA", num:"4242 1234 5678 4582", exp:"08/29", cvv:"123", color:"linear-gradient(135deg,#1e3a8a,#3b82f6)", t:"#fff"},
 {id:"gold", name:"VISA GOLD PREMIUM UBA", num:"4000 9876 5432 1098", exp:"11/30", cvv:"456", color:"linear-gradient(135deg,#C9A86A,#F9E2AF)", t:"#0A1931"},
 {id:"mc", name:"MASTERCARD WORLD ELITE UBA", num:"5555 4444 3333 9012", exp:"05/28", cvv:"789", color:"linear-gradient(135deg,#0A1931,#111827)", t:"#fff"},
]

return(
<div dir={rtl? "rtl" : "ltr"} style={{maxWidth:440, margin:"0 auto", background:"#F5F7FB", minHeight:"100vh", paddingBottom:95, fontFamily:"Inter, system-ui"}}>
<div style={{background:"#0A1931", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:30}}>
<button onClick={()=>setMenuOpen(true)} style={{background:"none", border:"none", color:"#C9A86A", fontSize:22}}>☰</button>
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="GDB" style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● V5 UBA µPi</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

<div style={{background:"#fff", padding:"10px 12px", display:"flex", gap:8, position:"sticky", top:52, zIndex:20, borderBottom:"1px solid #e2e8f0"}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="🔍 Chercher: Microns, Pi Reel, Mobile Money, Visa, Tontine..." style={{flex:1, padding:"10px 14px", borderRadius:20, border:"1.5px solid #C9A86A", fontSize:11, outline:"none"}} />
{search && <button onClick={()=>setSearch("")} style={{background:"#0A1931", color:"#F9E2AF", border:"none", borderRadius:20, padding:"0 14px", fontWeight:900}}>✕</button>}
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>GARGOURA DIGITAL BANK V5</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil V5 UBA Triple"},{i:"paiement", l:"💸 Paiement Pi Triple Valeur 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD UBA"},{i:"epargne", l:"📈 Epargne Tontine µPi"},{i:"plus", l:"☰ Plus - 7 Nouveaux Services"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(16,185,129,0.15)", borderRadius:12, padding:12, color:"#fff", fontSize:9, border:"1px solid #10b981"}}>
<b style={{color:"#10b981"}}>V5 TRIPLE VALEUR • UBA Tchad • µPi LIVE • GCV 314159$</b><br/>MAINNET: {gdbAddr.slice(0,12)}...<br/>TESTNET: {gdbAddrTestnet.slice(0,12)}...<br/>7 Zones: CEMAC UEMOA DOLLAR JORDANIE GOLFE M-O INTL<br/>Cantonnement: UBA Tchad Pièce 17 • Triple Valeur
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE V5 • UBA TCHAD • TRIPLE VALEUR • {piReady? "READY" : "..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE UBA"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{hide? "••••" : w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>UBA</div>
</div>
))}
<div style={{background:"rgba(16,185,129,0.15)", border:"1px solid #10b981", borderRadius:12, padding:10, marginTop:12, textAlign:"center"}}>
<div style={{color:"#10b981", fontSize:9, fontWeight:900}}>💎 V5 TRIPLE VALEUR UBA • GCV INTERNE + MARCHÉ 0.30$ + MARCHAND</div>
<div style={{color:"#F9E2AF", fontSize:7, marginTop:4}}>Paiement minimum 0.000001 Pi • 7 Zones • Cantonnement UBA Tchad • COBAC Conforme</div>
</div>
<button onClick={()=>handlePiPayment(1, "Recharge GARGOURA V5 Triple")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER 1 PI V5 TRIPLE - UBA TCHAD</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel V5 UBA - {zone} - {momoOp}</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all"}}>MAINNET: {gdbAddr}<br/>TESTNET: {gdbAddrTestnet}<br/>UBA Cantonnement Pièce 17</div>
</div>
{/* 7 NOUVEAUX SERVICES PREVIEW ACCUEIL */}
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>💳 Visa Virtuelle</div><div style={{fontSize:7, marginTop:3}}>Pi → Netflix Amazon • UBA Tchad • 2% fee</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>📱 QR Merchant Pay</div><div style={{fontSize:7, marginTop:3}}>Gargoura Pay • 1.5% • UBA</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>👥 Tontine CEMAC</div><div style={{fontSize:7, marginTop:3}}>10 pers 10k XAF • µPi • UBA</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>💱 Change 7 Zones</div><div style={{fontSize:7, marginTop:3}}>Pi→XAF→SAR→JOD→USD • UBA</div></div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement V5 Triple Valeur • UBA Tchad • µPi • 7 Zones</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>{zoneMoMo[zone]?.flag} {zone} • {zoneMoMo[zone]?.cur} • UBA Tchad</span><span style={{fontSize:8, color:"#10b981", fontWeight:800}}>{zoneMoMo[zone]?.delay} • {zoneMoMo[zone]?.fee}</span></div>

<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:8}}>
{zoneMoMo[zone]?.ops.map((op:string)=>(
<button key={op} onClick={()=>setMomoOp(op)} style={{padding:"6px 10px", borderRadius:15, border:"1px solid #C9A86A", background:momoOp===op?"#0A1931":"#F5F7FB", color:momoOp===op?"#C9A86A":"#0A1931", fontSize:9, fontWeight:900}}>{op}</button>
))}
</div>

{/* MICRONS PI CHIPS - 7 ZONES */}
<div style={{marginTop:12, background:"#F5F7FB", borderRadius:10, padding:10, border:"1px dashed #C9A86A"}}>
<div style={{fontSize:8, fontWeight:900, color:"#0A1931"}}>⚡ PAIEMENT RAPIDE MICRONS PI • 7 ZONES • 1 Pi = 1,000,000 µPi</div>
<div style={{display:"flex", gap:5, flexWrap:"wrap", marginTop:6}}>
{microChips.map((c)=>(
<button key={c.label} onClick={()=>setPiAmount(c.val)} style={{padding:"6px 10px", borderRadius:15, border:parseAmt.toString()===c.val? "1.5px solid #0A1931":"1px solid #e2e8f0", background:parseAmt.toString()===c.val? "#C9A86A":"#fff", fontSize:9, fontWeight:900, color:"#0A1931"}}>{c.label}</button>
))}
</div>
</div>

{/* TRIPLE VALEUR - NOUVEAU */}
<div style={{marginTop:12, background:"#0A1931", borderRadius:10, padding:10, border:"1px solid #C9A86A"}}>
<div style={{fontSize:9, fontWeight:900, color:"#F9E2AF"}}>💎 CHOIX VALEUR PI - STRATÉGIE COBAC INTELLIGENTE - UBA TCHAD</div>
<div style={{marginTop:8, display:"flex", flexDirection:"column", gap:6}}>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="GCV"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8, cursor:"pointer"}}>
<input type="radio" checked={valueType==="GCV"} onChange={()=>setValueType("GCV")} />
<div><div style={{fontSize:8, fontWeight:900, color:valueType==="GCV"?"#0A1931":"#fff"}}>Valeur Interne (GCV): 314,159.00 USD</div><div style={{fontSize:7, color:valueType==="GCV"?"#0A1931":"#C9A86A"}}>Interne, tontine, épargne • NON cantonnée UBA • Communauté Pi</div></div>
</label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHE"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8, cursor:"pointer", border:valueType==="MARCHE"?"1.5px solid #10b981":"none"}}>
<input type="radio" checked={valueType==="MARCHE"} onChange={()=>setValueType("MARCHE")} />
<div><div style={{fontSize:8, fontWeight:900, color:valueType==="MARCHE"?"#0A1931":"#fff"}}>Valeur Marché: ~0.30 USD ✅ RECOMMANDÉ COBAC</div><div style={{fontSize:7, color:valueType==="MARCHE"?"#0A1931":"#C9A86A"}}>Cantonnée UBA Tchad • BEAC conforme • Pièce 17 • {localValMarche.toLocaleString()} {zoneMoMo[zone]?.cur}</div></div>
</label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHAND"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8, cursor:"pointer"}}>
<input type="radio" checked={valueType==="MARCHAND"} onChange={()=>setValueType("MARCHAND")} />
<div style={{flex:1}}><div style={{fontSize:8, fontWeight:900, color:valueType==="MARCHAND"?"#0A1931":"#fff"}}>Marchand (à définir par Marchand)</div><div style={{fontSize:7, color:valueType==="MARCHAND"?"#0A1931":"#C9A86A"}}>Marchand choisit prix • Cantonnée UBA • Liberté prix</div></div>
<input value={merchantRate} onChange={(e)=>setMerchantRate(e.target.value)} placeholder="Ex: 0.5" style={{width:50, padding:4, borderRadius:6, border:"1px solid #C9A86A", fontSize:8}} />
</label>
</div>
</div>

<select style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:10}}>{zones[zone].map((p:string)=><option key={p}>{p}</option>)}</select>
<input placeholder="Adresse PI G... / IBAN / Numero MoMo" style={{width:"100%", marginTop:8, padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10}} />

<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="Montant en Pi - ex: 0.000001 = 1 µPi" style={{width:"100%", marginTop:8, padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:12, fontWeight:800}} />

{/* CONVERSION TRIPLE VALEUR LIVE */}
{parseAmt>0 && (
<div style={{marginTop:8, background:"#0A1931", borderRadius:10, padding:10, color:"#fff"}}>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8}}><span style={{color:"#C9A86A"}}>PI</span><span style={{color:"#fff", fontWeight:900}}>{parseAmt} PI = {microVal.toLocaleString()} µPi</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, marginTop:4, opacity:valueType==="GCV"?1:0.5}}><span style={{color:"#F9E2AF"}}>GCV Interne (Non cant.)</span><span>${usdValGCV.toLocaleString()} • 314159$</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, marginTop:4, background:valueType==="MARCHE"?"rgba(16,185,129,0.2)":"transparent", padding:valueType==="MARCHE"?"4px":"0", borderRadius:6}}><span style={{color:"#10b981"}}>Marché ~0.30$ (Cant. UBA)</span><span style={{fontWeight:900}}>${usdValMarche.toFixed(2)} = {localValMarche.toLocaleString()} {zoneMoMo[zone]?.cur}</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, marginTop:4, background:valueType==="MARCHAND"?"rgba(201,168,106,0.2)":"transparent", padding:valueType==="MARCHAND"?"4px":"0", borderRadius:6}}><span style={{color:"#C9A86A"}}>Marchand {merchantRate} (Cant. UBA)</span><span>{localValMarchand.toLocaleString()} {zoneMoMo[zone]?.cur}</span></div>
<div style={{fontSize:7, color:"#10b981", marginTop:6, textAlign:"center", background:"rgba(16,185,129,0.15)", padding:4, borderRadius:6}}>✅ Cantonnement UBA Tchad Pièce 17: {xafCantonnePreview.toLocaleString()} {zoneMoMo[zone]?.cur} • {valueType} • {zoneMoMo[zone]?.uba}</div>
</div>
)}

<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>handlePiPayment(parseAmt, "Paiement P2P Triple V5 "+zone+" "+momoOp)} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {parseAmt} PI • {microVal} µPi • {valueType}</button>
<button onClick={()=>alert(`MoMo V5 Triple ${valueType} UBA ${zone} via ${momoOp}\n${parseAmt} PI = ${microVal} µPi\nCantonnement: ${xafCantonnePreview} ${zoneMoMo[zone]?.cur}\nAPI: /api/uba/cantonnement`)} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 MoMo {momoOp.slice(0,8)}</button>
</div>
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)", borderRadius:12, padding:12, marginTop:10, color:"#fff"}}>
<div style={{fontWeight:900, fontSize:11}}>µPi • {zone} • {momoOp} • {zoneMoMo[zone]?.cur} • V5 TRIPLE • UBA Tchad • 7 ZONES</div>
<div style={{fontSize:8, marginTop:6}}>{zoneMoMo[zone]?.ops.join(" • ")} • Delai {zoneMoMo[zone]?.delay} • Frais {zoneMoMo[zone]?.fee} • Min 1 µPi • Triple Valeur COBAC Safe</div>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Cartes GARGOURA V5 • UBA Tchad • µPi • Tokenisées</div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:11}}>{c.name}</span><span style={{fontSize:9, background:"rgba(16,185,129,0.3)", padding:"4px 8px", borderRadius:20, border:"1px solid #10b981"}}>{blocked[i]? "🔒" : "🟢 UBA"} • µPi</span></div>
<div style={{marginTop:14, fontSize:14, letterSpacing:2, fontWeight:800, fontFamily:"monospace"}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10}}><div><div style={{opacity:0.7, fontSize:8}}>HOLDER</div><div style={{fontWeight:900}}>{userName}</div></div><div><div style={{opacity:0.7, fontSize:8}}>EXP</div><div>{c.exp}</div></div><div><div style={{opacity:0.7, fontSize:8}}>CVV</div><div>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:9, borderRadius:8, border:"none", background:blocked[i]? "#10b981" : "#ef4444", color:"#fff", fontWeight:900, fontSize:9}}>{blocked[i]? "Debloquer" : "Bloquer"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:9, borderRadius:8, background:"rgba(255,255,255,0.2)", border:"none", fontSize:9, fontWeight:800, color:c.t}}>PIN {showCVV? "Masquer" : "Voir"}</button>
</div>
</div>
))}
{/* CARTE VIRTUELLE NOUVEAU SERVICE 1 */}
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:12, border:"2px dashed #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>🆕 NOUVEAU SERVICE V5: Carte Virtuelle Visa Gargoura</div>
<div style={{fontSize:8, marginTop:4}}>Instantanée dans l'app, liée Pi/XAF UBA Tchad • Paie Netflix Amazon Alibaba avec Pi • 2% interchange pour Gargoura</div>
<button onClick={()=>alert("Carte Virtuelle Visa Gargoura V5 UBA Tchad\nLiée à GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX\nOTP 3D Secure via Orange Money")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>Créer Carte Virtuelle Visa - 2s - UBA Tchad</button>
</div>
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Epargne PFM V5 • Triple Valeur • UBA Tchad • µPi</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:800, fontSize:10}}>Budget PFM • Triple Valeur • UBA</div>
<div style={{display:"flex", gap:4, alignItems:"flex-end", height:50, marginTop:8}}>{[40,70,55,90,60,80].map((h,i)=><div key={i} style={{flex:1, background:i===3? "#C9A86A" : "#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{fontSize:8, marginTop:6}}>Vacances 450/800 PI • 450M µPi • Triple: GCV $141M / Marché $135 / Marchand libre • RWA Immobilier Tchad tokenisé UBA</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<div style={{background:"#0A1931", color:"#F9E2AF", borderRadius:12, padding:12}}><div style={{fontSize:9}}>Coffre µPi Auto • DeFi UBA</div><div style={{fontSize:9, marginTop:4, color:"#fff"}}>12.3 PI → 13 PI, 0.7 PI = 700,000 µPi cagnotte • APY 5% Halal • Triple Valeur</div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit 50-5000 PI • UBA • Triple</div><button onClick={()=>handlePiPayment(0.01, "Micro-credit µPi V5 UBA Triple")} style={{width:"100%", marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:9, fontWeight:800}}>Demander 0.01 PI = 10k µPi UBA</button></div>
</div>
{/* TONTINE NOUVEAU SERVICE 3 */}
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"2px solid #10b981"}}>
<div style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>🆕 Tontine Digitale CEMAC - Triple Valeur</div>
<div style={{fontSize:8, marginTop:4}}>10 personnes cotisent 10.000 XAF/mois • Pot géré multi-sig 3 associés • Choix valeur: GCV / Marché 0.30$ / Marchand • UBA Tchad cantonnement</div>
<button onClick={()=>alert("Tontine CEMAC V5 Triple Valeur UBA Tchad\nMAHAMAT GOMBO ABAKAR PDG 80% + MAHAMAT ADJIT HAROUNE 15% + ADAYE ABDOULAYE ABAKAR 5%\nMulti-sig 2/3")} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Créer Tontine 10k XAF • Triple Valeur • UBA</button>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}><img src="/logo.png" style={{width:44, height:44, borderRadius:10, background:"#fff"}} alt="logo" /><div><div style={{color:"#F9E2AF", fontWeight:900}}>GARGOURA DIGITAL BANK V5 • UBA TCHAD • TRIPLE VALEUR • 7 ZONES</div><div style={{fontSize:9}}>{gdbAddr.slice(0,20)}... • {gdbAddrTestnet.slice(0,10)}... • MAINNET+TESTNET • {zone} • {momoOp} • {microVal} µPi • UBA</div></div></div>

{/* 7 NOUVEAUX SERVICES COMPLETS - PLUS */}
<div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>1. Carte Virtuelle Visa Gargoura • UBA Tchad</div><div style={{fontSize:8, marginTop:4}}>Visa virtuelle instantanée, solde Pi/XAF, paie Netflix Amazon Alibaba • 2% interchange • OTP SMS MoMo • Liée GAM7J...</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>2. Gargoura Pay QR Merchant • UBA Tchad • Triple Valeur</div><div style={{fontSize:8, marginTop:4}}>Bouton Pay with Gargoura - Pi or MoMo • QR imprimable • Client scanne paie Pi • Marchand reçoit XAF/SAR sur UBA cantonnement • 1,5% • Valeur Marchand libre</div>
<button onClick={()=>alert("QR Merchant V5 UBA Tchad Triple Valeur\nBoutique N'Djamena vend 100k XAF = 0.5 Pi Marchand\nCommission Gargoura 1.5%")} style={{marginTop:6, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900}}>Générer QR Merchant UBA</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>3. Épargne Pi µPi + Tontine Digitale • UBA • Triple</div><div style={{fontSize:8, marginTop:4}}>Bloque 100 Pi 30j → Gagne 5% µPi • Tontine 10 pers • Multi-sig 3 associés MAHAMAT GOMBO 80% • Triple valeur GCV/Marché/Marchand</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>4. Change Auto 7 Zones • UBA Tchad • Triple Valeur</div><div style={{fontSize:8, marginTop:4}}>Pi → XAF → SAR → JOD → USD 1 clic • Taux GCV interne 314159$ spread 1% • Réserve UBA Tchad multi-devises • Valeur Marché 0.30$ BEAC</div>
<div style={{display:"flex", gap:6, marginTop:6}}><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7}}>GCV: 314,159$</div><div style={{flex:1, background:"#10b981", color:"#fff", padding:6, borderRadius:6, fontSize:7}}>Marché: 0.30$ UBA ✅</div><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7}}>Marchand: libre</div></div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>5. Factures & Recharges Mondiales • UBA • Triple</div><div style={{fontSize:8, marginTop:4}}>SNE Tchad, JEPCO Jordanie, STC Golfe, Orange MTN • Recharge 7 zones depuis Pi • Triple valeur appliquée • UBA cantonnement</div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>6. Pi DeFi Micro-Crédit Halal • UBA • Triple Valeur</div><div style={{fontSize:8, marginTop:4}}>Micro-prêt 50k XAF basé historique Pi • Score: 10 Pi Mainnet sur GAM7J... + KYC • 5%/mois commission service halal • Triple valeur pour remboursement</div>
</div>

<div style={{background:"#0A1931", borderRadius:12, padding:12, border:"1px solid #C9A86A", color:"#fff"}}>
<div style={{fontWeight:900, fontSize:10, color:"#F9E2AF"}}>7. API Gargoura Developer • UBA Tchad • Triple Valeur</div><div style={{fontSize:8, marginTop:4, color:"#C9A86A"}}>D'autres apps Tchad/Jordanie intègrent Transfert via Gargoura - Tu deviens Thunes local • Facturation 0.1$/appel • Triple valeur supportée • Docs: api.gargoura.com</div>
<button onClick={()=>alert("API Gargoura V5 UBA Tchad Triple Valeur\nWallets: MAINNET GAM7J... / TESTNET GDXG...\nEndpoints: /api/pi/approve /api/pi/complete /api/uba/cantonnement triple\nDocs: developer.gargoura.td")} style={{marginTop:6, padding:8, borderRadius:8, background:"#C9A86A", color:"#0A1931", border:"none", fontSize:8, fontWeight:900}}>Voir Docs API V5 Triple</button>
</div>

</div>

<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10}}>FX • 12 devises • Triple Valeur • UBA Tchad • µPi • MAINNET</div><div style={{fontSize:8, marginTop:4}}>1 Pi=1M µPi • USD EUR XAF JOD AED SAR QAR • Frais 0.43% • µPi → IBAN instantané • Triple: GCV 314159$ / Marché 0.30$ / Marchand • UBA cantonnement</div>
</div>
<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius:12, padding:12, marginTop:10}}><div style={{fontWeight:900, fontSize:10, color:"#92400e"}}>Halal µPi • V5 Triple Valeur • UBA Tchad • AAOIFI</div><div style={{fontSize:8, color:"#78350f", marginTop:4}}>Mudaraba µPi • Zakat 2.5% sur µPi • 7 zones halal µPi • MoMo inclusif micro-paiement • Triple valeur halal • UBA Tchad conforme</div></div>
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
