'use client'
import { useState } from 'react'

export default function Home(){
 const [amount, setAmount] = useState(10000)
 const [from, setFrom] = useState('XAF')

 const rates: any = { XAF: 650, XOF: 650, USD: 1, EUR: 0.92, JOD: 0.71, USDT: 1, USDC: 1, BTC: 42000, XRP: 0.52, XLM: 0.11, SOL: 145, BNB: 580 }

 const toPi = (from === 'XAF' || from === 'XOF')? (amount / rates[from]).toFixed(2) : (amount / rates[from] * rates['USD']).toFixed(2)

 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'14px', fontFamily:'system-ui'}}>
   {/* HEADER */}
   <div style={{textAlign:'center', padding:'10px 0'}}>
    <h1 style={{color:'#facc15', margin:0, fontSize:'22px'}}>GARGOURA DIGITAL BANK 🏦</h1>
    <small style={{color:'#94a3b8'}}>CEMAC • UEMOA • JORDANIE • PI NETWORK</small>
   </div>

   {/* SOLDES */}
   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px'}}>
    <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', textAlign:'center', border:'1px solid #334155'}}>
     <small style={{color:'#94a3b8'}}>SOLDE PI</small>
     <h2 style={{color:'#facc15', margin:'5px 0'}}>1,250 π</h2>
     <small style={{color:'#22c55e'}}>≈ 812,500 XAF</small>
    </div>
    <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', textAlign:'center', border:'1px solid #334155'}}>
     <small style={{color:'#94a3b8'}}>XAF CEMAC</small>
     <h2 style={{margin:'5px 0'}}>812,500</h2>
     <small style={{color:'#94a3b8'}}>Disponible</small>
    </div>
   </div>

   {/* BOUTONS NAV */}
   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'14px'}}>
    <a href="/trading" style={{background:'#facc15', color:'black', padding:'14px', borderRadius:'10px', textAlign:'center', fontWeight:'bold', textDecoration:'none'}}>⚡ TRADING LIVE</a>
    <a href="/history" style={{background:'#1e293b', color:'white', padding:'14px', borderRadius:'10px', textAlign:'center', fontWeight:'bold', textDecoration:'none', border:'1px solid #facc15'}}>💳 DASHBOARD</a>
   </div>

   {/* CONVERTISSEUR */}
   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px', border:'1px solid #334155'}}>
    <h3 style={{color:'#facc15', margin:'0 0 10px 0'}}>Convertisseur Temps Réel</h3>
    <div style={{display:'flex', gap:'8px'}}>
     <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{flex:1, padding:'12px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white', fontSize:'16px'}}/>
     <select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px', borderRadius:'8px', background:'#0f172a', color:'white', border:'1px solid #334155'}}>
      <option value="XAF">XAF CEMAC</option>
      <option value="XOF">XOF UEMOA</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="JOD">JOD Jordanie</option>
      <option value="USDT">USDT</option>
      <option value="USDC">USDC</option>
     </select>
    </div>
    <div style={{textAlign:'center', marginTop:'12px', background:'#0f172a', padding:'10px', borderRadius:'8px'}}>
     <small style={{color:'#94a3b8'}}>{amount} {from} =</small>
     <h2 style={{color:'#facc15', margin:'4px 0'}}>{toPi} π</h2>
     <small style={{color:'#94a3b8'}}>Taux: 1 PI = {rates[from]} {from}</small>
    </div>
    <button style={{width:'100%', background:'#22c55e', color:'black', padding:'12px', borderRadius:'8px', border:'none', marginTop:'10px', fontWeight:'bold'}}>CONVERTIR MAINTENANT</button>
   </div>

   {/* MOBILE MONEY */}
   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px', border:'1px solid #334155'}}>
    <h3 style={{color:'#facc15', margin:'0 0 10px 0'}}>Retrait Mobile Money 🇹🇩</h3>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
     <button style={{padding:'10px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white'}}>Airtel Tchad</button>
     <button style={{padding:'10px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white'}}>MTN MoMo</button>
     <button style={{padding:'10px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white'}}>Moov Africa</button>
     <button style={{padding:'10px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white'}}>Wave SN</button>
    </div>
    <a href="https://wa.me/23500000000?text=Salam Gargoura, je veux retirer en XAF" style={{display:'block', background:'#25D366', color:'white', textAlign:'center', padding:'12px', borderRadius:'8px', marginTop:'10px', textDecoration:'none', fontWeight:'bold'}}>💬 Contacter Agent WhatsApp</a>
   </div>

   <p style={{textAlign:'center', color:'#475569', fontSize:'11px', marginTop:'20px'}}>Gargoura Digital © 2025 • N'Djamena • Amman • Dakar<br/>Pi Network • CEMAC UEMOA</p>
  </div>
 )
   }
