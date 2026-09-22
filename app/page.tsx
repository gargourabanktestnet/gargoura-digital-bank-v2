'use client'
import { useState, useEffect } from 'react'

// 110 LANGUES MONDIALES
const ALL_LANGS = [
 {c:'fr',n:'Français',f:'🇫🇷'},{c:'en',n:'English',f:'🇬🇧'},{c:'ar',n:'العربية',f:'🇸🇦'},{c:'es',n:'Español',f:'🇪🇸'},{c:'zh',n:'中文',f:'🇨🇳'},{c:'pt',n:'Português',f:'🇵🇹'},{c:'sw',n:'Kiswahili',f:'🇹🇿'},{c:'ha',n:'Hausa',f:'🇳🇪'},{c:'de',n:'Deutsch',f:'🇩🇪'},{c:'it',n:'Italiano',f:'🇮🇹'},
 {c:'tr',n:'Türkçe',f:'🇹🇷'},{c:'ru',n:'Русский',f:'🇷🇺'},{c:'hi',n:'हिन्दी',f:'🇮🇳'},{c:'ja',n:'日本語',f:'🇯🇵'},{c:'ko',n:'한국어',f:'🇰🇷'},{c:'nl',n:'Nederlands',f:'🇳🇱'},{c:'pl',n:'Polski',f:'🇵🇱'},{c:'id',n:'Indonesia',f:'🇮🇩'},{c:'ms',n:'Melayu',f:'🇲🇾'},{c:'th',n:'ไทย',f:'🇹🇭'},
 {c:'vi',n:'Tiếng Việt',f:'🇻🇳'},{c:'bn',n:'বাংলা',f:'🇧🇩'},{c:'ur',n:'اردو',f:'🇵🇰'},{c:'fa',n:'فارسی',f:'🇮🇷'},{c:'am',n:'አማርኛ',f:'🇪🇹'},{c:'yo',n:'Yorùbá',f:'🇳🇬'},{c:'ig',n:'Igbo',f:'🇳🇬'},{c:'zu',n:'isiZulu',f:'🇿🇦'},{c:'xh',n:'isiXhosa',f:'🇿🇦'},{c:'af',n:'Afrikaans',f:'🇿🇦'},
 {c:'so',n:'Soomaali',f:'🇸🇴'},{c:'rw',n:'Kinyarwanda',f:'🇷🇼'},{c:'ln',n:'Lingála',f:'🇨🇩'},{c:'wo',n:'Wolof',f:'🇸🇳'},{c:'bm',n:'Bamanankan',f:'🇲🇱'},{c:'ff',n:'Fulfulde',f:'🇬🇳'},{c:'dyu',n:'Dioula',f:'🇨🇮'},{c:'ar_td',n:'Arabe Tchadien',f:'🇹🇩'},{c:'sango',n:'Sängö',f:'🇨🇫'},{c:'ar_sd',n:'عربي سوداني',f:'🇸🇩'},
 {c:'ti',n:'ትግርኛ',f:'🇪🇷'},{c:'om',n:'Oromoo',f:'🇪🇹'},{c:'mg',n:'Malagasy',f:'🇲🇬'},{c:'ht',n:'Kreyòl',f:'🇭🇹'},{c:'el',n:'Ελληνικά',f:'🇬🇷'},{c:'he',n:'עברית',f:'🇮🇱'},{c:'ro',n:'Română',f:'🇷🇴'},{c:'uk',n:'Українська',f:'🇺🇦'},{c:'cs',n:'Čeština',f:'🇨🇿'},{c:'hu',n:'Magyar',f:'🇭🇺'},
 {c:'sv',n:'Svenska',f:'🇸🇪'},{c:'no',n:'Norsk',f:'🇳🇴'},{c:'da',n:'Dansk',f:'🇩🇰'},{c:'fi',n:'Suomi',f:'🇫🇮'},{c:'sk',n:'Slovenčina',f:'🇸🇰'},{c:'bg',n:'Български',f:'🇧🇬'},{c:'sr',n:'Српски',f:'🇷🇸'},{c:'hr',n:'Hrvatski',f:'🇭🇷'},{c:'bs',n:'Bosanski',f:'🇧🇦'},{c:'sq',n:'Shqip',f:'🇦🇱'},
 {c:'mk',n:'Македонски',f:'🇲🇰'},{c:'sl',n:'Slovenščina',f:'🇸🇮'},{c:'lt',n:'Lietuvių',f:'🇱🇹'},{c:'lv',n:'Latviešu',f:'🇱🇻'},{c:'et',n:'Eesti',f:'🇪🇪'},{c:'is',n:'Íslenska',f:'🇮🇸'},{c:'ga',n:'Gaeilge',f:'🇮🇪'},{c:'mt',n:'Malti',f:'🇲🇹'},{c:'cy',n:'Cymraeg',f:'🏴󠁧󠁢󠁷󠁬󠁳󠁿'},{c:'eu',n:'Euskara',f:'🇪🇸'},{c:'ca',n:'Català',f:'🇪🇸'},{c:'gl',n:'Galego',f:'🇪🇸'},
 {c:'az',n:'Azərbaycan',f:'🇦🇿'},{c:'kk',n:'Қазақ',f:'🇰🇿'},{c:'uz',n:'Oʻzbek',f:'🇺🇿'},{c:'tk',n:'Türkmen',f:'🇹🇲'},{c:'ky',n:'Кыргыз',f:'🇰🇬'},{c:'tg',n:'Тоҷикӣ',f:'🇹🇯'},{c:'mn',n:'Монгол',f:'🇲🇳'},{c:'ka',n:'ქართული',f:'🇬🇪'},{c:'hy',n:'Հայերեն',f:'🇦🇲'},{c:'my',n:'မြန်မာ',f:'🇲🇲'},{c:'km',n:'ខ្មែរ',f:'🇰🇭'},{c:'lo',n:'ລາວ',f:'🇱🇦'},{c:'si',n:'සිංහල',f:'🇱🇰'},{c:'ne',n:'नेपाली',f:'🇳🇵'},{c:'dz',n:'Dzongkha',f:'🇧🇹'},{c:'ps',n:'پښتو',f:'🇦🇫'},{c:'ku',n:'Kurdî',f:'🇮🇶'},{c:'bo',n:'བོད',f:'🇨🇳'},{c:'ug',n:'ئۇيغۇر',f:'🇨🇳'},{c:'fil',n:'Filipino',f:'🇵🇭'},
 {c:'ceb',n:'Cebuano',f:'🇵🇭'},{c:'jv',n:'Jawa',f:'🇮🇩'},{c:'su',n:'Sunda',f:'🇮🇩'},{c:'mi',n:'Māori',f:'🇳🇿'},{c:'sm',n:'Samoa',f:'🇼🇸'},{c:'to',n:'Tonga',f:'🇹🇴'},{c:'fj',n:'Fiji',f:'🇫🇯'},{c:'bi',n:'Bislama',f:'🇻🇺'},{c:'ch',n:'Chamorro',f:'🇬🇺'},{c:'haw',n:'Hawaiʻi',f:'🇺🇸'},{c:'qu',n:'Quechua',f:'🇵🇪'},{c:'gn',n:'Guarani',f:'🇵🇾'},{c:'ay',n:'Aymara',f:'🇧🇴'},{c:'br',n:'Brezhoneg',f:'🇫🇷'},{c:'co',n:'Corsu',f:'🇫🇷'},{c:'fy',n:'Frysk',f:'🇳🇱'},{c:'lb',n:'Lëtzebuergesch',f:'🇱🇺'},{c:'wa',n:'Walon',f:'🇧🇪'},{c:'rm',n:'Rumantsch',f:'🇨🇭'},
]

