"use client";
import { useState } from "react";

export default function Page(){
  const [mode,setMode]=useState<"test"|"main">("test");
  const [piPay,setPiPay]=useState(false);

  const validationKey="ca0c48577f696482fbf9bd40087f35f99425ab5b348b757ee7e63de427806f66fb3a5c69d8e8acf6d3cf69ae9ec30d60c951932c2796180e1f77daf66293b34f";

  return (
    <div style={{minHeight:"100vh", background:"#f0f5ff", fontFamily:"sans-serif"}}>
      <header style={{background:"#0d3b8c", color:"white", padding:"20px", textAlign:"center"}}>
        <h1 style={{margin:0}}>GARGOURA DIGITAL BANK</h1>
        <p style={{margin:"5px 0 0", opacity:0.9}}>Première Banque Pi du Tchad - Par MAHAMAT GOMBO ABAKAR</p>
        <div style={{marginTop:"15px", display:"flex", justifyContent:"center", gap:"10px"}}>
          <button onClick={()=>setMode("test")} style={{padding:"8px 16px", borderRadius:"20px", border:"none", background:mode==="test"?"#ffcc00":"white", color:mode==="test"?"black":"#0d3b8c", fontWeight:"bold"}}>TEST π</button>
          <button onClick={()=>setMode("main")} style={{padding:"8px 16px", borderRadius:"20px", border:"none", background:mode==="main"?"#00ff88":"white", color:"#0d3b8c", fontWeight:"bold"}}>MAINNET</button>
        </div>
        <p style={{marginTop:"10px", fontSize:"12px"}}>Mode actuel: {mode.toUpperCase()} | Pi Network</p>
      </header>

      <main style={{padding:"20px", maxWidth:"500px", margin:"0 auto"}}>
        <div style={{background:"white", padding:"20px", borderRadius:"15px", boxShadow:"0 4px 15px rgba(0,0,0,0.1)", marginBottom:"15px"}}>
          <h3 style={{color:"#0d3b8c", marginTop:0}}>💳 Portefeuille Pi</h3>
          <p>Solde: 0 Pi ({mode})</p>
          <button onClick={()=>setPiPay(!piPay)} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", fontWeight:"bold"}}>{piPay?"Paiement Pi Activé ✅":"Payer avec Pi"}</button>
          {piPay && <p style={{color:"green", fontSize:"13px", marginTop:"10px"}}>✅ SDK Pi prêt - Validation: {validationKey.slice(0,12)}...</p>}
        </div>

        <div style={{background:"white", padding:"20px", borderRadius:"15px", boxShadow:"0 4px 15px rgba(0,0,0,0.1)", marginBottom:"15px"}}>
          <h3 style={{color:"#0d3b8c", marginTop:0}}>🌍 Zones de Service</h3>
          <ul style={{paddingLeft:"18px", lineHeight:"1.8"}}>
            <li>🇹🇩 CEMAC: Tchad, Cameroun, Gabon, Congo, RCA, Guinée Eq.</li>
            <li>🇸🇳 UEMOA: Sénégal, Côte d'Ivoire, Mali, etc.</li>
            <li>🇯🇴 Jordanie & Moyen-Orient</li>
            <li>🇸🇦 Golf: KSA, UAE, Qatar</li>
            <li>✈️ Vols & 🏨 Hôtels - Paiement Pi</li>
          </ul>
        </div>

        <div style={{background:"white", padding:"20px", borderRadius:"15px", textAlign:"center"}}>
          <p style={{fontSize:"12px", color:"#666"}}>Validation Key:</p>
          <a href="/validation-key.txt" style={{fontSize:"10px", color:"#0d3b8c", wordBreak:"break-all"}}>{validationKey}</a>
          <p style={{marginTop:"15px", fontSize:"12px"}}>© 2026 Gargoura Digital Bank - MAHAMAT GOMBO ABAKAR</p>
        </div>
      </main>
    </div>
  )
        }
