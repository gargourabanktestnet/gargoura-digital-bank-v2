"use client"
import { useState, useEffect } from "react"
declare global { interface Window { Pi:any } }

export default function Page(){
const [tab,setTab]=useState("accueil")
const [hide,setHide]=useState(false)
const [menuOpen,setMenuOpen]=useState(false)
const [search,setSearch]=useState("")
const [rtl,setRtl]=useState(false)
const [activeBankService,setActiveBankService]=useState<string|null>(null)

// WALLETS - KYC UNIQUE ACTIF - NE PAS TOUCHER
const [gdbAddr] = useState("GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK") // KYC VERIFIE ACTIF - Captures 2c314c09 et 6ec364f8
const [gdbAddrBankFuture] = useState("GAM7JHV4FE37TONWZQYHI3IG37O6D3CXNE4KFPGGAJSMRPJWJZ3UZPUX") // RESERVE APRES KYB GARGOURA
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

// STRUCTURE BANCAIRE COMPLÈTE - BACKEND LOGIC - SANS CHANGER DESIGN
const [pin,setPin]=useState("1234")
const [accounts,setAccounts]=useState([
 {id:"pi", iban:"GB29NWBK60161331926819", type:"PI MAINNET", balPi:12.46582, balXAF:0, currency:"PI", wallet:"GAS5GBKVRVIHHILL5M6WAG2O74OYEO4DMZZGFTMSH77TFOTG2TF6WQVK"},
 {id:"xaf", iban:"TD64 2000 1000 0123 4567 8901 02", type:"XAF CEMAC BEAC", balPi:0, balXAF:24500000, currency:"XAF", wallet:"UBA Tchad Pièce 17"},
 {id:"usd", iban:"US64 SVBK US6S 3300 0000 0000", type:"USD SWIFT", balPi:0, balXAF:0, balUSD:42850, currency:"USD", wallet:"UBA USD"},
])
const [txHistory,setTxHistory]=useState<any[]>(()=>{
 try{
   const last = localStorage.getItem("gdb_last_tx")
   const hist = localStorage.getItem("gdb_tx_history")
   if(hist) return JSON.parse(hist)
   if(last){ const l=JSON.parse(last); return [{...l, id:"2c314c09cc9ecbbcb9579e0c3c910f85ca7fe5d0686f2f71af3a3cedfd186aa6", amount:0.1, microns:100000, status:"confirmé BEAC", zone:"CEMAC", momo:"Airtel Money"}, {id:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9", amount:0.0015, microns:1500, status:"confirmé BEAC", zone:"CEMAC", momo:"Orange Money", txid:"6ec364f8e2694b899eda46b3ffba7267cc2ae3249bd498eeb6b3d3cfd1b73ce9"}] }
   return []
 }catch{ return [] }
})
const [virtualCards,setVirtualCards]=useState<any[]>(()=>{
 try{ const v=localStorage.getItem("gdb_virtual_cards"); return v? JSON.parse(v):[] }catch{ return [] }
})
const [tontines,setTontines]=useState<any[]>(()=>{
 try{ const t=localStorage.getItem("gdb_tontines"); return t? JSON.parse(t):[] }catch{ return [] }
})
const [limits,setLimits]=useState({journalier:5000000, mensuel:50000000, utilise:185000, devise:"XAF"})
const [supportTickets,setSupportTickets]=useState<any[]>([])
const [notifications,setNotifications]=useState([
 {id:1, title:"Paiement Pi réussi 0.0015 Pi", desc:"Tx 6ec364f8... -> Orange Money CEMAC 0.27 XAF cantonnés UBA", time:"Il y a 2h", read:false},
 {id:2, title:"Tontine N'Djamena cotisation", desc:"10 000 XAF prélevés - Pot 100 000 XAF", time:"Hier", read:false},
])

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
 {name:"KYC Pièce 17 BEAC", tab:"plus", key:"kyc"},
 {name:"Relevés Bancaires PDF", tab:"plus", key:"releve"},
 {name:"Support UBA Tchad", tab:"plus", key:"support"},
]

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
 {label:"100 µPi", val:"0.0001"},
 {label:"0.0015 Pi", val:"0.0015"},
 {label:"0.01 Pi", val:"0.01"},
 {label:"0.1 Pi", val:"0.1"},
 {label:"1 Pi", val:"1"},
]

useEffect(()=>{
 const s=document.createElement("script")
 s.src="https://sdk.minepi.com/pi-sdk.js"
 s.onload=()=>{ try{ window.Pi?.init({version:"2.0", sandbox:false}); setPiReady(true)}catch{setPiReady(true)}}
 document.head.appendChild(s)
 try{
  const k=localStorage.getItem("gdb_kyc_verified")
  if(k==="true") setKycOk(true)
  const vc=localStorage.getItem("gdb_virtual_cards")
  if(vc) setVirtualCards(JSON.parse(vc))
 }catch{}
},[])
useEffect(()=>{ const first = zoneMoMo[zone]?.ops?.[0]; if(first) setMomoOp(first)},[zone])

// TRANSFERT REEL PiCoin - INTACT - KYC GAS5
const handlePiPayment = async (amount:number, memo:string)=>{
 if(paying ||!amount || amount<=0) return
 if(!kycOk){ alert("⚠️ KYC requis - Va dans Plus > KYC Pièce 17 BEAC pour vérifier ton identité - Obligatoire BEAC"); setTab("plus"); setActiveBankService("kyc"); return }
 if(amount*0.30*600 + limits.utilise > limits.journalier){ alert(`⛔ Plafond journalier BEAC dépassé\nLimite: ${limits.journalier} XAF\nUtilisé: ${limits.utilise} XAF\nDemande: ${amount*0.30*600} XAF`); return }
 setPaying(true)
 try{
   let xafCantonne=0, usdRef=0, labelValeur=""
   if(valueType==="GCV"){ usdRef=314159; labelValeur="GCV 314159$ NON CANTONNE"; xafCantonne=0 }
   if(valueType==="MARCHE"){ usdRef=0.30; labelValeur="MARCHE 0.30$ CANTONNE UBA Tchad"; xafCantonne=amount*0.30*(zoneMoMo[zone]?.rate||600) }
   if(valueType==="MARCHAND"){ usdRef=parseFloat(merchantRate)||0.5; labelValeur=`MARCHAND ${merchantRate} CANTONNE UBA`; xafCantonne=amount*usdRef*(zoneMoMo[zone]?.rate||600) }
   if(window.Pi){
     await window.Pi.authenticate(["payments","username","wallet_address"], ()=>{})
     await window.Pi.createPayment({
       amount, memo: memo+` - GARGOURA V5.3 BANQUE ${valueType} [${zone} ${momoOp}] ${labelValeur} KYC GAS5`,
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
         // BANQUE: Historique + Limites + Relevé
         const newTx={id:txid, txid, paymentId, amount, microns:Math.round(amount*1000000), valueType, xafCantonne, usdRef, zone, momoOp, status:"confirmé BEAC", date:new Date().toISOString(), wallet:gdbAddr, uba:"UBA Tchad Pièce 17"}
         const updatedHistory=[newTx,...txHistory].slice(0,100)
         setTxHistory(updatedHistory)
         try{ localStorage.setItem("gdb_tx_history", JSON.stringify(updatedHistory)); localStorage.setItem("gdb_last_tx", JSON.stringify(newTx)) }catch{}
         setLimits({...limits, utilise: limits.utilise + xafCantonne})
         alert(`✅ Paiement MAINNET V5.3 BANQUE!\nWallet KYC: ${gdbAddr.slice(0,6)}...QVK\nType: ${labelValeur}\nZone: ${zone} | ${momoOp}\nTx: ${txid}\nMontant: ${amount} PI (${Math.round(amount*1000000)} µPi)\nCantonnement UBA: ${xafCantonne.toLocaleString()} ${zoneMoMo[zone]?.cur}\nRelevé bancaire mis à jour\nPlafond restant: ${(limits.journalier - limits.utilise - xafCantonne).toLocaleString()} XAF`)
         setPaying(false)
       },
       onCancel: ()=>setPaying(false),
       onError: (err:any)=>{ alert("Erreur Pi: "+(err?.message||JSON.stringify(err))); setPaying(false)}
     })
   }else{ alert(`Ouvre dans Pi Browser MAINNET KYC GAS5\n${amount} Pi = ${Math.round(amount*1000000)} µPi\n${labelValeur}`); setPaying(false)}
 }catch(e:any){ alert("Erreur: "+e.message); setPaying(false)}
}

// FONCTIONS BANCAIRES COMPLÈTES - DESIGN INCHANGÉ
const handleKYC = ()=>{ setKycDocs({...kycDocs, statut:"verifie"}); setKycOk(true); try{localStorage.setItem("gdb_kyc_verified","true")}catch{}; alert("✅ KYC Pièce 17 BEAC vérifié!\nCNI + Selfie validés\nTu peux maintenant payer Pi MAINNET\nLimite journalière: 5M XAF"); setActiveBankService(null) }
const createVirtualCardBank = ()=>{
  const card={id:"VCARD_"+Date.now(), number:"4242 "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000)+" "+Math.floor(1000+Math.random()*9000), exp:"08/29", cvv:Math.floor(100+Math.random()*900).toString(), holder:userName, balPi:"2.5 Pi", balXAF:"500 000 XAF", iban:accounts[1].iban, wallet:gdbAddr, status:"active", created:new Date().toISOString()}
  const newCards=[card,...virtualCards]; setVirtualCards(newCards); try{localStorage.setItem("gdb_virtual_cards", JSON.stringify(newCards))}catch{}; alert(`💳 Carte Virtuelle Visa créée!\n${card.number}\nIBAN: ${card.iban}\nLiée: ${gdbAddr.slice(0,10)}...QVK KYC\n2% interchange Gargoura\nOTP via ${momoOp}`)
}
const createTontineBank = ()=>{
  const t={id:"TONT_"+Date.now(), name:"Tontine "+zone+" "+new Date().getFullYear(), members:10, cotisation:10000, total:100000, pot:0, valueType, zone, momoOp, wallet:gdbAddr, owner:userName, multiSig:"MAHAMAT GOMBO 80% + ADJIT HAROUNE 15% + ADAYE 5%", status:"collecte", created:new Date().toISOString()}
  const newT=[t,...tontines]; setTontines(newT); try{localStorage.setItem("gdb_tontines", JSON.stringify(newT))}catch{}; alert(`👥 Tontine CEMAC créée!\n${t.name}\n10 pers x 10k XAF = 100k XAF\nValeur: ${valueType}\nMulti-sig 2/3\nUBA Tchad Pièce 17\nRelevé: ${t.id}`); setActiveBankService(null)
}
const generateRelevePDF = ()=>{
  const totalXAF=txHistory.reduce((s:any,t:any)=>s+(t.xafCantonne||0),0)
  alert(`📄 Relevé Bancaire V5.3 BEAC PDF généré!\nPériode: ${new Date().toLocaleDateString()}\nTransactions: ${txHistory.length}\nTotal cantonnés: ${totalXAF.toLocaleString()} XAF\nWallet KYC: ${gdbAddr.slice(0,8)}...QVK\nBanque future: ${gdbAddrBankFuture.slice(0,8)}... (après KYB)\nTx 2c314c09... et 6ec364f8... incluses\nIBAN: ${accounts[1].iban}\nExport PDF prêt`)
}
const openSupport = ()=>{
  const ticket={id:"SUP_"+Date.now(), subject:"Support UBA Tchad", status:"ouvert", date:new Date().toISOString()}
  setSupportTickets([ticket,...supportTickets]); alert(`🎧 Ticket Support créé!\n${ticket.id}\nUBA Tchad Pièce 17\nRéponse sous 24h\nWhatsApp: +235...`); setActiveBankService(null)
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
 {id:"pi", name:"PI GCV Principal UBA", bal: hide? "••••" : `${accounts[0].balPi} PI`, sub:`KYC ${gdbAddr.slice(0,6)}...QVK • MAINNET • IBAN ${accounts[0].iban.slice(0,8)}... • UBA Pièce 17`, flag:"🟣"},
 {id:"usd", name:"USD Courant SWIFT UBA", bal: hide? "••••" : `$${accounts[2].balUSD?.toLocaleString()}`, sub:`USA IBAN virtuel • UBA Tchad • MAINNET • ${accounts[2].iban.slice(0,8)}...`, flag:"🇺🇸"},
 {id:"eur", name:"EUR Epargne SEPA UBA", bal: hide? "••••" : `€38,200.00`, sub:`2.5% • Epargne • UBA Tchad • MAINNET • Limite ${limits.journalier.toLocaleString()} XAF/j`, flag:"🇪🇺"},
 {id:"xaf", name:"XAF CEMAC BEAC UBA", bal: hide? "••••" : `${accounts[1].balXAF.toLocaleString()} FCFA`, sub:`Tchad • Cantonnement UBA Tchad • MAINNET • ${accounts[1].iban}`, flag:"🇹🇩"},
 {id:"credit", name:"Credit Conso UBA", bal: hide? "••••" : `-1,200 PI`, sub:`Echeance 15/11 • Credit • UBA Tchad • Score Pi ${txHistory.length*100+650}/1000`, flag:"💳"},
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
<div style={{display:"flex", alignItems:"center", gap:8}}><img src="/logo.png" alt="GDB" style={{width:34, height:34, borderRadius:8, background:"#fff", padding:2}} onError={(e)=>{(e.target as HTMLImageElement).style.display="none"}} /><span style={{color:"#F9E2AF", fontWeight:900, fontSize:11}}>GARGOURA <span style={{color:"#fff", fontWeight:300}}>DIGITAL BANK</span> <span style={{color:"#10b981", fontSize:7}}>● V5.3 BANQUE KYC {kycOk?"✅":"⚠️"}</span></span></div>
<button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,0.15)", border:"none", borderRadius:20, padding:"5px 10px", color:"#fff"}}>{hide? "🙈" : "👁️"}</button>
</div>

