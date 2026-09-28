// @ts-nocheck
"use client"
import { useState,useEffect } from "react"
const gen=()=> "GDB-"+new Date().getFullYear()+"-"+Math.floor(100000+Math.random()*900000)
const LANGS={FR:"🇫🇷",EN:"🇬🇧",AR:"🇸🇦",ES:"🇪🇸",ZH:"🇨🇳",HA:"🇹🇩"}
const MENU=[
{title:"COMPTE & PROFIL",items:[["Accueil","tableau de bord","accueil"],["Mon Profil","gérer mon compte","profil"],["Portefeuilles","Crypto & Digital","portefeuilles"]]},
{title:"PAIEMENTS & TRANSFERTS",items:[["Transferts P2P","Interne et Externe","transferer"],["Mobile Money","Local, Régional, International","mobilemoney"],["Paiements de Factures","Eau, Électricité, frais scolaires etc","factures"],["Convertisseur","100+ Devises Mondiales","convertir"]]},
{title:"TRADING & INVESTISSEMENTS",items:[["Trading","10+ Paires en temps réel","trading"],["PiDEX & AMM","Échange décentralisée web 3.0","pidex"],["Staking Crypto","10+ cryptomonnaies","staking"]]},
{title:"VOYAGE, GASTRONOMIE & SERVICES PUBLICS",items:[["Réservation premium","Vols, Hôtels et Restaurants en Pi","reservation"],["Services Gouvernementaux","démarches et frais préparatoires","gouvernement"],["Douane Automatique","estimation des frais d'importation","douane"]]},
{title:"SERVICES BANCAIRES",items:[["Cartes Bancaires","Virtuelles et Physiques","cartes"],["E-commerce","10+ Plateformes Mondiales","shopping"],["Partenariat Automobile","18+ Marques Disponibles","automobile"]]},
{title:"SECURITÉS & CONFORMITÉS",items:[["Sécurité","Protection Avancée","securite"],["Conformité","Normes Internationales","conformite"],["Surveillance IA","Monitoring Intelligent","surveillance"]]},
{title:"PARAMÈTRES & SUPPORT",items:[["Paramètres","Configuration","parametres"],["Aide et Support","Centre d'Assistance","support"]]}
]
export default function Page(){
const [gdb,setGdb]=useState("GDB-2026-433422")
const [m,setM]=useState(""),[lang,setLang]=useState("FR"),[menuOpen,setMenuOpen]=useState(false),[logoErr,setLogoErr]=useState(false)
useEffect(()=>{try{let x=localStorage.getItem("gdb_account"); if(x) setGdb(x); else{let n=gen(); setGdb(n); localStorage.setItem("gdb_account",n)} let l=localStorage.getItem("gdb_lang"); if(l) setLang(l)}catch{}},[])
const funcs=["Transférer","Virement","Pi DEX","Convertir","Trading","AI Auto","Blockchain","Shopping","Portefeuilles","Automobile","Agrégation","Gestion"]
function openMod(id){setM(id); setMenuOpen(false)}
return(
<div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"system-ui",paddingBottom:110}}>
<div style={{background:"#1e40af",color:"#fff",padding:"10px 12px",position:"sticky",top:0,zIndex:30,borderBottom:"3px solid #facc15",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>setMenuOpen(true)} style={{background:"#facc15",color:"#1e40af",border:"none",borderRadius:8,padding:"6px 10px",fontWeight:900,fontSize:12}}>☰ MENU</button><div style={{fontWeight:900,fontSize:10}}>{gdb.slice(0,10)} • 1 PI=314159 USD</div></div>
<div style={{display:"flex",gap:3}}>{Object.keys(LANGS).map(l=><button key={l} onClick={()=>setLang(l)} style={{border:lang===l?"2px solid #facc15":"1px solid rgba(255,255,255,0.3)",background:lang===l?"#facc15":"rgba(255,255,255,0.1)",color:lang===l?"#1e3a8a":"#fff",borderRadius:6,padding:"2px 4px",fontSize:9,fontWeight:800}}>{LANGS[l]}</button>)}</div>
</div>

<div style={{padding:14,display:"flex",flexDirection:"column",gap:12}}>
<div style={{background:"#fff",border:"2px solid #facc15",borderRadius:20,padding:14,display:"flex",flexDirection:"column",alignItems:"center"}}>
{!logoErr? (<img src="/logo.png" alt="GDB" onError={()=>setLogoErr(true)} style={{width:60,height:60,borderRadius:30,border:"3px solid #facc15"}} />):(<div style={{width:60,height:60,borderRadius:30,background:"#1e3a8a",border:"3px solid #facc15",display:"flex",alignItems:"center",justifyContent:"center",color:"#facc15",fontWeight:900}}>GDB</div>)}
<div style={{fontWeight:900,marginTop:6,fontSize:13}}>GARGOURA DIGITAL BANK</div><div style={{fontSize:9,color:"#64748b"}}>{gdb} • ISO20022 • PI 314159 USD • {lang}</div>
</div>
<div style={{background:"#1e3a8a",borderRadius:20,padding:14,color:"#fff"}}><div style={{fontSize:11}}>Solde Total • {gdb}</div><div style={{fontWeight:900,fontSize:22,marginTop:6}}>1 PI = 314 159,00 USD</div><div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>openMod("transferer")} style={{flex:1,background:"#16a34a",color:"#fff",border:"none",borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>Envoyer</button><button style={{flex:1,background:"#fff",color:"#1e3a8a",border:"none",borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>Recevoir</button></div></div>
<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:16,padding:12}}><div style={{fontWeight:900,fontSize:13}}>Fonctionnalités Courantes • 12</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:10}}>{funcs.map(f=><button key={f} onClick={()=>openMod(f.toLowerCase().replace(" ",""))} style={{border:"1px solid #e2e8f0",background:"#fff",borderRadius:12,padding:"8px 4px",fontSize:9,fontWeight:800}}>{f}</button>)}</div></div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"3px solid #facc15",zIndex:40,display:"flex",justifyContent:"space-around",padding:"6px 2px"}}><div style={{fontSize:10}}>🏠 Accueil</div><div style={{fontSize:10}}>💼 Services</div><div style={{fontSize:10}}>🚀 Innovation</div><div style={{fontSize:10}}>👛 Wallet</div><div style={{fontSize:10}}>🛡️ Sécurité</div><div style={{fontSize:10}}>❓ Support</div></div>