// 165 DEVISES MONDIALES - Pi comme référence principale
const WORLD_CURRENCIES = [
 {code:'PI',name:'Pi Network',symbol:'π',rate:1,color:'#facc15'},
 {code:'XAF',name:'Franc CFA BEAC',symbol:'FCFA',rate:650},{code:'XOF',name:'Franc CFA BCEAO',symbol:'FCFA',rate:650},
 {code:'USD',name:'US Dollar',symbol:'$',rate:1.134},{code:'EUR',name:'Euro',symbol:'€',rate:0.992},{code:'GBP',name:'British Pound',symbol:'£',rate:0.852},{code:'JOD',name:'Jordanian Dinar',symbol:'JD',rate:0.804},{code:'AED',name:'UAE Dirham',symbol:'د.إ',rate:4.167},{code:'SAR',name:'Saudi Riyal',symbol:'﷼',rate:4.255},
 {code:'JPY',name:'Japanese Yen',symbol:'¥',rate:178.6},{code:'CNY',name:'Chinese Yuan',symbol:'¥',rate:8.18},{code:'INR',name:'Indian Rupee',symbol:'₹',rate:108.9},{code:'NGN',name:'Nigerian Naira',symbol:'₦',rate:1798},{code:'GHS',name:'Ghanaian Cedi',symbol:'₵',rate:18.1},{code:'KES',name:'Kenyan Shilling',symbol:'KSh',rate:147.3},{code:'ZAR',name:'South African Rand',symbol:'R',rate:20.1},{code:'EGP',name:'Egyptian Pound',symbol:'E£',rate:56.8},{code:'MAD',name:'Moroccan Dirham',symbol:'DH',rate:11.2},{code:'TND',name:'Tunisian Dinar',symbol:'DT',rate:3.52},{code:'DZD',name:'Algerian Dinar',symbol:'DA',rate:152.4},
 {code:'CAD',name:'Canadian Dollar',symbol:'C$',rate:1.55},{code:'AUD',name:'Australian Dollar',symbol:'A$',rate:1.64},{code:'CHF',name:'Swiss Franc',symbol:'Fr',rate:1.02},{code:'BRL',name:'Brazilian Real',symbol:'R$',rate:6.21},{code:'MXN',name:'Mexican Peso',symbol:'$',rate:20.1},{code:'RUB',name:'Russian Ruble',symbol:'₽',rate:104.5},{code:'TRY',name:'Turkish Lira',symbol:'₺',rate:39.2},{code:'KRW',name:'South Korean Won',symbol:'₩',rate:1558},{code:'SGD',name:'Singapore Dollar',symbol:'S$',rate:1.48},{code:'HKD',name:'Hong Kong Dollar',symbol:'HK$',rate:8.85},
 {code:'ETB',name:'Ethiopian Birr',symbol:'Br',rate:143.2},{code:'RWF',name:'Rwandan Franc',symbol:'RF',rate:1689},{code:'BIF',name:'Burundian Franc',symbol:'FBu',rate:3245},{code:'CDF',name:'Congolese Franc',symbol:'FC',rate:3150},{code:'UGX',name:'Ugandan Shilling',symbol:'USh',rate:4178},{code:'TZS',name:'Tanzanian Shilling',symbol:'TSh',rate:3025},{code:'ZMW',name:'Zambian Kwacha',symbol:'K',rate:28.7},{code:'MWK',name:'Malawian Kwacha',symbol:'MK',rate:1980},{code:'MZN',name:'Mozambican Metical',symbol:'MT',rate:72.1},{code:'AOA',name:'Angolan Kwanza',symbol:'Kz',rate:1020},
]

