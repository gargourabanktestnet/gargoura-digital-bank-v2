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
  const [dest,setDest]=useState('')
  const [note,setNote]=useState('')
  const [crypto,setCrypto]=useState('PiCoin')
  const [logoError,setLogoError]=useState(false)
  const [p2pType,setP2pType]=useState('interne')
  const [zone,setZone]=useState('CEMAC')
  const [banquePart,setBanquePart]=useState('')
  const [compteExt,setCompteExt]=useState('')

  const funcs=[
    {id:'transferer',label:'Transférer',icon:'↔️',color:'#2563eb'},
    {id:'virement',label:'Virement Bancaire',icon:'💳',color:'#2563eb'},
    {id:'pidex',label:'Pi DEX',icon:'📈',color:'#a855f7'},
    {id:'convertir',label:'Convertir',icon:'🔄',color:'#16a34a'},
    {id:'trading',label:'Trading',icon:'📊',color:'#16a34a'},
    {id:'aiAutomation',label:'aiAutomation',icon:'✨',color:'#a855f7'},
    {id:'blockchain',label:'blockchain',icon:'⛓️',color:'#2563eb'},
    {id:'shopping',label:'Shopping',icon:'🛍️',color:'#ec4899'},
    {id:'portefeuilles',label:'Portefeuilles',icon:'👛',color:'#0ea5e9'},
    {id:'automobile',label:'Automobile',icon:'🚗',color:'#3b82f6'},
    {id:'agregation',label:'Agrégation de Comptes',icon:'🗂️',color:'#6366f1'},
    {id:'gestion',label:'Gestion Financière',icon:'📊',color:'#22c55e'},
  ]

  const banksByZone={
    'CEMAC':['Afriland First Bank','Ecobank CEMAC','UBA Cameroun','BICEC','SCB','BGFIBank'],
    'UEMOA':['Ecobank UEMOA','BOA UEMOA','UBA Senegal','BCEAO','Coris Bank','NSIA Banque'],
    'Dollar':['JPMorgan Chase','Bank of America','Citibank','Wells Fargo','Goldman Sachs'],
    'Jordanie':['Arab Bank Jordanie','Housing Bank','Jordan Islamic Bank','Cairo Amman Bank'],
    'Golfe':['Dubai Islamic Bank','Qatar National Bank','National Bank Kuwait','FAB','Al Rajhi Bank'],
    'Moyen-Orient':['Arab Bank','Bank Audi','National Bank Egypt','Bank Melli'],
    'International':['SWIFT Global','SEPA Europe','HSBC International','Standard Chartered']
  }

  const cryptos=['π PiCoin (314,159.00 USD)','BTC','ETH','USDT','BNB','SOL']

  useEffect(function(){
    try{var a=localStorage.getItem('gdb_account'); if(a) setGdbAccount(a); else {var n=genGDB(); setGdbAccount(n); localStorage.setItem('gdb_account',n)} }catch(e){ setGdbAccount(genGDB()) }
  },[])

  function openSection(s){ setActive(s); if(s==='accueil'){ setShowMenu(false); setModal('') } else { setModal(s) } }

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11}}>Gargoura Digital Bank • {gdbAccount}</div></div>
      </div>

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:14,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError? (<img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:80,height:80,borderRadius:40,border:'3px solid #facc15'}} />) : (<div style={{width:80,height:80,borderRadius:40,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>)}
          <div style={{fontWeight:900,marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10}}>{gdbAccount} • Unique par utilisateur</div>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:20,padding:16,color:'#fff'}}>
          <div style={{fontSize:13}}>Solde Total • {gdbAccount}</div>
          <div style={{fontWeight:900,fontSize:26,marginTop:10}}>1 pi = 314 159,00 USD</div>
          <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8}}><div style={{width:8,height:8,background:'#22c55e',borderRadius:8}}></div><div style={{fontSize:11,color:'#86efac',fontWeight:700}}>Le système est en ligne</div></div>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button onClick={function(){openSection('transferer')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Aperçu du Compte Bancaire</div>
          <div style={{fontSize:11,color:'#1e40af',fontWeight:800,marginTop:4}}>{gdbAccount} • GDB different par utilisateur • QR lié</div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',marginTop:8,background:'#facc15',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Voir QR Code</button>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900,fontSize:15}}>Fonctionnalités Courantes • {funcs.length}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
            {funcs.map(function(f){
              return (<button key={f.id} onClick={function(){openSection(f.id)}} style={{border:f.id==='transferer'?'2px solid #1e40af':'1px solid #e2e8f0',background:f.id==='transferer'?'#eff6ff':'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>{f.icon}</div><div style={{fontSize:8,fontWeight:700,textAlign:'center'}}>{f.label}</div></button>)
            })}
          </div>
        </div>

        <div style={{background:'#ede9fe',border:'1px solid #ddd6fe',borderRadius:16,padding:14}}>
          <button onClick={function(){setModal('assistantIA')}} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',color:'#fff',border:'none',borderRadius:24,padding:12,fontWeight:800}}>🤖 Assistant IA</button>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Comptes Bancaires</div>
          <div style={{fontSize:11,color:'#64748b'}}>{gdbAccount} • Gerez vos comptes</div>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:'6px 2px 8px 2px',zIndex:40}}>
        <button onClick={function(){openSection('accueil')}} style={{border:'none',background:active==='accueil'?'#dbeafe':'none',fontSize:9,color:active==='accueil'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏠</div>Accueil</button>
        <button onClick={function(){openSection('transferer')}} style={{border:'none',background:active==='paiements'?'#dbeafe':'none',fontSize:9,color:active==='paiements'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>↔️</div>Paiements</button>
        <button onClick={function(){openSection('trading')}} style={{border:'none',background:active==='trading'?'#dbeafe':'none',fontSize:9,color:active==='trading'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>📈</div>Trading</button>
        <button onClick={function(){openSection('services')}} style={{border:'none',background:active==='services'?'#dbeafe':'none',fontSize:9,color:active==='services'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏛️</div>Services</button>
        <button onClick={function(){openSection('innovation')}} style={{border:'none',background:active==='innovation'?'#dbeafe':'none',fontSize:9,color:active==='innovation'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>✨</div>Innovation</button>
        <button onClick={function(){openSection('securite')}} style={{border:'none',background:active==='securite'?'#dbeafe':'none',fontSize:9,color:active==='securite'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🛡️</div>Securite</button>
        <button onClick={function(){openSection('support')}} style={{border:'none',background:active==='support'?'#dbeafe':'none',fontSize:9,color:active==='support'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>❓</div>Support</button>
      </div>

      {modal? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:60,display:'flex',alignItems:'flex-end'}}>
          <div style={{background:'#f8fafc',width:'100%',borderRadius:'20px 20px 0 0',padding:12,maxHeight:'92vh',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1e40af',color:'#fff',padding:10,borderRadius:12}}><div style={{fontWeight:900,fontSize:11}}>{gdbAccount} • {modal}</div><button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:28,height:28}}>✕</button></div>

            {modal==='transferer' && (
              <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:16,padding:4,marginBottom:12}}>
                  <button onClick={function(){setP2pType('interne')}} style={{flex:1,background:p2pType==='interne'?'#1e40af':'transparent',color:p2pType==='interne'?'#fff':'#64748b',border:'none',borderRadius:12,padding:8,fontWeight:800,fontSize:12}}>P2P Interne</button>
                  <button onClick={function(){setP2pType('externe')}} style={{flex:1,background:p2pType==='externe'?'#1e40af':'transparent',color:p2pType==='externe'?'#fff':'#64748b',border:'none',borderRadius:12,padding:8,fontWeight:800,fontSize:12}}>P2P Externe</button>
                </div>

                {p2pType==='interne'? (
                  <div>
                    <div style={{fontWeight:900}}>Transfert Interne Gargoura</div>
                    <div style={{fontSize:11,color:'#64748b'}}>{gdbAccount}</div>
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Destinataire - Numéro de Compte Bancaire ou ID</div>
                    <input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="Numéro de Compte Bancaire ou ID" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6}} />
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Cryptomonnaies - π PiCoin (314,159.00 USD) comme référence + 10 autres</div>
                    <select value={crypto} onChange={function(e){setCrypto(e.target.value)}} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6}}>{cryptos.map(function(c,i){ return (<option key={i} value={c}>{c}</option>) })}</select>
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Montant - 0.00</div>
                    <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6}} />
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Note (optionnel)</div>
                    <input value={note} onChange={function(e){setNote(e.target.value)}} placeholder="Ajouter une note" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6}} />
                    <button onClick={function(){setModal('Transfert interne '+amountPi+' '+crypto+' de '+gdbAccount+' vers '+dest+' Note:'+note)}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Envoyer</button>
                    <div style={{marginTop:10,fontSize:11,color:'#64748b'}}>• transfert instantané et interopérable<br/>• transactions sécurisées de bout en bout</div>
                  </div>
                ) : (
                  <div>
                    <div style={{fontWeight:900}}>P2P Externe</div>
                    <div style={{marginTop:10,fontWeight:800,fontSize:13}}>Zone de Transfert</div>
                    <div style={{display:'flex',flexDirection:'column',gap:6,marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:8}}>
                      {['CEMAC','UEMOA','Dollar','Jordanie','Golfe','Moyen-Orient','International'].map(function(z){ return (<button key={z} onClick={function(){setZone(z); setBanquePart('')}} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',border:'none',borderRadius:10,background:zone===z?'#1e40af':'#f8fafc',color:zone===z?'#fff':'#334155',textAlign:'left',fontSize:13}}><div style={{width:10,height:10,borderRadius:5,background:zone===z?'#facc15':'#cbd5e1'}}></div>- {z}</button>) })}
                    </div>
                    <div style={{marginTop:14}}><div style={{fontWeight:900}}>Transfert Externe</div><div style={{fontSize:11,color:'#16a34a',fontWeight:700}}>Conforme ISO 20022 • SWIFT • SEPA</div></div>
                    <div style={{marginTop:12,fontWeight:800,fontSize:12}}>BANQUE PARTENAIRE - Choisir une banque - liste des Banques de la Zone {zone}</div>
                    <div style={{border:'1px solid #cbd5e1',borderRadius:12,marginTop:6,maxHeight:120,overflowY:'auto'}}>{(banksByZone[zone]||[]).map(function(b){ return (<button key={b} onClick={function(){setBanquePart(b)}} style={{width:'100%',padding:'10px 12px',border:'none',borderBottom:'1px solid #f1f5f9',background:banquePart===b?'#eff6ff':'#fff',textAlign:'left',fontSize:12}}>{banquePart===b?'✓ ':''}{b}</button>) })}</div>
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Entrer le numéro de compte</div>
                    <input value={compteExt} onChange={function(e){setCompteExt(e.target.value)}} placeholder="Numéro de compte" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6}} />
                    <div style={{marginTop:10,fontWeight:700,fontSize:12}}>Cryptomonnaies et Devises Locales - π PiCoin (314,159.00 USD) - 0.00 - Transfert instantané via système interopérable</div>
                    <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6,fontWeight:800}} />
                    <button onClick={function(){setModal('sendToExternalBank: '+amountPi+' PiCoin de '+gdbAccount+' vers '+banquePart+' zone '+zone+' compte '+compteExt)}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>sendToExternalBank</button>
                  </div>
                )}
              </div>
            )}

            {modal==='receive' && (
              <div style={{textAlign:'center',marginTop:10,background:'#fff',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>{gdbAccount}</div>
                <div style={{marginTop:10,display:'inline-block',border:'2px solid #facc15',borderRadius:12,padding:10}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount)} alt="QR" style={{width:200,height:200}} />
                </div>
              </div>
            )}

            <button onClick={function(){setModal(''); setActive('accueil')}} style={{width:'100%',marginTop:10,background:'#f1f5f9',border:'none',borderRadius:12,padding:10}}>Retour Accueil • {gdbAccount}</button>
          </div>
        </div>
      ) : null}
    </div>
  )
    }
