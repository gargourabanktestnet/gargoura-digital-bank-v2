'use client'
import { useState, useEffect } from 'react'

const ALL_LANGS = [
 {c:'fr',n:'Francais',f:'FR'},{c:'en',n:'English',f:'GB'},{c:'ar',n:'Arabic',f:'SA'},{c:'es',n:'Espanol',f:'ES'},{c:'zh',n:'Chinese',f:'CN'},{c:'pt',n:'Portugues',f:'PT'},{c:'sw',n:'Kiswahili',f:'TZ'},{c:'ha',n:'Hausa',f:'NE'},{c:'de',n:'Deutsch',f:'DE'},{c:'it',n:'Italiano',f:'IT'},
 {c:'tr',n:'Turkce',f:'TR'},{c:'ru',n:'Russian',f:'RU'},{c:'hi',n:'Hindi',f:'IN'},{c:'ja',n:'Japanese',f:'JP'},{c:'ko',n:'Korean',f:'KR'},{c:'nl',n:'Dutch',f:'NL'},{c:'pl',n:'Polish',f:'PL'},{c:'id',n:'Indonesia',f:'ID'},
 {c:'am',n:'Amharic',f:'ET'},{c:'yo',n:'Yoruba',f:'NG'},{c:'wo',n:'Wolof',f:'SN'},{c:'ar_td',n:'Arabe Tchadien',f:'TD'},{c:'sango',n:'Sango',f:'CF'},
]

const WORLD_CURRENCIES = [
 {code:'PI',rate:1},{code:'XAF',rate:650},{code:'XOF',rate:650},{code:'USD',rate:1.134},{code:'EUR',rate:0.992},{code:'GBP',rate:0.852},{code:'JOD',rate:0.804},{code:'AED',rate:4.167},{code:'JPY',rate:178.6},{code:'CNY',rate:8.18},{code:'NGN',rate:1798},{code:'GHS',rate:18.1},{code:'KES',rate:147.3},
]

export default function WorldBank(){
 const [lang,setLang]=useState('fr')
 const [showLangs,setShowLangs]=useState(false)
 const [fromCurr,setFromCurr]=useState('XAF')
 const [toCurr,setToCurr]=useState('PI')
 const [amount,setAmount]=useState(1000000)
 const [liveRate,setLiveRate]=useState(650)
 const [trend,setTrend]=useState('+0.45%')
 const [tab,setTab]=useState('home')
 useEffect(()=>{const i=setInterval(()=>{const c=(Math.random()-0.48)*2;setLiveRate(r=>+(r+c).toFixed(2));setTrend((c>0?'+':'')+c.toFixed(2)+'%')},3000);return()=>clearInterval(i)},[])
 const fromRate=WORLD_CURRENCIES.find(c=>c.code===fromCurr)?.rate||650
 const toRate=WORLD_CURRENCIES.find(c=>c.code===toCurr)?.rate||1
 const result=toCurr==='PI'? (amount/fromRate).toFixed(4) : ((amount/fromRate)*toRate).toFixed(2)
 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'85px'}}>
   <div style={{background:'#1e293b',padding:'10px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}><img src="/logo.png" style={{width:'38px',height:'38px',borderRadius:'50%',border:'2px solid #facc15'}}/><b style={{color:'#facc15',fontSize:'12px'}}>GARGOURA WORLD BANK<br/><small style={{color:'#22c55e',fontSize:'9px'}}>LIVE Pi={liveRate} XAF {trend}</small></b></div>
    <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#facc15',color:'black',border:'none',borderRadius:'20px',padding:'6px 10px',fontWeight:'bold'}}>{lang.toUpperCase()}</button>
   </div>
   {showLangs&&<div style={{background:'#1e293b',maxHeight:'250px',overflowY:'auto',padding:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5px'}}>{ALL_LANGS.map(l=><button key={l.c} onClick={()=>{setLang(l.c);setShowLangs(false)}} style={{background:lang===l.c?'#facc15':'#0f172a',color:lang===l.c?'black':'white',border:'1px solid #334155',padding:'8px',borderRadius:'8px',fontSize:'11px'}}>{l.f} {l.n}</button>)}</div>}
   <div style={{padding:'12px'}}>
    <div style={{background:'#1e293b',padding:'14px',borderRadius:'14px',border:'2px solid #facc15'}}>
     <h4 style={{color:'#facc15',margin:'0 0 10px 0'}}>CONVERTISSEUR MONDIAL - Pi Reference {trend}</h4>
     <div style={{display:'grid',gridTemplateColumns:'1fr 40px 1fr',gap:'6px'}}><select value={fromCurr} onChange={e=>setFromCurr(e.target.value)} style={{padding:'10px',borderRadius:'8px',background:'#0f172a',color:'white',border:'1px solid #334155'}}>{WORLD_CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select><div style={{textAlign:'center',fontSize:'20px'}}>=</div><select value={toCurr} onChange={e=>setToCurr(e.target.value)} style={{padding:'10px',borderRadius:'8px',background:'#0f172a',color:'white',border:'1px solid #334155'}}>{WORLD_CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select></div>
     <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{width:'100%',marginTop:'10px',padding:'12px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15',fontWeight:'bold'}}/>
     <div style={{background:'#0f172a',padding:'12px',borderRadius:'10px',marginTop:'10px',textAlign:'center'}}><h2 style={{color:'#facc15',margin:0}}>{result} {toCurr}</h2><small>1 {fromCurr} = {(toRate/fromRate).toFixed(6)} {toCurr} • LIVE {trend}</small></div>
    </div>
   </div>
   <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#1e293b',borderTop:'2px solid #facc15',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',padding:'6px 0'}}><button onClick={()=>setTab('home')} style={{background:'none',border:'none',color:'#facc15'}}>HOME</button><button onClick={()=>window.open('https://wa.me/23566787546','_blank')} style={{background:'none',border:'none',color:'#94a3b8'}}>SEND</button><a href="/admin" style={{textAlign:'center',textDecoration:'none',color:'#94a3b8'}}>ADMIN</a><a href="/history" style={{textAlign:'center',textDecoration:'none',color:'#94a3b8'}}>MARKETS</a></div>
  </div>
 )
}
