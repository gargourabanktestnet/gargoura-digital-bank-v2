'use client'
import { useState, useEffect } from 'react'
declare global { interface Window { Pi:any } }
function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }

export default function Page(){
  const [piUser,setPiUser]=useState<any>(null)
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kyc,setKyc]=useState(false)
  const [log,setLog]=useState('')
  const [isPiBrowser,setIsPiBrowser]=useState(false)

  useEffect(()=>{
    const savedGDB=localStorage.getItem('gdb_account')
    const savedPi=localStorage.getItem('pi_user')
    const savedG=localStorage.getItem('pi_g_address')
    if(savedGDB && savedPi){ setGdbAccount(savedGDB); setPiUser(JSON.parse(savedPi)); setKyc(true); setGAddress(savedG||'') }
    // Detect Pi Browser
    const isPi = navigator.userAgent.includes('PiBrowser')
    setIsPiBrowser(isPi)
    const s=document.createElement('script'); s.src='https://sdk.minepi.com/pi-sdk.js'; s.onload=()=>window.Pi?.init({version:'2.0',sandbox:true}); document.head.appendChild(s)
  },[])

  const verifierKYC = async () =>{
    if(!isPiBrowser){
      setLog('⚠️ Tu es dans Chrome. Le vrai KYC ne marche que dans Pi Browser. Pour tester, clique sur MODE TEST en dessous.')
      return
    }
    setLog('Connexion Pi Network... Vérification...')
    try{
      if(!window.Pi){ setLog('❌ Pi SDK non chargé. Vérifie ta connexion internet'); return }
      const auth = await window.Pi.authenticate(['username'], (p:any)=>{})
      setPiUser(auth.user); setKyc(true); localStorage.setItem('pi_user', JSON.stringify(auth.user))
      setLog(`✅ KYC Vérifié @${auth.user.username} - Vrai Pionnier`)
    }catch(e:any){ setLog('❌ Echec: '+e.message+' - Assure-toi d\'être dans Pi Browser avec internet') }
  }

  const modeTestChrome = () =>{
    const fakeUser = {username:'pionnier_test', uid:'test_123'}
    setPiUser(fakeUser); setKyc(true); localStorage.setItem('pi_user', JSON.stringify(fakeUser))
    setLog('🧪 MODE TEST Chrome activé - KYC simulé pour @pionnier_test (en prod ce sera bloqué)')
  }

  const lier = () =>{
    if(!kyc){ setLog('KYC requis'); return }
    if(!gAddress.startsWith('G')){ setLog('Adresse doit commencer par G'); return }
    const newGDB=genererGDB(); localStorage.setItem('gdb_account',newGDB); localStorage.setItem('pi_g_address',gAddress); setGdbAccount(newGDB); setLog(`🎉 ${newGDB} créé`)
  }

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:14,fontFamily:'system-ui'}}>
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:11,opacity:0.9}}>GDB • Banque Web3.0 • {piUser ? `@${piUser.username}` : 'Non connecté'} • {isPiBrowser ? 'Pi Browser ✅' : 'Chrome ❌'}</div>
        <div style={{fontWeight:900,fontSize:28,marginTop:4}}>1 π = 314 159 USD</div>
        <div style={{marginTop:8,background:kyc?'#16a34a':'#dc2626',display:'inline-flex',padding:'6px 12px',borderRadius:20,fontSize:11,fontWeight:800}}>{kyc?'● KYC Vérifié':'● KYC Non Vérifié - Bloqué 🤖'}</div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900}}>Aperçu Compte GDB</div>
        <div style={{fontSize:12,color:'#64748b'}}>{gdbAccount || 'Pas encore généré'}</div>
        {gdbAccount && <div style={{marginTop:8,fontWeight:800,background:'#f0fdf4',padding:8,borderRadius:8}}>{gdbAccount}</div>}
      </div>

      {!kyc ? (
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:18,padding:14}}>
          <div style={{fontWeight:900,fontSize:14}}>Étape 1: Vérification KYC Pi</div>
          <div style={{fontSize:11,color:'#64748b',marginTop:4}}>{isPiBrowser ? 'Tu es dans Pi Browser, clique pour vérifier vrai KYC' : 'Tu es dans Chrome : le vrai KYC ne marche pas ici. Utilise Pi Browser pour la vraie app. Pour tester maintenant, utilise le bouton test.'}</div>
          <button onClick={verifierKYC} style={{width:'100%',marginTop:10,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>🔐 Vérifier mon KYC Pi {isPiBrowser ? '(Pi Browser)' : '(Bloqué dans Chrome)'}</button>
          {!isPiBrowser && <button onClick={modeTestChrome} style={{width:'100%',marginTop:8,background:'#facc15',color:'#000',border:'none',borderRadius:12,padding:12,fontWeight:800}}>🧪 MODE TEST Chrome (simuler KYC)</button>}
        </div>
      ):(
        <div style={{background:'#fff',border:'1px solid #bbf7d0',borderRadius:18,padding:14}}>
          <div style={{fontWeight:900}}>Étape 2: Lier G...</div>
          <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="G..." style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
          <button onClick={lier} style={{width:'100%',marginTop:8,background:'#000',color:'#facc15',border:'1px solid #facc15',borderRadius:12,padding:12,fontWeight:800}}>Générer GDB unique</button>
        </div>
      )}

      {log && <div style={{background:'#000',color:'#fff',borderRadius:10,padding:12,fontSize:12}}>{log}</div>}
      <div style={{fontSize:10,color:'#64748b',textAlign:'center'}}>Astuce: Pour la vraie utilisation Pionnière, ouvre https://ank-v2.vercel.app dans Pi Browser, pas Chrome.</div>
    </div>
  )
          }
