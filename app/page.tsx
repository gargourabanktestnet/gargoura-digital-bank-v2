"use client";
import { useState } from "react";

export default function GargouraBank(){
  const [solde, setSolde] = useState(999.00);
  const [view, setView] = useState("menu");
  const [provider, setProvider] = useState("Airtel Money");
  const [billType, setBillType] = useState("SNE");
  const [tel, setTel] = useState("");
  const [montant, setMontant] = useState("");
  const [msg, setMsg] = useState("");

  const payer = (type:string)=>{
    if(!montant) return setMsg("⚠️ Entre le montant");
    setMsg(`✅ ${type} - ${montant} Pi - ${provider || billType} - ${tel || 'Succès Testnet'}`);
    if(type.includes("Envoyer") || type.includes("Retirer") || type.includes("Payer") || type.includes("Mobile")){
      setSolde(s=>s - parseFloat(montant||"0"));
    } else {
      setSolde(s=>s + parseFloat(montant||"0"));
    }
  }

  // --- VUES DETAILLEES ---
  if(view==="mobile"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>{setView("menu"); setMsg("");}} style={backBtn}>← Menu Principal</button>
        <h2 style={{color:"#0d3b8c"}}>Mobile Money Tchad</h2>
        <p style={{fontSize:"12px",color:"#666"}}>Tchad • Transfert & Dépôt Mobile</p>
        
        <p style={{fontWeight:"bold",marginTop:"15px"}}>Choisir le service</p>
        <ProviderCard name="Airtel Money Tchad" sub="Recommandé • Dépôt instantané" active={provider==="Airtel Money"} onClick={()=>setProvider("Airtel Money")} color="#ff0000"/>
        <ProviderCard name="Moov Africa Tchad" sub="Moov Money • Solde & Transferts" active={provider==="Moov Africa"} onClick={()=>setProvider("Moov Africa")} color="#0055a4"/>
        
        <div style={{marginTop:"20px"}}>
          <p style={{fontWeight:"bold"}}>Détails du transfert</p>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Numéro +235 66 XX XX XX" style={inputStyle}/>
          <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder="Montant (Pi) - 1 Pi ≈ 1.50 XAF" style={inputStyle}/>
          <button onClick={()=>payer("Mobile Money")} style={btnBlue}>Continuer vers {provider}</button>
          {msg && <div style={msgBox}>{msg}</div>}
          <p style={{fontSize:"11px",textAlign:"center",marginTop:"8px"}}>Frais: 0 Pi • Traitement instantané</p>
        </div>
      </div>
    )
  }

  if(view==="facture"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>{setView("menu"); setMsg("");}} style={backBtn}>← Menu Principal</button>
        <h2 style={{color:"#0d3b8c"}}>Paiement Facture</h2>
        <p style={{fontSize:"12px",color:"#666"}}>Payer vos factures en quelques secondes</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"15px"}}>
          <BillCard name="SNE" desc="Société Nationale d'Électricité" active={billType==="SNE"} onClick={()=>setBillType("SNE")}/>
          <BillCard name="SDE" desc="Société Des Eaux du Tchad" active={billType==="SDE"} onClick={()=>setBillType("SDE")}/>
          <BillCard name="Airtel" desc="Facture Mobile / Internet" active={billType==="Airtel"} onClick={()=>setBillType("Airtel")}/>
          <BillCard name="Moov" desc="Moov Africa - Data / Voix" active={billType==="Moov"} onClick={()=>setBillType("Moov")}/>
        </div>

        <div style={{marginTop:"20px",background:"white",padding:"12px",borderRadius:"10px",border:"1px solid #ddd"}}>
          <p style={{margin:0,fontSize:"14px"}}><b>Facture {billType} - Oct 2024</b> - <span style={{color:"green"}}>8 500 Pi</span></p>
          <p style={{margin:"5px 0 0 0",fontSize:"11px",color:"#666"}}>Date limite: 28 oct. • Réf: {billType}-1024-778</p>
        </div>

        <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder={`Montant à payer pour ${billType} (Pi)`} style={inputStyle}/>
        <button onClick={()=>payer(`Payer Facture ${billType}`)} style={btnBlue}>Payer la facture {billType}</button>
        {msg && <div style={msgBox}>{msg}</div>}
      </div>
    )
  }

  // --- MENU PRINCIPAL ---
  return (
    <div style={{minHeight:"100vh",background:"#f0f7ff",padding:"16px",fontFamily:"sans-serif"}}>
      <div style={{background:"#0d3b8c",color:"white",padding:"20px",borderRadius:"16px",textAlign:"center"}}>
        <h1 style={{margin:0,fontSize:"18px"}}>GARGOURA DIGITAL BANK</h1>
        <p style={{opacity:0.8,margin:"4px 0",fontSize:"12px"}}>Pi Network Testnet • Tchad</p>
        <div style={{fontSize:"38px",fontWeight:"bold",marginTop:"10px"}}>{solde.toFixed(2)} Pi</div>
        <div style={{fontSize:"11px"}}>Solde disponible • 1 Pi ≈ 1.50 XAF</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"16px"}}>
        <MenuBtn title="Envoyer" icon="📤" onClick={()=>{setView("envoyer")}}/>
        <MenuBtn title="Recevoir" icon="📥" onClick={()=>setView("recevoir")}/>
        <MenuBtn title="Déposer" icon="💰" onClick={()=>setView("deposer")}/>
        <MenuBtn title="Retirer" icon="💸" onClick={()=>setView("retirer")}/>
        <MenuBtn title="Swapper" icon="🔄" onClick={()=>setView("swap")}/>
        <MenuBtn title="Transfert Interne" icon="🏦" onClick={()=>setView("interne")}/>
        <MenuBtn title="Mobile Money" icon="📱" onClick={()=>setView("mobile")} highlight/>
        <MenuBtn title="Paiement Facture" icon="🧾" onClick={()=>setView("facture")} highlight/>
      </div>

      {view!=="menu" && view!=="mobile" && view!=="facture" && (
        <div style={{marginTop:"16px",background:"white",padding:"15px",borderRadius:"12px"}}>
          <h3 style={{margin:"0 0 10px 0",color:"#0d3b8c"}}>{view.toUpperCase()}</h3>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="@username ou adresse" style={inputStyle}/>
          <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder="Montant Pi" style={inputStyle}/>
          <button onClick={()=>payer(view)} style={btnBlue}>Confirmer {view}</button>
          {msg && <div style={msgBox}>{msg}</div>}
        </div>
      )}

      <div style={{marginTop:"18px",textAlign:"center",fontSize:"11px"}}>
        <a href="/privacy" style={{marginRight:"12px",color:"#0d3b8c"}}>Privacy Policy</a>
        <a href="/terms" style={{color:"#0d3b8c"}}>Terms of Service</a>
      </div>
    </div>
  );
}

