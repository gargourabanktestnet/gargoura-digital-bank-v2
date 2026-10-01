"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, PiDex, ConvertirComp, TradingComp, PortefeuilleComp, Cartes, KYCComp, AIAutoComp, BlockchainComp, ShoppingComp, AutomobileComp, AgregationComp, GestionComp } from "./Components"

const ICONS:any = { transferer:"💸", virement:"🏦", pidex:"🔄", convertir:"💱", trading:"📈", portefeuilles:"👛", cartes:"💳", kyc:"🛡️", ai:"🤖", blockchain:"⛓️", shopping:"🛒", automobile:"🚗", agregation:"🔗", gestion:"⚙️" }

export default function Page(){
const [m,setM]=useState<string|null>(null)
const [gdb]=useState("GDB-TEST-1234")
const [rcv]=useState("RCV-5678")
const [kycOk,setKycOk]=useState(false)
useEffect(()=>{ setKycOk(localStorage.getItem("gdb_kyc_verified")==="true") },[])

const funcs = [
{id:"transferer",label:"Transferer"},{id:"virement",label:"Virement"},{id:"pidex",label:"Pi DEX"},{id:"convertir",label:"Convertir"},
{id:"trading",label:"Trading"},{id:"portefeuilles",label:"Wallet"},{id:"cartes",label:"Cartes"},{id:"kyc",label:kycOk?"KYC ✅":"KYC"},
{id:"ai",label:"AI Auto"},{id:"blockchain",label:"Blockchain"},{id:"shopping",label:"Shopping"},{id:"gestion",label:"Gestion"}
]

return(
<div style={{maxWidth:420,margin:"0 auto",background:"#f8fafc",minHeight:"100vh",paddingBottom:90}}>
{/* HEADER BLEU */}
<div style={{background:"linear-gradient(135deg,#1e3a8a,#3b82f6)",color:"#fff",padding:"14px 14px 18px",borderRadius:"0 0 18px 18px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<img src="/logo.png" alt="GDB" style={{width:32,height:32,borderRadius:8,background:"#fff"}} onError={e=>(e.currentTarget.style.display='none')} />
<div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:13}}>GARGOURA DIGITAL BANK</div><div style={{fontSize:10,opacity:0.9}}>v2 • PI 314159$ GCV</div></div>
<div style={{display:"flex",gap:8}}><button onClick={()=>setM("gestion")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"6px 8px",color:"#fff"}}>👤</button><button onClick={()=>setM("gestion")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:10,padding:"6px 8px",color:"#fff"}}>🔔</button></div>
</div>

<div style={{background:"rgba(255,255,255,0.15)",borderRadius:14,padding:12,marginTop:12}}>
<div style={{fontSize:11,opacity:0.9}}>Solde Total</div>
<div style={{fontSize:22,fontWeight:900,marginTop:2}}>1 PI = 314,159 USD (GCV)</div>
<div style={{fontSize:11,marginTop:6,opacity:0.95}}>Code Reception permanent + QR</div>
<div style={{background:"#fff",color:"#1e3a8a",borderRadius:8,padding:"6px 10px",marginTop:6,fontWeight:900,fontSize:12,textAlign:"center"}}>{rcv}</div>
<div style={{display:"flex",gap:8,marginTop:10}}>
<button onClick={()=>setM("transferer")} style={{flex:1,padding:10,borderRadius:10,border:"none",background:"#fff",color:"#1e3a8a",fontWeight:900,fontSize:12}}>Envoyer</button>
<button onClick={()=>setM("recevoir")} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #fff",background:"transparent",color:"#fff",fontWeight:900,fontSize:12}}>Recevoir QR</button>
</div>
</div>
</div>

{/* FONCTIONNALITES COURANTES */}
<div style={{padding:12}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontWeight:900,fontSize:13}}>Fonctionnalites Courantes • 12</div><div style={{fontSize:10,color:"#64748b"}}>{gdb.slice(0,12)}</div></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
{funcs.map(f=>(
<button key={f.id} onClick={()=>setM(f.id==="portefeuilles"?"portefeuille":f.id)} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"10px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
<div style={{fontSize:20}}>{ICONS[f.id]||"💠"}</div><div style={{fontSize:9,fontWeight:800,color:"#334155",textAlign:"center"}}>{f.label}</div>
</button>
))}
</div>
</div>

{/* MENU BAS FIXE */}
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:20}}>
<button onClick={()=>setM(null)} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>🏠<span>Accueil</span></button>
<button onClick={()=>setM("transferer")} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>💼<span>Services</span></button>
<button onClick={()=>setM("pidex")} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>🚀<span>Innovation</span></button>
<button onClick={()=>setM("portefeuille")} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>👜<span>Wallet</span></button>
<button onClick={()=>setM("kyc")} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>{kycOk?"✅":"🛡️"}<span>Sécurité</span></button>
<button onClick={()=>setM("support")} style={{border:"none",background:"none",fontSize:10,fontWeight:800,display:"flex",flexDirection:"column",alignItems:"center"}}>❓<span>Support</span></button>
</div>

{/* MODALES - TOUT EST CORRIGE ICI avec "kyc" entre guillemets */}
{m && (
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:30,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setM(null)}>
<div style={{background:"#fff",width:"100%",maxWidth:420,borderRadius:"18px 18px 0 0",maxHeight:"88vh",overflowY:"auto",padding:14}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontWeight:900}}>{m.toUpperCase()}</div><button onClick={()=>setM(null)} style={{border:"none",background:"#f1f5f9",borderRadius:20,padding:"4px 10px"}}>✕</button></div>

{m==="transferer" && <Transferer gdb={gdb} />}
{m==="virement" && <Virement gdb={gdb} />}
{m==="pidex" && <PiDex gdb={gdb} />}
{m==="convertir" && <ConvertirComp />}
{m==="trading" && <TradingComp />}
{m==="portefeuille" && <PortefeuilleComp gdb={gdb} rcv={rcv} />}
{m==="cartes" && <Cartes gdb={gdb} rcv={rcv} />}
{m==="kyc" && <KYCComp gdb={gdb} onVerified={(u:any)=>{ setKycOk(true); setM(null) }} />}
{m==="ai" && <AIAutoComp />}
{m==="blockchain" && <BlockchainComp />}
{m==="shopping" && <ShoppingComp />}
{m==="auto" && <AutomobileComp />}
{m==="agregation" && <AgregationComp />}
{m==="gestion" && <GestionComp />}
{m==="recevoir" && <div style={{textAlign:"center"}}><div style={{fontWeight:900}}>QR Reception</div><div style={{margin:"12px auto",width:160,height:160,background:"#f1f5f9",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>QR: {rcv}</div><div style={{fontWeight:800}}>{rcv}</div><div style={{fontSize:11,color:"#64748b",marginTop:4}}>{gdb}</div></div>}
{m==="support" && <div style={{display:"flex",flexDirection:"column",gap:8}}><div style={{fontWeight:900}}>Support 24/7</div><div>📞 (+235) 92 82 52 62</div><div>📧 gargouradigitalbank@gmail.com</div><div style={{fontSize:11,color:"#64748b"}}>GARGOURA DIGITAL BANK v2 - PI 314159$ GCV</div></div>}

</div>
</div>
)}
</div>
)
}
