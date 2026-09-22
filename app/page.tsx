"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [tab,setTab]=useState("bank");
  const [user,setUser]=useState<any>(null);
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
  const pay=(amount:any, memo:any)=>{
    const Pi=(window as any).Pi;
    Pi.createPayment({amount, memo, metadata:{memo}},{
      onReadyForServerApproval: async (id:string)=>{
        await fetch("/api/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id})});
      },
      onReadyForServerCompletion: async (id:string, txid:string)=>{
        await fetch("/api/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id, txid})});
        alert("Paiement "+memo+" REUSSI TX: "+txid);
      },
      onCancel:()=>{ alert("Annule"); },
      onError:(e:any)=>{ alert("Erreur: "+e); }
    });
  };
  return(
    <div style={{minHeight:"100vh", background:"#eef3ff", fontFamily:"sans-serif"}}>
      <div style={{background:"#0d3b8c", color:"white", padding:"16px", textAlign:"center"}}>
        <h2>GARGOURA DIGITAL BANK</h2>
        <p style={{fontSize:"11px"}}>MAHAMAT GOMBO - Valide</p>
        <div style={{marginTop:"8px", display:"flex", justifyContent:"center", gap:"5px"}}>
          <button onClick={()=>setTab("bank")} style={{padding:"6px 10px", borderRadius:"10px", border:"none"}}>Banque</button>
          <button onClick={()=>setTab("vols")} style={{padding:"6px 10px", borderRadius:"10px", border:"none"}}>Vols</button>
          <button onClick={()=>setTab("hotels")} style={{padding:"6px 10px", borderRadius:"10px", border:"none"}}>Hotels</button>
          <button onClick={()=>setTab("pi")} style={{padding:"6px 10px", borderRadius:"10px", border:"none"}}>Pi</button>
        </div>
      </div>
      <div style={{padding:"12px", maxWidth:"500px", margin:"0 auto"}}>
        {tab==="bank" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Banque Pi</h3>{!user?<button onClick={login} style={{width:"100%", padding:"12px", background:"#6f00ff", color:"white", border:"none", borderRadius:"10px"}}>Login Pi {ready?"OK":"..."}</button>:<div><p>Salut {user.username}</p><button onClick={()=>pay(1,"Depot")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px"}}>Payer 1 Pi TEST FINAL</button></div>}</div>}
        {tab==="vols" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Vols</h3><button onClick={()=>pay(2.5,"Vol NDJ-DLA")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px"}}>Reserver 2.5 Pi</button></div>}
        {tab==="hotels" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Hotels</h3><button onClick={()=>pay(1.2,"Hotel")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px"}}>Reserver 1.2 Pi</button></div>}
        {tab==="pi" && <div style={{background:"white", padding:"16px", borderRadius:"12px"}}><h3>Pi Store</h3><p>Cle API ajoutee - Backend OK - Pret paiement reel</p></div>}
      </div>
    </div>
  )
    }
