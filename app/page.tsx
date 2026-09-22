'use client'
import { useState, useEffect } from 'react'

const LANGS = [
 {c:'fr',n:'Francais',f:'FR'},{c:'en',n:'English',f:'GB'},{c:'ar',n:'Arabic',f:'SA'},{c:'es',n:'Espanol',f:'ES'},{c:'zh',n:'Chinese',f:'CN'},{c:'pt',n:'Portugues',f:'PT'},{c:'sw',n:'Swahili',f:'TZ'},{c:'ha',n:'Hausa',f:'NE'},{c:'de',n:'German',f:'DE'},{c:'tr',n:'Turkish',f:'TR'},
]

const CURRENCIES = [
 {code:'PI',name:'Pi Network',rate:1},{code:'XAF',name:'CFA BEAC',rate:650},{code:'XOF',name:'CFA BCEAO',rate:650},{code:'USD',name:'US Dollar',rate:1.134},{code:'EUR',name:'Euro',rate:0.992},{code:'GBP',name:'Pound',rate:0.852},{code:'JOD',name:'Jordan Dinar',rate:0.804},{code:'AED',name:'UAE Dirham',rate:4.167},{code:'SAR',name:'Saudi Riyal',rate:4.255},{code:'JPY',name:'Yen',rate:178.6},{code:'CNY',name:'Yuan',rate:8.18},{code:'NGN',name:'Naira',rate:1798},{code:'GHS',name:'Ghana Cedi',rate:18.1},{code:'KES',name:'Kenya Shilling',rate:147.3},{code:'ZAR',name:'Rand',rate:20.1},{code:'EGP',name:'Egypt Pound',rate:56.8},{code:'MAD',name:'Morocco Dirham',rate:11.2},{code:'CAD',name:'Canadian Dollar',rate:1.55},{code:'AUD',name:'Australian Dollar',rate:1.64},{code:'BRL',name:'Brazil Real',rate:6.21},{code:'ETB',name:'Ethiopia Birr',rate:143.2},{code:'RWF',name:'Rwanda Franc',rate:1689},{code:'BIF',name:'Burundi Franc',rate:3245},{code:'CDF',name:'Congo Franc',rate:3150},{code:'UGX',name:'Uganda Shilling',rate:4178},{code:'TZS',name:'Tanzania Shilling',rate:3025},{code:'ZMW',name:'Zambia Kwacha',rate:28.7},{code:'AOA',name:'Angola Kwanza',rate:1020},{code:'SDG',name:'Sudan Pound',rate:680},{code:'QAR',name:'Qatar Riyal',rate:4.13},{code:'KWD',name:'Kuwait Dinar',rate:0.347},
]