const pageStyle = {minHeight:"100vh",background:"#f0f7ff",padding:"16px",fontFamily:"sans-serif"} as const;
const inputStyle = {width:"100%",padding:"12px",marginTop:"10px",borderRadius:"8px",border:"1px solid #ccc",boxSizing:"border-box"} as any;
const btnBlue = {width:"100%",padding:"13px",marginTop:"12px",background:"#0d3b8c",color:"white",border:"none",borderRadius:"10px",fontWeight:"bold"} as const;
const backBtn = {background:"none",border:"none",color:"#0d3b8c",fontWeight:"bold",padding:0,marginBottom:"10px"} as const;
const msgBox = {marginTop:"12px",background:"white",padding:"10px",borderRadius:"8px",fontSize:"13px",border:"1px solid #0d3b8c"} as const;

function MenuBtn({title,icon,onClick,highlight}:{title:string,icon:string,onClick:()=>void,highlight?:boolean}){
  return <button onClick={onClick} style={{background: highlight?"#0d3b8c":"white",color:highlight?"white":"#0d3b8c",border:"none",borderRadius:"12px",padding:"16px",textAlign:"center",boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}>
    <div style={{fontSize:"22px"}}>{icon}</div><div style={{marginTop:"5px",fontWeight:"bold",fontSize:"12px"}}>{title}</div>
  </button>
}
function ProviderCard({name,sub,active,onClick}:{name:string,sub:string,active:boolean,onClick:()=>void,color?:string}){
  return <div onClick={onClick} style={{background:"white",border:active?"2px solid #0d3b8c":"1px solid #ddd",padding:"12px",borderRadius:"10px",marginTop:"8px",cursor:"pointer"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{fontSize:"13px"}}>{name}</b>{active && <span style={{color:"#0d3b8c"}}>✔</span>}</div>
    <div style={{fontSize:"11px",color:"#666"}}>{sub}</div>
  </div>
}
function BillCard({name,desc,active,onClick}:{name:string,desc:string,active:boolean,onClick:()=>void}){
  return <div onClick={onClick} style={{background:"white",border:active?"2px solid #0d3b8c":"1px solid #ddd",padding:"12px",borderRadius:"10px",textAlign:"center",cursor:"pointer"}}>
    <b style={{color:"#0d3b8c"}}>{name}</b><div style={{fontSize:"10px",color:"#666",marginTop:"4px"}}>{desc}</div>
  </div>
    }
