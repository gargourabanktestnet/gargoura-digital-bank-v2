// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import Agregation from "../components/Agregation"
import AiAutomation from "../components/AiAutomation"
import ApercuCompte from "../components/ApercuCompte"
import Automobile from "../components/Automobile"
import Blockchain from "../components/Blockchain"
import Convertir from "../components/Convertir"
import Gestion from "../components/Gestion"
import HamburgerMenu from "../components/HamburgerMenu"
import LanguageGlobe from "../components/LanguageGlobe"
import Pidex from "../components/Pidex"
import Portefeuille from "../components/Portefeuille"
import Shopping from "../components/Shopping"
import SoldeGCV from "../components/SoldeGCV"
import Trading from "../components/Trading"
import Transferer from "../components/Transferer"
import Virement from "../components/Virement"

function genGDB(){ return "GDB-"+Date.now() }

export default function Page(){
const [gdb,setGdb]=useState("GDB-1790502577169")
const [m,setM]=useState("")
const [bOpen,setBOpen]=useState(false)
const [pOpen,setPOpen]=useState(false)
const [mondOpen,setMondOpen]=useState(false)
const [confOpen,setConfOpen]=useState(false)
const [facturePays,setFacturePays]=useState("Tchad")
const [showFactureForm,setShowFactureForm]=useState(false)
const [showGouv,setShowGouv]=useState(false)
const [showKYC,setShowKYC]=useState(false)
const [kycType,setKycType]=useState("")

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
function open(s){ if(s==="accueil"){setM("")}else{setM(s)} }

const paysFactures=["Tchad","Cameroun","Gabon","Congo","RCA","Guinée Eq.","Sénégal","Côte d'Ivoire","Bénin","Togo","Mali","Burkina","Niger","France","USA","UAE"]

return(
<>
<style>{`button{cursor:pointer} .chip{padding:6px 10px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;font-size:13px;font-weight:600} .chip:hover{background:#e0f2fe}`}</style>
<div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui"}}>
{/* HEADER HAUT - COMME TES CAPTURES */}
<div style={{background:"#0f172a",color:"#e2e8f0",padding:"16px 14px"}}>
<div style={{fontSize:12,opacity:0.7,letterSpacing:1}}>GDB</div>
<div style={{fontWeight:900,fontSize:20,margin:"6px 0",color:"#fff"}}>GARGOURA DIGITAL BANK</div>
<div style={{fontWeight:800,fontSize:14,opacity:0.9}}>MAINNET • PI 314,159 USD</div>

<div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>setBOpen(!bOpen)}>🏦 Banque {bOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setPOpen(!pOpen)}>💳 Paiements {pOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setMondOpen(!mondOpen)}>🌐 Mondial {mondOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setConfOpen(!confOpen)}>🛡️ Conformité {confOpen?"−":"+"}</button>
</div>

{bOpen && (
<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>open("apercuCompte")}>• Tableau de bord</button>
<button className="chip" onClick={()=>open("portefeuille")}>• Portefeuilles 8 wallets</button>
<button className="chip" onClick={()=>open("virement")}>• Virements ISO20022</button>
<button className="chip" onClick={()=>open("gestion")}>• Historique</button>
</div>
)}
{pOpen && (
<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>open("convertir")}>• Swapper PI/XAF</button>
<button className="chip" onClick={()=>open("transferer")}>• Retirer</button>
<button className="chip" onClick={()=>open("portefeuille")}>• Déposer</button>
<button className="chip" onClick={()=>open("portefeuille")}>• Scanner QR</button>
<button className="chip" onClick={()=>open("virement")}>• Mobile Money</button>
</div>
)}
{mondOpen && (
<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>{setShowFactureForm(true); setShowGouv(false)}}>• Factures par Pays</button>
<button className="chip" onClick={()=>{setShowGouv(true); setShowFactureForm(false)}}>• Services Gouvernementaux</button>
<button className="chip" onClick={()=>open("convertir")}>• Convertisseur</button>
<button className="chip" onClick={()=>open("pidex")}>• Pi DEX</button>
</div>
)}
{confOpen && (
<div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>{setKycType("KYC Pi Network - Officiel"); setShowKYC(true)}}>• KYC Pi Network</button>
<button className="chip" onClick={()=>{setKycType("CEMAC/COBAC"); setShowKYC(true)}}>• CEMAC/COBAC</button>
<button className="chip" onClick={()=>{setKycType("UEMOA/BCEAO"); setShowKYC(true)}}>• UEMOA/BCEAO</button>
<button className="chip" onClick={()=>{setKycType("GOLFE/SAMA"); setShowKYC(true)}}>• GOLFE/SAMA</button>
<button className="chip" onClick={()=>{setKycType("EU PSD2"); setShowKYC(true)}}>• EU PSD2</button>
</div>
)}

<div style={{marginTop:14,fontSize:13,letterSpacing:1,opacity:0.8}}>🌍 SECURE • SCALABLE • REGULATED</div>
<div style={{marginTop:4,fontSize:13,letterSpacing:1,opacity:0.8}}>BUILT ON PI NETWORK</div>
<div style={{marginTop:12}}><HamburgerMenu /><span style={{marginLeft:8}}><LanguageGlobe /></span></div>
</div>