export default function Home(){
 const [menuOpen,setMenuOpen]=useState(false)
 const [lang,setLang]=useState('fr')
 const [amount,setAmount]=useState(1000000)
 const [from,setFrom]=useState('XAF')
 const [to,setTo]=useState('PI')
 const [liveRate,setLiveRate]=useState(650)
 const [trend,setTrend]=useState('+0.84%')
 const [tab,setTab]=useState('home')
 const [searchCurr,setSearchCurr]=useState('')
 useEffect(()=>{const i=setInterval(()=>{const c=(Math.random()-0.45)*1.8;setLiveRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},2500);return()=>clearInterval(i)},[])
 const fromRate=CURRENCIES.find(c=>c.code===from)?.rate||650
 const toRate=CURRENCIES.find(c=>c.code===to)?.rate||1
 const result=to==='PI'?(amount/fromRate).toFixed(4):((amount/fromRate)*toRate).toFixed(4)
 const filteredCurr=CURRENCIES.filter(c=>c.code.toLowerCase().includes(searchCurr.toLowerCase()))

 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'85px'}}>
   <div style={{background:'#1e293b',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:30}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
     <button onClick={()=>setMenuOpen(true)} style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'10px',padding:'8px 10px',color:'#facc15',fontSize:'18px',fontWeight:'bold'}}>☰</button>
     <img src="/logo.png" style={{width:'40px',height:'40px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'13px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#22c55e',fontSize:'10px'}}>WORLD • Agent: 66 78 75 46 • PI {liveRate} {trend}</small></div>
    </div>
    <button style={{background:'#0f172a',border:'1px solid #facc15',borderRadius:'20px',padding:'6px 10px',color:'#facc15',fontWeight:'bold',fontSize:'11px'}}>FR</button>
   </div>

   {menuOpen&&(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:100,display:'flex'}}>
     <div style={{width:'85%',maxWidth:'340px',background:'#0f172a',height:'100%',overflowY:'auto',borderRight:'2px solid #facc15',padding:'14px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
       <b style={{color:'#facc15'}}>GDB MENU PRINCIPAL</b><button onClick={()=>setMenuOpen(false)} style={{background:'#1e293b',border:'1px solid #334155',borderRadius:'8px',padding:'8px 12px',color:'white'}}>X</button>
      </div>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'12px',borderRadius:'12px',color:'black',marginBottom:'12px'}}><small>Solde Total</small><h2 style={{margin:'2px 0'}}>1,250 π</h2><small>{(1250*liveRate).toLocaleString()} XAF • {trend} LIVE</small></div>
      <div style={{display:'grid',gap:'8px'}}>
       <button onClick={()=>{setTab('home');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>🏠 Accueil - Dashboard rapide</button>
       <button onClick={()=>{setTab('converter');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #facc15',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>💱 Convertisseur Mondial - {CURRENCIES.length} devises LIVE</button>
       <button onClick={()=>{setTab('send');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>📤 Envoyer Pi → Mobile Money</button>
       <button onClick={()=>{setTab('receive');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>📥 Recevoir Pi - QR Code</button>
       <button onClick={()=>{setTab('deposit');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>💰 Deposer XAF → Acheter Pi</button>
       <button onClick={()=>{setTab('profil');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>👤 Profil - Gargoura Bank N'Djamena</button>
       <button onClick={()=>{setTab('settings');setMenuOpen(false)}} style={{background:'#0f172a',border:'1px solid #334155',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left'}}>⚙️ Parametres - Langues & Securite</button>
       <a href="/admin" style={{background:'#1e293b',border:'1px solid #facc15',padding:'12px',borderRadius:'12px',color:'white',textAlign:'left',textDecoration:'none'}}>🔐 Panel Admin - Agent 66 78 75 46</a>
       <a href="https://wa.me/23566787546" style={{background:'#25D366',padding:'12px',borderRadius:'12px',color:'white',textAlign:'center',textDecoration:'none',fontWeight:'bold'}}>💬 Support 24/7 WhatsApp</a>
      </div>
     </div>
     <div style={{flex:1}} onClick={()=>setMenuOpen(false)}></div>
    </div>
   )}

   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'14px',borderRadius:'14px',color:'black'}}><small>Solde Pi</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small>≈ {(1250*liveRate).toLocaleString()} XAF</small><br/><small style={{background:'black',color:'#facc15',padding:'2px 6px',borderRadius:'6px'}}>{trend} LIVE</small></div>
      <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'1px solid #334155'}}><small style={{color:'#94a3b8'}}>XAF Disponible</small><h2 style={{margin:'4px 0'}}>{(1250*liveRate).toLocaleString()}</h2><small style={{color:'#22c55e'}}>● En ligne</small></div>
     </div>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',marginTop:'14px',border:'2px solid #facc15'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><h4 style={{color:'#facc15',margin:0}}>Convertisseur • 1 π = {liveRate} XAF</h4><small style={{color:'#22c55e',fontWeight:'bold'}}>{trend}</small></div>
      <div style={{display:'flex',gap:'6px',marginTop:'10px'}}><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{flex:1,padding:'12px',borderRadius:'10px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px',borderRadius:'10px',background:'#0f172a',color:'white',border:'1px solid #334155'}}>{CURRENCIES.slice(0,10).map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div>
      <div style={{textAlign:'center',marginTop:'10px'}}><h2 style={{color:'#facc15',margin:0}}>{result} {to}</h2><small style={{color:'#94a3b8'}}>{CURRENCIES.length} devises • Pi reference mondiale • LIVE</small></div>
      <button onClick={()=>setTab('converter')} style={{width:'100%',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',padding:'10px',borderRadius:'8px',marginTop:'10px',fontWeight:'bold'}}>Voir toutes les {CURRENCIES.length} devises →</button>
     </div>
    </div>
   )}

   {tab==='converter'&&(
    <div style={{padding:'12px'}}>
     <button onClick={()=>setTab('home')} style={{background:'#0f172a',border:'1px solid #334155',color:'white',padding:'8px 12px',borderRadius:'8px',marginBottom:'10px'}}>← Retour</button>
     <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'2px solid #facc15'}}>
      <h3 style={{color:'#facc15',margin:'0 0 10px 0'}}>💱 Convertisseur Mondial • Pi Reference • {CURRENCIES.length} Devises • LIVE {trend}</h3>
      <input type="text" placeholder="Rechercher USD, EUR, NGN..." value={searchCurr} onChange={e=>setSearchCurr(e.target.value)} style={{width:'100%',padding:'10px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',marginBottom:'10px'}}/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 40px 1fr',gap:'8px'}}><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px',borderRadius:'8px',background:'#0f172a',color:'white'}}>{filteredCurr.map(c=><option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}</select><div style={{textAlign:'center',fontSize:'22px',color:'#facc15'}}>⇄</div><select value={to} onChange={e=>setTo(e.target.value)} style={{padding:'12px',borderRadius:'8px',background:'#0f172a',color:'white'}}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}</select></div>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{width:'100%',padding:'14px',borderRadius:'10px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',fontWeight:'bold',fontSize:'18px',marginTop:'10px'}}/>
      <div style={{background:'#0f172a',padding:'14px',borderRadius:'10px',marginTop:'12px',textAlign:'center'}}><h1 style={{color:'#facc15',margin:0}}>{result} {to}</h1><small>1 {from} = {(toRate/fromRate).toFixed(6)} {to} • LIVE {trend}</small></div>
      <button onClick={()=>window.open(`https://wa.me/23566787546?text=Salam GDB ${amount} ${from} to ${to}`,'_blank')} style={{width:'100%',background:'#25D366',color:'white',padding:'14px',borderRadius:'10px',border:'none',fontWeight:'bold',marginTop:'12px'}}>WhatsApp 66 78 75 46</button>
     </div>
    </div>
   )}

   <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#1e293b',borderTop:'2px solid #facc15',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',padding:'6px 0'}}>
    <button onClick={()=>setTab('home')} style={{background:'none',border:'none',color:tab==='home'?'#facc15':'#94a3b8',padding:'6px'}}><div>🏠</div><small style={{fontSize:'9px'}}>Accueil</small></button>
    <button onClick={()=>setTab('converter')} style={{background:'none',border:'none',color:'#facc15',padding:'6px'}}><div>💱</div><small style={{fontSize:'9px'}}>Devises</small></button>
    <button onClick={()=>setMenuOpen(true)} style={{background:'#facc15',border:'none',color:'black',padding:'6px',borderRadius:'10px',fontWeight:'bold'}}><div>☰</div><small style={{fontSize:'9px'}}>Menu</small></button>
    <button onClick={()=>setTab('profil')} style={{background:'none',border:'none',color:'#94a3b8',padding:'6px'}}><div>👤</div><small style={{fontSize:'9px'}}>Profil</small></button>
    <a href="/admin" style={{textAlign:'center',textDecoration:'none',color:'#94a3b8',padding:'6px'}}><div>🔐</div><small style={{fontSize:'9px'}}>Admin</small></a>
   </div>
  </div>
 )
  }
