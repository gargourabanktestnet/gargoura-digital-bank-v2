"use client"
import { useState, useEffect } from "react"

export function Transferer({gdb}:{gdb:string}){
const [tab,setTab]=useState("INTERNE")
const [zone,setZone]=useState("CEMAC")
const [bank,setBank]=useState("Afriland First Bank Cameroun")
const [dest,setDest]=useState("")
const [mont,setMont]=useState("")
const [note,setNote]=useState("")
const [devType,setDevType]=useState("crypto")
const [compte,setCompte]=useState("")

const BANKS:any={
"CEMAC":["Afriland First Bank Cameroun","Commercial Bank Tchad","BGFI Cameroun","UBA Tchad"],
"UEMOA":["BOA Senegal","Ecobank CI","Coris BF","UBA Burkina"],
"Dollar":["Chase USA","Bank of America","Citi USA","Wells Fargo"],
"Jordanie":["Arab Bank Jordan","Jordan Islamic Bank","Cairo Amman Bank"],
"Golfe":["ADCB UAE","Al Rajhi Saudi","QNB Qatar","KFH Kuwait"],
"International":["BNP France","Deutsche Bank","Barclays UK","HSBC"]
}
const Z=["CEMAC","UEMOA","Dollar","Jordanie","Golfe","International"]

useEffect(()=>{setBank(BANKS[zone][0])},[zone])

function sendInterne(){
if(!dest||!mont){alert("Remplir destinataire et montant"); return}
alert(`✅ Transfert Interne\nDe: ${gdb}\nVers: ${dest}\nMontant: ${mont} PI\nNote: ${note}`)
setDest(""); setMont(""); setNote("")
}
function sendExterne(){
if(!compte||!mont){alert("Remplir compte et montant"); return}
alert(`⚡ sendToExternalBank\n${bank} [${zone}]\nCompte: ${compte}\nMontant: ${mont} ${devType}\nISO20022 SWIFT SEPA Instantané`)
setCompte(""); setMont("")
}

return(
<div style={{display:"flex",flexDirection:"column",gap:10}}>
<div style={{display:"flex",background:"#f1f5f9",borderRadius:20,padding:3,gap:4}}>
<button onClick={()=>setTab("INTERNE")} style={{flex:1,padding:10,borderRadius:20,border:"none",fontWeight:900,fontSize:12,background:tab==="INTERNE"?"#fff":"transparent",color:tab==="INTERNE"?"#1e40af":"#64748b",boxShadow:tab==="INTERNE"?"0 2px 6px rgba(0,0,0,0.1)":"none"}}>P2P INTERNE</button>
<button onClick={()=>setTab("EXTERNE")} style={{flex:1,padding:10,borderRadius:20,border:"none",fontWeight:900,fontSize:12,background:tab==="EXTERNE"?"#fff":"transparent",color:tab==="EXTERNE"?"#1e40af":"#64748b",boxShadow:tab==="EXTERNE"?"0 2px 6px rgba(0,0,0,0.1)":"none"}}>P2P EXTERNE</button>
</div>
{tab==="INTERNE"?(
<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{fontWeight:800,fontSize:12,color:"#1e40af"}}>Transfert Interne Gargoura</div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Destinataire</div>
<div style={{display:"flex",gap:6,marginTop:3}}><input value={dest} onChange={e=>setDest(e.target.value)} placeholder="Numéro téléphone ou ID GDB" style={{flex:1,border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12}}/><button style={{width:36,height:36,borderRadius:10,border:"1px solid #cbd5e1",background:"#fff"}}>⊞</button></div></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Cryptomonnaie</div><select style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:3}}><option>π PiCoin (314,159.00 USD)</option></select></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Montant</div><input value={mont} onChange={e=>setMont(e.target.value)} placeholder="0.00" style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:3}}/></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Note (optionnel)</div><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Ajouter une note" style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:3}}/></div>
<button onClick={sendInterne} style={{background:"#1e40af",color:"#fff",border:"none",borderRadius:12,padding:12,fontWeight:900,marginTop:4}}>Envoyer {gdb.slice(0,12)}</button>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:800,fontSize:12}}>Transfert Externe</div><div style={{fontSize:9,color:"#1e40af",fontWeight:800}}>ISO 20022 • SWIFT • SEPA</div></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Banque Partenaire</div><div style={{display:"flex",gap:6,marginTop:3}}><select value={zone} onChange={e=>setZone(e.target.value)} style={{border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 8px",fontSize:10}}>{Z.map((z:string)=><option key={z} value={z}>{z}</option>)}</select><select value={bank} onChange={e=>setBank(e.target.value)} style={{flex:1,border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 10px",fontSize:11}}>{BANKS[zone].map((b:string)=><option key={b}>{b}</option>)}</select></div></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Numéro de Compte</div><input value={compte} onChange={e=>setCompte(e.target.value)} placeholder="Entrer le numéro de compte" style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:3}}/></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Type de Devise</div><div style={{display:"flex",background:"#f1f5f9",borderRadius:12,padding:3,marginTop:3}}><button onClick={()=>setDevType("crypto")} style={{flex:1,padding:6,borderRadius:10,border:"none",fontSize:10,fontWeight:800,background:devType==="crypto"?"#fff":"transparent"}}>Cryptomonnaies</button><button onClick={()=>setDevType("locale")} style={{flex:1,padding:6,borderRadius:10,border:"none",fontSize:10,fontWeight:800,background:devType==="locale"?"#fff":"transparent"}}>Devises Locales</button></div><select style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:6}}>{devType==="crypto"?<option>π PiCoin (314,159.00 USD)</option>:<><option>XAF - Franc CFA CEMAC</option><option>XOF - UEMOA</option><option>SAR - Riyal Saoudien</option><option>AED - Dirham UAE</option><option>USD - Dollar</option></>}</select></div>
<div><div style={{fontSize:10,fontWeight:700,color:"#475569"}}>Montant</div><input value={mont} onChange={e=>setMont(e.target.value)} placeholder="0.00" style={{width:"100%",border:"1px solid #cbd5e1",borderRadius:12,padding:"10px 12px",fontSize:12,marginTop:3}}/></div>
<div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:8,fontSize:9,color:"#15803d",fontWeight:700,textAlign:"center"}}>⚡ Transfert instantané via système interopérable ISO20022 SWIFT SEPA</div>
<button onClick={sendExterne} style={{background:"#1e40af",color:"#fff",border:"none",borderRadius:12,padding:12,fontWeight:900}}>⚡ sendToExternalBank</button>
</div>
)}
</div>
)
}

