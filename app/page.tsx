"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [tab,setTab]=useState("bank");
  const [user,setUser]=useState(null as any);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const s=document.createElement("script");
    s.src="https://sdk.minepi.com/pi-sdk.js";
    s.onload=()=>{ try{(window as any).Pi.init({version:"2.0", sandbox:false}); setReady(true);}catch{} };
    document.head.appendChild(s);
  },[]);
  const login=async()=>{
    const Pi=(window as any).Pi;
    if(!Pi) return alert("Ouvre dans Pi Browser");
    const a=await Pi.authenticate(["username","payments"],()=>{});
    setUser(a.user);
  };
  onReadyForServerApproval: async (id:any)=>{
  await fetch("/api/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id})});
},
onReadyForServerCompletion: async (id:any, tx:any)=>{
  await fetch("/api/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id, txid:tx})});
  alert("Paiement "+m+" RÉUSSI! TX:"+tx+" ✅");
},
      onReadyForServerCompletion:(id:any, tx:any)=>{ alert("Paiement OK "+tx); },
      onCancel:()=>{},
      onError:(e:any)=>{ alert(e); }
    });
  };
  return(
    <div style={{minHeight:"100vh", background:"#eef3ff", fontFamily:"sans-serif"}}>
      <div style={{background:"#0d3b8c", color:"white", padding:"16px", textAlign:"center"}}>
        <h2>GARGOURA DIGITAL BANK</h2>
        <p style={{fontSize:"11px"}}>MAHAMAT GOMBO ABAKAR - Validé ✅</p>
        <div style={{marginTop:"8px", display:"flex", justifyContent:"center", gap:"5px", flexWrap:"wrap"}}>
          <button onClick={()=>setTab("bank")} style={{padding:"6px 10px", borderRadius:"10px", border:"none", background:tab==="bank"?"#fff":"#ffffff44"}}>Banque</button>
          <button onClick={()=>setTab("vols")} style={{padding:"6px 10px", borderRadius:"10px", border:"none", background:tab==="vols"?"#fff":"#ffffff44"}}>Vols</button>
          <button onClick={()=>setTab("hotels")} style={{padding:"6px 10px", borderRadius:"10px", border:"none", background:tab==="hotels"?"#fff":"#ffffff44"}}>Hotels</button>
          <button onClick={()=>setTab("pi")} style={{padding:"6px 10px", borderRadius:"10px", border:"none", background:tab==="pi"?"#fff":"#ffffff44"}}>Pi Store</button>
        </div>
      </div>
      <div style={{padding:"12px", maxWidth:"500px", margin:"0 auto"}}>
        {tab==="bank" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Banque Pi</h3>{!user?<button onClick={login} style={{width:"100%", padding:"12px", background:"#6f00ff", color:"white", border:"none", borderRadius:"10px"}}>Login Pi {ready?"✅":"..."}</button>:<div><p>Salut {user.username}</p><button onClick={()=>pay(1,"Depot")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px"}}>Payer 1 Pi</button></div>}<p style={{fontSize:"10px", marginTop:"8px"}}><a href="/validation-key.txt">validation-key.txt OK</a></p></div>}
        {tab==="vols" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Vols</h3><select style={{width:"100%", padding:"10px"}}><option>NDJ-DLA</option><option>NDJ-ABJ</option><option>NDJ-DXB</option><option>NDJ-JED</option></select><button onClick={()=>pay(2.5,"Vol")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"8px"}}>Réserver 2.5 Pi</button></div>}
        {tab==="hotels" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Hotels</h3><select style={{width:"100%", padding:"10px"}}><option>Radisson NDJ</option><option>Hilton YAO</option><option>Kempinski AMM</option></select><button onClick={()=>pay(1.2,"Hotel")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"8px"}}>Réserver 1.2 Pi</button></div>}
        {tab==="pi" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Pi Browser</h3><p style={{fontSize:"12px"}}>✅ Domaine validé<br/>✅ SDK prêt<br/>✅ Prêt pour App Store</p><p style={{fontSize:"11px", background:"#f0f5ff", padding:"8px", borderRadius:"8px"}}>Teste dans Pi Browser: gargoura-digital-bank-v2.vercel.app</p></div>}
      </div>
    </div>
  )
                                                                                                                                                                                                         }
