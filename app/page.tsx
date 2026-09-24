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
  const [note,setNote]=useState('')
  const [zone,setZone]=useState('CEMAC')
  const [banquePart,setBanquePart]=useState('')
  const [compteExt,setCompteExt]=useState('')
  const [logoError,setLogoError]=useState(false)

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
    } else {
      setModal(s)
    }
  }

  const usd = (parseFloat(amountPi||'0')*GCV).toLocaleString()

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
              <div style={{fontSize:11}}>Compte unique genere automatiquement</div>
            </div>
            <div style={{padding:14,display:'flex',flexDirection:'column',gap:10}}>
              <button onClick={function(){openSection('accueil')}} style={{textAlign:'left',background:'#eef2ff',border:'1px solid #c7d2fe',borderRadius:12,padding:12,fontWeight:800}}>🏠 Accueil</button>
              <button onClick={function(){openSection('paiements')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>↔️ Paiements P2P</button>
              <button onClick={function(){openSection('trading')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>📈 Trading</button>
              <button onClick={function(){openSection('services')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>🏛️ Services</button>
              <button onClick={function(){openSection('innovation')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>✨ Innovation</button>
              <button onClick={function(){openSection('securite')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>🛡️ Securite</button>
              <button onClick={function(){openSection('support')}} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:12}}>❓ Support</button>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError? (
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:100,height:100,borderRadius:50,border:'3px solid #facc15',objectFit:'cover'}} />
          ) : (
            <div style={{width:100,height:100,borderRadius:50,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>
          )}
          <div style={{fontWeight:900,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#a16207',fontWeight:800}}>{gdbAccount} • Unique par utilisateur</div>
          <button onClick={doKyc} style={{marginTop:8,background:kyc?'#16a34a':'#e2e8f0',border:'none',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi'}</button>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:24,padding:20,color:'#fff'}}>
          <div style={{fontSize:14,opacity:0.9}}>Solde Total • {gdbAccount}</div>
          <div style={{fontWeight:900,fontSize:28,marginTop:12}}>1 pi = 314 159,00 USD</div>
          <div style={{display:'flex',gap:10,marginTop:14}}>
            <button onClick={function(){openSection('paiements')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Envoyer</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>Recevoir</button>
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
          <div style={{fontWeight:900,fontSize:18}}>Aperçu du Compte</div>
          <div style={{marginTop:12,display:'flex',gap:10,alignItems:'center',borderBottom:'1px solid #e2e8f0',paddingBottom:12}}>
            <div style={{width:40,height:40,background:'#eff6ff',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center'}}>💳</div>
            <div><div style={{fontWeight:700}}>Numero de Compte Bancaire</div><div style={{fontSize:13,color:'#1e40af',fontWeight:800}}>{gdbAccount}</div><div style={{fontSize:10,color:'#16a34a'}}>Unique - different de chaque utilisateur</div></div>
          </div>
          <button onClick={function(){setModal('receive')}} style={{width:'100%',display:'flex',gap:10,alignItems:'center',padding:'12px 0',border:'none',background:'none',textAlign:'left',borderBottom:'1px solid #e2e8f0'}}>
            <div style={{width:40,height:40,background:'#f0fdf4',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center'}}>📱</div>
            <div style={{flex:1}}><div style={{fontWeight:700}}>Voir QR Code</div><div style={{fontSize:12,color:'#64748b'}}>QR lie a {gdbAccount}</div></div>
            <div style={{fontSize:12,fontWeight:700}}>Afficher QR</div>
          </button>
          <div style={{display:'flex',gap:10,alignItems:'center',paddingTop:12}}>
            <div style={{width:40,height:40,background:'#f0fdf4',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center'}}>📞</div>
            <div><div style={{fontWeight:700}}>Numero Telephone</div><div style={{fontSize:13}}>+235 92 82 52 62</div></div>
          </div>
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
          <div style={{background:'#fff',width:'100%',borderRadius:'24px 24px 0 0',padding:16,maxHeight:'90vh',overflowY:'auto'}}>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:900}}>{modal==='paiements'?'Paiements - '+gdbAccount : modal.toUpperCase()}</div>
              <button onClick={function(){setModal(''); setActive('accueil')}} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:32,height:32}}>✕</button>
            </div>

            {modal==='paiements' && (
              <div style={{marginTop:12}}>
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4}}>
                  <button onClick={function(){setP2pType('interne')}} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:16,padding:10,fontWeight:800}}>P2P Interne</button>
                  <button onClick={function(){setP2pType('externe')}} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:16,padding:10,fontWeight:800}}>P2P Externe</button>
                </div>

                {p2pType==='interne' ? (
                  <div style={{marginTop:12,border:'1px solid #e2e8f0',borderRadius:16,padding:14}}>
                    <div style={{fontWeight:900}}>Transfert Interne Gargoura</div>
                    <div style={{fontSize:11,color:'#64748b'}}>Compte: {gdbAccount} (unique)</div>
                    <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Destinataire</div><input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="Numero telephone ou ID" style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}} /></div>
                    <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Cryptomonnaie</div><select style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}}><option>π PiCoin (314,159.00 USD)</option></select></div>
                    <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Montant</div><input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}} /><div style={{fontSize:11,color:'#16a34a',marginTop:4}}>{usd} USD</div></div>
                    <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Note (optionnel)</div><input value={note} onChange={function(e){setNote(e.target.value)}} placeholder="Ajouter une note" style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}} /></div>
                    <button onClick={function(){setModal('Envoye '+amountPi+' pi de '+gdbAccount+' vers '+dest)}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:24,padding:14,fontWeight:800}}>Envoyer</button>
                  </div>
                ) : (
                  <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:12}}>
                    <div style={{border:'1px solid #e2e8f0',borderRadius:16,padding:14}}>
                      <div style={{fontWeight:900}}>Zone de Transfert</div>
                      <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                        <button onClick={function(){setZone('CEMAC')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='CEMAC'?'#1e40af':'#f1f5f9',color:zone==='CEMAC'?'#fff':'#333',fontSize:11,fontWeight:800}}>CEMAC</button>
                        <button onClick={function(){setZone('UEMOA')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='UEMOA'?'#1e40af':'#f1f5f9',color:zone==='UEMOA'?'#fff':'#333',fontSize:11,fontWeight:800}}>UEMOA</button>
                        <button onClick={function(){setZone('Dollar')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='Dollar'?'#1e40af':'#f1f5f9',color:zone==='Dollar'?'#fff':'#333',fontSize:11,fontWeight:800}}>Dollar</button>
                        <button onClick={function(){setZone('Jordanie')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='Jordanie'?'#1e40af':'#f1f5f9',color:zone==='Jordanie'?'#fff':'#333',fontSize:11,fontWeight:800}}>Jordanie</button>
                        <button onClick={function(){setZone('Golfe')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='Golfe'?'#1e40af':'#f1f5f9',color:zone==='Golfe'?'#fff':'#333',fontSize:11,fontWeight:800}}>Golfe</button>
                        <button onClick={function(){setZone('Moyen-Orient')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='Moyen-Orient'?'#1e40af':'#f1f5f9',color:zone==='Moyen-Orient'?'#fff':'#333',fontSize:11,fontWeight:800}}>Moyen-Orient</button>
                        <button onClick={function(){setZone('International')}} style={{padding:'8px 10px',borderRadius:20,border:'none',background:zone==='International'?'#1e40af':'#f1f5f9',color:zone==='International'?'#fff':'#333',fontSize:11,fontWeight:800}}>International</button>
                      </div>
                      <div style={{fontSize:11,marginTop:6}}>Zone: {zone} • Compte: {gdbAccount}</div>
                    </div>
                    <div style={{border:'1px solid #e2e8f0',borderRadius:16,padding:14}}>
                      <div style={{fontWeight:900}}>Transfert Externe</div>
                      <div style={{fontSize:12,color:'#2563eb',fontWeight:700,marginTop:4}}>Conforme ISO 20022 • SWIFT • SEPA</div>
                      <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Banque Partenaire</div><select value={banquePart} onChange={function(e){setBanquePart(e.target.value)}} style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}}><option value="">Choisir une banque</option><option>Ecobank Tchad - CEMAC</option><option>UBA Tchad - UEMOA</option><option>BSIC</option><option>Orabank</option><option>BNP Paribas - International</option><option>Attijariwafa - Golfe</option><option>Jordan Islamic Bank</option></select></div>
                      <div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:13}}>Numero de Compte</div><input value={compteExt} onChange={function(e){setCompteExt(e.target.value)}} placeholder="Entrer le numero de compte" style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1',marginTop:4}} /><div style={{fontSize:10,color:'#64748b',marginTop:4}}>Source unique: {gdbAccount} → {compteExt || 'externe'}</div></div>
                      <div style={{marginTop:10}}><input value={amountPi} onChange={function(e){setAmountPi(e.target.value)}} placeholder="0.00 pi" style={{width:'100%',padding:12,borderRadius:24,border:'1px solid #cbd5e1'}} /><div style={{fontSize:11,color:'#16a34a'}}>{usd} USD</div></div>
                      <button onClick={function(){setModal('Transfert externe '+amountPi+' pi de '+gdbAccount+' vers '+banquePart+' '+compteExt+' zone '+zone)}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:24,padding:14,fontWeight:800}}>Envoyer Externe {zone}</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {modal==='receive' && (
              <div style={{textAlign:'center',marginTop:12}}>
                <div style={{fontWeight:900}}>{gdbAccount}</div>
                <div style={{fontSize:11,color:'#16a34a'}}>Chaque utilisateur numero different - QR unique</div>
                <div style={{marginTop:12,border:'2px solid #facc15',borderRadius:16,padding:12,display:'inline-block'}}>
                  <img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdbAccount)} alt="QR" style={{width:200,height:200}} />
                </div>
                <div style={{marginTop:8,fontSize:11}}>QR: {gdbAccount} • {formatG(gAddress)}</div>
                <button onClick={function(){navigator.clipboard.writeText(gdbAccount)}} style={{width:'100%',marginTop:10,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Copier {gdbAccount}</button>
              </div>
            )}

            {modal!=='paiements' && modal!=='receive' && (
              <div style={{marginTop:12}}><div style={{fontSize:12}}>Compte actif: {gdbAccount} • Unique par utilisateur</div><div style={{marginTop:8,fontSize:12}}>G: {formatG(gAddress) || 'Non lie'} - 4+4 visible</div></div>
            )}

            <button onClick={function(){setModal(''); setActive('accueil')}} style={{width:'100%',marginTop:12,background:'#f1f5f9',border:'none',borderRadius:12,padding:10}}>Retour Accueil</button>
          </div>
        </div>
      ) : null}
    </div>
  )
    }
