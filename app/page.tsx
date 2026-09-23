'use client'
import { useState, useEffect } from 'react'
const CURRENCIES=[
 {code:'PI',rate:1,market:1},{code:'XAF',rate:180013107,market:665.45},
 {code:'USD',rate:314159,market:1.134},{code:'EUR',rate:290000,market:0.992},
]
const CHART=[{d:'18 Sep',gcv:180013107,ex:662},{d:'19 Sep',gcv:180013107,ex:664},{d:'20 Sep',gcv:180013107,ex:663},{d:'21 Sep',gcv:180013107,ex:665},{d:'22 Sep',gcv:180013107,ex:664.5},{d:'23 Sep',gcv:180013107,ex:665.45}]
export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false)
 const [showLangs,setShowLangs]=useState(false)
 const [amount,setAmount]=useState(0)
 const [from,setFrom]=useState('XAF')
 const [liveRate,setLiveRate]=useState(665.45)
 const [trend,setTrend]=useState('+0.32%')
 const [tab,setTab]=useState('home')
 const [useGCV,setUseGCV]=useState(true)
 const [txs,setTxs]=useState([
  {id:1,type:'reçu',amount:'250 π',xaf:'166k XAF',date:'23 Sep 06:12',status:'ok',from:'Agent 66 78 75 46',mode:'GCV'},
  {id:2,type:'envoyé',amount:'15 π',xaf:'9 981 XAF',date:'22 Sep',status:'ok',from:'Airtel 66 12 34 56',mode:'Exchange'},
 ])
 const [showQR,setShowQR]=useState(false)
 const [phone,setPhone]=useState('');const [piAmt,setPiAmt]=useState('')
 const [showReceipt,setShowReceipt]=useState<any>(null)
 const [showKYC,setShowKYC]=useState(false)
 const [kycOk,setKycOk]=useState(false)
 const [showNotif,setShowNotif]=useState(false)
 const [notifs]=useState([
  {id:1,t:'Dépôt validé ✓',m:'50 π reçus Mode GCV',time:'2 min'},
  {id:2,t:'Prix LIVE ↑',m:'Pi passe à 665.45 XAF +0.32%',time:'10 min'},
  {id:3,t:'KYC à faire',m:'Vérifie ton identité pour débloquer 1,250 π',time:'1h'},
 ])
 const GCV_XAF=314159*573;const piBal=1250
 useEffect(()=>{const i=setInterval(()=>{const c=(Math.random()-0.45)*1.2;setLiveRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},2500);return()=>clearInterval(i)},[])
 const resultTo=(amount/(useGCV?CURRENCIES.find(c=>c.code===from)?.rate||GCV_XAF:CURRENCIES.find(c=>c.code===from)?.market||665.45)).toFixed(6)
 const doSend=()=>{if(!phone||!piAmt)return alert('Remplis!');const n={id:Date.now(),type:'envoyé',amount:piAmt+' π',xaf:(parseFloat(piAmt)*(useGCV?GCV_XAF:liveRate)).toLocaleString()+' XAF',date:new Date().toLocaleString('fr-FR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}),status:'ok',from:'Vers '+phone,mode:useGCV?'GCV':'Exchange'};setTxs([n,...txs]);setShowReceipt(n);setPhone('');setPiAmt('')}
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'90px'}}>
   <div style={{background:'#1e293b',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:30}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
     <button onClick={()=>setMenuOpen(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'10px',padding:'8px 10px',color:'#facc15',fontSize:'18px'}}>☰</button>
     <img src="/logo.png" style={{width:'42px',height:'42px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'13px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#22c55e',fontSize:'10px'}}>WORLD • 66 78 75 46 • {liveRate} {trend}</small></div>
    </div>
    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
     <button onClick={()=>setShowNotif(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'50%',width:'36px',height:'36px',color:'#facc15',position:'relative'}}>🔔<span style={{position:'absolute',top:'-4px',right:'-4px',background:'#ef4444',color:'white',borderRadius:'50%',fontSize:'9px',width:'16px',height:'16px',display:'flex',alignItems:'center',justifyContent:'center'}}>3</span></button>
     <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'20px',padding:'6px 12px',color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>FR<br/>FR</button>
    </div>
   </div>
   {showLangs&&<div style={{background:'#1e293b',padding:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',borderBottom:'2px solid #facc15'}}><button style={{background:'#facc15',color:'black',padding:'10px',borderRadius:'10px'}}>FR Francais</button><button style={{background:'#0f172a',color:'white',padding:'10px',borderRadius:'10px',border:'1px solid #334155'}}>GB English</button></div>}
   {menuOpen&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:100,display:'flex'}}>
     <div style={{width:'90%',maxWidth:'370px',background:'#0f172a',height:'100%',overflowY:'auto',borderRight:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15'}}>GDB FINAL V8B</b><button onClick={()=>setMenuOpen(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'8px 12px',borderRadius:'8px',color:'white'}}>X</button></div>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'12px',borderRadius:'12px',color:'black',margin:'12px 0'}}>
       <small>Solde {kycOk?'Vérifié ✓':'Non vérifié'}</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small>GCV ${(piBal*314159).toLocaleString()} • {(piBal*liveRate).toLocaleString()} XAF</small>
       <div style={{marginTop:'8px',display:'flex',gap:'6px'}}><button onClick={()=>setUseGCV(true)} style={{flex:1,background:useGCV?'black':'rgba(0,0,0,0.2)',color:useGCV?'#facc15':'black',border:'none',padding:'6px',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>GCV $314k</button><button onClick={()=>setUseGCV(false)} style={{flex:1,background:!useGCV?'black':'rgba(0,0,0,0.2)',color:!useGCV?'#22c55e':'black',border:'none',padding:'6px',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>LIVE {liveRate}</button></div>
      </div>
      <div style={{display:'grid',gap:'6px'}}>
       <button onClick={()=>{setTab('home');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>🏠 Accueil + Chart LIVE</button>
       <button onClick={()=>{setTab('send');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📤 Envoyer</button>
       <button onClick={()=>{setTab('receive');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📥 QR Scanner</button>
       <button onClick={()=>{setTab('history');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'#facc15',textAlign:'left'}}>📜 Historique & Recus</button>
       <button onClick={()=>{setShowKYC(true);setMenuOpen(false)}} style={{background:kycOk?'#22c55e':'#ef4444',border:'none',padding:'12px',borderRadius:'10px',color:kycOk?'black':'white',textAlign:'left',fontWeight:'bold'}}>{kycOk?'✓ KYC Vérifié':'⚠️ KYC - Vérifier Identité'}</button>
       <a href="/admin" style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textDecoration:'none'}}>🔐 Panel Admin PIN 6678</a>
      </div>
     </div><div style={{flex:1}} onClick={()=>setMenuOpen(false)}></div>
    </div>
   )}
   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'#facc15',padding:'12px',borderRadius:'14px',color:'black'}}><small style={{fontSize:'11px'}}>Solde Pi - GCV {kycOk?'✓':''}</small><h2 style={{margin:'2px 0',fontSize:'26px'}}>1,250 π</h2><b style={{fontSize:'13px'}}>${(piBal*314159).toLocaleString()}</b><br/><small>{(piBal*GCV_XAF).toLocaleString()} XAF</small><br/><small style={{background:'black',color:'#facc15',padding:'3px 7px',borderRadius:'12px',fontSize:'10px',marginTop:'6px',display:'inline-block'}}>GCV 314,159$</small></div>
      <div style={{background:'#0f172a',padding:'12px',borderRadius:'14px',border:'1px solid #22c55e'}}><small style={{color:'#94a3b8',fontSize:'11px'}}>XAF Disponible</small><h2 style={{margin:'6px 0',fontSize:'26px'}}>{(piBal*liveRate).toLocaleString().slice(0,9)}</h2><small style={{color:'#22c55e',fontSize:'12px'}}>● LIVE {trend}</small></div>
     </div>
     {!kycOk&&<div style={{background:'#ef4444',padding:'10px',borderRadius:'10px',marginTop:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><small>⚠️ Vérifie ton identité pour débloquer tout</small><button onClick={()=>setShowKYC(true)} style={{background:'white',color:'#ef4444',border:'none',padding:'6px 10px',borderRadius:'6px',fontWeight:'bold',fontSize:'11px'}}>KYC</button></div>}     <div style={{display:'flex',justifyContent:'space-between',marginTop:'12px'}}><div><small style={{color:'#94a3b8'}}>Valeur GCV</small><br/><small style={{color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>1π = $314,159 = {GCV_XAF.toLocaleString()} XAF</small></div><div style={{textAlign:'right'}}><small style={{color:'#94a3b8'}}>Exchange</small><br/><small style={{color:'#22c55e',fontWeight:'bold',fontSize:'11px'}}>1π = {liveRate} XAF {trend}</small></div></div>

     <div style={{background:'#1e293b',padding:'12px',borderRadius:'14px',marginTop:'12px',border:'1px solid #334155'}}>
      <b style={{color:'#facc15',fontSize:'12px'}}>📈 Chart GCV vs Exchange - 6 Jours LIVE</b>
      <div style={{display:'flex',alignItems:'end',gap:'4px',height:'80px',marginTop:'10px'}}>
       {CHART.map((c,i)=><div key={i} style={{flex:1,textAlign:'center'}}><div style={{background:'#facc15',height:`${20+i*8}px`,borderRadius:'4px 4px 0 0`,opacity:0.6}}></div><div style={{background:'#22c55e',height:`${30+(c.ex-660)*5}px`,borderRadius:'4px 4px 0 0`,marginTop:'2px'}}></div><small style={{fontSize:'8px',color:'#94a3b8'}}>{c.d}</small></div>)}
      </div>
      <div style={{display:'flex',gap:'10px',marginTop:'6px'}}><small style={{color:'#facc15'}}>■ GCV Fixe 314k$</small><small style={{color:'#22c55e'}}>■ Exchange LIVE {liveRate}</small></div>
     </div>

     <b style={{color:'#facc15',fontSize:'14px',marginTop:'12px',display:'block'}}>Actions Rapides</b>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px',marginTop:'8px'}}>
      <button onClick={()=>setTab('send')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📤</div><small>Envoyer</small></button>
      <button onClick={()=>setTab('receive')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📥</div><small>Recevoir</small></button>
      <button onClick={()=>setShowKYC(true)} style={{background:'#1e293b',border:kycOk?'1px solid #22c55e':'1px solid #ef4444',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>{kycOk?'✅':'⚠️'}</div><small>KYC</small></button>
      <button onClick={()=>setTab('history')} style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📜</div><small>Historique</small></button>
     </div>

     <div style={{background:'#1e293b',padding:'12px',borderRadius:'14px',marginTop:'12px',border:'1px solid #facc15'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15',fontSize:'12px'}}>Convertisseur • 1π = {useGCV?GCV_XAF.toLocaleString():liveRate+' XAF'}</b><button onClick={()=>setUseGCV(!useGCV)} style={{background:useGCV?'#facc15':'#22c55e',color:'black',border:'none',padding:'4px 10px',borderRadius:'12px',fontSize:'11px',fontWeight:'bold'}}>{useGCV?'GCV':'LIVE'}</button></div>
      <div style={{display:'flex',gap:'8px',marginTop:'10px'}}><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="0" style={{flex:1,padding:'14px',borderRadius:'10px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'14px',borderRadius:'10px',background:'#0f172a',color:'white',border:'1px solid #facc15'}}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div>
      <h2 style={{textAlign:'center',color:'#facc15',margin:'10px 0 0 0'}}>{resultTo} PI</h2>
     </div>

     <div style={{marginTop:'12px'}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>Dernieres Transactions</b><button onClick={()=>setTab('history')} style={{background:'none',border:'none',color:'#facc15',fontSize:'12px'}}>Voir tout →</button></div>
      <div style={{marginTop:'8px',display:'grid',gap:'6px'}}>{txs.slice(0,3).map(t=><div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#1e293b',padding:'10px 12px',borderRadius:'10px',display:'flex',justifyContent:'space-between',border:'1px solid #334155'}}><div><b style={{fontSize:'12px'}}>{t.type} {t.amount}</b><br/><small style={{color:'#94a3b8',fontSize:'10px'}}>{t.from}</small></div><small style={{color:'#22c55e',fontSize:'10px'}}>{t.mode} ✓</small></div>)}</div>
     </div>
    </div>
   )}
   {tab==='send'&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'1px solid #facc15'}}><h3 style={{color:'#facc15',margin:0}}>📤 Envoyer Pi</h3><div style={{display:'flex',gap:'6px',margin:'12px 0'}}><button onClick={()=>setUseGCV(true)} style={{flex:1,background:useGCV?'#facc15':'#0f172a',color:useGCV?'black':'white',padding:'10px',borderRadius:'8px',border:'1px solid #facc15',fontWeight:'bold'}}>GCV</button><button onClick={()=>setUseGCV(false)} style={{flex:1,background:!useGCV?'#22c55e':'#0f172a',color:!useGCV?'black':'white',padding:'10px',borderRadius:'8px',border:'1px solid #334155',fontWeight:'bold'}}>LIVE {liveRate}</button></div><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Numero 66..." style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginBottom:'8px'}}/><input value={piAmt} onChange={e=>setPiAmt(e.target.value)} type="number" placeholder="Montant Pi" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',marginBottom:'8px'}}/><button onClick={doSend} style={{width:'100%',background:'#facc15',color:'black',padding:'14px',borderRadius:'10px',border:'none',fontWeight:'bold'}}>Confirmer</button></div></div>}
   {tab==='history'&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px'}}><h3 style={{color:'#facc15',margin:0}}>📜 Historique V8B</h3><div style={{marginTop:'12px',display:'grid',gap:'8px'}}>{txs.map(t=><div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#0f172a',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}><div style={{display:'flex',justifyContent:'space-between'}}><b>{t.type} {t.amount}</b><small style={{color:'#22c55e'}}>✓ {t.mode}</small></div><small style={{color:'#94a3b8'}}>{t.from} • {t.xaf}</small></div>)}</div></div></div>}
   {(tab==='receive'||tab==='deposit')&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px'}}>← Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',textAlign:'center',marginTop:'10px'}}><h3 style={{color:'#facc15'}}>QR Code GDB - {piBal}π</h3><div style={{background:'white',width:'180px',height:'180px',margin:'14px auto',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'black',fontWeight:'bold',border:'3px solid #facc15'}}>GDB<br/>SCAN ME</div><button onClick={()=>setShowQR(true)} style={{background:'#0f172a',border:'1px solid #facc15',color:'#facc15',padding:'10px 14px',borderRadius:'8px',fontWeight:'bold'}}>📷 Scanner</button></div></div>}

   {showKYC&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px'}}>
     <div style={{background:'#1e293b',padding:'16px',borderRadius:'14px',width:'100%',maxWidth:'340px',border:'2px solid #facc15'}}>
      <h3 style={{color:'#facc15',margin:0}}>⚠️ KYC Vérification</h3><small style={{color:'#94a3b8'}}>Vérifie ton identité pour débloquer 1,250 π</small>
      <div style={{marginTop:'12px',display:'grid',gap:'8px'}}>
       <input placeholder="Nom complet" style={{padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/>
       <input placeholder="N° Carte Nationale" style={{padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/>
       <div style={{background:'#0f172a',padding:'12px',borderRadius:'8px',border:'1px dashed #facc15',textAlign:'center'}}><small style={{color:'#facc15'}}>📷 Photo Carte d'identité (Recto)</small><br/><small style={{color:'#64748b'}}>Clique pour ajouter</small></div>
       <div style={{background:'#0f172a',padding:'12px',borderRadius:'8px',border:'1px dashed #22c55e',textAlign:'center'}}><small style={{color:'#22c55e'}}>🤳 Selfie avec carte</small><br/><small style={{color:'#64748b'}}>Clique pour ajouter</small></div>
      </div>
      <div style={{display:'flex',gap:'8px',marginTop:'12px'}}><button onClick={()=>setShowKYC(false)} style={{flex:1,background:'#0f172a',color:'white',padding:'12px',borderRadius:'8px',border:'1px solid #334155'}}>Annuler</button><button onClick={()=>{setKycOk(true);setShowKYC(false);alert('KYC envoyé! Vérification en 5 min - Agent 66 78 75 46')}} style={{flex:1,background:'#22c55e',color:'black',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold'}}>Envoyer KYC</button></div>
     </div>
    </div>
   )}

   {showNotif&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:200,display:'flex',justifyContent:'flex-end'}}>
     <div style={{width:'90%',maxWidth:'360px',background:'#0f172a',height:'100%',borderLeft:'2px solid #facc15',padding:'14px',overflowY:'auto'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15'}}>🔔 Notifications (3)</b><button onClick={()=>setShowNotif(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'6px 10px',borderRadius:'6px',color:'white'}}>X</button></div>
      <div style={{marginTop:'12px',display:'grid',gap:'8px'}}>{notifs.map(n=><div key={n.id} style={{background:'#1e293b',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>{n.t}</b><small style={{color:'#64748b'}}>{n.time}</small></div><small style={{color:'#94a3b8'}}>{n.m}</small></div>)}</div>
      <button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{width:'100%',background:'#25D366',color:'white',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold',marginTop:'14px'}}>Support WhatsApp</button>
     </div>
     <div style={{flex:1}} onClick={()=>setShowNotif(false)}></div>
    </div>
   )}

   {showReceipt&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px'}}><div style={{background:'white',color:'black',padding:'16px',borderRadius:'14px',width:'100%',maxWidth:'340px'}}><h3 style={{margin:'0 0 8px 0'}}>Recu GDB - {showReceipt.type
