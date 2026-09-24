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

  const cryptos=[
    {name:'PiCoin', symbol:'π PiCoin', price:'314,159.00 USD', ref:true},
    {name:'Bitcoin', symbol:'BTC', price:'67,230.00 USD'},
    {name:'Ethereum', symbol:'ETH', price:'3,450.00 USD'},
    {name:'Tether', symbol:'USDT', price:'1.00 USD'},
    {name:'BNB', symbol:'BNB', price:'610.00 USD'},
    {name:'Solana', symbol:'SOL', price:'145.00 USD'},
    {name:'XRP', symbol:'XRP', price:'0.52 USD'},
    {name:'Cardano', symbol:'ADA', price:'0.45 USD'},
    {name:'Dogecoin', symbol:'DOGE', price:'0.12 USD'},
    {name:'Shiba', symbol:'SHIB', price:'0.00002 USD'},
    {name:'Litecoin', symbol:'LTC', price:'72.00 USD'},
  ]

  useEffect(function(){
    try{
      var a=localStorage.getItem('gdb_account')
      if(a) setGdbAccount(a)
      else { var n=genGDB(); setGdbAccount(n); localStorage.setItem('gdb_account',n) }
    }catch(e){ setGdbAccount(genGDB()) }
  },[])

  function openSection(s){
    setActive(s)
    if(s==='accueil'){ setShowMenu(false); setModal('') }
    else if(s==='transférer' || s==='transferer'){ setModal('transferer') }
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
          <div style={{width:'80%',background:'#fff',height:'100%',padding:14}}>
            <div style={{background:'#1e40af',color:'#fff',padding:12,borderRadius:12}}><div style={{fontWeight:900}}>{gdbAccount}</div></div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:14,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError ? (
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:80,height:80,borderRadius:40,border:'3px solid #facc15',objectFit:'cover'}} />
          ) : (
            <div style={{width:80,height:80,borderRadius:40,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>
          )}
          <div style={{fontWeight:900,marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#64748b'}}>{gdbAccount}</div>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:20,padding:16,color:'#fff'}}>
          <div style={{fontSize:13,opacity:0.9}}>Solde Total • {gdbAccount}</div>
          <div style={{fontWeight:900,fontSize:26,marginTop:10}}>1 pi = 314 159,00 USD</div>
          <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8}}>
            <div style={{width:8,height:8,background:'#22c55e',borderRadius:8}}></div>
            <div style={{fontSize:11,color:'#86efac',fontWeight:700}}>Le système est en ligne</div>
          </div>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button onClick={function(){openSection('transferer')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Aperçu du Compte Bancaire</div>
          <div style={{fontSize:11,color:'#1e40af',fontWeight:800,marginTop:4}}>{gdbAccount} • Unique</div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',marginTop:8,background:'#facc15',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Voir QR Code • {gdbAccount}</button>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900,fontSize:15}}>Fonctionnalités Courantes</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
            <button onClick={function(){openSection('transferer')}} style={{border:'2px solid #1e40af',background:'#eff6ff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>↔️</div><div style={{fontSize:9,fontWeight:700}}>Transférer</div></button>
            <button onClick={function(){setModal('virement')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>💳</div><div style={{fontSize:9,fontWeight:600}}>Virement Bancaire</div></button>
            <button onClick={function(){setModal('pidex')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>📈</div><div style={{fontSize:9,fontWeight:600}}>Pi DEX</div></button>
            <button onClick={function(){setModal('convertir')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>🔄</div><div style={{fontSize:9,fontWeight:600}}>Convertir</div></button>
            <button onClick={function(){openSection('trading')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>📊</div><div style={{fontSize:9,fontWeight:600}}>Trading</div></button>
            <button onClick={function(){setModal('aiAutomation')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>✨</div><div style={{fontSize:9,fontWeight:600}}>aiAutomation</div></button>
            <button onClick={function(){setModal('blockchain')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>⛓️</div><div style={{fontSize:9,fontWeight:600}}>blockchain</div></button>
            <button onClick={function(){setModal('shopping')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>🛍️</div><div style={{fontSize:9,fontWeight:600}}>Shopping</div></button>
            <button onClick={function(){setModal('portefeuilles')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>👛</div><div style={{fontSize:9,fontWeight:600}}>Portefeuilles</div></button>
            <button onClick={function(){setModal('automobile')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>🚗</div><div style={{fontSize:9,fontWeight:600}}>Automobile</div></button>
            <button onClick={function(){setModal('agregation')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>🗂️</div><div style={{fontSize:7,fontWeight:600}}>Agrégation de Comptes</div></button>
            <button onClick={function(){setModal('gestion')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18}}>📊</div><div style={{fontSize:7,fontWeight:600}}>Gestion Financière</div></button>
          </div>
        </div>

        <div style={{background:'#ede9fe',border:'1px solid #ddd6fe',borderRadius:16,padding:14}}>
          <button onClick={function(){setModal('assistantIA')}} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',color:'#fff',border:'none',borderRadius:24,padding:12,fontWeight:800}}>🤖 Assistant IA</button>
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
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#1e40af',color:'#fff',padding:10,borderRadius:12}}>
              <div style={{fontWeight:900,fontSize:12}}>{gdbAccount} • {modal}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:28,height:28}}>✕</button>
            </div>

            {modal==='transferer' && (
              <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:16,padding:4,marginBottom:12}}>
                  <div style={{flex:1,background:'#1e40af',color:'#fff',borderRadius:12,padding:8,textAlign:'center',fontWeight:800,fontSize:12}}>P2P Interne</div>
                </div>

                <div style={{fontWeight:900,fontSize:16}}>Transfert Interne Gargoura</div>
                <div style={{fontSize:11,color:'#64748b',marginTop:2}}>Compte source: {gdbAccount}</div>

                <div style={{marginTop:12}}>
                  <div style={{fontWeight:700,fontSize:12}}>Destinataire</div>
                  <input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="Numéro de Compte Bancaire ou ID" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6,fontSize:13}} />
                </div>

                <div style={{marginTop:12}}>
                  <div style={{fontWeight:700,fontSize:12}}>Cryptomonnaies</div>
                  <div style={{border:'1px solid #cbd5e1',borderRadius:12,marginTop:6,maxHeight:140,overflowY:'auto'}}>
                    {cryptos.map(function(c,i){
                      return (
                        <button key={i} onClick={function(){setCrypto(c.name)}} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',border:'none',borderBottom:'1px solid #f1f5f9',background:crypto===c.name?'#eff6ff':'#fff',textAlign:'left'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <div style={{width:28,height:28,background:c.ref?'#facc15':'#f1f5f9',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800}}>{c.symbol.charAt(0)}</div>
                            <div>
                              <div style={{fontWeight:800,fontSize:12}}>{c.symbol} {c.ref?'(Référence)':''}</div>
                              <div style={{fontSize:10,color:'#64748b'}}>{c.name}</div>
                            </div>
                          </div>
                          <div style={{fontSize:10,fontWeight:700,color:c.ref?'#1e40af':'#64748b'}}>{c.price}</div>
                        </button>
                      )
                    })}
                  </div>
                  <div style={{fontSize:11,marginTop:6,color:'#1e40af',fontWeight:700}}>Sélectionné: {crypto} • π PiCoin (314,159.00 USD) comme référence + 10 autres</div>
                </div>

                <div style={{marginTop:12}}>
                  <div style={{fontWeight:700,fontSize:12}}>Montant</div>
                  <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6,fontSize:14,fontWeight:700}} />
                </div>

                <div style={{marginTop:12}}>
                  <div style={{fontWeight:700,fontSize:12}}>Note (optionnel)</div>
                  <input value={note} onChange={function(e){setNote(e.target.value)}} placeholder="Ajouter une note" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1',marginTop:6,fontSize:13}} />
                </div>

                <button onClick={function(){setModal('Transfert '+amountPi+' '+crypto+' de '+gdbAccount+' vers '+dest+' - Note: '+note+' - Confirme')}} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:900}}>Envoyer</button>

                <div style={{marginTop:12,background:'#f8fafc',borderRadius:12,padding:10}}>
                  <div style={{fontSize:11,color:'#64748b'}}>• transfert instantané et interopérable</div>
                  <div style={{fontSize:11,color:'#64748b',marginTop:4}}>• transactions sécurisées de bout en bout</div>
                </div>
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
