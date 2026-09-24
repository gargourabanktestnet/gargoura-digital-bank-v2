'use client'
import { useState, useEffect } from 'react'
declare global { interface Window { Pi:any } }
function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }
const GCV = 314159
function formatG(addr:string){ if(!addr || addr.length<8) return addr; return addr.slice(0,4)+'...'+addr.slice(-4) }

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [piUser,setPiUser]=useState<any>(null)
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState<string|null>(null)
  const [amountPi,setAmountPi]=useState('')
  const [activeTab,setActiveTab]=useState('Accueil')
  const [typeBanque,setTypeBanque]=useState<'traditionnel'|'numerique'>('traditionnel')
  const [nomBanque,setNomBanque]=useState('')
  const [numCompte,setNumCompte]=useState('')
  const [titulaire,setTitulaire]=useState('')
  const [iban,setIban]=useState('')
  const [plateforme,setPlateforme]=useState('')
  const [emailId,setEmailId]=useState('')
  const [tel,setTel]=useState('')
  const [p2pType,setP2pType]=useState<'interne'|'externe'>('interne')
  const [destPhone,setDestPhone]=useState('')
  const [note,setNote]=useState('')
  const [banquePartenaire,setBanquePartenaire]=useState('')
  const [numCompteExt,setNumCompteExt]=useState('')
  const [typeDevise,setTypeDevise]=useState<'crypto'|'locale'>('crypto')
  const [zoneTransfert,setZoneTransfert]=useState('CEMAC')
  const [tradeFilter,setTradeFilter]=useState<'all'|'gainers'|'losers'>('all')

  useEffect(()=>{
    const savedGDB=localStorage.getItem('gdb_account')
    const savedG=localStorage.getItem('pi_g_address')
    const savedPi=localStorage.getItem('pi_user')
    if(savedGDB) setGdbAccount(savedGDB)
    if(savedG) setGAddress(savedG)
    if(savedPi){ setPiUser(JSON.parse(savedPi)); setKyc(true) }
    const s=document.createElement('script'); s.src='https://sdk.minepi.com/pi-sdk.js'; s.onload=()=>{ try{window.Pi?.init({version:'2.0',sandbox:true})}catch(e){} }; document.head.appendChild(s)
  },[])

  const handleKyc = async () =>{
    try{
      if(!window.Pi){ alert('Ouvrez dans Pi Browser'); return }
      const auth = await window.Pi.authenticate(['username','payments'], ()=>{})
      setPiUser(auth.user); setKyc(true)
      localStorage.setItem('pi_user', JSON.stringify(auth.user))
      const newGDB = gdbAccount || genererGDB()
      setGdbAccount(newGDB); localStorage.setItem('gdb_account', newGDB)
      setModal('KYC Pi verifie: '+auth.user.username+' lie a '+newGDB)
    }catch(e){ alert('KYC Pi echoue - mode test active'); setKyc(true); const newGDB = gdbAccount || genererGDB(); setGdbAccount(newGDB); localStorage.setItem('gdb_account', newGDB) }
  }

  const lier = () =>{
    if(typeBanque==='traditionnel'){
      if(!nomBanque || !numCompte || !titulaire){ alert('Remplissez Banque, Numéro et Titulaire'); return }
      const newGDB = gdbAccount || genererGDB(); localStorage.setItem('gdb_account',newGDB); if(gAddress) localStorage.setItem('pi_g_address',gAddress); setGdbAccount(newGDB); setModal('Succes: '+nomBanque+' lie a '+newGDB)
    } else {
      if(!plateforme || !emailId){ alert('Remplissez Plateforme et Email'); return }
      const newGDB = gdbAccount || genererGDB(); localStorage.setItem('gdb_account',newGDB); setGdbAccount(newGDB); setModal('Verification envoyee a '+emailId)
    }
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
  const filteredPairs = tradeFilter==='all' ? tradingPairs : tradeFilter==='gainers' ? tradingPairs.filter(p=>p.up) : tradingPairs.filter(p=>!p.up)

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',padding:0,display:'flex',flexDirection:'column',fontFamily:'system-ui',paddingBottom:80}}>
      {/* HEADER COMME CAPTURE */}
      <div style={{background:'#1e40af',color:'#fff',padding:'10px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:20}}>
        <button onClick={()=>setModal(null)} style={{background:'rgba(255,255,255,0.15)',border:'none',borderRadius:20,width:32,height:32,color:'#fff'}}>←</button>
        <div style={{width:30,height:30,background:'#fff',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>🏦</div>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:16}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <div style={{display:'flex',gap:12,alignItems:'center',fontSize:18}}><span>⚙️</span><span>👤</span><span>🌐</span><span style={{position:'relative'}}>🔔<span style={{position:'absolute',top:-6,right:-8,background:'red',color:'#fff',fontSize:9,borderRadius:10,padding:'1px 5px'}}>3</span></span></div>
      </div>

      {activeTab==='Accueil' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img src="/logo.png" alt="GDB" style={{width:90,height:90,borderRadius:'50%',objectFit:'cover',border:'3px solid #1e3a8a'}} />
            <div style={{fontWeight:900,fontSize:18,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
            <div style={{fontWeight:700,fontSize:10,color:'#a16207',textAlign:'center',marginTop:2}}>GDB • PI NETWORK • GCV {GCV}$ • MONDIALE</div>
            <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
              <button onClick={handleKyc} style={{background:kyc?'#16a34a':'#f1f5f9',color:kyc?'#fff':'#1e40af',border:'1px solid #cbd5e1',padding:'6px 12px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?'● KYC Vérifié '+(piUser?.username||''):'● KYC Pi - Cliquer'}</button>
              {gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'6px 12px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}
            </div>
            {gAddress && <div style={{marginTop:8,fontSize:11,background:'#f1f5f9',padding:'6px 10px',borderRadius:10}}>G: {formatG(gAddress)} <span style={{fontSize:9,color:'#64748b'}}>({gAddress.length} chars masqués)</span></div>}
          </div>

          <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
            <div style={{fontSize:12,opacity:0.9}}>Solde Total • {gdbAccount || 'Non lié'} • 1 π = {GCV.toLocaleString()} USD</div>
            <div style={{fontWeight:900,fontSize:24,marginTop:6}}>1 π = {GCV.toLocaleString()},00 USD</div>
            <div style={{display:'flex',gap:10,marginTop:14}}>
              <button onClick={()=>setModal('transferP2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer P2P</button>
              <button onClick={()=>setModal('receive')} style={{flex:1,background:'#fff',color:'#1e40af',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
            </div>
          </div>

          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
            <div style={{fontWeight:900}}>Aperçu du Compte</div>
            <div style={{color:'#64748b',fontSize:12,marginTop:4}}>{gdbAccount || 'Créez GDB via KYC'} • G: {gAddress?formatG(gAddress):'Non lié'} • Vérifié GCV • {kyc?'KYC OK':'KYC requis'}</div>
          </div>

          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
            <div style={{fontWeight:900,marginBottom:12}}>Fonctionnalités Courantes</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
              {[{id:'transferP2P',label:'Transférer'},{id:'lierBanque',label:'Lier Banque'},{id:'convert',label:'Convertir'},{id:'trading',label:'Trading'}].map(f=>(
                <button key={f.id} onClick={()=>{setActiveTab(f.id==='trading'?'Trading':f.id==='transferP2P'?'Paiements':'Accueil'); if(f.id!=='trading') setModal(f.id)}} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>{f.label}</button>
              ))}
            </div>
          </div>

          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
            <div style={{fontWeight:900,fontSize:16}}>Comptes Bancaires</div>
            <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="Collez adresse G..." style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
            {gAddress && <div style={{fontSize:11,marginTop:6,color:'#16a34a'}}>Aperçu masqué: {formatG(gAddress)} - 4 premiers + 4 derniers visibles</div>}
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
              <button onClick={handleKyc} style={{flex:1,background:'#facc15',color:'#1e3a8a',border:'none',borderRadius:20,padding:12,fontWeight:800}}>🔒 KYC Pi</button>
            </div>
          </div>
        </div>
      )}

      {activeTab==='Trading' && (
        <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
          <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:20,padding:16}}>
            <div style={{fontWeight:700,fontSize:14}}>piCoin</div><div style={{fontSize:12,color:'#64748b'}}>officialGcvValue</div>
            <div style={{fontWeight:900,fontSize:26,color:'#d97706',marginTop:12}}>1 π = 314,159.00<br/>USD</div>
            <div style={{display:'flex',gap:6,marginTop:8,alignItems:'center',fontSize:13}}><span style={{color:'#16a34a'}}>↗ +2.45%</span><span style={{color:'#64748b'}}>24h</span></div>
          </div>
          <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:20,padding:16,display:'flex',gap:10,alignItems:'center'}}>
            <div style={{color:'#16a34a'}}>📈</div><div><div style={{fontWeight:800,fontSize:14}}>Synchronisation en temps réel</div><div style={{fontSize:12,color:'#64748b'}}>updatedEverySecond</div></div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Acheter</button>
            <button style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↘ Vendre</button>
            <button style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:12,fontWeight:700}}>📈 Commander</button>
          </div>
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
            <div style={{fontWeight:900,fontSize:16}}>Paires de Trading</div><div style={{fontSize:12,color:'#64748b',marginTop:2}}>realTimePiNetworkMarkets</div>
            <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}>
              <button onClick={()=>setTradeFilter('all')} style={{flex:1,background:tradeFilter==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,fontSize:13,boxShadow:tradeFilter==='all'?'0 1px 4px rgba(0,0,0,0.1)':''}}>all</button>
              <button onClick={()=>setTradeFilter('gainers')} style={{flex:1,background:tradeFilter==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,fontSize:13}}>gainers</button>
              <button onClick={()=>setTradeFilter('losers')} style={{flex:1,background:tradeFilter==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,fontSize:13}}>losers</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:12}}>
              {filteredPairs.map(p=>(
                <div key={p.pair} style={{display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 14px'}}>
                  <div><div style={{fontWeight:800,fontSize:14}}>{p.pair}</div><div style={{fontSize:12,color:'#64748b'}}>vol: {p.vol}</div></div>
                  <div style={{textAlign:'right'}}><div style={{fontWeight:800,fontSize:14}}>{p.price}</div><div style={{fontSize:12,color:p.up?'#16a34a':'#dc2626',fontWeight:700}}>{p.up?'↗':'↘'} {p.change}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:20,padding:14}}>
            <div style={{fontWeight:800,display:'flex',gap:8}}><span>🧠</span> aiTradingAssistant</div>
            <div style={{fontSize:13,color:'#64748b',marginTop:8}}>aiMonitorsMarkets</div>
            <button style={{width:'100%',marginTop:12,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:12,fontWeight:700}}>🧠 viewAiRecommendations</button>
          </div>
        </div>
      )}

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:10}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:420,maxHeight:'94vh',overflowY:'auto'}}>
            {modal==='lierBanque' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}><button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:30,height:30}}>←</button><div style={{fontWeight:900,fontSize:16,flex:1,textAlign:'center'}}>Lier un Compte Bancaire</div><button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div>
                <div style={{fontSize:12,color:'#64748b',textAlign:'center',marginTop:6}}>Connectez vos comptes traditionnels ou numériques</div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}><button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Traditionnel</button><button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Numérique</button></div>
                {typeBanque==='traditionnel' ? <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}><select value={nomBanque} onChange={e=>setNomBanque(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir une banque</option><option>Ecobank Tchad</option><option>UBA Tchad</option><option>BSIC</option><option>Orabank</option><option>BNP Paribas</option></select><input value={numCompte} onChange={e=>setNumCompte(e.target.value)} placeholder="XXXX XXXX XXXX XXXX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={titulaire} onChange={e=>setTitulaire(e.target.value)} placeholder="Nom complet" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={iban} onChange={e=>setIban(e.target.value)} placeholder="TD89..." style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div> : <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}><select value={plateforme} onChange={e=>setPlateforme(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir plateforme</option><option>PayPal</option><option>Binance</option><option>Pi Wallet</option><option>BTC Wallet</option><option>Airtel Money</option><option>Moov Money</option></select><input value={emailId} onChange={e=>setEmailId(e.target.value)} placeholder="votre@email.com" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+235 XX XX XX XX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>}
                <div style={{display:'flex',gap:8,marginTop:14}}><button onClick={()=>setModal(null)} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:14,fontWeight:700}}>← Retour</button><button onClick={lier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800}}>Lier</button></div>
              </div>
            )}
            {modal==='transferP2P' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}><button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:30,height:30}}>←</button><div style={{fontWeight:900}}>P2P Mondial</div></div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}><button onClick={()=>setP2pType('interne')} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Interne</button><button onClick={()=>setP2pType('externe')} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Externe</button></div>
                {p2pType==='interne' ? <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}><input value={destPhone} onChange={e=>setDestPhone(e.target.value)} placeholder="Téléphone ou ID" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={amountPi} onChange={e=>setAmountPi(e.target.value)} placeholder="0.00 pi" type="number" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><button onClick={()=>setModal('Envoye '+amountPi+' pi a '+destPhone)} style={{width:'100%',background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Envoyer</button></div> : <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}><select value={zoneTransfert} onChange={e=>setZoneTransfert(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option>CEMAC</option><option>UEMOA</option><option>DOLLAR</option><option>JORDANIE GOLF</option><option>MOYEN-ORIENT</option><option>INTERNATIONAL</option></select><select value={banquePartenaire} onChange={e=>setBanquePartenaire(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Banque partenaire</option><option>Ecobank</option><option>UBA</option><option>Bank of Jordan</option><option>Emirates NBD</option></select><input value={numCompteExt} onChange={e=>setNumCompteExt(e.target.value)} placeholder="Numéro compte" style={{widt