{/* BANDE BLEUE GDB */}
<div style={{background:"#1e40af",color:"#fff",padding:"12px 14px",fontWeight:900,position:"sticky",top:0,zIndex:20}}>Gargoura • {gdb}</div>

{/* FACTURES PAR PAYS - FORMULAIRE COMPLET */}
{showFactureForm && (
<div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}>
<div style={{fontWeight:900,marginBottom:8}}>🧾 Factures par Pays - Service Automatique Instantané</div>
<div style={{fontSize:13,opacity:0.7,marginBottom:10}}>En étroite collaboration avec Gargoura Digital Bank • Paiement instantané • Reçu ISO20022</div>
<select value={facturePays} onChange={(e)=>setFacturePays(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:10}}>
{paysFactures.map(p=><option key={p} value={p}>{p}</option>)}
</select>
<input placeholder="Numéro Abonné / Contrat / Facture" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}} />
<input placeholder="Montant XAF / USD / PI" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}} />
<button onClick={()=>alert("Facture "+facturePays+" payée • GDB:"+gdb+" • Reçu envoyé")} style={{width:"100%",padding:12,background:"#1e40af",color:"#fff",borderRadius:10,fontWeight:800,border:0}}>Payer Facture {facturePays} - 1 Clic</button>
<button onClick={()=>setShowFactureForm(false)} style={{marginTop:8,padding:8,border:0,background:"transparent"}}>Fermer</button>
</div>
)}

{showGouv && (
<div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}>
<div style={{fontWeight:900}}>🏛️ Services Gouvernementaux Automatiques Instantanés</div>
<div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>
• Tchad : NIN, ANATS, Douane, Impôts DGI • CEMAC : API CEMAC • Cameroun : DGI, ANTI • Sénégal : API Sénégal • France : API Gouv • UAE : UAE PASS • Tous scellés GDB ISO20022
<br/><br/>Paiement instantané en PI/XAF, reçu blockchain, conformité COBAC/BCEAO/SAMA/PSD2 intégrée.
</div>
<button onClick={()=>setShowGouv(false)} style={{marginTop:10,padding:8}}>Fermer</button>
</div>
)}

{showKYC && (
<div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"2px solid #1e40af"}}>
<div style={{fontWeight:900}}>🛡️ {kycType} - KYC Officiel PI Network</div>
<div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>
{kycType==="KYC Pi Network - Officiel" && "KYC officiel PI Network validé par Gargoura Digital Bank. Vérification biométrique, liveness, pièce d'identité CEMAC/UEMOA/GOLFE/EU. Scellé sur blockchain PI Mainnet. GCV 314,159 USD respecté. Instantané."}
{kycType==="CEMAC/COBAC" && "Conformité Réglementaire CEMAC/COBAC : LBC/FT, plafond 10M XAF, déclaration COBAC, traçabilité ISO20022. Licence GDB en cours."}
{kycType==="UEMOA/BCEAO" && "Conformité UEMOA/BCEAO : E-money, KYC UEMOA, plafond BCEAO, reporting automatique."}
{kycType==="GOLFE/SAMA" && "Conformité GOLFE/SAMA (Arabie Saoudite) : SAMA Cybersecurity Framework, Open Banking KSA, conformité Sharia."}
{kycType==="EU PSD2" && "Conformité EU PSD2 / DSP2 : SCA, Open Banking, RGPD, licence établissement paiement."}
</div>
<button onClick={()=>setShowKYC(false)} style={{marginTop:10,padding:8}}>Fermer</button>
</div>
)}

{/* MENU PRINCIPAL - COMME TES CAPTURES */}
<div style={{padding:12,display:"flex",flexDirection:"column",gap:10}}>
{funcs.map(function(f){
return(
<button key={f.id} onClick={function(){open(f.id)}} style={{padding:"14px 12px",borderRadius:14,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700,display:"flex",alignItems:"center",gap:8}}>
<span>{f.i}</span>{f.l}
</button>
)
})}
</div>

{m? (
<div style={{position:"fixed",inset:0,background:"#fff",zIndex:60,overflowY:"auto",padding:14}}>
<button onClick={function(){setM("")}} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #cbd5e1",fontWeight:800,marginBottom:12}}>← Retour</button>
<div style={{fontSize:12,opacity:0.6}}>GDB: {gdb}</div>
{m==="apercuCompte" && (<ApercuCompte gdb={gdb} />)}
{m==="portefeuille" && (<Portefeuille gdb={gdb} />)}
{m==="soldeGCV" && (<SoldeGCV gdb={gdb} />)}
{m==="transferer" && (<Transferer gdb={gdb} />)}
{m==="virement" && (<Virement gdb={gdb} />)}
{m==="pidex" && (<Pidex gdb={gdb} />)}
{m==="convertir" && (<Convertir gdb={gdb} />)}
{m==="trading" && (<Trading gdb={gdb} />)}
{m==="aiAutomation" && (<AiAutomation gdb={gdb} />)}
{m==="blockchain" && (<Blockchain gdb={gdb} />)}
{m==="shopping" && (<Shopping gdb={gdb} />)}
{m==="automobile" && (<Automobile gdb={gdb} />)}
{m==="agregation" && (<Agregation gdb={gdb} />)}
{m==="gestion" && (<Gestion gdb={gdb} />)}
</div>
):null}

</div>
</>
)
 }
