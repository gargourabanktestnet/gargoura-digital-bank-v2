'use client'
import { useState } from 'react'

export default function Home(){
 const [amount, setAmount] = useState(1000000)
 const [from, setFrom] = useState('XAF')
 const rates: any = { XAF: 650, XOF: 650, USD: 1, EUR: 0.92, JOD: 0.71, USDT: 1 }

 const toPi = (amount / rates[from]).toFixed(2)
 const phoneAgent = "23566787546"

 const handleWithdraw = async (op: string) => {
  const res = await fetch('/api/withdraw', {
   method:'POST',
   body: JSON.stringify({ phone: phoneAgent, amount, operator: op })
  })
  const data = await res.json()
  alert(data.msg)
  window.open(`https://wa.me/${phoneAgent}?text=Salam Agent Gargoura, je veux retirer ${amount} ${from} (${toPi} π) via ${op} - Mon numero:`, '_blank')
 }

 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'14px'}}>
   <div style={{textAlign:'center', padding:'10px 0'}}>
    <img src="/logo.png" onError={(e:any)=>e.target.style.display='none'} alt="GDB" style={{width:'85px', height:'85px', borderRadius:'50%', border:'3px solid #facc15', margin:'0 auto', display:'block'}}/>
    <h1 style={{color:'#facc15', margin:'8px 0 0 0', fontSize:'22px', fontWeight:'bold'}}>GARGOURA DIGITAL BANK 🏦</h1>
    <small style={{color:'#94a3b8'}}>CEMAC • UEMOA • JORDANIE • PI NETWORK</small>
   </div>

   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px'}}>
    <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', textAlign:'center', border:'1px solid #facc15'}}><small style={{color:'#94a3b8'}}>SOLDE PI</small><h2 style={{color:'#facc15', margin:'5px 0'}}>1,250 π</h2><small style={{color:'#22c55e'}}>≈ 812,500 XAF</small></div>
    <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', textAlign:'center', border:'1px solid #334155'}}><small style={{color:'#94a3b8'}}>XAF CEMAC</small><h2 style={{margin:'5px 0'}}>812,500</h2><small style={{color:'#94a3b8'}}>Disponible</small></div>
   </div>

   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'14px'}}>
    <a href="/trading" style={{background:'#facc15', color:'black', padding:'14px', borderRadius:'10px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>⚡ TRADING LIVE</a>
    <a href="/history" style={{background:'#1e293b', color:'white', padding:'14px', borderRadius:'10px', textAlign:'center', fontWeight:'bold', textDecoration:'none', border:'1px solid #facc15'}}>💳 DASHBOARD</a>
   </div>

   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px', border:'1px solid #334155'}}>
    <h3 style={{color:'#facc15', margin:'0 0 10px 0'}}>Convertisseur Temps Réel</h3>
    <div style={{display:'flex', gap:'8px'}}>
     <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{flex:1, padding:'12px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white', fontSize:'16px'}}/>
     <select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px', borderRadius:'8px', background:'#0f172a', color:'white', border:'1px solid #334155'}}><option value="XAF">XAF CEMAC</option><option value="XOF">XOF UEMOA</option><option value="USD">USD</option><option value="JOD">JOD</option></select>
    </div>
    <div style={{textAlign:'center', marginTop:'12px', background:'#0f172a', padding:'10px', borderRadius:'8px'}}><small>{amount} {from} =</small><h2 style={{color:'#facc15', margin:'4px 0'}}>{toPi} π</h2><small style={{color:'#94a3b8'}}>Taux: 1 PI = {rates[from]} {from}</small></div>
   </div>

   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px', border:'1px solid #334155'}}>
    <h3 style={{color:'#facc15', margin:'0 0 10px 0'}}>Retrait Mobile Money 🇹🇩 Agent: 66 78 75 46</h3>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
     <button onClick={()=>handleWithdraw('Airtel Tchad')} style={{padding:'12px', borderRadius:'8px', background:'#ff0000', color:'white', fontWeight:'bold', border:'none'}}>Airtel Tchad</button>
     <button onClick={()=>handleWithdraw('MTN MoMo')} style={{padding:'12px', borderRadius:'8px', background:'#ffcc00', color:'black', fontWeight:'bold', border:'none'}}>MTN MoMo</button>
     <button onClick={()=>handleWithdraw('Moov Africa')} style={{padding:'12px', borderRadius:'8px', background:'#0066ff', color:'white', fontWeight:'bold', border:'none'}}>Moov Africa</button>
     <button onClick={()=>handleWithdraw('Wave SN')} style={{padding:'12px', borderRadius:'8px', background:'#00c8ff', color:'white', fontWeight:'bold', border:'none'}}>Wave SN</button>
    </div>
    <a href={`https://wa.me/${phoneAgent}?text=Salam Agent Gargoura! Je veux retirer ${amount} ${from} (${toPi} π) via Mobile Money. Merci!`} style={{display:'block', background:'#25D366', color:'white', textAlign:'center', padding:'14px', borderRadius:'10px', marginTop:'12px', textDecoration:'none', fontWeight:'bold', fontSize:'16px'}}>💬 WHATSAPP AGENT: 66 78 75 46</a>
    <a href="/admin" style={{display:'block', background:'#334155', color:'white', textAlign:'center', padding:'10px', borderRadius:'8px', marginTop:'8px', textDecoration:'none', fontSize:'12px'}}>🔐 PANEL ADMIN</a>
   </div>
   <p style={{textAlign:'center', color:'#475569', fontSize:'11px', marginTop:'20px'}}>Gargoura Digital Bank © 2026 • Agent Officiel Tchad: +235 66 78 75 46<br/>N'Djamena • Amman • Dakar</p>
  </div>
 )
}
