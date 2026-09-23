'use client'
import {useState,useEffect} from 'react'

const T:any = {
  fr: {
    menu:'Menu Principal', sub:'Toutes les fonctionnalités Gargoura Digital Bank',
    comptes:'COMPTES & PROFIL', accueil:'Accueil', dash:'Tableau de bord',
    profil:'Mon Profil', gerer:'Gérer mon compte',
    wallet:'Portefeuilles', crypto:'Crypto & Digital',
    pay:'PAIEMENTS & TRANSFERTS', p2p:'Transferts P2P', inter:'Interne & International',
    mobile:'Mobile Money', cemac:'Zone CEMAC & UEMOA',
    fact:'Paiement Factures', eau:'Eau, Électricité, etc.',
    conv:'Convertisseur', dev:'93 devises mondiales',
    trading:'TRADING & INVESTISSEMENTS', tpi:'Trading Pi', paires:'10 paires en temps réel',
    dex:'Pi DEX & AMM', web3:'Échange décentralisé Web 3.0',
    staking:'Staking Crypto', cryptos:'12 cryptomonnaies',
    token:'Token GDB', prepa:'Préparation Pi Network',
    voyage:'VOYAGE, GASTRONOMIE & SERVICES PUBLICS', res:'Réservations premium', vol:'Vols, hôtels et restaurants en π',
    gov:'Services gouvernementaux Tchad', dem:'Démarches et frais préparatoires',
    douane:'Douane automatique', estim:'Estimation des frais d\'importation',
    bank:'SERVICES BANCAIRES', cartes:'Cartes Bancaires', virt:'Virtuelles & Physiques',
    ecommerce:'E-Commerce', plat:'8 plateformes mondiales',
    auto:'Partenariat Automobile', marques:'18 marques disponibles',
    secu:'SÉCURITÉ & CONFORMITÉ', sec:'Sécurité', prot:'Protection avancée',
    conf:'Conformité', normes:'Normes internationales',
    surv:'Surveillance IA', mon:'Monitoring intelligent',
    supp:'SUPPORT & PARAMÈTRES', param:'Paramètres', config:'Configuration',
    aide:'Aide & Support', centre:'Centre d\'assistance',
    assistant:'Assistant IA Gargoura', iaDesc:'Intelligence artificielle pour surveiller, optimiser et sécuriser toutes vos opérations bancaires en temps réel',
    voir:'Voir la Surveillance IA', contact:'Contact Gargoura Digital Bank'
  },
  en: {
    menu:'Main Menu', sub:'All Gargoura Digital Bank features',
    comptes:'ACCOUNTS & PROFILE', accueil:'Home', dash:'Dashboard',
    profil:'My Profile', gerer:'Manage my account',
    wallet:'Wallets', crypto:'Crypto & Digital',
    pay:'PAYMENTS & TRANSFERS', p2p:'P2P Transfers', inter:'Domestic & International',
    mobile:'Mobile Money', cemac:'CEMAC & UEMOA Zone',
    fact:'Bill Payment', eau:'Water, Electricity, etc.',
    conv:'Converter', dev:'93 world currencies',
    trading:'TRADING & INVESTMENTS', tpi:'Pi Trading', paires:'10 real-time pairs',
    dex:'Pi DEX & AMM', web3:'Web 3.0 Decentralized Exchange',
    staking:'Crypto Staking', cryptos:'12 cryptocurrencies',
    token:'GDB Token', prepa:'Pi Network Preparation',
    voyage:'TRAVEL, FOOD & PUBLIC SERVICES', res:'Premium Bookings', vol:'Flights, hotels & restaurants in π',
    gov:'Chad Government Services', dem:'Procedures & preparatory fees',
    douane:'Automatic Customs', estim:'Import fees estimation',
    bank:'BANKING SERVICES', cartes:'Bank Cards', virt:'Virtual & Physical',
    ecommerce:'E-Commerce', plat:'8 global platforms',
    auto:'Automotive Partnership', marques:'18 brands available',
    secu:'SECURITY & COMPLIANCE', sec:'Security', prot:'Advanced protection',
    conf:'Compliance', normes:'International standards',
    surv:'AI Surveillance', mon:'Intelligent monitoring',
    supp:'SUPPORT & SETTINGS', param:'Settings', config:'Configuration',
    aide:'Help & Support', centre:'Help center',
    assistant:'Gargoura AI Assistant', iaDesc:'AI to monitor, optimize and secure all your banking operations in real time',
    voir:'View AI Surveillance', contact:'Contact Gargoura Digital Bank'
  },
  ar: {
    menu:'القائمة الرئيسية', sub:'جميع ميزات بنك غارغورا الرقمي',
    comptes:'الحسابات والملف', accueil:'الرئيسية', dash:'لوحة التحكم',
    profil:'ملفي', gerer:'إدارة حسابي',
    wallet:'المحافظ', crypto:'تشفير ورقمي',
    pay:'المدفوعات والتحويلات', p2p:'تحويلات P2P', inter:'داخلي ودولي',
    mobile:'أموال الهاتف', cemac:'منطقة سيماك ويوموا',
    fact:'دفع الفواتير', eau:'ماء، كهرباء، إلخ',
    conv:'محول', dev:'93 عملة عالمية',
    trading:'التداول والاستثمار', tpi:'تداول Pi', paires:'10 أزواج في الوقت الفعلي',
    dex:'Pi DEX & AMM', web3:'تبادل لامركزي ويب 3.0',
    staking:'تخزين العملات', cryptos:'12 عملة مشفرة',
    token:'رمز GDB', prepa:'إعداد شبكة Pi',
    voyage:'السفر والخدمات', res:'حجوزات مميزة', vol:'رحلات وفنادق ومطاعم بـ π',
    gov:'خدمات حكومة تشاد', dem:'إجراءات ورسوم تحضيرية',
    douane:'جمارك تلقائية', estim:'تقدير رسوم الاستيراد',
    bank:'الخدمات المصرفية', cartes:'البطاقات المصرفية', virt:'افتراضية ومادية',
    ecommerce:'التجارة الإلكترونية', plat:'8 منصات عالمية',
    auto:'شراكة السيارات', marques:'18 علامة متاحة',
    secu:'الأمن والامتثال', sec:'الأمان', prot:'حماية متقدمة',
    conf:'الامتثال', normes:'معايير دولية',
    surv:'مراقبة الذكاء الاصطناعي', mon:'مراقبة ذكية',
    supp:'الدعم والإعدادات', param:'الإعدادات', config:'التكوين',
    aide:'المساعدة والدعم', centre:'مركز المساعدة',
    assistant:'مساعد غارغورا الذكي', iaDesc:'ذكاء اصطناعي لمراقبة وتحسين وتأمين جميع عملياتك المصرفية في الوقت الفعلي',
    voir:'عرض المراقبة الذكية', contact:'اتصل ببنك غارغورا الرقمي'
  }
}

