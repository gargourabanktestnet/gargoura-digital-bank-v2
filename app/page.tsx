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
  const [amountPi,setAmountPi]=useState('')
  const [tab,setTab]=useState('Accueil')
  const [typeBanque,setTypeBanque]=useState('traditionnel')
  const [tradeFilter,setTradeFilter]=useState('all')

  useEffect(()=>{
    const a=localStorage.getItem('gdb_account')
    const g=localStorage.getItem('pi_g_address')
    const p=localStorage.getItem('pi_user')
    if(a) setGdbAccount(a)
    if(g) setGAddress(g)
    if(p) setKyc(true)
  },[])

  function doKyc(){
    const newGDB = gdbAccount || genGDB()
    setGdbAccount(newGDB)
    setKyc(true)
    localStorage.setItem('gdb_account',newGDB)
    localStorage.setItem('pi_user','test')
    setModal('KYC OK '+newGDB)
  }

  const usd = (parseFloat(amountPi||'0')*GCV).toLocaleString()

  const pairs = [
    {pair:'PI/USDT',price:'314165.35',vol:'1.2M',chg:'+2.45%',up:true},
    {pair:'PI/BTC',price:'3.31',vol:'850K',chg:'-0.82%',up:false},
    {pair:'PI/ETH',price:'89.76',vol:'920K',chg:'+1.23%',up:true},
    {pair:'PI/SOL',price:'1745.36',vol:'680K',chg:'+3.67%',up:true},
    {pair:'PI/XLM',price:'897641.14',vol:'420K',chg:'+0.95%',up:true},
    {pair:'PI/XRP',price:'149596.88',vol:'780K',chg:'+2.18%',up:true},
    {pair:'PI/USDC',price:'314158.36',vol:'1.1M',chg:'+0.12%',up:true},
    {pair:'PI/MATIC',price:'330697.56',vol:'390K',chg:'-0.67%',up:false},
    {pair:'PI/BNB',price:'505.90',vol:'620K',chg:'+1.89%',up:true},
  ]
  const filtered = tradeFilter==='all'?pairs: tradeFilter==='gainers'?pairs.filter(p=>p.up):pairs.filter(p=>!p.up)

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{background:'#1e40af',color:'#fff',padding:12,display:'flex',gap:10,alignItems:'center'}}>
        <div style={{fontWeight:900}}>Gargoura Digital Bank</div>
        <div style={{marginLeft:'auto'}}>🔔 3</div>
      </div>

      {tab==='Accueil' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
          <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,textAlign:'center'}}>
            <div style={{width:80,height:80,background:'#1e3a8a',borderRadius:40,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900,fontSize:24}}>GDB</div>
            <div style={{fontWeight:900,marginTop:8}}>GARGOURA DIGITAL BANK</div>
            <div style={{fontSize:11,color:'#a16207'}}>GCV {GCV} $</div>
            <button onClick={doKyc} style={{marginTop:10,background:kyc?'#16a34a':'#f1f5f9',border:'1px solid #cbd5e1',borderRadius:20,padding:'6px 14px',fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi Cliquer'}</button>
            {gdbAccount ? <div style={{marginTop:8,fontSize:12,background:'#1e40af',color:'#fff',borderRadius:20,padding:'4px 10px',display:'inline-block'}}>{gdbAccount}</div> : null}
            {gAddress ? <div style={{marginTop:8,fontSize:11}}>G: {formatG(gAddress)} (4+4 masque)</div> : null}
          </div>

          <div style={{background:'#1e40af',color:'#fff',borderRadius:18,padding:16}}>
            <div>1 pi = {GCV.toLocaleString()} USD</div>
            <div style={{display:'flex',gap:10,marginTop:10}}>
              <button onClick={()=>setModal('P2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12}}>Envoyer P2P</button>
              <button onClick={()=>setModal('QR '+gdbAccount)} style={{flex:1,background:'#fff',color:'#1e40af',border:'none',borderRadius:20,padding:12}}>Recevoir</button>
            </div>
          </div>

          <div style={{background:'#fff',borderRadius:18,padding:14,border:'1px solid #e2e8f0'}}>
            <div style={{fontWeight:900}}>Comptes Bancaires</div>
            <input value={gAddress} onChange={e=>setGAddress(e.target.value)} placeholder="Adresse G..." style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
            {gAddress ? <div style={{fontSize:11,color:'#16a34a',marginTop:4}}>Masque: {formatG(gAddress)}</div> : null}
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12}}>Lier Banque</button>
              <button onClick={doKyc} style={{flex:1,background:'#facc15',border:'none',borderRadius:12,padding:12,fontWeight:800}}>KYC</button>
            </div>
          </div>
        </div>
      )}

      {tab==='Trading' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
          <div style={{background:'#fef3c7',borderRadius:20,padding:16}}><div>piCoin</div><div style={{fontSize:11,color:'#64748b'}}>officialGcvValue</div><div style={{fontWeight:900,fontSize:24,color:'#d97706',marginTop:8}}>1 pi = 314,159.00 USD</div><div style={{marginTop:6,fontSize:12,color:'#16a34a'}}>+2.45% 24h</div></div>
          <div style={{background:'#f0fdf4',borderRadius:20,padding:16}}><div style={{fontWeight:800}}>Synchronisation en temps reel</div><div style={{fontSize:11,color:'#64748b'}}>updatedEverySecond</div></div>
          <div style={{display:'flex',gap:8}}><button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10}}>Acheter</button><button style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:20,padding:10}}>Vendre</button><button style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:10}}>Commander</button></div>
          <div style={{background:'#fff',borderRadius:20,padding:12,border:'1px solid #e2e8f0'}}>
            <div style={{fontWeight:900}}>Paires de Trading</div><div style={{fontSize:11,color:'#64748b'}}>realTimePiNetworkMarkets</div>
            <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:10}}>
              <button onClick={()=>setTradeFilter('all')} style={{flex:1,background:tradeFilter==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:6}}>all</button>
              <button onClick={()=>setTradeFilter('gainers')} style={{flex:1,background:tradeFilter==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:6}}>gainers</button>
              <button onClick={()=>setTradeFilter('losers')} style={{flex:1,background:tradeFilter==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:6}}>losers</button>
            </div>
            <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:8}}>
              {filtered.map(p=>(
                <div key={p.pair} style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:12,padding:10}}>
                  <div><div style={{fontWeight:800}}>{p.pair}</div><div style={{fontSize:11,color:'#64748b'}}>vol: {p.vol}</div></div>
                  <div style={{textAlign:'right'}}><div style={{fontWeight:800}}>{p.price}</div><div style={{fontSize:11,color:p.up?'#16a34a':'#dc2626'}}>{p.chg}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#eff6ff',borderRadius:20,padding:12}}><div style={{fontWeight:800}}>aiTradingAssistant</div><div style={{fontSize:12,color:'#64748b'}}>aiMonitorsMarkets</div><button style={{width:'100%',marginTop:8,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:10}}>viewAiRecommendations</button></div>
        </div>
      )}

      {modal ? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:12}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:380}}>
            {modal==='lierBanque' ? (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8}}><button onClick={()=>setModal('')} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>←</button><div style={{flex:1,textAlign:'center',fontWeight:900}}>Lier un Compte Bancaire</div><button onClick={()=>setModal('')} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>X</button></div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}><button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Traditionnel</button><button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Numerique</button></div>
                <div style={{marginTop:12,fontSize:12,color:'#64748b'}}>{typeBanque==='traditionnel'?'Banque, Numero, Titulaire, IBAN AES-256 PCI DSS':'Plateforme, Email, Tel Verification SWIFT SEPA CEMAC'}</div>
                <div style={{display:'flex',gap:8,marginTop:14}}><button onClick={()=>setModal('')} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:12}}>← Retour</button><button onClick={()=>{const n=genGDB(); setGdbAccount(n); localStorage.setItem('gdb_account',n); setModal('Lie '+n)}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12}}>Lier</button></div>
              </div>
            ) : (
              <div><div style={{fontWeight:900}}>{modal}</div><div style={{fontSize:11,marginTop:6}}>G: {formatG(gAddress)} {gdbAccount}</div><button onClick={()=>setModal('')} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10}}>Fermer</button></div>
            )}
          </div>
        </div>
      ) : null}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        <button onClick={()=>setTab('Accueil')} style={{border:'none',background:'none',fontSize:10,color:tab==='Accueil'?'#1e40af':'#64748b',fontWeight:tab==='Accueil'?800:400}}>Accueil</button>
        <button onClick={()=>setTab('Trading')} style={{border:'none',background:tab==='Trading'?'#e0e7ff':'none',fontSize:10,color:'#1e40af',borderRadius:12,padding:'4px 10px'}}>Trading</button>
        <button onClick={()=>setModal('P2P CEMAC UEMOA DOLLAR GOLF')} style={{border:'none',background:'none',fontSize:10,color:'#64748b'}}>Paiements</button>
      </div>
    </div>
  )
    }