const RATES:any={USD:314159,EUR:290000,XAF:190000000,XOF:190000000,SAR:1178000,AED:1153000}
const Z2=["CEMAC","UEMOA","Dollar","Jordanie","Golfe","Moyen-Orient","International"]
const BANKS2:any={
"CEMAC":["Afriland First Bank Cameroun","Commercial Bank Tchad","BGFI Cameroun","UBA Tchad"],
"UEMOA":["BOA Senegal","Ecobank CI","Coris BF","UBA Burkina"],
"Dollar":["Chase USA","Bank of America","Citi USA","Wells Fargo"],
"Jordanie":["Arab Bank Jordan","Jordan Islamic Bank","Cairo Amman Bank"],
"Golfe":["ADCB UAE","Al Rajhi Saudi","QNB Qatar","KFH Kuwait"],
"Moyen-Orient":["Bank Audi Liban","Bank of Palestine","Ahli Jordan"],
"International":["BNP France","Deutsche Bank","Barclays UK","HSBC"]
}

export function Virement({gdb}:{gdb:string}){const [zone,setZone]=useState("CEMAC"); const [bank,setBank]=useState(BANKS2["CEMAC"][0]); useEffect(()=>setBank(BANKS2[zone][0]),[zone]); return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>🏦 Virement ISO20022</div><select value={zone} onChange={e=>setZone(e.target.value)} style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}>{Z2.map((z:string)=><option key={z}>{z}</option>)}</select><select value={bank} onChange={e=>setBank(e.target.value)} style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}>{BANKS2[zone].map((b:string)=><option key={b}>{b}</option>)}</select><input placeholder="Montant" style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}/><button style={{padding:12,background:"#1e40af",color:"#fff",border:"none",borderRadius:10,fontWeight:900}}>Virement {gdb.slice(0,8)}</button></div>)}
export function PiDex({gdb}:{gdb:string}){return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>🔄 Pi DEX • AMM • APY 15%</div><div style={{background:"#f8fafc",padding:10,borderRadius:10}}>1 PI = 314159 USD</div><button style={{padding:12,background:"#1e40af",color:"#fff",border:"none",borderRadius:10,fontWeight:900}}>Swapper {gdb.slice(0,6)}</button></div>)}
export function ConvertirComp(){const [to,setTo]=useState("USD"); return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>💱 Convertisseur 100+ Devises</div><select value={to} onChange={e=>setTo(e.target.value)} style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}><option>USD</option><option>EUR</option><option>XAF</option><option>XOF</option><option>SAR</option><option>AED</option></select><div style={{fontWeight:900,fontSize:18}}>1 PI = {RATES[to]} {to}</div></div>)}
export function TradingComp(){const pairs=["PI/USD","PI/EUR","PI/XAF"]; return(<div><div style={{fontWeight:900}}>📈 Trading • {pairs.join(" • ")}</div><div style={{marginTop:8,padding:10,background:"#eff6ff",borderRadius:10}}>Chart TradingView PI 314159 USD</div></div>)}
export function AIAutoComp(){return(<div style={{padding:10,background:"#f0fdf4",borderRadius:10}}><div style={{fontWeight:900}}>🤖 AI Auto Trading</div><div style={{fontSize:11,marginTop:6}}>Bot intelligent GDB - Rendement auto</div></div>)}
export function BlockchainComp(){return(<div style={{padding:10,background:"#eff6ff",borderRadius:10}}><div style={{fontWeight:900}}>⛓️ Blockchain Explorer</div><div style={{fontSize:11,marginTop:6}}>Pi Network • Stellar • ISO20022</div></div>)}
export function ShoppingComp(){const sites=["Amazon","Alibaba","Jumia"]; return(<div><div style={{fontWeight:900}}>🛒 Shopping Mondial</div>{sites.map(s=><div key={s} style={{padding:8,border:"1px solid #e2e8f0",borderRadius:8,marginTop:6}}>{s} - Paiement PI</div>)}</div>)}
export function PortefeuilleComp({gdb,rcv}:{gdb:string,rcv:string}){return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>👛 Portefeuilles • {gdb.slice(0,12)}</div><div style={{display:"flex",gap:6}}><button style={{flex:1,padding:10,borderRadius:10,background:"#1e40af",color:"#fff",border:"none",fontWeight:800}}>Déposer</button><button style={{flex:1,padding:10,borderRadius:10,background:"#fff",border:"1px solid #1e40af",color:"#1e40af",fontWeight:800}}>Retirer</button><button style={{flex:1,padding:10,borderRadius:10,background:"#fff",border:"1px solid #16a34a",color:"#16a34a",fontWeight:800}}>Airtime</button></div><div style={{fontSize:10,color:"#64748b"}}>Code: {rcv}</div></div>)}
export function AutomobileComp(){return(<div style={{padding:10,background:"#fef3c7",borderRadius:10}}><div style={{fontWeight:900}}>🚗 Automobile • Achat PI</div><div style={{fontSize:11,marginTop:6}}>Toyota, Mercedes - Paiement PI 314159</div></div>)}
export function AgregationComp(){return(<div style={{padding:10,background:"#f8fafc",borderRadius:10}}><div style={{fontWeight:900}}>🔗 Agrégation DeFi</div><div style={{fontSize:11,marginTop:6}}>10+ DEX connectés - Meilleur taux PI</div></div>)}
export function GestionComp(){return(<div style={{padding:10,background:"#f1f5f9",borderRadius:10}}><div style={{fontWeight:900}}>⚙️ Gestion Compte</div><div style={{fontSize:11,marginTop:6}}>Sécurité, limites, 2FA</div></div>)}
export function Cartes({gdb,rcv}:{gdb:string,rcv:string}){const [type,setType]=useState("Virtuelle"); const [pay,setPay]=useState("Pi"); const [showCvv,setShowCvv]=useState(false); const [balance,setBalance]=useState("0"); return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{display:"flex",background:"#f1f5f9",borderRadius:20,padding:3}}><button onClick={()=>setType("Virtuelle")} style={{flex:1,padding:6,borderRadius:20,border:"none",fontWeight:800,background:type==="Virtuelle"?"#fff":"transparent"}}>Virtuelle</button><button onClick={()=>setType("Physique")} style={{flex:1,padding:6,borderRadius:20,border:"none",fontWeight:800,background:type==="Physique"?"#fff":"transparent"}}>Physique</button></div><div style={{background:type==="Virtuelle"?"linear-gradient(135deg,#1e40af,#3b82f6)":"linear-gradient(135deg,#facc15,#eab308)",borderRadius:16,padding:14,color:type==="Virtuelle"?"#fff":"#000"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:900}}>GDB {type}</div><div>💳</div></div><div style={{marginTop:20,fontSize:12}}>{gdb.slice(0,4)} **** **** {rcv.slice(-4)}</div><div style={{marginTop:10,fontSize:10}}>{pay} - {balance} PI</div></div><div style={{display:"flex",gap:6}}><input type="number" value={balance} onChange={e=>setBalance(e.target.value)} placeholder="Solde" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}/><button onClick={()=>setShowCvv(!showCvv)} style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1",background:"#fff"}}>{showCvv?"***":"CVV"}</button></div><button style={{padding:10,borderRadius:10,background:"#1e40af",color:"#fff",border:"none",fontWeight:900}}>Activer Carte {type} • {pay}</button></div>)}
export function KYCComp({gdb,onVerified}:{gdb:string,onVerified?:(u:string)=>void}){const [addr,setAddr]=useState(""); const [user,setUser]=useState(""); function verify(){if(!addr.startsWith("G")||addr.length<10){alert("Adresse G... invalide"); return} if(!user){alert("Username Pi requis"); return} localStorage.setItem("gdb_pi_addr",addr); localStorage.setItem("gdb_pi_user",user); localStorage.setItem("gdb_kyc_verified","true"); onVerified && onVerified(user); alert("KYC Verifie "+user)} return(<div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>🛡️ KYC Pi Officiel • {gdb}</div><input value={user} onChange={e=>setUser(e.target.value)} placeholder="Username Pi" style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}/><input value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Adresse G... Stellar" style={{padding:10,borderRadius:10,border:"1px solid #cbd5e1"}}/><button onClick={verify} style={{padding:12,borderRadius:10,background:"#16a34a",color:"#fff",border:"none",fontWeight:900}}>Verifier KYC</button></div>)}
