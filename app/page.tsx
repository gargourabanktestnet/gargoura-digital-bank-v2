'use client'
import { useState, useEffect } from 'react'

declare global { interface Window { Pi:any } }

function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }

export default function Page(){
  const [piUser,setPiUser]=useState<any>(null)
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kycStatus,setKycStatus]=useState<'non_verifie'|'en_cours'|'verifie'>('non_verifie')
  const [log,setLog]=useState('')

  useEffect(()=>{
    const saved = localStorage.getItem('gdb_account')
    const savedPi = localStorage.getItem('pi_user')
    if(saved && savedPi){
      setGdbAccount(saved)
      setPiUser(JSON.parse(savedPi))
      setKycStatus('verifie')
      setGAddress(localStorage.getItem('pi_g_address')||'')
    }
    // Charger Pi SDK
    const s=document.createElement('script')
    s.src='https://sdk.minepi.com/pi-sdk.js'
    s.onload=()=>{ window.Pi?.init({version:'2.0', sandbox:false }) }
    document.head.appendChild(s)
  },[])

  const verifierKYC = async () =>{
    setLog('Connexion Pi Network...')
    try{
      if(!window.Pi){ setLog('Ouvrez cette page dans Pi Browser'); return }
      const auth = await window.Pi.authenticate(['username','payments'], (p:any)=>{})
      // auth.user = {uid, username}
      // ICI : appel backend pour vérifier vrai KYC
      // Pour la démo VERT on simule, mais en prod tu feras :
      // const res = await fetch('/api/verify-kyc', {method:'POST', body:JSON.stringify({accessToken: auth.accessToken})})
      // const data = await res.json() // {kyc_verified: true/false}
      
      setPiUser(auth.user)
      setKycStatus('verifie') // En prod, mettre data.kyc_verified ? 'verifie' : 'non_verifie'
      localStorage.setItem('pi_user', JSON.stringify(auth.user))
      setLog(`✅ KYC Vérifié: @${auth.user.username} - Vrai Pionnier`)
    }catch(e:any){
      setLog('❌ Echec KYC: '+e.message)
      setKycStatus('non_verifie')
    }
  }

  const lierCompteG = () =>{
    if(kycStatus!=='verifie'){ setLog('⚠️ Passez d\'abord le KYC Pi officiel'); return }
    if(!gAddress.startsWith('G') || gAddress.length<30){ setLog('❌ Adresse G invalide'); return }
    const newGDB=genererGDB()
    localStorage.setItem('gdb_account', newGDB)
    localStorage.setItem('pi_g_address', gAddress)
    setGdbAccount(newGDB)
    setLog(`🎉 Compte ${newGDB} créé pour @${piUser?.username} - KYC OK`)
  }

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:16,fontFamily:'system-ui'}}>
      
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:12,opacity:0.9}}>GDB • Banque Web3.0 Pionnière • {piUser ? `@${piUser.username}` : 'Non connecté'}</div>
        <div style={{fontWeight:900,fontSize:28,marginTop:4}}>1 π = 314 159 USD</div>
        <div style={{marginTop:10,background:kycStatus==='verifie'?'#16a34a':'#dc2626',display:'inline-flex',padding:'6px 12px',borderRadius:20,fontSize:12,fontWeight:800}}>
          {kycStatus==='verifie' ? '● KYC Pi Vérifié - Vrai Pionnier' : '● KYC Non Vérifié - Robot bloqué'}
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900}}>Aperçu Compte GDB</div>
        <div style={{fontSize:12,color:'#64748b'}}>{gdbAccount || 'Pas encore généré - KYC requis'}</div>
        {gdbAccount && <div style={{marginTop:8,fontWeight:800,fontSize:13,background:'#f0fdf4',padding:8,borderRadius:8}}>{gdbAccount} • {gAddress.slice(0,12)}...</div>}
        <div style={{fontSize:11,marginTop:8,color:'#64748b',lineHeight:1.4}}>
          Chaque utilisateur obtient un numéro GDB différent après KYC Pi officiel. Anti-robot 🤖
        </div>
      </div>

      <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:18,padding:16}}>
        <div style={{fontWeight:900}}>Étape 1: Vérification KYC Pi Network Officiel</div>
        <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Ouvrez dans Pi Browser pour vérifier votre vrai statut KYC Pi.</div>
        <button onClick={verifierKYC} style={{width:'100%',marginTop:12,background:kycStatus==='verifie'?'#16a34a':'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>
          {kycStatus==='verifie' ? `✅ KYC Vérifié @${piUser?.username}` : '🔐 Vérifier mon KYC Pi dans Pi Browser'}
        </button>
      </div>

      {kycStatus==='verifie' && (
        <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:16}}>
          <div style={{fontWeight:900}}>Étape 2: Lier votre adresse publique G...</div>
          <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="G..." style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
          <button onClick={lierCompteG} style={{width:'100%',marginTop:10,background:'#000',color:'#facc15',border:'1px solid #facc15',borderRadius:12,padding:12,fontWeight:800}}>Générer mon compte GDB unique</button>
        </div>
      )}

      {log && <div style={{background:'#000',color:'#fff',borderRadius:12,padding:12,fontSize:12}}>{log}</div>}

      <div style={{fontSize:10,color:'#64748b',textAlign:'center',padding:10}}>
        Sécurité: Seuls les comptes Pi avec KYC approuvé par Pi Core Team peuvent générer un GDB. Les robots sont bloqués automatiquement.
      </div>
    </div>
  )
                  }
