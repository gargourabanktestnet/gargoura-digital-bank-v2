'use client'
import { useState } from 'react'
export default function History(){
 const txs = [
  {type:'P2P', from:'XAF', to:'PI', amount:10, status:'SUCCESS', date:'22/09'},
  {type:'CONVERSION', from:'XOF', to:'PI', amount:25, status:'SUCCESS', date:'21/09'},
  {type:'MOBILE_MONEY', from:'USD', to:'PI', amount:100, status:'PENDING', date:'20/09'},
 ]
 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'16px'}}>
   <h2 style={{color:'#facc15', textAlign:'center'}}>GARGOURA DASHBOARD 💳</h2>
   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px'}}>
    <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', textAlign:'center'}}><small style={{color:'#94a3b8'}}>SOLDE PI</small><h3 style={{color:'#facc15'}}>1,250 π</h3></div>
    <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', textAlign:'center'}}><small style={{color:'#94a3b8'}}>XAF CEMAC</small><h3>812,500 XAF</h3></div>
   </div>
   <h3 style={{marginTop:'20px'}}>Historiques</h3>
   {txs.map((t,i)=><div key={i} style={{background:'#1e293b', padding:'10px', borderRadius:'8px', marginTop:'8px', display:'flex', justifyContent:'space-between'}}><div><b style={{color:'#facc15'}}>{t.type}</b><br/><small style={{color:'#94a3b8'}}>{t.from}→{t.to} • {t.date}</small></div><div><b>{t.amount} π</b><br/><small style={{background:t.status==='SUCCESS'?'#22c55e':'#eab308', color:'black', padding:'2px 6px', borderRadius:'10px', fontSize:'10px'}}>{t.status}</small></div></div>)}
   <a href="/" style={{display:'block', marginTop:'20px', textAlign:'center', color:'#facc15'}}>← Retour Accueil</a>
  </div>
 )
                                                                           }
