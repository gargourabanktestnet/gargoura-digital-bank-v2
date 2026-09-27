// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import HamburgerMenu from "../components/HamburgerMenu"
import LanguageGlobe from "../components/LanguageGlobe"

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
<style>{`button{cursor:pointer} .chip{padding:6px 10px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;font-size:13px;font-weight:600}`}</style>
<div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui"}}>
<div style={{background:"#0f172a",color:"#e2e8f0",padding:"16px 14px"}}>
<div style={{fontSize:12,opacity:0.7}}>GDB</div>
<div style={{fontWeight:900,fontSize:20,margin:"6px 0",color:"#fff"}}>GARGOURA DIGITAL BANK</div>
<div style={{fontWeight:800,fontSize:14}}>MAINNET • PI 314,159 USD</div>
<div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:6}}>
<button className="chip" onClick={()=>setBOpen(!bOpen)}>🏦 Banque {bOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setPOpen(!pOpen)}>💳 Paiements {pOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setMondOpen(!mondOpen)}>🌐 Mondial {mondOpen?"−":"+"}</button>
<button className="chip" onClick={()=>setConfOpen(!confOpen)}>🛡️ Conformité {confOpen?"−":"+"}</button>
</div>
{bOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button className="chip" onClick={()=>open("apercuCompte")}>• Tableau de bord</button><button className="chip" onClick={()=>open("portefeuille")}>• Portefeuilles 8 wallets</button><button className="chip" onClick={()=>open("virement")}>• Virements ISO20022</button><button className="chip" onClick={()=>open("gestion")}>• Historique</button></div>}
{pOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button className="chip" onClick={()=>open("convertir")}>• Swapper PI/XAF</button><button className="chip" onClick={()=>open("transferer")}>• Retirer</button><button className="chip" onClick={()=>open("portefeuille")}>• Déposer</button><button className="chip" onClick={()=>open("portefeuille")}>• Scanner QR</button><button className="chip" onClick={()=>open("virement")}>• Mobile Money</button></div>}
{mondOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button className="chip" onClick={()=>{setShowFactureForm(true);setShowGouv(false)}}>• Factures par Pays</button><button className="chip" onClick={()=>{setShowGouv(true);setShowFactureForm(false)}}>• Services Gouvernementaux</button><button className="chip" onClick={()=>open("convertir")}>• Convertisseur</button><button className="chip" onClick={()=>open("pidex")}>• Pi DEX</button></div>}
{confOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button className="chip" onClick={()=>{setKycType("KYC Pi Network - Officiel");setShowKYC(true)}}>• KYC Pi Network</button><button className="chip" onClick={()=>{setKycType("CEMAC/COBAC");setShowKYC(true)}}>• CEMAC/COBAC</button><button className="chip" onClick={()=>{setKycType("UEMOA/BCEAO");setShowKYC(true)}}>• UEMOA/BCEAO</button><button className="chip" onClick={()=>{setKycType("GOLFE/SAMA");setShowKYC(true)}}>• GOLFE/SAMA</button><button className="chip" onClick={()=>{setKycType("EU PSD2");setShowKYC(true)}}>• EU PSD2</button></div>}
<div style={{marginTop:14,fontSize:13,opacity:0.8}}>🌍 SECURE • SCALABLE • REGULATED</div>
<div style={{marginTop:4,fontSize:13,opacity:0.8}}>BUILT ON PI NETWORK</div>
<div style={{marginTop:12}}><HamburgerMenu /> <LanguageGlobe /></div>
</div>
<div style={{background:"#1e40af",color:"#fff",padding:"12px 14px",fontWeight:900}}>Gargoura • {gdb}</div>

{showFactureForm && (
<div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}>
<div style={{fontWeight:900}}>🧾 Factures par Pays - Service Automatique Instantané</div>
<div style={{fontSize:12,opacity:0.7,margin:"6px 0"}}>Collaboration Gargoura Digital Bank • Reçu ISO20022 • 1 clic</div>
<select value={facturePays} onChange={e=>setFacturePays(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}>
{paysFactures.map(p=><option key={p}>{p}</option>)}
</select>
<input placeholder="Numéro Abonné / Contrat" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}} />
<input placeholder="Montant XAF / PI" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}} />
<button onClick={()=>alert("Facture "+facturePays+" payée GDB:"+gdb)} style={{width:"100%",padding:12,background:"#1e40af",color:"#fff",borderRadius:10,fontWeight:800,border:0}}>Payer {facturePays} - 1 Clic</button>
<button onClick={()=>setShowFactureForm(false)} style={{marginTop:8}}>Fermer</button>
</div>
)}
{showGouv && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}><div style={{fontWeight:900}}>🏛️ Services Gouvernementaux Automatiques</div><div style={{fontSize:13,marginTop:8}}>Tchad: NIN ANATS Douane DGI • CEMAC API • UEMOA BCEAO • GOLFE SAMA • EU PSD2 • Paiement PI/XAF instantané scellé GDB ISO20022</div><button onClick={()=>setShowGouv(false)} style={{marginTop:8}}>Fermer</button></div>}
{showKYC && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"2px solid #1e40af"}}><div style={{fontWeight:900}}>🛡️ {kycType}</div><div style={{fontSize:13,marginTop:8}}>KYC Officiel PI Network validé par GDB. Biométrie, liveness, conformité {kycType}. GCV 314,159 USD respecté. Blockchain PI Mainnet.</div><button onClick={()=>setShowKYC(false)} style={{marginTop:8}}>Fermer</button></div>}

<div style={{padding:12,display:"flex",flexDirection:"column",gap:10}}>
{funcs.map(f=><button key={f.id} onClick={()=>open(f.id)} style={{padding:"14px 12px",borderRadius:14,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}><span style={{marginRight:8}}>{f.i}</span>{f.l}</button>)}
</div>

{m? <div style={{position:"fixed",inset:0,background:"#fff",zIndex:60,padding:14,overflowY:"auto"}}><button onClick={()=>setM("")} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #cbd5e1",fontWeight:800}}>← Retour</button><div style={{marginTop:14,fontWeight:900,fontSize:18}}>{funcs.find(x=>x.id===m)?.l} • {gdb}</div><div style={{marginTop:10,padding:12,background:"#f8fafc",borderRadius:10,border:"1px dashed #cbd5e1"}}>Module {m} chargé - GDB scellé • Formulaire fonctionnel en simple clic • Conforme {kycType||"CEMAC/BCEAO"}</div></div>:null}
</div>
</div>
</>
)
 }