{menuOpen && (<div style={{position:"fixed",inset:0,zIndex:60,display:"flex"}}><div onClick={()=>setMenuOpen(false)} style={{flex:1,background:"rgba(0,0,0,0.5)"}}></div><div style={{width:"84%",maxWidth:360,background:"#fff",height:"100%",overflowY:"auto",borderRight:"3px solid #facc15"}}>
<div style={{background:"#1e40af",color:"#fff",padding:14,position:"sticky",top:0,zIndex:2}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:900,fontSize:16}}>Menu Principal</div><button onClick={()=>setMenuOpen(false)} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:20,width:30,height:30}}>X</button></div><div style={{marginTop:8,fontSize:10,color:"#facc15"}}>{gdb} • Toutes les fonctionnalités de Gargoura Digital Bank</div></div>
<div style={{padding:10,display:"flex",flexDirection:"column",gap:14}}>
{MENU.map(sec=><div key={sec.title} style={{display:"flex",flexDirection:"column",gap:6}}><div style={{fontWeight:900,fontSize:10,color:"#1e40af",background:"#dbeafe",padding:"6px 8px",borderRadius:8,borderLeft:"4px solid #1e40af"}}>{sec.title}</div>{sec.items.map(it=><button key={it[0]} onClick={()=>openMod(it[2])} style={{textAlign:"left",background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"8px 10px",display:"flex",flexDirection:"column"}}><div style={{fontWeight:800,fontSize:11,color:"#0f172a"}}>{it[0]}</div><div style={{fontSize:9,color:"#64748b"}}>{it[1]}</div></button>)}</div>)}
</div>
</div></div>)}

{m && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:70,display:"flex",alignItems:"flex-end"}}><div style={{background:"#f8fafc",width:"100%",borderRadius:"20px 20px 0 0",padding:12,maxHeight:"90vh",overflowY:"auto",borderTop:"3px solid #facc15"}}><div style={{display:"flex",justifyContent:"space-between",background:"#1e40af",color:"#fff",padding:10,borderRadius:12}}><div style={{fontWeight:900,fontSize:11}}>{gdb} • {m} • PI 314159</div><button onClick={()=>setM("")} style={{border:"none",background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:20,width:28,height:28}}>X</button></div><div style={{background:"#fff",borderRadius:12,padding:20,marginTop:10,textAlign:"center",color:"#64748b",fontSize:12}}>Module {m} • GDB {gdb} • En construction selon ta logique</div></div></div>)}
</div>
)
}
