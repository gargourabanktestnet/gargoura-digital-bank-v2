'use client'
import { useState } from 'react'

export default function Home() {
  const [toUser, setToUser] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSend = async () => {
    if(!toUser || !amount){
      setResult('❌ Remplis username et montant')
      return
    }
    setLoading(true)
    setResult('⏳ Envoi en cours...')
    try {
      // On récupère l'utilisateur Pi connecté (ou mock pour test)
      const piUser = (window as any).Pi ? await (window as any).Pi.currentUser : {uid: 'test_uid_'+Date.now(), username: 'Mahamat'}
      
      const res = await fetch('/api/transfer/p2p', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          from_uid: piUser?.uid || 'test_uid',
          from_username: piUser?.username || 'mahamat',
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
        setResult(`❌ Erreur: ${data.error}`)
      }
    } catch(e:any){
      setResult(`❌ Erreur: ${e.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh', background:'#0f172a', color:'white', padding:'20px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'400px', margin:'0 auto'}}>
        <h1 style={{textAlign:'center', color:'#facc15', fontSize:'28px', fontWeight:'bold'}}>🏦 GARGOURA BANK</h1>
        <p style={{textAlign:'center', color:'#94a3b8', marginTop:'-10px'}}>P2P Pi Transfer - Tchad 🇹🇩</p>

        <div style={{background:'#1e293b', padding:'20px', borderRadius:'16px', marginTop:'30px', border:'1px solid #334155'}}>
          <h2 style={{fontSize:'18px', marginBottom:'15px'}}>💸 Envoyer des Pi</h2>
          
          <input 
            placeholder="Username du destinataire (ex: ali_tchad)"
            value={toUser}
            onChange={(e)=>setToUser(e.target.value)}
            style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'12px', fontSize:'16px'}}
          />
          <input 
            type="number"
            placeholder="Montant Pi (ex: 0.5)"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'12px', fontSize:'16px'}}
          />
          <input 
            placeholder="Note (optionnel)"
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'20px', fontSize:'16px'}}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            style={{width:'100%', padding:'15px', borderRadius:'10px', background: loading ? '#475569' : '#facc15', color: loading ? 'white' : 'black', fontWeight:'bold', fontSize:'16px', border:'none', cursor:'pointer'}}
          >
            {loading ? '⏳ Envoi...' : '🚀 ENVOYER PI'}
          </button>

          {result && (
            <div style={{marginTop:'15px', padding:'12px', borderRadius:'10px', background:'#0f172a', border:'1px solid #334155', fontSize:'14px', wordBreak:'break-all'}}>
              {result}
            </div>
          )}
        </div>

        <div style={{marginTop:'20px', textAlign:'center', color:'#64748b', fontSize:'12px'}}>
          <p>API: /api/transfer/p2p ✅</p>
          <p>Supabase: Connecté ✅</p>
          <p>Version Tchad P2P v1.0</p>
        </div>
      </div>
    </div>
  )
          }
