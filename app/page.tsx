        "use client";
import { useState, useEffect } from "react";

export default function Page(){
  const [mode,setMode]=useState("main");
  const [tab,setTab]=useState("bank");
  const [user,setUser]=useState(null as any);
  const [piReady,setPiReady]=useState(false);

  useEffect(()=>{
    const s=document.createElement("script");
    s.src="https://sdk.minepi.com/pi-sdk.js";
    s.async=true;
    s.onload=()=>{
      try{
        const Pi=(window as any).Pi;
        if(Pi){ Pi.init({version:"2.0", sandbox: mode==="test"}); setPiReady(true); }
      }catch{}
    };
    document.head.appendChild(s);
  },[mode]);

  const login=async()=>{
    const Pi=(window as any).Pi;
    if(!Pi){ alert("Ouvre ce lien DANS Pi Browser!"); return; }
    try{
      const auth=await Pi.authenticate(["username","payments"], (p:any)=>{});
      setUser(auth.user);
    }catch(e:any){ alert("Erreur Pi: "+e.message); }
  };

  const pay=(amount:any, memo:any)=>{
    const Pi=(window as any).Pi;
    if(!Pi) return alert("Pi SDK non prêt");
    Pi.createPayment({amount, memo, metadata:{memo}}, {
      onReadyForServerApproval:(id:any)=>{ console.log(id); },
      onReadyForServerCompletion:(id:any, txid:any)=>{ alert("Paiement "+memo+" OK! TX:"+txid); },
      onCancel:()=>{ alert("Annulé"); },
      onError:(e:any)=>{ alert("Erreur: "+e); }
    });
  };

  return (
    <div style={{minHeight:"100vh", background:"#eef3ff", fontFamily:"sans-serif"}}>
      <div style={{background:"#0d3b8c", color:"white", padding:"16px", textAlign:"center"}}>
        <h2 style={{margin:0}}>GARGOURA DIGITAL BANK</h2>
        <p style={{fontSize:"11px"}}>MAHAMAT GOMBO ABAKAR | Domaine Validé ✅ | {mode}</p>
        <div style={{marginTop:"10px", display:"flex", justifyContent:"center", gap:"6px"}}>
          <button onClick={()=>setMode("test")} style={{padding:"6px 10px", borderRadius:"20px", border:"none", background:mode==="test"?"#ffcc00":"#fff"}}>TEST</button>
          <button onClick={()=>setMode("main")} style={{padding:"6px 10px", borderRadius:"20px", border:"none", background:mode==="main"?"#00ff88":"#fff"}}>MAINNET</button>
        </div>
        <div style={{marginTop:"10px", display:"flex", justifyContent:"center", gap:"5px", flexWrap:"wrap"}}>
          <button onClick={()=>setTab("bank")} style={{padding:"5px 9px", borderRadius:"10px", border:"none", background:tab==="bank"?"#fff":"rgba(255,255,255,0.3)", color:tab==="bank"?"#0d3b8c":"#fff"}}>Banque</button>
          <button onClick={()=>setTab("vols")} style={{padding:"5px 9px", borderRadius:"10px", border:"none", background:tab==="vols"?"#fff":"rgba(255,255,255,0.3)", color:tab==="vols"?"#0d3b8c":"#fff"}}>Vols</button>
          <button onClick={()=>setTab("hotels")} style={{padding:"5px 9px", borderRadius:"10px", border:"none", background:tab==="hotels"?"#fff":"rgba(255,255,255,0.3)", color:tab==="hotels"?"#0d3b8c":"#fff"}}>Hotels</button>
          <button onClick={()=>setTab("pi")} style={{padding:"5px 9px", borderRadius:"10px", border:"none", background:tab==="pi"?"#fff":"rgba(255,255,255,0.3)", color:tab==="pi"?"#0d3b8c":"#fff"}}>Pi Browser</button>
        </div>
      </div>

      <div style={{padding:"14px", maxWidth:"500px", margin:"0 auto"}}>
        {tab==="bank" && (
          <div style={{background:"white", padding:"16px", borderRadius:"12px"}}>
            <h3 style={{color:"#0d3b8c", marginTop:0}}>Route 1: Paiement Réel Pi</h3>
            {!user? <button onClick={login} style={{width:"100%", padding:"12px", background:"#6f00ff", color:"white", border:"none", borderRadius:"10px", fontWeight:"bold"}}>{piReady?"Se connecter avec Pi":"Chargement..."}</button> : <div><p>Bonjour {user.username} 👋</p><button onClick={()=>pay(1,"Depot Gargoura")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px"}}>Payer 1 Pi - Dépôt</button><button onClick={()=>pay(0.5,"Frais")} style={{width:"100%", padding:"10px", marginTop:"6px", background:"#00b894", color:"white", border:"none", borderRadius:"10px"}}>Payer 0.5 Pi - Frais</button></div>}
            <p style={{fontSize:"10px", color:"#888", marginTop:"8px"}}>SDK: {piReady?"Prêt ✅":"Chargement..."} | Doit être ouvert dans Pi Browser</p>
          </div>
        )}
        {tab==="vols" && (
          <div style={{background:"white", padding:"16px", borderRadius:"12px"}}>
            <h3 style={{color:"#0d3b8c", marginTop:0}}>Route 2: Vols CEMAC/UEMOA/Golf</h3>
            <select style={{width:"100%", padding:"10px", borderRadius:"8px"}}><option>NDJ - DLA - Cameroun</option><option>NDJ - ABJ - Côte d'Ivoire</option><option>NDJ - DKR - Sénégal</option><option>NDJ - AMM - Jordanie</option><option>NDJ - JED - KSA</option><option>NDJ - DXB - Dubaï</option></select>
            <button onClick={()=>pay(2.5,"Billet Avion")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"10px"}}>Réserver 2.5 Pi ✈️</button>
          </div>
        )}
        {tab==="hotels" && (
          <div style={{background:"white", padding:"16px", borderRadius:"12px"}}>
            <h3 style={{color:"#0d3b8c", marginTop:0}}>Hôtels Paiement Pi</h3>
            <select style={{width:"100%", padding:"10px", borderRadius:"8px"}}><option>Radisson Blu - N'Djamena</option><option>Hilton - Yaoundé</option><option>King Fahd - Dakar</option><option>Kempinski - Amman</option><option>ZamZam - Makkah</option><option>Burj Al Arab - Dubaï</option></select>
            <button onClick={()=>pay(1.2,"Hotel")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"10px"}}>Réserver 1.2 Pi/Nuit 🏨</button>
          </div>
        )}
        {tab==="pi" && (
          <div style={{background:"white", padding:"16px", borderRadius:"12px"}}>
            <h3 style={{color:"#0d3b8c", marginTop:0}}>Route 3: Pi App Store</h3>
            <p style={{fontSize:"13px"}}>✅ Domaine: Validated</p><p style={{fontSize:"13px"}}>✅ Key: ca0c48... OK</p><p style={{fontSize:"13px"}}>✅ SDK: Intégré</p>
            <div style={{background:"#f0f5ff", padding:"10px", borderRadius:"8px", fontSize:"12px", marginTop:"8px"}}>Test: Pi Browser {">"} gargoura-digital-bank-v2.vercel.app</div>
            <a href="/validation-key.txt" style={{fontSize:"12px"}}>Voir validation-key.txt</a>
            <p style={{fontSize:"11px", marginTop:"10px"}}>© MAHAMAT GOMBO ABAKAR 2026</p>
          </div>
        )}
      </div>
    </div>
  )
  }
