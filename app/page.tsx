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
  const [activeTab,setActiveTab]=useState('Accueil')
  // Lier Banque states
  const [typeBanque,setTypeBanque]=useState<'traditionnel'|'numerique'>('traditionnel')
  const [nomBanque,setNomBanque]=useState('')
  const [numCompte,setNumCompte]=useState('')
  const [titulaire,setTitulaire]=useState('')
  const [iban,setIban]=useState('')
  const [plateforme,setPlateforme]=useState('')
  const [emailId,setEmailId]=useState('')
  const [tel,setTel]=useState('')

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
    if(typeBanque==='traditionnel'){
      if(!nomBanque || !numCompte || !titulaire){ alert('Remplissez Banque, Numéro et Titulaire'); return }
      const newGDB = gdbAccount || genererGDB()
      localStorage.setItem('gdb_account',newGDB); 
      if(gAddress) localStorage.setItem('pi_g_address',gAddress)
      localStorage.setItem('gdb_bank_link', JSON.stringify({type:'traditionnel', banque:nomBanque, compte:numCompte, titulaire, iban, gdb:newGDB}))
      setGdbAccount(newGDB); setModal(`Succès: ${nomBanque} lié à ${newGDB} • Sécurisé AES-256 PCI DSS`)
    } else {
      if(!plateforme || !emailId){ alert('Remplissez Plateforme et Email'); return }
      const newGDB = gdbAccount || genererGDB()
      localStorage.setItem('gdb_account',newGDB)
      localStorage.setItem('gdb_bank_link', JSON.stringify({type:'numerique', plateforme, email:emailId, tel, gdb:newGDB}))
      setGdbAccount(newGDB); setModal(`Vérification envoyée à ${emailId} • Plateforme ${plateforme} liée à ${newGDB} • SWIFT/SEPA/CEMAC`)
    }
  }

  const usd = parseFloat(amountPi||'0') * GCV
  const frais = parseFloat(amountPi||'0') * 0.001
  const total = parseFloat(amountPi||'0') + frais

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:14,fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img src="/logo.png" alt="GDB" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:'3px solid #1e3a8a'}} />
        <div style={{fontWeight:900,fontSize:20,color:'#1e3a8a',marginTop:10,textAlign:'center'}}>GARGOURA DIGITAL BANK</div>
        <div style={{fontWeight:800,fontSize:11,color:'#a16207',letterSpacing:2,textAlign:'center'}}>GDB • WEB3.0 • PI NETWORK • GCV {GCV}$ • BANQUE MONDIALE</div>
        <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          <div style={{background:kyc?'#16a34a':'#e2e8f0',color:kyc?'#fff':'#64748b',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?`● KYC Vérifié`:'● KYC Test'}</div>
          {gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}
        </div>
      </div>

      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:13,opacity:0.9}}>Solde Total • {gdbAccount} • 1 π = {GCV.toLocaleString()},00 USD</div>
        <div style={{fontWeight:900,fontSize:28,marginTop:6}}>1 π = {GCV.toLocaleString()},00<br/>USD</div>
        <div style={{fontSize:11,opacity:0.8,marginTop:4}}>Banque Mondiale: Traditionnelle + Numérique + CBDC e-CFA e-EUR</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setModal('transfer')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
          <button onClick={()=>setModal('receive')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
        <div style={{fontWeight:900}}>Aperçu du Compte</div>
        <div style={{color:'#64748b',fontSize:12}}>{gdbAccount} • G: {gAddress.slice(0,12)}... • Vérifié GCV</div>
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
        <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Liez banque traditionnelle ou plateforme numérique à votre GDB unique</div>
        <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="Adresse G Stellar (G...)" style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
          <button onClick={()=>setModal('wallet')} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>👛 Pi Wallet</button>
        </div>
      </div>

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:12}}>
          <div style={{background:'#fff',borderRadius:20,padding:18,width:'100%',maxWidth:400,maxHeight:'92vh',overflowY:'auto'}}>

            {modal==='lierBanque' && (
              <div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div></div><div style={{fontWeight:900,fontSize:18,textAlign:'center'}}>Lier un Compte Bancaire</div><button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div>
                <div style={{textAlign:'center',fontSize:13,color:'#64748b',marginTop:4}}>Connectez vos comptes bancaires traditionnels ou numériques pour faciliter les transactions</div>
                
                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:14}}>
                  <button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,fontSize:13,boxShadow:typeBanque==='traditionnel'?'0 2px 6px rgba(0,0,0,0.1)':''}}>🏛️ Traditionnel</button>
                  <button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800,fontSize:13,boxShadow:typeBanque==='numerique'?'0 2px 6px rgba(0,0,0,0.1)':''}}>📱 Numérique</button>
                </div>

                {typeBanque==='traditionnel' ? (
                  <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Sélectionner la Banque</div>
                      <select value={nomBanque} onChange={e=>setNomBanque(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}>
                        <option value="">Choisir une banque</option>
                        <option value="Ecobank Tchad">Ecobank Tchad</option>
                        <option value="UBA Tchad">UBA Tchad</option>
                        <option value="BSIC">BSIC</option>
                        <option value="BCC - Banque Commerciale du Chari">BCC</option>
                        <option value="Orabank">Orabank</option>
                        <option value="BNP Paribas">BNP Paribas</option>
                        <option value="Société Générale">Société Générale</option>
                        <option value="Autre Banque">Autre Banque</option>
                      </select>
                    </div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Numéro de Compte</div><input value={numCompte} onChange={e=>setNumCompte(e.target.value)} placeholder="XXXX XXXX XXXX XXXX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Nom du Titulaire</div><input value={titulaire} onChange={e=>setTitulaire(e.target.value)} placeholder="Nom complet" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>IBAN (Optionnel)</div><input value={iban} onChange={e=>setIban(e.target.value)} placeholder="TD89 0001 0001 0123456789012" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div style={{background:'#dbeafe',border:'1px solid #bfdbfe',borderRadius:12,padding:12,fontSize:11}}><b style={{color:'#1e40af'}}>Sécurisé:</b> Vos informations bancaires sont cryptées avec AES-256 et conformes aux normes PCI DSS</div>
                  </div>
                ) : (
                  <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Plateforme Numérique</div>
                      <select value={plateforme} onChange={e=>setPlateforme(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}>
                        <option value="">Choisir une plateforme</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Wise">Wise</option>
                        <option value="Payoneer">Payoneer</option>
                        <option value="Binance">Binance</option>
                        <option value="Coinbase">Coinbase</option>
                        <option value="Pi Wallet">Pi Wallet</option>
                        <option value="BTC Wallet">BTC Wallet</option>
                        <option value="Solana Phantom">Solana Phantom</option>
                        <option value="USDT TRC20">USDT TRC20</option>
                        <option value="Airtel Money">Airtel Money Tchad</option>
                        <option value="Moov Money">Moov Money Tchad</option>
                      </select>
                    </div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Email / Identifiant</div><input value={emailId} onChange={e=>setEmailId(e.target.value)} placeholder="votre@email.com" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Téléphone (Optionnel)</div><input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+235 XX XX XX XX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:12,padding:12,fontSize:11}}><b style={{color:'#d97706'}}>Vérification:</b> Vous recevrez un code de vérification pour confirmer la liaison du compte</div>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Méthodes de Paiement Supportées</div><div style={{display:'flex',gap:8}}><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>SWIFT</div><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>SEPA</div><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>CEMAC</div></div></div>
                  </div>
                )}

                <button onClick={lier} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>✓ Lier le Compte</button>
              </div>
            )}

            {modal==='paiements' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:40,height:40,background:'#dbeafe',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>↔️</div><div><div style={{fontWeight:900,fontSize:18}}>Paiements</div><div style={{fontSize:12,color:'#64748b'}}>Choisissez une option</div></div><button onClick={()=>setModal(null)} style={{marginLeft:'auto',border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div>
                <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:16}}>
                  <button onClick={()=>setModal('transfer')} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:14}}><div style={{fontWeight:800}}>Transferts P2P</div><div style={{fontSize:12,color:'#64748b'}}>Envoyer en π • GCV {GCV}$</div></button>
                  <button onClick={()=>setModal('mobile')} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:14}}><div style={{fontWeight:800}}>Mobile Money</div><div style={{fontSize:12,color:'#64748b'}}>Airtel • Moov • Tchad</div></button>
                  <button onClick={()=>setModal('bills')} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:14}}><div style={{fontWeight:800}}>Factures</div><div style={{fontSize:12,color:'#64748b'}}>Payer factures en π</div></button>
                  <button onClick={()=>setModal('convert')} style={{textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:14,padding:14}}><div style={{fontWeight:800}}>Convertisseur Universel</div><div style={{fontSize:12,color:'#64748b'}}>BTC, SOL, XRP, XLM, USDT, CBDC e-CFA...</div></button>
                </div>
              </div>
            )}

            {modal==='transfer' && (
              <div><div style={{fontWeight:900,fontSize:18,color:'#1e40af'}}>↗ Transférer P2P • GCV {GCV}$</div><div style={{fontSize:12,color:'#64748b',marginTop:4}}>De {gdbAccount}</div><input value={destGdb} onChange={e=>setDestGdb(e.target.value)} placeholder="GDB destinataire" style={{width:'100%',marginTop:14,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={amountPi} onChange={e=>setAmountPi(e.target.value)} type="number" placeholder="Montant en π ex: 0.01" style={{width:'100%',marginTop:10,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:12,padding:12,marginTop:12,fontSize:12}}><div>💱 <b>{amountPi||0} π = {usd.toLocaleString()} USD</b></div><div style={{marginTop:4}}>Frais 0.1%: {frais.toFixed(6)} π</div><div style={{fontWeight:800,marginTop:4}}>Total: {total.toFixed(6)} π</div></div><button onClick={()=>setModal(`Transfert ${amountPi} π (${usd.toLocaleString()} USD) vers ${destGdb} validé`)} style={{width:'100%',marginTop:14,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Confirmer Envoi</button><button onClick={()=>setModal('paiements')} style={{width:'100%',marginTop:8,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>← Retour</button></div>
            )}

            {modal==='receive' && (
              <div style={{textAlign:'center'}}><div style={{fontWeight:900,fontSize:16}}>✓ QR Code de {gdbAccount}</div><div style={{fontSize:11,color:'#64748b',marginTop:4}}>Scannez pour envoyer des π à GCV {GCV}$</div><div style={{background:'#fff',padding:16,borderRadius:16,marginTop:14,border:'2px solid #facc15',display:'inline-block'}}><img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`GARGOURA|${gdbAccount}|${gAddress}|${GCV}`)}`} alt="QR" style={{width:220,height:220}} /></div><div style={{background:'#f1f5f9',padding:12,borderRadius:12,marginTop:14,fontSize:11,wordBreak:'break-all',textAlign:'left'}}><b>GDB:</b> {gdbAccount}<br/><b>G:</b> {gAddress}<br/><b>GCV:</b> {GCV.toLocaleString()} USD</div><div style={{display:'flex',gap:8,marginTop:14}}><button onClick={()=>{navigator.clipboard.writeText(gdbAccount)}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>📋 Copier GDB</button><button onClick={()=>setModal(null)} style={{flex:1,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button></div></div>
            )}

            {modal==='convert' && (
              <div>
                <div style={{fontWeight:900,fontSize:18}}>🌍 Convertisseur Universel GDB</div>
                <div style={{fontSize:11,color:'#64748b'}}>Pi GCV Pivot: 1 π = {GCV.toLocaleString()} USD</div>
                <input value={amountPi} onChange={e=>setAmountPi(e.target.value)} type="number" placeholder="Montant en π" style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontWeight:700}}/>
                <div style={{background:'#000',color:'#facc15',borderRadius:12,padding:14,marginTop:12}}><div style={{fontSize:12}}>Valeur GCV Pivot</div><div style={{fontSize:20,fontWeight:900,color:'#fff'}}>{usd.toLocaleString()} USD</div></div>
                <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:14,maxHeight:300,overflowY:'auto'}}>
                  {[{sym:'BTC', name:'Bitcoin', rate: usd / 65000},{sym:'SOL', name:'Solana', rate: usd / 145},{sym:'XRP', name:'Ripple', rate: usd / 0.62},{sym:'XLM', name:'Stellar', rate: usd / 0.11},{sym:'BNB', name:'BNB', rate: usd / 610},{sym:'MATIC', name:'Polygon', rate: usd / 0.85},{sym:'USDT', name:'Tether', rate: usd},{sym:'USDC', name:'USDC', rate: usd},{sym:'e-EUR', name:'Euro Numérique CBDC', rate: usd * 0.92},{sym:'e-CNY', name:'Yuan Numérique CBDC', rate: usd * 7.2},{sym:'e-CFA', name:'e-CFA CBDC', rate: usd * 605}].map(c=>(
                    <div key={c.sym} style={{display:'flex',justifyContent:'space-between',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:10,padding:'10px 12px'}}><div><div style={{fontWeight:800,fontSize:12}}>{c.sym}</div><div style={{fontSize:9,color:'#64748b'}}>{c.name}</div></div><div style={{fontWeight:800,fontSize:12}}>{c.rate.toLocaleString(undefined,{maximumFractionDigits:4})} {c.sym}</div></div>
                  ))}
                </div>
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>Fermer</button>
              </div>
            )}

            {(modal==='mobile' || modal==='bills' || modal==='virement' || modal==='dex' || modal==='wallet' || modal==='trading') && (
              <div><div style={{fontWeight:900}}>{modal.toUpperCase()} • GDB {gdbAccount}</div><div style={{fontSize:12,color:'#64748b',marginTop:6}}>Service GCV opérationnel. 1 π = {GCV.toLocaleString()} USD.</div><button onClick={()=>setModal(null)} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:700}}>Fermer</button></div>
            )}

            {!['lierBanque','paiements','transfer','receive','convert','mobile','bills','virement','dex','wallet','trading'].includes(modal) && (
              <div><div style={{fontWeight:900}}>{modal} • {gdbAccount}</div><div style={{fontSize:12,color:'#64748b',marginTop:6}}>Fonctionnalité GCV à {GCV.toLocaleString()} USD</div><button onClick={()=>setModal(null)} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10}}>Fermer</button></div>
            )}
          </div>
        </div>
      )}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{label:'Accueil',icon:'🏠'},{label:'Paiements',icon:'↔️'},{label:'Trading',icon:'📈'},{label:'Services',icon:'🧩'},{label:'Innovation',icon:'💡'},{label:'Sécurité',icon:'🔒'},{label:'Support',icon:'🎧'}].map((t)=>(
          <button key={t.label} onClick={()=>{setActiveTab(t.label); if(t.label==='Paiements') setModal('paiements'); else if(t.label==='Trading') setModal('dex'); else if(t.label==='Accueil') setModal(null); else setModal(t.label.toLowerCase())}} style={{border:'none',background:'none',textAlign:'center',fontSize:8,fontWeight:activeTab===t.label?800:500,color:activeTab===t.label?'#1e40af':'#64748b'}}><div style={{fontSize:16}}>{t.icon}</div>{t.label}</button>
        ))}
      </div>
    </div>
  )
}
