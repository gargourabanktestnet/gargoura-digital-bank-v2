'use client'
import { useState, useEffect } from 'react'

const GCV = 314159
function formatG(a:string){ if(!a || a.length<8) return a; return a.slice(0,4)+'...'+a.slice(-4) }
function genGDB(){ return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000) }

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState('')
  const [active,setActive]=useState('accueil')
  const [showMenu,setShowMenu]=useState(false)
  const [amountPi,setAmountPi]=useState('')
  const [p2pType,setP2pType]=useState('interne')
  const [dest,setDest]=useState('')
  const [zone,setZone]=useState('CEMAC')
  const [banquePart,setBanquePart]=useState('')
  const [compteExt,setCompteExt]=useState('')
  const [logoError,setLogoError]=useState(false)
  const [piPrice,setPiPrice]=useState(314159)
  const [tradeTab,setTradeTab]=useState('all')
  const [ordreType,setOrdreType]=useState('achat')

  const [pairs,setPairs]=useState([
    {sym:'PI/USDT', price:314165.35, change:2.45, vol:'1.2M', up:true},
    {sym:'PI/BTC', price:3.31, change:-0.82, vol:'850K', up:false},
    {sym:'PI/ETH', price:89.76, change:1.23, vol:'920K', up:true},
    {sym:'PI/SOL', price:1745.36, change:3.67, vol:'680K', up:true},
    {sym:'PI/ADA', price:369594.94, change:-1.45, vol:'540K', up:false},
    {sym:'PI/XLM', price:897641.14, change:0.95, vol:'420K', up:true},
    {sym:'PI/XRP', price:149596.88, change:2.18, vol:'780K', up:true},
    {sym:'PI/USDC', price:314158.36, change:0.12, vol:'1.1M', up:true},
    {sym:'PI/MATIC', price:330697.56, change:-0.67, vol:'390K', up:false},
    {sym:'PI/BNB', price:505.90, change:1.89, vol:'620K', up:true},
  ])

  useEffect(()=>{
    try{
      const a=localStorage.getItem('gdb_account')
      const g=localStorage.getItem('pi_g_address')
      const p=localStorage.getItem('pi_user')
      if(a) setGdbAccount(a)
      else { const n=genGDB(); setGdbAccount(n); localStorage.setItem('gdb_account',n) }
      if(g) setGAddress(g)
      if(p) setKyc(true)
    }catch(e){ const n=genGDB(); setGdbAccount(n) }
  },[])

  useEffect(()=>{
    const it=setInterval(function(){
      const delta = (Math.random()-0.5)*0.02
      setPiPrice(function(prev){ return prev * (1+delta) })
      setPairs(function(old){
        const copy=[]
        for(let i=0;i<old.length;i++){
          const p=old[i]
          const d=(Math.random()-0.5)*0.02
          const newPrice=p.price*(1+d)
          const newChange=p.change+(Math.random()-0.5)*0.2
          copy.push({sym:p.sym, price:newPrice, change:newChange, vol:p.vol, up:newChange>=0})
        }
        return copy
      })
    },1000)
    return function(){ clearInterval(it) }
  },[])

  function doKyc(){
    const n=gdbAccount||genGDB()
    setGdbAccount(n)
    setKyc(true)
    localStorage.setItem('gdb_account',n)
    localStorage.setItem('pi_user','ok')
    setModal('KYC OK '+n)
  }

  function openSection(s:string){
    setActive(s)
    if(s==='accueil'){ setShowMenu(false); setModal('') }
    else { setModal(s) }
  }

  const usd = (parseFloat(amountPi||'0')*GCV).toLocaleString()
  const filteredPairs = pairs.filter(function(p){
    if(tradeTab==='gainers') return p.up
    if(tradeTab==='losers') return!p.up
    return true
  })

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:95}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11}}>Gargoura Digital Bank • {gdbAccount}</div></div>
      </div>

      {showMenu && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div onClick={function(){setShowMenu(false)}} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
          <div style={{width:'85%',maxWidth:360,background:'#fff',height:'100%',overflowY:'auto',paddingBottom:100}}>
            <div style={{background:'#1e40af',color:'#fff',padding:14}}>
              <button onClick={function(){setShowMenu(false)}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
              <div style={{fontWeight:900,marginTop:8}}>{gdbAccount}</div>
            </div>
            <div style={{padding:14,display:'flex',flexDirection:'column',gap:10}}>
              <button onClick={function(){openSection('accueil')}} style={{textAlign:'left',background:'#eef2ff',border:'1px solid #c7d2fe',borderRadius:12,padding:12,fontWeight:800}}>🏠 Accueil</button>
              <button onClick={function(){openSection('paiements')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>↔️ Paiements</button>
              <button onClick={function(){openSection('trading')}} style={{textAlign:'left',background:'#fff',border:'2px solid #16a34a',borderRadius:12,padding:12,fontWeight:800}}>📈 Trading • Live 1s</button>
              <button onClick={function(){openSection('services')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>🏛️ Services</button>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError? (
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:90,height:90,borderRadius:45,border:'3px solid #facc15',objectFit:'cover'}} />
          ) : (
            <div style={{width:90,height:90,borderRadius:45,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>
          )}
          <div style={{fontWeight:900,color:'#1e3a8a',marginTop:6}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#a16207',fontWeight:800}}>{gdbAccount} • GCV {GCV} $</div>
          <button onClick={doKyc} style={{marginTop:6,background:kyc?'#16a34a':'#e2e8f0',border:'none',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi'}</button>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:24,padding:20,color:'#fff'}}>
          <div style={{fontSize:14,opacity:0.9}}>Solde Total • {gdbAccount}</div>
          <div style={{fontWeight:900,fontSize:28,marginTop:12}}>1 pi = {piPrice.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})} USD</div>
          <div style={{fontSize:11,opacity:0.8,marginTop:4}}>Synchronisation en temps reel • updatedEverySecond</div>
          <div style={{display:'flex',gap:10,marginTop:14}}>
            <button onClick={function(){openSection('paiements')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
          <div style={{fontWeight:900}}>Aperçu du Compte</div>
          <div style={{marginTop:10,fontSize:13,color:'#1e40af',fontWeight:800}}>{gdbAccount} • Unique par utilisateur • QR lie</div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',marginTop:8,background:'#facc15',color:'#1e3a8a',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Afficher QR Code de {gdbAccount}</button>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:'6px 2px 8px 2px',zIndex:40}}>
        <button onClick={function(){openSection('accueil')}} style={{border:'none',background:active==='accueil'?'#dbeafe':'none',fontSize:9,color:active==='accueil'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏠</div>Accueil</button>
        <button onClick={function(){openSection('paiements')}} style={{border:'none',background:active==='paiements'?'#dbeafe':'none',fontSize:9,color:active==='paiements'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>↔️</div>Paiements</button>
        <button onClick={function(){openSection('trading')}} style={{border:'none',background:active==='trading'?'#dbeafe':'none',fontSize:9,color:active==='trading'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>📈</div>Trading</button>
        <button onClick={function(){openSection('services')}} style={{border:'none',background:active==='services'?'#dbeafe':'none',fontSize:9,color:active==='services'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏛️</div>Services</button>
        <button onClick={function(){openSection('innovation')}} style={{border:'none',background:active==='innovation'?'#dbeafe':'none',fontSize:9,color:active==='innovation'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>✨</div>Innovation</button>
        <button onClick={function(){openSection('securite')}} style={{border:'none',background:active==='securite'?'#dbeafe':'none',fontSize:9,color:active==='securite'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🛡️</div>Securite</button>
        <button onClick={function(){openSection('support')}} style={{border:'none',background:active==='support'?'#dbeafe':'none',fontSize:9,color:active==='support'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>❓</div>Support</button>
      </div>

      {modal? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:60,display:'flex',alignItems:'flex-end'}}>
          <div style={{background:'#f8fafc',width:'100%',borderRadius:'24px 24px 0 0',padding:12,maxHeight:'92vh',overflowY:'auto'}}>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1e40af',color:'#fff',padding:'12px 14px',borderRadius:12,margin:-12,marginBottom:12}}>
              <div style={{fontWeight:900}}>Gargoura • {gdbAccount}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
            </div>

            {modal==='trading' && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{background:'#fef3c7',border:'1px solid #facc15',borderRadius:20,padding:16}}>
                  <div style={{fontWeight:800,fontSize:18}}>piCoin</div>
                  <div style={{fontSize:12,color:'#64748b',marginTop:2}}>officialGcvValue • {gdbAccount}</div>
                  <div style={{fontWeight:900,fontSize:32,color:'#b45309',marginTop:12}}>1 π = {piPrice.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})} USD</div>
                  <div style={{marginTop:6,display:'flex',gap:6,alignItems:'center',color:'#16a34a',fontWeight:800}}>↗ +2.45% <span style={{color:'#64748b',fontWeight:400}}>24h • Live</span></div>
                </div>

                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:20,padding:14,display:'flex',gap:10,alignItems:'center'}}>
                  <div style={{color:'#16a34a',fontSize:20}}>∿</div>
                  <div><div style={{fontWeight:800}}>Synchronisation en temps reel</div><div style={{fontSize:12,color:'#64748b'}}>updatedEverySecond • {new Date().toLocaleTimeString()} • {gdbAccount}</div></div>
                  <div style={{marginLeft:'auto',width:10,height:10,background:'#16a34a',borderRadius:10,animation:'pulse 1s infinite'}}></div>
                </div>

                <div style={{display:'flex',gap:8}}>
                  <button onClick={function(){setOrdreType('achat'); setModal('ordre-achat')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:24,padding:'14px 8px',fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>↗ Acheter</button>
                  <button onClick={function(){setOrdreType('vente'); setModal('ordre-vente')}} style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:24,padding:'14px 8px',fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>↘ Vendre</button>
                  <button onClick={function(){setModal('ordre-liste')}} style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:24,padding:'14px 8px',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>∿ Placer un ordre</button>
                </div>

                <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
                  <div style={{fontWeight:900,fontSize:18}}>Paires de Trading</div>
                  <div style={{fontSize:12,color:'#64748b',marginTop:2}}>realTimePiNetworkMarkets • {gdbAccount}</div>

                  <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}>
                    <button onClick={function(){setTradeTab('all')}} style={{flex:1,background:tradeTab==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,boxShadow:tradeTab==='all'?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>all</button>
                    <button onClick={function(){setTradeTab('gainers')}} style={{flex:1,background:tradeTab==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,boxShadow:tradeTab==='gainers'?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>gainers</button>
                    <button onClick={function(){setTradeTab('losers')}} style={{flex:1,background:tradeTab==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,boxShadow:tradeTab==='losers'?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>losers</button>
                  </div>

                  <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:12}}>
                    {filteredPairs.map(function(p,idx){
                      return (
                        <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #e2e8f0',borderRadius:16,padding:'12px 14px',background:'#fff'}}>
                          <div><div style={{fontWeight:800}}>{p.sym}</div><div style={{fontSize:12,color:'#64748b'}}>vol: {p.vol} • {gdbAccount.slice(0,8)}</div></div>
                          <div style={{textAlign:'right'}}><div style={{fontWeight:800}}>{p.price.toFixed(2)}</div><div style={{fontSize:12,color:p.up?'#16a34a':'#dc2626',fontWeight:700}}>{p.up?'↗':'↘'} {p.change>=0?'+':''}{p.change.toFixed(2)}%</div></div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:20,padding:14,display:'flex',gap:10,alignItems:'center'}}>
                  <div style={{fontSize:20}}>🧠</div>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>aiTradingAssistant</div><div style={{fontSize:12,color:'#64748b',marginTop:2}}>aiMonitorsMarkets • Compte {gdbAccount} • Analyse temps reel</div></div>
                </div>
                <button style={{width:'100%',background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:12,fontWeight:700}}>🧠 viewAiRecommendations</button>
              </div>
            )}

            {modal==='ordre-achat' && (
              <div style={{background:'#fff',borderRadius:20,padding:16,marginTop:8}}>
                <div style={{fontWeight:900,fontSize:18}}>Placer un ordre / Achat</div>
                <div style={{fontSize:12,color:'#64748b'}}>Compte: {gdbAccount} • Prix actuel: {piPrice.toFixed(2)} USD • Sync chaque seconde</div>
                <div style={{marginTop:12}}><div style={{fontWeight:700}}>Paire</div><select style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:4}}><option>PI/USDT - {pairs[0].price.toFixed(2)}</option><option>PI/BTC - {pairs[1].price.toFixed(2)}</option><option>PI/ETH</option></select></div>
                <div style={{marginTop:10}}><div style={{fontWeight:700}}>Montant pi</div><input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:4}} /><div style={{fontSize:11,color:'#16a34a'}}>{usd} USD • G: {formatG(gAddress)}</div></div>
                <button onClick={function(){setModal('Ordre Achat place: '+amountPi+' pi a '+piPrice.toFixed(2)+' USD pour compte '+gdbAccount)}} style={{width:'100%',marginTop:12,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>Confirmer Placer un ordre / Achat</button>
              </div>
            )}

            {modal==='ordre-vente' && (
              <div style={{background:'#fff',borderRadius:20,padding:16,marginTop:8}}>
                <div style={{fontWeight:900,fontSize:18}}>Placer un ordre / Vente</div>
                <div style={{fontSize:12,color:'#64748b'}}>Compte: {gdbAccount} • Prix actuel: {piPrice.toFixed(2)} USD</div>
                <div style={{marginTop:10}}><input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi a vendre" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}} /><div style={{fontSize:11,color:'#dc2626'}}>{usd} USD</div></div>
                <button onClick={function(){setModal('Ordre Vente place: '+amountPi+' pi a '+piPrice.toFixed(2)+' USD pour '+gdbAccount)}} style={{width:'100%',marginTop:12,background:'#dc2626',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>Confirmer Placer un ordre / Vente</button>
              </div>
            )}

            {modal==='ordre-liste' && (
              <div style={{background:'#fff',borderRadius:20,padding:16,marginTop:8}}>
                <div style={{fontWeight:900}}>Mes Ordres • {gdbAccount}</div>
                <div style={{marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:12}}><div style={{fontWeight:700}}>Achat PI/USDT 0.5 pi @ 314160 USD</div><div style={{fontSize:11,color:'#16a34a'}}>Ouvert • Sync temps reel</div></div>
                <div style={{marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:12}}><div style={{fontWeight:700}}>Vente PI/BTC 1.2 pi @ 3.31 BTC</div><div style={{fontSize:11,color:'#dc2626'}}>En attente • {gdbAccount}</div></div>
              </div>
            )}

            {modal==='paiements' && (
              <div style={{marginTop:8}}>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4}}>
        
