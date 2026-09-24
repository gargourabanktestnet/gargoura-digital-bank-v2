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
  const [nomBanque,setNomBanque]=useState('')
  const [numCompte,setNumCompte]=useState('')
  const [titulaire,setTitulaire]=useState('')
  const [iban,setIban]=useState('')
  const [plateforme,setPlateforme]=useState('')
  const [emailId,setEmailId]=useState('')
  const [tel,setTel]=useState('')
  const [p2pType,setP2pType]=useState('interne')
  const [destPhone,setDestPhone]=useState('')
  const [note,setNote]=useState('')
  const [banquePartenaire,setBanquePartenaire]=useState('')
  const [numCompteExt,setNumCompteExt]=useState('')
  const [typeDevise,setTypeDevise]=useState('crypto')
  const [zoneTransfert,setZoneTransfert]=useState('CEMAC')
  const [tradeFilter,setTradeFilter]=useState('all')
  const [logoError,setLogoError]=useState(false)

  useEffect(()=>{
    try{
      const a=localStorage.getItem('gdb_account')
      const g=localStorage.getItem('pi_g_address')
      const p=localStorage.getItem('pi_user')
      if(a) setGdbAccount(a)
      if(g) setGAddress(g)
      if(p) setKyc(true)
    }catch(e){}
  },[])

  function doKyc(){
    const newGDB = gdbAccount || genGDB()
    setGdbAccount(newGDB)
    setKyc(true)
    localStorage.setItem('gdb_account',newGDB)
    localStorage.setItem('pi_user','verified')
    setModal('KYC Pi Verifie - '+newGDB)
  }

  function doLier(){
    const newGDB = gdbAccount || genGDB()
    if(gAddress) localStorage.setItem('pi_g_address',gAddress)
    localStorage.setItem('gdb_account',newGDB)
    setGdbAccount(newGDB)
    setModal('Compte lie: '+newGDB+' G: '+formatG(gAddress))
  }

  const usdStr = (parseFloat(amountPi||'0')*GCV).toLocaleString()
  const pairs=[
    {pair:'PI/USDT',price:'314165.35',vol:'1.2M',chg:'+2.45%',up:true},
    {pair:'PI/BTC',price:'3.31',vol:'850K',chg:'-0.82%',up:false},
    {pair:'PI/ETH',price:'89.76',vol:'920K',chg:'+1.23%',up:true},
    {pair:'PI/SOL',price:'1745.36',vol:'680K',chg:'+3.67%',up:true},
    {pair:'PI/XLM',price:'897641.14',vol:'420K',chg:'+0.95%',up:true},
    {pair:'PI/XRP',price:'149596.88',vol:'780K',chg:'+2.18%',up:true},
    {pair:'PI/USDC',price:'314158.36',vol:'1.1M',chg:'+0.12%',up:true},
    {pair:'PI/BNB',price:'505.90',vol:'620K',chg:'+1.89%',up:true},
  ]
  const filtered = tradeFilter==='all'?pairs: tradeFilter==='gainers'?pairs.filter(function(p){return p.up}):pairs.filter(function(p){return !p.up})

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:0,display:'flex',flexDirection:'column',fontFamily:'system-ui',paddingBottom:85}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'10px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:10}}>
        <div style={{width:30,height:30,background:'#fff',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',color:'#1e40af',fontWeight:900}}>G</div>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:16}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <div style={{display:'flex',gap:10,fontSize:18}}><span>⚙️</span><span>👤</span><span>🌐</span><span>🔔<span style={{background:'red',borderRadius:10,fontSize:9,padding:'1px 4px',marginLeft:2}}>3</span></span></div>
      </div>

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError ? (
            <img 
              src="/logo.png" 
              alt="GDB Logo Or" 
              onError={()=>setLogoError(true)}
              style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:'3px solid #facc15',boxShadow:'0 0 15px rgba(250,204,21,0.6)'}} 
            />
          ) : (
            <div style={{width:110,height:110,background:'linear-gradient(135deg,#1e3a8a,#facc15)',borderRadius:55,border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:28,boxShadow:'0 0 15px rgba(250,204,21,0.6)'}}>GDB</div>
          )}
          <div style={{fontWeight:900,fontSize:20,color:'#1e3a8a',marginTop:10}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontWeight:800,fontSize:11,color:'#a16207',textAlign:'center'}}>GDB • WEB3.0 • PI NETWORK • GCV {GCV}$ • BANQUE MONDIALE</div>
          <div style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
            <button onClick={doKyc} style={{background:kyc?'#16a34a':'#e2e8f0',color:kyc?'#fff':'#1e40af',border:'1px solid #cbd5e1',padding:'6px 12px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?'● KYC Verifie':'● KYC Pi Cliquer'}</button>
            {gdbAccount ? <div style={{background:'#1e40af',color:'#fff',padding:'6px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div> : null}
          </div>
          {gAddress ? <div style={{marginTop:8,fontSize:11,background:'#f1f5f9',padding:'6px 10px',borderRadius:10}}>G: {formatG(gAddress)} ({gAddress.length} chars masques)</div> : null}
        </div>

        <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
          <div style={{fontSize:12,opacity:0.9}}>Solde Total • {gdbAccount || 'Non lie'} • 1 π = {GCV.toLocaleString()} USD</div>
          <div style={{fontWeight:900,fontSize:26,marginTop:6}}>1 π = {GCV.toLocaleString()},00 USD</div>
          <div style={{fontSize:11,opacity:0.8,marginTop:4}}>Banque Mondiale: Traditionnelle + Numerique + CBDC e-CFA e-EUR</div>
          <div style={{display:'flex',gap:10,marginTop:14}}>
            <button onClick={()=>setModal('transferP2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
            <button onClick={()=>setModal('receive')} style={{flex:1,background:'#fff',color:'#1e40af',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
          <div style={{fontWeight:900}}>Aperçu du Compte</div>
          <div style={{color:'#64748b',fontSize:12,marginTop:4}}>{gdbAccount || 'Creez via KYC'} • G: {gAddress ? formatG(gAddress) : 'Non lie'} • Verifie GCV • {kyc?'KYC OK':'KYC requis'}</div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
          <div style={{fontWeight:900,marginBottom:12}}>Fonctionnalités Courantes</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            <button onClick={()=>setModal('transferP2P')} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>Transférer</button>
            <button onClick={()=>setModal('lierBanque')} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>Lier Banque</button>
            <button onClick={()=>setTab('Trading')} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>Trading</button>
            <button onClick={()=>setModal('convert')} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>Convertir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
          <div style={{fontWeight:900,fontSize:16}}>Comptes Bancaires</div>
          <input value={gAddress} onChange={e=>setGAddress(e.target.value)} placeholder="Adresse G Stellar (G...)" style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
          {gAddress ? <div style={{fontSize:11,marginTop:6,color:'#16a34a'}}>Apercu masque: {formatG(gAddress)} - 4 premiers + 4 derniers visibles</div> : null}
          <div style={{display:'flex',gap:10,marginTop:12}}>
            <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
            <button onClick={doKyc} style={{flex:1,background:'#facc15',color:'#1e3a8a',border:'none',borderRadius:20,padding:12,fontWeight:800}}>🔒 KYC Pi</button>
          </div>
        </div>

        {tab==='Trading' && (
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:20,padding:16}}><div style={{fontWeight:700}}>piCoin</div><div style={{fontSize:12,color:'#64748b'}}>officialGcvValue</div><div style={{fontWeight:900,fontSize:26,color:'#d97706',marginTop:12}}>1 π = 314,159.00 USD</div><div style={{marginTop:8,fontSize:13}}><span style={{color:'#16a34a'}}>↗ +2.45%</span> 24h</div></div>
            <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:20,padding:16}}><div style={{fontWeight:800}}>Synchronisation en temps réel</div><div style={{fontSize:12,color:'#64748b'}}>updatedEverySecond</div></div>
            <div style={{display:'flex',gap:8}}><button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Acheter</button><button style={{flex:1,background:'#dc2626',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↘ Vendre</button><button style={{flex:1,background:'#fff',border:'1px solid #cbd5e1',borderRadius:20,padding:12}}>Commander</button></div>
            <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
              <div style={{fontWeight:900}}>Paires de Trading</div>
              <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}><button onClick={()=>setTradeFilter('all')} style={{flex:1,background:tradeFilter==='all'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>all</button><button onClick={()=>setTradeFilter('gainers')} style={{flex:1,background:tradeFilter==='gainers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>gainers</button><button onClick={()=>setTradeFilter('losers')} style={{flex:1,background:tradeFilter==='losers'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>losers</button></div>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:12}}>
                {filtered.map(function(p){ return (
                  <div key={p.pair} style={{display:'flex',justifyContent:'space-between',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 14px'}}>
                    <div><div style={{fontWeight:800}}>{p.pair}</div><div style={{fontSize:11,color:'#64748b'}}>vol: {p.vol}</div></div>
                    <div style={{textAlign:'right'}}><div style={{fontWeight:800}}>{p.price}</div><div style={{fontSize:11,color:p.up?'#16a34a':'#dc2626'}}>{p.chg}</div></div>
                  </div>
                )})}
              </div>
            </div>
            <button onClick={()=>setTab('Accueil')} style={{width:'100%',background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>← Retour Accueil</button>
          </div>
        )}
      </div>

      {modal ? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:10}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:420,maxHeight:'94vh',overflowY:'auto'}}>
            {modal==='lierBanque' ? (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}><button onClick={()=>setModal('')} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>←</button><div style={{fontWeight:900,flex:1,textAlign:'center'}}>Lier un Compte Bancaire</div><button onClick={()=>setModal('')} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:12}}><button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>🏛️ Traditionnel</button><button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>📱 Numérique</button></div>
                {typeBanque==='traditionnel' ? (
                  <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
                    <select value={nomBanque} onChange={e=>setNomBanque(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir une banque</option><option>Ecobank Tchad</option><option>UBA Tchad</option><option>BSIC</option><option>Orabank</option><option>BNP Paribas</option></select>
                    <input value={numCompte} onChange={e=>setNumCompte(e.target.value)} placeholder="Numero compte" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={titulaire} onChange={e=>setTitulaire(e.target.value)} placeholder="Nom titulaire" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={iban} onChange={e=>setIban(e.target.value)} placeholder="TD89..." style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  </div>
                ) : (
                  <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
                    <select value={plateforme} onChange={e=>setPlateforme(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Plateforme</option><option>PayPal</option><option>Binance</option><option>Pi Wallet</option><option>Airtel Money</option></select>
                    <input value={emailId} onChange={e=>setEmailId(e.target.value)} placeholder="Email" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                    <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+235" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                  </div>
                )}
                <div style={{display:'flex',gap:8,marginTop:14}}><button onClick={()=>setModal('')} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:14}}>← Retour</button><button onClick={doLier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800}}>Lier</button></div>
              </div>
            ) : modal==='transferP2P' ? (
              <div>
                <div style={{background:'#1e40af',color:'#fff',margin:-16,padding:16,borderRadius:'20px 20px 0 0',display:'flex',alignItems:'center',gap:10}}><button onClick={()=>setModal('')} style={{background:'rgba(255,255,255,0.2)',border:'none',borderRadius:20,width:30,height:30,color:'#fff'}}>←</button><div style={{fontWeight:900}}>P2P Mondial {zoneTransfert}</div></div>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:16}}><button onClick={()=>setP2pType('interne')} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Interne</button><button onClick={()=>setP2pType('externe')} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>Externe</button></div>
                <div style={{marginTop:12}}><input value={destPhone} onChange={e=>setDestPhone(e.target.value)} placeholder="Telephone ou ID" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={amountPi} onChange={e=>setAmountPi(e.target.value)} placeholder="0.00 pi" type="number" style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><div style={{fontSize:11,color:'#16a34a'}}>{usdStr} USD</div><button onClick={()=>setModal('Envoye '+amountPi+' pi')} style={{width:'100%',marginTop:10,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12}}>Envoyer</button></div>
                <button onClick={()=>setModal('')} style={{width:'100%',marginTop:8,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button>
              </div>
            ) : modal==='receive' ? (
              <div style={{textAlign:'center'}}><div style={{fontWeight:900}}>QR Code {gdbAccount}</div><div style={{fontSize:11}}>G: {gAddress ? formatG(gAddress) : 'Non lie'}</div><div style={{marginTop:12}}><img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount||'GDB')} alt="QR" style={{width:200,height:200}} /></div><button onClick={()=>setModal('')} style={{width:'100%',marginTop:12,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button></div>
            ) : (
              <div><div style={{fontWeight:900}}>{modal}</div><button onClick={()=>setModal('')} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10}}>Fermer</button></div>
            )}
          </div>
        </div>
      ) : null}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        <button onClick={()=>setTab('Accueil')} style={{border:'none',background:'none',fontSize:10,color:tab==='Accueil'?'#1e40af':'#64748b',fontWeight:tab==='Accueil'?800:400}}>🏠 Accueil</button>
        <button onClick={()=>setModal('transferP2P')} style={{border:'none',background:'none',fontSize:10,color:'#64748b'}}>↔️ Paiements</button>
        <button onClick={()=>setTab('Trading')} style={{border:'none',background:tab==='Trading'?'#e0e7ff':'none',fontSize:10,color:'#1e40af',borderRadius:12,padding:'4px 10px'}}>📈 Trading</button>
      </div>
    </div>
  )
}
