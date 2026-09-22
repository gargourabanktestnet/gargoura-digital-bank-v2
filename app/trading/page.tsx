'use client'
import { useEffect, useState } from 'react'
export default function Trading(){
 const [prices, setPrices] = useState<any>({BTC:42000, XRP:0.52, XLM:0.11, SOL:145, BNB:580, PI:1})
 useEffect(()=>{
  // Simulation temps réel
  const interval = setInterval(()=> setPrices((p:any)=>({...p, BTC: p.BTC + (Math.random()-0.5)*10})), 2000)
  return ()=>clearInterval(interval)
 },[])
 const pairs = ['BTC/PI','XRP/PI','XLM/PI','SOL/PI','BNB/PI','USDT/PI','USDC/PI']
 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'16px'}}>
   <h2 style={{color:'#facc15', textAlign:'center'}}>TRADING GARGOURA ⚡ Temps Réel</h2>
   <div style={{marginTop:'15px'}}>
    {pairs.map(pair=>{
     const coin = pair.split('/')[0]
     return <div key={pair} style={{background:'#1e293b', padding:'12px', borderRadius:'8px', marginBottom:'8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><b>{pair}</b><br/><small style={{color:'#22c55e'}}>● LIVE</small></div><div style={{textAlign:'right'}}><b>{(prices[coin]||1).toFixed(2)}</b><br/><button style={{background:'#facc15', border:'none', padding:'4px 10px', borderRadius:'6px', fontSize:'11px', marginTop:'4px'}}>Trader</button></div></div>
    })}
   </div>
   <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', marginTop:'15px'}}><h4 style={{color:'#facc15'}}>Convertisseur</h4><div style={{display:'flex', gap:'8px', marginTop:'8px'}}><input defaultValue="10000" style={{flex:1, padding:'10px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white'}}/><select style={{padding:'10px', borderRadius:'8px', background:'#0f172a', color:'white', border:'1px solid #334155'}}><option>XAF CEMAC</option><option>XOF UEMOA</option><option>USD</option><option>EUR</option><option>JOD Jordanie</option></select></div><p style={{textAlign:'center', color:'#facc15', marginTop:'8px'}}>≈ 15.38 π</p></div>
   <a href="/" style={{display:'block', marginTop:'20px', textAlign:'center', color:'#facc15'}}>← Accueil</a>
  </div>
 )
                                                         }
