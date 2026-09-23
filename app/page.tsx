'use client'
import { useState, useEffect } from 'react'
const CURRENCIES=[{code:'PI',rate:1,market:1},{code:'XAF',rate:180013107,market:665.45},{code:'USD',rate:314159,market:1.134}]
const CHART=[{d:'18',ex:662},{d:'19',ex:664},{d:'20',ex:663},{d:'21',ex:665},{d:'22',ex:664},{d:'23',ex:665}]
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
  {id:1,type:'recu',amount:'250 pi',xaf:'166k XAF',date:'23 Sep 06:12',status:'ok',from:'Agent 66 78 75 46',mode:'GCV'},
  {id:2,type:'envoye',amount:'15 pi',xaf:'9981 XAF',date:'22 Sep',status:'ok',from:'Airtel 66 12 34 56',mode:'Exchange'},
 ])
 const [showQR,setShowQR]=useState(false)
 const [phone,setPhone]=useState('')
 const [piAmt,setPiAmt]=useState('')
 const [showReceipt,setShowReceipt]=useState<any>(null)
 const [showKYC,setShowKYC]=useState(false)
 const [kycOk,setKycOk]=useState(false)
 const [showNotif,setShowNotif]=useState(false)
 const notifs=[{id:1,t:'Depot valide',m:'50 pi recus GCV',time:'2 min'},{id:2,t:'Prix LIVE',m:'Pi 665.45 XAF +0.32%',time:'10 min'},{id:3,t:'KYC a faire',m:'Verifie identite',time:'1h'}]
 const GCV_XAF=314159*573
 const piBal=1250  const [piUser,setPiUser]=useState<any>(null)
 const authPi = async()=>{
  // @ts-ignore
  const Pi = window.Pi
  if(!Pi){alert('Ouvre dans Pi Browser!');return}
  Pi.init({version:"2.0", sandbox:true})
  const scopes=['username','payments']
  const auth = await Pi.authenticate(scopes,(p:any)=>{console.log(p)})
  setPiUser(auth.user)
  alert('Bienvenue '+auth.user.username+' - GDB Connecté Pi!')
 }
 const payWithPi = async()=>{
  // @ts-ignore
  const Pi = window.Pi
  Pi.createPayment({
   amount: parseFloat(piAmt||'1'),
   memo: 'GDB Transfer '+phone,
   metadata: {phone}
  },{
   onReadyForServerApproval:(id:any)=>{console.log('Approbation',id)},
   onReadyForServerCompletion:(id:any,tx:any)=>{alert('Paiement Pi réussi! '+id);setTxs([{id, type:'envoye', amount:piAmt+' pi', xaf:'Payé Pi SDK', from:'Pi Network', mode:'GCV'},...txs])},
   onCancel:(id:any)=>{alert('Annulé')},
   onError:(e:any)=>{alert('Erreur Pi '+e)}
  })
}
 useEffect(()=>{const i=setInterval(()=>{const c=(Math.random()-0.45)*1.2;setLiveRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},2500);return()=>clearInterval(i)},[])
 const resultTo=(amount/(useGCV?CURRENCIES.find(c=>c.code===from)?.rate||GCV_XAF:CURRENCIES.find(c=>c.code===from)?.market||665.45)).toFixed(6)
 const doSend=()=>{if(!phone||!piAmt)return alert('Remplis');const n={id:Date.now(),type:'envoye',amount:piAmt+' pi',xaf:(parseFloat(piAmt)*(useGCV?GCV_XAF:liveRate)).toLocaleString()+' XAF',date:new Date().toLocaleString(),status:'ok',from:'Vers '+phone,mode:useGCV?'GCV':'Exchange'};setTxs([n,...txs]);setShowReceipt(n);setPhone('');setPiAmt('')}
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'90px'}}>
   <div style={{background:'#1e293b',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:30}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
     <button onClick={()=>setMenuOpen(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'10px',padding:'8px 10px',color:'#facc15',fontSize:'18px'}}>☰</button>
     <img src="/logo.png" alt="logo" style={{width:'42px',height:'42px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'13px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#22c55e',fontSize:'10px'}}>WORLD 66 78 75 46 {liveRate} {trend}</small></div>
    </div>
    <div style={{display:'flex',gap:'8px'}}>
     <button onClick={()=>setShowNotif(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'50%',width:'36px',height:'36px',color:'#facc15'}}>🔔</button>
     <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'20px',padding:'6px 12px',color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>FR</button>
    </div>
   </div>
   {menuOpen&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:100,display:'flex'}}>
     <div style={{width:'90%',maxWidth:'370px',background:'#0f172a',height:'100%',overflowY:'auto',borderRight:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15'}}>GDB FINAL V8B</b><button onClick={()=>setMenuOpen(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'8px 12px',borderRadius:'8px',color:'white'}}>X</button></div>
      <div style={{background:'#facc15',padding:'12px',borderRadius:'12px',color:'black',margin:'12px 0'}}><small>Solde {kycOk?'Verifie':'Non verifie'}</small><h2 style={{margin:'4px 0'}}>1,250 pi</h2><small>GCV {piBal*314159} $ - {(piBal*liveRate).toLocaleString()} XAF</small></div>
      <div style={{display:'grid',gap:'6px'}}>
       <button onClick={()=>{setTab('home');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>🏠 Accueil</button>
       <button onClick={()=>{setTab('send');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📤 Envoyer</button>
       <button onClick={()=>{setTab('history');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'#facc15',textAlign:'left'}}>📜 Historique</button>
       <button onClick={()=>{setShowKYC(true);setMenuOpen(false)}} style={{background:kycOk?'#22c55e':'#ef4444',border:'none',padding:'12px',borderRadius:'10px',color:kycOk?'black':'white',fontWeight:'bold',textAlign:'left'}}>{kycOk?'KYC Verifie':'KYC a faire'}</button>
       <a href="/admin" style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textDecoration:'none',display:'block'}}>🔐 Admin PIN 6678</a>
      </div>
     </div><div style={{flex:1}} onClick={()=>setMenuOpen(false)}></div>
    </div>
   )}
   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'#facc15',padding:'12px',borderRadius:'14px',color:'black'}}><small>Solde Pi GCV {kycOk?'ok':''}</small><h2 style={{margin:'2px 0',fontSize:'26px'}}>1,250 pi</h2><b>${(piBal*314159).toLocaleString()}</b><br/><small>{(piBal*GCV_XAF).toLocaleString()} XAF</small></div>
      <div style={{background:'#0f172a',padding:'12px',borderRadius:'14px',border:'1px solid #22c55e'}}><small style={{color:'#94a3b8'}}>XAF Disponible</small><h2 style={{margin:'6px 0',fontSize:'26px'}}>{(piBal*liveRate).toFixed(0)}</h2><small style={{color:'#22c55e'}}>LIVE {trend}</small></div>
     </div>     {!kycOk&&<div style={{background:'#ef4444',padding:'10px',borderRadius:'10px',marginTop:'10px',display:'flex',justifyContent:'space-between'}}><small>KYC obligatoire</small><button onClick={()=>setShowKYC(true)} style={{background:'white',color:'#ef4444',border:'none',padding:'4px 8px',borderRadius:'6px',fontWeight:'bold'}}>Faire KYC</button></div>}
     <div style={{background:'#1e293b',padding:'12px',borderRadius:'14px',marginTop:'12px',border:'1px solid #334155'}}>
      <b style={{color:'#facc15',fontSize:'12px'}}>Chart GCV vs Exchange LIVE</b>
      <div style={{display:'flex',alignItems:'flex-end',gap:'4px',height:'80px',marginTop:'10px'}}>
       {CHART.map((c,i)=><div key={i} style={{flex:1,textAlign:'center'}}><div style={{background:'#facc15',height:(20+i*8)+'px',borderRadius:'4px',opacity:0.6}}></div><div style={{background:'#22c55e',height:(30+(c.ex-660)*3)+'px',borderRadius:'4px',marginTop:'2px'}}></div><small style={{fontSize:'8px',color:'#94a3b8'}}>{c.d}</small></div>)}
      </div>
      <div style={{display:'flex',gap:'10px',marginTop:'6px'}}><small style={{color:'#facc15'}}>GCV Fixe</small><small style={{color:'#22c55e'}}>LIVE {liveRate}</small></div>
     </div>
     <b style={{color:'#facc15',fontSize:'14px',marginTop:'12px',display:'block'}}>Actions Rapides</b>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px',marginTop:'8px'}}>
      <button onClick={()=>setTab('send')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div>📤</div><small>Envoyer</small></button>
      <button onClick={()=>setTab('receive')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div>📥</div><small>Recevoir</small></button>
      <button onClick={()=>setShowKYC(true)} style={{background:'#1e293b',border:'1px solid #ef4444',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div>{kycOk?'✅':'⚠️'}</div><small>KYC</small></button>
      <button onClick={()=>setTab('history')} style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div>📜</div><small>Historique</small></button>
     </div>
     <div style={{background:'#1e293b',padding:'12px',borderRadius:'14px',marginTop:'12px',border:'1px solid #facc15'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15',fontSize:'12px'}}>Convertisseur 1 pi = {useGCV?GCV_XAF.toLocaleString():liveRate+' XAF'}</b><button onClick={()=>setUseGCV(!useGCV)} style={{background:useGCV?'#facc15':'#22c55e',color:'black',border:'none',padding:'4px 10px',borderRadius:'12px',fontSize:'11px',fontWeight:'bold'}}>{useGCV?'GCV':'LIVE'}</button></div>
      <div style={{display:'flex',gap:'8px',marginTop:'10px'}}><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="0" style={{flex:1,padding:'14px',borderRadius:'10px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'14px',borderRadius:'10px',background:'#0f172a',color:'white',border:'1px solid #facc15'}}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div>
      <h2 style={{textAlign:'center',color:'#facc15',margin:'10px 0 0 0'}}>{resultTo} PI</h2>
     </div>
     <div style={{marginTop:'12px'}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'13px'}}>Dernieres Transactions</b><button onClick={()=>setTab('history')} style={{background:'none',border:'none',color:'#facc15',fontSize:'12px'}}>Voir tout</button></div>
      <div style={{marginTop:'8px',display:'grid',gap:'6px'}}>{txs.slice(0,3).map(t=><div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#1e293b',padding:'10px 12px',borderRadius:'10px',display:'flex',justifyContent:'space-between',border:'1px solid #334155'}}><div><b style={{fontSize:'12px'}}>{t.type} {t.amount}</b><br/><small style={{color:'#94a3b8',fontSize:'10px'}}>{t.from}</small></div><small style={{color:'#22c55e'}}>{t.mode}</small></div>)}</div>
     </div>
    </div>
   )}
   {tab==='send'&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'1px solid #facc15'}}><h3 style={{color:'#facc15',margin:0}}>Envoyer Pi</h3><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Numero 66..." style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginBottom:'8px',marginTop:'10px'}}/><input value={piAmt} onChange={e=>setPiAmt(e.target.value)} type="number" placeholder="Montant Pi" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',marginBottom:'8px'}}/><button onClick={doSend} style={{width:'100%',background:'#facc15',color:'black',padding:'14px',borderRadius:'10px',border:'none',fontWeight:'bold'}}>Confirmer</button></div></div>}
   {tab==='history'&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px'}}><h3 style={{color:'#facc15',margin:0}}>Historique</h3><div style={{marginTop:'12px',display:'grid',gap:'8px'}}>{txs.map(t=><div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#0f172a',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}><div style={{display:'flex',justifyContent:'space-between'}}><b>{t.type} {t.amount}</b><small style={{color:'#22c55e'}}>{t.mode}</small></div><small style={{color:'#94a3b8'}}>{t.from} {t.xaf}</small></div>)}</div></div></div>}
   {(tab==='receive')&&<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px'}}>Accueil</button><div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',textAlign:'center',marginTop:'10px'}}><h3 style={{color:'#facc15'}}>QR Code GDB</h3><div style={{background:'white',width:'180px',height:'180px',margin:'14px auto',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'black',fontWeight:'bold'}}>GDB SCAN</div><button onClick={()=>setShowQR(true)} style={{background:'#0f172a',border:'1px solid #facc15',color:'#facc15',padding:'10px 14px',borderRadius:'8px',fontWeight:'bold'}}>Scanner</button></div></div>}
   {showKYC&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px'}}>
     <div style={{background:'#1e293b',padding:'16px',borderRadius:'14px',width:'100%',maxWidth:'340px',border:'2px solid #facc15'}}>
      <h3 style={{color:'#facc15',margin:0}}>KYC Verification</h3>
      <input placeholder="Nom complet" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginTop:'10px'}}/>
      <input placeholder="Carte Nationale" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginTop:'8px'}}/>
      <div style={{display:'flex',gap:'8px',marginTop:'12px'}}><button onClick={()=>setShowKYC(false)} style={{flex:1,background:'#0f172a',color:'white',padding:'12px',borderRadius:'8px',border:'1px solid #334155'}}>Annuler</button><button onClick={()=>{setKycOk(true);setShowKYC(false)}} style={{flex:1,background:'#22c55e',color:'black',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'bold'}}>Envoyer KYC</button></div>
     </div>
    </div>
   )}
   {showNotif&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:200,display:'flex',justifyContent:'flex-end'}}>
     <div style={{width:'90%',maxWidth:'360px',background:'#0f172a',height:'100%',borderLeft:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15'}}>Notifications</b><button onClick={()=>setShowNotif(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'6px 10px',borderRadius:'6px',color:'white'}}>X</button></div>
      <div style={{marginTop:'12px',display:'grid',gap:'8px'}}>{notifs.map(n=><div key={n.id} style={{background:'#1e293b',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}><b style={{fontSize:'13px'}}>{n.t}</b><br/><small style={{color:'#94a3b8'}}>{n.m}</small></div>)}</div>
     </div><div style={{flex:1}} onClick={()=>setShowNotif(false)}></div>
    </div>
   )}
   {showReceipt&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px'}}><div style={{background:'white',color:'black',padding:'16px',borderRadius:'14px',width:'100%',maxWidth:'340px'}}><h3>Recu GDB {showReceipt.type}</h3><div style={{fontSize:'13px'}}><div>Montant: <b>{showReceipt.amount}</b></div><div>XAF: <b>{showReceipt.xaf}</b></div><div>Mode: <b>{showReceipt.mode}</b></div></div><button onClick={()=>setShowReceipt(null)} style={{width:'100%',background:'#0f172a',color:'white',padding:'10px',borderRadius:'8px',border:'none',marginTop:'10px'}}>Fermer</button></div></div>}
   {showQR&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'black',zIndex:200,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><div style={{width:'90%',height:'300px',border:'2px solid #facc15',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15'}}>Scanner QR</div><button onClick={()=>setShowQR(false)} style={{background:'#facc15',color:'black',padding:'12px 20px',borderRadius:'8px',border:'none',fontWeight:'bold',marginTop:'14px'}}>Fermer</button></div>}
   <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0f172a',borderTop:'1px solid #334155',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',padding:'6px 0'}}>
    <button onClick={()=>setTab('home')} style={{background:'none',border:'none',color:tab==='home'?'#facc15':'#64748b',padding:'6px'}}><div>🏠</div><small style={{fontSize:'9px'}}>Accueil</small></button>
    <button onClick={()=>setTab('history')} style={{background:'none',border:'none',color:'#64748b',padding:'6px'}}><div>📜</div><small style={{fontSize:'9px'}}>Historique</small></button>
    <button onClick={()=>setMenuOpen(true)} style={{background:'#facc15',border:'none',color:'black',padding:'6px',borderRadius:'14px',fontWeight:'bold'}}><div>☰</div><small style={{fontSize:'9px'}}>Menu</small></button>
    <button onClick={()=>setShowKYC(true)} style={{background:'none',border:'none',color:kycOk?'#22c55e':'#ef4444',padding:'6px'}}><div>{kycOk?'✅':'⚠️'}</div><small style={{fontSize:'9px'}}>KYC</small></button>
    <a href="/admin" style={{textAlign:'center',textDecoration:'none',color:'#64748b',padding:'6px'}}><div>🔐</div><small style={{fontSize:'9px'}}>Admin</small></a>
   </div>
  </div>
 )
   }
