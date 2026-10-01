"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, PiDex, ConvertirComp, TradingComp, PortefeuilleComp, Cartes, KYCComp, AIAutoComp, BlockchainComp, ShoppingComp, AutomobileComp, AgregationComp, GestionComp } from "./Components"

export default function Page(){
const [m,setM]=useState<string|null>(null)
const [piBalance,setPiBalance]=useState("12,465.82")
const [gdbAddr,setGdbAddr]=useState("GABCDEFGHIJKLMNOPQRSTUVWXYZ123456789ABCDEFGH")
const [userPi,setUserPi]=useState("Pionnier GCV")
const [kycOk,setKycOk]=useState(false)

useEffect(()=>{
  const addr = localStorage.getItem("gdb_pi_addr")
  const user = localStorage.getItem("gdb_pi_user")
  const kyc = localStorage.getItem("gdb_kyc_verified")
  if(addr) setGdbAddr(addr)
  if(user) setUserPi(user)
  if(kyc==="true") setKycOk(true)
},[])

const funcs=[
{id:"transferer",label:"Transferer",icon:"💸",color:"#0A1931"},
{id:"virement",label:"Virement",icon:"🏦",color:"#0A1931"},
{id:"pidex",label:"Pi DEX",icon:"🔄",color:"#0A1931"},
{id:"convertir",label:"Convertir",icon:"💱",color:"#0A1931"},
{id:"trading",label:"Trading",icon:"📈",color:"#0A1931"},
{id:"portefeuilles",label:"Wallet",icon:"👛",color:"#0A1931"},
{id:"cartes",label:"Cartes",icon:"💳",color:"#0A1931"},
{id:"kyc",label:kycOk?"KYC ✅":"KYC",icon:"🛡️",color:"#0A1931"},
{id:"ai",label:"AI Auto",icon:"🤖",color:"#0A1931"},
{id:"blockchain",label:"Blockchain",icon:"⛓️",color:"#0A1931"},
{id:"shopping",label:"Shopping",icon:"🛒",color:"#0A1931"},
{id:"gestion",label:"Gestion",icon:"⚙️",color:"#0A1931"},
]

return(
<div style={{maxWidth:420,margin:"0 auto",background:"#F6F7FB",minHeight:"100vh",paddingBottom:90,fontFamily:"Inter, system-ui"}}>

{/* HEADER PRO MONDE */}
<div style={{background:"linear-gradient(180deg,#0A1931 0%,#142850 100%)",padding:"14px 14px 22px",borderRadius:"0 0 24px 24px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-20,right:-30,opacity:0.15,fontSize:120}}>🌍</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{width:36,height:36,background:"linear-gradient(135deg,#C9A86A,#F9E2AF)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#0A1931"}}>G</div>
<div><div style={{color:"#F9E2AF",fontWeight:900,fontSize:13,letterSpacing:0.5}}>GARGOURA</div><div style={{color:"#fff",fontWeight:300,fontSize:11,letterSpacing:2}}>DIGITAL BANK <span style={{color:"#C9A86A",fontWeight:800,border:"1px solid #C9A86A",borderRadius:6,padding:"1px 5px",fontSize:9,marginLeft:4}}>v2</span></div></div>
</div>
<div style={{display:"flex",gap:10}}><span style={{color:"#C9A86A"}}>🔔</span><span style={{width:28,height:28,background:"#C9A86A",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</span></div>
</div>

{/* BALANCE PRO CARD OR */}
<div style={{background:"linear-gradient(135deg,#0A1931 0%,#1A2A4A 100%)",border:"1.5px solid #C9A86A",borderRadius:18,padding:14,marginTop:16,position:"relative",boxShadow:"0 10px 30px rgba(10,25,49,0.4)"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#C9A86A",fontSize:11,letterSpacing:1}}>Total Balance</span><span style={{color:"#10B981",fontSize:10,fontWeight:800}}>● LIVE GCV</span></div>
<div style={{color:"#fff",fontSize:28,fontWeight:900,marginTop:4,letterSpacing:1}}>{piBalance} PI</div>
<div style={{height:1,background:"#C9A86A",width:80,margin:"8px 0"}}></div>
<div style={{color:"#C9A86A",fontSize:12,fontWeight:700}}>1 PI = 314,159 USD GCV</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{color:"#fff",fontSize:10,opacity:0.7}}>↗ +2.41% today</span><span style={{color:"#F9E2AF",fontSize:10}}>≈ $3.9B USD</span></div>
</div>

{/* QR RECEPTION PRO */}
<div style={{background:"#fff",borderRadius:14,padding:10,marginTop:12,display:"flex",gap:10,alignItems:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
<div style={{flex:1}}><div style={{fontSize:10,color:"#64748B",fontWeight:700}}>Permanent Reception</div><div style={{fontSize:11,fontWeight:900,color:"#0A1931",marginTop:2,wordBreak:"break-all"}}>{gdbAddr.slice(0,16)}...{gdbAddr.slice(-6)}</div><div style={{fontSize:9,color:"#10B981",marginTop:2}}>● {userPi} • ISO20022 Ready</div></div>
<div style={{display:"flex",gap:6}}><button onClick={()=>setM("transferer")} style={{padding:"10px 14px",borderRadius:10,border:"none",background:"#0A1931",color:"#C9A86A",fontWeight:900,fontSize:11}}>Envoyer</button><button onClick={()=>setM("recevoir")} style={{padding:"10px 14px",borderRadius:10,border:"1px solid #C9A86A",background:"#fff",color:"#0A1931",fontWeight:900,fontSize:11}}>Recevoir QR</button></div>
</div>
</div>

{/* FONCTIONNALITES */}
<div style={{padding:14}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontWeight:900,fontSize:13,color:"#0A1931"}}>Fonctionnalites Courantes • 12</div><div style={{fontSize:9,color:"#C9A86A",fontWeight:800,border:"1px solid #C9A86A",borderRadius:20,padding:"3px 8px"}}>GCV WORLD BANK</div></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
{funcs.map(f=>(
<button key={f.id} onClick={()=>setM(f.id==="portefeuilles"?"portefeuille":f.id)} style={{background:"#fff",border:"1px solid #E2E8F0",borderRadius:14,padding:"12px 2px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
<div style={{width:34,height:34,background:"#0A1931",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{f.icon}</div><div style={{fontSize:9,fontWeight:800,color:"#0A1931"}}>{f.label}</div>
</button>
))}
</div>
</div>

{/* BOTTOM NAV PRO */}
<div style={{position:"fixed",bottom:12,left:"50%",transform:"translateX(-50%)",width:"92%",maxWidth:400,background:"#fff",borderRadius:24,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",border:"1px solid #E2E8F0",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:20}}>
{[
{icon:"🏠",label:"Accueil",id:null},
{icon:"💼",label:"Services",id:"transferer"},
{icon:"🚀",label:"Innovation",id:"pidex"},
{icon:"👜",label:"Wallet",id:"portefeuille"},
{icon:"🛡️",label:kycOk?"✅","Sécurité":kycOk?"✅":"Sécurité",id:"kyc"},
{icon:"❓",label:"Support",id:"support"},
].map((b,i)=><button key={i} onClick={()=>b.id?setM(b.id):setM(null)} style={{border:"none",background:"none",display:"flex",flexDirection:"column",alignItems:"center",fontSize:9,fontWeight:800,color:"#0A1931"}}><span style={{fontSize:14}}>{b.icon}</span><span style={{marginTop:2}}>{b.label}</span></button>)}
</div>

{/* MODALES CORRIGEES AVEC "kyc" ENTRE GUILLEMETS */}
{m && (
<div style={{position:"fixed",inset:0,background:"rgba(10,25,49,0.6)",zIndex:40,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setM(null)}>
<div style={{background:"#fff",width:"100%",maxWidth:420,borderRadius:"20px 20px 0 0",maxHeight:"88vh",overflowY:"auto",padding:14}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontWeight:900,color:"#0A1931"}}>{m.toUpperCase()} • GDB WORLD</div><button onClick={()=>setM(null)} style={{border:"none",background:"#F1F5F9",borderRadius:20,padding:"4px 10px"}}>✕</button></div>
{m==="transferer" && <Transferer gdb={gdbAddr} />}
{m==="virement" && <Virement gdb={gdbAddr} />}
{m==="pidex" && <PiDex gdb={gdbAddr} />}
{m==="convertir" && <ConvertirComp />}
{m==="trading" && <TradingComp />}
{m==="portefeuille" && <PortefeuilleComp gdb={gdbAddr} rcv={gdbAddr.slice(0,12)} />}
{m==="cartes" && <Cartes gdb={gdbAddr} rcv={gdbAddr.slice(0,12)} />}
{m==="kyc" && <KYCComp gdb={gdbAddr} onVerified={(u:any)=>{setUserPi(u); setKycOk(true); setM(null)}} />}
{m==="ai" && <AIAutoComp />}
{m==="blockchain" && <BlockchainComp />}
{m==="shopping" && <ShoppingComp />}
{m==="agregation" && <AgregationComp />}
{m==="gestion" && <GestionComp />}
{m==="recevoir" && <div style={{textAlign:"center"}}><div style={{fontWeight:900,color:"#0A1931"}}>QR Reception Mondiale</div><div style={{margin:"14px auto",width:180,height:180,background:"#F8FAFC",border:"2px solid #C9A86A",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center"}}>QR: {gdbAddr.slice(0,10)}</div><div style={{fontSize:10,wordBreak:"break-all",background:"#0A1931",color:"#C9A86A",padding:8,borderRadius:8}}>{gdbAddr}</div><div style={{fontSize:10,marginTop:8,color:"#10B981"}}>{userPi} • Pi Network • GCV $314,159</div></div>}
{m==="support" && <div><div style={{fontWeight:900}}>Support Mondial 24/7</div><div style={{marginTop:8}}>📞 (+235) 92 82 52 62</div><div>📧 gargouradigitalbank@gmail.com</div><div style={{fontSize:11,color:"#64748B",marginTop:6}}>Banque Mondiale Numérique • ISO20022 • SWIFT • SEPA • PI GCV</div></div>}
</div>
</div>
)}
</div>
)
}
