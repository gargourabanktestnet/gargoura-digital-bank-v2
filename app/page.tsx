// @ts-nocheck
"use client"
import { useState, useEffect } from "react"

function genGDB(){return "GDB-"+new Date().getFullYear()+"-"+Math.floor(100000+Math.random()*900000)}

const LANGS={
  FR:{flag:"🇫🇷",name:"Français"},EN:{flag:"🇬🇧",name:"English"},AR:{flag:"🇸🇦",name:"العربية"},ES:{flag:"🇪🇸",name:"Español"},ZH:{flag:"🇨🇳",name:"中文"},HA:{flag:"🇹🇩",name:"Hausa"},
}

const MONNAIES=["PI - 314159 USD","XAF CEMAC","XOF UEMOA","USD","EUR","AED Golfe","JOD Jordanie","BTC","USDT","GDB Token"]
const ZONES=["CEMAC","UEMOA","Dollar","Jordanie","Golfe","Moyen-Orient","International"]

const BANQUES={
  "CEMAC":["Afriland First Bank Cameroun","UBA Tchad","BGFI Gabon","BICEC Cameroun","Ecobank CEMAC","Commercial Bank Tchad"],
  "UEMOA":["BOA Senegal","Ecobank Cote dIvoire","Coris Bank Burkina","NSIA Benin","Banque Atlantique Togo","BCEAO"],
  "Dollar":["Chase Bank USA","Bank of America USA","Citi Bank USA","Wells Fargo USA"],
  "Jordanie":["Arab Bank Jordan","Jordan Islamic Bank","Cairo Amman Bank"],
  "Golfe":["ADCB UAE","Al Rajhi Bank Saudi","QNB Qatar","NBK Kuwait","Ahli Bank Oman"],
  "Moyen-Orient":["Bank Audi Liban","BLOM Liban","Bank of Palestine","National Bank Egypt"],
  "International":["BNP Paribas France","Deutsche Bank Germany","HSBC UK","Santander Spain"]
}