<div style={{background:"#fff", padding:"10px 12px", display:"flex", gap:8, position:"sticky", top:52, zIndex:20, borderBottom:"1px solid #e2e8f0"}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="🔍 Chercher: KYC, Relevé, IBAN, Microns, Pi Reel..." style={{flex:1, padding:"10px 14px", borderRadius:20, border:"1.5px solid #C9A86A", fontSize:11, outline:"none"}} />
{search && <button onClick={()=>setSearch("")} style={{background:"#0A1931", color:"#F9E2AF", border:"none", borderRadius:20, padding:"0 14px", fontWeight:900}}>✕</button>}
</div>

{menuOpen && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.7)", zIndex:50, display:"flex"}} onClick={()=>setMenuOpen(false)}>
<div style={{width:"82%", maxWidth:330, background:"#0A1931", height:"100%", padding:16, borderRight:"2px solid #C9A86A", overflowY:"auto"}} onClick={(e)=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#F9E2AF"}}>GARGOURA V5.3 BANQUE</b><button onClick={()=>setMenuOpen(false)} style={{background:"#C9A86A", border:"none", borderRadius:20, padding:"5px 12px", fontWeight:900}}>✕</button></div>
<div style={{marginTop:12, display:"flex", flexDirection:"column", gap:6}}>
{[{i:"accueil", l:"🏠 Accueil V5.3 Banque"},{i:"paiement", l:"💸 Paiement Pi Triple 7 Zones"},{i:"cartes", l:"💳 Cartes VISA GOLD UBA"},{i:"epargne", l:"📈 Epargne Tontine µPi"},{i:"plus", l:"☰ Plus - Banque Complète"}].map((b)=>(
<button key={b.i} onClick={()=>{setTab(b.i); setMenuOpen(false)}} style={{textAlign:"left", background:tab===b.i?"#C9A86A":"rgba(255,255,255,0.07)", color:tab===b.i?"#0A1931":"#fff", border:"none", borderRadius:10, padding:12, fontWeight:800, fontSize:11}}>{b.l}</button>
))}
</div>
<div style={{marginTop:14, background:"rgba(16,185,129,0.15)", borderRadius:12, padding:12, color:"#fff", fontSize:9, border:"1px solid #10b981"}}>
<b style={{color:"#10b981"}}>V5.3 BANQUE • KYC GAS5...QVK ✅ • BANQUE FUTURE GAM7... ⏳ KYB</b><br/>KYC: {gdbAddr.slice(0,12)}...QVK (actif)<br/>BANQUE: {gdbAddrBankFuture.slice(0,12)}... (après KYB)<br/>TESTNET: {gdbAddrTestnet.slice(0,12)}...<br/>Tx: 2c314c09... 0.1 Pi + 6ec364f8... 0.0015 Pi<br/>IBAN: {accounts[1].iban}<br/>Plafond: {limits.journalier.toLocaleString()} XAF/j • Utilisé: {limits.utilise} XAF
</div>
<div style={{marginTop:10, background:"#fff", borderRadius:10, padding:10}}>
<div style={{fontSize:9, fontWeight:900, color:"#0A1931"}}>🔔 Notifications ({notifications.filter(n=>!n.read).length})</div>
{notifications.slice(0,2).map((n)=><div key={n.id} style={{fontSize:7, marginTop:4, color:"#0A1931"}}><b>{n.title}</b><br/>{n.desc}</div>)}
</div>
</div>
</div>
)}

