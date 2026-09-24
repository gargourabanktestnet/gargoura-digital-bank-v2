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
    solde:'Solde Total', taux:'Taux de reference indicatif pour affichage des operations.', frais:'Frais de transaction : calcules a la confirmation en pi', envoyer:'Envoyer', recevoir:'Recevoir', ligne:'Systeme en Ligne', tempsReel:'Toutes les transactions sont traitees en temps reel'
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
    solde:'Total Balance', taux:'Indicative reference rate for display.', frais:'Transaction fee: calculated at confirmation in pi', envoyer:'Send', recevoir:'Receive', ligne:'System Online', tempsReel:'All transactions processed in real-time'
  },
  ar:{
    flag:'🇸🇦', name:'العربية',
    menuPrincipal:'القائمة الرئيسية', toutes:'جميع ميزات البنك',
    comptes:'الحسابات', accueil:'الرئيسية', tableau:'لوحة القيادة', profil:'ملفي', gerer:'ادارة حسابي', portefeuilles:'المحافظ', crypto:'تشفير ورقمي',
    paiements:'المدفوعات', p2p:'تحويلات P2P', interne:'داخلي ودولي', mobile:'موبايل موني', zone:'منطقة CEMAC', factures:'دفع الفواتير', eau:'ماء وكهرباء', convert:'محول', devises:'93 عملة',
    trading:'التداول', tradingPi:'تداول Pi', paires:'10 ازواج', dex:'Pi DEX', echange:'تبادل لامركزي', staking:'تخزين', cryptos:'12 عملة', token:'رمز GDB', prep:'تحضير',
    voyage:'السفر والخدمات', resa:'حجوزات مميزة', vols:'رحلات وفنادق', servicesGov:'خدمات تشاد', demarches:'اجراءات', douane:'جمارك آلية', estimation:'تقدير الرسوم',
    bancaires:'الخدمات المصرفية', cartes:'بطاقات بنكية', virtuel:'افتراضية ومادية', ecommerce:'تجارة الكترونية', plateformes:'8 منصات', auto:'شراكة سيارات', marques:'18 علامة',
    securite:'الامان والامتثال', securite2:'الامان', protection:'حماية متقدمة', conformite:'الامتثال', normes:'معايير دولية', surveillance:'مراقبة AI', monitoring:'مراقبة ذكية',
    support:'الدعم والاعدادات', params:'الاعدادات', config:'تكوين', aide:'المساعدة', centre:'مركز المساعدة', assistant:'مساعد غارغورا AI', iaText:'ذكاء اصطناعي لمراقبة عملياتك', voirIA:'عرض المراقبة',
    contact:'اتصل بنا', moov:'Moov Money:', support2:'الدعم:', email:'البريد:',
    solde:'الرصيد الاجمالي', taux:'سعر مرجعي للعرض', frais:'رسوم المعاملة تحسب عند التاكيد', envoyer:'ارسال', recevoir:'استلام', ligne:'النظام متصل', tempsReel:'جميع المعاملات في الوقت الفعلي'
  }
}

