'use client'
import { useState, useEffect } from 'react'
declare global { interface Window { Pi:any } }
function genererGDB(){ return `GDB-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}` }
const GCV = 314159

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [piUser,setPiUser]=useState<any>(null)
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState<string|null>(null)
  const [amountPi,setAmountPi]=useState('')
  const [destGdb,setDestGdb]=useState('')

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
    if(!gAddress.startsWith('G')){ setModal('Adresse G invalide'); return }
    const newGDB = gdbAccount || genererGDB()
    localStorage.setItem('gdb_account',newGDB); localStorage.setItem('pi_g_address',gAddress)
    setGdbAccount(newGDB); setModal(`Succès lié: ${newGDB}`)
  }

  const usd = parseFloat(amountPi||'0') * GCV
  const frais = parseFloat(amountPi||'0') * 0.001
  const total = parseFloat(amountPi||'0') + frais

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:14,fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center',boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
        <img src="/logo.png" alt="GDB" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:'3px solid #1e3a8a'}} />
        <div style={{fontWeight:900,fontSize:20,color:'#1e3a8a',marginTop:10,textAlign:'center'}}>GARGOURA DIGITAL BANK</div>
        <div style={{fontWeight:800,fontSize:12,color:'#a16207',letterSpacing:3}}>GDB • WEB3.0 • PI NETWORK • GCV {GCV}$</div>
        <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          <div style={{background:kyc?'#16a34a':'#e2e8f0',color:kyc?'#fff':'#64748b',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?`● KYC Vérifié @${piUser?.username||'Pionnier'}`:'● KYC Test'}</div>
          {gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}
        </div>
      </div>

      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:13,opacity:0.9}}>Solde Total • {gdbAccount} • 1 π = {GCV.toLocaleString()},00 USD</div>
        <div style={{fontWeight:900,fontSize:28,marginTop:6}}>1 π = {GCV.toLocaleString()},00<br/>USD</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setModal('transfer')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
          <button onClick={()=>setModal('receive')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900}}>Aperçu du Compte</div>
        <div style={{color:'#64748b',fontSize:12}}>{gdbAccount} • G: {gAddress.slice(0,12)}... • Vérifié GCV</div>
        <div style={{display:'flex',gap:12,marginTop:12}}>
          <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>✓ LIÉ</div>
          <div style={{flex:1}}>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}><div style={{fontSize:10,color:'#64748b'}}>N° GDB UNIQUE</div><div style={{fontWeight:800,color:'#16a34a',fontSize:12}}>{gdbAccount}</div></div>
            <div style={{background:'#f8fafc',borderRadius:10,padding:8}}><div style={{fontSize:10,color:'#64748b'}}>ADRESSE G</div><div style={{fontSize:9,wordBreak:'break-all'}}>{gAddress}</div></div>
          </div>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
        <div style={{fontWeight:900,marginBottom:12}}>Fonctionnalités Courantes</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {[{id:'transfer',label:'Transférer'},{id:'virement',label:'Virement'},{id:'dex',label:'Pi DEX'},{id:'convert',label:'Convertir'},{id:'trading',label:'Trading'},{id:'ai',label:'IA'},{id:'blockchain',label:'Blockchain'},{id:'shopping',label:'Shopping'},{id:'wallet',label:'Portefeuilles'},{id:'auto',label:'Automobile'},{id:'agreg',label:'Agrégation'},{id:'gestion',label:'Gestion'}].map(f=>(
            <button key={f.id} onClick={()=>setModal(f.id)} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
        <div style={{fontWeight:900,fontSize:18}}>Comptes Bancaires</div>
        <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="G..." style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button onClick={lier} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
          <button onClick={()=>setModal('wallet')} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>👛 Pi Wallet</button>
        </div>
      </div>

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:20}}>
          <div style={{background:'#fff',borderRadius:20,padding:20,width:'100%',maxWidth:400,maxHeight:'85vh',overflowY:'auto'}}>

            {modal==='transfer' && (
              <div>
                <div style={{fontWeight:900,fontSize:18,color:'#1e40af'}}>↗ Transférer en π • GCV {GCV}$</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:4}}>De {gdbAccount} vers GDB destinataire</div>
                <input value={destGdb} onChange={e=>setDestGdb(e.target.value)} placeholder="GDB destinataire ex: GDB-2026-XXXXXX" style={{width:'100%',marginTop:14,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                <input value={amountPi} onChange={e=>setAmountPi(e.target.value)} type="number" placeholder="Montant en π ex: 0.01" style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:12,padding:12,marginTop:12,fontSize:12}}>
                  <div>💱 Conversion GCV: <b>{amountPi||0} π = {usd.toLocaleString()} USD</b></div>
                  <div style={{marginTop:4}}>Frais (0.1%): <b>{frais.toFixed(6)} π</b> = {(frais*GCV).toFixed(2)} USD</div>
                  <div style={{marginTop:4,fontWeight:800}}>Total débité: <b>{total.toFixed(6)} π</b></div>
                </div>
                <button onClick={()=>{setModal(`Transfert de ${amountPi} π (${usd.toLocaleString()} USD) vers ${destGdb} • En attente validation Mainnet Pi`); setAmountPi('')}} style={{width:'100%',marginTop:14,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Confirmer Envoi</button>
              </div>
            )}

            {modal==='dex' && (
              <div>
                <div style={{fontWeight:900,fontSize:18,color:'#1e40af'}}>Pi DEX • Trading GCV</div>
                <div style={{fontSize:12,marginTop:6}}>1 π = {GCV.toLocaleString()} USD • Pair π/USD • Slippage 0.5%</div>
                <input value={amountPi} onChange={e=>setAmountPi(e.target.value)} type="number" placeholder="π à trader" style={{width:'100%',marginTop:14,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/>
                <div style={{background:'#000',color:'#facc15',borderRadius:12,padding:12,marginTop:12,fontSize:12}}>
                  <div>Valeur GCV: <b style={{color:'#fff'}}>{usd.toLocaleString()} USD</b></div>
                  <div style={{marginTop:4}}>Vous recevrez: ~{usd.toLocaleString()} USD équivalent</div>
                </div>
                <button onClick={()=>setModal(`Ordre DEX placé: ${amountPi} π • ${usd.toLocaleString()} USD • GDB ${gdbAccount}`)} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Placer Ordre</button>
              </div>
            )}

            {modal==='receive' && (
              <div style={{textAlign:'center'}}>
                <div style={{fontWeight:900,fontSize:16}}>✓ QR Code de {gdbAccount}</div>
                <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Scannez pour envoyer des π à GCV {GCV}$</div>
                <div style={{background:'#fff',padding:16,borderRadius:16,marginTop:14,border:'2px solid #facc15',display:'inline-block'}}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`GARGOURA DIGITAL BANK|${gdbAccount}|${gAddress}|GCV:${GCV}`)}`} alt="QR GDB" style={{width:220,height:220}} />
                </div>
                <div style={{background:'#f1f5f9',padding:12,borderRadius:12,marginTop:14,fontSize:11,wordBreak:'break-all',textAlign:'left'}}>
                  <b>GDB Unique:</b> {gdbAccount}<br/><b>G Address:</b> {gAddress}<br/><b>Taux:</b> 1 π = {GCV.toLocaleString()} USD<br/><b>Propriétaire:</b> @{piUser?.username||'Pionnier'} • KYC Vérifié
                </div>
                <div style={{display:'flex',gap:8,marginTop:14}}>
                  <button onClick={()=>{navigator.clipboard.writeText(gdbAccount); alert('GDB copié: '+gdbAccount)}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>📋 Copier GDB</button>
                  <button onClick={()=>setModal(null)} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:10,fontWeight:700}}>Fermer</button>
                </div>
              </div>
            )}

            {!['transfer','dex','receive'].includes(modal) && (
              <div>
                <div style={{fontWeight:900}}>{modal} • GDB {gdbAccount}</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:6}}>Fonctionnalité GCV opérationnelle. Valeur de référence 1 π = {GCV.toLocaleString()} USD.</div>
                <div style={{background:'#f1f5f9',padding:10,borderRadius:10,marginTop:12,fontSize:12}}>Compte: {gdbAccount}</div>
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>Fermer</button>
              </div>
            )}

            {['transfer','dex'].includes(modal) && <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:10,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Annuler</button>}
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
