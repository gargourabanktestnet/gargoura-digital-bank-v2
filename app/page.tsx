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
  const [dest,setDest]=useState('')
  const [logoError,setLogoError]=useState(false)

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
            <button onClick={function(){openSection('accueil')}} style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #c7d2fe',background:'#eef2ff',fontWeight:800,textAlign:'left'}}>🏠 Accueil</button>
            <button onClick={function(){openSection('paiements')}} style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #e2e8f0',background:'#fff',textAlign:'left'}}>↔️ Paiements</button>
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
            <button onClick={function(){openSection('paiements')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Aperçu du Compte Bancaire</div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginTop:10,paddingBottom:10,borderBottom:'1px solid #f1f5f9'}}>
            <div style={{width:40,height:40,background:'#eff6ff',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center'}}>💳</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:13}}>Numéro de Compte</div>
              <div style={{fontSize:13,color:'#1e40af',fontWeight:800}}>{gdbAccount}</div>
            </div>
          </div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',display:'flex',gap:10,alignItems:'center',padding:'10px 0',border:'none',background:'none',textAlign:'left'}}>
            <div style={{width:40,height:40,background:'#f0fdf4',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center'}}>📱</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>Voir QR Code</div><div style={{fontSize:11,color:'#64748b'}}>QR lié à {gdbAccount}</div></div>
            <div style={{fontSize:11,fontWeight:700}}>QR</div>
          </button>
        </div>

        {/* FONCTIONNALITES COURANTES COMME TA CAPTURE */}
        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900,fontSize:15}}>Fonctionnalités Courantes</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
            <button onClick={function(){openSection('paiements')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#2563eb'}}>↔️</div><div style={{fontSize:9,fontWeight:600,textAlign:'center'}}>Transférer</div></button>
            <button onClick={function(){setModal('virement')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#2563eb'}}>💳</div><div style={{fontSize:9,fontWeight:600,textAlign:'center'}}>Virement Bancaire</div></button>
            <button onClick={function(){setModal('pidex')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#a855f7'}}>📈</div><div style={{fontSize:9,fontWeight:600}}>Pi DEX</div></button>
            <button onClick={function(){setModal('convertir')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#16a34a'}}>🔄</div><div style={{fontSize:9,fontWeight:600}}>Convertir</div></button>

            <button onClick={function(){openSection('trading')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#16a34a'}}>📈</div><div style={{fontSize:9,fontWeight:600}}>Trading</div></button>
            <button onClick={function(){setModal('aiAutomation')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#a855f7'}}>✨</div><div style={{fontSize:9,fontWeight:600,textAlign:'center'}}>aiAutomation</div></button>
            <button onClick={function(){setModal('blockchain')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#2563eb'}}>⛓️</div><div style={{fontSize:9,fontWeight:600}}>blockchain</div></button>
            <button onClick={function(){openSection('services')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#ec4899'}}>🛍️</div><div style={{fontSize:9,fontWeight:600}}>Shopping</div></button>

            <button onClick={function(){setModal('portefeuilles')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#0ea5e9'}}>👛</div><div style={{fontSize:9,fontWeight:600,textAlign:'center'}}>Portefeuilles</div></button>
            <button onClick={function(){setModal('automobile')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#3b82f6'}}>🚗</div><div style={{fontSize:9,fontWeight:600,textAlign:'center'}}>Automobile</div></button>
            <button onClick={function(){setModal('agregation')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#6366f1'}}>🗂️</div><div style={{fontSize:8,fontWeight:600,textAlign:'center'}}>Agrégation de Comptes</div></button>
            <button onClick={function(){setModal('gestion')}} style={{border:'1px solid #e2e8f0',background:'#fff',borderRadius:12,padding:'10px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:18,color:'#22c55e'}}>📊</div><div style={{fontSize:8,fontWeight:600,textAlign:'center'}}>Gestion Financière</div></button>
          </div>
        </div>

        {/* ASSISTANT IA COMME TA CAPTURE */}
        <div style={{background:'#ede9fe',border:'1px solid #ddd6fe',borderRadius:16,padding:14}}>
          <button onClick={function(){setModal('assistantIA')}} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',color:'#fff',border:'none',borderRadius:24,padding:12,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>🤖 Assistant IA</button>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
          <div style={{fontWeight:900}}>Comptes Bancaires</div>
          <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Gerez vos comptes • {gdbAccount}</div>
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
          <div style={{background:'#fff',width:'100%',borderRadius:'20px 20px 0 0',padding:12,maxHeight:'85vh',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:900}}>{gdbAccount} • {modal}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>✕</button>
            </div>
            {modal==='paiements' && (
              <div style={{marginTop:10}}>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:16,padding:4}}>
                  <button onClick={function(){setP2pType('interne')}} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:12,padding:8,fontWeight:800}}>P2P Interne</button>
                  <button onClick={function(){setP2pType('externe')}} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:12,padding:8,fontWeight:800}}>P2P Externe</button>
                </div>
                <input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="Destinataire" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} />
                <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} />
                <button onClick={function(){setModal('Envoye '+amountPi+' pi de '+gdbAccount)}} style={{width:'100%',marginTop:8,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Envoyer</button>
              </div>
            )}
            {modal==='receive' && (
              <div style={{textAlign:'center',marginTop:10}}>
                <div style={{fontWeight:900}}>{gdbAccount}</div>
                <div style={{marginTop:10,display:'inline-block',border:'2px solid #facc15',borderRadius:12,padding:10}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount)} alt="QR" style={{width:200,height:200}} />
                </div>
              </div>
            )}
            <button onClick={function(){setModal(''); setActive('accueil')}} style={{width:'100%',marginTop:10,background:'#f1f5f9',border:'none',borderRadius:12,padding:10}}>Retour Accueil</button>
          </div>
        </div>
      ) : null}
    </div>
  )
      }
