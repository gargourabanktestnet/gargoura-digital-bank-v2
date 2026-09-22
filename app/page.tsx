'use client'
import { useState } from 'react'

const LANGS: any = {
 fr: { name:'Français', flag:'🇫🇷', accueil:'Accueil', envoyer:'Envoyer', recevoir:'Recevoir', deposer:'Déposer', solde:'Solde Pi', xaf:'XAF Disponible', convert:'Convertisseur', retrait:'Retrait Agent', trading:'Trading', dashboard:'Dashboard', admin:'Admin', quick:'Actions Rapides', via:'via', agent:'Agent: 66 78 75 46' },
 en: { name:'English', flag:'🇬🇧', accueil:'Home', envoyer:'Send', recevoir:'Receive', deposer:'Deposit', solde:'Pi Balance', xaf:'XAF Available', convert:'Converter', retrait:'Withdrawal', trading:'Trading', dashboard:'Dashboard', admin:'Admin', quick:'Quick Actions', via:'via', agent:'Agent: +235 66 78 75 46' },
 ar: { name:'العربية', flag:'🇸🇦', accueil:'الرئيسية', envoyer:'إرسال', recevoir:'استلام', deposer:'إيداع', solde:'رصيد Pi', xaf:'XAF متاح', convert:'المحول', retrait:'سحب', trading:'تداول', dashboard:'لوحة', admin:'إدارة', quick:'إجراءات سريعة', via:'عبر', agent:'وكيل: 66 78 75 46' },
 es: { name:'Español', flag:'🇪🇸', accueil:'Inicio', envoyer:'Enviar', recevoir:'Recibir', deposer:'Depositar', solde:'Saldo Pi', xaf:'XAF Disponible', convert:'Convertidor', retrait:'Retiro', trading:'Trading', dashboard:'Panel', admin:'Admin', quick:'Acciones Rápidas', via:'vía', agent:'Agente: 66 78 75 46' },
 zh: { name:'中文', flag:'🇨🇳', accueil:'首页', envoyer:'发送', recevoir:'接收', deposer:'存款', solde:'Pi余额', xaf:'XAF可用', convert:'转换器', retrait:'提现', trading:'交易', dashboard:'仪表盘', admin:'管理', quick:'快捷操作', via:'通过', agent:'代理: 66 78 75 46' },
 pt: { name:'Português', flag:'🇵🇹', accueil:'Início', envoyer:'Enviar', recevoir:'Receber', deposer:'Depositar', solde:'Saldo Pi', xaf:'XAF Disponível', convert:'Conversor', retrait:'Retirada', trading:'Trading', dashboard:'Painel', admin:'Admin', quick:'Ações Rápidas', via:'via', agent:'Agente: 66 78 75 46' },
 sw: { name:'Kiswahili', flag:'🇹🇿', accueil:'Nyumbani', envoyer:'Tuma', recevoir:'Pokea', deposer:'Weka', solde:'Salio Pi', xaf:'XAF Inapatikana', convert:'Kigeuzi', retrait:'Kutoa', trading:'Biashara', dashboard:'Dashibodi', admin:'Msimamizi', quick:'Vitendo vya Haraka', via:'kupitia', agent:'Wakala: 66 78 75 46' },
 ha: { name:'Hausa', flag:'🇳🇪', accueil:'Gida', envoyer:'Aika', recevoir:'Karba', deposer:'Ajiye', solde:'Ma\'auni Pi', xaf:'XAF Akwai', convert:'Mai canzawa', retrait:'Cirewa', trading:'Ciniki', dashboard:'Allo', admin:'Admin', quick:'Ayyuka masu sauri', via:'ta', agent:'Wakili: 66 78 75 46' },
}