export default function Page(){
  const [gAddress,setGAddress]=useState('')
  const [gdbAccount,setGdbAccount]=useState('')
  const [kyc,setKyc]=useState(false)
  const [modal,setModal]=useState('')
  const [lang,setLang]=useState('fr')
  const [showMenu,setShowMenu]=useState(false)
  const [showLang,setShowLang]=useState(false)
  const [logoError,setLogoError]=useState(false)
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

  function Card(p:any){
    return (
      <button onClick={p.onClick} style={{width:'100%',textAlign:'left',background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:'14px 16px',display:'flex',alignItems:'center',gap:14}}>
        <div style={{width:48,height:48,background:'#eef2ff',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{p.icon}</div>
        <div><div style={{fontWeight:800,fontSize:16}}>{p.title}</div><div style={{fontSize:13,color:'#64748b'}}>{p.sub}</div></div>
      </button>
    )
  }

  return(
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:85}}>
      <div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:30}}>
        <button onClick={()=>setShowMenu(true)} style={{border:'none',background:'none',color:'#fff',fontSize:22}}>☰</button>
        <div style={{flex:1}}><div style={{fontWeight:900,fontSize:18}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
        <button onClick={()=>setShowLang(!showLang)} style={{border:'none',background:'none',color:'#fff',fontSize:18}}>🌐</button>
        <button style={{border:'none',background:'none',color:'#fff',fontSize:18,position:'relative'}}>🔔<span style={{position:'absolute',top:-8,right:-8,background:'#ef4444',color:'#fff',fontSize:10,borderRadius:10,width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center'}}>3</span></button>
      </div>

      {showLang && (
        <div style={{position:'fixed',top:60,right:10,background:'#fff',border:'2px solid #facc15',borderRadius:16,padding:10,zIndex:60,width:200}}>
          {Object.keys(LANGS).map(function(k){ return (
            <button key={k} onClick={()=>changeLang(k)} style={{width:'100%',display:'flex',gap:8,padding:10,border:'none',background:lang===k?'#fef3c7':'#fff',borderRadius:10}}>{LANGS[k].flag} {LANGS[k].name} {lang===k?'✓':''}</button>
          )})}
        </div>
      )}

      {showMenu && (
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div onClick={()=>setShowMenu(false)} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
          <div style={{width:'88%',maxWidth:380,background:'#fff',height:'100%',overflowY:'auto',paddingBottom:100}}>
            <div style={{background:'#1e40af',color:'#fff',padding:'14px 16px',display:'flex',gap:10,alignItems:'center'}}>
              <button onClick={()=>setShowMenu(false)} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:32,height:32}}>←</button>
              <div><div style={{fontWeight:900}}>Gargoura</div><div style={{fontSize:11,opacity:0.9}}>Gargoura Digital Bank</div></div>
            </div>
            <div style={{padding:16}}>
              <div style={{fontWeight:900,fontSize:22}}>{t.menuPrincipal}</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{t.toutes}</div>

              <div style={{marginTop:16,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.comptes}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="🏠" title={t.accueil} sub={t.tableau} onClick={function(){setShowMenu(false)}} />
                <Card icon="👤" title={t.profil} sub={t.gerer} />
                <Card icon="👛" title={t.portefeuilles} sub={t.crypto} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.paiements}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="↔️" title={t.p2p} sub={t.interne} />
                <Card icon="📱" title={t.mobile} sub={t.zone} />
                <Card icon="🧾" title={t.factures} sub={t.eau} />
                <Card icon="💲" title={t.convert} sub={t.devises} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.trading}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="📈" title={t.tradingPi} sub={t.paires} />
                <Card icon="🔗" title={t.dex} sub={t.echange} />
                <Card icon="📊" title={t.staking} sub={t.cryptos} />
                <Card icon="🪙" title={t.token} sub={t.prep} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.voyage}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="✈️" title={t.resa} sub={t.vols} />
                <Card icon="🏛️" title={t.servicesGov} sub={t.demarches} />
                <Card icon="🛡️" title={t.douane} sub={t.estimation} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.bancaires}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="💳" title={t.cartes} sub={t.virtuel} />
                <Card icon="🛒" title={t.ecommerce} sub={t.plateformes} />
                <Card icon="🚗" title={t.auto} sub={t.marques} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.securite}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="🛡️" title={t.securite2} sub={t.protection} />
                <Card icon="⚖️" title={t.conformite} sub={t.normes} />
                <Card icon="🧠" title={t.surveillance} sub={t.monitoring} />
              </div>

              <div style={{marginTop:18,fontWeight:800,fontSize:12,color:'#64748b'}}>{t.support}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
                <Card icon="⚙️" title={t.params} sub={t.config} />
                <Card icon="❓" title={t.aide} sub={t.centre} />
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
            <img src="/logo.png" alt="GDB" onError={function(){setLogoError(true)}} style={{width:100,height:100,borderRadius:50,border:'3px solid #facc15',objectFit:'cover'}} />
          ) : (
            <div style={{width:100,height:100,borderRadius:50,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>
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
            <button onClick={function(){setModal('P2P')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>{t.envoyer}</button>
            <button onClick={function(){setModal('QR')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:14,fontWeight:800}}>{t.recevoir}</button>
          </div>
        </div>

        <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:14,display:'flex',gap:10}}><div>📈</div><div><div style={{fontWeight:800,fontSize:13}}>{t.ligne}</div><div style={{fontSize:11,color:'#64748b'}}>{t.tempsReel}</div></div></div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'6px 0'}}>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',fontSize:9,color:'#64748b',display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{fontSize:16}}>🏠</div>{t.accueil}</button>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',fontSize:9,color:'#64748b',display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{fontSize:16}}>↔️</div>Paiements</button>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',fontSize:9,color:'#64748b',display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{fontSize:16}}>📈</div>Trading</button>
        <button onClick={function(){setShowMenu(true)}} style={{border:'none',background:'none',fontSize:9,color:'#64748b',display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{fontSize:16}}>🏛️</div>Services</button>
      </div>

      {modal? (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:40,display:'flex',alignItems:'center',justifyContent:'center',padding:12}}>
          <div style={{background:'#fff',borderRadius:20,padding:16,width:'100%',maxWidth:360}}>
            <div style={{fontWeight:900}}>{modal}</div>
            <div style={{fontSize:11,marginTop:6}}>G: {formatG(gAddress)} {gdbAccount}</div>
            <button onClick={function(){setModal('')}} style={{width:'100%',marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10}}>Fermer</button>
          </div>
        </div>
      ) : null}
    </div>
  )
      }
