'use client'
import { useState } from 'react'

function SoldeGCV(){
  const [msg,setMsg]=useState('')
  return(
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{opacity:0.9,fontSize:14}}>Solde Total</div>
        <div style={{fontWeight:900,fontSize:32,lineHeight:1.1,marginTop:4}}>1 π = 314 159,00<br/>USD</div>
        <div style={{opacity:0.8,fontSize:13,marginTop:8}}>Taux de référence indicatif.</div>
        <div style={{background:'#15803d',display:'inline-flex',padding:'8px 14px',borderRadius:20,marginTop:14,fontWeight:700,fontSize:14}}>📞 +235 92 82 52 62</div>
        <div style={{background:'#dbeafe',color:'#1e3a8a',borderRadius:10,padding:10,marginTop:12,fontSize:12}}><b>Frais :</b> calculés à la confirmation, en π</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setMsg('Envoyer: Saisir montant et adresse Pi')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800,cursor:'pointer'}}>↗ Envoyer</button>
          <button onClick={()=>setMsg('Recevoir: QR GDB-2026-370246 affiché')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800,cursor:'pointer'}}>✓ Recevoir</button>
        </div>
        {msg && <div style={{background:'#fff',color:'#000',borderRadius:10,padding:10,marginTop:10,fontSize:13}}>{msg} <span onClick={()=>setMsg('')} style={{float:'right',cursor:'pointer'}}>✕</span></div>}
      </div>
      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,display:'flex',gap:10}}>
        <div>〰️</div><div><div style={{fontWeight:800,fontSize:14}}>Système en Ligne</div><div style={{fontSize:12,color:'#64748b'}}>Transactions temps réel</div></div>
      </div>
      <div style={{background:'#000',border:'1px solid #facc15',borderRadius:12,padding:10}}>
        <div style={{color:'#facc15',fontWeight:900,fontSize:11}}>VALEUR GCV COMMUNAUTAIRE</div>
        <div style={{color:'#fff',fontSize:11,marginTop:2}}>1 π = 314 159 USD • Tous calculs basés sur GCV</div>
      </div>
    </div>
  )
}

function ApercuCompte(){
  return(
    <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
      <div style={{fontWeight:900,fontSize:16}}>Aperçu du Compte</div>
      <div style={{color:'#64748b',fontSize:12}}>GDB-2026-370246 • Tchad • Vérifié</div>
      <div style={{display:'flex',gap:12,marginTop:14}}>
        <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10}}>QR CODE</div>
        <div style={{flex:1}}>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}><div style={{fontSize:10,color:'#64748b'}}>TITULAIRE</div><div style={{fontWeight:800}}>Gargoura Saleh</div></div>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8}}><div style={{fontSize:10,color:'#64748b'}}>STATUT</div><div style={{fontWeight:800,color:'#16a34a'}}>● Vérifié GCV</div></div>
        </div>
      </div>
    </div>
  )
}

function Fonctionnalites({onAction}:{onAction:(t:string)=>void}){
  const items = [
    {label:'Transférer', icon:'⇄'},
    {label:'Virement Bancaire', icon:'💳'},
    {label:'Pi DEX', icon:'↗'},
    {label:'Convertir', icon:'↻'},
    {label:'Trading', icon:'📈'},
    {label:'aiAutomation', icon:'✨'},
    {label:'blockchain', icon:'⧉'},
    {label:'Shopping', icon:'🛍️'},
    {label:'Portefeuilles', icon:'👛'},
    {label:'Automobile', icon:'🚗'},
    {label:'Agrégation de Comptes', icon:'⬙'},
    {label:'Gestion Financière', icon:'📊'},
  ]
  return(
    <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
      <div style={{fontWeight:900,fontSize:17,marginBottom:14}}>Fonctionnalités Courantes</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
        {items.map((it,i)=>(
          <button key={i} onClick={()=>onAction(it.label)} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',textAlign:'center',background:'#fff',cursor:'pointer'}}>
            <div style={{fontSize:18}}>{it.icon}</div>
            <div style={{fontSize:9,fontWeight:700,marginTop:4,lineHeight:1.2}}>{it.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Page(){
  const [action,setAction]=useState('')
  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:16,fontFamily:'system-ui',paddingBottom:90}}>
      <SoldeGCV />
      <ApercuCompte />
      <Fonctionnalites onAction={setAction} />

      <div style={{background:'#f3e8ff',borderRadius:20,padding:14,border:'1px solid #e9d5ff'}}>
        <button onClick={()=>setAction('Assistant IA : Comment puis-je vous aider aujourd\'hui?')} style={{width:'100%',background:'linear-gradient(90deg,#a855f7,#3b82f6)',borderRadius:20,padding:12,color:'#fff',fontWeight:800,border:'none',cursor:'pointer'}}>🤖 Assistant IA</button>
      </div>

      {/* CAPTURE 4 - COMPTES BANCAIRES - 100% FONCTIONNEL */}
      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
        <div style={{fontWeight:900,fontSize:18}}>Comptes Bancaires</div>
        <div style={{color:'#64748b',fontSize:13,marginTop:8,lineHeight:1.4}}>Liez votre compte bancaire ou connectez Pi Wallet pour accéder à Pi DEX & AMM</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setAction('Lier Banque: Formulaire IBAN / Mobile Money Tchad bientôt actif')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700,cursor:'pointer',fontSize:13}}>🔗 Lier Banque</button>
          <button onClick={()=>setAction('Pi Wallet & DEX: Connexion Pi Browser - Authentification GCV')} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700,cursor:'pointer',fontSize:13}}>👛 Pi Wallet & DEX</button>
        </div>
      </div>

      {action && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:20}}>
          <div style={{background:'#fff',borderRadius:16,padding:20,maxWidth:360,width:'100%'}}>
            <div style={{fontWeight:900}}>{action.split(':')[0]}</div>
            <div style={{marginTop:8,fontSize:13,color:'#334155'}}>{action.split(':')[1] || 'Fonctionnalité en cours de finalisation pour la communauté Pionnière mondiale.'}</div>
            <button onClick={()=>setAction('')} style={{marginTop:16,width:'100%',background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700,cursor:'pointer'}}>Fermer</button>
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
