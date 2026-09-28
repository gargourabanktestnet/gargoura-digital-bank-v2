// @ts-nocheck
"use client"
import { useState,useEffect } from "react"
import { Transferer,Virement,PiDex,Convertir,Trading,AIAuto,Blockchain,Shopping,Portefeuilles,Automobile,Agregation,Gestion } from "./Components"
const gen=()=> "GDB-"+new Date().getFullYear()+"-"+Math.floor(100000+Math.random()*900000)
const genReceive=()=> "GDB-RCV-"+Math.floor(10000000+Math.random()*90000000)
const LANGS={FR:"🇫🇷",EN:"🇬🇧",AR:"🇸🇦",ES:"🇪🇸",ZH:"🇨🇳",HA:"🇹🇩"}
const ICONS={transferer:"💸",virement:"🏦",pidex:"🔄",convertir:"💱",trading:"📈",aiauto:"🤖",blockchain:"⛓️",shopping:"🛒",portefeuilles:"👛",automobile:"🚗",agregation:"🔗",gestion:"⚙️"}
const MENU=[
{title:"COMPTE & PROFIL",items:[["Accueil","tableau de bord","accueil"],["Mon Profil","gérer mon compte","profil"],["Portefeuilles","Crypto & Digital","portefeuilles"]]},
{title:"PAIEMENTS & TRANSFERTS",items:[["Transferts P2P","Interne et Externe","transferer"],["Mobile Money","Local, Régional, International","mobilemoney"],["Paiements de Factures","Eau, Électricité, frais scolaires","factures"],["Convertisseur","100+ Devises Mondiales","convertir"]]},
{title:"TRADING & INVESTISSEMENTS",items:[["Trading","10+ Paires temps réel","trading"],["PiDEX & AMM","Échange décentralisée web3","pidex"],["Staking Crypto","10+ cryptos","staking"]]},
{title:"VOYAGE, GASTRONOMIE & SERVICES",items:[["Réservation premium","Vols, Hôtels, Restaurants en Pi","reservation"],["Services Gouvernementaux","démarches","gouvernement"],["Douane Automatique","estimation frais import","douane"]]},
{title:"SERVICES BANCAIRES",items:[["Cartes Bancaires","Virtuelles et Physiques","cartes"],["E-commerce","10+ Plateformes Mondiales","shopping"],["Partenariat Automobile","18+ Marques","automobile"]]},
{title:"SECURITÉS & CONFORMITÉS",items:[["Sécurité","Protection Avancée","securite"],["Conformité","Normes Internationales","conformite"],["Surveillance IA","Monitoring Intelligent","surveillance"]]},
{title:"PARAMÈTRES & SUPPORT",items:[["Paramètres","Configuration","parametres"],["Aide et Support","Centre d'Assistance","support"]]}
]
export default function Page(){
const [gdb,setGdb]=useState("GDB-2026-433422"),[rcv,setRcv]=useState(""),[m,setM]=useState(""),[lang,setLang]=useState("FR"),[menuOpen,setMenuOpen]=useState(false),[logoErr,setLogoErr]=useState(false)
useEffect(()=>{try{let x=localStorage.getItem("gdb_account"); if(!x){x=gen(); localStorage.setItem("gdb_account",x)} setGdb(x); let r=localStorage.getItem("gdb_receive_code"); if(!r){r=genReceive(); localStorage.setItem("gdb_receive_code",r)} setRcv(r); let l=localStorage.getItem("gdb_lang"); if(l) setLang(l)}catch{setGdb(gen()); setRcv(genReceive())}},[])
const funcs=[["transferer","Transférer"],["virement","Virement"],["pidex","Pi DEX"],["convertir","Convertir"],["trading","Trading"],["aiauto","AI Auto"],["blockchain","Blockchain"],["shopping","Shopping"],["portefeuilles","Portefeuilles"],["automobile","Automobile"],["agregation","Agrégation"],["gestion","Gestion"]]
function openMod(id){setM(id); setMenuOpen(false)}
return(
<div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"system-ui",paddingBottom:90}}>
<div style={{background:"#1e40af",color:"#fff",padding:"10px 12px",position:"sticky",top:0,zIndex:30,borderBottom:"3px solid #facc15",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>setMenuOpen(true)} style={{background:"#facc15",color:"#1e40af",border:"none",borderRadius:8,padding:"6px 10px",fontWeight:900}}>☰ MENU</button><div style={{fontWeight:900,fontSize:10}}>{gdb.slice(0,10)} • PI=314159</div></div>
<div style={{display:"flex",gap:3}}>{Object.keys(LANGS).map(l=><button key={l} onClick={()=>{setLang(l); localStorage.setItem("gdb_lang",l)}} style={{border:lang===l?"2px solid #facc15":"1px solid rgba(255,255,255,0.3)",background:lang===l?"#facc15":"rgba(255,255,255,0.1)",color:lang===l?"#1e3a8a":"#fff",borderRadius:6,padding:"2px 4px",fontSize:9,fontWeight:800}}>{LANGS[l]}</button>)}</div>
</div>
<div style={{padding:12,display:"flex",flexDirection:"column",gap:10}}>
<div style={{background:"#fff",border:"2px solid #facc15",borderRadius:16,padding:12,textAlign:"center"}}><div style={{fontWeight:900}}>GARGOURA DIGITAL BANK</div><div style={{fontSize:9,color:"#64748b"}}>{gdb} • ISO20022 • {lang}</div></div>
<div style={{background:"#1e3a8a",borderRadius:16,padding:12,color:"#fff"}}><div style={{fontSize:11}}>Solde • {gdb}</div><div style={{fontWeight:900,fontSize:20,marginTop:4}}>1 PI = 314 159,00 USD</div><div style={{fontSize:9,color:"#86efac",marginTop:4}}>Code Réception permanent: {rcv}</div><div style={{display:"flex",gap:6,marginTop:10}}><button onClick={()=>openMod("transferer")} style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:20,padding:9,fontWeight:800}}>Envoyer</button><button onClick={()=>openMod("recevoir")} style={{flex:1,background:"#fff",color:"#1e3a8a",border:"none",borderRadius:20,padding:9,fontWeight:800}}>Recevoir</button></div></div>
<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10}}><div style={{fontWeight:900,fontSize:12}}>Fonctionnalités Courantes • 12 avec icônes</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:8}}>{funcs.map(([id,label])=><button key={id} onClick={()=>openMod(id)} style={{border:"1px solid #e2e8f0",background:"#fff",borderRadius:10,padding:8,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{fontSize:16}}>{ICONS[id]}</div><div style={{fontSize:8,fontWeight:800}}>{label}</div></button>)}</div></div>
</div>

{menuOpen && (<div style={{position:"fixed",inset:0,zIndex:60,display:"flex"}}><div onClick={()=>setMenuOpen(false)} style={{flex:1,background:"rgba(0,0,0,0.5)"}}></div><div style={{width:"84%",maxWidth:360,background:"#fff",height:"100%",overflowY:"auto",borderRight:"3px solid #facc15"}}><div style={{background:"#1e40af",color:"#fff",padding:12,position:"sticky",top:0}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:900}}>Menu Principal</div><button onClick={()=>setMenuOpen(false)} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:20,width:28,height:28}}>X</button></div><div style={{fontSize:9,color:"#facc15",marginTop:4}}>{gdb} • Toutes les fonctionnalités</div></div><div style={{padding:8,display:"flex",flexDirection:"column",gap:12}}>{MENU.map(sec=><div key={sec.title}><div style={{fontWeight:900,fontSize:9,color:"#1e40af",background:"#dbeafe",padding:"5px 8px",borderRadius:6}}>{sec.title}</div><div style={{display:"flex",flexDirection:"column",gap:4,marginTop:4}}>{sec.items.map(it=><button key={it[0]} onClick={()=>openMod(it[2])} style={{textAlign:"left",border:"1px solid #e2e8f0",background:"#fff",borderRadius:8,padding:"7px 8px"}}><div style={{fontWeight:800,fontSize:10}}>{it[0]}</div><div style={{fontSize:8,color:"#64748b"}}>{it[1]}</div></button>)}</div></div>)}</div></div></div>)}

