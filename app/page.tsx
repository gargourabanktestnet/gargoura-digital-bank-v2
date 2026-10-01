"use client"
import { useState, useEffect } from "react"
import { Transferer, Virement, PiDex, ConvertirComp, TradingComp, PortefeuilleComp, Cartes, KYCComp, AIAutoComp, BlockchainComp, ShoppingComp, AutomobileComp, AgregationComp, GestionComp } from "./Components"

export default function Page(){
const [tab,setTab]=useState("portefeuille")
const [gdb,setGdb]=useState("GDB-TEST-1234")
const [rcv,setRcv]=useState("RCV-5678")
const [kycOk,setKycOk]=useState(false)

useEffect(()=>{
const a=localStorage.getItem("gdb_pi_addr")
if(a) setKycOk(true)
},[])

return(
<div style={{maxWidth:420,margin:"0 auto",background:"#fff",minHeight:"100vh",fontFamily:"sans-serif"}}>
<div style={{background:"#1e40af",color:"#fff",padding:14,textAlign:"center",fontWeight:900}}>GARGOURA DIGITAL BANK v2 • PI 314159$</div>
<div style={{display:"flex",flexWrap:"wrap",gap:6,padding:8,background:"#f1f5f9"}}>
{["portefeuille","transferer","virement","pidex","convertir","trading","cartes","kyc","ai","block","shopping","auto","agreg","gestion"].map(t=>(
<button key={t} onClick={()=>setTab(t)} style={{padding:"6px 8px",borderRadius:8,border:"none",fontSize:10,fontWeight:800,background:tab===t?"#1e40af":"#fff",color:tab===t?"#fff":"#475569"}}>{t.toUpperCase()}</button>
))}
</div>
<div style={{padding:12}}>
{tab==="portefeuille"&&<PortefeuilleComp gdb={gdb} rcv={rcv} />}
{tab==="transferer"&&<Transferer gdb={gdb} />}
{tab==="virement"&&<Virement gdb={gdb} />}
{tab==="pidex"&&<PiDex gdb={gdb} />}
{tab==="convertir"&&<ConvertirComp />}
{tab==="trading"&&<TradingComp />}
{tab==="cartes"&&<Cartes gdb={gdb} rcv={rcv} />}
{tab==="kyc"&&<KYCComp gdb={gdb} onVerified={()=>setKycOk(true)} />}
{tab==="ai"&&<AIAutoComp />}
{tab==="block"&&<BlockchainComp />}
{tab==="shopping"&&<ShoppingComp />}
{tab==="auto"&&<AutomobileComp />}
{tab==="agreg"&&<AgregationComp />}
{tab==="gestion"&&<GestionComp />}
</div>
</div>
)
}
