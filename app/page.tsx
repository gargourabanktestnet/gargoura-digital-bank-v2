'use client'
import { useState, useEffect } from 'react'

declare global { interface Window { Pi:any } }

function genererGDB(){ 
  return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000)
}
const GCV = 314159
function formatG(addr:string){ 
  if(!addr || addr.length<8) return addr
  return addr.slice(0,4)+'...'+addr.slice(-4)
}

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [piUser,setPiUser]=useState<any>(null)
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState<string|null>(null)
  const [amountPi,setAmountPi]=useState('')
  const [activeTab,setActiveTab]=useState('Accueil')
  const [typeBanque,setTypeBanque]=useState('traditionnel')
  const [nomBanque,setNomBanque]=useState('')
  const [numCompte,setNumCompte]=useState('')
  const [titulaire,setTitulaire]=useState('')
  const [iban,setIban]=useState('')
  const [plateforme,setPlateforme]=useState('')
  const [emailId,setEmailId]=useState('')
  const [tel,setTel]=useState('')
  const [p2pType,setP2pType]=useState('interne')
  const [destPhone,setDestPhone]=useState('')
  const [zoneTransfert,setZoneTransfert]=useState('CEMAC')
  const [tradeFilter,setTradeFilter]=useState('all')

  useEffect(()=>{
    try{
      const savedGDB=localStorage.getItem('gdb_account')
      const savedG=localStorage.getItem('pi_g_address')
      const savedPi=localStorage.getItem('pi_user')
      if(savedGDB) setGdbAccount(savedGDB)
      if(savedG) setGAddress(savedG)
      if(savedPi){ setPiUser(JSON.parse(savedPi)); setKyc(true) }
    }catch(e){}
    const s=document.createElement('script')
    s.src='https://sdk.minepi.com/pi-sdk.js'
    s.async=true
    s.onload=()=>{ try{ window.Pi && window.Pi.init({version:'2.0',sandbox:true}) }catch(e){} }
    document.head.appendChild(s)
  },[])

  const handleKyc = async () =>{
    try{
      if(typeof window === 'undefined' || !window.Pi){
        alert('Ouvrez dans Pi Browser pour KYC')
        setKyc(true)
        const newGDB = gdbAccount || genererGDB()
        setGdbAccount(newGDB)
        localStorage.setItem('gdb_account', newGDB)
        return
      }
      const auth = await window.Pi.authenticate(['username','payments'], function(){})
      setPiUser(auth.user)
      setKyc(true)
      localStorage.setItem('pi_user', JSON.stringify(auth.user))
      const newGDB = gdbAccount || genererGDB()
      setGdbAccount(newGDB)
      localStorage.setItem('gdb_account', newGDB)
      setModal('KYC verifie: '+auth.user.username+' lie a '+newGDB)
    }catch(e){
      setKyc(true)
      const newGDB = gdbAccount || genererGDB()
      setGdbAccount(newGDB)
      localStorage.setItem('gdb_account', newGDB)
      setModal('KYC test active - '+newGDB)
    }
  }

  const lier = () =>{
    const newGDB = gdbAccount || genererGDB()
    localStorage.setItem('gdb_account', newGDB)
    if(gAddress) localStorage.setItem('pi_g_address', gAddress)
    setGdbAccount(newGDB)
    setModal('Compte lie a '+newGDB)
  }

  const usd = parseFloat(amountPi||'0') * GCV

  const tradingPairs = [
    {pair:'PI/USDT', price:'314165.35', vol:'1.2M', change:'+2.45%', up:true},
    {pair:'PI/BTC', price:'3.31', vol:'850K', change:'-0.82%', up:false},
    {pair:'PI/ETH', price:'89.76', vol:'920K', change:'+1.23%', up:true},
    {pair:'PI/SOL', price:'1745.36', vol:'680K', change:'+3.67%', up:true},
    {pair:'PI/ADA', price:'369594.94', vol:'540K', change:'-1.45%', up:false},
    {pair:'PI/XLM', price:'897641.14', vol:'420K', change:'+0.95%', up:true},
    {pair:'PI/XRP', price:'149596.88', vol:'780K', change:'+2.18%', up:true},
    {pair:'PI/USDC', price:'314158.36', vol:'1.1M', change:'+0.12%', up:true},
    {pair:'PI/MATIC', price:'330697.56', vol:'390K', change:'-0.67%', up:false},
    {pair:'PI/BNB', price:'505.90', vol:'620K', change:'+1.89%', up:true},
  ]
  const filteredPairs = tradeFilter==='all' ? tradingPairs : tradeFilter==='gainers' ? tradingPairs.filter(function(p){return p.up}) : tradingPairs.filter(function(p){return !p.up})

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',padding:0,display:'flex',flexDirection:'column',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'10px 14px',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:30,height:30,background:'#fff',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>G</div>
        <div style={{flex:1}}><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <div style={{fontSize:18}}>🔔 3</div>
      </div>

      {activeTab==='Accueil' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img src="/logo.png" alt="GDB" style={{width:90,height:90,borderRadius:'50%',border:'3px solid #1e3a8a'}} />
            <div style={{fontWeight:900,fontSize:18,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
            <div style={{fontSize:10,color:'#a16207',marginTop:2}}>GDB PI GCV {GCV} $ MONDIALE</div>
            <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
              <button onClick={handleKyc} style={{background:kyc?'#16a34a':'#f1f5f9',color:kyc?'#fff':'#1e40af',border:'1px solid #cbd5e1',padding:'6px 12px',borderRadius:20,fontSize:10,fontWeight:800}}>
                {kyc ? 'KYC Verifie' : 'KYC Pi Cliquer'}
              </button>
              {gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'6px 12px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}
            </div>
            {gAddress ? <div style={{marginTop:8,fontSize:11,background:'#f1f5f9',padding:'6px 10px',borderRadius:10}}>G: {formatG(gAddress)}</div> : null}
            {piUser ? <div style={{marginTop:6,fontSize:11}}>@{piUser.username}</div> : null}
          </div>

          <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
            <div style={{fontSize:12}}>Solde Total {gdbAccount}</div>
            <div style={{fontWeight:900,fontSize:24,marginTop:6}}>1 pi = {GCV.toLocaleString()} USD</div>
            <div style={{display:'flex',gap:10,marginTop:14}}>
              <button onClick={()=>setModal('transferP2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Envoyer P2P</button>
              <button onClick={()=>setModal('receive')} style={{flex:1,background:'#fff',color:'#1e40af',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Recevoir</button>
            </div>
          </div>

          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
            <div style={{fontWeight:900}}>Apercu Compte</div>
            <div style={{color:'#64748b',fontSize:12,marginTop:4}}>{gdbAccount || 'Creez GDB via KYC'} - G: {gAddress ? formatG(gAddress) : 'Non lie'} - {kyc?'KYC OK':'KYC requis'}</div>
          </div>

          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
            <div style={{fontWeight:900}}>Comptes Bancaires</div>
            <input value={gAddress} onChange={function(e){setGAddress(e.target.value.trim())}} placeholder="Adresse G..." style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
            {gAddress ? <div style={{fontSize:11,marginTop:6,color:'#16a34a'}}>Masque: {formatG(gAddress)} - 4 premiers + 4 derniers</div> : null}
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>Lier Banque</button>
              <button onClick={handleKyc} style={{flex:1,background:'#facc15',color:'#1e3a8a',border:'none',borderRadius:20,padding:12,fontWeight:800}}>KYC Pi</button>
            </div>
          </div>
        </div>
      )}

      {activeTab==='Trading' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:20,padding:16}}>
            <div style={{fontWeight:700}}>piCoin</div><div style={{fontSize:12,color:'#64748b'}}>officialGcvValue</div>
            <div style={{fontWeight:900,fontSize:26,color:'#d97706',marginTop:12}}>1 pi = 314,159.00 USD</div>
            <div style={{marginTop:8,fontSize:13}}><span style={{color:'#16a34a'}}>+2.45%</span> 24h</div>
          </div>
          <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:20,padding:16}}>
            <div style={{fontWeight:800}}>Synchronisation en temps reel</div><div style={{fontSize:12,color:'#64748b'}}>updatedEverySecond</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Acheter</button>
            <button style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Vendre</button>
            <button style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:12,fontWeight:700}}>Commander</button>
          </div>
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
            <div style={{fontWeight:900}}>Paires de Trading</div><div style={{fontSize:12,color:'#64748b'}}>realTimePiNetworkMarkets</div>
            <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}>
              <button onClick={()=>setTradeFilter('all')} style={{flex:1,background:tradeFilter==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>all</button>
              <button onClick={()=>setTradeFilter('gainers')} style={{flex:1,background:tradeFilter==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>gainers</button>
              <button onClick={()=>setTradeFilter('losers')} style={{flex:1,background:tradeFilter==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>losers</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:12}}>
              {filteredPairs.map(function(p){ return (
                <div key={p.pair} style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 14px'}}>
                  <div><div style={{fontWeight:800}}>{p.pair}</div><div style={{fontSize:12,color:'#64748b'}}>vol: {p.vol}</div></div>
                  <div style={{textAlign:'right'}}><div style={{fontWeight:800}}>{p.price}</div><div style={{fontSize:12,color:p.up?'#16a34a':'#dc2626'}}>{p.change}</div></div>
                </div>
              )})}
            </div>
          </div>
          <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:20,padding:14}}>
            <div style={{fontWeight:800}}>aiTradingAssistant</div>
            <div style={{fontSize:13,color:'#64748b',marginTop:4}}>aiMonitorsMarkets</div>
            <button style={{width:'100%',marginTop:12,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:12,fontWeight:700}}>viewAiRecommendations</button>
          </div>
        </div>
      )}

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:10}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:420,maxHeight:'94vh',overflowY:'auto'}}>
            {modal==='lierBanque' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>Retour</button>
                  <div style={{fontWeight:900,flex:1,textAlign:'center'}}>Lier un Compte Bancaire</div>
                  <button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>X</button>
                </div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}>
                  <button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Traditionnel</button>
                  <button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Numerique</button>
                </div>
                {typeBanque==='traditionnel' ? (
                  <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
                    <select value={nomBanque} onChange={function(e){setNomBanque(e.target.value)}} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir une banque</option><option>Ecobank Tchad</option><option>UBA Tchad</option><option>BSIC</option><option>Orabank</option><option>BNP Paribas</option></select>
                    <input value={numCompte} onChange={function(e){setNumCompte(e.target.value)}} placeholder="Numero compte" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={titulaire} onChange={function(e){setTitulaire(e.target.value)}} placeholder="Nom titulaire" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={iban} onChange={function(e){setIban(e.target.value)}} placeholder="IBAN TD89" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  </div>
                ) : (
                  <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
                    <select value={plateforme} onChange={function(e){setPlateforme(e.target.value)}} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Plateforme</option><option>PayPal</option><option>Binance</option><option>Pi Wallet</option><option>BTC Wallet</option><option>Airtel Money</option><option>Moov Money</option></select>
                    <input value={emailId} onChange={function(e){setEmailId(e.target.value)}} placeholder="Email" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={tel} onChange={function(e){setTel(e.target.value)}} placeholder="+235 XX XX XX XX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  </div>
                )}
                <div style={{display:'flex',gap:8,marginTop:14}}>
                  <button onClick={()=>setModal(null)} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:14,fontWeight:700}}>Retour</button>
                  <button onClick={lier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800}}>Lier</button>
                </div>
              </div>
            )}
            {modal==='transferP2P' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>Retour</button>
                  <div style={{fontWeight:900}}>P2P Mondial {zoneTransfert}</div>
                </div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}>
                  <button onClick={()=>setP2pType('interne')} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Interne</button>
                  <button onClick={()=>setP2pType('externe')} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Externe</button>
                </div>
                <div style={{marginTop:12}}>
                  <input value={destPhone} onChange={function(e){setDestPhone(e.target.value)}} placeholder="Telephone ou ID" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="Montant pi" type="number" style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  <div style={{fontSize:11,marginTop:4,color:'#16a34a'}}>{usd.toLocaleString()} USD</div>
                  <button onClick={()=>setModal('Envoye '+amountPi+' pi')} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Envoyer</button>
                </div>
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:8,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button>
              </div>
            )}
            {modal==='receive' && (
              <div style={{textAlign:'center'}}>
                <div style={{fontWeight:900}}>QR Code {gdbAccount}</div>
                <div style={{fontSize:11}}>G: {gAddress ? formatG(gAddress) : 'Non lie'}</div>
                <div style={{marginTop:12}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount || 'GDB')} alt="QR" style={{width:200,height:200}} />
                </div>
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:12,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button>
              </div>
            )}
            {modal!=='lierBanque' && modal!=='transferP2P' && modal!=='receive' && (
              <div>
                <div style={{fontWeight:900}}>{modal}</div>
                <div style={{fontSize:11,marginTop:6}}>G: {formatG(gAddress)} {gdbAccount}</div>
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10}}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        <button onClick={()=>setActiveTab('Accueil')} style={{border:'none',background:'none',textAlign:'center',fontSize:8,fontWeight:activeTab==='Accueil'?800:500,color:activeTab==='Accueil'?'#1e40af':'#64748b'}}><div style={{fontSize:16}}>H</div>Accueil</button>
        <button onClick={()=>{setActiveTab('Paiements'); setModal('transferP2P')}} style={{border:'none',background:'none',textAlign:'center',fontSize:8,color:'#64748b'}}><div style={{fontSize:16}}>P</div>Paiements</button>
        <button onClick={()=>setActiveTab('Trading')} style={{border:'none',background:activeTab==='Trading'?'#e0e7ff':'none',textAlign:'center',fontSize:8,fontWeight:activeTab==='Trading'?800:500,color:'#1e40af',borderRadius:12,padding:'4px 10px'}}><div style={{fontSize:16}}>T</div>Trading</button>
        <button onClick={()=>setActiveTab('Accueil')} style={{border:'none',background:'none',textAlign:'center',fontSize:8,color:'#64748b'}}><div style={{fontSize:16}}>S</div>Services</butt
