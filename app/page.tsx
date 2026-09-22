'use client'
import { useState, useEffect } from 'react'

const LANGS = [
 {c:'fr',n:'Francais',f:'FR'},{c:'en',n:'English',f:'GB'},{c:'ar',n:'Arabic',f:'SA'},{c:'es',n:'Espanol',f:'ES'},{c:'ha',n:'Hausa',f:'NE'},{c:'sw',n:'Swahili',f:'TZ'},{c:'ar_td',n:'Chad Arabic',f:'TD'},
]
const TR = {
 fr:{home:'Accueil',send:'Envoyer',receive:'Recevoir',deposit:'Deposer',converter:'Convertisseur Mondial',trading:'Marches',profil:'Profil',settings:'Parametres',admin:'Panel Admin',support:'Support 24/7',about:'A propos',balance:'Solde Pi',xafAvail:'XAF Disponible',online:'En ligne',actions:'Actions Rapides',seeAll:'Voir toutes les',currencies:'devises',piRef:'Pi reference mondiale',live:'LIVE',search:'Rechercher USD, EUR...',from:'De',to:'Vers',contact:'Contacter sur WhatsApp',agent:'Agent Officiel Tchad',totalBal:'Solde Total',bank:'BANQUE',account:'COMPTE',gcv:'Valeur GCV',exchange:'Valeur Exchange',gcvDesc:'Global Consensus Value 1pi=314159$',exDesc:'Prix marche reel'},
 en:{home:'Home',send:'Send',receive:'Receive',deposit:'Deposit',converter:'World Converter',trading:'Markets',profil:'Profile',settings:'Settings',admin:'Admin Panel',support:'Support 24/7',about:'About',balance:'Pi Balance',xafAvail:'XAF Available',online:'Online',actions:'Quick Actions',seeAll:'See all',currencies:'currencies',piRef:'Pi world reference',live:'LIVE',search:'Search USD, EUR...',from:'From',to:'To',contact:'Contact on WhatsApp',agent:'Official Agent Chad',totalBal:'Total Balance',bank:'BANK',account:'ACCOUNT',gcv:'GCV Value',exchange:'Exchange Value',gcvDesc:'GCV 1pi=314159$',exDesc:'Real market price'},
}
const CURRENCIES = [
 {code:'PI',name:'Pi Network GCV',rate:1,rateMarket:1},
 {code:'XAF',name:'CFA BEAC',rate:180013107,rateMarket:650},
 {code:'USD',name:'US Dollar',rate:314159,rateMarket:1.134},
 {code:'EUR',name:'Euro',rate:290000,rateMarket:0.992},
 {code:'NGN',name:'Naira',rate:450000000,rateMarket:1798},
 {code:'GHS',name:'Ghana Cedi',rate:4900000,rateMarket:18.1},
 {code:'JOD',name:'Jordan Dinar',rate:222000,rateMarket:0.804},
 {code:'JPY',name:'Yen',rate:47000000,rateMarket:178.6},
]
export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false)
 const [lang,setLang]=useState('fr')
 const [showLangs,setShowLangs]=useState(false)
 const [amount,setAmount]=useState(1000000)
 const [from,setFrom]=useState('XAF')
 const [to,setTo]=useState('PI')
 const [liveMarketRate,setLiveMarketRate]=useState(658.47)
 const [trend,setTrend]=useState('+0.34%')
 const [tab,setTab]=useState('home')
 const [searchCurr,setSearchCurr]=useState('')
 const [useGCV,setUseGCV]=useState(true)
 const t:any = (TR as any)[lang] || (TR as any).fr
 const GCV_USD = 314159
 const GCV_XAF = GCV_USD * 573
 useEffect(()=>{const i=setInterval(()=>{const c=(Math.random()-0.45)*1.5;setLiveMarketRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},2000);return()=>clearInterval(i)},[])
 const piBalance = 1250
 const gcvValueUSD = piBalance * GCV_USD
 const gcvValueXAF = piBalance * GCV_XAF
 const marketValueXAF = piBalance * liveMarketRate
 const fromRate = CURRENCIES.find(c=>c.code===from)?.rate||GCV_XAF
 const fromRateMarket = CURRENCIES.find(c=>c.code===from)?.rateMarket||650
 const toRate = CURRENCIES.find(c=>c.code===to)?.rate||1
 const toRateMarket = CURRENCIES.find(c=>c.code===to)?.rateMarket||1
 const activeFromRate = useGCV? fromRate : fromRateMarket
 const activeToRate = useGCV? toRate : toRateMarket
 const result = to==='PI'? (amount/activeFromRate).toFixed(6) : ((amount/activeFromRate)*activeToRate).toFixed(2)
 const filteredCurr = CURRENCIES.filter(c=>c.code.toLowerCase().includes(searchCurr.toLowerCase()))
 const handleLang = (c:string)=>{setLang(c);setShowLangs(false)}
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'90px'}}>
   <div style={{background:'#1e293b',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:30}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
     <button onClick={()=>setMenuOpen(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'10px',padding:'8px 10px',color:'#facc15',fontSize:'18px'}}>☰</button>
     <img src="/logo.png" style={{width:'40px',height:'40px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'12px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#22c55e',fontSize:'9px'}}>WORLD • Agent: 66 78 75 46 • PI {liveMarketRate} {trend}</small></div>
    </div>
    <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'20px',padding:'6px 10px',color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>{LANGS.find(l=>l.c===lang)?.f} {lang.toUpperCase()}</button>
   </div>
   {showLangs&&(<div style={{background:'#1e293b',padding:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',borderBottom:'2px solid #facc15'}}>{LANGS.map(l=><button key={l.c} onClick={()=>handleLang(l.c)} style={{background:lang===l.c?'#facc15':'#0f172a',color:lang===l.c?'black':'white',border:'1px solid #334155',padding:'10px',borderRadius:'10px',fontSize:'12px',fontWeight:'bold'}}>{l.f} {l.n} {lang===l.c?'✓':''}</button>)}</div>)}
   {menuOpen&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.75)',zIndex:100,display:'flex'}}>
     <div style={{width:'88%',maxWidth:'360px',background:'#0f172a',height:'100%',overflowY:'auto',borderRight:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}><b style={{color:'#facc15'}}>GDB MENU</b><button onClick={()=>setMenuOpen(false)} style={{background:'#1e293b',border:'1px solid #334155',padding:'8px 12px',borderRadius:'8px',color:'white'}}>X</button></div>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'12px',borderRadius:'12px',color:'black',marginBottom:'10px'}}><small>{t.totalBal}</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small>GCV: ${gcvValueUSD.toLocaleString()} • {gcvValueXAF.toLocaleString()} XAF</small><br/><small>Exchange: {marketValueXAF.toLocaleString()} XAF {trend}</small></div>
      <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}><button onClick={()=>setUseGCV(true)} style={{flex:1,background:useGCV?'#facc15':'#1e293b',color:useGCV?'black':'white',border:'1px solid #facc15',padding:'8px',borderRadius:'8px',fontWeight:'bold',fontSize:'11px'}}>GCV 314,159$</button><button onClick={()=>setUseGCV(false)} style={{flex:1,background:!useGCV?'#22c55e':'#1e293b',color:!useGCV?'black':'white',border:'1px solid #334155',padding:'8px',borderRadius:'8px',fontWeight:'bold',fontSize:'11px'}}>EXCHANGE LIVE</button></div>
      <small style={{color:'#facc15',fontWeight:'bold'}}>{t.bank}</small>
      <div style={{display:'grid',gap:'6px',marginTop:'6px',marginBottom:'12px'}}>
       <button onClick={()=>{setTab('home');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>🏠 {t.home}</button>
       <button onClick={()=>{setTab('converter');setMenuOpen(false)}} style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>💱 {t.converter} - LIVE {trend}</button>
       <button onClick={()=>{setTab('send');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📤 {t.send}</button>
       <button onClick={()=>{setTab('receive');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📥 {t.receive}</button>
       <button onClick={()=>{setTab('deposit');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>💰 {t.deposit}</button>
       <button onClick={()=>{setTab('trading');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>📊 {t.trading}</button>
      </div>
      <small style={{color:'#facc15',fontWeight:'bold'}}>{t.account}</small>
      <div style={{display:'grid',gap:'6px',marginTop:'6px'}}>
       <button onClick={()=>{setTab('profil');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>👤 {t.profil}</button>
       <button onClick={()=>{setTab('settings');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'10px',color:'white',textAlign:'left'}}>⚙️ {t.settings}</button>
       <button onClick={()=>{setShowLangs(true);setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'#facc15',textAlign:'left'}}>🌍 Langues - {LANGS.length} langues</button>
       <a href="/admin" style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'10px',color:'white',textDecoration:'none'}}>🔐 {t.admin}</a>
       <button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{background:'#25D366',border:'none',padding:'12px',borderRadius:'10px',color:'white',fontWeight:'bold'}}>💬 {t.support}</button>
      </div>
     </div>
     <div style={{flex:1}} onClick={()=>setMenuOpen(false)}></div>
    </div>
   )}
   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'14px',borderRadius:'14px',color:'black'}}><small>{t.balance} - GCV</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small style={{fontWeight:'bold'}}>${gcvValueUSD.toLocaleString()}</small><br/><small>{gcvValueXAF.toLocaleString()} XAF</small><br/><small style={{background:'black',color:'#facc15',padding:'2px 6px',borderRadius:'6px',fontSize:'10px'}}>GCV 314,159$</small></div>
      <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'1px solid #22c55e'}}><small style={{color:'#94a3b8'}}>{t.xafAvail} - Exchange</small><h2 style={{margin:'4px 0'}}>{marketValueXAF.toLocaleString()}</h2><small style={{color:'#22c55e'}}>● {t.online} • {trend} LIVE</small></div>
     </div>
     <div style={{background:'#0f172a',padding:'10px',borderRadius:'10px',marginTop:'10px',border:'1px solid #334155',display:'flex',justifyContent:'space-between'}}><div><small style={{color:'#94a3b8'}}>{t.gcv}</small><br/><b style={{color:'#facc15',fontSize:'11px'}}>1π = $314,159 = {GCV_XAF.toLocaleString()} XAF</b></div><div style={{textAlign:'right'}}><small style={{color:'#94a3b8'}}>{t.exchange}</small><br/><b style={{color:'#22c55e',fontSize:'11px'}}>1π = {liveMarketRate} XAF {trend}</b></div></div>
     <div style={{marginTop:'12px'}}><b style={{color:'#facc15',fontSize:'12px'}}>{t.actions}</b><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px',marginTop:'6px'}}><button onClick={()=>setTab('send')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'12px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📤</div><small style={{fontSize:'10px'}}>{t.send}</small></button><button onClick={()=>setTab('receive')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'12px 4px',color:'white'}}><div style={{fontSize:'20px'}}>📥</div><small style={{fontSize:'10px'}}>{t.receive}</small></button><button onClick={()=>setTab('deposit')} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',padding:'12px 4px',color:'white'}}><div style={{fontSize:'20px'}}>💰</div><small style={{fontSize:'10px'}}>{t.deposit}</small></button><button onClick={()=>setTab('converter')} style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:'12px',padding:'12px 4px',color:'white'}}><div style={{fontSize:'20px'}}>💱</div><small style={{fontSize:'10px'}}>Convert</small></button></div></div>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',marginTop:'12px',border:'2px solid #facc15'}}><div style={{display:'flex',justifyContent:'space-between'}}><h4 style={{color:'#facc15',margin:0,fontSize:'12px'}}>{t.converter} • 1 π = {useGCV? GCV_XAF.toLocaleString() : liveMarketRate} XAF</h4><button onClick={()=>setUseGCV(!useGCV)} style={{background:useGCV?'#facc15':'#22c55e',color:'black',border:'none',padding:'4px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:'bold'}}>{useGCV?'GCV':'LIVE'}</button></div><div style={{display:'flex',gap:'6px',marginTop:'10px'}}><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{flex:1,padding:'12px',borderRadius:'10px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px',borderRadius:'10px',background:'#0f172a',color:'white'}}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div><div style={{textAlign:'center',marginTop:'10px'}}><h2 style={{color:'#facc15',margin:0}}>{result} {to}</h2><small style={{color:'#94a3b8'}}>{CURRENCIES.length} devises • Pi {t.piRef} • {trend}</small></div></div>
    </div>
   )}
   {tab!=='home'&&(<div style={{padding:'12px'}}><button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← {t.home}</button><div style={{background:'#1e293b',padding:'16px',borderRadius:'14px'}}><h3 style={{color:'#facc15'}}>{tab}</h3><p style={{color:'#94a3b8',fontSize:'13px'}}>Fonctionnalite {tab} activee - {useGCV?'Mode GCV 314159$':'Mode Exchange LIVE '+liveMarketRate} - Langue: {lang}</p><button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{width:'100%',background:'#25D366',padding:'12px',borderRadius:'8px',border:'none',color:'white',fontWeight:'bold',marginTop:'10px'}}>WhatsApp 66 78 75 46</button></div></div>)}
   <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#1e293b',borderTop:'2px solid #facc15',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',padding:'6px 0'}}><button onClick={()=>setTab('home')} style={{background:'none',border:'none',color:tab==='home'?'#facc15':'#94a3b8',padding:'6px'}}><div style={{fontSize:'18px'}}>🏠</div><small style={{fontSize:'9px'}}>{t.home}</small></button><button onClick={()=>setTab('converter')} style={{background:'none',border:'none',color:'#facc15',padding:'6px'}}><div>💱</div><small style={{fontSize:'9px'}}>Devises</small></button><button onClick={()=>setMenuOpen(true)} style={{background:'#facc15',border:'none',color:'black',padding:'6px',borderRadius:'12px',fontWeight:'bold'}}><div>☰</div><small style={{fontSize:'9px'}}>Menu</small></button><button onClick={()=>setTab('profil')} style={{background:'none',border:'none',color:'#94a3b8',padding:'6px'}}><div>👤</div><small style={{fontSize:'9px'}}>{t.profil}</small></button><a href="/admin" style={{textAlign:'center',textDecoration:'none',color:'#94a3b8',padding:'6px'}}><div>🔐</div><small style={{fontSize:'9px'}}>{t.admin}</small></a></div>
  </div>
 )
  }
