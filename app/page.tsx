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
  const [logoError,setLogoError]=useState(false)
  const [amountPi,setAmountPi]=useState('')

  useEffect(()=>{
    try{
      const a=localStorage.getItem('gdb_account')
      const g=localStorage.getItem('pi_g_address')
      const p=localStorage.getItem('pi_user')
      if(a) setGdbAccount(a)
      else {
        const n=genGDB()
        setGdbAccount(n)
        localStorage.setItem('gdb_account',n)
      }
      if(g) setGAddress(g)
      if(p) setKyc(true)
    }catch(e){
      const n=genGDB()
      setGdbAccount(n)
    }
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
    if(s==='accueil'){
      setShowMenu(false)
      setModal('')
      window.scrollTo({top:0,behavior:'smooth'})
    } else {
      setModal(s)
    }
  }

  const usd = (parseFloat(amountPi||'0')*GCV).toLocaleString()

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:95}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:18}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <div style={{fontSize:18}}>🌐 🔔</div>
      </div>

      {showMenu && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div onClick={function(){setShowMenu(false)}} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
          <div style={{width:'85%',maxWidth:360,background:'#fff',height:'100%',overflowY:'auto',paddingBottom:100}}>
            <div style={{background:'#1e40af',color:'#fff',padding:14,display:'flex',gap:10,alignItems:'center'}}>
              <button onClick={function(){setShowMenu(false)}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
              <div style={{fontWeight:900}}>Gargoura Digital Bank</div>
            </div>
            <div style={{padding:14,display:'flex',flexDirection:'column',gap:10}}>
              <div style={{fontWeight:900}}>Menu Principal</div>
              <button onClick={function(){openSection('accueil')}} style={{textAlign:'left',background:'#eef2ff',border:'1px solid #c7d2fe',borderRadius:12,padding:12,fontWeight:800}}>🏠 Accueil</button>
              <button onClick={function(){openSection('paiements')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>↔️ Paiements</button>
              <button onClick={function(){openSection('trading')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>📈 Trading</button>
              <button onClick={function(){openSection('services')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>🏛️ Services</button>
              <button onClick={function(){openSection('innovation')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>✨ Innovation</button>
              <button onClick={function(){openSection('securite')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>🛡️ Securite</button>
              <button onClick={function(){openSection('support')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>❓ Support</button>
              <div style={{marginTop:10,background:'#f3e8ff',borderRadius:12,padding:12}}>
                <div style={{fontWeight:900}}>Compte: {gdbAccount}</div>
                <div style={{fontSize:12,marginTop:6}}>Moov: (+235) 92 82 52 62<br/>Support: (+235) 66 78 75 46</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError ? (
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:100,height:100,borderRadius:50,border:'3px solid #facc15',objectFit:'cover',boxShadow:'0 0 18px rgba(250,204,21,0.6)'}} />
          ) : (
            <div style={{width:100,height:100,borderRadius:50,background:'linear-gradient(135deg,#1e3a8a,#facc15)',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:22}}>GDB</div>
          )}
          <div style={{fontWeight:900,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#a16207',fontWeight:800}}>GOLD GCV 314159 $ • {gdbAccount}</div>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={doKyc} style={{background:kyc?'#16a34a':'#e2e8f0',border:'none',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi'}</button>
          </div>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:24,padding:20,color:'#fff'}}>
          <div style={{fontSize:14,opacity:0.9}}>Solde Total</div>
          <div style={{fontWeight:900,fontSize:30,marginTop:16}}>1 pi = 314 159,00 USD</div>
          <div style={{fontSize:12,opacity:0.8,marginTop:8}}>Taux de reference indicatif pour affichage des operations.</div>
          <div style={{marginTop:10,background:'#16a34a',borderRadius:20,padding:'6px 12px',display:'inline-flex',fontSize:12}}>📞 +235 92 82 52 62</div>
          <div style={{marginTop:10,background:'rgba(255,255,255,0.15)',borderRadius:12,padding:10,fontSize:11}}>Frais de transaction : calcules a la confirmation en pi</div>
          <div style={{display:'flex',gap:10,marginTop:14}}>
            <button onClick={function(){openSection('paiements')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:14,display:'flex',gap:10}}>
          <div>📈</div><div><div style={{fontWeight:800,fontSize:13}}>Systeme en Ligne</div><div style={{fontSize:11,color:'#64748b'}}>Toutes les transactions sont traitees en temps reel</div></div>
        </div>

        {/* APERÇU DU COMPTE BANCAIRE UNIQUE - COMME TA CAPTURE */}
        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
          <div style={{fontWeight:900,fontSize:18}}>Aperçu du Compte</div>
          
          <div style={{marginTop:16,display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #e2e8f0'}}>
            <div style={{width:48,height:48,background:'#eff6ff',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>💳</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15}}>Numéro de Compte Bancaire</div>
              <div style={{fontSize:14,color:'#64748b',fontWeight:700,letterSpacing:0.5}}>{gdbAccount || 'GDB-2026-XXXXXX'}</div>
            </div>
          </div>

          <button onClick={function(){setModal('receive')}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #e2e8f0',borderLeft:'none',borderRight:'none',borderTop:'none',background:'none',textAlign:'left'}}>
            <div style={{width:48,height:48,background:'#f0fdf4',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>📱</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15}}>Voir QR</div>
              <div style={{fontWeight:700,fontSize:15}}>Code</div>
              <div style={{fontSize:13,color:'#64748b'}}>Recevoir</div>
            </div>
            <div style={{fontWeight:700,fontSize:14}}>Afficher le Code QR</div>
          </button>

          <div style={{marginTop:0,display:'flex',alignItems:'center',gap:12,padding:'12px 0'}}>
            <div style={{width:48,height:48,background:'#f0fdf4',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>📞</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15}}>Numéro de Téléphone</div>
              <div style={{fontSize:14,color:'#64748b'}}>+235 92 82 52 62</div>
            </div>
          </div>
        </div>

        {/* FONCTIONNALITÉS COURANTES - COMME TA CAPTURE */}
        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
          <div style={{fontWeight:900,fontSize:18}}>Fonctionnalités Courantes</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:14}}>
            <button onClick={function(){openSection('paiements')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20}}>↔️</div><div style={{fontSize:9,fontWeight:700}}>Transférer</div>
            </button>
            <button onClick={function(){openSection('paiements')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20}}>💳</div><div style={{fontSize:8,fontWeight:700}}>Virement Bancaire</div>
            </button>
            <button onClick={function(){openSection('trading')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#7c3aed'}}>📈</div><div style={{fontSize:9,fontWeight:700}}>Pi DEX</div>
            </button>
            <button onClick={function(){openSection('paiements')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#16a34a'}}>🔄</div><div style={{fontSize:9,fontWeight:700}}>Convertir</div>
            </button>
            <button onClick={function(){openSection('trading')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#16a34a'}}>📈</div><div style={{fontSize:9,fontWeight:700}}>Trading</div>
            </button>
            <button onClick={function(){openSection('innovation')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#7c3aed'}}>✨</div><div style={{fontSize:9,fontWeight:700}}>Pi Automation</div>
            </button>
            <button onClick={function(){openSection('innovation')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#2563eb'}}>⛓️</div><div style={{fontSize:9,fontWeight:700}}>Blockchain</div>
            </button>
            <button onClick={function(){openSection('services')}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:'12px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{fontSize:20,color:'#db2777'}}>🛍️</div><div style={{fontSize:9,fontWeight:700}}>Shopping</div>
            </button>
          </div>
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:'6px 2px 8px 2px',zIndex:40}}>
        <button onClick={function(){openSection('accueil')}} style={{border:'none',background:active==='accueil'?'#dbeafe':'none',fontSize:9,fontWeight:active==='accueil'?800:500,color:active==='accueil'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>🏠</div>Accueil
        </button>
        <button onClick={function(){openSection('paiements')}} style={{border:'none',background:active==='paiements'?'#dbeafe':'none',fontSize:9,fontWeight:active==='paiements'?800:500,color:active==='paiements'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>↔️</div>Paiements
        </button>
        <button onClick={function(){openSection('trading')}} style={{border:'none',background:active==='trading'?'#dbeafe':'none',fontSize:9,fontWeight:active==='trading'?800:500,color:active==='trading'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>📈</div>Trading
        </button>
        <button onClick={function(){openSection('services')}} style={{border:'none',background:active==='services'?'#dbeafe':'none',fontSize:9,fontWeight:active==='services'?800:500,color:active==='services'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>🏛️</div>Services
        </button>
        <button onClick={function(){openSection('innovation')}} style={{border:'none',background:active==='innovation'?'#dbeafe':'none',fontSize:9,fontWeight:active==='innovation'?800:500,color:active==='innovation'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>✨</div>Innovation
        </button>
        <button onClick={function(){openSection('securite')}} style={{border:'none',background:active==='securite'?'#dbeafe':'none',fontSize:9,fontWeight:active==='securite'?800:500,color:active==='securite'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>🛡️</div>Securite
        </button>
        <button onClick={function(){openSection('support')}} style={{border:'none',background:active==='support'?'#dbeafe':'none',fontSize:9,fontWeight:active==='support'?800:500,color:active==='support'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}>
          <div style={{fontSize:18}}>❓</div>Support
        </button>
      </div>

      {modal ? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:60,display:'flex',alignItems:'flex-end'}}>
          <div style={{background:'#fff',width:'100%',borderRadius:'24px 24px 0 0',padding:16,maxHeight:'85vh',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:900,fontSize:18}}>{modal.toUpperCase()}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>✕</button>
            </div>

            {modal==='receive' && (
              <div style={{textAlign:'center',marginTop:16}}>
                <div style={{fontWeight:900,fontSize:16}}>Compte Bancaire Unique</div>
                <div style={{fontSize:14,color:'#1e40af',fontWeight:800,marginTop:4}}>{gdbAccount}</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:4}}>G: {formatG(gAddress) || 'Non lie'} - Chaque compte est unique et lie a ce QR</div>
                <div style={{marginTop:16,background:'#fff',border:'2px solid #facc15',borderRadius:16,padding:12,display:'inline-block'}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data='+encodeURIComponent(gdbAccount+'|'+gAddress)} alt="QR" style={{width:220,height:220}} />
                </div>
                <div style={{marginTop:12,fontSize:11,background:'#f1f5f9',borderRadius:8,padding:8}}>QR contient: {gdbAccount} + G masque {formatG(gAddress)} - Unique par utilisateur</div>
                <button onClick={function(){navigator.clipboard.writeText(gdbAccount)}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Copier Numero de Compte</button>
              </div>
            )}

            {modal!=='receive' && (
              <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}>
                <div style={{background:'#eef2ff',borderRadius:12,padding:12}}><div style={{fontWeight:800}}>Compte Actif: {gdbAccount}</div><div style={{fontSize:12,color:'#64748b'}}>G masque: {formatG(gAddress) || 'Non lie'} - 4+4 visible - Unique</div></div>
                <input value={gAddress} onChange={function(e){setGAddress(e.target.value); localStorage.setItem('pi_g_address',e.target.value)}} placeholder="Adresse G Stellar (G...)" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}} />
                <input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}} />
                <div style={{fontSize:11,color:'#16a34a'}}>{usd} USD GCV - Compte: {gdbAccount}</div>
                <button onClick={function(){setModal('receive')}} style={{width:'100%',background:'#facc15',color:'#1e3a8a',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Afficher QR Code de {gdbAccount}</button>
              </div>
            )}

            <button onClick={function(){setModal(''); setActive('accueil')}} style={{width:'100%',marginTop:14,background:'#f1f5f9',border:'none',borderRadius:12,padding:12}}>← Retour Accueil</button>
          </div>
        </div>
      ) : null}
    </div>
  )
                         }
