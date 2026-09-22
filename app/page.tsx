"use client";
import { useState, useEffect } from "react";

declare global { interface Window { Pi:any } }

export default function Page(){
  const [mode,setMode]=useState<"test"|"main">("main");
  const [tab,setTab]=useState("bank");
  const [user,setUser]=useState<any>(null);
  const [piReady,setPiReady]=useState(false);
  const validationKey="ca0c48577f696482fbf9bd40087f35f99425ab5b348b757ee7e63de427806f66fb3a5c69d8e8acf6d3cf69ae9ec30d60c951932c2796180e1f77daf66293b34f";

  // 1 = CHARGER PI SDK
  useEffect(()=>{
    const s=document.createElement("script");
    s.src="https://sdk.minepi.com/pi-sdk.js";
    s.onload=()=>{ window.Pi?.init({version:"2.0", sandbox: mode==="test"}); setPiReady(true); };
    document.head.appendChild(s);
  },[mode]);

  const loginWithPi=async()=>{
    if(!window.Pi) return alert("Ouvre dans Pi Browser!");
    try{
      const auth=await window.Pi.authenticate(["username","payments"],(p:any)=>{console.log("incomplete",p)});
      setUser(auth.user);
      alert("Bienvenue "+auth.user.username+" ✅");
    }catch(e){ alert("Auth échouée: "+e); }
  };

  const payWithPi=(amount:number, memo:string)=>{
    if(!window.Pi) return alert("Pi SDK non prêt");
    window.Pi.createPayment({
      amount, memo, metadata:{type:memo}
    },{
      onReadyForServerApproval:(id:string)=>{ console.log("approve",id); /* TODO: appeler /api/approve */ },
      onReadyForServerCompletion:(id:string, txid:string)=>{ console.log("complete",id,txid); alert("Paiement "+memo+" Réussi! TX: "+txid); },
      onCancel:(id:string)=>{ alert("Paiement annulé"); },
      onError:(err:any)=>{ alert("Erreur: "+err); }
    });
  };

  return (
    <div style={{minHeight:"100vh", background:"#f0f5ff", fontFamily:"sans-serif"}}>
      <header style={{background:"#0d3b8c", color:"white", padding:"18px", textAlign:"center", position:"sticky", top:0, zIndex:10}}>
        <h2 style={{margin:0}}>GARGOURA DIGITAL BANK</h2>
        <p style={{fontSize:"11px", margin:"4px 0"}}>Par MAHAMAT GOMBO ABAKAR | {mode.toUpperCase()} - Domaine Validé ✅</p>
        <div style={{display:"flex", justifyContent:"center", gap:"8px", marginTop:"10px"}}>
          <button onClick={()=>setMode("test")} style={{padding:"6px 12px", borderRadius:"20px", border:"none", background:mode==="test"?"#ffcc00":"#fff", fontWeight:"bold"}}>TEST π</button>
          <button onClick={()=>setMode("main")} style={{padding:"6px 12px", borderRadius:"20px", border:"none", background:mode==="main"?"#00ff88":"#fff", fontWeight:"bold"}}>MAINNET</button>
        </div>
        <nav style={{display:"flex", justifyContent:"center", gap:"6px", marginTop:"12px", flexWrap:"wrap"}}>
          {[
            ["bank","💳 Banque"],
            ["vols","✈️ Vols"],
            ["hotels","🏨 Hôtels"],
            ["pibrowser","📱 Pi Browser"]
          ].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"6px 10px", borderRadius:"12px", border:"none", background:tab===k?"white":"rgba(255,255,255,0.2)", color:tab===k?"#0d3b8c":"white", fontSize:"12px", fontWeight:"bold"}}>{l}</button>
          ))}
        </nav>
      </header>

      <main style={{padding:"16px", maxWidth:"520px", margin:"0 auto"}}>
        {/* ROUTE 1: BANQUE + PAIEMENT REEL PI */}
        {tab==="bank" && (
          <>
            <div style={{background:"white", padding:"18px", borderRadius:"14px", boxShadow:"0 2px 10px rgba(0,0,0,0.08)", marginBottom:"12px"}}>
              <h3 style={{color:"#0d3b8c", margin:"0 0 10px"}}>Route 1: Paiement Pi Réel</h3>
              {!user? (
                <button onClick={loginWithPi} disabled={!piReady} style={{width:"100%", padding:"14px", background:piReady?"#6f00ff":"#ccc", color:"white", border:"none", borderRadius:"10px", fontWeight:"bold", fontSize:"15px"}}>
                  {piReady?"Se connecter avec Pi - Mainnet":"Chargement Pi SDK..."}
                </button>
              ) : (
                <>
                  <p>👋 Bonjour <b>{user.username}</b></p>
                  <p>Solde: Test - Pi Browser requis</p>
                  <button onClick={()=>payWithPi(1, "Dépôt Gargoura Bank")} style={{width:"100%", padding:"14px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", fontWeight:"bold"}}>Payer 1 Pi - Dépôt Bancaire</button>
                  <button onClick={()=>payWithPi(0.5, "Frais de service")} style={{width:"100%", padding:"10px", marginTop:"8px", background:"#00b894", color:"white", border:"none", borderRadius:"10px"}}>Payer 0.5 Pi - Frais</button>
                </>
              )}
              <p style={{fontSize:"10px", color:"#888", marginTop:"8px"}}>SDK: {piReady?"Prêt ✅":"..."} | Validation: {validationKey.slice(0,10)}... | Ouvrir dans Pi Browser obligatoire</p>
            </div>
            <div style={{background:"white", padding:"14px", borderRadius:"14px"}}>
              <p style={{fontSize:"12px"}}>✅ <b>Domaine validé:</b> https://gargoura-digital-bank-v2.vercel.app/validation-key.txt</p>
              <p style={{fontSize:"11px", color:"green"}}>Status: Domain ownership is validated.</p>
            </div>
          </>
        )}

        {/* ROUTE 2: VOLS & HOTELS */}
        {tab==="vols" && (
          <div style={{background:"white", padding:"18px", borderRadius:"14px"}}>
            <h3 style={{color:"#0d3b8c"}}>Route 2: Vols CEMAC / UEMOA / Golf / Jordanie</h3>
            <select style={{width:"100%", padding:"10px", margin:"6px 0", borderRadius:"8px"}}><option>N'Djamena (NDJ) -> Douala (DLA)</option><option>N'Djamena -> Abidjan (ABJ)</option><option>N'Djamena -> Dakar (DKR)</option><option>N'Djamena -> Amman (AMM) - Jordanie</option><option>N'Djamena -> Djeddah (JED) - KSA</option><option>N'Djamena -> Dubaï (DXB)</option></select>
            <input type="date" style={{width:"100%", padding:"10px", borderRadius:"8px", margin:"6px 0"}}/>
            <button onClick={()=>payWithPi(2.5, "Billet Avion CEMAC")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"8px"}}>Réserver - Payer 2.5 Pi ✈️</button>
            <p style={{fontSize:"11px", color:"#666", marginTop:"8px"}}>Partenaires: ASKY, Air Côte d'Ivoire, Ethiopian, Saudia</p>
          </div>
        )}

        {tab==="hotels" && (
          <div style={{background:"white", padding:"18px", borderRadius:"14px"}}>
            <h3 style={{color:"#0d3b8c"}}>Route 2: Hôtels - Paiement Pi</h3>
            <select style={{width:"100%", padding:"10px", borderRadius:"8px"}}><option>🇹🇩 Radisson Blu - N'Djamena</option><option>🇨🇲 Hilton - Yaoundé</option><option>🇸🇳 King Fahd - Dakar</option><option>🇯🇴 Kempinski - Amman Jordanie</option><option>🇸🇦 ZamZam - La Mecque</option><option>🇦🇪 Burj Al Arab - Dubaï</option></select>
            <button onClick={()=>payWithPi(1.2, "Réservation Hôtel")} style={{width:"100%", padding:"12px", background:"#0d3b8c", color:"white", border:"none", borderRadius:"10px", marginTop:"8px"}}>Réserver - 1.2 Pi / Nuit 🏨</button>
          </div>
        )}

        {/* ROUTE 3: PI BROWSER & APP STORE */}
        {tab==="pibrowser" && (
          <div style={{background:"white", padding:"18px", borderRadius:"14px"}}>
            <h3 style={{color:"#0d3b8c"}}>Route 3: Pi Browser & Listing</h3>
            <ul style={{fontSize:"13px", lineHeight:"1.9"}}>
              <li>✅ Domaine vérifié Mainnet</li>
              <li>✅ validation-key.txt accessible</li>
              <li>✅ Pi SDK v2.0 intégré</li>
              <li>🔲 Prochaine étape: Tester dans Pi Browser</li>
              <li>🔲 Créer /api/approve et /api/complete (backend)</li>
              <li>🔲 Soumettre à Pi App Portal pour review</li>
            </ul>
            <p style={{fontSize:"12px", background:"#f0f5ff", padding:"10px", borderRadius:"8px"}}>Pour tester: Ouvre Pi Browser {">"} Tape: gargoura-digital-bank-v2.vercel.app {">"} Connecte avec Pi</p>
            <a href="/validation-key.txt" style={{fontSize:"11px", color:"#0d3b8c"}}>Voir validation-key.txt</a>
            <p style={{marginTop:"10px", fontSize:"11px"}}>© MAHAMAT GOMBO ABAKAR - Première Banque Pi Tchad</p>
          </div>
        )}
      </main>
    </div>
  )
    }
