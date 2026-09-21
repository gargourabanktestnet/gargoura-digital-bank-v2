"use client";
import { useState } from "react";

export default function GargouraBank(){
  const [solde, setSolde] = useState(999.00);
  const [view, setView] = useState("menu");
  const [provider, setProvider] = useState("Airtel Money Tchad");
  const [billType, setBillType] = useState("SNE");
  const [tel, setTel] = useState("");
  const [montant, setMontant] = useState("");
  const [msg, setMsg] = useState("");

  const payer = (type:string)=>{
    if(!montant) return setMsg("⚠️ Entre le montant d'abord");
    const m = parseFloat(montant);
    if(type==="Envoyer" || type==="Retirer" || type==="Mobile Money" || type.includes("Facture") || type==="Swapper"){
      setSolde(s=>s-m);
    } else {
      setSolde(s=>s+m);
    }
    setMsg(`✅ ${type} de ${m} Pi réussi!`);
    setTimeout(()=>{setMsg(""); setMontant("");}, 4000);
  }

  // Si vue Mobile Money
  if(view==="mobile"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>setView("menu")} style={backBtn}>← Retour</button>
        <h2 style={{color:"#0d3b8c"}}>Mobile Money Tchad</h2>
        <p style={{fontSize:"12px",color:"#666"}}>Tchad • Dépôt instantané</p>
        <ProviderCard name="Airtel Money Tchad" sub="Recommandé • Instantané" active={provider==="Airtel Money Tchad"} onClick={()=>setProvider("Airtel Money Tchad")} />
        <ProviderCard name="Moov Africa Tchad" sub="Moov Money • Solde" active={provider==="Moov Africa Tchad"} onClick={()=>setProvider("Moov Africa Tchad")} />
        <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Numéro +235 66 XX XX XX" style={inputStyle}/>
        <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder="Montant Pi (1 Pi≈1.50 XAF)" style={inputStyle}/>
        <button onClick={()=>payer("Mobile Money")} style={btnBlue}>Continuer vers {provider}</button>
        {msg && <div style={msgBox}>{msg}</div>}
      </div>
    )
  }

  if(view==="facture"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>setView("menu")} style={backBtn}>← Retour</button>
        <h2 style={{color:"#0d3b8c"}}>Paiement Facture</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}>
          <BillCard name="SNE" desc="Électricité" active={billType==="SNE"} onClick={()=>setBillType("SNE")}/>
          <BillCard name="SDE" desc="Eau du Tchad" active={billType==="SDE"} onClick={()=>setBillType("SDE")}/>
          <BillCard name="Airtel" desc="Facture Mobile" active={billType==="Airtel"} onClick={()=>setBillType("Airtel")}/>
          <BillCard name="Moov" desc="Moov Data" active={billType==="Moov"} onClick={()=>setBillType("Moov")}/>
        </div>
        <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder={`Montant pour ${billType}`} style={inputStyle}/>
        <button onClick={()=>payer(`Facture ${billType}`)} style={btnBlue}>Payer {billType}</button>
        {msg && <div style={msgBox}>{msg}</div>}
      </div>
    )
  }

  if(view!=="menu"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>setView("menu")} style={backBtn}>← Retour Menu</button>
        <h2 style={{color:"#0d3b8c",textTransform:"uppercase"}}>{view}</h2>
        <div style={{background:"white",padding:"15px",borderRadius:"12px",marginTop:"16px"}}>
          <h3 style={{margin:"0 0 10px 0"}}>Transaction {view}</h3>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="@username ou adresse Pi" style={inputStyle}/>
          <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder="Montant Pi" style={inputStyle}/>
          <button onClick={()=>payer(view)} style={btnBlue}>Confirmer {view}</button>
          {msg && <div style={msgBox}>{msg}</div>}
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={{background:"#0d3b8c",color:"white",padding:"20px",borderRadius:"15px"}}>
        <h2 style={{margin:0,fontSize:"18px"}}>GARGOURA DIGITAL BANK</h2>
        <p style={{fontSize:"11px",opacity:0.8,margin:"2px 0"}}>Pi Testnet • Tchad</p>
        <h1 style={{margin:"15px 0 0",fontSize:"32px"}}>{solde.toFixed(2)} Pi</h1>
        <p style={{margin:0,fontSize:"12px"}}>Solde disponible • 1 Pi ≈ 1.50 XAF</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"16px"}}>
        <MenuBtn title="Envoyer" icon="📤" onClick={()=>setView("envoyer")}/>
        <MenuBtn title="Recevoir" icon="📥" onClick={()=>setView("recevoir")}/>
        <MenuBtn title="Déposer" icon="💰" onClick={()=>setView("deposer")}/>
        <MenuBtn title="Retirer" icon="💵" onClick={()=>setView("retirer")}/>
        <MenuBtn title="Swapper" icon="🔄" onClick={()=>setView("swap")}/>
        <MenuBtn title="Transfert Interne" icon="🏦" onClick={()=>setView("interne")}/>
        <MenuBtn title="Mobile Money" icon="📱" onClick={()=>setView("mobile")} highlight/>
        <MenuBtn title="Paiement Facture" icon="🧾" onClick={()=>setView("facture")} highlight/>
      </div>

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
  return <button onClick={onClick} style={{background: highlight?"#0d3b8c":"white",color:highlight?"white":"#0d3b8c",border:"none",borderRadius:"12px",padding:"16px",textAlign:"center",fontWeight:"bold"}}>
    <div style={{fontSize:"22px"}}>{icon}</div>
    <div style={{marginTop:"5px",fontWeight:"bold",fontSize:"12px"}}>{title}</div>
  </button>
}
function ProviderCard({name,sub,active,onClick}:{name:string,sub:string,active:boolean,onClick:()=>void}){
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
