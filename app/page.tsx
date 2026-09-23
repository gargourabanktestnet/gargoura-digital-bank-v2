'use client'
import { useState, useEffect } from 'react'
const LANGS = [{c:'fr',n:'Francais',f:'FR'},{c:'en',n:'English',f:'GB'},{c:'ar',n:'Arabic',f:'SA'}]
const CURRENCIES = [
 {code:'PI',name:'Pi GCV',rate:1,market:1},
 {code:'XAF',name:'CFA',rate:180013107,market:665.45},
 {code:'USD',name:'Dollar',rate:314159,market:1.134},
 {code:'EUR',name:'Euro',rate:290000,market:0.992},
 {code:'NGN',name:'Naira',rate:450000000,market:1798},
]
const INIT_TX = [
 {id:1,type:'reçu',amount:'250 π',xaf:'166 362 XAF',date:'23 Sep 06:12',status:'ok',from:'Agent 66 78 75 46',mode:'GCV'},
 {id:2,type:'envoyé',amount:'15 π',xaf:'9 981 XAF',date:'22 Sep 18:30',status:'ok',from:'Airtel 66 12 34 56',mode:'Exchange'},
 {id:3,type:'depot',amount:'50 π',xaf:'500 000 XAF',date:'22 Sep 10:15',status:'pending',from:'Moov Money',mode:'GCV'},
 {id:4,type:'reçu',amount:'100 π',xaf:'66 545 XAF',date:'21 Sep 14:20',status:'ok',from:'Pi Wallet GDT...8F9',mode:'Exchange'},
]
export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false)
 const [lang,setLang]=useState('fr')
 const [showLangs,setShowLangs]=useState(false)
 const [amount,setAmount]=useState(0)
 const [from,setFrom]=useState('XAF')
 const [to,setTo]=useState('PI')
 const [liveRate,setLiveRate]=useState(665.45)
 const [trend,setTrend]=useState('+0.32%')
 const [tab,setTab]=useState('home')
 const [useGCV,setUseGCV]=useState(true)
 const [txs,setTxs]=useState(INIT_TX)
 const [showQR,setShowQR]=useState(false)
 const [phone,setPhone]=useState('')
 const [piAmt,setPiAmt]=useState('')
 const [showReceipt,setShowReceipt]=useState<any>(null)
 const GCV_XAF = 314159 * 573
 const piBal = 1250
 useEffect(()=>{
  const i=setInterval(()=>{const c=(Math.random()-0.45)*1.2;setLiveRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},2500);return()=>clearInterval(i)
 },[])
 const fromRate = CURRENCIES.find(c=>c.code===from)?.rate||GCV_XAF
 const fromMarket = CURRENCIES.find(c=>c.code===from)?.market||665.45
 const activeRate = useGCV? fromRate : fromMarket
 const resultTo = to==='PI'? (amount/activeRate).toFixed(6) : ((amount/activeRate)*(CURRENCIES.find(c=>c.code===to)?.rate||1)).toFixed(2)
 const doSend = ()=>{
  if(!phone||!piAmt) return alert('Remplis telephone et montant')
  const newTx={id:Date.now(),type:'envoyé',amount:piAmt+' π',xaf:(parseFloat(piAmt)*(useGCV?GCV_XAF:liveRate)).toLocaleString()+' XAF',date:new Date().toLocaleString('fr-FR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}),status:'ok',from:'Vers '+phone,mode:useGCV?'GCV':'Exchange'}
  setTxs([newTx,...txs]);setShowReceipt(newTx);setPhone('');setPiAmt('')
 }
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'90px'}}>
   <div style={{background:'#1e293b',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:30}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
     <button onClick={()=>setMenuOpen(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'10px',padding:'8px 10px',color:'#facc15',fontSize:'18px'}}>☰</button>
     <img src="/logo.png" style={{width:'42px',height:'42px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'13px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#22c55e',fontSize:'10px'}}>WORLD • Agent: 66 78 75 46 • PI {liveRate} {trend}</small></div>
    </div>
    <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'20px',padding:'6px 12px',color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>FR<br/>FR</button>
   </div>
   {showLangs&&(<div style={{background:'#1e293b',padding:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',borderBottom:'2px solid #facc15'}}>{LANGS.map(l=><button key={l.c} onClick={()=>{setLang(l.c);setShowLangs(false)}} style={{background:lang===l.c?'#facc15':'#0f172a',color:lang===l.c?'black':'white',border:'1px solid #334155',padding:'10px',borderRadius:'10px',fontSize:'12px'}}>{l.f} {l.n}</button>)}</div>)}
   {menuOpen&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:100,display:'flex'}}>
     <div style={{width:'90%',maxWidth:'370px',background:'#0f172a',height:'100%',overflowY:'auto',borderRight:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{color:'#facc15'}}>GDB MENU V7</b><button onClick={()=>setMenuOpen(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'8px 12px',borderRadius:'8px',color:'white'}}>X</button></div>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'12px',borderRadius:'12px',color:'black',margin:'12px 0'}}>
       <small>Solde Total V7</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small>GCV: ${(piBal*314159).toLocaleString()} • Exchange: {(piBal*liveRate).toLocaleString()} XAF</small>
       <div style={{marginTop:'8px',display:'flex',gap:'6px'}}><button onClick={()=>setUseGCV(true)} style={{flex:1,background:useGCV?'black':'rgba(0,0,0,0.2)',color:useGCV?'#facc15':'black',border:'none',padding:'6px',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>GCV 314159$</button><button onClick={()=>setUseGCV(false)} style={{flex:1,background:!useGCV?'black':'rgba(0,0,0,0.2)',color:!useGCV?'#22c55e':'black',border:'none',padding:'6px',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>LIVE {liveRate}</button></div>
      </div>
      <div style={{display:'grid',gap:'6px'}}>
       <button onClick={()=>{setTab('home');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>🏠 Accueil + Historique</button>
       <button onClick={()=>{setTab('converter');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>💱 Convertisseur LIVE</button>
       <button onClick={()=>{setTab('send');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📤 Envoyer</button>
       <button onClick={()=>{setTab('receive');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📥 Recevoir - QR</button>
       <button onClick={()=>{setTab('deposit');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>💰 Deposer</button>
       <button onClick={()=>{setTab('history');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'#facc15',textAlign:'left'}}>📜 Historique & Recus - NOUVEAU</button>
       <a href="/admin" style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textDecoration:'none'}}>🔐 Admin</a>
       <button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{background:'#25D366',border:'none',padding:'12px',borderRadius:'10px',color:'white',fontWeight:'bold'}}>💬 Support WhatsApp</button>
      </div>
     </div>
     <div style={{flex:1}} onClick={()=>setMenuOpen(false)}></div>
    </div>
   )}
   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'#facc15',padding:'12px',borderRadius:'14px',color:'black'}}><small style={{fontSize:'11px'}}>Solde Pi - GCV</small><h2 style={{margin:'2px 0',fontSize:'26px'}}>1,250 π</h2><b style={{fontSize:'13px'}}>${(piBal*314159).toLocaleString()}</b><br/><small style={{fontSize:'11px'}}>{(piBal*GCV_XAF).toLocaleString()} XAF</small><br/><small style={{background:'black',color:'#facc15',padding:'3px 7px',borderRadius:'12px',fontSize:'10px',marginTop:'6px',display:'inline-block'}}>GCV 314,159$</small></div>
      <div style={{background:'#0f172a',padding:'12px',borderRadius:'14px',border:'1px solid #22c55e'}}><small style={{color:'#94a3b8',fontSize:'11px'}}>XAF Disponible - Exchange</small><h2 style={{margin:'6px 0',fontSize:'26px'}}>{(piBal*liveRate).toLocaleString().slice(0,9)}</h2><small style={{color:'#22c55e',fontSize:'12px'}}>● En ligne • {trend} LIVE</small></div>
     </div>
     <div style={{display:'flex',justifyContent:'space-between',marginTop:'12px',padding:'8px 0'}}><div><small style={{color:'#94a3b8'}}>Valeur GCV</small><br/><small style={{color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>1π = $314,159 = {GCV_XAF.toLocaleString()} XAF</small></div><div style={{textAlign:'right'}}><small style={{color:'#94a3b8'}}>Valeur Exchange</small><br/><small style={{color:'#22c55e',fontWeight:'bold',fontSize:'11px'}}>1π = {liveRate} XAF {trend}</small></div></div>
     <b style={{color:'#facc15',fontSize:'14px',marginTop:'10px',display:'block'}}>Actions Rapides</b>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px',marginTop:'8px'}}>
      <button onClick={()=>setTab('send')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📤</div><small>Envoyer</small></button>
      <button onClick={()=>setTab('receive')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📥</div><small>Recevoir</small></button>
      <button onClick={()=>setTab('deposit')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>💰</div><small>Deposer</small></button>
      <button onClick={()=>setTab('converter')} style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:'12px',padding:'14px 4px',color:'white'}}><div style={{fontSize:'20px'}}>🔄</div><small>Convert</small></button>
     </div>     <div style={{background:'#1e293b',padding:'12px',borderRadius:'14px',marginTop:'14px',border:'1px solid #facc15'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15',fontSize:'12px'}}>Convertisseur Mondial • 1 π = {useGCV? GCV_XAF.toLocaleString() : liveRate+' XAF'}</b><button onClick={()=>setUseGCV(!useGCV)} style={{background:useGCV?'#facc15':'#22c55e',color:'black',border:'none',padding:'4px 10px',borderRadius:'12px',fontSize:'11px',fontWeight:'bold'}}>{useGCV?'GCV':'LIVE'}</button></div>
      <div style={{display:'flex',gap:'8px',marginTop:'10px'}}><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="0" style={{flex:1,padding:'14px',borderRadius:'10px',background:'#0f172a',border:'1px solid #334155',color:'white',fontSize:'16px'}}/><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'14px',borderRadius:'10px',background:'#0f172a',color:'white',border:'1px solid #facc15',fontWeight:'bold'}}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div>
      <div style={{textAlign:'center',marginTop:'12px'}}><h2 style={{color:'#facc15',margin:0,fontSize:'28px'}}>{resultTo} {to}</h2><small style={{color:'#64748b',fontSize:'11px'}}>{CURRENCIES.length} devises • Pi reference • {trend}</small></div>
     </div>
     <div style={{marginTop:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'white',fontSize:'13px'}}>Dernieres Transactions - Phase 7</b><button onClick={()=>setTab('history')} style={{background:'none',border:'none',color:'#facc15',fontSize:'12px'}}>Voir tout →</button></div>
      <div style={{marginTop:'8px',display:'grid',gap:'6px'}}>
       {txs.slice(0,3).map(t=>(
        <div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#1e293b',padding:'10px 12px',borderRadius:'10px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #334155'}}>
         <div style={{display:'flex',gap:'10px',alignItems:'center'}}><div style={{width:'36px',height:'36px',background:t.type==='envoyé'?'#ef4444':t.type==='reçu'?'#22c55e':'#facc15',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{t.type==='envoyé'?'↑':t.type==='reçu'?'↓':'$'}</div><div><b style={{fontSize:'12px'}}>{t.type} {t.amount}</b><br/><small style={{color:'#94a3b8',fontSize:'10px'}}>{t.from} • {t.date}</small></div></div>
         <small style={{color:t.status==='ok'?'#22c55e':'#facc15',fontSize:'10px'}}>{t.status==='ok'?'✓ OK':t.mode}</small>
        </div>
       ))}
      </div>
     </div>
    </div>
   )}
   {tab==='send'&&(
    <div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'1px solid #facc15'}}><h3 style={{color:'#facc15',margin:0}}>📤 Envoyer Pi - Phase 7</h3>
      <div style={{display:'flex',gap:'6px',margin:'12px 0'}}><button onClick={()=>setUseGCV(true)} style={{flex:1,background:useGCV?'#facc15':'#0f172a',color:useGCV?'black':'white',padding:'10px',borderRadius:'8px',border:'1px solid #facc15',fontWeight:'bold'}}>GCV $314k</button><button onClick={()=>setUseGCV(false)} style={{flex:1,background:!useGCV?'#22c55e':'#0f172a',color:!useGCV?'black':'white',padding:'10px',borderRadius:'8px',border:'1px solid #334155',fontWeight:'bold'}}>Exchange {liveRate}</button></div>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Numero Airtel / MTN 66..." style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginBottom:'8px'}}/>
      <input value={piAmt} onChange={e=>setPiAmt(e.target.value)} type="number" placeholder="Montant Pi ex: 10" style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',fontWeight:'bold',marginBottom:'8px'}}/>
      <div style={{background:'#0f172a',padding:'10px',borderRadius:'8px',textAlign:'center',marginBottom:'10px'}}><small>Tu envoies {piAmt||0} π = {(parseFloat(piAmt||'0')*(useGCV?GCV_XAF:liveRate)).toLocaleString()} XAF</small></div>
      <button onClick={doSend} style={{width:'100%',background:'#facc15',color:'black',padding:'14px',borderRadius:'10px',border:'none',fontWeight:'bold'}}>Confirmer Envoi →</button>
     </div></div>
   )}
   {tab==='receive'&&(
    <div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',textAlign:'center',border:'1px solid #facc15'}}><h3 style={{color:'#facc15'}}>📥 Recevoir Pi - QR</h3>
      <div style={{background:'white',width:'180px',height:'180px',margin:'14px auto',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',color:'black',fontWeight:'bold',border:'3px solid #facc15'}}>QR CODE<br/>GDB-{piBal}π</div>
      <button onClick={()=>setShowQR(true)} style={{background:'#0f172a',border:'1px solid #facc15',color:'#facc15',padding:'10px 14px',borderRadius:'8px',marginTop:'12px',fontWeight:'bold'}}>📷 Scanner QR</button>
      <button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{width:'100%',background:'#25D366',color:'white',padding:'12px',borderRadius:'8px',border:'none',marginTop:'10px',fontWeight:'bold'}}>Partager sur WhatsApp</button>
     </div></div>
   )}
   {tab==='history'&&(
    <div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px'}}><h3 style={{color:'#facc15',margin:0}}>📜 Historique Complet V7</h3>
      <div style={{marginTop:'12px',display:'grid',gap:'8px'}}>{txs.map(t=><div key={t.id} onClick={()=>setShowReceipt(t)} style={{background:'#0f172a',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}><div style={{display:'flex',justifyContent:'space-between'}}><b>{t.type.toUpperCase()} {t.amount}</b><small style={{color:t.status==='ok'?'#22c55e':'#f59e0b'}}>{t.status==='ok'?'✓ Reussi':'⏳ Attente'}</small></div><small style={{color:'#94a3b8'}}>{t.from} • {t.xaf} • {t.mode}</small><br/><small style={{color:'#64748b'}}>{t.date}</small></div>)}</div>
     </div></div>
   )}
   {(tab==='deposit'||tab==='converter'||tab==='profil')&&(
    <div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Accueil</button>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px'}}><h3 style={{color:'#facc15'}}>{tab}</h3><p style={{color:'#94a3b8',fontSize:'13px'}}>Fonction {tab} active - Mode {useGCV?'GCV':'LIVE'}</p><button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{width:'100%',background:'#25D366',padding:'12px',borderRadius:'8px',border:'none',color:'white',fontWeight:'bold'}}>WhatsApp 66 78 75 46</button></div></div>
   )}
   {showReceipt&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'14px'}}>
     <div style={{background:'white',color:'black',padding:'16px',borderRadius:'14px',width:'100%',maxWidth:'340px'}}><h3 style={{margin:'0 0 8px 0'}}>Recu GDB - {showReceipt.type}</h3><div style={{borderTop:'1px dashed #ccc',paddingTop:'8px',fontSize:'13px'}}><div style={{display:'flex',justifyContent:'space-between'}}><span>Montant:</span><b>{showReceipt.amount}</b></div><div style={{display:'flex',justifyContent:'space-between'}}><span>XAF:</span><b>{showReceipt.xaf}</b></div><div style={{display:'flex',justifyContent:'space-between'}}><span>Date:</span><span>{showReceipt.date}</span></div><div style={{display:'flex',justifyContent:'space-between'}}><span>Mode:</span><b>{showReceipt.mode}</b></div></div><div style={{display:'flex',gap:'8px',marginTop:'12px'}}><button onClick={()=>setShowReceipt(null)} style={{flex:1,background:'#0f172a',color:'white',padding:'10px',borderRadius:'8px',border:'none'}}>Fermer</button><button onClick={()=>window.open(`https://wa.me/23566787546?text=Recu ${showReceipt.amount}`,'_blank')} style={{flex:1,background:'#25D366',color:'white',padding:'10px',borderRadius:'8px',border:'none',fontWeight:'bold'}}>WhatsApp</button></div></div>
    </div>
   )}
   {showQR&&(<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'black',zIndex:200,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><div style={{width:'90%',height:'300px',border:'2px solid #facc15',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15'}}>📷 Scanner - Autorise camera</div><button onClick={()=>setShowQR(false)} style={{background:'#facc15',color:'black',padding:'12px 20px',borderRadius:'8px',border:'none',fontWeight:'bold',marginTop:'14px'}}>Fermer</button></div>)}
   <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0f172a',borderTop:'1px solid #334155',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',padding:'6px 0'}}>
    <button onClick={()=>setTab('home')} style={{background:'none',border:'none',color:tab==='home'?'#facc15':'#64748b',padding:'6px'}}><div style={{fontSize:'18px'}}>🏠</div><small style={{fontSize:'9px'}}>Accueil</small></button>
    <button onClick={()=>setTab('converter')} style={{background:'none',border:'none',color:tab==='converter'?'#facc15':'#64748b',padding:'6px'}}><div>💱</div><small style={{fontSize:'9px'}}>Devises</small></button>
    <button onClick={()=>setMenuOpen(true)} style={{background:'#facc15',border:'none',color:'black',padding:'6px',borderRadius:'14px',fontWeight:'bold'}}><div>☰</div><small style={{fontSize:'9px'}}>Menu</small></button>
    <button onClick={()=>setTab('history')} style={{background:'none',border:'none',color:tab==='history'?'#facc15':'#64748b',padding:'6px'}}><div>📜</div><small style={{fontSize:'9px'}}>Historique</small></button>
    <a href="/admin" style={{textAlign:'center',textDecoration:'none',color:'#64748b',padding:'6px'}}><div>🔐</div><small style={{fontSize:'9px'}}>Admin</small></a>
   </div>
  </div>
 )
      }
