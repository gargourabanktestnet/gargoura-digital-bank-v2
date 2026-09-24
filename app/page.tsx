// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'

function genGDB(){ return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000) }

export default function Page(){
  const [gdbAccount,setGdbAccount]=useState('GDB-2026-000000')
  const [modal,setModal]=useState('')
  const [active,setActive]=useState('accueil')
  const [showMenu,setShowMenu]=useState(false)
  const [amountPi,setAmountPi]=useState('')
  const [p2pType,setP2pType]=useState('interne')
  const [piPrice,setPiPrice]=useState(314159)
  const [tradeTab,setTradeTab]=useState('all')
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

  useEffect(function(){
    try{
      var a=localStorage.getItem('gdb_account')
      if(a) setGdbAccount(a)
      else { var n=genGDB(); setGdbAccount(n); localStorage.setItem('gdb_account',n) }
    }catch(e){ var n=genGDB(); setGdbAccount(n) }
  },[])

  useEffect(function(){
    var it=setInterval(function(){
      setPiPrice(function(prev){ return prev + (Math.random()-0.5)*5 })
      setPairs(function(old){
        var copy=[]
        for(var i=0;i<old.length;i++){
          var p=old[i]
          var newPrice=p.price + (Math.random()-0.5)*1
          var newChange=p.change + (Math.random()-0.5)*0.05
          copy.push({sym:p.sym, price:newPrice, change:newChange, vol:p.vol, up:newChange>=0})
        }
        return copy
      })
    },1000)
    return function(){ clearInterval(it) }
  },[])

  function openSection(s){
    setActive(s)
    if(s==='accueil'){ setShowMenu(false); setModal('') }
    else { setModal(s) }
  }

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:90}}>
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
              <button onClick={function(){openSection('trading')}} style={{textAlign:'left',background:'#fff',border:'2px solid #16a34a',borderRadius:12,padding:12,fontWeight:800}}>📈 Trading Live 1s</button>
              <button onClick={function(){openSection('paiements')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>↔️ Paiements P2P</button>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:14,display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{width:80,height:80,borderRadius:40,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>
          <div style={{fontWeight:900,marginTop:6}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10}}>{gdbAccount} • Unique par utilisateur • GDB different</div>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:20,padding:16,color:'#fff'}}>
          <div style={{fontSize:13}}>Solde Total • {gdbAccount}</div>
          <div style={{fontWeight:900,fontSize:26,marginTop:10}}>1 pi = {piPrice.toFixed(2)} USD</div>
          <div style={{fontSize:10,marginTop:4}}>Synchronisation en temps reel • updatedEverySecond • Live</div>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button onClick={function(){openSection('trading')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Trading Live</button>
            <button onClick={function(){openSection('paiements')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>P2P Interne Externe</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Apercu du Compte</div>
          <div style={{fontSize:12,marginTop:4,color:'#1e40af',fontWeight:800}}>{gdbAccount} • Unique • QR lie</div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',marginTop:8,background:'#facc15',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Voir QR Code • {gdbAccount}</button>
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
          <div style={{background:'#f8fafc',width:'100%',borderRadius:'24px 24px 0 0',padding:12,maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1e40af',color:'#fff',padding:12,borderRadius:12,marginBottom:12}}>
              <div style={{fontWeight:900}}>Gargoura • {gdbAccount}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
            </div>

            {modal==='trading' && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{background:'#fef3c7',border:'1px solid #facc15',borderRadius:20,padding:16}}>
                  <div style={{fontWeight:800}}>piCoin</div>
                  <div style={{fontSize:11,color:'#64748b'}}>officialGcvValue • {gdbAccount}</div>
                  <div style={{fontWeight:900,fontSize:30,color:'#b45309',marginTop:10}}>1 π = {piPrice.toFixed(2)} USD</div>
                  <div style={{marginTop:6,color:'#16a34a',fontWeight:800,fontSize:13}}>+2.45% 24h • Live 1s • Sync chaque seconde</div>
                </div>

                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:20,padding:12,display:'flex',gap:8,alignItems:'center'}}>
                  <div>∿</div>
                  <div><div style={{fontWeight:800,fontSize:13}}>Synchronisation en temps reel</div><div style={{fontSize:11,color:'#64748b'}}>updatedEverySecond • Live • {gdbAccount}</div></div>
                  <div style={{marginLeft:'auto',width:8,height:8,background:'#16a34a',borderRadius:8}}></div>
                </div>

                <div style={{display:'flex',gap:6}}>
                  <button onClick={function(){setModal('ordre-achat')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:24,padding:12,fontWeight:900}}>Acheter</button>
                  <button onClick={function(){setModal('ordre-vente')}} style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:24,padding:12,fontWeight:900}}>Vendre</button>
                  <button onClick={function(){setModal('ordre-liste')}} style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:24,padding:12,fontWeight:800,fontSize:11}}>Placer un ordre</button>
                </div>

                <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:12}}>
                  <div style={{fontWeight:900}}>Paires de Trading</div>
                  <div style={{fontSize:11,color:'#64748b'}}>realTimePiNetworkMarkets • {gdbAccount}</div>
                  <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:10}}>
                    <button onClick={function(){setTradeTab('all')}} style={{flex:1,background:tradeTab==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:6,fontWeight:800,fontSize:12}}>all</button>
                    <button onClick={function(){setTradeTab('gainers')}} style={{flex:1,background:tradeTab==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:6,fontWeight:800,fontSize:12}}>gainers</button>
                    <button onClick={function(){setTradeTab('losers')}} style={{flex:1,background:tradeTab==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:6,fontWeight:800,fontSize:12}}>losers</button>
                  </div>
                  <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:6}}>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/USDT</b><div style={{fontSize:11}}>vol: 1.2M</div></div><div style={{textAlign:'right'}}><b>{pairs[0].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[0].up?'#16a34a':'#dc2626'}}>{pairs[0].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/BTC</b><div style={{fontSize:11}}>vol: 850K</div></div><div style={{textAlign:'right'}}><b>{pairs[1].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[1].up?'#16a34a':'#dc2626'}}>{pairs[1].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/ETH</b><div style={{fontSize:11}}>vol: 920K</div></div><div style={{textAlign:'right'}}><b>{pairs[2].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[2].up?'#16a34a':'#dc2626'}}>{pairs[2].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/SOL</b><div style={{fontSize:11}}>vol: 680K</div></div><div style={{textAlign:'right'}}><b>{pairs[3].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[3].up?'#16a34a':'#dc2626'}}>{pairs[3].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/XRP</b><div style={{fontSize:11}}>vol: 780K</div></div><div style={{textAlign:'right'}}><b>{pairs[6].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[6].up?'#16a34a':'#dc2626'}}>{pairs[6].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/USDC</b><div style={{fontSize:11}}>vol: 1.1M</div></div><div style={{textAlign:'right'}}><b>{pairs[7].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[7].up?'#16a34a':'#dc2626'}}>{pairs[7].change.toFixed(2)}%</div></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div><b>PI/BNB</b><div style={{fontSize:11}}>vol: 620K</div></div><div style={{textAlign:'right'}}><b>{pairs[9].price.toFixed(2)}</b><div style={{fontSize:11,color:pairs[9].up?'#16a34a':'#dc2626'}}>{pairs[9].change.toFixed(2)}%</div></div></div>
                  </div>
                </div>
                <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:16,padding:12}}>
                  <div style={{fontWeight:800}}>aiTradingAssistant</div>
                  <div style={{fontSize:11,color:'#64748b'}}>aiMonitorsMarkets • {gdbAccount}</div>
                </div>
              </div>
            )}

            {modal==='ordre-achat' && (
              <div style={{background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>Placer un ordre / Achat</div>
                <div style={{fontSize:11}}>Compte {gdbAccount} • Prix {piPrice.toFixed(2)} USD • Sync 1s</div>
                <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:10}} />
                <button onClick={function(){setModal('Ordre Achat place '+amountPi+' pi a '+piPrice.toFixed(2)+' USD pour '+gdbAccount)}} style={{width:'100%',marginTop:10,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Confirmer Placer un ordre / Achat</button>
              </div>
            )}

            {modal==='ordre-vente' && (
              <div style={{background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>Placer un ordre / Vente</div>
                <div style={{fontSize:11}}>Compte {gdbAccount} • Prix {piPrice.toFixed(2)} USD</div>
                <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi a vendre" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:10}} />
                <button onClick={function(){setModal('Ordre Vente place '+amountPi+' pi pour '+gdbAccount)}} style={{width:'100%',marginTop:10,background:'#dc2626',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Confirmer Placer un ordre / Vente</button>
              </div>
            )}

            {modal==='ordre-liste' && (
              <div style={{background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>Mes Ordres • {gdbAccount}</div>
                <div style={{marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div style={{fontWeight:700,fontSize:13}}>Achat PI/USDT 0.5 pi @ {piPrice.toFixed(2)} USD</div><div style={{fontSize:11,color:'#16a34a'}}>Ouvert • Sync temps reel • Placer un ordre / Achat</div></div>
                <div style={{marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div style={{fontWeight:700,fontSize:13}}>Vente PI/BTC 1.2 pi @ {pairs[1].price.toFixed(2)}</div><div style={{fontSize:11,color:'#dc2626'}}>En attente • Placer un ordre / Vente • {gdbAccount}</div></div>
              </div>
            )}

            {modal==='paiements' && (
              <div style={{background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>Paiements • {gdbAccount} • GDB unique different</div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:16,padding:4,marginTop:8}}>
                  <button onClick={function(){setP2pType('interne')}} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:12,padding:8,fontWeight:800,fontSize:12}}>P2P Interne</button>
                  <button onClick={function(){setP2pType('externe')}} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:12,padding:8,fontWeight:800,fontSize:12}}>P2P Externe</button>
                </div>
                <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} />
                <button onClick={function(){setModal('Envoye '+amountPi+' pi de '+gdbAccount)}} style={{width:'100%',marginTop:8,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Envoyer</button>
              </div>
            )}

            {modal==='receive' && (
              <div style={{textAlign:'center',background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>{gdbAccount}</div>
                <div style={{marginTop:10,border:'2px solid #facc15',borderRadius:12,padding:10,display:'inline-block'}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount)} alt="QR" style={{width:200,height:200}