export default function Home(){
 const [lang, setLang] = useState('fr')
 const [showLangs, setShowLangs] = useState(false)
 const [amount, setAmount] = useState(1000000)
 const [tab, setTab] = useState('home')
 const [from, setFrom] = useState('XAF')
 const t = LANGS[lang]
 const rates: any = { XAF:650, XOF:650, USD:1, EUR:0.92, JOD:0.71 }
 const toPi = (amount / rates[from]).toFixed(2)
 const phoneAgent = "23566787546"

 const handleAction = (op:string, action:string) => {
  const msg = `Salam Gargoura Bank! Je veux ${action} ${amount} ${from} (${toPi} π) via ${op} - Langue: ${t.name} - Mon num:`
  window.open(`https://wa.me/${phoneAgent}?text=${encodeURIComponent(msg)}`, '_blank')
 }

 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', paddingBottom:'80px'}}>
   {/* HEADER */}
   <div style={{background:'#1e293b', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10, borderBottom:'1px solid #334155'}}>
    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
     <img src="/logo.png" alt="GDB" style={{width:'42px', height:'42px', borderRadius:'50%', border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15', fontSize:'14px'}}>GARGOURA DIGITAL BANK</b><br/><small style={{color:'#94a3b8', fontSize:'10px'}}>🌍 WORLD • {t.agent}</small></div>
    </div>
    <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#0f172a', border:'1px solid #facc15', borderRadius:'20px', padding:'6px 12px', color:'#facc15', fontWeight:'bold'}}>{LANGS[lang].flag} {lang.toUpperCase()}</button>
   </div>

   {showLangs && (
    <div style={{background:'#1e293b', padding:'12px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'6px', borderBottom:'1px solid #334155'}}>
     {Object.keys(LANGS).map(l=><button key={l} onClick={()=>{setLang(l); setShowLangs(false)}} style={{background:lang===l?'#facc15':'#0f172a', color:lang===l?'black':'white', border:'1px solid #334155', padding:'8px', borderRadius:'8px', fontSize:'12px'}}>{LANGS[l].flag} {LANGS[l].name}</button>)}
     <div style={{gridColumn:'1/4', textAlign:'center', color:'#475569', fontSize:'10px', marginTop:'6px'}}>+ 100 langues disponibles • Contacte-nous pour ajouter ta langue maternelle!</div>
    </div>
   )}

   {/* ACCUEIL RAPIDE */}
   {tab==='home' && (
    <>
     <div style={{padding:'14px'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
       <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)', padding:'16px', borderRadius:'16px', color:'black'}}><small style={{opacity:0.7}}>{t.solde}</small><h2 style={{margin:'4px 0'}}>1,250 π</h2><small>≈ 812,500 XAF</small></div>
       <div style={{background:'#1e293b', padding:'16px', borderRadius:'16px', border:'1px solid #334155'}}><small style={{color:'#94a3b8'}}>{t.xaf}</small><h2 style={{margin:'4px 0'}}>812,500</h2><small style={{color:'#22c55e'}}>● En ligne</small></div>
      </div>

      <div style={{marginTop:'16px'}}>
       <h3 style={{color:'#facc15', margin:'0 0 10px 0', fontSize:'14px'}}>{t.quick}</h3>
       <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'8px'}}>
        <button onClick={()=>setTab('send')} style={{background:'#1e293b', border:'1px solid #334155', borderRadius:'12px', padding:'12px 4px', color:'white'}}><div style={{fontSize:'22px'}}>📤</div><small>{t.envoyer}</small></button>
        <button onClick={()=>setTab('receive')} style={{background:'#1e293b', border:'1px solid #334155', borderRadius:'12px', padding:'12px 4px', color:'white'}}><div style={{fontSize:'22px'}}>📥</div><small>{t.recevoir}</small></button>
        <button onClick={()=>setTab('deposit')} style={{background:'#1e293b', border:'1px solid #334155', borderRadius:'12px', padding:'12px 4px', color:'white'}}><div style={{fontSize:'22px'}}>💰</div><small>{t.deposer}</small></button>
        <a href="/admin" style={{background:'#1e293b', border:'1px solid #facc15', borderRadius:'12px', padding:'12px 4px', color:'white', textAlign:'center', textDecoration:'none'}}><div style={{fontSize:'22px'}}>🔐</div><small>{t.admin}</small></a>
       </div>
      </div>

      <div style={{background:'#1e293b', padding:'14px', borderRadius:'14px', marginTop:'16px', border:'1px solid #334155'}}>
       <h4 style={{color:'#facc15', margin:'0 0 8px 0', fontSize:'13px'}}>{t.convert} • 1 π = {rates[from]} {from}</h4>
       <div style={{display:'flex', gap:'8px'}}>
        <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} style={{flex:1, padding:'12px', borderRadius:'10px', background:'#0f172a', border:'1px solid #334155', color:'white'}}/>
        <select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:'12px', borderRadius:'10px', background:'#0f172a', color:'white', border:'1px solid #334155'}}><option value="XAF">XAF</option><option value="XOF">XOF</option><option value="USD">USD</option><option value="JOD">JOD</option></select>
       </div>
       <div style={{textAlign:'center', marginTop:'10px'}}><h2 style={{color:'#facc15', margin:0}}>{toPi} π</h2></div>
      </div>
     </div>
    </>
   )}

   {tab==='send' && (
    <div style={{padding:'14px'}}>
     <h2 style={{color:'#facc15'}}>📤 {t.envoyer} Pi → XAF</h2>
     <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'12px'}}>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="Montant" style={{width:'100%', padding:'12px', borderRadius:'8px', background:'#0f172a', border:'1px solid #334155', color:'white', marginBottom:'10px'}}/>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
       <button onClick={()=>handleAction('Airtel Tchad', t.envoyer)} style={{padding:'14px', background:'#ff0000', color:'white', border:'none', borderRadius:'10px', fontWeight:'bold'}}>Airtel Tchad</button>
       <button onClick={()=>handleAction('MTN', t.envoyer)} style={{padding:'14px', background:'#ffcc00', color:'black', border:'none', borderRadius:'10px', fontWeight:'bold'}}>MTN</button>
       <button onClick={()=>handleAction('Moov', t.envoyer)} style={{padding:'14px', background:'#0066ff', color:'white', border:'none', borderRadius:'10px', fontWeight:'bold'}}>Moov Africa</button>
       <button onClick={()=>handleAction('Wave', t.envoyer)} style={{padding:'14px', background:'#00c8ff', color:'white', border:'none', borderRadius:'10px', fontWeight:'bold'}}>Wave</button>
      </div>
     </div>
    </div>
   )}

   {tab==='receive' && (
    <div style={{padding:'14px', textAlign:'center'}}>
     <h2 style={{color:'#facc15'}}>📥 {t.recevoir} Pi</h2>
     <div style={{background:'white', padding:'16px', borderRadius:'16px', marginTop:'12px', display:'inline-block'}}><div style={{width:'200px', height:'200px', background:'#0f172a', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'12px'}}><span style={{fontSize:'80px'}}>🔗</span></div></div>
     <p style={{marginTop:'12px'}}>Ton adresse Pi Wallet:</p><code style={{background:'#1e293b', padding:'8px 12px', borderRadius:'8px', color:'#facc15', fontSize:'11px'}}>GDB-PI-66787546-TD-2026</code>
     <button onClick={()=>handleAction('QR Code', t.recevoir)} style={{width:'100%', background:'#25D366', color:'white', padding:'14px', borderRadius:'10px', border:'none', marginTop:'14px', fontWeight:'bold'}}>Partager QR sur WhatsApp</button>
    </div>
   )}

   {tab==='deposit' && (
    <div style={{padding:'14px'}}>
     <h2 style={{color:'#facc15'}}>💰 {t.deposer} XAF → Pi</h2>
     <div style={{background:'#1e293b', padding:'14px', borderRadius:'12px', marginTop:'12px'}}>
      <p style={{color:'#94a3b8', fontSize:'13px'}}>Dépose XAF via Mobile Money et reçois Pi instantanément. Agent 66 78 75 46</p>
      <div style={{display:'grid', gap:'8px', marginTop:'10px'}}>
       <button onClick={()=>handleAction('Airtel', t.deposer)} style={{padding:'14px', background:'#1e293b', border:'1px solid #facc15', borderRadius:'10px', color:'white'}}>💳 Déposer via Airtel Money</button>
       <button onClick={()=>handleAction('MTN', t.deposer)} style={{padding:'14px', background:'#1e293b', border:'1px solid #facc15', borderRadius:'10px', color:'white'}}>💳 Déposer via MTN MoMo</button>
      </div>
     </div>
    </div>
   )}

   {/* MENU BAS PRINCIPAL */}
   <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#1e293b', borderTop:'1px solid #334155', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', padding:'6px 0'}}>
    <button onClick={()=>setTab('home')} style={{background:'none', border:'none', color:tab==='home'?'#facc15':'#94a3b8', padding:'6px'}}><div style={{fontSize:'20px'}}>🏠</div><small style={{fontSize:'10px'}}>{t.accueil}</small></button>
    <button onClick={()=>setTab('send')} style={{background:'none', border:'none', color:tab==='send'?'#facc15':'#94a3b8', padding:'6px'}}><div style={{fontSize:'20px'}}>📤</div><small style={{fontSize:'10px'}}>{t.envoyer}</small></button>
    <button onClick={()=>setTab('receive')} style={{background:'none', border:'none', color:tab==='receive'?'#facc15':'#94a3b8', padding:'6px'}}><div style={{fontSize:'20px'}}>📥</div><small style={{fontSize:'10px'}}>{t.recevoir}</small></button>
    <button onClick={()=>setTab('deposit')} style={{background:'none', border:'none', color:tab==='deposit'?'#facc15':'#94a3b8', padding:'6px'}}><div style={{fontSize:'20px'}}>💰</div><small style={{fontSize:'10px'}}>{t.deposer}</small></button>
    <a href="/history" style={{textAlign:'center', textDecoration:'none', color:'#94a3b8', padding:'6px'}}><div style={{fontSize:'20px'}}>📊</div><small style={{fontSize:'10px'}}>{t.dashboard}</small></a>
   </div>
  </div>
 )
  }
