// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'
function genGDB(){return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000)}

const LANGS={
  FR:{code:'FR',flag:'🇫🇷',name:'Français'},
  EN:{code:'EN',flag:'🇬🇧',name:'English'},
  AR:{code:'AR',flag:'🇸🇦',name:'العربية'},
  ES:{code:'ES',flag:'🇪🇸',name:'Español'},
  ZH:{code:'ZH',flag:'🇨🇳',name:'中文'},
  HA:{code:'HA',flag:'🇹🇩',name:'Hausa/Chadien'},
}

const TR={
  FR:{
    bank:'GARGOURA DIGITAL BANK',solde:'Solde Total',system:'Système en ligne • 12 modules actifs',
    func:'Fonctionnalités Courantes • 12',allFunc:'Toutes fonctionnelles • Sans réduction',
    envoyer:'Envoyer',recevoir:'Recevoir',services:'Services',innovation:'Innovation',securite:'Sécurité',support:'Support',
    accueil:'Accueil',wallet:'Wallet',shopping:'Shopping',chain:'Chain',payments:'Paiements',
    langTitle:'Langue Mondiale • 6 langues',langDesc:'Choisis ta langue - Plateforme multilingue PI 314,159 USD',
    servicesTitle:'Services Bancaires Complets',servicesDesc:'Tous services ISO20022 CEMAC/UEMOA/Golfe',
    innovTitle:'Innovation & Technologie',securTitle:'Sécurité & Protection',supportTitle:'Support & Assistance 24/7',
  },
  EN:{
    bank:'GARGOURA DIGITAL BANK',solde:'Total Balance',system:'System online • 12 active modules',
    func:'Common Features • 12',allFunc:'All functional • No reduction',
    envoyer:'Send',recevoir:'Receive',services:'Services',innovation:'Innovation',securite:'Security',support:'Support',
    accueil:'Home',wallet:'Wallet',shopping:'Shopping',chain:'Chain',payments:'Payments',
    langTitle:'World Language • 6 languages',langDesc:'Choose your language - PI 314,159 USD multilingual platform',
    servicesTitle:'Complete Banking Services',servicesDesc:'All ISO20022 services CEMAC/UEMOA/Gulf',
    innovTitle:'Innovation & Technology',securTitle:'Security & Protection',supportTitle:'Support & Assistance 24/7',
  },
  AR:{
    bank:'بنك غرغورا الرقمي',solde:'الرصيد الإجمالي',system:'النظام متصل • 12 وحدة نشطة',
    func:'الميزات الشائعة • 12',allFunc:'كلها فعالة • بدون تقليص',
    envoyer:'إرسال',recevoir:'استلام',services:'الخدمات',innovation:'الابتكار',securite:'الأمان',support:'الدعم',
    accueil:'الرئيسية',wallet:'المحفظة',shopping:'التسوق',chain:'السلسلة',payments:'المدفوعات',
    langTitle:'اللغة العالمية • 6 لغات',langDesc:'اختر لغتك - منصة متعددة اللغات PI 314,159 دولار',
    servicesTitle:'خدمات مصرفية كاملة',servicesDesc:'جميع خدمات ISO20022',
    innovTitle:'الابتكار والتكنولوجيا',securTitle:'الأمن والحماية',supportTitle:'الدعم والمساعدة 24/7',
  },
  ES:{
    bank:'GARGOURA DIGITAL BANK',solde:'Saldo Total',system:'Sistema en línea • 12 módulos activos',
    func:'Funciones Comunes • 12',allFunc:'Todas funcionales • Sin reducción',
    envoyer:'Enviar',recevoir:'Recibir',services:'Servicios',innovation:'Innovación',securite:'Seguridad',support:'Soporte',
    accueil:'Inicio',wallet:'Billetera',shopping:'Compras',chain:'Cadena',payments:'Pagos',
    langTitle:'Idioma Mundial • 6 idiomas',langDesc:'Elige tu idioma - Plataforma PI 314,159 USD',
    servicesTitle:'Servicios Bancarios Completos',servicesDesc:'Todos servicios ISO20022',
    innovTitle:'Innovación y Tecnología',securTitle:'Seguridad y Protección',supportTitle:'Soporte 24/7',
  },
  ZH:{
    bank:'GARGOURA数字银行',solde:'总余额',system:'系统在线 • 12个活跃模块',
    func:'常用功能 • 12',allFunc:'全部功能 • 无删减',
    envoyer:'发送',recevoir:'接收',services:'服务',innovation:'创新',securite:'安全',support:'支持',
    accueil:'首页',wallet:'钱包',shopping:'购物',chain:'链',payments:'支付',
    langTitle:'世界语言 • 6种语言',langDesc:'选择你的语言 - PI 314,159美元多语言平台',
    servicesTitle:'完整银行服务',servicesDesc:'所有ISO20022服务',
    innovTitle:'创新与技术',securTitle:'安全与保护',supportTitle:'24/7支持',
  },
  HA:{
    bank:'GARGOURA DIGITAL BANK',solde:'Jimlar Ma\'auni',system:'Tsarin yana kan layi • 12 modules',
    func:'Abubuwan gama gari • 12',allFunc:'Duka suna aiki • Ba ragi',
    envoyer:'Aika',recevoir:'Karɓa',services:'Sabis',innovation:'Ƙirƙira',securite:'Tsaro',support:'Tallafi',
    accueil:'Gida',wallet:'Wallet',shopping:'Siyayya',chain:'Chain',payments:'Biyan kuɗi',
    langTitle:'Harshen Duniya • Harsuna 6',langDesc:'Zaɓi yarenka - PI 314,159 USD',
    servicesTitle:'Cikakkun Sabis na Banki',servicesDesc:'Duk sabis ISO20022',
    innovTitle:'Ƙirƙira & Fasaha',securTitle:'Tsaro & Kariya',supportTitle:'Tallafi 24/7',
  },
}

