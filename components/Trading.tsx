// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'
export default function Trading({gdb}){
  const [pair,setPair]=useState('PI/USDT')
  const [type,setType]=useState('Acheter')
  const [amt,setAmt]=useState('1')
  const [live,setLive]=useState(true)
  const [prices,setPrices]=useState({
    'PI/BTC':0.000014, 'PI/USDT':314159, 'PI/USDC':314159, 'PI/ETH':91.2, 'PI/DOT':46200, 'PI/SOLANA':2166, 'PI/XRP':604000, 'PI/XLM':2856000, 'PI/BNB':515, 'PI/MATIC':369600, 'PI/ADA':698000, 'PI/TRX':2618000, 'PI/AVAX':11220, 'PI/DOGE':2416000, 'PI/LTC':4363, 'PI/SHIB':15707950000
  })
  const pairs=[
    {p:'PI/BTC', n:'Bitcoin'}, {p:'PI/USDT', n:'Tether'}, {p:'PI/USDC', n:'USDC'}, {p:'PI/ETH', n:'Ethereum'},
    {p:'PI/DOT', n:'Polkadot'}, {p:'PI/SOLANA', n:'Solana'}, {p:'PI/XRP', n:'Ripple'}, {p:'PI/XLM', n:'Stellar'},
    {p:'PI/BNB', n:'BNB'}, {p:'PI/MATIC', n:'Polygon'}, {p:'PI/ADA', n:'Cardano'}, {p:'PI/TRX', n:'Tron'},
    {p:'PI/AVAX', n:'Avalanche'}, {p:'PI/DOGE', n:'Dogecoin'}, {p:'PI/LTC', n:'Litecoin'}, {p:'PI/SHIB', n:'Shiba'},
  ]
  useEffect(function(){
    if(!live) return
    var id=setInterval(function(){
      setPrices(function(pr){
        var nr={...pr}
        Object.keys(nr).forEach(function(k){
          var ch=(Math.random()-0.5)*0.015
          nr[k]= +(nr[k]*(1+ch)).toFixed(6)
        })
        return nr
      })
    },2500)
    return function(){clearInterval(id)}
  },[live])

  var curPrice=prices[pair]||314159
  var displayPrice= pair==='PI/USDT' || pair==='PI/USDC'? curPrice.toFixed(2)+' USD' : curPrice.toLocaleString()+' '+pair.split('/')[1]
  var total= amt? (parseFloat(amt)*curPrice).toFixed(4)+' '+pair.split('/')[1] : '0.00'

  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>Trading • PI Référence • {gdb?.slice(0,8)}</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{width:8,height:8,background:live?'#22c55e':'#ef4444',borderRadius:8}}></div><div style={{fontSize:10,fontWeight:700,color:'#16a34a'}}>{live?'LIVE 16 PAIRES':'PAUSE'}</div><button onClick={()=>setLive(!live)} style={{fontSize:10,border:'1px solid #e2e8f0',borderRadius:8,padding:'2px 6px'}}>{live?'⏸️':'▶️'}</button></div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>1 PI = 314,159.00 USD référence • {gdb} • Trading temps réel interopérable</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:10,marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><div style={{fontSize:11,color:'#93c5fd'}}>Prix Actuel {pair}</div><div style={{fontWeight:900,fontSize:18,marginTop:2}}>{displayPrice}</div><div style={{fontSize:10,color:'#86efac',marginTop:2}}>PI monnaie référence • {gdb?.slice(0,10)}</div></div>
        <div style={{fontSize:10,background:'#16a34a',padding:'4px 8px',borderRadius:12,fontWeight:700}}>16 PAIRES PI</div>
      </div>

      <div style={{marginTop:12,fontWeight:800,fontSize:12}}>Paires PI - 16 Paires - PI comme monnaie référence</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6,marginTop:8,maxHeight:200,overflowY:'auto',border:'1px solid #e2e8f0',borderRadius:12,padding:6}}>
        {pairs.map(function(x){
          var pr=prices[x.p]
          return (<button key={x.p} onClick={function(){setPair(x.p)}} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 8px',borderRadius:10,border:pair===x.p?'2px solid #16a34a':'1px solid #f1f5f9',background:pair===x.p?'#f0fdf4':'#fff',textAlign:'left'}}>
            <div><div style={{fontWeight:800,fontSize:11}}>{x.p}</div><div style={{fontSize:8,color:'#64748b'}}>{x.n}</div></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:10,fontWeight:700}}>{pr>1000? pr.toFixed(0) : pr>1? pr.toFixed(2) : pr.toFixed(6)}</div><div style={{fontSize:8,color:'#16a34a'}}>+{(Math.random()*3).toFixed(1)}%</div></div>
          </button>)
        })}
      </div>

      <div style={{display:'flex',background:'#f1f5f9',borderRadius:12,padding:4,marginTop:12}}>
        <button onClick={function(){setType('Acheter')}} style={{flex:1,background:type==='Acheter'?'#16a34a':'transparent',color:type==='Acheter'?'#fff':'#64748b',border:'none',borderRadius:10,padding:10,fontWeight:800,fontSize:12}}>Acheter PI</button>
        <button onClick={function(){setType('Vendre')}} style={{flex:1,background:type==='Vendre'?'#ef4444':'transparent',color:type==='Vendre'?'#fff':'#64748b',border:'none',borderRadius:10,padding:10,fontWeight:800,fontSize:12}}>Vendre PI</button>
      </div>

      <div style={{marginTop:12}}>
        <div style={{fontSize:11,fontWeight:700}}>Montant PI (π)</div>
        <input value={amt} onChange={function(e){setAmt(e.target.value)}} placeholder="1.00 PI" style={{width:'100%',padding:12,borderRadius:12,border:type==='Acheter'?'2px solid #16a34a':'2px solid #ef4444',marginTop:6,fontWeight:800,fontSize:16}} />
        <div style={{fontSize:11,marginTop:8,fontWeight:700}}>Vous recevez / payez ({pair.split('/')[1]})</div>
        <input value={total} readOnly style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6,background:'#f8fafc',fontWeight:700}} />
        <div style={{fontSize:10,color:'#64748b',marginTop:6}}>1 PI = {displayPrice} • Frais 0.1% • {gdb?.slice(0,12)} • ISO 20022</div>
        <button onClick={function(){alert(type+' '+amt+' PI en '+pair+' - '+total+' de '+gdb+' - PI référence 314159 USD - Trading temps réel - 16 paires')}} style={{width:'100%',marginTop:10,background:type==='Acheter'?'#16a34a':'#ef4444',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>{type} {amt||0} PI → {pair.split('/')[1]} • {gdb?.slice(0,8)}</button>
      </div>

      <div style={{marginTop:12,border:'1px solid #e2e8f0',borderRadius:12,padding:8,background:'#fafaf9'}}>
        <div style={{fontWeight:800,fontSize:11}}>Carnet d'Ordres • {pair} • PI référence • LIVE</div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:10,color:'#64748b'}}><div>Achat PI</div><div>Prix {pair.split('/')[1]}</div><div>Total</div></div>
        {[0.98,0.99,1.01,1.02].map(function(m,i){var p=curPrice*m; return (<div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11,padding:'4px 0',background:i<2?'#f0fdf4':'#fef2f2'}}><div style={{color:i<2?'#16a34a':'#ef4444',fontWeight:700}}>{i<2?'Achat':'Vente'} { (Math.random()*2).toFixed(2)} PI</div><div>{p.toFixed(2)}</div><div style={{fontWeight:700}}>{(p*0.5).toFixed(2)}</div></div>)})}
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:8,textAlign:'center'}}>• 16 paires: PI/BTC, PI/USDT, PI/USDC, PI/ETH, PI/DOT, PI/SOLANA, PI/XRP, PI/XLM, PI/BNB, PI/MATIC, PI/ADA, PI/TRX, PI/AVAX, PI/DOGE, PI/LTC, PI/SHIB<br/>• PI comme monnaie référence • Temps réel • {gdb} • Conforme ISO 20022 • Interopérable</div>
    </div>
  )
}
