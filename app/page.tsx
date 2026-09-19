"use client";
export default function Page(){
 return (
  <div style={{background:"#f0f7ff",minHeight:"100vh",padding:"20px",fontFamily:"sans-serif"}}>
   <div style={{background:"#0d3b8c",color:"white",padding:"20px",borderRadius:"16px",textAlign:"center"}}>
    <h1 style={{margin:0}}>GARGOURA DIGITAL BANK</h1>
    <p style={{margin:"5px 0 0 0"}}>MODE MAINNET - Vrai Pi</p>
    <div style={{fontSize:"36px",fontWeight:"bold",marginTop:"15px"}}>999.00 Pi</div>
    <div style={{fontSize:"14px",opacity:0.9}}>Solde Gargoura - TEST BLEU REUSSI</div>
   </div>
   <div style={{background:"white",padding:"20px",borderRadius:"16px",marginTop:"20px",textAlign:"center"}}>
    <p>Si tu vois ce cadre BLEU et 999 Pi, le deploiement a marche!</p>
    <button style={{background:"#0d3b8c",color:"white",border:"none",padding:"12px 24px",borderRadius:"8px",width:"100%"}}>Deposer 1 Pi (Bleu)</button>
   </div>
  </div>
 )
}