const TR={
FR:{bank:"GARGOURA DIGITAL BANK",solde:"Solde Total",system:"Système en ligne • 12 modules actifs",func:"Fonctionnalités Courantes • 12",allFunc:"Toutes fonctionnelles • Sans réduction",envoyer:"Envoyer",recevoir:"Recevoir",accueil:"Accueil",services:"Services",innovation:"Innovation",wallet:"Wallet",securite:"Sécurité",support:"Support",transTitle:"Transférer",p2pInterne:"P2P INTERNE",p2pExterne:"P2P EXTERNE",numCompte:"Numéro du Compte Bancaire",choisirMonnaie:"Liste des monnaies",montant:"Montant à envoyer",motif:"Motif du Transfert (Optionnel)",btnEnvoyer:"Envoyer",noteInterne:"Les transactions sont instantanées et interopérables.",zoneTransfert:"Zone de Transfert",choisirBanque:"Choisir le nom de la banque",numCompteExt:"Entrer le numéro de compte",choisirMonnaieExt:"Choisir la monnaie (Numérique/Devises Locales)",montantExt:"Le montant à transférer",motifExt:"Le Motif du Transfert (Optionnel)",btnExterne:"Transférer Vers Banque Externe",noteExterne:"Transfert instantané via système interopérable - Conforme ISO 20022 • SWIFT • SEPA"},
EN:{bank:"GARGOURA DIGITAL BANK",solde:"Total Balance",system:"System online • 12 modules",func:"Common Features • 12",allFunc:"All functional • No reduction",envoyer:"Send",recevoir:"Receive",accueil:"Home",services:"Services",innovation:"Innovation",wallet:"Wallet",securite:"Security",support:"Support",transTitle:"Transfer",p2pInterne:"P2P INTERNAL",p2pExterne:"P2P EXTERNAL",numCompte:"Bank Account Number",choisirMonnaie:"Currency List",montant:"Amount to send",motif:"Transfer Reason (Optional)",btnEnvoyer:"Send",noteInterne:"Transactions are instant and interoperable.",zoneTransfert:"Transfer Zone",choisirBanque:"Choose bank name",numCompteExt:"Enter account number",choisirMonnaieExt:"Choose currency",montantExt:"Amount to transfer",motifExt:"Transfer Reason (Optional)",btnExterne:"Transfer to External Bank",noteExterne:"Instant transfer via interoperable system - ISO 20022 • SWIFT • SEPA"},
AR:{bank:"بنك غرغورا الرقمي",solde:"الرصيد الإجمالي",system:"النظام متصل • 12 وحدة نشطة",func:"الميزات الشائعة • 12",allFunc:"كلها فعالة • بدون تقليص",envoyer:"إرسال",recevoir:"استلام",accueil:"الرئيسية",services:"الخدمات",innovation:"الابتكار",wallet:"المحفظة",securite:"الأمان",support:"الدعم",transTitle:"تحويل",p2pInterne:"P2P داخلي",p2pExterne:"P2P خارجي",numCompte:"رقم الحساب المصرفي",choisirMonnaie:"قائمة العملات",montant:"المبلغ المراد إرساله",motif:"سبب التحويل (اختياري)",btnEnvoyer:"إرسال",noteInterne:"المعاملات فورية وقابلة للتشغيل البيني.",zoneTransfert:"منطقة التحويل",choisirBanque:"اختر اسم البنك",numCompteExt:"أدخل رقم الحساب",choisirMonnaieExt:"اختر العملة",montantExt:"المبلغ المراد تحويله",motifExt:"سبب التحويل (اختياري)",btnExterne:"تحويل إلى بنك خارجي",noteExterne:"تحويل فوري عبر نظام قابل للتشغيل البيني - ISO 20022 • SWIFT • SEPA"},
ES:{bank:"GARGOURA DIGITAL BANK",solde:"Saldo Total",system:"Sistema en línea • 12 módulos",func:"Funciones Comunes • 12",allFunc:"Todas funcionales",envoyer:"Enviar",recevoir:"Recibir",accueil:"Inicio",services:"Servicios",innovation:"Innovación",wallet:"Billetera",securite:"Seguridad",support:"Soporte",transTitle:"Transferir",p2pInterne:"P2P INTERNO",p2pExterne:"P2P EXTERNO",numCompte:"Número de Cuenta Bancaria",choisirMonnaie:"Lista de monedas",montant:"Monto a enviar",motif:"Motivo (Opcional)",btnEnvoyer:"Enviar",noteInterne:"Transacciones instantáneas e interoperables.",zoneTransfert:"Zona de Transferencia",choisirBanque:"Elegir banco",numCompteExt:"Ingresar número de cuenta",choisirMonnaieExt:"Elegir moneda",montantExt:"Monto a transferir",motifExt:"Motivo (Opcional)",btnExterne:"Transferir a Banco Externo",noteExterne:"Transferencia instantánea vía sistema interoperable"},
ZH:{bank:"GARGOURA数字银行",solde:"总余额",system:"系统在线 • 12模块",func:"常用功能 • 12",allFunc:"全部功能",envoyer:"发送",recevoir:"接收",accueil:"首页",services:"服务",innovation:"创新",wallet:"钱包",securite:"安全",support:"支持",transTitle:"转账",p2pInterne:"内部P2P",p2pExterne:"外部P2P",numCompte:"银行账号",choisirMonnaie:"货币列表",montant:"发送金额",motif:"转账原因（可选）",btnEnvoyer:"发送",noteInterne:"交易即时且可互操作。",zoneTransfert:"转账区",choisirBanque:"选择银行",numCompteExt:"输入账号",choisirMonnaieExt:"选择货币",montantExt:"转账金额",motifExt:"原因（可选）",btnExterne:"转至外部银行",noteExterne:"通过可互操作系统即时转账"},
HA:{bank:"GARGOURA DIGITAL BANK",solde:"Jimlar Ma-auni",system:"Tsarin yana kan layi • 12 modules",func:"Abubuwan gama gari • 12",allFunc:"Duka suna aiki",envoyer:"Aika",recevoir:"Karba",accueil:"Gida",services:"Sabis",innovation:"Kirkira",wallet:"Wallet",securite:"Tsaro",support:"Tallafi",transTitle:"Transfer",p2pInterne:"P2P NA CIKI",p2pExterne:"P2P NA WAJE",numCompte:"Lambar Asusun Banki",choisirMonnaie:"Jerin kudade",montant:"Kudin da za a aika",motif:"Dalilin (Zaɓi)",btnEnvoyer:"Aika",noteInterne:"Ma'amaloli suna nan take kuma suna aiki tare.",zoneTransfert:"Yankin Transfer",choisirBanque:"Zaɓi banki",numCompteExt:"Shigar da lambar asusun",choisirMonnaieExt:"Zaɓi kudin",montantExt:"Kudin da za a canja",motifExt:"Dalili (Zaɓi)",btnExterne:"Transfer zuwa Bankin Waje",noteExterne:"Transfer nan take ta tsarin aiki tare"},
}