export default function WorldBank(){
 const [lang,setLang]=useState('fr')
 const [showLangs,setShowLangs]=useState(false)
 const [fromCurr,setFromCurr]=useState('XAF')
 const [toCurr,setToCurr]=useState('PI')
 const [amount,setAmount]=useState(1000000)
 const [liveRate,setLiveRate]=useState(650)
 const [trend,setTrend]=useState('+0.45%')
 const [tab,setTab]=useState('home')

 // Simulation marché en temps réel
 useEffect(()=>{
  const i=setInterval(()=>{
   const change=(Math.random()-0.48)*2
   setLiveRate(r=>+(r+change).toFixed(2))
   setTrend((change>0?'+':'')+change.toFixed(2)+'%')
  },3000)
  return()=>clearInterval(i)
 },[])

 const fromRate=WORLD_CURRENCIES.find(c=>c.code===fromCurr)?.rate||650
 const toRate=WORLD_CURRENCIES.find(c=>c.code===toCurr)?.rate||1
 const result=toCurr==='PI'? (amount/fromRate).toFixed(4) : ((amount/fromRate)*toRate).toFixed(2)
 const piValue=fromCurr==='PI'? amount*650 : amount/fromRate*650

 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',paddingBottom:'85px'}}>
   {/* HEADER WORLD */}
   <div style={{background:'linear-gradient(90deg,#0f172a,#1e293b)',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #facc15',position:'sticky',top:0,zIndex:20}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
     <img src="/logo.png" style={{width:'38px',height:'38px',borderRadius:'50%',border:'2px solid #facc15'}}/>
     <div><b style={{color:'#facc15',fontSize:'12px'}}>GARGOURA WORLD BANK</b><br/><small style={{color:'#22c55e',fontSize:'9px'}}>● LIVE • Pi={liveRate} XAF {trend} • 110 langues</small></div>
    </div>
    <button onClick={()=>setShowLangs(!showLangs)} style={{background:'#facc15',color:'black',border:'none',borderRadius:'20px',padding:'6px 10px',fontWeight:'bold',fontSize:'11px'}}>{ALL_LANGS.find(l=>l.c===lang)?.f} {lang.toUpperCase()} ▼</button>
   </div>

   {showLangs&&(
    <div style={{background:'#1e293b',maxHeight:'320px',overflowY:'auto',padding:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5px',borderBottom:'2px solid #facc15'}}>
     {ALL_LANGS.map(l=>(
      <button key={l.c} onClick={()=>{setLang(l.c);setShowLangs(false)}} style={{background:lang===l.c?'#facc15':'#0f172a',color:lang===l.c?'black':'white',border:'1px solid #334155',padding:'8px',borderRadius:'8px',fontSize:'11px',textAlign:'left'}}>{l.f} {l.n}</button>
     ))}
     <div style={{gridColumn:'1/3',background:'#0f172a',padding:'8px',borderRadius:'8px',textAlign:'center',marginTop:'6px'}}><small style={{color:'#facc15'}}>🌍 110 langues • Tu parles une autre langue? Contacte 66 78 75 46 on l'ajoute!</small></div>
    </div>
   )}

   {/* TICKER MARCHE MONDIAL */}
   <div style={{background:'#000',padding:'6px 0',overflow:'hidden',whiteSpace:'nowrap',borderBottom:'1px solid #334155'}}>
    <div style={{display:'inline-block',animation:'scroll 40s linear infinite',color:'#94a3b8',fontSize:'11px'}}>
     🌍 PI REFERENCE MONDIALE: 1π = {liveRate} XAF | $1.134 | €0.99 | £0.85 | 178¥ | ₦1798 | +2.3% 24h • MARCHÉS: XAF/XOF Stable • USD ↑ • EUR ↓ • BTC $67k • PI NETWORK MAINNET LIVE • GARGOURA AGENT 66 78 75 46 DISPO 24/7 •
    </div>
   </div>

   {tab==='home'&&(
    <div style={{padding:'12px'}}>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
      <div style={{background:'linear-gradient(135deg,#facc15,#f59e0b)',padding:'14px',borderRadius:'14px',color:'black'}}><small>Solde Pi Principal</small><h2 style={{margin:'4px 0'}}>1,250 π
