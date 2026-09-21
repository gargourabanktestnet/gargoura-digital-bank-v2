"use client";
import { useState, useEffect } from "react";

declare global { interface Window { Pi:any } }

export default function GargouraBankPro(){
  const [soldeTest, setSoldeTest] = useState(999.00);
  const [soldeMain, setSoldeMain] = useState(50.00);
  const [mode, setMode] = useState<"testnet"|"mainnet">("testnet");
  const [view, setView] = useState("menu");
  const [zone, setZone] = useState("CEMAC");
  const [provider, setProvider] = useState("Airtel Money Tchad");
  const [piUser, setPiUser] = useState<any>(null);
  const [montant, setMontant] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");

  const solde = mode==="testnet"? soldeTest : soldeMain;
  const setSolde = mode==="testnet"? setSoldeTest : setSoldeMain;

  useEffect(()=>{
    const s = document.createElement("script");
    s.src = "https://sdk.minepi.com/pi-sdk.js";
    s.onload = ()=>{ window.Pi?.init({version:"2.0", sandbox: mode==="testnet"}) };
    document.head.appendChild(s);
    return ()=>{ document.head.removeChild(s); }
  },[mode]);

  const authPi = async()=>{
    try{
      const auth = await window.Pi.authenticate(['username','payments'], ()=>{});
      setPiUser(auth.user);
      setMsg(`✅ Connecté ${auth.user.username} en ${mode.toUpperCase()}`);
    }catch{ setMsg("⚠️ Ouvre l'app dans Pi Browser pour te connecter"); }
  }

  const payerPi = async (type:string)=>{
    if(!montant) return setMsg("⚠️ Montant vide");
    const m = parseFloat(montant);
    if(mode==="testnet"){
      // SIMULATION TESTNET
      setSolde(s=> type.includes("Recevoir")||type.includes("Déposer")? s+m : s-m);
      setMsg(`✅ [${mode}] ${type} ${m} Pi | Zone ${zone} | ${provider} - Succès!`);
      setTimeout(()=>setMsg(""),4000);
    } else {
      // VRAI PAIEMENT MAINNET PI SDK
      try{
        await window.Pi.createPayment({
          amount: m,
          memo: `${type} - ${zone} - Gargoura Bank`,
          metadata: {zone, provider, type}
        },{
          onReadyForServerApproval: (id:string)=>{ console.log("APPROVE",id); },
          onReadyForServerCompletion: (id:string,txid:string)=>{ setSolde(s=>s-m); setMsg(`✅ MAINNET Payé TX:${txid.slice(0,8)}`); },
          onCancel: ()=> setMsg("❌ Paiement annulé"),
          onError: (e:any)=> setMsg(`❌ Erreur ${e.message}`)
        });
      }catch(e:any){ setMsg(`❌ ${e.message}`); }
    }
  }

  const zones = [
    {id:"CEMAC", flag:"🇹🇩", providers:["Airtel Money Tchad","Moov Tchad","Orange Money Cameroun"]},
    {id:"UEMOA", flag:"🇨🇮", providers:["Orange Money CI","MTN CI","Moov CI","Wave"]},
    {id:"DOLLAR", flag:"🇺🇸", providers:["PayPal USD","CashApp","Wise USD"]},
    {id:"JORDANIE", flag:"🇯🇴", providers:["Zain Cash JO","Orange Money JO","CliQ JO"]},
    {id:"GOLF", flag:"🇸🇦", providers:["STC Pay","UrPay","Careem Pay"]},
    {id:"INTERNATIONAL", flag:"🌍", providers:["Visa/Mastercard","Crypto Swap"]},
  ];

  const pageStyle={minHeight:"100vh",background:"#f0f7ff",padding:"14px",fontFamily:"sans-serif"} as any;
  const card={background:"white",padding:"14px",borderRadius:"14px",marginTop:"12px"} as any;
  const btnBlue={background:"#0d3b8c",color:"white",border:"none",padding:"12px",borderRadius:"10px",width:"100%",fontWeight:"bold",marginTop:"10px"} as any;
  const btnZone={padding:"8px 10px",borderRadius:"20px",border:"1px solid #0d3b8c",margin:"4px",fontSize:"11px",background:"white"} as any;
  const inputStyle={width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #ccc",marginTop:"8px"} as any;

  if(view==="zones"){
    return (
      <div style={pageStyle}>
        <button onClick={()=>setView("menu")} style={{border:"none",background:"none",color:"#0d3b8c",fontWeight:"bold"}}>← Menu</button>
        <h2>🌍 Zones de Transfert</h2>
        <div style={{display:"flex",flexWrap:"wrap"}}>
          {zones.map(z=><button key={z.id} onClick={()=>{setZone(z.id); setProvider(z.providers[0]); setView("transfer")}} style={{...btnZone, background: zone===z.id?"#0d3b8c":"white", color: zone===z.id?"white":"#0d3b8c"}}>{z.flag} {z.id}</button>)}
        </div>
        <div style={card}>
          <h4>Zone active: {zone} {zones.find(z=>z.id===zone)?.flag}</h4>
          <p style={{fontSize:"12px"}}>Frais: CEMAC 1%, UEMOA 1.2%, DOLLAR 2%, JORDANIE 1.5%, GOLF 1.5%, INTL 2.5%</p>
        </div>
      </div>
    )
  }

  if(view==="transfer" || view==="mobile" || view==="facture" || view!=="menu"){
    const isMobile = view==="mobile";
    return (
      <div style={pageStyle}>
        <button onClick={()=>setView("menu")} style={{border:"none",background:"none",color:"#0d3b8c",fontWeight:"bold"}}>← Menu</button>
        <h3 style={{color:"#0d3b8c",textTransform:"uppercase"}}>{view} - {zone}</h3>
        <div style={card}>
          <p style={{fontSize:"12px"}}>Mode: <b style={{color: mode==="testnet"?"green":"#ff6a00"}}>{mode.toUpperCase()}</b> | Solde: {solde.toFixed(2)} Pi</p>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {zones.find(z=>z.id===zone)?.providers.map(p=><button key={p} onClick={()=>setProvider(p)} style={{...btnZone, background: provider===p?"#eef3ff":"white", border: provider===p?"2px solid #0d3b8c":"1px solid #ddd"}}>{p}</button>)}
          </div>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder={isMobile?"Numéro +235...":"+@username ou adresse Pi"} style={inputStyle}/>
          <input value={montant} onChange={e=>setMontant(e.target.value)} type="number" placeholder="Montant Pi" style={inputStyle}/>
          <button onClick={()=>payerPi(view)} style={btnBlue}>{mode==="testnet"?"🧪 Payer en TEST π":"💎 Payer en MAINNET Pi"} - {provider}</button>
          {msg && <div style={{marginTop:"10px",padding:"10px",background:"#e6ffed",borderRadius:"8px",fontSize:"12px"}}>{msg}</div>}
        </div>
      </div>
    )
  }

  return (
    <div style={pageStyle}>
      <div style={{background:"#0d3b8c",color:"white",padding:"18px",borderRadius:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3 style={{margin:0,fontSize:"16px"}}>GARGOURA BANK PRO</h3>
          <span style={{fontSize:"10px",background: mode==="testnet"?"#00c853":"#ff9d00",padding:"4px 8px",borderRadius:"10px"}}>{mode.toUpperCase()}</span>
        </div>
        <h1 style={{margin:"12px 0 0",fontSize:"30px"}}>{solde.toFixed(2)} Pi</h1>
        <p style={{margin:0,fontSize:"11px",opacity:0.8}}>{piUser?`@${piUser.username}`:"Non connecté"} • 1 Pi ≈ 1.50 XAF</p>
        <div style={{display:"flex",gap:"6px",marginTop:"12px"}}>
          <button onClick={()=>setMode("testnet")} style={{flex:1,padding:"6px",borderRadius:"8px",border:"none",background:mode==="testnet"?"white":"rgba(255,255,255,0.3)",color:mode==="testnet"?"#0d3b8c":"white",fontSize:"11px",fontWeight:"bold"}}>TEST π</button>
          <button onClick={()=>setMode("mainnet")} style={{flex:1,padding:"6px",borderRadius:"8px",border:"none",background:mode==="mainnet"?"#ff9d00":"rgba(255,255,255,0.3)",color:"white",fontSize:"11px",fontWeight:"bold"}}>MAINNET</button>
          <button onClick={authPi} style={{flex:1,padding:"6px",borderRadius:"8px",border:"none",background:"#fff",color:"#0d3b8c",fontSize:"11px"}}>Pi Login</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"14px"}}>
        <MenuBtn t="Envoyer" i="📤" onClick={()=>setView("envoyer")}/>
        <MenuBtn t="Recevoir" i="📥" onClick={()=>setView("recevoir")}/>
        <MenuBtn t="Déposer" i="💰" onClick={()=>setView("mobile")}/>
        <MenuBtn t="Retirer" i="💵" onClick={()=>setView("retirer")}/>
        <MenuBtn t="Swapper" i="🔄" onClick={()=>setView("swap")}/>
        <MenuBtn t="Zones P2P" i="🌍" onClick={()=>setView("zones")} hl/>
        <MenuBtn t="Mobile Money" i="📱" onClick={()=>setView("mobile")} hl/>
        <MenuBtn t="Factures" i="🧾" onClick={()=>setView("facture")} hl/>
        <MenuBtn t="Vols" i="✈️" onClick={()=>setView("vols")} />
        <MenuBtn t="Hôtels" i="🏨" onClick={()=>setView("hotels")} />
        <MenuBtn t="Restaurants" i="🍽️" onClick={()=>setView("restos")} />
        <MenuBtn t="Historique" i="📊" onClick={()=>setView("history")} />
      </div>

      {msg && <div style={{marginTop:"12px",padding:"10px",background:"white",borderRadius:"8px",fontSize:"12px",border:"1px solid #0d3b8c"}}>{msg}</div>}
      <p style={{fontSize:"9px",textAlign:"center",color:"#999",marginTop:"16px"}}>PROD: gargoura-digital-bank-v2.vercel.app • Pi SDK 2.0 • {mode}</p>
    </div>
  )
}

function MenuBtn({t,i,onClick,hl}:{t:string,i:string,onClick:()=>void,hl?:boolean}){
  return <button onClick={onClick} style={{background: hl?"#0d3b8c":"white",color: hl?"white":"#0d3b8c",border:"none",borderRadius:"12px",padding:"14px",fontWeight:"bold",fontSize:"12px"}}><div style={{fontSize:"20px"}}>{i}</div>{t}</button>
                                                                                                                          }
