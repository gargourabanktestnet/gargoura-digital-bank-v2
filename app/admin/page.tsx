'use client'
import { useState } from 'react'
export default function Admin(){
 const [pin,setPin]=useState('')
 const [ok,setOk]=useState(false)
 const [txs,setTxs]=useState([
  {id:1,user:'Mahamat 66 12 34 56',amount:'15 π',xaf:'9 981 XAF',mode:'GCV',status:'pending'},
  {id:2,user:'Fatime 66 98 76 54',amount:'250 π',xaf:'166k XAF',mode:'Exchange',status:'pending'},
 ])
 if(!ok) return(
  <div style={{background:'#0f172a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
   <div style={{background:'#1e293b',padding:'20px',borderRadius:'14px',border:'2px solid #facc15',width:'100%',maxWidth:'320px',textAlign:'center'}}>
    <img src="/logo.png" style={{width:'60px',height:'60px',borderRadius:'50%',border:'2px solid #facc15'}}/>
    <h3 style={{color:'#facc15'}}>Panel Admin GDB</h3><small style={{color:'#94a3b8'}}>PIN Agent 66 78 75 46</small>
    <input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN 6678" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',textAlign:'center',marginTop:'12px'}}/>
    <button onClick={()=>pin==='6678'?setOk(true):alert('PIN faux! 6678')} style={{width:'100%',background:'#facc15',color:'black',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',marginTop:'10px'}}>Entrer</button>
    <a href="/" style={{display:'block',marginTop:'10px',color:'#94a3b8',textDecoration:'none'}}>← Retour Accueil</a>
   </div>
  </div>
 )
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'12px'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h3 style={{color:'#facc15',margin:0}}>🔐 Admin Agent V8</h3><a href="/" style={{background:'#1e293b',padding:'8px 12px',borderRadius:'8px',color:'white',textDecoration:'none',border:'1px solid #334155'}}>Accueil</a></div>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
    <div style={{background:'#facc15',padding:'12px',borderRadius:'10px',color:'black'}}><small>Total Pi</small><h2 style={{margin:0}}>1,250 π</h2><small>$392M GCV</small></div>
    <div style={{background:'#22c55e',padding:'12px',borderRadius:'10px',color:'black'}}><small>XAF Cash</small><h2 style={{margin:0}}>5.2M</h2><small>Airtel + Moov</small></div>
   </div>
   <h4 style={{color:'#facc15',marginTop:'14px'}}>📋 Retraits à Valider - Phase 8</h4>
   <div style={{display:'grid',gap:'8px'}}>
    {txs.map(t=><div key={t.id} style={{background:'#1e293b',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}>
     <div style={{display:'flex',justifyContent:'space-between'}}><b>{t.user}</b><small style={{background:t.mode==='GCV'?'#facc15':'#22c55e',color:'black',padding:'2px 6px',borderRadius:'6px'}}>{t.mode}</small></div>
     <small style={{color:'#94a3b8'}}>{t.amount} = {t.xaf}</small>
     <div style={{display:'flex',gap:'6px',marginTop:'8px'}}><button onClick={()=>setTxs(txs.filter(x=>x.id!==t.id))} style={{flex:1,background:'#22c55e',color:'black',padding:'8px',borderRadius:'6px',border:'none',fontWeight:'bold'}}>✓ Valider & Payer</button><button onClick={()=>setTxs(txs.filter(x=>x.id!==t.id))} style={{flex:1,background:'#ef4444',color:'white',padding:'8px',borderRadius:'6px',border:'none'}}>X Refuser</button><button onClick={()=>window.open(`https://wa.me/235${t.user.replace(/[^0-9]/g,'').slice(-8)}`,'_blank')} style={{background:'#25D366',color:'white',padding:'8px 12px',borderRadius:'6px',border:'none'}}>💬</button></div>
    </div>)}
   </div>
   <div style={{background:'#1e293b',padding:'12px',borderRadius:'10px',marginTop:'14px',border:'1px solid #facc15'}}><h4 style={{color:'#facc15',margin:'0 0 8px 0'}}>⚙️ Controles GCV / Exchange LIVE</h4><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span>GCV Fixe</span><b style={{color:'#facc15'}}>$314,159 / π</b></div><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span>Exchange LIVE</span><b style={{color:'#22c55e'}}>665.45 XAF +0.32%</b></div><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span>USD/XAF</span><b>573 XAF</b></div></div>
   <button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{width:'100%',background:'#25D366',color:'white',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',marginTop:'14px'}}>📊 Rapport Journalier WhatsApp</button>
  </div>
 )
   }
