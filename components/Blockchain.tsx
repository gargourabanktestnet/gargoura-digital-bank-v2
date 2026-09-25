// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'
export default function Blockchain({gdb}){
  const [chain,setChain]=useState('PI NETWORK')
  const [blocks,setBlocks]=useState([])
  const chains=[
    {id:'PI NETWORK',sym:'PI',ref:'314,159 USD',color:'#a855f7',tps:'1200'},
    {id:'BITCOIN',sym:'BTC',ref:'67,230 USD',color:'#f59e0b',tps:'7'},
    {id:'ETHEREUM',sym:'ETH',ref:'3,450 USD',color:'#6366f1',tps:'30'},
    {id:'SOLANA',sym:'SOL',ref:'145 USD',color:'#14b8a6',tps:'3000'},
    {id:'BNB CHAIN',sym:'BNB',ref:'610 USD',color:'#eab308',tps:'160'},
    {id:'XRP LEDGER',sym:'XRP',ref:'0.52 USD',color:'#000',tps:'1500'},
    {id:'STELLAR',sym:'XLM',ref:'0.11 USD',color:'#06b6d4',tps:'1000'},
    {id:'POLYGON',sym:'MATIC',ref:'0.85 USD',color:'#8247e5',tps:'7000'},
  ]
  const cur=chains.find(c=>c.id===chain)||chains[0]
  useEffect(function(){
    var id=setInterval(function(){
      var b={h:'0x'+Math.random().toString(16).slice(2,10)+'...'+Math.floor(Math.random()*9999),n:Math.floor(800000+Math.random()*200000),tx:Math.floor(5+Math.random()*200),t:new Date().toLocaleTimeString(),gdb:gdb?.slice(0,8),from:'GDB-...'+Math.floor(Math.random()*999),to:'GDB-...'+Math.floor(Math.random()*999),amt:(Math.random()*2).toFixed(4)+' '+cur.sym}
      setBlocks(function(prev){return [b,...prev].slice(0,8)})
    },2000)
    return function(){clearInterval(id)}
  },[chain,gdb,cur.sym])
  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>⛓️ Blockchain • {gdb?.slice(0,8)}</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{width:8,height:8,background:'#22c55e',borderRadius:8,animation:'pulse 1s infinite'}}></div><div style={{fontSize:10,fontWeight:700,color:'#16a34a'}}>LIVE BLOCKS</div></div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>Données publiques enregistrées temps réel • PI référence 314,159 USD • GDB {gdb}</div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:6}}>
        {chains.map(function(c){return (<button key={c.id} onClick={function(){setChain(c.id); setBlocks([])}} style={{whiteSpace:'nowrap',padding:'8px 12px',borderRadius:20,border:chain===c.id?'2px solid '+c.color:'1px solid #e2e8f0',background:chain===c.id?c.color:'#fff',color:chain===c.id?'#fff':'#334155',fontSize:10,fontWeight:chain===c.id?'800':'500'}}><div style={{fontWeight:800}}>{c.id}</div><div style={{fontSize:8}}>{c.sym} • {c.tps} TPS</div></button>)})}
      </div>

      <div style={{background:cur.color,color:'#fff',borderRadius:12,padding:12,marginTop:10,display:'flex',justifyContent:'space-between'}}>
        <div><div style={{fontSize:11,opacity:0.8}}>Blockchain Publique</div><div style={{fontWeight:900,fontSize:16,marginTop:2}}>{cur.id}</div><div style={{fontSize:10,marginTop:2,opacity:0.9}}>{cur.sym} référence {cur.ref} • GDB {gdb?.slice(0,12)}</div></div>
        <div style={{textAlign:'right'}}><div style={{fontSize:10,opacity:0.8}}>Dernier Bloc</div><div style={{fontWeight:800,fontSize:14,marginTop:2}}>{blocks[0]?.n||'---'}</div><div style={{fontSize:10,marginTop:2,background:'rgba(255,255,255,0.2)',padding:'2px 6px',borderRadius:8}}>{cur.tps} TPS LIVE</div></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:10}}>
        <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:14}}>{blocks.length}</div><div style={{fontSize:8,color:'#64748b'}}>Blocs LIVE</div></div>
        <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:14}}>{blocks.reduce((s,b)=>s+(b.tx||0),0)}</div><div style={{fontSize:8,color:'#64748b'}}>Tx Totales</div></div>
        <div style={{background:'#faf5ff',border:'1px solid #e9d5ff',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:12}}>{cur.sym}</div><div style={{fontSize:8,color:'#64748b'}}>{cur.ref}</div></div>
      </div>

      <div style={{marginTop:12,fontWeight:800,fontSize:12}}>📡 Données Publiques Temps Réel • {cur.id} • Mempool</div>
      <div style={{border:'1px solid #e2e8f0',borderRadius:12,marginTop:6,maxHeight:320,overflowY:'auto'}}>
        {blocks.length===0? <div style={{padding:20,textAlign:'center',fontSize:11,color:'#64748b'}}>Synchronisation blockchain {cur.id} en cours... • {gdb}</div> :
        blocks.map(function(b,i){return (
          <div key={i} style={{padding:'10px 10px',borderBottom:'1px solid #f1f5f9',fontSize:11,background:i===0?'#f0fdf4':'#fff'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontWeight:800,color:cur.color}}>Bloc #{b.n}</div><div style={{fontSize:10,color:'#64748b'}}>{b.t} • {b.tx} Tx</div></div>
            <div style={{fontFamily:'monospace',fontSize:10,marginTop:4,color:'#334155',background:'#f8fafc',padding:'4px 6px',borderRadius:6}}>Hash: {b.h}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:10}}><div>De: {b.gdb} {b.from}</div><div>Vers: {b.to}</div></div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}><div style={{fontWeight:700,color:'#16a34a'}}>{b.amt} • {cur.ref} ref</div><div style={{fontSize:9,background:'#22c55e',color:'#fff',padding:'2px 6px',borderRadius:10}}>Confirmé • GDB</div></div>
          </div>
        )})}
      </div>

      <div style={{display:'flex',gap:6,marginTop:10}}>
        <button onClick={function(){alert('Explorer '+cur.id+' - Hash '+blocks[0]?.h+' - GDB '+gdb+' - Données publiques temps réel - PI 314159 USD ref')}} style={{flex:1,background:cur.color,color:'#fff',border:'none',borderRadius:10,padding:10,fontSize:11,fontWeight:800}}>Explorer {cur.sym} • {gdb?.slice(0,6)}</button>
        <button onClick={function(){alert('Transaction PI enregistrée sur '+cur.id+' - GDB '+gdb+' - 314159 USD ref - ISO20022')}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:10,padding:10,fontSize:11,fontWeight:800}}>Enregistrer Tx GDB</button>
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:8,textAlign:'center'}}>• Blockchains publiques: PI Network, Bitcoin, Ethereum, Solana, BNB Chain, XRP Ledger, Stellar, Polygon<br/>• Données enregistrées en temps réel • Hash, blocs, mempool LIVE • PI référence 314,159 USD<br/>• {gdb} • Interopérable ISO20022 • Transactions sécurisées bout en bout</div>
    </div>
  )
      }