export default function Page(){
const [gdb,setGdb]=useState('GDB-2026-433422')
const [m,setM]=useState('')
const [a,setA]=useState('accueil')
const [lang,setLang]=useState('FR')
const [logoErr,setLogoErr]=useState(false)
const [amt,setAmt]=useState('')
const [dest,setDest]=useState('')
const t=TR[lang]||TR.FR

useEffect(function(){
  try{
    var x=localStorage.getItem('gdb_account'); if(x) setGdb(x); else{var n=genGDB(); setGdb(n); localStorage.setItem('gdb_account',n)}
    var l=localStorage.getItem('gdb_lang'); if(l && TR[l]) setLang(l)
  }catch(e){setGdb(genGDB())}
},[])
function changeLang(l){setLang(l); try{localStorage.setItem('gdb_lang',l)}catch(e){}}
function open(s){setA(s); if(s==='accueil') setM(''); else setM(s)}

const funcs=[
{id:'transferer',l:'Transférer',i:'↔️'},{id:'virement',l:'Virement',i:'💳'},{id:'pidex',l:'Pi DEX',i:'📈'},{id:'convertir',l:'Convertir',i:'🔄'},
{id:'trading',l:'Trading',i:'📊'},{id:'aiAutomation',l:'AI Auto',i:'✨'},{id:'blockchain',l:'Blockchain',i:'⛓️'},{id:'shopping',l:'Shopping',i:'🛍️'},
{id:'portefeuilles',l:'Portefeuilles',i:'👛'},{id:'automobile',l:'Automobile',i:'🚗'},{id:'agregation',l:'Agrégation',i:'🗂️'},{id:'gestion',l:'Gestion',i:'📊'},
]

return(
<div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:110}}>
<div style={{background:'#1e40af',color:'#fff',padding:'10px 12px',position:'sticky',top:0,zIndex:30,borderBottom:'3px solid #facc15',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <div style={{fontWeight:900,fontSize:11}}>Gargoura • {gdb.slice(0,10)} • 1 PI = 314,159 USD • {LANGS[lang].flag} {lang}</div>
  <div style={{display:'flex',gap:4}}>{Object.keys(LANGS).map(function(l){return (<button key={l} onClick={function(){changeLang(l)}} style={{border:lang===l?'2px solid #facc15':'1px solid rgba(255,255,255,0.3)',background:lang===l?'#facc15':'rgba(255,255,255,0.1)',color:lang===l?'#1e3a8a':'#fff',borderRadius:6,padding:'2px 5px',fontSize:9,fontWeight:800}}>{LANGS[l].flag}</button>)})}</div>
</div>

<div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
<div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:14,display:'flex',flexDirection:'column',alignItems:'center'}}>
{!logoErr? (<img src="/logo.png" alt="GDB" onError={function(){setLogoErr(true)}} style={{width:60,height:60,borderRadius:30,border:'3px solid #facc15'}} />):(<div style={{width:60,height:60,borderRadius:30,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>)}
<div style={{fontWeight:900,marginTop:6,fontSize:13}}>{t.bank}</div><div style={{fontSize:9,color:'#64748b'}}>{gdb} • ISO20022 • PI 314159 USD • {LANGS[lang].name}</div>
</div>

<div style={{background:'#1e3a8a',borderRadius:20,padding:14,color:'#fff'}}>
<div style={{fontSize:12}}>{t.solde} • {gdb.slice(0,12)}</div>
<div style={{fontWeight:900,fontSize:22,marginTop:6}}>1 PI = 314 159,00 USD</div>
<div style={{display:'flex',alignItems:'center',gap:6,marginTop:8}}><div style={{width:8,height:8,background:'#22c55e',borderRadius:8}}></div><div style={{fontSize:10,color:'#86efac',fontWeight:700}}>{t.system} • {gdb.slice(0,8)} • {LANGS[lang].flag} {lang}</div></div>
<div style={{display:'flex',gap:8,marginTop:12}}><button onClick={function(){open('transferer')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>{t.envoyer}</button><button onClick={function(){open('receive')}} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:20,padding:10,fontWeight:800,fontSize:11}}>{t.recevoir}</button></div>
</div>

<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}>
<div style={{fontWeight:900,fontSize:13}}>{t.func}</div>
<div style={{fontSize:9,color:'#64748b',marginTop:2}}>{t.allFunc} • GDB {gdb.slice(0,8)} • {LANGS[lang].flag} {lang}</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:10}}>
{funcs.map(function(f){return (<button key={f.id} onClick={function(){open(f.id)}} style={{border:f.id===a?'2px solid #1e40af':'1px solid #e2e8f0',background:f.id===a?'#dbeafe':'#fff',borderRadius:12,padding:'8px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:16}}>{f.i}</div><div style={{fontSize:7,fontWeight:700,textAlign:'center',lineHeight:'9px'}}>{f.l}</div></button>)})}
</div>
</div>
</div>

<div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'3px solid #facc15',zIndex:40}}>
<div style={{display:'flex',justifyContent:'space-around',padding:'6px 2px'}}>
<button onClick={function(){open('accueil')}} style={{border:'none',background:a==='accueil'?'#dbeafe':'none',fontSize:8,color:a==='accueil'?'#1e40af':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>🏠</div>{t.accueil}</button>
<button onClick={function(){open('services')}} style={{border:'none',background:a==='services'?'#dbeafe':'none',fontSize:8,color:a==='services'?'#1e40af':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>💼</div>{t.services}</button>
<button onClick={function(){open('innovation')}} style={{border:'none',background:a==='innovation'?'#dbeafe':'none',fontSize:8,color:a==='innovation'?'#16a34a':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>🚀</div>{t.innovation}</button>
<button onClick={function(){open('portefeuilles')}} style={{border:'none',background:a==='portefeuilles'?'#dbeafe':'none',fontSize:8,color:a==='portefeuilles'?'#a855f7':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>👛</div>{t.wallet}</button>
<button onClick={function(){open('securite')}} style={{border:'none',background:a==='securite'?'#dbeafe':'none',fontSize:8,color:a==='securite'?'#ef4444':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>🛡️</div>{t.securite}</button>
<button onClick={function(){open('support')}} style={{border:'none',background:a==='support'?'#dbeafe':'none',fontSize:8,color:a==='support'?'#f59e0b':'#64748b',borderRadius:10,padding:'4px 6px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:44}}><div style={{fontSize:16}}>❓</div>{t.support}</button>
</div>
<div style={{display:'flex',justifyContent:'center',gap:4,padding:'2px 0 6px 0',borderTop:'1px solid #f1f5f9'}}>{Object.keys(LANGS).map(function(l){return (<button key={l} onClick={function(){changeLang(l)}} style={{border:lang===l?'1px solid #1e40af':'1px solid #e2e8f0',background:lang===l?'#dbeafe':'#fff',borderRadius:10,padding:'2px 6px',fontSize:8,fontWeight:lang===l?'800':'500'}}>{LANGS[l].flag} {l}</button>)})}</div>
</div>

{m? (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.55)',zIndex:60,display:'flex',alignItems:'flex-end'}}><div style={{background:'#f8fafc',width:'100%',borderRadius:'20px 20px 0 0',padding:12,maxHeight:'92vh',overflowY:'auto',borderTop:'3px solid #facc15'}}>
<div style={{display:'flex',justifyContent:'space-between',background:'#1e40af',color:'#fff',padding:10,borderRadius:12}}><div style={{fontWeight:900,fontSize:11}}>{gdb} • {m} • PI 314159 • {LANGS[lang].flag} {lang}</div><button onClick={function(){setM(''); setA('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:28,height:28}}>✕</button></div>

{m==='services' && (
<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
<div style={{fontWeight:900}}>{t.servicesTitle} • {gdb.slice(0,8)}</div><div style={{fontSize:10,color:'#64748b',marginTop:2}}>{t.servicesDesc} • {LANGS[lang].flag}</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginTop:12}}>
{[{i:'↔️',n:'Transférer',d:'Interne/Externe'},{i:'💳',n:'Virement',d:'SWIFT/SEPA'},{i:'🔄',n:'Convertir',d:'PI 314159 USD'},{i:'📊',n:'Trading',d:'PI/BTC/ETH'},{i:'👛',n:'Portefeuilles',d:'8 wallets'},{i:'🛍️',n:'Shopping',d:'Amazon etc'},{i:'🚗',n:'Automobile',d:'Toyota/Mercedes'},{i:'🗂️',n:'Agrégation',d:'21 banques'}].map(function(s){return (<div key={s.n} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:10}}><div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{fontSize:18}}>{s.i}</div><div><div style={{fontWeight:800,fontSize:11}}>{s.n}</div><div style={{fontSize:9,color:'#64748b'}}>{s.d}</div></div></div><button onClick={function(){open(s.n==='Transférer'?'transferer':s.n==='Virement'?'virement':s.n.toLowerCase())}} style={{width:'100%',marginTop:6,background:'#1e40af',color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:9,fontWeight:800}}>Ouvrir {s.n}</button></div>)})}
</div>
<div style={{marginTop:12,background:'#f0fdf4',borderRadius:12,padding:10}}><div style={{fontWeight:800,fontSize:11}}>🌍 Zones Couvertes • ISO20022</div><div style={{fontSize:10,marginTop:4}}>CEMAC: Tchad, Cameroun, Gabon • UEMOA: Sénégal, Côte d’Ivoire • Golfe: UAE, Qatar, Arabie • Jordanie • International • GDB {gdb}</div></div>
</div>
)}

{m==='innovation' && (
<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
<div style={{fontWeight:900}}>{t.innovTitle} • PI Network • {gdb.slice(0,8)}</div>
<div style={{display:'grid',gap:8,marginTop:10}}>
<div style={{background:'#faf5ff',border:'1px solid #e9d5ff',borderRadius:12,padding:10}}><div style={{fontWeight:800,fontSize:11}}>⛓️ Pi Network Blockchain • 1 PI = 314,159 USD ref</div><div style={{fontSize:10,marginTop:4}}>GDB {gdb} ancré sur Pi Blockchain • Transactions 0.01s • Frais 0.001 PI • ISO20022 compatible</div><button onClick={function(){alert('Explorer Pi Blockchain pour '+gdb+' - 314159 USD ref')}} style={{marginTop:6,background:'#a855f7',color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:9,fontWeight:800}}>Explorer PiScan • {gdb.slice(0,6)}</button></div>
<div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:12,padding:10}}><div style={{fontWeight:800,fontSize:11}}>✨ AI Automation • BOT PI</div><div style={{fontSize:10,marginTop:4}}>• Auto-trading PI 314k • Auto-shopping • Auto-virement CEMAC/UEMOA • Auto-conversion XAF/XOF→PI</div><button onClick={function(){open('aiAutomation')}} style={{marginTop:6,background:'#f59e0b',color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:9,fontWeight:800}}>Ouvrir aiAutomation</button></div>
<div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:12,padding:10}}><div style={{fontWeight:800,fontSize:11}}>🚀 Pi DEX & DeFi • AMM</div><div style={{fontSize:10,marginTop:4}}>Liquidity pools PI/USDT, PI/BTC, PI/ETH • APY 12-18% • GDB {gdb.slice(0,8)} • Slippage 0.5%</div><button onClick={function(){open('pidex')}} style={{marginTop:6,background:'#1e40af',color:'#fff',border:'none',borderRadius:8,padding:6,fontSize:9,fontWeight:800}}>Ouvrir Pi DEX</button></div>
</div>
</div>
)}

{m==='securite' && (
<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
<div style={{fontWeight:900}}>{t.securTitle} • GDB {gdb.slice(0,8)} • ISO20022</div>
<div style={{display:'grid',gap:8,marginTop:10}}>
<div style={{border:'2px solid #22c55e',borderRadius:12,padding:10,background:'#f0fdf4'}}><div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontWeight:800,fontSize:11}}>🔐 KYC Vérifié • GDB {gdb.slice(0,8)}</div><div style={{fontSize:9,background:'#22c55e',color:'#fff',padding:'2px 6px',borderRadius:10}}>✅ Vérifié</div></div><div style={{fontSize:10,marginTop:4}}>Compte {gdb} vérifié • Pi Network KYC • Niveau 3 • Limite illimitée PI</div></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6}}>
{[{n:'2FA Auth',d:'Google Authenticator',s:'✅ Actif'},{n:'Biométrie',d:'Empreinte/Face ID',s:'✅ Actif'},{n:'PIN PI',d:'6 chiffres PI 314159',s:'✅ Actif'},{n:'Anti-Fraude',d:'AI Détection',s:'✅ Actif'},{n:'Chiffrement',d:'AES-256 GDB',s:'✅ Actif'},{n:'ISO20022',d:'SWIFT/SEPA validé',s:'✅ Actif'}].map(function(sec){return (<div key={sec.n} style={{border:'1px solid #e2e8f0',borderRadius:10,padding:8}}><div style={{fontWeight:800,fontSize:10}}>{sec.n}</div><div style={{fontSize:8,color:'#64748b',marginTop:2}}>{sec.d}</div><div style={{fontSize:8,color:'#16a34a',fontWeight:800,marginTop:2}}>{sec.s}</div></div>)})}
</div>
<div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:10,marginTop:8}}><div style={{fontSize:11,fontWeight:800}}>🛡️ Protection Fonds • GDB {gdb}</div><div style={{fontSize:10,marginTop:4}}>• Fonds garantis PI 314,159 USD ref • Cold wallet 95% • Assurance $250M • Audit Certik • GDB {gdb.slice(0,8)} unique</div></div>
</div>
</div>
)}

{m==='support' && (
<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
<div style={{fontWeight:900}}>{t.supportTitle} • {gdb.slice(0,8)} • {LANGS[lang].flag}</div>
<div style={{display:'grid',gap:8,marginTop:10}}>
<div style={{background:'#eff6ff',borderRadius:12,padding:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:800,fontSize:11}}>💬 Chat en Direct • 24/7 • {LANGS[lang].name}</div><div style={{fontSize:9,color:'#64748b'}}>Réponse en 2 min • GDB {gdb.slice(0,8)} • PI Support</div></div><button onClick={function(){alert('Chat Support ouvert pour '+gdb+' - Langue '+lang+' - Agent PI disponible')}} style={{background:'#1e40af',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px',fontSize:10,fontWeight:800}}>Ouvrir Chat</button></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6}}>
{[{q:'Comment envoyer PI?',a:'Transferer→montant PI'},{q:'1 PI =?',a:'314,159 USD ref fixe'},{q:'Frais virement?',a:'0.001 PI CEMAC/UEMOA'},{q:'Sites Shopping?',a:'Amazon officiel PI'},{q:'GDB c’est quoi?',a:'ID unique '+gdb.slice(0,8)},{q:'Langues?',a:'FR/EN/AR/ES/ZH/HA'}].map(function(f){return (<div key={f.q} style={{border:'1px solid #e2e8f0',borderRadius:10,padding:8}}><div style={{fontWeight:800,fontSize:10}}>{f.q}</div><div style={{fontSize:9,color:'#16a34a',marginTop:2}}>{f.a}</div></div>)})}
</div>
<div style={{background:'#fffbeb',borderRadius:12,padding:10,marginTop:8}}><div style={{fontWeight:800,fontSize:11}}>📞 Contacts • GDB {gdb.slice(0,8)}</div><div style={{fontSize:10,marginTop:4}}>• WhatsApp: +235 90 00 00 00 • Email: support@gargourabank.com • Telegram: @GargouraBank • Langue: {LANGS[lang].name} • GDB {gdb}</div><button onClick={function(){alert('Ticket Support créé pour '+gdb+' - Langue '+lang+' - Réponse sous 1h - PI 314159')}} style={{width:'100%',marginTop:6,background:'#f59e0b',color:'#fff',border:'none',borderRadius:8,padding:8,fontSize:10,fontWeight:800}}>Créer Ticket • {gdb.slice(0,6)}</button></div>
</div>
</div>
)}

{m==='transferer' && (<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}><div style={{fontWeight:900}}>Transférer • {gdb.slice(0,8)} • {LANGS[lang].flag}</div><input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="GDB destinataire" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} /><input value={amt} onChange={function(e){setAmt(e.target.value)}} placeholder="0.00 PI 314159
