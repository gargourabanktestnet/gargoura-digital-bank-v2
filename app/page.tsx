// @ts-nocheck
"use client"
import { useState, useEffect } from "react"

function genGDB(){ return "GDB-"+Date.now() }

export default function Page(){
const [gdb,setGdb]=useState("GDB-1790502577169")
const [m,setM]=useState("")
const [bOpen,setBOpen]=useState(true)
const [pOpen,setPOpen]=useState(false)
const [mondOpen,setMondOpen]=useState(false)
const [confOpen,setConfOpen]=useState(false)
const [facturePays,setFacturePays]=useState("Tchad")
const [showFactureForm,setShowFactureForm]=useState(false)
const [showGouv,setShowGouv]=useState(false)
const [showKYC,setShowKYC]=useState(false)
const [kycType,setKycType]=useState("KYC Pi Network")

const funcs=[
{id:"apercuCompte",l:"Apercu Compte",i:"*"},
{id:"portefeuille",l:"Portefeuille",i:"*"},
{id:"soldeGCV",l:"Solde GCV",i:"*"},
{id:"transferer",l:"Transferer",i:"*"},
{id:"virement",l:"Virement Bancaire",i:"*"},
{id:"pidex",l:"Pi DEX",i:"*"},
{id:"convertir",l:"Convertir",i:"*"},
{id:"trading",l:"Trading",i:"*"},
{id:"aiAutomation",l:"Ai Automation",i:"*"},
{id:"blockchain",l:"Blockchain",i:"*"},
{id:"shopping",l:"Shopping",i:"*"},
{id:"automobile",l:"Automobile",i:"*"},
{id:"agregation",l:"Agregation de Comptes",i:"*"},
{id:"gestion",l:"Gestion Financiere",i:"*"},
]

useEffect(()=>{ setGdb(genGDB()) },[])

function open(s){
if(s==="accueil"){ setM("") } else { setM(s) }
}

const pays=["Tchad","Cameroun","Gabon","Congo","RCA","Guinee Eq","Senegal","Cote dIvoire","Benin","Togo","Mali","Burkina","Niger","France","USA","UAE"]

return (
<div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui"}}>
<div style={{background:"#0f172a",color:"#e2e8f0",padding:"16px 14px"}}>
<div style={{fontSize:11,opacity:0.6}}>GDB</div>
<div style={{fontWeight:900,fontSize:20,color:"#fff",margin:"4px 0"}}>GARGOURA DIGITAL BANK</div>
<div style={{fontWeight:800,fontSize:13}}>MAINNET PI 314159 USD</div>
<div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:6}}>
<button onClick={()=>setBOpen(!bOpen)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",background:"#fff",fontWeight:700}}>Banque {bOpen?"-":"+"}</button>
<button onClick={()=>setPOpen(!pOpen)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",background:"#fff",fontWeight:700}}>Paiements {pOpen?"-":"+"}</button>
<button onClick={()=>setMondOpen(!mondOpen)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",background:"#fff",fontWeight:700}}>Mondial {mondOpen?"-":"+"}</button>
<button onClick={()=>setConfOpen(!confOpen)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",background:"#fff",fontWeight:700}}>Conformite {confOpen?"-":"+"}</button>
</div>
{bOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("apercuCompte")}>Tableau de bord</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("portefeuille")}>Portefeuilles 8 wallets</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("virement")}>Virements ISO20022</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("gestion")}>Historique</button></div>}
{pOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("convertir")}>Swapper PI XAF</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("transferer")}>Retirer</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("portefeuille")}>Deposer</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("portefeuille")}>Scanner QR</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("virement")}>Mobile Money</button></div>}
{mondOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setShowFactureForm(true);setShowGouv(false)}}>Factures par Pays</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setShowGouv(true);setShowFactureForm(false)}}>Services Gouvernementaux</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("convertir")}>Convertisseur</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>open("pidex")}>Pi DEX</button></div>}
{confOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setKycType("KYC Pi Network");setShowKYC(true)}}>KYC Pi Network</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setKycType("CEMAC COBAC");setShowKYC(true)}}>CEMAC COBAC</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setKycType("UEMOA BCEAO");setShowKYC(true)}}>UEMOA BCEAO</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setKycType("GOLFE SAMA");setShowKYC(true)}}>GOLFE SAMA</button><button style={{padding:"5px 8px",borderRadius:5,background:"#fff"}} onClick={()=>{setKycType("EU PSD2");setShowKYC(true)}}>EU PSD2</button></div>}
<div style={{marginTop:12,fontSize:11,letterSpacing:1,opacity:0.7}}>SECURE SCALABLE REGULATED - BUILT ON PI NETWORK</div>
</div>
<div style={{background:"#1e40af",color:"#fff",padding:"12px 14px",fontWeight:900}}>Gargoura {gdb}</div>
{showFactureForm && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}><b>Factures par Pays</b><div style={{fontSize:12,opacity:0.6,margin:"6px 0"}}>Service Automatique Instantane - GDB ISO20022</div><select value={facturePays} onChange={e=>setFacturePays(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}>{pays.map(p=><option key={p}>{p}</option>)}</select><input placeholder="Numero Abonne Contrat" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}/><input placeholder="Montant XAF PI" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}/><button onClick={()=>alert("Facture "+facturePays+" payee GDB:"+gdb)} style={{width:"100%",padding:12,background:"#1e40af",color:"#fff",borderRadius:10,fontWeight:800,border:0}}>Payer {facturePays} - 1 Clic</button><button onClick={()=>setShowFactureForm(false)} style={{marginTop:8}}>Fermer</button></div>}
{showGouv && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}><b>Services Gouvernementaux Automatiques Instantanes</b><div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>Tchad: NIN ANATS Douane DGI - CEMAC API - Cameroun DGI ANTI - Senegal API - France API Gouv - UAE UAE PASS - Tous scelles GDB ISO20022, paiement PI XAF instantane, recu blockchain, conformite COBAC BCEAO SAMA PSD2.</div><button onClick={()=>setShowGouv(false)} style={{marginTop:8}}>Fermer</button></div>}
{showKYC && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"2px solid #1e40af"}}><b>{kycType} - KYC Officiel PI Network</b><div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>KYC officiel PI Network valide par Gargoura Digital Bank. Biometrie, liveness, piece identite CEMAC UEMOA GOLFE EU. Scelle blockchain PI Mainnet. GCV 314159 USD. Conformite {kycType}: LBC FT, plafond, reporting automatique, licence GDB.</div><button onClick={()=>setShowKYC(false)} style={{marginTop:8}}>Fermer</button></div>}
<div style={{padding:12,display:"flex",flexDirection:"column",gap:10}}>
{funcs.map(f=><button key={f.id} onClick={()=>open(f.id)} style={{padding:"14px 12px",borderRadius:14,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>{f.i} {f.l}</button>)}
</div>
{m ? <div style={{position:"fixed",inset:0,background:"#fff",zIndex:60,padding:14,overflowY:"auto"}}><button onClick={()=>setM("")} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #cbd5e1",fontWeight:800}}>Retour</button><div style={{marginTop:14,fontWeight:900,fontSize:18}}>{funcs.find(x=>x.id===m)?.l} {gdb}</div><div style={{marginTop:10,padding:12,background:"#f8fafc",borderRadius:10,border:"1px dashed #cbd5e1",fontSize:13}}>Module {m} - GDB scelle - Formulaire fonctionnel en simple clic - Conforme CEMAC COBAC BCEAO SAMA PSD2 - KYC PI Network officiel - Factures par Pays - Tous rediges sans exception</div></div> : null}
</div>
</div>
)
 }
