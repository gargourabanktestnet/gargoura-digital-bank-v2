'use client'
import { useState, useEffect } from 'react'

export default function Admin(){
 const [isAdmin, setIsAdmin] = useState(false)
 const [pin, setPin] = useState('')
 const phoneAgent = "23566787546"
 
 const [requests, setRequests] = useState([
  {id:1, name:'Ahmed N.', phone:'+235 66 12 34 56', amount:'500,000 XAF', pi:'769.23 π', op:'Airtel Tchad', status:'En attente', time:'10:05 PM'},
  {id:2, name:'Fatima D.', phone:'+221 77 55 44 33', amount:'1,000,000 XAF', pi:'1538.46 π', op:'Wave SN', status:'En attente', time:'10:08 PM'},
  {id:3, name:'Khalid J.', phone:'+962 79 88 77 66', amount:'250,000 XAF', pi:'384.61 π', op:'Moov Africa', status:'Validé', time:'09:30 PM'},
 ])

 const totalVolume = "1,750,000 XAF"
 const commission = "35,000 XAF (2%)"

 if(!isAdmin){
  return(
   <div style={{background:'#0f172a', minHeight:'100vh', color:'white', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
    <div style={{background:'#1e293b', padding:'24px', borderRadius:'16px', width:'100%', maxWidth:'350px', textAlign:'center', border:'2px solid #facc15'}}>
     <h2 style={{color:'#facc15'}}>🔐 ADMIN GARGOURA</h2>
     <p style={{color:'#94a3b8', fontSize:'13px'}}>Agent: +235 66 78 75 46</p>
     <input type="password" placeholder="Code PIN Admin (6678)" value={pin} onChange={e=>setPin(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', background:'#0f172a', border:'1px solid #334155', color:'white', marginTop:'15px', textAlign:'center', fontSize:'18px'}}/>
     <button onClick={()=>{if(pin==='6678' || pin==='66787546'){setIsAdmin(true)}else{alert('Code faux! Utilise 6678')}}} style={{width:'100%', background:'#facc15', color:'black', padding:'14px', borderRadius:'10px', fontWeight:'bold', border:'none', marginTop:'12px', fontSize:'16px'}}>ENTRER</button>
     <p style={{color:'#475569', fontSize:'11px', marginTop:'12px'}}>Code = 4 derniers chiffres de ton numéro: 7546 ou 6678</p>
     <a href="/" style={{color:'#facc15', display:'block', marginTop:'15px', textDecoration:'none'}}>← Retour Banque</a>
    </div>
   </div>
  )
 }

 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'14px'}}>
   <div style={{textAlign:'center', padding:'10px 0', borderBottom:'1px solid #1e293b'}}>
    <h2 style={{color:'#facc15', margin:0}}>GARGOURA ADMIN PANEL 🔐</h2>
    <small style={{color:'#94a3b8'}}>Agent Officiel: +235 66 78 75 46 • N'Djamena</small>
   </div>

   <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginTop:'14px'}}>
    <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', textAlign:'center'}}><small style={{color:'#94a3b8'}}>Aujourd'hui</small><h3 style={{color:'#22c55e', margin:'4px 0'}}>3</h3><small>Retraits</small></div>
    <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', textAlign:'center'}}><small style={{color:'#94a3b8'}}>Volume</small><h3 style={{color:'#facc15', margin:'4px 0'}}>{totalVolume}</h3><small>XAF</small></div>
    <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', textAlign:'center'}}><small style={{color:'#94a3b8'}}>Commission</small><h3 style={{color:'#22c55e', margin:'4px 0'}}>{commission}</h3><small>2%</small></div>
   </div>

   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px'}}>
    <h3 style={{color:'#facc15', margin:'0 0 10px 0'}}>Demandes de Retrait en Attente ⏳</h3>
    {requests.filter(r=>r.status==='En attente').map(r=>(
     <div key={r.id} style={{background:'#0f172a', padding:'12px', borderRadius:'10px', marginBottom:'10px', borderLeft:'4px solid #facc15'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}><b>{r.name}</b><small style={{color:'#facc15'}}>{r.time}</small></div>
      <small style={{color:'#94a3b8'}}>{r.phone} • {r.op}</small><br/>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'6px'}}><span><b style={{color:'#facc15'}}>{r.pi}</b> → {r.amount}</span><span style={{background:'#facc15', color:'black', padding:'2px 8px', borderRadius:'12px', fontSize:'11px', fontWeight:'bold'}}>{r.status}</span></div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'10px'}}>
       <a href={`https://wa.me/${r.phone.replace(/[^0-9]/g,'')}?text=Salam ${r.name}, votre retrait ${r.amount} (${r.pi}) via ${r.op} est validé par Gargoura Digital Bank! Envoyez votre code Airtel Money.`} style={{background:'#25D366', color:'white', padding:'10px', borderRadius:'8px', textAlign:'center', textDecoration:'none', fontWeight:'bold', fontSize:'13px'}}>✅ VALIDER WA</a>
       <button onClick={()=>setRequests(requests.map(x=>x.id===r.id?{...x, status:'Validé'}:x))} style={{background:'#334155', color:'white', padding:'10px', borderRadius:'8px', border:'none', fontWeight:'bold'}}>Marquer Validé</button>
      </div>
     </div>
    ))}
    {requests.filter(r=>r.status==='En attente').length===0 && <p style={{color:'#22c55e', textAlign:'center'}}>✅ Aucune demande en attente!</p>}
   </div>

   <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'14px'}}>
    <h4 style={{color:'#94a3b8', margin:'0 0 8px 0'}}>Historique Validés</h4>
    {requests.filter(r=>r.status==='Validé').map(r=>(
     <div key={r.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #0f172a'}}><span>{r.name} • {r.amount}</span><small style={{color:'#22c55e'}}>{r.status}</small></div>
    ))}
   </div>

   <a href="/" style={{display:'block', background:'#facc15', color:'black', textAlign:'center', padding:'14px', borderRadius:'10px', marginTop:'20px', textDecoration:'none', fontWeight:'bold'}}>← RETOUR BANQUE</a>
   <p style={{textAlign:'center', color:'#475569', fontSize:'11px', marginTop:'10px'}}>Gargoura Digital Bank Admin © 2026<br/>Agent: 66 78 75 46</p>
  </div>
 )
}
