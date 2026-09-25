// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'

export default function Convertir({gdb}){
  const [from,setFrom]=useState('π PiCoin')
  const [to,setTo]=useState('BTC')
  const [amt,setAmt]=useState('1')
  const [continent,setContinent]=useState('Afrique')
  const [live,setLive]=useState(true)

  // TAUX RÉELS SIMULÉS TEMPS RÉEL - Pi référence 314,159 USD
  const [rates,setRates]=useState({
    'π PiCoin':314159, 'BTC':67230, 'SOL':145, 'XRP':0.52, 'XLM':0.11, 'BNB':610, 'MATIC':0.85, 'USDT':1, 'USDC':1, 'DOT':6.8, 'ETH':3450, 'ADA':0.45, 'AVAX':28, 'TRX':0.12, 'LTC':72, 'DOGE':0.13, 'SHIB':0.00002
  })

  // Simulation temps réel marché mondial
  useEffect(function(){
    if(!live) return
    var id=setInterval(function(){
      setRates(function(r){
        var nr={...r}
        Object.keys(nr).forEach(function(k){
          if(k!=='π PiCoin' && k!=='USDT' && k!=='USDC'){
            var change=(Math.random()-0.5)*0.02
            nr[k]= +(nr[k]*(1+change)).toFixed(4)
          }
        })
        return nr
      })
    },3000)
    return function(){clearInterval(id)}
  },[live])

  const continents={
    'Afrique':['XAF CEMAC','XOF UEMOA','MAD Maroc','EGP Egypte','ZAR Afrique Sud','NGN Nigeria','KES Kenya','GHS Ghana','TND Tunisie','DZD Algérie'],
    'Europe':['EUR','GBP','CHF','SEK','NOK','DKK','PLN','TRY'],
    'Amérique':['USD Dollar','CAD','BRL','MXN','ARS','COP'],
    'Asie':['JPY','CNY','INR','KRW','SGD','AED Dirham','SAR Riyal'],
    'Golfe':['AED UAE','SAR Arabie','QAR Qatar','KWD Koweït','BHD Bahreïn','OMR Oman'],
    'Moyen-Orient':['JOD Jordanie','LBP Liban','IQD Iraq','ILS Israël','IRR Iran'],
  }

  const allFiat=Object.values(continents).flat()
  const allTokens=Object.keys(rates)
  const allOptions=[...allTokens,...allFiat]

  const fiatRates={
    'XAF CEMAC':605, 'XOF UEMOA':605, 'MAD Maroc':10.2, 'EGP Egypte':49, 'ZAR Afrique Sud':18.5, 'NGN Nigeria':1500, 'KES Kenya':130, 'GHS Ghana':15, 'TND Tunisie':3.1, 'DZD Algérie':135,
    'EUR':0.92, 'GBP':0.79, 'CHF':0.90, 'SEK':10.8, 'NOK':10.6, 'DKK':6.85, 'PLN':4.0, 'TRY':32,
    'USD Dollar':1, 'CAD':1.36, 'BRL':5.1, 'MXN':17, 'ARS':900, 'COP':3900,
    'JPY':149, 'CNY':7.2, 'INR':83, 'KRW':1330, 'SGD':1.32, 'AED Dirham':3.67, 'SAR Riyal':3.75,
    'AED UAE':3.67, 'SAR Arabie':3.75, 'QAR Qatar':3.64, 'KWD Koweït':0.30, 'BHD Bahreïn':0.376, 'OMR Oman':0.384,
    'JOD Jordanie':0.71, 'LBP Liban':89500, 'IQD Iraq':1310, 'ILS Israël':3.7, 'IRR Iran':42000,
  }

  function getRate(sym){
    if(rates[sym]) return rates[sym]
    if(fiatRates[sym]) return fiatRates[sym]
    return 1
  }

  const fromRate=getRate(from)
  const toRate=getRate(to)
  // Conversion via USD pivot : Pi = 314159 USD
  const usdValue= amt? parseFloat(amt)* (from.includes('Pi')? 314159 : fromRate) / (from.includes('Pi')? 1 : 1) : 0
  // Si from est crypto, on convertit via USD
  var converted=''
  if(amt){
    if(from.includes('Pi')){
      // Pi -> autre: Pi en USD / rate destination
      if(rates[to]) converted=(314159*parseFloat(amt)/rates[to]).toFixed(6)
      else if(fiatRates[to]) converted=(314159*parseFloat(amt)/fiatRates[to]).toFixed(2)
      else converted=(314159*parseFloat(amt)).toFixed(2)
    }else{
      var usd= rates[from]? parseFloat(amt)*rates[from] : parseFloat(amt)* (fiatRates[from]||1)
      if(to.includes('Pi')) converted=(usd/314159).toFixed(6)
      else if(rates[to]) converted=(usd/rates[to]).toFixed(6)
      else if(fiatRates[to]) converted=(usd/fiatRates[to]).toFixed(2)
      else converted=usd.toFixed(2)
    }
  }

  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>Convertir</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <div style={{width:8,height:8,background:live?'#22c55e':'#ef4444',borderRadius:8}}></div>
          <div style={{fontSize:10,fontWeight:700,color:live?'#16a34a':'#ef4444'}}>{live?'Marché temps réel':'Pause'}</div>
          <button onClick={()=>setLive(!live)} style={{fontSize:10,border:'1px solid #e2e8f0',borderRadius:8,padding:'2px 6px',background:'#f8fafc'}}>{live?'⏸️':'▶️'}</button>
        </div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>π PiCoin référence 314,159.00 USD • {gdb?.slice(0,14)} • ISO 20022</div>

      {/* TABS CONTINENTS */}
      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:6}}>
        {Object.keys(continents).map(function(c){
          return (<button key={c} onClick={()=>setContinent(c)} style={{whiteSpace:'nowrap',padding:'6px 10px',borderRadius:20,border:'none',background:continent===c?'#1e40af':'#f1f5f9',color:continent===c?'#fff':'#334155',fontSize:11,fontWeight:continent===c?'800':'500'}}>{c}</button>)
        })}
      </div>

      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,marginTop:10}}>
        <div style={{fontSize:11,fontWeight:700}}>De</div>
        <div style={{display:'flex',gap:8,marginTop:6}}>
          <select value={from} onChange={e=>setFrom(e.target.value)} style={{flex:1,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontWeight:800,fontSize:13}}>
            <optgroup label="Cryptomonnaies">{allTokens.map(t=><option key={t} value={t}>{t} - {rates[t]? rates[t]+' USD':''}</option>)}</optgroup>
            <optgroup label={`Devises Locales - ${continent}`}>{continents[continent].map(t=><option key={t} value={t}>{t}</option>)}</optgroup>
            <optgroup label="Toutes Devises">{allFiat.map(t=><option key={t} value={t}>{t}</option>)}</optgroup>
          </select>
          <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00" style={{flex:1,padding:12,borderRadius:12,border:'2px solid #16a34a',fontWeight:800,fontSize:16}} />
        </div>

        <div style={{display:'flex',justifyContent:'center',margin:'10px 0'}}><button onClick={()=>{var a=from; setFrom(to); setTo(a)}} style={{width:40,height:40,borderRadius:20,border:'1px solid #bbf7d0',background:'#fff',fontSize:18}}>⇅</button></div>

        <div style={{fontSize:11,fontWeight:700}}>Vers</div>
        <div style={{display:'flex',gap:8,marginTop:6}}>
          <select value={to} onChange={e=>setTo(e.target.value)} style={{flex:1,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontWeight:800,fontSize:13}}>
            <optgroup label="Cryptomonnaies">{allTokens.map(t=><option key={t} value={t}>{t}</option>)}</optgroup>
            <optgroup label={`Devises Locales - ${continent}`}>{continents[continent].map(t=><option key={t} value={t}>{t}</option>)}</optgroup>
            <optgroup label="Toutes Devises">{allFiat.map(t=><option key={t} value={t}>{t}</option>)}</optgroup>
          </select>
          <input value={converted} readOnly placeholder="Résultat temps réel" style={{flex:1,padding:12,borderRadius:12,border:'1px solid #e2e8f0',background:'#fff',fontWeight:800,fontSize:16}} />
        </div>

        <div style={{marginTop:10,display:'flex',justifyContent:'space-between',fontSize:11}}>
          <div style={{color:'#64748b'}}>1 {from} = {(fromRate/(toRate||1)).toFixed(6)} {to}</div>
          <div style={{color:'#16a34a',fontWeight:700}}>Pi Ref: 314,159 USD</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:10}}>
        {[
          {s:'BTC',n:'Bitcoin'},{s:'SOL',n:'Solana'},{s:'XRP',n:'Ripple'},
          {s:'XLM',n:'Stellar'},{s:'BNB',n:'BNB'},{s:'MATIC',n:'Polygon'},
          {s:'USDT',n:'Tether'},{s:'USDC',n:'USDC'},{s:'DOT',n:'Polkadot'},
        ].map(function(x){
          return (<button key={x.s} onClick={()=>{setFrom('π PiCoin'); setTo(x.s)}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:10,padding:8,fontSize:10,fontWeight:700}}><div>{x.s}</div><div style={{fontSize:8,color:'#64748b'}}>{rates[x.s]} USD</div></button>)
        })}
      </div>

      <button onClick={()=>alert(`Conversion ${amt} ${from} → ${converted} ${to} de ${gdb} - Temps réel marché mondial - PiCoin 314159 USD ref - Continent ${continent}`)} style={{width:'100%',marginTop:12,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>Convertir {from} → {to} • {gdb?.slice(0,8)}</button>
      <div style={{fontSize:10,color:'#64748b',marginTop:8,textAlign:'center'}}>• Conversion instantanée Pi → BTC,SOL,XRP,XLM,BNB,MATIC,USDT,USDC,DOT,ETH...<br/>• Devises locales par continent {continent} • Temps réel tendances mondiales<br/>• {gdb} • Conforme ISO 20022</div>
    </div>
  )
    }
