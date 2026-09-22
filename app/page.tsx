'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [piUser, setPiUser] = useState<any>(null)
  const [toUser, setToUser] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    const init = () => {
      if ((window as any).Pi) {
        (window as any).Pi.init({ version: "2.0", sandbox: true })
      }
    }
    if (!(window as any).Pi) {
      const s = document.createElement('script')
      s.src = 'https://sdk.minepi.com/pi-sdk.js'
      s.onload = init
      document.body.appendChild(s)
    } else {
      init()
    }
  }, [])

  const loginPi = async () => {
    try {
      if (!(window as any).Pi) {
        setResult('Ouvre dans Pi Browser')
        return
      }
      const auth = await (window as any).Pi.authenticate(['username', 'payments'], () => {})
      setPiUser(auth.user)
      setResult('Bienvenue @' + auth.user.username)
    } catch (e: any) {
      setResult('Erreur login: ' + e.message)
    }
  }

  const sendPi = async () => {
    if (!piUser) { setResult('Connecte-toi'); return }
    if (!toUser || !amount) { setResult('Remplis tout'); return }
    setLoading(true)
    setResult('Envoi...')
    try {
      const res = await fetch('/api/transfer/p2p', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_uid: piUser.uid,
          from_username: piUser.username,
          to_username: toUser.replace('@', ''),
          amount: amount,
          note: note
        })
      })
      const data = await res.json()
      if (data.success) {
        setResult('OK ' + data.message + ' TX:' + data.tx_id)
        setToUser(''); setAmount(''); setNote('')
      } else {
        setResult('Erreur ' + data.error)
      }
    } catch (e: any) {
      setResult('Erreur ' + e.message)
    }
    setLoading(false)
  }

  const qrText = piUser ? piUser.username : ''
  const qrImage = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrText)

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#facc15' }}>GARGOURA BANK</h1>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>P2P Tchad QR 🇹🇩</p>

        {!piUser ? (
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginTop: '20px', textAlign: 'center' }}>
            <button onClick={loginPi} style={{ width: '100%', padding: '14px', borderRadius: '8px', background: '#7c3aed', color: 'white', fontWeight: 'bold', border: 'none' }}>
              Pi Se connecter
            </button>
            {result && <p style={{ marginTop: '10px', fontSize: '12px' }}>{result}</p>}
          </div>
        ) : (
          <div>
            <div style={{ background: '#1e293b', padding: '10px', borderRadius: '8px', marginTop: '15px', textAlign: 'center' }}>
              <b style={{ color: '#facc15' }}>@{piUser.username}</b>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button onClick={() => setShowQR(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: !showQR ? '#facc15' : '#1e293b', color: !showQR ? 'black' : 'white', fontWeight: 'bold' }}>Envoyer</button>
              <button onClick={() => setShowQR(true)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: showQR ? '#facc15' : '#1e293b', color: showQR ? 'black' : 'white', fontWeight: 'bold' }}>QR Recevoir</button>
            </div>

            {!showQR ? (
              <div style={{ background: '#1e293b', padding: '18px', borderRadius: '12px', marginTop: '12px' }}>
                <input placeholder="Destinataire" value={toUser} onChange={(e) => setToUser(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #475569', marginBottom: '10px' }} />
                <input type="number" placeholder="Montant" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #475569', marginBottom: '10px' }} />
                <input placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #475569', marginBottom: '12px' }} />
                <button onClick={sendPi} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '8px', background: '#facc15', color: 'black', fontWeight: 'bold', border: 'none' }}>{loading ? 'Envoi...' : 'ENVOYER PI'}</button>
              </div>
            ) : (
              <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginTop: '12px', textAlign: 'center' }}>
                <p>Montre ce QR pour recevoir des Pi</p>
                <div style={{ background: 'white', padding: '10px', display: 'inline-block', borderRadius: '8px', margin: '10px 0' }}>
                  <img src={qrImage} alt="QR" width="200" height="200" />
                </div>
                <p style={{ fontSize: '12px', color: '#facc15' }}>@{piUser.username}</p>
              </div>
            )}

            {result && <div style={{ marginTop: '12px', padding: '10px', background: '#0f172a', borderRadius: '8px', fontSize: '12px' }}>{result}</div>}
          </div>
        )}
      </div>
    </div>
  )
                   }