{m && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:70,display:"flex",alignItems:"flex-end"}}><div style={{background:"#f8fafc",width:"100%",borderRadius:"16px 16px 0 0",padding:10,maxHeight:"92vh",overflowY:"auto",borderTop:"3px solid #facc15"}}>
<div style={{display:"flex",justifyContent:"space-between",background:"#1e40af",color:"#fff",padding:8,borderRadius:10}}><div style={{fontWeight:900,fontSize:10}}>{gdb} • {m}</div><button onClick={()=>setM("")} style={{border:"none",background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:20,width:26,height:26}}>X</button></div>
<div style={{background:"#fff",borderRadius:12,padding:10,marginTop:8}}>
{m==="transferer" && <Transferer gdb={gdb} />}
{m==="virement" && <Virement gdb={gdb} />}
{m==="pidex" && <PiDex gdb={gdb} />}
{m==="convertir" && <Convertir />}
{m==="trading" && <Trading />}
{m==="aiauto" && <AIAuto />}
{m==="blockchain" && <Blockchain />}
{m==="shopping" && <Shopping />}
{m==="portefeuilles" && <Portefeuilles />}
{m==="automobile" && <Automobile />}
{m==="agregation" && <Agregation />}
{m==="gestion" && <Gestion />}
{m==="recevoir" && (<div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}><div style={{fontWeight:900}}>Recevoir • Code Permanent</div><div style={{background:"#1e40af",color:"#fff",padding:12,borderRadius:10,fontWeight:900,letterSpacing:1}}>{rcv}</div><div style={{fontSize:10,color:"#64748b"}}>Ce code est stocké définitivement dans l'appareil de {gdb}</div><div style={{fontSize:10,background:"#f0fdf4",padding:6,borderRadius:6}}>Partage ce code pour recevoir des fonds instantanés • GDB {gdb}</div></div>)}
{m==="cartes" && (<div><div style={{fontWeight:900}}>Cartes Bancaires Virtuelles et Physiques</div><div style={{display:"flex",gap:6,marginTop:8}}><div style={{flex:1,background:"#1e40af",color:"#fff",borderRadius:12,padding:10}}><div style={{fontSize:10}}>Virtuelle • PI</div><div style={{fontWeight:900,marginTop:6}}>**** **** **** 4334</div><div style={{fontSize:9,marginTop:4}}>{gdb}</div></div><div style={{flex:1,background:"#111",color:"#facc15",borderRadius:12,padding:10}}><div style={{fontSize:10}}>Physique • Metal</div><div style={{fontWeight:900,marginTop:6}}>**** **** **** 6262</div><div style={{fontSize:9,marginTop:4}}>{gdb}</div></div></div></div>)}
{m==="securite" && (<div><div style={{fontWeight:900}}>Sécurité & Conformités Réglementaires</div><div style={{fontSize:10,marginTop:6,display:"flex",flexDirection:"column",gap:4}}><div>• KYC / AML conforme FATF</div><div>• ISO 20022 • SWIFT • SEPA</div><div>• Chiffrement bout en bout</div><div>• Surveillance IA</div><div>• Normes CEMAC, UEMOA, Golfe</div></div></div>)}
{m==="support" && (<div><div style={{fontWeight:900}}>Support 24H/24 7J/7</div><div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6,fontSize:11}}><div>📞 Numéro Interne: (+235) 92 82 52 62</div><div>💬 WhatsApp: (+235) 66 78 75 46</div><div>📧 Email: gargouradigitalbank@gmail.com</div><div style={{marginTop:8,fontWeight:800}}>Guide de Démarrage</div><div style={{fontSize:10,color:"#64748b"}}>1. Créer compte GDB 2. Code réception permanent 3. Envoyer/Recevoir</div><div style={{fontWeight:800,marginTop:6}}>Conditions d'utilisation</div><div style={{fontSize:10,color:"#64748b"}}>Utilisation conforme ISO20022, frais 0.3% + GDB, transactions instantanées interopérables.</div><div style={{fontWeight:800,marginTop:6}}>Politique de Confidentialité</div><div style={{fontSize:10,color:"#64748b"}}>Données chiffrées, stockées localement, jamais partagées. GDB unique par appareil.</div></div></div>)}
{(m==="parametres"||m==="accueil"||m==="profil"||m==="conformite"||m==="surveillance") && (<div style={{textAlign:"center",color:"#64748b",fontSize:12}}>Module {m} • {gdb} • En construction</div>)}
</div></div></div>)}
</div>
)
}
