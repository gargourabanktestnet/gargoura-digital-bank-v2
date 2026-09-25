// @ts-nocheck
'use client'
import {useState} from 'react'
export default function Portefeuilles({gdb}){
  const [active,setActive]=useState('PI')
  const wallets=[
    {sym:'PI',name:'PiCoin',bal:12.543,ref:314159,color:'#a855f7',chain:'PI NETWORK',addr:gdb},
    {sym:'BTC',name:'Bitcoin',bal:0.042,ref:67230,color:'#f59e0b',chain:'BITCOIN',addr:'bc1q...'+gdb?.slice(-6)},
    {sym:'ETH',name:'Ethereum',bal:1.24,ref:3450,color:'#6366f1',chain:'ETHEREUM',addr:'0x...'+gdb?.slice(-6)},
    {sym:'USDT',name:'Tether',bal:2450.5,ref:1,color:'#22c55e',chain:'TRON/BSC/ETH',addr:'T...'+gdb?.slice(-6)},
    {sym:'USDC',name:'USDC',bal:1800,ref:1,color:'#2563eb',chain:'ETH/SOL',addr:'4k...'+gdb?.slice(-6)},
    {sym:'SOL',name:'Solana',bal:15.2,ref:145,color:'#14b8a6',chain:'SOLANA',addr:'So...'+gdb?.slice(-6)},
    {sym:'XAF',name:'Franc CEMAC',bal:1570000,ref:0.0016,color:'#16a34a',chain:'BEAC/Afriland',addr:'CEMAC-'+gdb?.slice(-6)},
    {sym:'XOF',name:'Franc UEMOA',bal:2100000,ref:0.0016,color:'#16a34a',chain:'BCEAO/BOA',addr:'UEMOA-'+gdb?.slice(-6)},
  ]
  var cur=wallets.find(w=>w.sym===active)||wallets[0]
  var totalUsd=wallets.reduce((s,w)=>s+(w.bal*w.ref),0)
  var totalPi=totalUsd/314159
  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>Portefeuilles • {gdb?.slice(0,8)}</div>
        <div style={{fontSize:10,background:'#16a34a',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>8 WALLETS</div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>Multi-chaînes • PI référence 314,159 USD • GDB unique {gdb}</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:12,marginTop:10}}>
        <div style={{fontSize:11,color:'#93c5fd'}}>Patrimoine Total • GDB {gdb?.slice(0,12)}</div>
        <div style={{fontWeight:900,fontSize:20,marginTop:4}}>{totalPi.toFixed(4)} PI</div>
        <div style={{fontSize:12,color:'#86efac',marginTop:2}}>${totalUsd.toFixed(2)} USD ref • 1 PI = 314,159 USD</div>
        <div style={{display:'flex',gap:6,marginTop:10}}>
          <button onClick={()=>alert('Envoyer depuis '+gdb+' - Total '+totalPi.toFixed(4)+' PI')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:10,padding:8,fontSize:11,fontWeight:800}}>Envoyer</button>
          <button onClick={()=>alert('Recevoir sur '+gdb+' - QR '+cur.addr)} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:10,padding:8,fontSize:11,fontWeight:800}}>Recevoir</button>
        </div>
      </div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:6}}>
        {wallets.map(function(w){return (<button key={w.sym} onClick={()=>setActive(w.sym)} style={{whiteSpace:'nowrap',padding:'8px 12px',borderRadius:20,border:active===w.sym?'2px solid '+w.color:'1px solid #e2e8f0',background:active===w.sym?w.color:'#fff',color:active===w.sym?'#fff':'#334155',fontSize:11,fontWeight:active===w.sym?'800':'500'}}>{w.sym} {w.bal}</button>)})}
      </div>

      <div style={{border:'2px solid '+cur.color,borderRadius:16,padding:12,marginTop:10,background:'#fafaf9'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:40,height:40,background:cur.color,color:'#fff',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>{cur.sym[0]}</div><div><div style={{fontWeight:900,fontSize:14}}>{cur.name} • {cur.sym}</div><div style={{fontSize:10,color:'#64748b'}}>{cur.chain} • {gdb?.slice(0,12)}</div></div></div>
          <div style={{textAlign:'right'}}><div style={{fontWeight:900,fontSize:16}}>{cur.bal} {cur.sym}</div><div style={{fontSize:11,color:'#16a34a'}}>${(cur.bal*cur.ref).toFixed(2)} USD</div><div style={{fontSize:9,color:'#64748b'}}>{(cur.bal*cur.ref/314159).toFixed(6)} PI ref</div></div>
        </div>
        <div style={{marginTop:10,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:8}}>
          <div style={{fontSize:10,color:'#64748b',fontWeight:700}}>Adresse {cur.sym} • GDB</div>
          <div style={{fontFamily:'monospace',fontSize:11,marginTop:4,wordBreak:'break-all',background:'#f8fafc',padding:6,borderRadius:6}}>{cur.addr}</div>
          <div style={{display:'flex',gap:6,marginTop:8}}>
            <button onClick={()=>{navigator.clipboard?.writeText(cur.addr); alert('Adresse '+cur.sym+' copiée: '+cur.addr)}} style={{flex:1,background:'#f1f5f9',border:'1px solid #e2e8f0',borderRadius:8,padding:6,fontSize:10,fontWeight:700}}>📋 Copier</button>
            <button onClick={()=>alert('QR '+cur.sym+' '+cur.addr+' pour '+gdb+' - PI ref 314159 USD')} style={{flex:1,background:cur.color,color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:10,fontWeight:700}}>QR Code</button>
            <button onClick={()=>alert('Explorer '+cur.chain+' - '+cur.addr+' - GDB '+gdb)} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:10,fontWeight:700}}>Explorer</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:10}}>
          <div style={{background:'#f0fdf4',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:12}}>{cur.bal}</div><div style={{fontSize:8}}>Solde {cur.sym}</div></div>
          <div style={{background:'#eff6ff',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:11}}>${cur.ref}</div><div style={{fontSize:8}}>Ref USD</div></div>
          <div style={{background:'#faf5ff',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:11}}>{(cur.bal*cur.ref/314159).toFixed(4)} PI</div><div style={{fontSize:8}}>Valeur PI</div></div>
        </div>
      </div>

      <div style={{marginTop:12,fontWeight:800,fontSize:12}}>Tous les Portefeuilles • GDB {gdb?.slice(0,8)} • Temps réel</div>
      <div style={{border:'1px solid #e2e8f0',borderRadius:12,marginTop:6}}>
        {wallets.map(function(w,i){return (<div key={w.sym} style={{display:'flex',justifyContent:'space-between',padding:'10px 10px',borderBottom:'1px solid #f1f5f9',fontSize:11,background:w.sym===active?'#f0fdf4':'#fff'}}><div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:8,height:8,background:w.color,borderRadius:8}}></div><div style={{fontWeight:800}}>{w.sym}</div><div style={{fontSize:9,color:'#64748b'}}>{w.chain}</div></div><div style={{textAlign:'right'}}><div style={{fontWeight:700}}>{w.bal} {w.sym}</div><div style={{fontSize:9,color:'#16a34a'}}>${(w.bal*w.ref).toFixed(0)} • {(w.bal*w.ref/314159).toFixed(4)} PI</div></div></div>)})}
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:8,textAlign:'center'}}>• 8 portefeuilles: PI, BTC, ETH, USDT, USDC, SOL, XAF, XOF • GDB unique {gdb}<br/>• PI monnaie référence 1 PI = 314,159 USD • Conversion auto PI→BTC/ETH/USDT/XAF/XOF<br/>• ISO20022 • Interopérable CEMAC/UEMOA/Golfe</div>
    </div>
  )
     }
