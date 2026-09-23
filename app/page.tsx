'use client'
import {useState,useEffect} from 'react'
export const dynamic='force-dynamic'

export default function Home(){
 const [rate,setRate]=useState(650)
 const [xaf,setXaf]=useState('1000000')
 const [pi,setPi]=useState('1538.46')
 const [showTrading,setShowTrading]=useState(false)

 useEffect(()=>{
  const i=setInterval(()=>setRate(r=>+(r+(Math.random()-0.5)*2).toFixed(2)),3000)
  return()=>clearInterval(i)
 },[])

 const onXafChange=(v:string)=>{
  setXaf(v)
  const num=parseFloat(v)||0
  setPi((num/rate).toFixed(2))
 }

 return(
 <div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'12px',paddingBottom:'40px',fontFamily:'sans-serif'}}>
  {/* HEADER */}
  <div style={{textAlign:'center',padding:'16px 0'}}>
    <div style={{width:'80px',height:'80px',background:'linear-gradient(45deg,#facc15,#ca8a04)',borderRadius:'50%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #facc15',fontSize:'36px'}}>π</div>
    <h1 style={{color:'#facc15',margin:'8px 0 0',fontSize:'22px'}}>GARGOURA DIGITAL BANK</h1>
    <div style={{color:'#94a3b8',fontSize:'12px',marginTop:'4px'}}>🏦<br/>CEMAC • UEMOA • JORDANIE • PI NETWORK</div>
  </div>

  {/* SOLDES */}
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
    <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',border:'1px solid #facc15',textAlign:'center'}}>
      <small style={{color:'#94a3b8'}}>SOLDE PI</small>
      <div style={{color:'#facc15',fontSize:'24px',fontWeight:'bold',marginTop:'4px'}}>1,250 π</div>
      <small style={{color:'#22c55e'}}>≈ {(1250*rate).toLocaleString()} XAF</small>
    </div>
    <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',border:'1px solid #334155',textAlign:'center'}}>
      <small style={{color:'#94a3b8'}}>XAF CEMAC</small>
      <div style={{fontSize:'22px',fontWeight:'bold',marginTop:'4px'}}>812,500</div>
      <small style={{color:'#94a3b8'}}>Disponible</small>
    </div>
  </div>

  {/* BOUTONS */}
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'12px'}}>
    <button onClick={()=>setShowTrading(!showTrading)} style={{background:'#facc15',color:'black',padding:'14px',borderRadius:'12px',border:'none',fontWeight:'bold'}}>⚡ TRADING LIVE</button>
    <button style={{background:'#1e293b',color:'white',padding:'14px',borderRadius:'12px',border:'1px solid #facc15',fontWeight:'bold'}}>💳 DASHBOARD</button>
  </div>

  {showTrading&&<div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',marginTop:'12px',border:'1px solid #22c55e',textAlign:'center'}}><small style={{color:'#22c55e'}}>● LIVE</small><div>Pi: {rate} XAF</div></div>}

  {/* CONVERTISSEUR */}
  <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',marginTop:'12px'}}>
    <b style={{color:'#facc15'}}>Convertisseur Temps Réel</b>
    <div style={{display:'flex',gap:'8px',marginTop:'10px'}}>
      <input value={xaf} onChange={e=>onXafChange(e.target.value)} style={{flex:1,padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/>
      <div style={{padding:'12px',background:'#0f172a',borderRadius:'8px',border:'1px solid #334155',fontSize:'12px'}}>XAF CEMAC</div>
    </div>
    <div style={{textAlign:'center',marginTop:'12px',background:'#0f172a',padding:'12px',borderRadius:'8px'}}>
      <div>{xaf} XAF =</div>
      <div style={{color:'#facc15',fontSize:'28px',fontWeight:'bold'}}>{pi} π</div>
      <small style={{color:'#94a3b8'}}>Taux: 1 PI = {rate} XAF</small>
    </div>
  </div>

  {/* RETRAIT */}
  <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',marginTop:'12px'}}>
    <b style={{color:'#facc15'}}>Retrait Mobile Money 🇹🇩 Agent: 66 78 75 46</b>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
      <button style={{background:'#ef4444',color:'white',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',fontSize:'12px'}}>Airtel Tchad</button>
      <button style={{background:'#facc15',color:'black',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',fontSize:'12px'}}>MTN MoMo</button>
      <button style={{background:'#2563eb',color:'white',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',fontSize:'12px'}}>Moov Africa</button>
      <button style={{background:'#22d3ee',color:'black',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',fontSize:'12px'}}>Wave SN</button>
    </div>
    <a href="https://wa.me/23566787546" style={{display:'block',background:'#22c55e',color:'white',padding:'14px',borderRadius:'8px',textAlign:'center',marginTop:'10px',textDecoration:'none',fontWeight:'bold'}}>💬 WHATSAPP AGENT: 66 78 75 46</a>
    <button style={{width:'100%',background:'#334155',color:'white',padding:'10px',borderRadius:'8px',border:'none',marginTop:'8px',fontSize:'12px'}}>🔒 PANEL ADMIN</button>
  </div>

  <div style={{textAlign:'center',color:'#475569',fontSize:'10px',marginTop:'16px'}}>Gargoura Digital Bank © 2026 • Agent Officiel Tchad: +235 66 78 75 46<br/>N'Djamena • Amman • Dakar - V10.1 PROMOTE BASE</div>
 </div>
 )
  }