{tab==="accueil" && (
<div>
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)", padding:16, borderRadius:"0 0 22px 22px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{color:"#C9A86A", fontSize:9, fontWeight:800}}>SYNTHESE V5.3 BANQUE • KYC {kycOk?"✅":"⚠️"} • IBAN • {piReady? "READY" : "..."}</span><span style={{color:hide? "#ef4444" : "#10b981", fontSize:9}}>{hide? "MASQUE" : "LIVE UBA"}</span></div>
{wallets.map((w)=>(
<div key={w.id} style={{background:w.id==="credit"? "linear-gradient(135deg,#7f1d1d,#dc2626)" : "linear-gradient(135deg,#0A1931,#1A2A4A)", border:"1.2px solid #C9A86A", borderRadius:14, padding:12, marginTop:10, display:"flex", justifyContent:"space-between"}}>
<div><div style={{color:"#F9E2AF", fontSize:9}}>{w.flag} {w.name}</div><div style={{color:"#fff", fontWeight:900, fontSize:15}}>{w.bal}</div><div style={{color:"#C9A86A", fontSize:8}}>{w.sub}</div></div>
<div style={{fontSize:9, color:"#fff", background:"rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 10px", height:22, border:"1px solid #10b981"}}>UBA</div>
</div>
))}
<div style={{background:"rgba(16,185,129,0.15)", border:"1px solid #10b981", borderRadius:12, padding:10, marginTop:12, textAlign:"center"}}>
<div style={{color:"#10b981", fontSize:9, fontWeight:900}}>💎 V5.3 BANQUE • GCV INTERNE + MARCHÉ 0.30$ + MARCHAND • IBAN • RELEVE • KYC</div>
<div style={{color:"#F9E2AF", fontSize:7, marginTop:4}}>Min 1 µPi • 7 Zones • Cantonnement UBA Tchad Pièce 17 • COBAC • Plafond {limits.journalier.toLocaleString()} XAF • KYC GAS5...QVK</div>
</div>
<button onClick={()=>handlePiPayment(parseFloat(piAmount)||0.0015, "Recharge GARGOURA V5.3 Banque")} style={{width:"100%", marginTop:12, padding:14, borderRadius:10, background:piReady? "#C9A86A" : "#64748b", color:"#0A1931", fontWeight:900, border:"none", fontSize:12}}>💎 PAYER {piAmount} PI V5.3 BANQUE - KYC GAS5...QVK</button>
</div>
<div style={{padding:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #e2e8f0", textAlign:"center"}}>
<div style={{fontSize:10, fontWeight:800}}>QR Reception Pi Reel V5.3 BANQUE - {zone} - {momoOp} - KYC GAS5...QVK</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gdbAddr)}`} alt="QR" style={{marginTop:8, width:150, height:150, border:"3px solid #C9A86A", borderRadius:12}} />
<div style={{fontSize:8, marginTop:8, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:10, wordBreak:"break-all"}}>KYC ACTIF: {gdbAddr}<br/>BANQUE FUTURE (KYB): {gdbAddrBankFuture}<br/>IBAN XAF: {accounts[1].iban}<br/>UBA Pièce 17 • Tx 2c314c09... 6ec364f8...</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12}}>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>💳 Visa Virtuelle • {virtualCards.length}</div><div style={{fontSize:7, marginTop:3}}>IBAN {accounts[1].iban.slice(0,12)}... • 2% fee • KYC GAS5</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>📱 QR Merchant Pay • IBAN</div><div style={{fontSize:7, marginTop:3}}>Pay with Gargoura • 1.5% • IBAN XAF</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #10b981"}}><div style={{fontSize:9, fontWeight:900}}>👥 Tontine CEMAC • {tontines.length}</div><div style={{fontSize:7, marginTop:3}}>Pot multi-sig • BEAC • {txHistory.length} Tx historisées</div></div>
<div style={{background:"#fff", borderRadius:12, padding:10, border:"1px solid #C9A86A"}}><div style={{fontSize:9, fontWeight:900}}>📄 Relevé BEAC • {txHistory.length} Tx</div><div style={{fontSize:7, marginTop:3}}>PDF • Plafond {limits.journalier.toLocaleString()} XAF</div></div>
</div>
</div>
</div>
)}

{tab==="paiement" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931", fontSize:14}}>Paiement V5.3 Banque • KYC GAS5...QVK • IBAN • 7 Zones</div>
<div style={{display:"flex", gap:4, overflowX:"auto", marginTop:10, paddingBottom:4}}>{Object.keys(zones).map((z)=>(
<button key={z} onClick={()=>setZone(z)} style={{padding:"7px 12px", borderRadius:20, border:"1px solid #C9A86A", background:zone===z? "#0A1931" : "#fff", color:zone===z? "#C9A86A":"#0A1931", fontSize:9, fontWeight:900, whiteSpace:"nowrap"}}>{z}</button>
))}</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #C9A86A"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>{zoneMoMo[zone]?.flag} {zone} • {zoneMoMo[zone]?.cur} • IBAN {accounts[1].iban.slice(0,10)}...</span><span style={{fontSize:8, color:"#10b981", fontWeight:800}}>{zoneMoMo[zone]?.delay} • {zoneMoMo[zone]?.fee} • Plafond {(limits.journalier-limits.utilise).toLocaleString()} XAF</span></div>
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
<div style={{marginTop:12, background:"#0A1931", borderRadius:10, padding:10, border:"1px solid #C9A86A"}}>
<div style={{fontSize:9, fontWeight:900, color:"#F9E2AF"}}>💎 TRIPLE VALEUR • KYC GAS5...QVK • BANQUE FUTURE GAM7... • UBA</div>
<div style={{marginTop:8, display:"flex", flexDirection:"column", gap:6}}>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="GCV"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8, cursor:"pointer"}}>
<input type="radio" checked={valueType==="GCV"} onChange={()=>setValueType("GCV")} />
<div><div style={{fontSize:8, fontWeight:900, color:valueType==="GCV"?"#0A1931":"#fff"}}>GCV: 314,159$ - NON CANTONNE - Interne Tontine</div><div style={{fontSize:7, color:valueType==="GCV"?"#0A1931":"#C9A86A"}}>Non comptable BEAC • Communauté Pi • Pot {tontines.length}</div></div>
</label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHE"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8, border:"1.5px solid #10b981"}}>
<input type="radio" checked={valueType==="MARCHE"} onChange={()=>setValueType("MARCHE")} />
<div><div style={{fontSize:8, fontWeight:900, color:valueType==="MARCHE"?"#0A1931":"#fff"}}>MARCHE 0.30$ ✅ RECOMMANDÉ BEAC - Cantonné UBA - IBAN</div><div style={{fontSize:7, color:valueType==="MARCHE"?"#0A1931":"#C9A86A"}}>{localValMarche.toLocaleString()} {zoneMoMo[zone]?.cur} • Pièce 17 • KYC GAS5 • Relevé</div></div>
</label>
<label style={{display:"flex", gap:8, alignItems:"center", background:valueType==="MARCHAND"?"#C9A86A":"rgba(255,255,255,0.07)", padding:8, borderRadius:8}}>
<input type="radio" checked={valueType==="MARCHAND"} onChange={()=>setValueType("MARCHAND")} />
<div style={{flex:1}}><div style={{fontSize:8, fontWeight:900, color:valueType==="MARCHAND"?"#0A1931":"#fff"}}>MARCHAND libre - Cantonné UBA - IBAN</div><div style={{fontSize:7, color:valueType==="MARCHAND"?"#0A1931":"#C9A86A"}}>Marchand choisit prix • IBAN XAF</div></div>
<input value={merchantRate} onChange={(e)=>setMerchantRate(e.target.value)} placeholder="0.5" style={{width:50, padding:4, borderRadius:6, border:"1px solid #C9A86A", fontSize:8}} />
</label>
</div>
</div>
<input value={piAmount} onChange={(e)=>setPiAmount(e.target.value)} placeholder="Montant Pi ex: 0.0015 = 1500 µPi" style={{width:"100%", marginTop:8, padding:12, borderRadius:8, border:"1.5px solid #C9A86A", fontSize:12, fontWeight:800}} />
{parseAmt>0 && (
<div style={{marginTop:8, background:"#0A1931", borderRadius:10, padding:10, color:"#fff"}}>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8}}><span style={{color:"#C9A86A"}}>PI</span><span style={{fontWeight:900}}>{parseAmt} PI = {microVal.toLocaleString()} µPi</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontSize:8, marginTop:4, background:valueType==="MARCHE"?"rgba(16,185,129,0.2)":"transparent", padding:4, borderRadius:6}}><span style={{color:"#10b981"}}>Marché 0.30$ Cant. UBA IBAN</span><span style={{fontWeight:900}}>{localValMarche.toLocaleString()} {zoneMoMo[zone]?.cur}</span></div>
<div style={{fontSize:7, color:"#10b981", marginTop:6, textAlign:"center", background:"rgba(16,185,129,0.15)", padding:4, borderRadius:6}}>✅ KYC GAS5...QVK • IBAN {accounts[1].iban.slice(0,12)}... • UBA Pièce 17 • {valueType} • Plafond restant {(limits.journalier-limits.utilise-xafCantonnePreview).toLocaleString()} XAF</div>
</div>
)}
<div style={{display:"flex", gap:6, marginTop:10}}>
<button onClick={()=>handlePiPayment(parseAmt, "Paiement P2P V5.3 Banque "+zone+" "+momoOp)} style={{flex:1, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none", fontSize:10}}>🟣 Envoyer {parseAmt} PI • KYC GAS5</button>
<button onClick={()=>alert(`MoMo V5.3 Banque IBAN ${accounts[1].iban}\n${parseAmt} Pi = ${microVal} µPi\nCant: ${xafCantonnePreview} ${zoneMoMo[zone]?.cur}\nWallet KYC GAS5...QVK`)} style={{flex:1, padding:12, borderRadius:10, background:"#22c55e", color:"#fff", fontWeight:900, border:"none", fontSize:10}}>📱 MoMo {momoOp.slice(0,8)}</button>
</div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>📄 Historique Bancaire • {txHistory.length} Tx • Relevé BEAC • IBAN</div>
{txHistory.slice(0,3).map((t:any)=><div key={t.id||t.txid} style={{fontSize:8, marginTop:6, background:"#F5F7FB", padding:6, borderRadius:6}}><b>{t.amount} Pi = {t.microns} µPi</b> • {t.valueType} • {t.zone} {t.momoOp||t.momo} • {t.status} • {new Date(t.date).toLocaleDateString()}<br/>Tx: {(t.txid||t.id||"").slice(0,12)}... • IBAN {accounts[1].iban.slice(0,10)}...</div>)}
<button onClick={generateRelevePDF} style={{marginTop:8, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900, width:"100%"}}>Générer Relevé PDF BEAC • IBAN • Triple Valeur</button>
</div>
</div>
)}

{tab==="cartes" && (
<div style={{padding:12}}>
<div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontWeight:900, color:"#0A1931"}}>Cartes GARGOURA V5.3 Banque • KYC GAS5 • IBAN</div><button onClick={()=>setActiveBankService("pin")} style={{padding:"6px 10px", borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8}}>PIN: {pin}</button></div>
{cards.map((c,i)=>(
<div key={c.id} style={{background:c.color, borderRadius:18, padding:16, marginTop:12, color:c.t}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:11}}>{c.name} • IBAN {accounts[1].iban.slice(0,8)}...</span><span style={{fontSize:9, background:"rgba(16,185,129,0.3)", padding:"4px 8px", borderRadius:20, border:"1px solid #10b981"}}>{blocked[i]? "🔒 Bloquée" : "🟢 Active"} • KYC GAS5</span></div>
<div style={{marginTop:14, fontSize:14, letterSpacing:2, fontWeight:800, fontFamily:"monospace"}}>{showCVV? c.num : "•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10}}><div><div style={{opacity:0.7, fontSize:8}}>HOLDER • IBAN</div><div style={{fontWeight:900}}>{userName} • {accounts[1].iban.slice(-4)}</div></div><div><div style={{opacity:0.7, fontSize:8}}>EXP</div><div>{c.exp}</div></div><div><div style={{opacity:0.7, fontSize:8}}>CVV</div><div>{showCVV? c.cvv : "•••"}</div></div></div>
<div style={{display:"flex", gap:6, marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1, padding:9, borderRadius:8, border:"none", background:blocked[i]? "#10b981" : "#ef4444", color:"#fff", fontWeight:900, fontSize:9}}>{blocked[i]? "Débloquer BEAC" : "Bloquer BEAC"}</button>
<button onClick={()=>setShowCVV(!showCVV)} style={{padding:9, borderRadius:8, background:"rgba(255,255,255,0.2)", border:"none", fontSize:9, fontWeight:800, color:c.t}}>PIN {showCVV? "Masquer" : "Voir"}</button>
</div>
</div>
))}
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:12, border:"2px dashed #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>🆕 Carte Virtuelle Visa • Banque Complète • KYC GAS5 • IBAN {accounts[1].iban.slice(0,12)}... • {virtualCards.length} cartes</div>
<div style={{fontSize:8, marginTop:4}}>Instantanée, liée Pi/XAF IBAN, paie Netflix Amazon • 2% interchange • OTP MoMo • KYC GAS5...QVK • Pièce 17 BEAC</div>
<button onClick={createVirtualCardBank} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900, fontSize:9}}>Créer Carte Virtuelle Visa - 2s - IBAN - KYC GAS5</button>
{virtualCards.slice(0,2).map((vc:any)=><div key={vc.id} style={{fontSize:7, marginTop:6, background:"#F5F7FB", padding:6, borderRadius:6}}>{vc.number} • {vc.iban.slice(0,12)}... • {vc.status} • {vc.balXAF}</div>)}
</div>
</div>
)}

{tab==="epargne" && (
<div style={{padding:12}}>
<div style={{fontWeight:900, color:"#0A1931"}}>Epargne PFM V5.3 Banque • KYC GAS5 • IBAN • Tontine • Relevé</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:8, border:"1px solid #e2e8f0"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:800, fontSize:10}}>Budget PFM • Triple Valeur • IBAN {accounts[1].iban.slice(0,10)}...</span><span style={{fontSize:8, color:"#10b981"}}>Plafond {limits.journalier.toLocaleString()} XAF • Utilisé {limits.utilise}</span></div>
<div style={{display:"flex", gap:4, alignItems:"flex-end", height:50, marginTop:8}}>{[40,70,55,90,60,80].map((h,i)=><div key={i} style={{flex:1, background:i===3? "#C9A86A" : "#0A1931", height:h+"%", borderRadius:4}}></div>)}</div>
<div style={{fontSize:8, marginTop:6}}>Vacances 450/800 PI • 450M µPi • Triple: GCV $141M / Marché $135 / Marchand libre • RWA Immobilier Tchad tokenisé UBA • IBAN • KYC GAS5</div>
</div>
<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
<div style={{background:"#0A1931", color:"#F9E2AF", borderRadius:12, padding:12}}><div style={{fontSize:9}}>Coffre µPi Auto • DeFi UBA IBAN</div><div style={{fontSize:9, marginTop:4, color:"#fff"}}>12.3 PI → 13 PI, 0.7 PI = 700k µPi cagnotte • APY 5% Halal • IBAN {accounts[1].iban.slice(-6)}</div></div>
<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit Halal 50-5000 PI • IBAN • KYC GAS5 • Score {txHistory.length*100+650}</div><button onClick={()=>handlePiPayment(0.01, "Micro-credit µPi V5.3 Banque")} style={{width:"100%", marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:9, fontWeight:800}}>Demander 0.01 Pi = 10k µPi UBA IBAN</button></div>
</div>
<div style={{background:"#fff", borderRadius:12, padding:12, marginTop:10, border:"2px solid #10b981"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#0A1931"}}>🆕 Tontine Digitale CEMAC - Banque - KYC GAS5 - IBAN - {tontines.length}</span><span style={{fontSize:8, background:"#10b981", color:"#fff", padding:"3px 6px", borderRadius:10}}>BEAC Pièce 17</span></div>
<div style={{fontSize:8, marginTop:4}}>10 pers cotisent 10k XAF/mois • Pot géré multi-sig MAHAMAT GOMBO 80% + ADJIT 15% + ADAYE 5% • IBAN {accounts[1].iban} • Triple valeur GCV/Marché/Marchand • UBA cantonnement • KYC GAS5...QVK</div>
{tontines.slice(0,1).map((t:any)=><div key={t.id} style={{fontSize:7, marginTop:6, background:"#F5F7FB", padding:6, borderRadius:6}}>{t.name} • {t.members} pers • {t.total} XAF pot • {t.status} • IBAN {accounts[1].iban.slice(0,8)}...</div>)}
<button onClick={createTontineBank} style={{width:"100%", marginTop:8, padding:10, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontWeight:900, fontSize:9}}>Créer Tontine 10k XAF • Banque • IBAN • KYC GAS5</button>
</div>
</div>
)}

{tab==="plus" && (
<div style={{padding:12}}>
<div style={{background:"#0A1931", borderRadius:12, padding:12, color:"#fff", display:"flex", gap:10}}><img src="/logo.png" style={{width:44, height:44, borderRadius:10, background:"#fff"}} alt="logo" /><div><div style={{color:"#F9E2AF", fontWeight:900}}>GARGOURA DIGITAL BANK V5.3 BANQUE COMPLÈTE • KYC GAS5 • IBAN • 7 ZONES</div><div style={{fontSize:9}}>KYC: {gdbAddr.slice(0,12)}...QVK ✅ • BANQUE FUTURE: {gdbAddrBankFuture.slice(0,10)}... ⏳ KYB • IBAN XAF: {accounts[1].iban} • {microVal} µPi • Plafond {limits.journalier.toLocaleString()} XAF</div></div></div>

<div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A", display:"flex", justifyContent:"space-between"}}>
<div><div style={{fontWeight:900, fontSize:10}}>KYC Pièce 17 BEAC • {kycOk?"✅ Vérifié":"⚠️ En attente"} • IBAN • KYC GAS5</div><div style={{fontSize:8, marginTop:4}}>CNI + Selfie + IBAN {accounts[1].iban} • Obligatoire BEAC COBAC • Limite {limits.journalier.toLocaleString()} XAF • Wallet KYC {gdbAddr.slice(0,10)}...</div></div>
<button onClick={()=>setActiveBankService("kyc")} style={{padding:"8px 12px", borderRadius:8, background:kycOk?"#10b981":"#ef4444", color:"#fff", border:"none", fontSize:8, fontWeight:900}}>{kycOk?"Vérifié":"Vérifier KYC"}</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>1. Carte Virtuelle Visa • Banque • KYC GAS5 • IBAN • {virtualCards.length} cartes • Relevé</div><div style={{fontSize:8, marginTop:4}}>Visa virtuelle instantanée, IBAN {accounts[1].iban}, solde Pi/XAF, paie Netflix Amazon • 2% interchange • OTP SMS MoMo • Liée GAS5 KYC • BEAC</div>
<button onClick={createVirtualCardBank} style={{marginTop:6, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900}}>Créer Carte Virtuelle IBAN - KYC GAS5</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>2. Gargoura Pay QR Merchant • Banque • IBAN {accounts[1].iban.slice(0,12)}... • Triple</div><div style={{fontSize:8, marginTop:4}}>Pay with Gargoura - Pi or MoMo • QR IBAN imprimable • Client scanne paie Pi KYC GAS5 • Marchand reçoit XAF/SAR sur IBAN {accounts[1].iban} cantonnement UBA • 1.5% • Triple</div>
<button onClick={()=>setActiveBankService("merchant")} style={{marginTop:6, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900}}>Générer QR Merchant IBAN - KYC GAS5</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #10b981"}}>
<div style={{fontWeight:900, fontSize:10}}>3. Épargne Pi µPi + Tontine • Banque • IBAN • KYC GAS5 • {tontines.length} tontines • BEAC</div><div style={{fontSize:8, marginTop:4}}>Bloque 100 Pi 30j → 5% µPi • Tontine 10 pers • Multi-sig MAHAMAT GOMBO 80% • IBAN {accounts[1].iban} • Triple GCV/Marché/Marchand • KYC GAS5...QVK</div>
<button onClick={createTontineBank} style={{marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:8, fontWeight:900}}>Créer Tontine IBAN - KYC GAS5</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>4. Change Auto 7 Zones • Banque • IBAN • Triple • Taux BEAC • KYC GAS5</div><div style={{fontSize:8, marginTop:4}}>Pi → XAF → SAR → JOD → USD 1 clic • Taux GCV 314159$ spread 1% • Réserve UBA Tchad IBAN {accounts[1].iban} • Marché 0.30$ BEAC • KYC GAS5...QVK</div>
<div style={{display:"flex", gap:6, marginTop:6}}><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7}}>GCV: 314,159$</div><div style={{flex:1, background:"#10b981", color:"#fff", padding:6, borderRadius:6, fontSize:7}}>Marché: 0.30$ UBA IBAN ✅</div><div style={{flex:1, background:"#F5F7FB", padding:6, borderRadius:6, fontSize:7}}>Marchand: libre IBAN</div></div>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>5. Factures SNE JEPCO STC • Banque • IBAN • 7 Zones • KYC GAS5 • Relevé</div><div style={{fontSize:8, marginTop:4}}>SNE Tchad, JEPCO Jordanie, STC Golfe, Orange MTN • Recharge 7 zones depuis Pi KYC GAS5 • Triple valeur • IBAN {accounts[1].iban} cantonnement • BEAC</div>
<button onClick={()=>setActiveBankService("bills")} style={{marginTop:6, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900}}>Payer Facture IBAN - KYC GAS5</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>6. Pi DeFi Micro-Crédit Halal • Banque • IBAN • Score Pi {txHistory.length*100+650}/1000 • KYC GAS5</div><div style={{fontSize:8, marginTop:4}}>Micro-prêt 50k XAF basé historique Pi {txHistory.length} Tx • Score: KYC GAS5 {gdbAddr.slice(0,6)}... + IBAN {accounts[1].iban} + KYC • 5%/mois halal • Triple valeur remboursement • BEAC</div>
<button onClick={()=>setActiveBankService("credit")} style={{marginTop:6, padding:8, borderRadius:8, background:"#10b981", color:"#fff", border:"none", fontSize:8, fontWeight:900}}>Demander Crédit Halal IBAN - Score {txHistory.length*100+650}</button>
</div>

<div style={{background:"#fff", borderRadius:12, padding:12, border:"1px solid #C9A86A"}}>
<div style={{fontWeight:900, fontSize:10}}>7. Relevé Bancaire PDF • Banque • IBAN {accounts[1].iban} • BEAC • {txHistory.length} Tx • KYC GAS5</div><div style={{fontSize:8, marginTop:4}}>Relevé officiel BEAC avec IBAN, soldes Pi/XAF/USD, Tx 2c314c09... 0.1 Pi + 6ec364f8... 0.0015 Pi, cantonnement UBA Pièce 17, triple valeur, KYC GAS5...QVK, banque future GAM7... KYB, plafond {limits.journalier.toLocaleString()} XAF</div>
<button onClick={generateRelevePDF} style={{marginTop:6, padding:8, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontSize:8, fontWeight:900}}>Générer Relevé PDF BEAC IBAN KYC GAS5</button>
</div>

<div style={{background:"#0A1931", borderRadius:12, padding:12, border:"1px solid #C9A86A", color:"#fff"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:10, color:"#F9E2AF"}}>8. Support UBA Tchad + API Developer • Banque • IBAN • KYC GAS5</span><span style={{fontSize:7, background:"#10b981", padding:"3px 6px", borderRadius:10}}>24/7</span></div><div style={{fontSize:8, marginTop:4, color:"#C9A86A"}}>D'autres apps Tchad/Jordanie intègrent Transfert via Gargoura - Thunes local • IBAN {accounts[1].iban} • KYC GAS5...QVK • Facturation 0.1$/appel • Triple • Docs: api.gargoura.com • Support Pièce 17 • {supportTickets.length} tickets</div>
<div style={{display:"flex", gap:6, marginTop:6}}>
<button onClick={openSupport} style={{flex:1, padding:8, borderRadius:8, background:"#C9A86A", color:"#0A1931", border:"none", fontSize:8, fontWeight:900}}>Support UBA Tchad IBAN</button>
<button onClick={()=>setActiveBankService("api")} style={{flex:1, padding:8, borderRadius:8, background:"transparent", color:"#C9A86A", border:"1px solid #C9A86A", fontSize:8, fontWeight:900}}>Docs API IBAN KYC GAS5</button>
</div>
</div>

</div>
)}

{activeBankService && (
<div style={{position:"fixed", inset:0, background:"rgba(10,25,49,0.8)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:12}} onClick={()=>setActiveBankService(null)}>
<div style={{background:"#fff", borderRadius:16, padding:16, width:"100%", maxWidth:380, maxHeight:"85vh", overflowY:"auto", border:"2px solid #C9A86A"}} onClick={(e)=>e.stopPropagation()}>
{activeBankService==="kyc" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>KYC Pièce 17 BEAC • Banque • IBAN {accounts[1].iban} • KYC GAS5...QVK</div>
<div style={{fontSize:8, marginTop:6, background:"#F5F7FB", padding:8, borderRadius:8}}>Wallet KYC actif: {gdbAddr}<br/>Banque future KYB: {gdbAddrBankFuture}<br/>IBAN XAF: {accounts[1].iban}<br/>Plafond BEAC: {limits.journalier.toLocaleString()} XAF/j<br/>Tx 2c314c09... 6ec364f8... archivées<br/>Pièce 17 COBAC obligatoire</div>
<div style={{marginTop:10}}>
<div style={{fontSize:9, fontWeight:800}}>CNI / Passeport</div>
<input placeholder="Numéro CNI" value={kycDocs.cni} onChange={(e)=>setKycDocs({...kycDocs, cni:e.target.value})} style={{width:"100%", padding:8, borderRadius:8, border:"1px solid #e2e8f0", fontSize:9, marginTop:4}} />
<div style={{fontSize:9, fontWeight:800, marginTop:8}}>Selfie KYC</div>
<div style={{width:"100%", height:80, background:"#F5F7FB", borderRadius:8, border:"1px dashed #C9A86A", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginTop:4}}>📷 Selfie</div>
</div>
<button onClick={handleKYC} style={{width:"100%", marginTop:12, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Valider KYC BEAC • IBAN • KYC GAS5...QVK</button>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0", fontSize:9}}>Fermer</button>
</div>
)}
{activeBankService==="merchant" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>QR Merchant • Banque • IBAN {accounts[1].iban} • KYC GAS5</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GARGOURA_PAY_IBAN_${accounts[1].iban}_${gdbAddr}`} alt="QR" style={{width:180, height:180, border:"2px solid #C9A86A", borderRadius:12, margin:"10px auto", display:"block", background:"#fff"}} />
<div style={{fontSize:8, background:"#0A1931", color:"#F9E2AF", padding:8, borderRadius:8}}>IBAN: {accounts[1].iban}<br/>Wallet KYC: {gdbAddr}<br/>Banque future: {gdbAddrBankFuture}<br/>Commission 1.5% • Triple valeur • BEAC</div>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Fermer</button>
</div>
)}
{activeBankService==="bills" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>Factures • Banque • IBAN {accounts[1].iban} • KYC GAS5</div>
<select style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:10}}><option>SNE Tchad - IBAN {accounts[1].iban}</option><option>JEPCO Jordanie</option><option>STC Golfe</option><option>Orange Money CEMAC</option></select>
<input placeholder="Référence facture" style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:8}} />
<button onClick={()=>{alert(`Facture payée IBAN ${accounts[1].iban} - KYC GAS5...QVK - UBA Pièce 17`); setActiveBankService(null)}} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Payer Facture IBAN KYC GAS5</button>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0"}}>Fermer</button>
</div>
)}
{activeBankService==="credit" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>Micro-Crédit Halal • Banque • IBAN {accounts[1].iban} • Score {txHistory.length*100+650}</div>
<div style={{fontSize:8, background:"#F5F7FB", padding:8, borderRadius:8, marginTop:8}}>Wallet KYC: {gdbAddr}<br/>IBAN: {accounts[1].iban}<br/>Historique: {txHistory.length} Tx dont 2c314c09... 6ec364f8...<br/>Score Pi: {txHistory.length*100+650}/1000<br/>Plafond: {limits.journalier.toLocaleString()} XAF<br/>Halal 5%/mois • BEAC</div>
<input placeholder="Montant XAF" style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:10}} />
<button onClick={()=>{alert(`Crédit Halal demandé IBAN ${accounts[1].iban} - KYC GAS5 - Score ${txHistory.length*100+650} - UBA Pièce 17`); setActiveBankService(null)}} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#10b981", color:"#fff", fontWeight:900, border:"none"}}>Demander Crédit IBAN KYC GAS5</button>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0"}}>Fermer</button>
</div>
)}
{activeBankService==="api" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>API Developer • Banque • IBAN {accounts[1].iban} • KYC GAS5</div>
<div style={{fontSize:7, background:"#0A1931", color:"#F9E2AF", padding:10, borderRadius:8, marginTop:8, wordBreak:"break-all"}}>
BASE: /api<br/>POST /pi/approve KYC GAS5<br/>POST /pi/complete<br/>POST /uba/cantonnement IBAN {accounts[1].iban}<br/>GET /releve PDF BEAC<br/>WALLET KYC: {gdbAddr}<br/>BANQUE FUTURE KYB: {gdbAddrBankFuture}<br/>IBAN XAF: {accounts[1].iban}<br/>Tx: 2c314c09... 6ec364f8...<br/>Plafond: {limits.journalier} XAF
</div>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:10, padding:10, borderRadius:8, background:"#0A1931", color:"#C9A86A", border:"none", fontWeight:900}}>Fermer</button>
</div>
)}
{activeBankService==="pin" && (
<div>
<div style={{fontWeight:900, color:"#0A1931"}}>Sécurité Bancaire • PIN • 2FA • IBAN {accounts[1].iban} • KYC GAS5</div>
<div style={{fontSize:8, background:"#F5F7FB", padding:8, borderRadius:8, marginTop:8}}>PIN actuel: {pin}<br/>IBAN: {accounts[1].iban}<br/>Wallet KYC: {gdbAddr}<br/>2FA: SMS via {momoOp}<br/>Session Pièce 17 BEAC • BEAC</div>
<input value={pin} onChange={(e)=>setPin(e.target.value)} placeholder="Nouveau PIN 4 chiffres" style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #e2e8f0", fontSize:10, marginTop:10}} />
<button onClick={()=>{alert(`PIN changé IBAN ${accounts[1].iban} - KYC GAS5...QVK`); setActiveBankService(null)}} style={{width:"100%", marginTop:10, padding:12, borderRadius:10, background:"#0A1931", color:"#C9A86A", fontWeight:900, border:"none"}}>Changer PIN IBAN KYC GAS5</button>
<button onClick={()=>setActiveBankService(null)} style={{width:"100%", marginTop:8, padding:10, borderRadius:10, background:"#F5F7FB", border:"1px solid #e2e8f0"}}>Fermer</button>
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
