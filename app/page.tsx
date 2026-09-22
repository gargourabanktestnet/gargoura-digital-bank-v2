'use client'
import { useState, useEffect } from 'react'

declare global {
  interface Window { Pi: any }
}

export default function Home() {
  const [piUser, setPiUser] = useState<any>(null)
  const [toUser, setToUser] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Initialiser Pi SDK
  useEffect(() => {
    const initPi = () => {
      if(typeof window !== 'undefined' && window.Pi){
        window.Pi.init({ version: "2.0", sandbox: true })
        console.log("Pi SDK Initialisé")
      }
    }
    // Charge SDK si pas dans Pi Browser
    if(!window.Pi){
      const script = document.createElement('script')
      script.src = 'https://sdk.minepi.com/pi-sdk.js'
      script.onload = initPi
      document.body.appendChild(script)
    } else {
      initPi()
    }
  }, [])

  const loginWithPi = async () => {
    setAuthLoading(true)
    try {
      if(!window.Pi){
        setResult('❌ Ouvre cette page dans Pi Browser!')
        setAuthLoading(false)
        return
      }
      const scopes = ['username', 'payments']
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
      setPiUser(auth.user)
      setResult(`✅ Bienvenue @${auth.user.username}!`)
      
      // Sauvegarde user dans Supabase
      await fetch('/api/transfer/p2p', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          from_uid: auth.user.uid,
          from_username: auth.user.username,
          to_username: auth.user.username,
          amount: '0',
          note: 'login'
        })
      })

    } catch(e:any){
      setResult(`❌ Login échoué: ${e.message}`)
    }
    setAuthLoading(false)
  }

  const onIncompletePaymentFound = (payment:any) => {
    console.log("Paiement incomplet trouvé:", payment)
  }

  const handleSend = async () => {
    if(!piUser){
      setResult('❌ Connecte-toi avec Pi d\'abord!')
      return
    }
    if(!toUser || !amount){
      setResult('❌ Remplis username et montant')
      return
    }
    setLoading(true)
    setResult('⏳ Envoi en cours...')
    try {
      const res = await fetch('/api/transfer/p2p', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          from_uid: piUser.uid,
          from_username: piUser.username,
          to_username: toUser.replace('@',''),
          amount: amount,
          note: note
        })
      })
      const data = await res.json()
      if(data.success){
        setResult(`✅ ${data.message} | TX: ${data.tx_id}`)
        setToUser(''); setAmount(''); setNote('')
      } else {
        setResult(`❌ ${data.error}`)
      }
    } catch(e:any){
      setResult(`❌ ${e.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'#0f172a', color:'white', padding:'20px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'400px', margin:'0 auto'}}>
        <h1 style={{textAlign:'center', color:'#facc15', fontSize:'28px', fontWeight:'bold'}}>🏦 GARGOURA BANK</h1>
        <p style={{textAlign:'center', color:'#94a3b8'}}>P2P Pi Transfer - Tchad 🇹🇩</p>

        {!piUser ? (
          <div style={{background:'#1e293b', padding:'20px', borderRadius:'16px', marginTop:'30px', border:'1px solid #334155', textAlign:'center'}}>
            <h3 style={{marginBottom:'15px'}}>🔐 Connexion Pi Network</h3>
            <p style={{fontSize:'13px', color:'#94a3b8', marginBottom:'15px'}}>Connecte-toi avec ton compte Pi pour envoyer des Pi</p>
            <button
              onClick={loginWithPi}
              disabled={authLoading}
              style={{width:'100%', padding:'15px', borderRadius:'10px', background:'#7c3aed', color:'white', fontWeight:'bold', fontSize:'16px', border:'none', cursor:'pointer'}}
            >
              {authLoading ? '⏳ Connexion...' : 'π Se connecter avec Pi'}
            </button>
          </div>
        ) : (
          <>
            <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', marginTop:'20px', border:'1px solid #334155', textAlign:'center'}}>
              <p style={{margin:0, fontSize:'14px'}}>Connecté: <b style={{color:'#facc15'}}>@{piUser.username}</b></p>
              <p style={{margin:0, fontSize:'11px', color:'#64748b'}}>{piUser.uid.slice(0,20)}...</p>
            </div>

            <div style={{background:'#1e293b', padding:'20px', borderRadius:'16px', marginTop:'15px', border:'1px solid #334155'}}>
              <h2 style={{fontSize:'18px', marginBottom:'15px'}}>💸 Envoyer des Pi</h2>
              <input placeholder="Destinataire (ex: ali_tchad)" value={toUser} onChange={(e)=>setToUser(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'12px', fontSize:'16px'}}/>
              <input type="number" placeholder="Montant Pi" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'12px', fontSize:'16px'}}/>
              <input placeholder="Note" value={note} onChange={(e)=>setNote(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'20px', fontSize:'16px'}}/>
              <button onClick={handleSend} disabled={loading} style={{width:'100%', padding:'15px', borderRadius:'10px', background: loading ? '#475569' : '#facc15', color: loading ? 'white' : 'black', fontWeight:'bold', fontSize:'16px', border:'none'}}>
                {loading ? '⏳ Envoi...' : '🚀 ENVOYER PI'}
              </button>
              {result && <div style={{marginTop:'15px', padding:'12px', borderRadius:'10px', background:'#0f172a', border:'1px solid #334155', fontSize:'13px', wordBreak:'break-all'}}>{result}</div>}
            </div>
          </>
        )}

        <div style={{marginTop:'20px', textAlign:'center', color:'#64748b', fontSize:'11px'}}>
          <p>Sandbox: ON | Pi SDK v2.0 | Tchad P2P v2.0</p>
        </div>
      </div>
    </div>
  )
          }
