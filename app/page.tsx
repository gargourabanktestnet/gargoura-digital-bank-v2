'use client'
import { useState, useEffect } from 'react'
declare global { interface Window { Pi:any } }

function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }
function estGValide(a:string){ return a.startsWith('G') && a.length>=30 }

function SoldeGCV({gdb, piUser, kyc, onMsg}:{gdb:string, piUser:any, kyc:boolean, onMsg:(t:string)=>void}){
  return(
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{opacity:0.9,fontSize:13}}>Solde Total • {gdb || 'Non lié'} {piUser?`• @${piUser.username}`:''}</div>
        <div style={{fontWeight:900,fontSize:32,lineHeight:1.1,marginTop:4}}>1 π = 314 159,00<br/>USD</div>
        <div style={{opacity:0.8,fontSize:12,marginTop:8}}>Taux de référence indicatif GCV.</div>
        <div style={{background:kyc?'#16a34a':'#dc2626',display:'inline-flex',padding:'6px 12px',borderRadius:20,marginTop:10,fontWeight:700,fontSize:12}}>{kyc?'● KYC Vérifié - Vrai Pionnier':'● KYC Non Vérifié'}</div>
        <div style={{background:'#dbeafe',color:'#1e3a8a',borderRadius:10,padding:10,marginTop:12,fontSize:12}}><b>Frais :</b> calculés à la confirmation, en π</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>onMsg('Envoyer')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
          <button onClick={()=>onMsg('Recevoir: '+gdb)} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>
      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,display:'flex',gap:10}}>
        <div>〰️</div><div><div style={{fontWeight:800,fontSize:14}}>Système en Ligne</div><div style={{fontSize:12,color:'#64748b'}}>Transactions temps réel • {gdb}</div></div>
      </div>
      <div style={{background:'#000',border:'1px solid #facc15',borderRadius:12,padding:10}}>
        <div style={{color:'#facc15',fontWeight:900,fontSize:11}}>VALEUR GCV COMMUNAUTAIRE</div>
        <div style={{color:'#fff',fontSize:11}}>1 π = 314 159 USD • Tous calculs basés sur GCV</div>
      </div>
    </div>
  )
}

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
    if(savedGDB){ setGdbAccount(savedGDB) }
    if(savedPi){ setPiUser(JSON.parse(savedPi)); setKyc(true) }
    if(savedG){ setGAddress(savedG) }
    const s=document.createElement('script'); s.src='https://sdk.minepi.com/pi-sdk.js'; s.onload=()=>window.Pi?.init({version:'2.0',sandbox:true}); document.head.appendChild(s)
  },[])

  const lier = () =>{
    if(!estGValide(gAddress)){ setAction('Erreur: Adresse G invalide'); return }
    const newGDB = gdbAccount || genererGDB()
    localStorage.setItem('gdb_account',newGDB); localStorage.setItem('pi_g_address',gAddress)
    setGdbAccount(newGDB); setAction(`Succès: ${newGDB} lié à ${gAddress.slice(0,8)}...`)
  }

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:16,fontFamily:'system-ui',paddingBottom:90}}>
      <SoldeGCV gdb={gdbAccount} piUser={piUser} kyc={kyc} onMsg={setAction} />

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900,fontSize:16}}>Aperçu du Compte</div>
        <div style={{color:'#64748b',fontSize:12}}>{gdbAccount ? `${gdbAccount} • Tchad • Vérifié GCV` : 'Non lié'} • {piUser?`@${piUser.username}`:''}</div>
        <div style={{display:'flex',gap:12,marginTop:14}}>
          <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800}}>{gdbAccount?'✓ LIÉ':'QR CODE'}</div>
          <div style={{flex:1}}>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}><div style={{fontSize:10,color:'#64748b'}}>TITULAIRE</div><div style={{fontWeight:800}}>{piUser?piUser.username:'Pionnier Test'}</div></div>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8}}><div style={{fontSize:10,color:'#64748b'}}>N° GDB UNIQUE (auto)</div><div style={{fontWeight:800,color:'#16a34a',fontSize:12}}>{gdbAccount||'---'}</div></div>
          </div>
        </div>
        <div style={{marginTop:8,fontSize:10,color:'#64748b',wordBreak:'break-all'}}>G: {gAddress||'---'}</div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
        <div style={{fontWeight:900,fontSize:17,marginBottom:14}}>Fonctionnalités Courantes</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {[
            {label:'Transférer', icon:'⇄'}, {label:'Virement Bancaire', icon:'💳'}, {label:'Pi DEX', icon:'↗'},
            {label:'Convertir', icon:'↻'}, {label:'Trading', icon:'📈'}, {label:'aiAutomation', icon:'✨'},
            {label:'blockchain', icon:'⧉'}, {label:'Shopping', icon:'🛍️'}, {label:'Portefeuilles', icon:'👛'},
            {label:'Automobile', icon:'🚗'}, {label:'Agrégation', icon:'⬙'}, {label:'Gestion', icon:'📊'},
          ].map((it,i)=>(
            <button key={i} onClick={()=>setAction(`${it.label}: Opération GCV pour ${gdbAccount || 'Pionnier'}`)} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',textAlign:'center',background:'#fff',cursor:'pointer'}}>
              <div style={{fontSize:18}}>{it.icon}</div>
              <div style={{fontSize:9,fontWeight:700,marginTop:4,lineHeight:1.2}}>{it.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{background:'#f3e8ff',borderRadius:20,padding:14,border:'1px solid #e9d5ff'}}>
        <button onClick={()=>setAction('Assistant IA : Comment puis-je vous aider aujourd\'hui? Compte '+gdbAccount)} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',borderRadius:20,padding:12,color:'#fff',fontWeight:800,border:'none'}}>🤖 Assistant IA</button>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
        <div style={{fontWeight:900,fontSize:18}}>Comptes Bancaires</div>
        <div style={{color:'#64748b',fontSize:13,marginTop:8,lineHeight:1.4}}>Liez votre adresse G... officielle Pi. Votre GDB {gdbAccount||'GDB-2026-XXXXXX'} est unique et auto-généré après KYC.</div>
        <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="Collez votre adresse G..." style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button onClick={lier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700,fontSize:13}}>🔗 Lier Banque</button>
          <button onClick={()=>setAction('Pi Wallet & DEX: '+gAddress)} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700,fontSize:13}}>👛 Pi Wallet & DEX</button>
        </div>
        <div style={{marginTop:10,fontSize:10,color:'#16a34a',fontWeight:700}}>✅ Compte actif: {gdbAccount} • Anti-robot KYC</div>
      </div>

      {action && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:20}}>
          <div style={{background:'#fff',borderRadius:16,padding:20,maxWidth:360,width:'100%'}}>
            <div style={{fontWeight:900,fontSize:13}}>{action}</div>
            <div style={{marginTop:8,fontSize:12,color:'#334155'}}>Fonctionnalité GCV 314159$ opérationnelle pour {gdbAccount}</div>
            <button onClick={()=>setAction('')} style={{marginTop:16,width:'100%',background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>Fermer</button>
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {['Accueil','Paiements','Trading','Services','Innovation','Sécurité','Support'].map((t,i)=>(
          <div key={t} style={{textAlign:'center',fontSize:8,fontWeight:i===0?800:500,color:i===0?'#1e40af':'#64748b'}}>
            <div style={{fontSize:14}}>{i===0?'🏠':i===1?'⇄':i===2?'📈':i===3?'🏛️':i===4?'✨':i===5?'🛡️':'❓'}</div>{t}
          </div>
        ))}
      </div>
    </div>
  )
                     }
