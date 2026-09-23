'use client'
import {useState,useEffect} from 'react'

export default function Home(){
  const [rate,setRate]=useState(650)
  const [xaf,setXaf]=useState('1000000')

  useEffect(()=>{
    const t=setInterval(()=>setRate(r=> +(650 + (Math.random()-0.5)*5).toFixed(2)), 4000)
    return()=>clearInterval(t)
  },[])

  const piValue = (parseFloat(xaf||'0')/rate).toFixed(2)

  return(
    <div style={{background:'#0f172a',minHeight:'100vh',color:'#fff',fontFamily:'system-ui',padding:'10px'}}>
      <div style={{textAlign:'center',paddingTop:'10px'}}>
        <div style={{width:78,height:78,margin:'0 auto',borderRadius:'50%',background:'radial-gradient(circle,#fde68a,#facc15,#a16207)',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:30,color:'#78350f'}}>π</div>
        <div style={{fontSize:10,color:'#94a3b8',marginTop:4,letterSpacing:1}}>GARGOURA • DIGITAL • BANK<br/>GDB</div>
        <h1 style={{color:'#facc15',fontSize:22,margin:'8px 0 2px',letterSpacing:0.5}}>GARGOURA DIGITAL BANK</h1>
        <div style={{fontSize:12,color:'#64748b'}}>🏦</div>
        <div style={{fontSize:12,color:'#94a3b8',marginTop:2}}>CEMAC • UEMOA • JORDANIE • PI NETWORK</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
        <div style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:12,padding:'12px 8px',textAlign:'center'}}>
          <div style={{color:'#94a3b8',fontSize:12}}>SOLDE PI</div>
          <div style={{color:'#facc15',fontSize:26,fontWeight:800,marginTop:4}}>1,250 <span style={{fontSize:18}}>π</span></div>
          <div style={{color:'#22c55e',fontSize:11,marginTop:2}}>≈ 812,500 XAF</div>
        </div>
        <div style={{background:'#1e293b',border:'1px solid #334155',borderRadius:12,padding:'12px 8px',textAlign:'center'}}>
          <div style={{color:'#94a3b8',fontSize:12}}>XAF CEMAC</div>
          <div style={{fontSize:22,fontWeight:800,marginTop:4}}>812,500</div>
          <div style={{color:'#94a3b8',fontSize:11,marginTop:2}}>Disponible</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
        <button style={{background:'#facc15',color:'#000',border:'none',borderRadius:12,padding:'14px 6px',fontWeight:900,fontSize:14}}>⚡ TRADING<br/>LIVE</button>
        <button style={{background:'#1e293b',color:'#fff',border:'1px solid #facc15',borderRadius:12,padding:'14px 6px',fontWeight:900,fontSize:14}}>💳 DASHBOARD</button>
      </div>

      <div style={{background:'#1e293b',borderRadius:12,padding:12,marginTop:12,border:'1px solid #1e293b'}}>
        <div style={{color:'#facc15',fontWeight:800,fontSize:16}}>Convertisseur Temps Réel</div>
        <div style={{display:'flex',gap:8,marginTop:10}}>
          <input value={xaf} onChange={e=>setXaf(e.target.value)} style={{flex:1,background:'#0f172a',border:'1px solid #334155',borderRadius:8,padding:12,color:'#fff',outline:'none'}}/>
          <div style={{background:'#0f172a',border:'1px solid #334155',borderRadius:8,padding:'12px 8px',fontSize:11,color:'#94a3b8'}}>XAF CEMAC</div>
        </div>
        <div style={{background:'#0f172a',borderRadius:8,padding:12,marginTop:10,textAlign:'center'}}>
          <div style={{fontSize:12}}>{xaf} XAF =</div>
          <div style={{color:'#facc15',fontSize:28,fontWeight:900}}>{piValue} π</div>
          <div style={{color:'#94a3b8',fontSize:11}}>Taux: 1 PI = {rate} XAF</div>
        </div>
      </div>

      <div style={{background:'#1e293b',borderRadius:12,padding:12,marginTop:12}}>
        <div style={{color:'#facc15',fontWeight:800}}>Retrait Mobile Money 🇹🇩 Agent: 66 78 75 46</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
          <button style={{background:'#dc2626',color:'#fff',border:'none',borderRadius:8,padding:12,fontWeight:700,fontSize:12}}>Airtel Tchad</button>
          <button style={{background:'#facc15',color:'#000',border:'none',borderRadius:8,padding:12,fontWeight:700,fontSize:12}}>MTN MoMo</button>
          <button style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:12,fontWeight:700,fontSize:12}}>Moov Africa</button>
          <button style={{background:'#22d3ee',color:'#000',border:'none',borderRadius:8,padding:12,fontWeight:700,fontSize:12}}>Wave SN</button>
        </div>
        <a href="https://wa.me/23566787546" style={{display:'block',background:'#22c55e',color:'#fff',textAlign:'center',padding:14,borderRadius:8,marginTop:10,textDecoration:'none',fontWeight:800}}>💬 WHATSAPP AGENT: 66 78 75 46</a>
        <div style={{background:'#334155',borderRadius:8,padding:10,marginTop:8,textAlign:'center',fontSize:12}}>🔒 PANEL ADMIN</div>
      </div>

      <div style={{textAlign:'center',color:'#475569',fontSize:9,marginTop:18,lineHeight:1.4}}>
        Gargoura Digital Bank © 2026 • Agent Officiel Tchad: +235 66 78 75 46<br/>N'Djamena • Amman • Dakar
      </div>
    </div>
  )
                     }
