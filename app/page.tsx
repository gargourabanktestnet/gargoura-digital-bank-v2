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
  const [typeBanque,setTypeBanque]=useState<'traditionnel'|'numerique'>('traditionnel')
  const [nomBanque,setNomBanque]=useState('')
  const [numCompte,setNumCompte]=useState('')
  const [titulaire,setTitulaire]=useState('')
  const [iban,setIban]=useState('')
  const [plateforme,setPlateforme]=useState('')
  const [emailId,setEmailId]=useState('')
  const [tel,setTel]=useState('')
  // P2P
  const [p2pType,setP2pType]=useState<'interne'|'externe'>('interne')
  const [destPhone,setDestPhone]=useState('')
  const [note,setNote]=useState('')
  const [banquePartenaire,setBanquePartenaire]=useState('')
  const [numCompteExt,setNumCompteExt]=useState('')
  const [typeDevise,setTypeDevise]=useState<'crypto'|'locale'>('crypto')
  const [zoneTransfert,setZoneTransfert]=useState('CEMAC')

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
      localStorage.setItem('gdb_account',newGDB); if(gAddress) localStorage.setItem('pi_g_address',gAddress)
      localStorage.setItem('gdb_bank_link', JSON.stringify({type:'traditionnel', banque:nomBanque, compte:numCompte, titulaire, iban, gdb:newGDB}))
      setGdbAccount(newGDB); setModal(`Succès: ${nomBanque} lié à ${newGDB}`)
    } else {
      if(!plateforme || !emailId){ alert('Remplissez Plateforme et Email'); return }
      const newGDB = gdbAccount || genererGDB()
      localStorage.setItem('gdb_account',newGDB)
      localStorage.setItem('gdb_bank_link', JSON.stringify({type:'numerique', plateforme, email:emailId, tel, gdb:newGDB}))
      setGdbAccount(newGDB); setModal(`Vérification envoyée à ${emailId} • ${plateforme} liée à ${newGDB}`)
    }
  }

  const usd = parseFloat(amountPi||'0') * GCV
  const frais = parseFloat(amountPi||'0') * 0.001

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:14,fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img src="/logo.png" alt="GDB" style={{width:110,height:110,borderRadius:'50%',objectFit:'cover',border:'3px solid #1e3a8a'}} />
        <div style={{fontWeight:900,fontSize:20,color:'#1e3a8a',marginTop:10,textAlign:'center'}}>GARGOURA DIGITAL BANK</div>
        <div style={{fontWeight:800,fontSize:11,color:'#a16207',letterSpacing:1,textAlign:'center'}}>GDB • WEB3.0 • GCV {GCV}$ • P2P MONDIAL CEMAC UEMOA DOLLAR GOLF</div>
        <div style={{marginTop:8,display:'flex',gap:8}}><div style={{background:kyc?'#16a34a':'#e2e8f0',color:kyc?'#fff':'#64748b',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{kyc?`● KYC Vérifié`:'● KYC Test'}</div>{gdbAccount && <div style={{background:'#1e40af',color:'#fff',padding:'4px 10px',borderRadius:20,fontSize:10,fontWeight:800}}>{gdbAccount}</div>}</div>
      </div>

      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{fontSize:13,opacity:0.9}}>Solde Total • {gdbAccount} • 1 π = {GCV.toLocaleString()} USD</div>
        <div style={{fontWeight:900,fontSize:26,marginTop:6}}>1 π = {GCV.toLocaleString()},00<br/>USD</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button onClick={()=>setModal('transferP2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer P2P</button>
          <button onClick={()=>setModal('receive')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:14}}>
        <div style={{fontWeight:900,marginBottom:12}}>Fonctionnalités Courantes</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
          {[{id:'transferP2P',label:'Transférer'},{id:'lierBanque',label:'Lier Banque'},{id:'dex',label:'Pi DEX'},{id:'convert',label:'Convertir'},{id:'trading',label:'Trading'},{id:'paiements',label:'Paiements'},{id:'wallet',label:'Portefeuilles'},{id:'agreg',label:'Agrégation'}].map(f=>(
            <button key={f.id} onClick={()=>setModal(f.id)} style={{border:'1px solid #e2e8f0',borderRadius:14,padding:'10px 4px',background:'#fff',fontSize:9,fontWeight:700}}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:20,padding:16}}>
        <div style={{fontWeight:900,fontSize:18}}>Comptes Bancaires</div>
        <input value={gAddress} onChange={e=>setGAddress(e.target.value.trim())} placeholder="Adresse G Stellar (G...)" style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'1px solid #cbd5e1',fontSize:12}}/>
        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button onClick={()=>setModal('lierBanque')} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>🔗 Lier Banque</button>
          <button onClick={()=>setModal('transferP2P')} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:700}}>↗ P2P Mondial</button>
        </div>
      </div>

      {modal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:10}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:420,maxHeight:'94vh',overflowY:'auto'}}>

            {modal==='transferP2P' && (
              <div>
                <div style={{background:'#1e40af',color:'#fff',margin:-16,padding:16,borderRadius:'20px 20px 0 0',display:'flex',alignItems:'center',gap:10}}>
                  <button onClick={()=>setModal(null)} style={{background:'rgba(255,255,255,0.2)',border:'none',borderRadius:20,width:30,height:30,color:'#fff'}}>←</button>
                  <div><div style={{fontWeight:900,fontSize:18}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
                  <div style={{marginLeft:'auto',display:'flex',gap:12,fontSize:18}}>⚙️ 👤 🌐 🔔<span style={{background:'red',borderRadius:10,fontSize:10,padding:'2px 5px'}}>3</span></div>
                </div>

                <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:16}}>
                  <button onClick={()=>setP2pType('interne')} style={{flex:1,background:p2pType==='interne'?'#fff':'transparent',border:'none',borderRadius:16,padding:10,fontWeight:800,fontSize:13,boxShadow:p2pType==='interne'?'0 2px 6px rgba(0,0,0,0.15)':''}}>📞 P2P Interne</button>
                  <button onClick={()=>setP2pType('externe')} style={{flex:1,background:p2pType==='externe'?'#fff':'transparent',border:'none',borderRadius:16,padding:10,fontWeight:800,fontSize:13,boxShadow:p2pType==='externe'?'0 2px 6px rgba(0,0,0,0.15)':''}}>🌐 P2P Externe</button>
                </div>

                {p2pType==='interne' ? (
                  <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:14,marginTop:14}}>
                    <div style={{fontWeight:900,fontSize:16}}>Transfert Interne Gargoura</div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Destinataire</div><div style={{display:'flex',gap:8}}><input value={destPhone} onChange={e=>setDestPhone(e.target.value)} placeholder="Numéro de téléphone ou ID" style={{flex:1,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><button style={{width:44,height:44,background:'#f1f5f9',border:'1px solid #e2e8f0',borderRadius:12}}>📷</button></div></div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Cryptomonnaie</div>
                      <select style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option>π PiCoin (314,159.00 USD)</option><option>BTC Bitcoin</option><option>SOL Solana</option><option>XRP</option><option>XLM</option><option>USDT</option><option>e-CFA CBDC</option></select>
                    </div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Montant</div><input value={amountPi} onChange={e=>setAmountPi(e.target.value)} placeholder="0.00" type="number" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><div style={{fontSize:11,color:'#16a34a',marginTop:4}}>≈ {(parseFloat(amountPi||'0')*GCV).toLocaleString()} USD GCV</div></div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Note (optionnel)</div><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Ajouter une note" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <button onClick={()=>setModal(`P2P Interne: ${amountPi} π envoyé à ${destPhone} • ${gdbAccount} • Note: ${note}`)} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800}}>Envoyer</button>
                  </div>
                ) : (
                  <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:14,marginTop:14}}>
                    <div style={{fontWeight:900,fontSize:16}}>Transfert Externe</div>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6,color:'#1e40af',fontSize:12,fontWeight:700}}>🏦 Conforme ISO 20022 • SWIFT • SEPA</div>
                    
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Zone de Transfert</div>
                      <select value={zoneTransfert} onChange={e=>setZoneTransfert(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}>
                        <option>CEMAC</option><option>UEMOA</option><option>DOLLAR</option><option>JORDANIE GOLF</option><option>MOYEN-ORIENT</option><option>INTERNATIONAL</option><option>EUROPE SEPA</option>
                      </select>
                    </div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Banque Partenaire</div>
                      <select value={banquePartenaire} onChange={e=>setBanquePartenaire(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}>
                        <option value="">Choisir une banque</option><option>Ecobank CEMAC</option><option>UBA UEMOA</option><option>Bank of Jordan</option><option>Emirates NBD - Dubai</option><option>Qatar National Bank</option><option>BNP Paribas - International</option><option>CitiBank - Dollar Zone</option>
                      </select>
                    </div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Numéro de Compte</div><input value={numCompteExt} onChange={e=>setNumCompteExt(e.target.value)} placeholder="Entrer le numéro de compte" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Type de Devise</div>
                      <div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4}}>
                        <button onClick={()=>setTypeDevise('crypto')} style={{flex:1,background:typeDevise==='crypto'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:700,fontSize:12,boxShadow:typeDevise==='crypto'?'0 1px 4px rgba(0,0,0,0.1)':''}}>Cryptomonnaies</button>
                        <button onClick={()=>setTypeDevise('locale')} style={{flex:1,background:typeDevise==='locale'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:700,fontSize:12,boxShadow:typeDevise==='locale'?'0 1px 4px rgba(0,0,0,0.1)':''}}>Devises Locales</button>
                      </div>
                      {typeDevise==='crypto' ? 
                        <select style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option>π PiCoin (314,159.00 USD)</option><option>BTC</option><option>SOL</option><option>XRP</option><option>XLM</option><option>USDT</option><option>USDC</option></select>
                        :
                        <select style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option>XAF - CEMAC</option><option>XOF - UEMOA</option><option>USD - Dollar</option><option>JOD - Dinar Jordanien</option><option>SAR - Riyal Saoudien</option><option>AED - Dirham UAE</option><option>EUR - Euro</option><option>e-CFA CBDC</option><option>e-EUR CBDC</option></select>
                      }
                    </div>
                    <div style={{marginTop:12}}><div style={{fontWeight:700,fontSize:13,marginBottom:6}}>Montant</div><input value={amountPi} onChange={e=>setAmountPi(e.target.value)} placeholder="0.00" type="number" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/></div>
                    <div style={{background:'#dcfce7',border:'1px solid #bbf7d0',borderRadius:12,padding:10,marginTop:12,fontSize:12,display:'flex',gap:8,alignItems:'center'}}><span>⚡</span><b>Transfert instantané via système interopérable • Zone {zoneTransfert} • GCV {GCV}$</b></div>
                    <button onClick={()=>setModal(`P2P Externe {zoneTransfert} → {banquePartenaire} Compte {numCompteExt} • {amountPi} π • ISO20022 SWIFT • {gdbAccount}`.replace('{zoneTransfert}',zoneTransfert).replace('{banquePartenaire}',banquePartenaire).replace('{numCompteExt}',numCompteExt).replace('{amountPi}',amountPi))} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>⚡ sendToExternalBank</button>
                  </div>
                )}
                <button onClick={()=>setModal(null)} style={{width:'100%',marginTop:10,background:'#e2e8f0',border:'none',borderRadius:12,padding:10}}>Fermer</button>
              </div>
            )}

            {modal==='lierBanque' && (
              <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div></div><div style={{fontWeight:900,fontSize:18,textAlign:'center'}}>Lier un Compte Bancaire</div><button onClick={()=>setModal(null)} style={{border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div><div style={{textAlign:'center',fontSize:13,color:'#64748b',marginTop:4}}>Connectez vos comptes traditionnels ou numériques</div><div style={{display:'flex',background:'#f1f5f9',borderRadius:20,padding:4,marginTop:14}}><button onClick={()=>setTypeBanque('traditionnel')} style={{flex:1,background:typeBanque==='traditionnel'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>🏛️ Traditionnel</button><button onClick={()=>setTypeBanque('numerique')} style={{flex:1,background:typeBanque==='numerique'?'#fff':'transparent',border:'none',borderRadius:16,padding:8,fontWeight:800}}>📱 Numérique</button></div>
              {typeBanque==='traditionnel' ? (
                <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}><select value={nomBanque} onChange={e=>setNomBanque(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir une banque</option><option>Ecobank Tchad</option><option>UBA Tchad</option><option>BSIC</option><option>Orabank</option><option>BNP Paribas</option></select><input value={numCompte} onChange={e=>setNumCompte(e.target.value)} placeholder="XXXX XXXX XXXX XXXX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={titulaire} onChange={e=>setTitulaire(e.target.value)} placeholder="Nom complet" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={iban} onChange={e=>setIban(e.target.value)} placeholder="TD89 0001 0001 0123456789012" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><div style={{background:'#dbeafe',borderRadius:12,padding:12,fontSize:11}}><b>Sécurisé:</b> AES-256 PCI DSS</div></div>
              ) : (
                <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}><select value={plateforme} onChange={e=>setPlateforme(e.target.value)} style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}><option value="">Choisir une plateforme</option><option>PayPal</option><option>Binance</option><option>Pi Wallet</option><option>BTC Wallet</option><option>Airtel Money</option><option>Moov Money</option></select><input value={emailId} onChange={e=>setEmailId(e.target.value)} placeholder="votre@email.com" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><input value={tel} onChange={e=>setTel(e.target.value)} placeholder="+235 XX XX XX XX" style={{width:'100%',padding:12,borderRadius:12,border:'1px solid #cbd5e1'}}/><div style={{background:'#fef3c7',borderRadius:12,padding:12,fontSize:11}}><b>Vérification:</b> Code de vérification pour confirmer</div><div style={{display:'flex',gap:8}}><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>SWIFT</div><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>SEPA</div><div style={{flex:1,background:'#f1f5f9',borderRadius:8,padding:8,textAlign:'center',fontSize:11,fontWeight:700}}>CEMAC</div></div></div>
              )}
              <button onClick={lier} style={{width:'100%',marginTop:14,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:14,fontWeight:800}}>✓ Lier le Compte</button></div>
            )}

            {modal==='paiements' && (
              <div><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:40,height:40,background:'#dbeafe',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>↔️</div><div><div style={{fontWeight:900,fontSize:18}}>Paiements</div><div style={{fontSize:12,color:'#64748b'}}>Choisissez une option</div></div><button onClick={()=>setModal(null)} style={{marginLeft:'auto',border:'none',background:'#f1f5f9',borderRadius:20,width:28,height:28}}>✕</button></div><div style={{display:'flex',flexDirection:'column',gap:10,marginTop:16}}><button onClick={()=>setModal('transferP2P')
