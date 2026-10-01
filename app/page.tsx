"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, PiDex, ConvertirComp, TradingComp, PortefeuilleComp, Cartes, KYCComp, AIAutoComp, BlockchainComp, ShoppingComp, AutomobileComp, AgregationComp, GestionComp } from "./Components"

export default function Page(){
const [tab,setTab]=useState("portefeuille")
const [gdb]=useState("GDB-TEST-1234")
const [rcv]=useState("RCV-5678")
const [kycOk,setKycOk]=useState(false)
useEffect(()=>{ setKycOk(localStorage.getItem("gdb_kyc_verified")==="true") },[tab])

const TABS = ["portefeuille","transferer","virement","pidex","convertir","trading","cartes","kyc","ai","block","shopping","auto","agreg","gestion"]

return(
<div style={{maxWidth:420,margin:"0 auto",background:"#f8fafc",minHeight:"100vh",paddingBottom:80}}>
<div style={{background:"#1e40af",color:"#fff",padding:"12px 10px",textAlign:"center",fontWeight:900,fontSize:13,position:"sticky",top:0,zIndex:10}}>GARGOURA DIGITAL BANK v2 • PI 314159$</div>

<div style={{display:"flex",flexWrap:"wrap",gap:6,padding:10}}>
{TABS.map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"8px 12px",borderRadius:20,border:"none",fontWeight:900,fontSize:10,textTransform:"uppercase",background:tab===t?"#1e40af":"#fff",color:tab===t?"#fff":"#475569",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>{t}</button>)}
</div>

<div style={{padding:10}}>
{tab==="portefeuille" && <PortefeuilleComp gdb={gdb} rcv={rcv} />}
{tab==="transferer" && <Transferer gdb={gdb} />}
{tab==="virement" && <Virement gdb={gdb} />}
{tab==="pidex" && <PiDex gdb={gdb} />}
{tab==="convertir" && <ConvertirComp />}
{tab==="trading" && <TradingComp />}
{tab==="cartes" && <Cartes gdb={gdb} rcv={rcv} />}
{tab==="kyc" && <KYCComp gdb={gdb} onVerified={()=>setKycOk(true)} />}
{tab==="ai" && <AIAutoComp />}
{tab==="block" && <BlockchainComp />}
{tab==="shopping" && <ShoppingComp />}
{tab==="auto" && <AutomobileComp />}
{tab==="agreg" && <AgregationComp />}
{tab==="gestion" && <GestionComp />}
</div>

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0"}}>
<button onClick={()=>setTab("portefeuille")} style={{border:"none",background:"none",fontSize:10,fontWeight:800}}>🏠<br/>Accueil</button>
<button onClick={()=>setTab("transferer")} style={{border:"none",background:"none",fontSize:10,fontWeight:800}}>💸<br/>Services</button>
<button onClick={()=>setTab("pidex")} style={{border:"none",background:"none",fontSize:10,fontWeight:800}}>🚀<br/>Innovation</button>
<button onClick={()=>setTab("cartes")} style={{border:"none",background:"none",fontSize:10,fontWeight:800}}>👜<br/>Wallet</button>
<button onClick={()=>setTab("kyc")} style={{border:"none",background:"none",fontSize:10,fontWeight:800}}>🛡️<br/>{kycOk?"✅":"Sécurité"}</button>
</div>
</div>
)
}
