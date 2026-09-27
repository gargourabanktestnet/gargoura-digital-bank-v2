// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import { langs } from "../lib/lang"

import Agregation from "../components/Agregation"
import AiAutomation from "../components/AiAutomation"
import ApercuCompte from "../components/ApercuCompte"
import Automobile from "../components/Automobile"
import Blockchain from "../components/Blockchain"
import Convertir from "../components/Convertir"
import Gestion from "../components/Gestion"
import HamburgerMenu from "../components/HamburgerMenu"
import LanguageGlobe from "../components/LanguageGlobe"
import Portefeuille from "../components/Portefeuille"
import Shopping from "../components/Shopping"
import SoldeGCV from "../components/SoldeGCV"
import Trading from "../components/Trading"

function genGDB(){ return "GDB-"+Date.now() }

export default function Page(){
const [gdb,setGdb]=useState("GDB-2026-0000")
const [m,setM]=useState("")
const [a,setA]=useState("accueil")
const [amt,setAmt]=useState("")
const [dest,setDest]=useState("")
const [crypto,setCrypto]=useState("π PiCoin (314,159.00 USD)")
const [p2p,setP2p]=useState("interne")
const [zone,setZone]=useState("CEMAC")
const [bank,setBank]=useState("")
const [cExt,setCExt]=useState("")
const [fromT,setFromT]=useState("π PiCoin")
const [toT,setToT]=useState("USDT")
const [dAmt,setDAmt]=useState("")
const [logoErr,setLogoErr]=useState(false)

const funcs=[
{id:"apercuCompte",l:"Aperçu Compte",i:"👁️"},
{id:"portefeuille",l:"Portefeuille",i:"👛"},
{id:"soldeGCV",l:"Solde GCV",i:"💰"},
{id:"transferer",l:"Transférer",i:"↔️"},
{id:"virement",l:"Virement Bancaire",i:"💳"},
{id:"pidex",l:"Pi DEX",i:"📈"},
{id:"convertir",l:"Convertir",i:"🔄"},
{id:"trading",l:"Trading",i:"📊"},
{id:"aiAutomation",l:"Ai Automation",i:"✨"},
{id:"blockchain",l:"Blockchain",i:"⛓️"},
{id:"shopping",l:"Shopping",i:"🛍️"},
{id:"automobile",l:"Automobile",i:"🚗"},
{id:"agregation",l:"Agrégation de Comptes",i:"🔗"},
{id:"gestion",l:"Gestion Financière",i:"📊"},
]

useEffect(()=>{ setGdb(genGDB()) },[])

function open(s){ setA(s); if(s==="accueil"){ setM(""); }else{ setM(s); } }

return(
<>
<HamburgerMenu />
<LanguageGlobe />
<div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"system-ui",paddingBottom:90}}>
<div style={{background:"#1e40af",color:"#fff",padding:"12px 14px",position:"sticky",top:0,zIndex:30}}>
<div style={{fontWeight:900}}>Gargoura • {gdb}</div>
</div>

<div style={{padding:14,display:"flex",flexDirection:"column",gap:12}}>
{funcs.map(function(f){
return(
<button key={f.id} onClick={function(){open(f.id)}} style={{padding:"14px 12px",borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>
<span style={{marginRight:8}}>{f.i}</span>{f.l}
</button>
)
})}
</div>

{m? (
<div style={{position:"fixed",inset:0,background:"#fff",zIndex:50,overflowY:"auto",padding:14}}>
<button onClick={function(){setM("")}} style={{padding:10,borderRadius:10,border:"1px solid #ddd",marginBottom:12}}>Fermer ✕</button>
{m==="apercuCompte" && (<ApercuCompte gdb={gdb} />)}
{m==="portefeuille" && (<Portefeuille gdb={gdb} />)}
{m==="soldeGCV" && (<SoldeGCV gdb={gdb} />)}
{m==="convertir" && (<Convertir gdb={gdb} />)}
{m==="trading" && (<Trading gdb={gdb} />)}
{m==="aiAutomation" && (<AiAutomation gdb={gdb} />)}
{m==="blockchain" && (<Blockchain gdb={gdb} />)}
{m==="shopping" && (<Shopping gdb={gdb} />)}
{m==="automobile" && (<Automobile gdb={gdb} />)}
{m==="agregation" && (<Agregation gdb={gdb} />)}
{m==="gestion" && (<Gestion gdb={gdb} />)}
</div>
) : null}

</div>
</>
)
 }
