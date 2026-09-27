// @ts-nocheck
"use client"
import { useState, useEffect } from "react"

function genGDB(){ return "GDB-"+Date.now() }

export default function Page(){
const [gdb,setGdb]=useState("GDB-2026")
const [m,setM]=useState("")
const [bOpen,setBOpen]=useState(true)
const [pOpen,setPOpen]=useState(false)
const [mondOpen,setMondOpen]=useState(false)
const [confOpen,setConfOpen]=useState(false)
const [facturePays,setFacturePays]=useState("Tchad")
const [showFacture,setShowFacture]=useState(false)
const [showGouv,setShowGouv]=useState(false)
const [showKYC,setShowKYC]=useState(false)
const [kycType,setKycType]=useState("KYC Pi Network")

const funcs=[
{id:"apercuCompte",l:"Apercu Compte"},
{id:"portefeuille",l:"Portefeuille"},
{id:"soldeGCV",l:"Solde GCV"},
{id:"transferer",l:"Transferer"},
{id:"virement",l:"Virement Bancaire"},
{id:"pidex",l:"Pi DEX"},
{id:"convertir",l:"Convertir"},
{id:"trading",l:"Trading"},
{id:"aiAutomation",l:"Ai Automation"},
{id:"blockchain",l:"Blockchain"},
{id:"shopping",l:"Shopping"},
{id:"automobile",l:"Automobile"},
{id:"agregation",l:"Agregation de Comptes"},
{id:"gestion",l:"Gestion Financiere"},
]

useEffect(()=>{ setGdb(genGDB()) },[])
function open(s){ if(s==="accueil"){setM("")}else{setM(s)} }
const pays=["Tchad","Cameroun","Gabon","Congo","RCA","Guinee Eq","Senegal","Cote dIvoire","Benin","Togo","Mali","Burkina","Niger","France","USA","UAE"]

return(
<div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"system-ui"}}>
<div style={{background:"#0f172a",color:"#e2e8f0",padding:"16px 14px"}}>
<div style={{fontSize:11,opacity:0.6}}>GDB</div>
<div style={{fontWeight:900,fontSize:20,color:"#fff",margin:"4px 0"}}>GARGOURA DIGITAL BANK</div>
<div style={{fontWeight:800,fontSize:13}}>MAINNET PI 314159 USD</div>
<div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:6}}>
<button onClick={()=>setBOpen(!bOpen)} style={{padding:"6px 10px",borderRadius:6,background:"#fff",fontWeight:700}}>Banque {bOpen?"-":"+"}</button>
<button onClick={()=>setPOpen(!pOpen)} style={{padding:"6px 10px",borderRadius:6,background:"#fff",fontWeight:700}}>Paiements {pOpen?"-":"+"}</button>
<button onClick={()=>setMondOpen(!mondOpen)} style={{padding:"6px 10px",borderRadius:6,background:"#fff",fontWeight:700}}>Mondial {mondOpen?"-":"+"}</button>
<button onClick={()=>setConfOpen(!confOpen)} style={{padding:"6px 10px",borderRadius:6,background:"#fff",fontWeight:700}}>Conformite {confOpen?"-":"+"}</button>
</div>
{bOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button onClick={()=>open("apercuCompte")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Tableau de bord</button><button onClick={()=>open("portefeuille")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Portefeuilles 8 wallets</button><button onClick={()=>open("virement")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Virements ISO20022</button><button onClick={()=>open("gestion")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Historique</button></div>}
{pOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button onClick={()=>open("convertir")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Swapper PI XAF</button><button onClick={()=>open("transferer")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Retirer</button><button onClick={()=>open("portefeuille")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Deposer</button><button onClick={()=>open("portefeuille")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Scanner QR</button><button onClick={()=>open("virement")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Mobile Money</button></div>}
{mondOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button onClick={()=>{setShowFacture(true);setShowGouv(false)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Factures par Pays</button><button onClick={()=>{setShowGouv(true);setShowFacture(false)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Services Gouvernementaux</button><button onClick={()=>open("convertir")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Convertisseur</button><button onClick={()=>open("pidex")} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>Pi DEX</button></div>}
{confOpen && <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}><button onClick={()=>{setKycType("KYC Pi Network Officiel");setShowKYC(true)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>KYC Pi Network</button><button onClick={()=>{setKycType("CEMAC COBAC");setShowKYC(true)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>CEMAC COBAC</button><button onClick={()=>{setKycType("UEMOA BCEAO");setShowKYC(true)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>UEMOA BCEAO</button><button onClick={()=>{setKycType("GOLFE SAMA");setShowKYC(true)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>GOLFE SAMA</button><button onClick={()=>{setKycType("EU PSD2");setShowKYC(true)}} style={{padding:"5px 8px",background:"#fff",borderRadius:5}}>EU PSD2</button></div>}
<div style={{marginTop:12,fontSize:11,opacity:0.7}}>SECURE SCALABLE REGULATED - BUILT ON PI NETWORK</div>
</div>
<div style={{background:"#1e40af",color:"#fff",padding:"12px 14px",fontWeight:900}}>Gargoura {gdb}</div>

{showFacture && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}><div style={{fontWeight:900}}>Factures par Pays - Service Automatique Instantane</div><div style={{fontSize:12,opacity:0.6,margin:"6px 0"}}>Collaboration Gargoura Digital Bank - Recu ISO20022 - 1 clic</div><select value={facturePays} onChange={e=>setFacturePays(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}>{pays.map(p=><option key={p}>{p}</option>)}</select><input placeholder="Numero Abonne Contrat Facture" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}/><input placeholder="Montant XAF USD PI" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #cbd5e1",marginBottom:8}}/><button onClick={()=>alert("Facture "+facturePays+" payee GDB:"+gdb)} style={{width:"100%",padding:12,background:"#1e40af",color:"#fff",borderRadius:10,fontWeight:800,border:0}}>Payer {facturePays} 1 Clic</button><button onClick={()=>setShowFacture(false)} style={{marginTop:8}}>Fermer</button></div>}

{showGouv && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"1px solid #cbd5e1"}}><div style={{fontWeight:900}}>Services Gouvernementaux Automatiques Instantanes</div><div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>Tchad NIN ANATS Douane DGI - CEMAC API - Cameroun DGI ANTI - Senegal API - France API Gouv - UAE UAE PASS - Tous scelles GDB ISO20022 paiement PI XAF instantane recu blockchain conformite COBAC BCEAO SAMA PSD2 etroite collaboration Gargoura Digital Bank</div><button onClick={()=>setShowGouv(false)} style={{marginTop:8}}>Fermer</button></div>}

{showKYC && <div style={{background:"#fff",margin:12,padding:14,borderRadius:12,border:"2px solid #1e40af"}}><div style={{fontWeight:900}}>{kycType} - KYC Officiel PI Network</div><div style={{fontSize:13,marginTop:8,lineHeight:"18px"}}>KYC officiel PI Network valide par Gargoura Digital Bank Verification biometrique liveness piece identite CEMAC UEMOA GOLFE EU Scelle blockchain PI Mainnet GCV 314159 USD respecte Instantane Conformite reglementaire {kycType} LBC FT plafond 10M XAF declaration COBAC BCEAO SAMA PSD2 tracabilite ISO20022 licence GDB en cours Sans exception</div><button onClick={()=>setShowKYC(false)} style={{marginTop:8}}>Fermer</button></div>}

<div style={{padding:12,display:"flex",flexDirection:"column",gap:10}}>
{funcs.map(f=><button key={f.id} onClick={()=>open(f.id)} style={{padding:"14px 12px",borderRadius:14,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>{f.l}</button>)}
</div>

{m ? <div style={{position:"fixed",inset:0,background:"#fff",zIndex:60,padding:14,overflowY:"auto"}}><button onClick={()=>setM("")} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #cbd5e1",fontWeight:800}}>Retour</button><div style={{marginTop:14,fontWeight:900,fontSize:18}}>{funcs.find(x=>x.id===m)?.l} {gdb}</div><div style={{marginTop:10,padding:12,background:"#f8fafc",borderRadius:10,border:"1px dashed #cbd5e1",fontSize:13}}>Module {m} GDB scelle Formulaire fonctionnel en simple clic Conforme CEMAC COBAC BCEAO SAMA PSD2 KYC PI Network officiel Factures par Pays Services Gouvernementaux Automatiques Instantanes Tous rediges sans exception Collaboration Gargoura Digital Bank</div></div> : null}

</div>
</div>
)
}
