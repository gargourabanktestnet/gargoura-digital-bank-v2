'use client'
import { useState, useEffect } from 'react'

const GCV = 314159
function formatG(a:string){ if(!a || a.length<8) return a; return a.slice(0,4)+'...'+a.slice(-4) }
function genGDB(){ return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000) }

const LANGS:any = {
  fr:{
    flag:'🇫🇷', name:'Francais',
    menuPrincipal:'Menu Principal', toutes:'Toutes les fonctionnalites GDB',
    comptes:'COMPTES & PROFIL', accueil:'Accueil', tableau:'Tableau de bord', profil:'Mon Profil', gerer:'Gerer mon compte', portefeuilles:'Portefeuilles', crypto:'Crypto & Digital',
    paiements:'PAIEMENTS & TRANSFERTS', p2p:'Transferts P2P', interne:'Interne & International', mobile:'Mobile Money', zone:'Zone CEMAC & UEMOA', factures:'Paiement Factures', eau:'Eau Electricite etc', convert:'Convertisseur', devises:'93 devises mondiales',
    trading:'TRADING & INVESTISSEMENTS', tradingPi:'Trading Pi', paires:'10 paires en temps reel', dex:'Pi DEX & AMM', echange:'Echange decentralise Web 3.0', staking:'Staking Crypto', cryptos:'12 cryptomonnaies', token:'Token GDB', prep:'Preparation Pi Network',
    voyage:'VOYAGE GASTRONOMIE & SERVICES PUBLICS', resa:'Reservations premium', vols:'Vols hotels et restaurants en pi', servicesGov:'Services gouvernementaux Tchad', demarches:'Demarches et frais preparatoires', douane:'Douane automatique', estimation:'Estimation des frais importation',
    bancaires:'SERVICES BANCAIRES', cartes:'Cartes Bancaires', virtuel:'Virtuelles & Physiques', ecommerce:'E-Commerce', plateformes:'8 plateformes mondiales', auto:'Partenariat Automobile', marques:'18 marques disponibles',
    securite:'SECURITE & CONFORMITE', securite2:'Securite', protection:'Protection avancee', conformite:'Conformite', normes:'Normes internationales', surveillance:'Surveillance IA', monitoring:'Monitoring intelligent',
    support:'SUPPORT & PARAMETRES', params:'Parametres', config:'Configuration', aide:'Aide & Support', centre:'Centre assistance', assistant:'Assistant IA Gargoura', iaText:'Intelligence artificielle pour surveiller optimiser et securiser toutes vos operations bancaires en temps reel', voirIA:'Voir la Surveillance IA',
    contact:'Contact Gargoura Digital Bank', moov:'Moov Money:', support2:'Support:', email:'Email:',
    solde:'Solde Total', taux:'Taux de reference indicatif pour affichage des operations.', frais:'Frais de transaction : calcules a la confirmation en pi', envoyer:'Envoyer', recevoir:'Recevoir', ligne:'Systeme en Ligne', tempsReel:'Toutes les transactions sont traitees en temps reel',
    innovation:'INNOVATION & TECHNOLOGIE', iaAuto:'IA & Automatisation', noCode:'Outils no-code intelligents', blockchain:'Blockchain & Web3', techDec:'Technologies decentralisees', api:'API & Integrations', connect:'Connectez vos services'
  },
  en:{
    flag:'🇺🇸', name:'English',
    menuPrincipal:'Main Menu', toutes:'All GDB features',
    comptes:'ACCOUNTS & PROFILE', accueil:'Home', tableau:'Dashboard', profil:'My Profile', gerer:'Manage my account', portefeuilles:'Wallets', crypto:'Crypto & Digital',
    paiements:'PAYMENTS & TRANSFERS', p2p:'P2P Transfers', interne:'Internal & International', mobile:'Mobile Money', zone:'CEMAC & UEMOA Zone', factures:'Bill Payment', eau:'Water Electricity etc', convert:'Converter', devises:'93 world currencies',
    trading:'TRADING & INVESTMENTS', tradingPi:'Trading Pi', paires:'10 real-time pairs', dex:'Pi DEX & AMM', echange:'Decentralized Exchange Web 3.0', staking:'Staking Crypto', cryptos:'12 cryptocurrencies', token:'GDB Token', prep:'Pi Network Preparation',
    voyage:'TRAVEL GASTRONOMY & PUBLIC SERVICES', resa:'Premium bookings', vols:'Flights hotels and restaurants in pi', servicesGov:'Chad Government Services', demarches:'Procedures and preparatory fees', douane:'Automatic Customs', estimation:'Import fee estimation',
    bancaires:'BANKING SERVICES', cartes:'Bank Cards', virtuel:'Virtual & Physical', ecommerce:'E-Commerce', plateformes:'8 global platforms', auto:'Automobile Partnership', marques:'18 brands available',
    securite:'SECURITY & COMPLIANCE', securite2:'Security', protection:'Advanced protection', conformite:'Compliance', normes:'International standards', surveillance:'AI Monitoring', monitoring:'Intelligent monitoring',
    support:'SUPPORT & SETTINGS', params:'Settings', config:'Configuration', aide:'Help & Support', centre:'Help Center', assistant:'Gargoura AI Assistant', iaText:'AI to monitor optimize and secure all your banking operations in real time', voirIA:'View AI Monitoring',
    contact:'Contact Gargoura Digital Bank', moov:'Moov Money:', support2:'Support:', email:'Email:',
    solde:'Total Balance', taux:'Indicative reference rate for display.', frais:'Transaction fee: calculated at confirmation in pi', envoyer:'Send', recevoir:'Receive', ligne:'System Online', tempsReel:'All transactions processed in real-time',
    innovation:'INNOVATION & TECH', iaAuto:'AI & Automation', noCode:'Intelligent no-code tools', blockchain:'Blockchain & Web3', techDec:'Decentralized technologies', api:'API & Integrations', connect:'Connect your services'
  }
}

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState('')
  const [activeSection,setActiveSection]=useState('accueil')
  const [lang,setLang]=useState('fr')
  const [showMenu,setShowMenu]=useState(false)
  const [showLang,setShowLang]=useState(false)
  const [logoError,setLogoError]=useState(false)
  const [amountPi,setAmountPi]=useState('')
  const t = LANGS[lang]

  useEffect(()=>{
    try{
      const a=localStorage.getItem('gdb_account')
      const g=localStorage.getItem('pi_g_address')
      const p=localStorage.getItem('pi_user')
      const l=localStorage.getItem('gdb_lang')
      if(a) setGdbAccount(a)
      if(g) setGAddress(g)
      if(p) setKyc(true)
      if(l && LANGS[l]) setLang(l)
    }catch(e){}
  },[])

  function changeLang(l:string){ setLang(l); localStorage.setItem('gdb_lang',l); setShowLang(false) }
  function doKyc(){ const n=gdbAccount||genGDB(); setGdbAccount(n); setKyc(true); localStorage.setItem('gdb_account',n); localStorage.setItem('pi_user','ok'); setModal('KYC OK '+n) }

  function handleBottomClick(section:string){
    setActiveSection(section)
    if(section==='accueil'){ setShowMenu(false); window.scrollTo({top:0,behavior:'smooth'}) }
    else { setModal(section) }
  }

  function Card(p:any){
    return (
      <button onClick={p.onClick} style={{width:'100%',textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:'14px 16px',display:'flex',alignItems:'center',gap:14}}>
        <div style={{width:48,height:48,background:'#eef2ff',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{p.icon}</div>
        <div><div style={{fontWeight:800,fontSize:16}}>{p.title}</div><div style={{fontSize:13,color:'#64748b'}}>{p.sub}</div></div>
      </button>
    )
  }

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:18}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <button onClick={function(){setShowLang(!showLang)}} style={{border:'none',background:'none',color:'#fff',fontSize:18}}>🌐</button>
        <button style={{border:'none',background:'none',color:'#fff',fontSize:18,position:'relative'}}>🔔<span style={{position:'absolute',top:-8,right:-8,background:'#ef4444',color:'#fff',fontSize:10,borderRadius:10,width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center'}}>3</span></button>
      </div>

      {showLang && (
        <div style={{position:'fixed',top:60,right:10,background:'#fff',border:'2px solid #facc15',borderRadius:16,padding:10,zIndex:60,width:200}}>
          {Object.keys(LANGS).map(function(k){ return (
            <button key={k} onClick={function(){changeLang(k)}} style={{width:'100%',display:'flex',gap:8,padding:10,border:'none',background:lang===k?'#fef3c7':'#fff',borderRadius:10}}>{LANGS[k].flag} {LANGS[k].name} {lang===k?'✓':''}</button>
          )})}
        </div>
      )}

      {/* MENU HAMBURGER - 7 SECTIONS */}
      {showMenu && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div onClick={function(){setShowMenu(false)}} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
          <div style={{width:'88%',maxWidth:380,background:'#fff',height:'100%',overflowY:'auto',paddingBottom:100}}>
            <div style={{background:'#1e40af',color:'#fff',padding:'14px 16px',display:'flex',gap:10,alignItems:'center'}}>
              <button onClick={function(){setShowMenu(false)}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
              <div><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
            </div>
            <div style={{padding:16}}>
              <div style={{fontWeight:900,fontSize:22}}>{t.menuPrincipal}</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{t.toutes}</div>
              <div style={{marginTop:16,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.comptes}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="🏠" title={t.accueil} sub={t.tableau} onClick={function(){setActiveSection('accueil'); setShowMenu(false); window.scrollTo({top:0,behavior:'smooth'})}} />
                <Card icon="👤" title={t.profil} sub={t.gerer} onClick={function(){setModal('profil')}} />
                <Card icon="👛" title={t.portefeuilles} sub={t.crypto} onClick={function(){setModal('portefeuilles')}} />
              </div>
              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.paiements}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="↔️" title={t.p2p} sub={t.interne} onClick={function(){setModal('p2p')}} />
                <Card icon="📱" title={t.mobile} sub={t.zone} onClick={function(){setModal('mobile')}} />
                <Card icon="🧾" title={t.factures} sub={t.eau} onClick={function(){setModal('factures')}} />
                <Card icon="💲" title={t.convert} sub={t.devises} onClick={function(){setModal('convert')}} />
              </div>
              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.trading}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="📈" title={t.tradingPi} sub={t.paires} onClick={function(){setModal('trading')}} />
                <Card icon="🔗" title={t.dex} sub={t.echange} onClick={function(){setModal('dex')}} />
                <Card icon="📊" title={t.staking} sub={t.cryptos} onClick={function(){setModal('staking')}} />
              </div>
              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.innovation}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="🧠" title={t.iaAuto} sub={t.noCode} onClick={function(){setModal('innovation')}} />
                <Card icon="⛓️" title={t.blockchain} sub={t.techDec} onClick={function(){setModal('blockchain')}} />
                <Card icon="🔌" title={t.api} sub={t.connect} onClick={function(){setModal('api')}} />
              </div>
              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.securite}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="🛡️" title={t.securite2} sub={t.protection} onClick={function(){setModal('securite')}} />
                <Card icon="⚖️" title={t.conformite} sub={t.normes} onClick={function(){setModal('conformite')}} />
                <Card icon="👁️" title={t.surveillance} sub={t.monitoring} onClick={function(){setModal('surveillance')}} />
              </div>
              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.support}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="⚙️" title={t.params} sub={t.config} onClick={function(){setModal('params')}} />
                <Card icon="❓" title={t.aide} sub={t.centre} onClick={function(){setModal('aide')}} />
              </div>
              <div style={{marginTop:18,background:'#f3e8ff',border:'1px solid #d8b4fe',borderRadius:20,padding:14}}>
                <div style={{display:'flex',gap:10}}><div style={{width:44,height:44,background:'#7c3aed',borderRadius:22,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>🧠</div><div style={{flex:1}}><div style={{fontWeight:900}}>{t.assistant}</div><div style={{fontSize:11,color:'#475569',marginTop:4}}>{t.iaText}</div></div></div>
                <button style={{width:'100%',marginTop:10,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>{t.voirIA}</button>
              </div>
              <div style={{marginTop:14,background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:14}}>
                <div style={{fontWeight:900}}>{t.contact}</div>
                <div style={{marginTop:8,fontSize:13}}><div style={{display:'flex',justifyContent:'space-between'}}><span>{t.moov}</span><b style={{color:'#1e40af'}}>(+235) 92 82 52 62</b></div><div style={{display:'flex',justifyContent:'space-between',marginTop:6}}><span>{t.support2}</span><b style={{color:'#1e40af'}}>(+235) 66 78 75 46</b></div><div style={{marginTop:6}}><span>{t.email}</span><div style={{color:'#1e40af',fontSize:12,fontWeight:700}}>gargouradigitalbank@gmail.com</div></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError? (
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:100,height:100,borderRadius:50,border:'3px solid #facc15',objectFit:'cover',boxShadow:'0 0 18px rgba(250,204,21,0.6)'}} />
          ) : (
            <div style={{width:100,height:100,borderRadius:50,background:'linear-gradient(135deg,#1e3a8a,#facc15)',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:22}}>GDB</div>
          )}
          <div style={{fontWeight:900,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#a16207',fontWeight:800}}>GOLD GCV {GCV} $ {t.flag} {t.name}</div>
          <div style={{display:'flex',gap:8,marginTop:8}}><button onClick={doKyc} style={{background:kyc?'#16a34a':'#e2e8f0',border:'none',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi'}</button>{gdbAccount? <div style={{background:'#1e40af',color:'#fff',borderRadius:20,padding:'6px 10px',fontSize:10}}>{gdbAccount}</div> : null}</div>
        </div>

        <div style={{background:'#1e3a8a',borderRadius:24,padding:20,color:'#fff'}}>
          <div style={{fontSize:14,opacity:0.9}}>{t.solde}</div>
          <div style={{fontWeight:900,fontSize:30,marginTop:16}}>1 pi = 314 159,00 USD</div>
          <div style={{fontSize:12,opacity:0.8,marginTop:8}}>{t.taux}</div>
          <div style={{marginTop:10,background:'#16a34a',borderRadius:20,padding:'6px 12px',display:'inline-flex',fontSize:12}}>📞 +235 92 82 52 62</div>
          <div style={{marginTop:10,background:'rgba(255,255,255,0.15)',borderRadius:12,padding:10,fontSize:11}}>{t.frais}</div>
          <div style={{display:'flex',gap:10,marginTop:14}}>
            <button onClick={function(){setModal('p2p')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>{t.envoyer}</button>
            <button onClick={function(){setModal('receive')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>{t.recevoir}</button>
          </div>
        </div>

        <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:14,display:'flex',gap:10}}><div>📈</div><div><div style={{fontWeight:800,fontSize:13}}>{t.ligne}</div><div style={{fontSize:11,color:'#64748b'}}>{t.tempsReel}</div></div></div>
      </div>

      {/* BOTTOM NAVIGATION 7 BOUTONS - EXACT COMME CAPTURE + ATTIRANT */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:'6px 2px 8px 2px',zIndex:40}}>
        <button onClick={function(){handleBottomClick('accueil')}} style={{border:'none',background:activeSection==='accueil'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='accueil'?800:500,color:activeSection==='accueil'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>🏠</div>{t.accueil}
        </button>
        <button onClick={function(){handleBottomClick('paiements')}} style={{border:'none',background:activeSection==='paiements'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='paiements'?800:500,color:activeSection==='paiements'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>↔️</div>Paiements
        </button>
        <button onClick={function(){handleBottomClick('trading')}} style={{border:'none',background:activeSection==='trading'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='trading'?800:500,color:activeSection==='trading'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>📈</div>Trading
        </button>
        <button onClick={function(){handleBottomClick('services')}} style={{border:'none',background:activeSection==='services'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='services'?800:500,color:activeSection==='services'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>🏛️</div>Services
        </button>
        <button onClick={function(){handleBottomClick('innovation')}} style={{border:'none',background:activeSection==='innovation'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='innovation'?800:500,color:activeSection==='innovation'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>✨</div>Innovation
        </button>
        <button onClick={function(){handleBottomClick('securite')}} style={{border:'none',background:activeSection==='securite'?'#dbeafe':'none',fontSize:9,fontWeight:activeSection==='securite'?800:500,color:activeSection==='securite'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}>
          <div style={{fontSize:18}}>🛡️</div>Securite
        </bu