const L = [{k:'fr',f:'🇫🇷 FR'}, {k:'en',f:'🇬🇧 EN'}, {k:'ar',f:'🇸🇦 AR'}, {k:'es',f:'🇪🇸 ES'}, {k:'zh',f:'🇨🇳 中文'}]

function Item({icon,title,sub}:{icon:string,title:string,sub:string}){
  return(
    <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:'14px 12px',display:'flex',gap:12,alignItems:'center',marginBottom:10}}>
      <div style={{width:48,height:48,borderRadius:14,background:'#eef2ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{icon}</div>
      <div><div style={{fontWeight:800,fontSize:15,color:'#0f172a'}}>{title}</div><div style={{color:'#64748b',fontSize:12}}>{sub}</div></div>
    </div>
  )
}

export default function Pro(){
  const [lang,setLang]=useState('fr')
  const [open,setOpen]=useState(false)
  const [showLang,setShowLang]=useState(false)
  const [rate,setRate]=useState(650)
  const [xaf,setXaf]=useState('1000000')
  const t = T[lang] || T.fr

  useEffect(()=>{
    const saved = localStorage.getItem('gdb-lang'); if(saved && T[saved]) setLang(saved)
    const iv=setInterval(()=>setRate(r=> +(650 + (Math.random()-0.5)*5).toFixed(2)),4000)
    return()=>clearInterval(iv)
  },[])

  const change = (k:string)=>{setLang(k); localStorage.setItem('gdb-lang',k); setShowLang(false)}
  const piVal = (parseFloat(xaf||'0')/rate).toFixed(2)

  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',fontFamily:'system-ui',paddingBottom:80}}>
      {/* HEADER GOLD */}
      <div style={{background:'#0f172a',borderBottom:'3px solid #facc15',padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setOpen(!open)} style={{background:'transparent',border:'none',color:'#facc15',fontSize:22}}>☰</button>
          <div style={{width:38,height:38,borderRadius:'50%',background:'radial-gradient(circle,#fde68a,#facc15,#a16207)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#78350f'}}>π</div>
          <div><div style={{color:'#fff',fontWeight:900,lineHeight:1}}>Gargoura</div><div style={{color:'#94a3b8',fontSize:10}}>Gargoura Digital Bank</div></div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <button onClick={()=>setShowLang(true)} style={{background:'#1e293b',border:'1px solid #facc15',borderRadius:20,padding:'6px 10px',color:'#facc15'}}>🌐 {lang.toUpperCase()}</button>
          <div style={{color:'#fff'}}>🔔<span style={{background:'#ef4444',borderRadius:10,padding:'1px 5px',fontSize:10,marginLeft:2}}>3</span></div>
        </div>
      </div>

      {/* HAMBURGER DRAWER */}
      {open && (
        <div style={{position:'fixed',inset:0,zIndex:100,display:'flex'}}>
          <div style={{width:300,background:'#fff',overflowY:'auto',padding:14}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><b>Menu</b><button onClick={()=>setOpen(false)} style={{border:'none',background:'#0f172a',color:'#facc15',borderRadius:20,padding:'4px 12px'}}>✕</button></div>
            <div style={{background:'#0f172a',borderRadius:12,padding:12,marginBottom:14,textAlign:'center'}}>
              <div style={{color:'#facc15',fontWeight:900}}>GARGOURA DIGITAL BANK</div>
              <div style={{color:'#fff',fontSize:11,marginTop:4}}>1,250 π • ≈ 812,500 XAF</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:10}}>
                <div style={{background:'#1e293b',borderRadius:8,padding:8,textAlign:'center'}}><input value={xaf} onChange={e=>setXaf(e.target.value)} style={{width:'100%',background:'transparent',border:'none',color:'#fff',textAlign:'center'}}/><div style={{color:'#94a3b8',fontSize:10}}>{piVal} π</div></div>
                <div style={{background:'#facc15',borderRadius:8,padding:8,color:'#000',fontWeight:800,fontSize:12,textAlign:'center'}}>1 π = {rate} XAF</div>
              </div>
            </div>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.comptes}</div>
            <Item icon="🏠" title={t.accueil} sub={t.dash}/>
            <Item icon="👤" title={t.profil} sub={t.gerer}/>
            <Item icon="💼" title={t.wallet} sub={t.crypto}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.pay}</div>
            <Item icon="⇄" title={t.p2p} sub={t.inter}/>
            <Item icon="📱" title={t.mobile} sub={t.cemac}/>
            <Item icon="🧾" title={t.fact} sub={t.eau}/>
            <Item icon="$" title={t.conv} sub={t.dev}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.trading}</div>
            <Item icon="📈" title={t.tpi} sub={t.paires}/>
            <Item icon="🔗" title={t.dex} sub={t.web3}/>
            <Item icon="📊" title={t.staking} sub={t.cryptos}/>
            <Item icon="🪙" title={t.token} sub={t.prepa}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.voyage}</div>
            <Item icon="✈️" title={t.res} sub={t.vol}/>
            <Item icon="🏛️" title={t.gov} sub={t.dem}/>
            <Item icon="🛃" title={t.douane} sub={t.estim}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.bank}</div>
            <Item icon="💳" title={t.cartes} sub={t.virt}/>
            <Item icon="🛒" title={t.ecommerce} sub={t.plat}/>
            <Item icon="🚗" title={t.auto} sub={t.marques}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.secu}</div>
            <Item icon="🛡️" title={t.sec} sub={t.prot}/>
            <Item icon="⚖️" title={t.conf} sub={t.normes}/>
            <Item icon="🧠" title={t.surv} sub={t.mon}/>

            <div style={{fontSize:11,color:'#64748b',fontWeight:800,margin:'12px 0 8px'}}>{t.supp}</div>
            <Item icon="⚙️" title={t.param} sub={t.config}/>
            <Item icon="❓" title={t.aide} sub={t.centre}/>

            <div style={{background:'linear-gradient(135deg,#ede9fe,#f5f3ff)',border:'1px solid #c4b5fd',borderRadius:20,padding:16,marginTop:12}}>
              <div style={{display:'flex',gap:12}}><div style={{width:50,height:50,borderRadius:20,background:'linear-gradient(#8b5cf6,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:24}}>🧠</div><div><div style={{fontWeight:900}}>{t.assistant}</div><div style={{fontSize:11,color:'#475569',marginTop:4}}>{t.iaDesc}</div></div></div>
              <button style={{marginTop:12,background:'#1e40af',color:'#fff',border:'none',borderRadius:24,padding:'10px 16px',width:'100%',fontWeight:800}}>🧠 {t.voir}</button>
            </div>

            <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:14,marginTop:12}}>
              <div style={{fontWeight:800}}>{t.contact}</div>
              <div style={{fontSize:13,marginTop:8,display:'flex',justifyContent:'space-between'}}><span style={{color:'#64748b'}}>Moov Money:</span><span style={{color:'#1e40af',fontWeight:800}}>(+235) 92 82 52 62</span></div>
              <div style={{fontSize:13,display:'flex',justifyContent:'space-between'}}><span style={{color:'#64748b'}}>Support:</span><span style={{color:'#1e40af',fontWeight:800}}>(+235) 66 78 75 46</span></div>
              <div style={{fontSize:12,marginTop:6,color:'#1e40af'}}>gargouradigitalbank@gmail.com</div>
              <a href="https://wa.me/23566787546" style={{display:'block',background:'#22c55e',color:'#fff',textAlign:'center',padding:12,borderRadius:10,marginTop:10,textDecoration:'none',fontWeight:800}}>💬 WhatsApp Agent</a>
            </div>
          </div>
          <div onClick={()=>setOpen(false)} style={{flex:1,background:'rgba(0,0,0,0.4)'}}></div>
        </div>
      )}

      {/* LANGUAGE MODAL */}
      {showLang && (
        <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:20,padding:20,width:300}}>
            <div style={{fontWeight:900,marginBottom:12}}>🌐 Choisir la langue</div>
            {L.map(l=>(
              <button key={l.k} onClick={()=>change(l.k)} style={{display:'flex',justifyContent:'space-between',width:'100%',padding:12,borderRadius:10,border: lang===l.k?'2px solid #facc15':'1px solid #e2e8f0',background: lang===l.k?'#fefce8':'#fff',marginBottom:8}}>
                <span>{l.f}</span><span>{lang===l.k?'✅':''}</span>
              </button>
            ))}
            <button onClick={()=>setShowLang(false)} style={{width:'100%',padding:10,background:'#0f172a',color:'#facc15',border:'none',borderRadius:10,marginTop:8}}>Fermer</button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT - ACCUEIL */}
      <div style={{padding:14}}>
        <h1 style={{fontSize:22,fontWeight:900}}>{t.menu}</h1>
        <div style={{color:'#64748b',fontSize:13}}>{t.sub}</div>

        <div style={{marginTop:14,background:'#0f172a',borderRadius:16,padding:14,border:'1px solid #facc15'}}>
          <div style={{color:'#facc15',fontWeight:800}}>Convertisseur Temps Réel Gold</div>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <input value={xaf} onChange={e=>setXaf(e.target.value)} style={{flex:1,background:'#1e293b',border:'1px solid #334155',borderRadius:10,padding:12,color:'#fff'}}/>
            <div style={{background:'#facc15',color:'#000',borderRadius:10,padding:'12px 14px',fontWeight:900}}>XAF</div>
          </div>
          <div style={{textAlign:'center',marginTop:10,color:'#fff'}}>{xaf} XAF = <span style={{color:'#facc15',fontSize:28,fontWeight:900}}>{piVal} π</span></div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontWeight:800,color:'#0f172a'}}>Aperçu rapide - Clique ☰ pour voir tout le menu</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}>
            <div style={{background:'#fff',borderRadius:14,padding:14,border:'1px solid #e2e8f0',textAlign:'center'}}><div style={{fontSize:24}}>🏠</div><div style={{fontWeight:800,fontSize:12}}>{t.accueil}</div></div>
            <div style={{background:'#fff',borderRadius:14,padding:14,border:'1px solid #e2e8f0',textAlign:'center'}}><div style={{fontSize:24}}>📱</div><div style={{fontWeight:800,fontSize:12}}>{t.mobile}</div></div>
            <div style={{background:'#fff',borderRadius:14,padding:14,border:'1px solid #e2e8f0',textAlign:'center'}}><div style={{fontSize:24}}>📈</div><div style={{fontWeight:800,fontSize:12}}>{t.tpi}</div></div>
            <div style={{background:'#fff',borderRadius:14,padding:14,border:'1px solid #e2e8f0',textAlign:'center'}}><div style={{fontSize:24}}>💳</div><div style={{fontWeight:800,fontSize:12}}>{t.cartes}</div></div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[
          {i:'🏠',l:'Accueil'},
          {i:'⇄',l:'Paiements'},
          {i:'📈',l:'Trading'},
          {i:'🏛️',l:'Services'},
          {i:'✨',l:'Innovation'},
          {i:'🛡️',l:'Sécurité'},
          {i:'❓',l:'Support'},
        ].map(b=>(
          <div key={b.l} style={{textAlign:'center',fontSize:10,color:'#64748b'}}><div style={{fontSize:18}}>{b.i}</div>{b.l}</div>
        ))}
      </div>
    </div>
  )
      }
