'use client'
import { useState, useEffect } from 'react'

declare global { interface Window { Pi: any } }

export default function Home() {
  const [piUser, setPiUser] = useState<any>(null)
  const [toUser, setToUser] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [tab, setTab] = useState<'send'|'receive'|'history'>('send')
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    if(typeof window !== 'undefined'){
      if(!window.Pi){
        const s = document.createElement('script')
        s.src = 'https://sdk.minepi.com/pi-sdk.js'
        s.onload = () => window.Pi.init({version:"2.0", sandbox:true})
        document.body.appendChild(s)
      } else {
        window.Pi.init({version:"2.0", sandbox:true})
      }
    }
  }, [])

  const loginWithPi = async () => {
    try {
      if(!window.Pi){ setResult('❌ Ouvre dans Pi Browser!'); return }
      const auth = await window.Pi.authenticate(['username','payments'], (p:any)=>console.log(p))
      setPiUser(auth.user)
      setResult(`✅ Bienvenue @${auth.user.username}`)
      loadHistory(auth.user.uid)
    } catch(e:any){ setResult(`❌ ${e.message}`) }
  }

  const loadHistory = async (uid?: string) => {
    try {
      const res = await fetch(`/api/transfer/p2p?uid=${uid || piUser?.uid || ''}`)
      // Si ton API GET ne retourne pas l'historique, on va chercher via Supabase direct via notre API
      // Pour l'instant on simule avec local, mais la TX est bien dans Supabase
      const data = await res.json()
      if(data.transfers) setHistory(data.transfers)
    } catch {}
  }

  const handleSend = async () => {
    if(!piUser) return setResult('❌ Connecte-toi!')
    if(!toUser || !amount) return setResult('❌ Remplis tout')
    setLoading(true)
    setResult('⏳ Envoi...')
    try {
      const res = await fetch('/api/transfer/p2p', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          from_uid: piUser.uid,
          from_username: piUser.username,
          to_username: toUser.replace('@',''),
          amount, note
        })
      })
      const data = await res.json()
      if(data.success){
        setResult(`✅ ${data.message} | ${data.tx_id}`)
        setToUser(''); setAmount(''); setNote('')
        setHistory([{to_username: toUser, amount_pi: amount, tx_id: data.tx_id, created_at: new Date().toISOString()}, ...history])
      } else setResult(`❌ ${data.error}`)
    } catch(e:any){ setResult(`❌ ${e.message}`) }
    setLoading(false)
  }

  const qrData = piUser ? `pi://gargoura/pay?to=${piUser.username}&app=GARGOURA_BANK` : ''
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrData)}&bgcolor=15-23-42&color=FACC15`

  return (
    <div style={{minHeight:'100vh', background:'#0f172a', color:'white', padding:'15px', fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'420px', margin:'0 auto'}}>
        <h1 style={{textAlign:'center', color:'#facc15', fontSize:'26px', fontWeight:'bold', marginBottom:'0'}}>🏦 GARGOURA DIGITAL BANK</h1>
        <p style={{textAlign:'center', color:'#94a3b8', fontSize:'12px', marginTop:'5px'}}>P2P Pi Tchad - QR & Send 🇹🇩</p>

        {!piUser ? (
          <div style={{background:'#1e293b', padding:'20px', borderRadius:'16px', marginTop:'25px', border:'1px solid #334155', textAlign:'center'}}>
            <h3>🔐 Connexion Pi</h3>
            <button onClick={loginWithPi} style={{width:'100%', padding:'15px', borderRadius:'10px', background:'#7c3aed', color:'white', fontWeight:'bold', border:'none', marginTop:'10px'}}>π Se connecter avec Pi</button>
          </div>
        ) : (
          <>
            <div style={{background:'#1e293b', padding:'10px', borderRadius:'10px', marginTop:'15px', border:'1px solid #334155', textAlign:'center', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontSize:'13px'}}>👤 <b style={{color:'#facc15'}}>@{piUser.username}</b></span>
              <span style={{fontSize:'11px', color:'#64748b'}}>Balance: 10 Pi (demo)</span>
            </div>

            <div style={{display:'flex', gap:'8px', marginTop:'15px'}}>
              {(['send','receive','history'] as const).map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{flex:1, padding:'10px', borderRadius:'8px', border:'none', fontWeight:'bold', fontSize:'13px', background: tab===t ? '#facc15' : '#1e293b', color: tab===t ? 'black' : 'white'}}>{t==='send'?'💸 Envoyer': t==='receive'?'📥 Recevoir':'📜 Historique'}</button>
              ))}
            </div>

            {tab==='send' && (
              <div style={{background:'#1e293b', padding:'18px', borderRadius:'16px', marginTop:'12px', border:'1px solid #334155'}}>
                <input placeholder="Destinataire @username" value={toUser} onChange={e=>setToUser(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'10px'}}/>
                <input type="number" placeholder="Montant Pi" value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'10px'}}/>
                <input placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #475569', background:'#0f172a', color:'white', marginBottom:'15px'}}/>
                <button onClick={handleSend} disabled={loading} style={{width:'100%', padding:'15px', borderRadius:'10px', background: loading ? '#475569' : '#facc15', color:'black', fontWeight:'bold', border:'none'}}>{loading ? '⏳' : '🚀 ENVOYER PI'}</button>
              </div>
            )}

            {tab==='receive' && (
              <div style={{background:'#1e293b', padding:'20px', borderRadius:'16px', marginTop:'12px', border:'1px solid #334155', textAlign:'center'}}>
                <h3 style={{marginTop:0}}>Ton QR Code pour recevoir</h3>
                <p style={{fontSize:'12px', color:'#94a3b8'}}>Montre ce QR à un ami, il scannera et t'enverra des Pi direct!</p>
                <div style={{background:'white', padding:'12px', borderRadius:'12px', display:'inline-block', margin:'15px 0'}}>
                  <img src={qrUrl} alt="QR" style={{width:'200px', height:'200px'}}/>
                </div>
                <div style={{background:'#0f172a', padding:'10px', borderRadius:'8px', fontSize:'12px', wordBreak:'break-all', border:'1px dashed #334155'}}>
                  {qrData}
                </div>
                <p style={{fontSize:'11px', color:'#facc15', marginTop:'10px'}}>Username: @{piUser.username}</p>
                <button onClick={()=>{navigator.clipboard.writeText(piUser.username); setResult('✅ Username copié!')}} style={{marginTop:'10px', padding:'8px 15px', borderRadius:'6px', background:'#334155', color:'white', border:'none', fontSize:'12px'}}>📋 Copier Username</button>
              </div>
            )}

            {tab==='history' && (
              <div style={{background:'#1e293b', padding:'18px', borderRadius:'16px', marginTop:'12px', border:'1px solid #334155'}}>
                <h3 style={{marginTop:0, fontSize:'15px'}}>Dernières transactions</h3>
                {history.length===0 ? <p style={{fontSize:'12px', color:'#64748b'}}>Aucune transaction locale. Va dans Supabase -> p2p_transfers pour voir tout l'historique global!</p> : history.map((h,i)=>(
                  <div key={i} style={{background:'#0f172a', padding:'10px', borderRadius:'8px', marginBottom:'8px', fontSize:'12px', border:'1px solid #334155'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}><span>→ @{h.to_username}</span><span style={{color:'#facc15', fontWeight:'bold'}}>{h.amount_pi} Pi</span></div>
                    <div style={{color:'#64748b', fontSize:'10px', marginTop:'4px'}}>{h.tx_id} • {new Date(h.created_at).toLocaleString()}</div>
                  </div>
                ))}
                <div style={{marginTop:'12px', padding:'10px', background:'#0f172a', borderRadius:'8px', fontSize:'11px'}}>
                  <p style={{margin:'0 0 5px 0', color:'#94a3b8'}}>Transaction vérifiée Supabase:</p>
                  <p style={{margin:0, color:'#facc15'}}>GARG-P2P-1790085864612 → Hgagar 0.1 Pi SUCCESS ✅</p>
                </div>
              </div>
            )}

            {result && <div style={{marginTop:'12px', padding:'12px', borderRadius:'10px', background:'#0f172a', border:'1px solid #facc15', fontSize:'12px', wordBreak:'break-all'}}>{result}</div>}
          </>
        )}
      </div>
    </div>
  )
  }
