'use client'
import { useState, useEffect } from 'react'
declare global { interface Window { Pi:any } }
function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [piUser,setPiUser]=useState<any>(null)
  const [kyc,setKyc]=useState(false)
  const [action,setAction]=useState('')

  useEffect(()=>{
    const savedGDB=localStorage.getItem('gdb_account')
    const savedPi=localStorage.getItem('pi_user')
    const savedG=localStorage.getItem('pi_g_address')
    if(savedGDB) setGdbAccount(savedGDB)
    if(savedPi){ setPiUser(JSON.parse(savedPi)); setKyc(true) }
    if(savedG) setGAddress(savedG)
    const s=document.createElement('script'); s.src='https://sdk.minepi.com/pi-sdk.js'; s.onload=()=>window.Pi?.init({version:'2.0',sandbox:true}); document.head.appendChild(s)
  },[])

  const lier = () =>{
    if(!gAddress.startsWith('G')){ setAction('Adresse G invalide'); return }
    const newGDB = gdbAccount || genererGDB()
    localStorage.setItem('gdb_account',newGDB); localStorage.setItem('pi_g_address',gAddress)
    setGdbAccount(newGDB); setAction(`Succès: ${newGDB} lié`)
  }

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:14,fontFamily:'system-ui',paddingBottom:90}}>

      {/* HEADER LOGO GARGOURA CENTRÉ - TON LOGO */}
      <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
        <img src="/logo.png" alt="Gargoura Digital Bank Logo" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:'3px solid #1e3a8a'}} />
        <div style={{fontWeight:900,fontSize:20,color:'#1e3a8a',marginTop:10,letterSpacing:1,textAlign:'center',lineHeight:1.1}}>GARGOURA DIGITAL BANK</div>
        <div style={{fontWeight:800,fontSize:12,color:'#a16207',letterSpacing:3,marginTop:2}}>GDB • WEB3.0 • PI NETWORK</div>
        <div style={{marginTop:8,display:'flex',gap:8}}>
          <div style={{background:kyc?'#16a34a':'#e2e8f0',color:kyc?'#fff':'#64748b',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?`● KYC Vérifié @${piUser?.username||'Pionnier'}`:'● KYC Test'}</div>
          {gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}
        </div>
      </div>

      {/* SOLDE GCV */}
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:13,opacity:0.9}}>Solde Total • {gdbAccount||'GDB-...'} • 1 π = 314 159,00 USD</div>
        <div style={{fontWeight:900,fontSize:28,marginTop:6,lineHeight:1.1}}>1 π = 314 159,00<br/>USD</div>
        <div style={{fontSize:12,opacity:0.8,marginTop:6}}>Taux de référence indicatif GCV.</div>
        <div style={{background:'#dbeafe',color:'#1e3a8a',borderRadius:10,padding:10,marginTop:12,fontSize:12}}><b>Frais :</b> calculés à la confirmation, en π</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setAction('Envoyer en π - GCV')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
          <button onClick={()=>setAction('Recevoir: '+gdbAccount)} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>

      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,display:'flex',gap:10}}>
        <div>〰️</div><div><div style={{fontWeight:800,fontSize:14}}>Système en Ligne</div><div style={{fontSize:12,color:'#64748b'}}>Transactions temps réel • {gdbAccount}</div></div>
      </div>

      <div style={{background:'#000',border:'1px solid #facc15',borderRadius:12,padding:10}}>
        <div style={{color:'#facc15',fontWeight:900,fontSize:11}}>VALEUR GCV COMMUNAUTAIRE</div>
        <div style={{color:'#fff',fontSize:11}}>1 π = 314 159 USD • Calculs GCV actifs</div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900}}>Aperçu du Compte</div>
        <div style={{color:'#64748b',fontSize:12}}>{gdbAccount} • Tchad • Vérifié GCV • @{piUser?.username||'pionnier_test'}</div>
        <div style={{display:'flex',gap:12,marginTop:12}}>
          <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:10}}>✓ LIÉ</div>
          <div style={{flex:1}}>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}><div style={{fontSize:10,color:'#64748b'}}>N° GDB UNIQUE</div><div style={{fontWeight:800,color:'#16a34a',fontSize:12}}>{gdbAccount}</div></div>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8}}><div style={{fontSize:10,color:'#64748b'}}>ADRESSE G...</div><div style={{fontSize:10,wordBreak:'break-all'}}>{gAddress||'---'}</div></div>
          </div>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
        <div style={{fontWeight:900,marginBottom:12}}>Fonctionnalités Courantes</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {['Transférer','Virement Bancaire','Pi DEX','Convertir','Trading','aiAutomation','blockchain','Shopping','Portefeuilles','Automobile','Agrégation','Gestion'].map(t=>(
            <button key={t} onClick={()=>setAction(t+': GCV '+gdbAccount)} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{background:'#f3e8ff',borderRadius:20,padding:14,border:'1px solid #e9d5ff'}}>
        <button onClick={()=>setAction('Assistant IA GDB: '+gdbAccount)} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',borderRadius:20,padding:12,color:'#fff',fontWeight:800,border:'none'}}>🤖 Assistant IA</button>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
        <div style={{fontWeight:900,fontSize:18}}>Comptes Bancaires</div>
        <div style={{fontSize:12,color:'#64748b',marginTop:6}}>Chaque Pionnier KYC obtient un GDB différent. Votre GDB actuel: {gdbAccount}</div>
        <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="Collez adresse G..." style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button onClick={lier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
          <button onClick={()=>setAction('Pi Wallet: '+gAddress.slice(0,12))} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>👛 Pi Wallet</button>
        </div>
      </div>

      {action && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:20}}>
          <div style={{background:'#fff',borderRadius:16,padding:20,width:'100%',maxWidth:360}}>
            <div style={{fontWeight:900,fontSize:13}}>{action}</div>
            <button onClick={()=>setAction('')} style={{marginTop:14,width:'100%',background:'#1e40af',color:'#fff',border:'none',borderRadius:10,padding:10,fontWeight:700}}>Fermer</button>
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {['Accueil','Paiements','Trading','Services','Innovation','Sécurité','Support'].map((t,i)=>(
          <div key={t} style={{textAlign:'center',fontSize:8,fontWeight:i===0?800:500,color:i===0?'#1e40af':'#64748b'}}><div>🏠</div>{t}</div>
        ))}
      </div>
    </div>
  )
    }