export default function Page(){
const [gdb,setGdb]=useState("GDB-2026-433422")
const [m,setM]=useState("")
const [a,setA]=useState("accueil")
const [lang,setLang]=useState("FR")
const [logoErr,setLogoErr]=useState(false)
const [transferTab,setTransferTab]=useState("INTERNE")
const [zone,setZone]=useState("CEMAC")
const [bankSel,setBankSel]=useState(BANQUES["CEMAC"][0])
const t=TR[lang]||TR.FR

useEffect(function(){
  try{
    var x=localStorage.getItem("gdb_account"); if(x) setGdb(x); else{var n=genGDB(); setGdb(n); localStorage.setItem("gdb_account",n)}
    var l=localStorage.getItem("gdb_lang"); if(l && TR[l]) setLang(l)
  }catch(e){setGdb(genGDB())}
},[])
function changeLang(l){setLang(l); try{localStorage.setItem("gdb_lang",l)}catch(e){}}
function open(s){setA(s); if(s==="accueil") setM(""); else setM(s)}
useEffect(function(){ setBankSel(BANQUES[zone][0]) },[zone])

const funcs=[
{id:"transferer",l:"Transférer"},{id:"virement",l:"Virement"},{id:"pidex",l:"Pi DEX"},{id:"convertir",l:"Convertir"},
{id:"trading",l:"Trading"},{id:"aiAutomation",l:"AI Auto"},{id:"blockchain",l:"Blockchain"},{id:"shopping",l:"Shopping"},
{id:"portefeuilles",l:"Portefeuilles"},{id:"automobile",l:"Automobile"},{id:"agregation",l:"Agrégation"},{id:"gestion",l:"Gestion"},
]

return(
<div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"system-ui",paddingBottom:110}}>
<div style={{background:"#1e40af",color:"#fff",padding:"10px 12px",position:"sticky",top:0,zIndex:30,borderBottom:"3px solid #facc15",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  <div style={{fontWeight:900,fontSize:11}}>Gargoura • {gdb.slice(0,10)} • 1 PI = 314,159 USD • {lang}</div>
  <div style={{display:"flex",gap:4}}>{Object.keys(LANGS).map(function(l){return (<button key={l} onClick={function(){changeLang(l)}} style={{border:lang===l?"2px solid #facc15":"1px solid rgba(255,255,255,0.3)",background:lang===l?"#facc15":"rgba(255,255,255,0.1)",color:lang===l?"#1e3a8a":"#fff",borderRadius:6,padding:"2px 5px",fontSize:9,fontWeight:800}}>{LANGS[l].flag}</button>)})}</div>
</div>

<div style={{padding:14,display:"flex",flexDirection:"column",gap:12}}>
<div style={{background:"#fff",border:"2px solid #facc15",borderRadius:20,padding:14,display:"flex",flexDirection:"column",alignItems:"center"}}>
{!logoErr? (<img src="/logo.png" alt="GDB" onError={function(){setLogoErr(true)}} style={{width:60,height:60,borderRadius:30,border:"3px solid #facc15"}} />):(<div style={{width:60,height:60,borderRadius:30,background:"#1e3a8a",border:"3px solid #facc15",display:"flex",alignItems:"center",justifyContent:"center",color:"#facc15",fontWeight:900}}>GDB</div>)}
<div style={{fontWeight:900,marginTop:6,fontSize:13}}>{t.bank}</div><div style={{fontSize:9,color:"#64748b"}}>{gdb} • ISO20022 • PI 314159 USD • {LANGS[lang].name}</div>
</div>

<div style={{background:"#1e3a8a",borderRadius:20,padding:14,color:"#fff"}}>
<div style={{fontSize:12}}>{t.solde} • {gdb.slice(0,12)}</div>
<div style={{fontWeight:900,fontSize:22,marginTop:6}}>1 PI = 314 159,00 USD</div>
<div style={{display:"flex",alignItems:"center",gap:6,marginTop:8}}><div style={{width:8,height:8,background:"#22c55e",borderRadius:8}}></div><div style={{fontSize:10,color:"#86efac",fontWeight:700}}>{t.system} • {gdb.slice(0,8)}</div></div>
<div style={{display:"flex",gap:8,marginTop:12}}><button onClick={function(){open("transferer")}} style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>{t.envoyer}</button><button onClick={function(){open("receive")}} style={{flex:1,background:"#fff",color:"#1e3a8a",border:"none",borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>{t.recevoir}</button></div>
</div>

<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:16,padding:12}}>
<div style={{fontWeight:900,fontSize:13}}>{t.func}</div>
<div style={{fontSize:9,color:"#64748b",marginTop:2}}>{t.allFunc}</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:10}}>
{funcs.map(function(f){return (<button key={f.id} onClick={function(){open(f.id)}} style={{border:f.id===a?"2px solid #1e40af":"1px solid #e2e8f0",background:f.id===a?"#dbeafe":"#fff",borderRadius:12,padding:"8px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{fontSize:10,fontWeight:800,textAlign:"center"}}>{f.l}</div></button>)})}
</div>
</div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"3px solid #facc15",zIndex:40}}>
<div style={{display:"flex",justifyContent:"space-around",padding:"6px 2px"}}>
<button onClick={function(){open("accueil")}} style={{border:"none",background:"none",fontSize:8,color:a==="accueil"?"#1e40af":"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>🏠</div>{t.accueil}</button>
<button onClick={function(){open("services")}} style={{border:"none",background:"none",fontSize:8,color:"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>💼</div>{t.services}</button>
<button onClick={function(){open("innovation")}} style={{border:"none",background:"none",fontSize:8,color:"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>🚀</div>{t.innovation}</button>
<button onClick={function(){open("portefeuilles")}} style={{border:"none",background:"none",fontSize:8,color:"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>👛</div>{t.wallet}</button>
<button onClick={function(){open("securite")}} style={{border:"none",background:"none",fontSize:8,color:"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>🛡️</div>{t.securite}</button>
<button onClick={function(){open("support")}} style={{border:"none",background:"none",fontSize:8,color:"#64748b",padding:"4px 6px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:44}}><div style={{fontSize:16}}>❓</div>{t.support}</button>
</div>
<div style={{display:"flex",justifyContent:"center",gap:4,padding:"2px 0 6px 0",borderTop:"1px solid #f1f5f9"}}>{Object.keys(LANGS).map(function(l){return (<button key={l} onClick={function(){changeLang(l)}} style={{border:lang===l?"1px solid #1e40af":"1px solid #e2e8f0",background:lang===l?"#dbeafe":"#fff",borderRadius:10,padding:"2px 6px",fontSize:8,fontWeight:lang===l?"800":"500"}}>{LANGS[l].flag} {l}</button>)})}</div>
</div>

{m? (
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:60,display:"flex",alignItems:"flex-end"}}>
<div style={{background:"#f8fafc",width:"100%",borderRadius:"20px 20px 0 0",padding:12,maxHeight:"92vh",overflowY:"auto",borderTop:"3px solid #facc15"}}>
<div style={{display:"flex",justifyContent:"space-between",background:"#1e40af",color:"#fff",padding:10,borderRadius:12}}><div style={{fontWeight:900,fontSize:11}}>{gdb} • {m} • PI 314159 • {lang}</div><button onClick={function(){setM(""); setA("accueil")}} style={{border:"none",background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:20,width:28,height:28}}>X</button></div>

{m==="transferer" && (
<div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,display:"flex",flexDirection:"column",gap:10}}>
<div style={{display:"flex",gap:6}}>
<button onClick={function(){setTransferTab("INTERNE")}} style={{flex:1,padding:10,borderRadius:12,border:transferTab==="INTERNE"?"2px solid #1e40af":"1px solid #e2e8f0",background:transferTab==="INTERNE"?"#dbeafe":"#fff",fontWeight:800,fontSize:11}}>{t.p2pInterne}</button>
<button onClick={function(){setTransferTab("EXTERNE")}} style={{flex:1,padding:10,borderRadius:12,border:transferTab==="EXTERNE"?"2px solid #1e40af":"1px solid #e2e8f0",background:transferTab==="EXTERNE"?"#dbeafe":"#fff",fontWeight:800,fontSize:11}}>{t.p2pExterne}</button>
</div>

{transferTab==="INTERNE" && (
<div style={{display:"flex",flexDirection:"column",gap:8}}>
<input placeholder={t.numCompte} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<select style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}>{MONNAIES.map(function(mm){return <option key={mm}>{mm}</option>})}</select>
<input placeholder={t.montant} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<input placeholder={t.motif} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<button style={{padding:12,borderRadius:12,background:"#1e40af",color:"#fff",fontWeight:900,border:"none"}}>{t.btnEnvoyer}</button>
<div style={{fontSize:10,color:"#16a34a",background:"#f0fdf4",border:"1px solid #bbf7d0",padding:8,borderRadius:8,textAlign:"center"}}>{t.noteInterne}</div>
</div>
)}

{transferTab==="EXTERNE" && (
<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{fontSize:10,fontWeight:800}}>{t.zoneTransfert}</div>
<div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6}}>
{ZONES.map(function(z){return (<button key={z} onClick={function(){setZone(z)}} style={{whiteSpace:"nowrap",padding:"8px 12px",borderRadius:20,border:zone===z?"2px solid #1e40af":"1px solid #e2e8f0",background:zone===z?"#1e40af":"#fff",color:zone===z?"#fff":"#0f172a",fontWeight:800,fontSize:10}}>{z}</button>)})}
</div>
<div style={{fontSize:9,color:"#64748b"}}>Conforme ISO 20022 • SWIFT • SEPA • {zone}</div>
<select value={bankSel} onChange={function(e){setBankSel(e.target.value)}} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}>{BANQUES[zone].map(function(b){return <option key={b} value={b}>{b}</option>})}</select>
<input placeholder={t.numCompteExt} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<select style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}>{MONNAIES.map(function(mm){return <option key={mm}>{mm}</option>})}</select>
<input placeholder={t.montantExt} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<input placeholder={t.motifExt} style={{padding:12,borderRadius:10,border:"1px solid #cbd5e1"}}/>
<button style={{padding:12,borderRadius:12,background:"#1e40af",color:"#fff",fontWeight:900,border:"none"}}>{t.btnExterne}</button>
<div style={{fontSize:10,color:"#1e40af",background:"#eff6ff",border:"1px solid #bfdbfe",padding:8,borderRadius:8,textAlign:"center"}}>{t.noteExterne}</div>
</div>
)}
</div>
)}

{m!=="transferer" && (<div style={{background:"#fff",borderRadius:16,padding:20,marginTop:10,textAlign:"center",color:"#64748b",fontSize:12}}>Module {m} en cours de construction • GDB {gdb}</div>)}

</div></div>) : null}

</div>
)
}
