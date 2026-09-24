'use client'
import { useState, useEffect } from 'react'

const GCV = 314159
function formatG(a:string){ if(!a || a.length<8) return a; return a.slice(0,4)+'...'+a.slice(-4) }
function genGDB(){ return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000) }

const LANGS:any = {
  fr:{flag:'🇫🇷', name:'Français',
    menuPrincipal:'Menu Principal', toutesFonctionnalites:'Toutes les fonctionnalités Gargoura Digital Bank',
    comptesProfil:'COMPTES & PROFIL', accueil:'Accueil', tableauBord:'Tableau de bord', monProfil:'Mon Profil', gererCompte:'Gérer mon compte', portefeuilles:'Portefeuilles', cryptoDigital:'Crypto & Digital',
    paiementsTransferts:'PAIEMENTS & TRANSFERTS', transfertsP2P:'Transferts P2P', interneInternational:'Interne & International', mobileMoney:'Mobile Money', zoneCemacUemoa:'Zone CEMAC & UEMOA', paiementFactures:'Paiement Factures', eauElec:'Eau, Électricité, etc.', convertisseur:'Convertisseur', devisesMondiales:'93 devises mondiales',
    tradingInvest:'TRADING & INVESTISSEMENTS', tradingPi:'Trading Pi', pairesTempsReel:'10 paires en temps réel', piDexAmm:'Pi DEX & AMM', echangeWeb3:'Échange décentralisé Web 3.0', stakingCrypto:'Staking Crypto', cryptos:'12 cryptomonnaies', tokenGDB:'Token GDB', prepPiNetwork:'Préparation Pi Network',
    voyageServices:'VOYAGE, GASTRONOMIE & SERVICES PUBLICS', reservationsPremium:'Réservations premium', volsHotels:'Vols, hôtels et restaurants en π', servicesGovTchad:'Services gouvernementaux Tchad', demarchesFrais:'Démarches et frais préparatoires', douaneAuto:'Douane automatique', estimationFrais:'Estimation des frais d\'importation',
    servicesBancaires:'SERVICES BANCAIRES', cartesBancaires:'Cartes Bancaires', virtuellesPhysiques:'Virtuelles & Physiques', eCommerce:'E-Commerce', plateformesMondiales:'8 plateformes mondiales', partenariatAuto:'Partenariat Automobile', marquesDispo:'18 marques disponibles',
    securiteConformite:'SÉCURITÉ & CONFORMITÉ', securite:'Sécurité', protectionAvancee:'Protection avancée', conformite:'Conformité', normesInternationales:'Normes internationales', surveillanceIA:'Surveillance IA', monitoringIntelligent:'Monitoring intelligent',
    supportParams:'SUPPORT & PARAMÈTRES', parametres:'Paramètres', configuration:'Configuration', aideSupport:'Aide & Support', centreAssistance:'Centre d\'assistance', assistantIAGargoura:'Assistant IA Gargoura', intelligencePour:'Intelligence artificielle pour surveiller, optimiser et sécuriser toutes vos opérations bancaires en temps réel', voirSurveillance:'Voir la Surveillance IA',
    contactGargoura:'Contact Gargoura Digital Bank', moovMoney:'Moov Money:', support:'Support:', email:'Email:',
    soldeTotal:'Solde Total', tauxRef:'Taux de référence indicatif pour l\'affichage des opérations.', fraisTx:'Frais de transaction : calculés à la confirmation, en π', envoyer:'Envoyer', recevoir:'Recevoir', systemeLigne:'Système en Ligne', transactionsTempsReel:'Toutes les transactions sont traitées en temps réel',
  },
  en:{flag:'🇺🇸', name:'English',
    menuPrincipal:'Main Menu', toutesFonctionnalites:'All Gargoura Digital Bank features',
    comptesProfil:'ACCOUNTS & PROFILE', accueil:'Home', tableauBord:'Dashboard', monProfil:'My Profile', gererCompte:'Manage my account', portefeuilles:'Wallets', cryptoDigital:'Crypto & Digital',
    paiementsTransferts:'PAYMENTS & TRANSFERS', transfertsP2P:'P2P Transfers', interneInternational:'Internal & International', mobileMoney:'Mobile Money', zoneCemacUemoa:'CEMAC & UEMOA Zone', paiementFactures:'Bill Payment', eauElec:'Water, Electricity, etc.', convertisseur:'Converter', devisesMondiales:'93 world currencies',
    tradingInvest:'TRADING & INVESTMENTS', tradingPi:'Trading Pi', pairesTempsReel:'10 real-time pairs', piDexAmm:'Pi DEX & AMM', echangeWeb3:'Decentralized Exchange Web 3.0', stakingCrypto:'Crypto Staking', cryptos:'12 cryptocurrencies', tokenGDB:'GDB Token', prepPiNetwork:'Pi Network Preparation',
    voyageServices:'TRAVEL, GASTRONOMY & PUBLIC SERVICES', reservationsPremium:'Premium bookings', volsHotels:'Flights, hotels and restaurants in π', servicesGovTchad:'Chad Government Services', demarchesFrais:'Procedures and preparatory fees', douaneAuto:'Automatic Customs', estimationFrais:'Import fee estimation',
    servicesBancaires:'BANKING SERVICES', cartesBancaires:'Bank Cards', virtuellesPhysiques:'Virtual & Physical', eCommerce:'E-Commerce', plateformesMondiales:'8 global platforms', partenariatAuto:'Automobile Partnership', marquesDispo:'18 brands available',
    securiteConformite:'SECURITY & COMPLIANCE', securite:'Security', protectionAvancee:'Advanced protection', conformite:'Compliance', normesInternationales:'International standards', surveillanceIA:'AI Monitoring', monitoringIntelligent:'Intelligent monitoring',
    supportParams:'SUPPORT & SETTINGS', parametres:'Settings', configuration:'Configuration', aideSupport:'Help & Support', centreAssistance:'Help Center', assistantIAGargoura:'Gargoura AI Assistant', intelligencePour:'Artificial intelligence to monitor, optimize and secure all your banking operations in real time', voirSurveillance:'View AI Monitoring',
    contactGargoura:'Contact Gargoura Digital Bank', moovMoney:'Moov Money:', support:'Support:', email:'Email:',
    soldeTotal:'Total Balance', tauxRef:'Indicative reference rate for display.', fraisTx:'Transaction fee: calculated at confirmation, in π', envoyer:'Send', recevoir:'Receive', systemeLigne:'System Online', transactionsTempsReel:'All transactions processed in real-time',
  },
  ar:{flag:'🇸🇦', name:'العربية',
    menuPrincipal:'القائمة الرئيسية', toutesFonctionnalites:'جميع ميزات بنك غارغورا الرقمي',
    comptesProfil:'الحسابات والملف', accueil:'الرئيسية', tableauBord:'لوحة القيادة', monProfil:'ملفي', gererCompte:'إدارة حسابي', portefeuilles:'المحافظ', cryptoDigital:'تشفير ورقمي',
    paiementsTransferts:'المدفوعات والتحويلات', transfertsP2P:'تحويلات P2P', interneInternational:'داخلي ودولي', mobileMoney:'موبايل موني', zoneCemacUemoa:'منطقة CEMAC و UEMOA', paiementFactures:'دفع الفواتير', eauElec:'ماء وكهرباء إلخ', convertisseur:'محول', devisesMondiales:'93 عملة عالمية',
    tradingInvest:'التداول والاستثمار', tradingPi:'تداول Pi', pairesTempsReel:'10 أزواج في الوقت الفعلي', piDexAmm:'Pi DEX و AMM', echangeWeb3:'تبادل لامركزي Web 3.0', stakingCrypto:'تخزين العملات', cryptos:'12 عملة', tokenGDB:'رمز GDB', prepPiNetwork:'تحضير شبكة Pi',
    voyageServices:'السفر والخدمات العامة', reservationsPremium:'حجوزات مميزة', volsHotels:'رحلات وفنادق ومطاعم بـ π', servicesGovTchad:'خدمات حكومة تشاد', demarchesFrais:'الإجراءات والرسوم', douaneAuto:'جمارك آلية', estimationFrais:'تقدير رسوم الاستيراد',
    servicesBancaires:'الخدمات المصرفية', cartesBancaires:'بطاقات بنكية', virtuellesPhysiques:'افتراضية ومادية', eCommerce:'تجارة إلكترونية', plateformesMondiales:'8 منصات عالمية', partenariatAuto:'شراكة سيارات', marquesDispo:'18 علامة متاحة',
    securiteConformite:'الأمان والامتثال', securite:'الأمان', protectionAvancee:'حماية متقدمة', conformite:'الامتثال', normesInternationales:'معايير دولية', surveillanceIA:'مراقبة AI', monitoringIntelligent:'مراقبة ذكية',
    supportParams:'الدعم والإعدادات', parametres:'الإعدادات', configuration:'تكوين', aideSupport:'المساعدة والدعم', centreAssistance:'مركز المساعدة', assistantIAGargoura:'مساعد غارغورا AI', intelligencePour:'ذكاء اصطناعي لمراقبة وتحسين وتأمين جميع عملياتك المصرفية', voirSurveillance:'عرض مراقبة AI',
    contactGargoura:'اتصل ببنك غارغورا الرقمي', moovMoney:'Moov Money:', support:'الدعم:', email:'البريد:',
    soldeTotal:'الرصيد الإجمالي', tauxRef:'سعر مرجعي للعرض.', fraisTx:'رسوم المعاملة: تحسب عند التأكيد بـ π', envoyer:'إرسال', recevoir:'استلام', systemeLigne:'النظام متصل', transactionsTempsReel:'جميع المعاملات في الوقت الفعلي',
  },
}

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState('')
  const [tab,setTab]=useState('Accueil')
  const [lang,setLang]=useState('fr')
  const [showMenu,setShowMenu]=useState(false)
  const [showLang,setShowLang]=useState(false)
  const [logoError,setLogoError]=useState(false)
  const t = LANGS[lang] || LANGS.fr

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

  const MenuCard = ({icon,title,sub,onClick}:{icon:string,title:string,sub:string,onClick?:any}) => (
    <button onClick={onClick} style={{width:'100%',textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:'14px 16px',display:'flex',alignItems:'center',gap:14}}>
      <div style={{width:48,height:48,background:'#eef2ff',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#1e40af'}}>{icon}</div>
      <div><div style={{fontWeight:800,fontSize:16,color:'#0f172a'}}>{title}</div><div style={{fontSize:13,color:'#64748b',marginTop:2}}>{sub}</div></div>
    </button>
  )

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:85}}>
      {/* HEADER BLEU EXACT CAPTURE */}
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={()=>setShowMenu(true)} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:18}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <button style={{border:'none',background:'none',color:'#fff',fontSize:18}}>⚙️</button>
        <button style={{border:'none',background:'none',color:'#fff',fontSize:18}}>👤</button>
        <button onClick={()=>setShowLang(!showLang)} style={{border:'none',background:'none',color:'#fff',fontSize:18}}>🌐</button>
        <button style={{border:'none',background:'none',color:'#fff',fontSize:18,position:'relative'}}>🔔<span style={{position:'absolute',top:-8,right:-8,background:'#ef4444',color:'#fff',fontSize:10,borderRadius:10,width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center'}}>3</span></button>
      </div>

      {showLang && (
        <div style={{position:'fixed',top:60,right:10,background:'#fff',border:'2px solid #facc15',borderRadius:16,padding:10,zIndex:60,width:200,boxShadow:'0 10px 30px rgba(0,0,0,0.2)'}}>
          {Object.keys(LANGS).map(k=>(
            <button key={k} onClick={()=>changeLang(k)} style={{width:'100%',display:'flex',gap:8,padding:10,border:'none',background:lang===k?'#fef3c7':'#fff',borderRadius:10,fontWeight:lang===k?800:400}}>{LANGS[k].flag} {LANGS[k].name} {lang===k?'✓':''}</button>
          ))}
        </div>
      )}

      {/* MENU PRINCIPAL HAMBURGER - EXACT TES 6 CAPTURES */}
      {showMenu && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div onClick={()=>setShowMenu(false)} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
          <div style={{width:'88%',maxWidth:380,background:'#fff',height:'100%',overflowY:'auto',padding:'0 0 100px 0',boxShadow:'-5px 0 20px rgba(0,0,0,0.2)'}}>
            <div style={{background:'#1e40af',color:'#fff',padding:'14px 16px',display:'flex',alignItems:'center',gap:10}}>
              <button onClick={()=>setShowMenu(false)} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
              <div><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
            </div>
            <div style={{padding:16}}>
              <div style={{fontWeight:900,fontSize:24}}>{t.menuPrincipal}</div>
              <div style={{fontSize:13,color:'#64748b',marginTop:4}}>{t.toutesFonctionnalites}</div>

              <div style={{marginTop:18,fontWeight:800,fontSize:13,color:'#64748b',letterSpacing:0.5}}>{t.comptesProfil}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="🏠" title={t.accueil} sub={t.tableauBord} onClick={()=>{setTab('Accueil'); setShowMenu(false)}} />
                <MenuCard icon="👤" title={t.monProfil} sub={t.gererCompte} onClick={()=>setShowMenu(false)} />
                <MenuCard icon="👛" title={t.portefeuilles} sub={t.cryptoDigital} onClick={()=>setShowMenu(false)} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.paiementsTransferts}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="↔️" title={t.transfertsP2P} sub={t.interneInternational} />
                <MenuCard icon="📱" title={t.mobileMoney} sub={t.zoneCemacUemoa} />
                <MenuCard icon="🧾" title={t.paiementFactures} sub={t.eauElec} />
                <MenuCard icon="💲" title={t.convertisseur} sub={t.devisesMondiales} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.tradingInvest}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="📈" title={t.tradingPi} sub={t.pairesTempsReel} />
                <MenuCard icon="🔗" title={t.piDexAmm} sub={t.echangeWeb3} />
                <MenuCard icon="📊" title={t.stakingCrypto} sub={t.cryptos} />
                <MenuCard icon="🪙" title={t.tokenGDB} sub={t.prepPiNetwork} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.voyageServices}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="✈️" title={t.reservationsPremium} sub={t.volsHotels} />
                <MenuCard icon="🏛️" title={t.servicesGovTchad} sub={t.demarchesFrais} />
                <MenuCard icon="🛡️" title={t.douaneAuto} sub={t.estimationFrais} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.servicesBancaires}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="💳" title={t.cartesBancaires} sub={t.virtuellesPhysiques} />
                <MenuCard icon="🛒" title={t.eCommerce} sub={t.plateformesMondiales} />
                <MenuCard icon="🚗" title={t.partenariatAuto} sub={t.marquesDispo} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.securiteConformite}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="🛡️" title={t.securite} sub={t.protectionAvancee} />
                <MenuCard icon="⚖️" title={t.conformite} sub={t.normesInternationales} />
                <MenuCard icon="🧠" title={t.surveillanceIA} sub={t.monitoringIntelligent} />
              </div>

              <div style={{marginTop:20,fontWeight:800,fontSize:13,color:'#64748b'}}>{t.supportParams}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                <MenuCard icon="⚙️" title={t.parametres} sub={t.configuration} />
                <MenuCard icon="❓" title={t.aideSupport} sub={t.centreAssistance} />
              </div>

              <div style={{marginTop:20,background:'linear-gradient(135deg,#ede9fe,#f3e8ff)',border:'1px solid #d8b4fe',borderRadius:20,padding:16}}>
                <div style={{display:'flex',gap:12}}>
                  <div style={{width:48,height:48,background:'linear-gradient(135deg,#7c3aed,#3b82f6)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:22}}>🧠</div>
                  <div style={{flex:1}}><div style={{fontWeight:900}}>{t.assistantIAGargoura}</div><div style={{fontSize:12,color:'#475569',marginTop:4}}>{t.intelligencePour}</div></div>
                </div>
                <button style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>🧠 {t.voirSurveillance}</button>
              </div>

              <div style={{marginTop:16,background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:16}}>
                <div style={{fontWeight:900}}>{t.contactGargoura}</div>
                <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8,fontSize:13}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#64748b'}}>{t.moovMoney}</span><b style={{color:'#1e40af'}}>(+235) 92 82 52 62</b></div>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#64748b'}}>{t.support}</span><b style={{color:'#1e40af'}}>(+235) 66 78 75 46</b></div>
                  <div style={{display:'flex',flexDirection:'column',gap:4}}><span style={{color:'#64748b'}}>{t.email}</span><b style={{color:'#1e40af',fontSize:12}}>gargouradigitalbank@gmail.com</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACCUEIL DE BORD EXISTANT - INCHANGÉ + TRADUIT + LOGO GOLD */}
      <div style={{padding:14,display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:16,display:'flex',flexDirection:'column',alignItems:'center'}}>
          {!logoError? <img src="/logo.png" alt="GDB" onError={()=>setLogoError(true)} style={{width:100,height:100,borderRadius:50,border:'3px solid #facc15',objectFit:'cover',boxShadow:'0 0 18px rgba(250,204,21,0.6)'}} /> : <div style={{width:100,height:100,borderRadius:50,background:'linear-gradient(135deg,#1e3a8a,#facc15)',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:24}}>GDB</div>}
          <div style={{fontWeight:900,color:'#1e3a8a',marginTop:8}}>GARGOURA DIGITAL BANK</div>
          <div style={{fontSize:10,color:'#a16207',fontWeight:800}}>GOLD • GCV {GCV}$ • {t.flag} {t.name}</div>
          <div style={{display:'flex',gap:8,marginTop:8}}><button onClick={doKyc} style={{background:kyc?'#16a34a':'#e2e8f0',border:'none',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{kyc?'KYC Verifie':'KYC Pi'}</button>{gdbAccount? <div style={{background:'#1e40af',color:'#fff',borderRadius:20,padding:'6px 10px',fontSize:10,fontWeight:800}}>{gdbAccount}</div> : null}</div>
          {gAddress? <div style={{fontSize:10,marginTop:6}}>G: {formatG(gAddress)}</div> : null}
        </div>

        <div style={{background:'#1e3a8a',borderRadius:24,padding:20,color:'#fff'}}>
          <div style={{fontSize:14,opacity:0.9}}>{t.soldeTotal}</div>
          <div style={{fontWeight:900,fontSize:32,marginTop:18,lineHeight:1.1}}>1 π = 314 159,00 USD</div>
          <div style={{fontSize:12,opacity:0.8,marginTop:10}}>{t.tauxRef}</div>
          <div style={{marginTop:14,background:'#16a34a',borderRadius:20,padding:'6px 12px',display:'inline-flex',fontSize:12,fontWeight:700}}>📞 +235 92 82 52 62</div>
          <div style={{marginTop:12,background:'rgba(255,255,255,0.15)',borderRadius:12,padding:10,fontSize:11}}>{t.fraisTx}</div>
          <div style={{display:'flex',gap:10,marginTop:16}}
