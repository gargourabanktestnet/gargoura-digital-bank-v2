// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'
import Convertir from '../components/Convertir'
import Trading from '../components/Trading'
import AiAutomation from '../components/AiAutomation'
function genGDB(){return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000)}
export default function Page(){
const [gdb,setGdb]=useState('GDB-2026-000000')
const [m,setM]=useState('')
const [a,setA]=useState('accueil')
const [amt,setAmt]=useState('')
const [dest,setDest]=useState('')
const [crypto,setCrypto]=useState('π PiCoin (314,159.00 USD)')
const [p2p,setP2p]=useState('interne')
const [zone,setZone]=useState('CEMAC')
const [bank,setBank]=useState('')
const [cExt,setCExt]=useState('')
const [fromT,setFromT]=useState('π PiCoin')
const [toT,setToT]=useState('USDT')
const [dAmt,setDAmt]=useState('')
const [logoErr,setLogoErr]=useState(false)
const funcs=[
{id:'transferer',l:'Transférer',i:'↔️'},
{id:'virement',l:'Virement Bancaire',i:'💳'},
{id:'pidex',l:'Pi DEX',i:'📈'},
{id:'convertir',l:'Convertir',i:'🔄'},
{id:'trading',l:'Trading',i:'📊'},
{id:'aiAutomation',l:'aiAutomation',i:'✨'},
{id:'blockchain',l:'blockchain',i:'⛓️'},
{id:'shopping',l:'Shopping',i:'🛍️'},
{id:'portefeuilles',l:'Portefeuilles',i:'👛'},
{id:'automobile',l:'Automobile',i:'🚗'},
{id:'agregation',l:'Agrégation de Comptes',i:'🗂️'},
{id:'gestion',l:'Gestion Financière',i:'📊'},
]
const banks={
'CEMAC':['Afriland','Ecobank CEMAC','UBA','BICEC','SCB','BGFIBank'],
'UEMOA':['Ecobank UEMOA','BOA','UBA Senegal','BCEAO','Coris','NSIA'],
'Dollar':['Chase','BoA','Citi','Wells Fargo','Goldman'],
'Jordanie':['Arab Bank JO','Housing Bank','Jordan Islamic','Cairo Amman'],
'Golfe':['Dubai Islamic','QNB','NBK','FAB','Al Rajhi'],
'Moyen-Orient':['Arab Bank','Bank Audi','NBE','Bank Melli'],
'International':['SWIFT','SEPA','HSBC','Standard Chartered']
}
const cr=['π PiCoin (314,159.00 USD)','BTC','ETH','USDT','BNB','SOL','XAF','XOF']
const toks=['π PiCoin','BTC','ETH','USDT','BNB','SOL']
const pools=[{p:'π/USDT',q:'2.4M',y:'12.5%'},{p:'π/BTC',q:'1.8M',y:'18.2%'},{p:'π/ETH',q:'1.2M',y:'15.8%'}]
useEffect(function(){try{var x=localStorage.getItem('gdb_account'); if(x) setGdb(x); else{var n=genGDB(); setGdb(n); localStorage.setItem('gdb_account',n)}}catch(e){setGdb(genGDB())}},[])
function open(s){setA(s); if(s==='accueil') setM(''); else setM(s)}
return(
<div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:90}}>
<div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',position:'sticky',top:0,zIndex:30}}><div style={{fontWeight:900}}>Gargoura • {gdb}</div></div>
<div style={{padding:14,display:'flex',flexDirection:'column',gap:12}}>
<div style={{background:'#fff',border:'2px solid #facc15',borderRadius:20,padding:14,display:'flex',flexDirection:'column',alignItems:'center'}}>
{!logoErr? (<img src="/logo.png" alt="GDB" onError={function(){setLogoErr(true)}} style={{width:70,height:70,borderRadius:35,border:'3px solid #facc15'}} />):(<div style={{width:70,height:70,borderRadius:35,background:'#1e3a8a',border:'3px solid #facc15',display:'flex',alignItems:'center',justifyContent:'center',color:'#facc15',fontWeight:900}}>GDB</div>)}
<div style={{fontWeight:900,marginTop:8}}>GARGOURA DIGITAL BANK</div><div style={{fontSize:10}}>{gdb}</div>
</div>
<div style={{background:'#1e3a8a',borderRadius:20,padding:16,color:'#fff'}}><div style={{fontSize:13}}>Solde Total • {gdb}</div><div style={{fontWeight:900,fontSize:24,marginTop:8}}>1 pi = 314 159,00 USD</div><div style={{display:'flex',alignItems:'center',gap:6,marginTop:8}}><div style={{width:8,height:8,background:'#22c55e',borderRadius:8}}></div><div style={{fontSize:11,color:'#86efac',fontWeight:700}}>Le système est en ligne • Trading PI Actif</div></div><div style={{display:'flex',gap:8,marginTop:12}}><button onClick={function(){open('transferer')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Envoyer</button><button onClick={function(){setM('receive')}} style={{flex:1,background:'#fff',color:'#1e3a8a',border:'none',borderRadius:20,padding:10,fontWeight:800}}>Recevoir</button></div></div>
<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:12}}><div style={{fontWeight:900}}>Fonctionnalités Courantes • 12</div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>{funcs.map(function(f){return (<button key={f.id} onClick={function(){open(f.id)}} style={{border:f.id==='trading'?'2px solid #16a34a':'1px solid #e2e8f0',background:f.id==='trading'?'#f0fdf4':'#fff',borderRadius:12,padding:'8px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{fontSize:16}}>{f.i}</div><div style={{fontSize:7,fontWeight:700,textAlign:'center'}}>{f.l}</div></button>)})}</div></div>
</div>
<div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:'6px 2px 8px 2px',zIndex:40}}>
<button onClick={function(){open('accueil')}} style={{border:'none',background:a==='accueil'?'#dbeafe':'none',fontSize:9,color:a==='accueil'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏠</div>Accueil</button>
<button onClick={function(){open('transferer')}} style={{border:'none',background:a==='transferer'?'#dbeafe':'none',fontSize:9,color:a==='transferer'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>↔️</div>Paiements</button>
<button onClick={function(){open('trading')}} style={{border:'none',background:a==='trading'?'#dbeafe':'none',fontSize:9,color:a==='trading'?'#16a34a':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>📈</div>Trading</button>
<button onClick={function(){open('services')}} style={{border:'none',background:a==='services'?'#dbeafe':'none',fontSize:9,color:a==='services'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🏛️</div>Services</button>
<button onClick={function(){open('innovation')}} style={{border:'none',background:a==='innovation'?'#dbeafe':'none',fontSize:9,color:a==='innovation'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>✨</div>Innovation</button>
<button onClick={function(){open('securite')}} style={{border:'none',background:a==='securite'?'#dbeafe':'none',fontSize:9,color:a==='securite'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>🛡️</div>Securite</button>
<button onClick={function(){open('support')}} style={{border:'none',background:a==='support'?'#dbeafe':'none',fontSize:9,color:a==='support'?'#1e40af':'#64748b',borderRadius:12,padding:'6px 5px',display:'flex',flexDirection:'column',alignItems:'center',minWidth:42}}><div style={{fontSize:18}}>❓</div>Support</button>
</div>
{m? (<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:60,display:'flex',alignItems:'flex-end'}}><div style={{background:'#f8fafc',width:'100%',borderRadius:'20px 20px 0 0',padding:12,maxHeight:'92vh',overflowY:'auto'}}>
<div style={{display:'flex',justifyContent:'space-between',background:'#1e40af',color:'#fff',padding:10,borderRadius:12}}><div style={{fontWeight:900,fontSize:11}}>{gdb} • {m}</div><button onClick={function(){setM(''); setA('accueil')}} style={{border:'none',background:'rgba(255,255,255,0.2)',color:'#fff',borderRadius:20,width:28,height:28}}>✕</button></div>
{m==='transferer' && (<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}><div style={{display:'flex',background:'#f1f5f9',borderRadius:12,padding:4}}><button onClick={function(){setP2p('interne')}} style={{flex:1,background:p2p==='interne'?'#1e40af':'transparent',color:p2p==='interne'?'#fff':'#64748b',border:'none',borderRadius:10,padding:8,fontSize:12,fontWeight:800}}>Interne</button><button onClick={function(){setP2p('externe')}} style={{flex:1,background:p2p==='externe'?'#1e40af':'transparent',color:p2p==='externe'?'#fff':'#64748b',border:'none',borderRadius:10,padding:8,fontSize:12,fontWeight:800}}>Externe</button></div>{p2p==='interne'? (<div style={{marginTop:10}}><input value={dest} onChange={function(e){setDest(e.target.value)}} placeholder="Compte ou ID" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1'}} /><select value={crypto} onChange={function(e){setCrypto(e.target.value)}} style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}}>{cr.map(function(c){return (<option key={c} value={c}>{c}</option>)})}</select><input value={amt} onChange={function(e){setAmt(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} /><button onClick={function(){setM('Transfert '+amt+' '+crypto+' de '+gdb+' vers '+dest)}} style={{width:'100%',marginTop:8,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:800}}>Envoyer</button></div>):(<div style={{marginTop:10}}><div style={{display:'flex',flexDirection:'column',gap:4,border:'1px solid #e2e8f0',borderRadius:12,padding:6}}>{Object.keys(banks).map(function(z){return (<button key={z} onClick={function(){setZone(z); setBank('')}} style={{padding:'8px 10px',border:'none',borderRadius:8,background:zone===z?'#1e40af':'#f8fafc',color:zone===z?'#fff':'#334155',textAlign:'left',fontSize:12}}>- {z}</button>)})}</div><div style={{border:'1px solid #cbd5e1',borderRadius:12,marginTop:8,maxHeight:80,overflowY:'auto'}}>{(banks[zone]||[]).map(function(b){return (<button key={b} onClick={function(){setBank(b)}} style={{width:'100%',padding:'6px 10px',border:'none',borderBottom:'1px solid #f1f5f9',background:bank===b?'#eff6ff':'#fff',textAlign:'left',fontSize:11}}>{bank===b?'✓ ':''}{b}</button>)})}</div><input value={cExt} onChange={function(e){setCExt(e.target.value)}} placeholder="Numéro compte" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} /><input value={amt} onChange={function(e){setAmt(e.target.value)}} placeholder="0.00 PiCoin 314159 USD" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} /><button onClick={function(){setM('sendToExternalBank '+amt+' de '+gdb+' vers '+bank)}} style={{width:'100%',marginTop:8,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:900}}>sendToExternalBank</button></div>)}</div>)}
{m==='virement' && (<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}><div style={{fontWeight:900}}>Virement Bancaire • ISO20022 SWIFT SEPA</div><div style={{display:'flex',flexDirection:'column',gap:4,marginTop:8,border:'1px solid #e2e8f0',borderRadius:12,padding:6}}>{Object.keys(banks).map(function(z){return (<button key={z} onClick={function(){setZone(z); setBank('')}} style={{padding:'8px 10px',border:'none',borderRadius:8,background:zone===z?'#16a34a':'#f8fafc',color:zone===z?'#fff':'#334155',textAlign:'left',fontSize:12}}>- {z}</button>)})}</div><div style={{border:'1px solid #cbd5e1',borderRadius:12,marginTop:8,maxHeight:80,overflowY:'auto'}}>{(banks[zone]||[]).map(function(b){return (<button key={b} onClick={function(){setBank(b)}} style={{width:'100%',padding:'6px 10px',border:'none',background:bank===b?'#dcfce7':'#fff',textAlign:'left',fontSize:11}}>{b}</button>)})}</div><input value={cExt} onChange={function(e){setCExt(e.target.value)}} placeholder="Compte bénéficiaire" style={{width:'100%',padding:10,borderRadius:12,border:'1px solid #cbd5e1',marginTop:8}} /><input value={amt} onChange={function(e){setAmt(e.target.value)}} placeholder="0.00" style={{width:'100%',padding:10,borderRadius:12,border:'2px solid #16a34a',marginTop:8,fontWeight:800}} /><button onClick={function(){setM('Virement '+amt+' de '+gdb+' vers '+bank)}} style={{width:'100%',marginTop:8,background:'#16a34a',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:900}}>Envoyer Virement</button></div>)}
{m==='pidex' && (<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}><div style={{fontWeight:900}}>Pi DEX & AMM • {gdb.slice(0,12)} • 314,159 USD ref</div><div style={{background:'#faf5ff',border:'1px solid #e9d5ff',borderRadius:12,padding:10,marginTop:10}}><div style={{display:'flex',gap:6}}><select value={fromT} onChange={function(e){setFromT(e.target.value)}} style={{padding:8,borderRadius:10,border:'1px solid #cbd5e1',fontWeight:800}}>{toks.map(function(t){return (<option key={t} value={t}>{t}</option>)})}</select><input value={dAmt} onChange={function(e){setDAmt(e.target.value)}} placeholder="0.00" style={{flex:1,padding:10,borderRadius:10,border:'1px solid #cbd5e1',fontWeight:800}} /></div><div style={{textAlign:'center',margin:'6px 0'}}>⇅</div><div style={{display:'flex',gap:6}}><select value={toT} onChange={function(e){setToT(e.target.value)}} style={{padding:8,borderRadius:10,border:'1px solid #cbd5e1',fontWeight:800}}>{toks.map(function(t){return (<option key={t} value={t}>{t}</option>)})}</select><input value={dAmt? (parseFloat(dAmt)*2.5).toFixed(2):''} readOnly placeholder="Estimé" style={{flex:1,padding:10,borderRadius:10,border:'1px solid #e2e8f0',background:'#f8fafc'}} /></div></div><button onClick={function(){setM('Swap '+dAmt+' '+fromT+' -> '+toT+' de '+gdb)}} style={{width:'100%',marginTop:10,background:'#a855f7',color:'#fff',border:'none',borderRadius:12,padding:12,fontWeight:900}}>Swap via AMM {fromT}→{toT}</button><div style={{marginTop:10}}>{pools.map(function(p){return (<div key={p.p} style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',border:'1px solid #e2e8f0',borderRadius:10,marginTop:4,fontSize:11}}><div style={{fontWeight:800}}>{p.p}</div><div>Liq {p.q} APY {p.y}</div></div>)})}</div></div>)}
{m==='convertir' && (<Convertir gdb={gdb} />)}
{m==='trading' && (<Trading gdb={gdb} />)}
  {m==='aiautomation' && (<AiAutomation gdb={gdb} />)}
{m==='receive' && (<div style={{textAlign:'center',background:'#fff',borderRadius:16,padding:14,marginTop:10}}><div style={{fontWeight:900}}>{gdb}</div><img src={'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(gdb)} alt="QR" style={{width:180,height:180,marginTop:10,border:'2px solid #facc15',borderRadius:12}} /></div>)}
{m!=='transferer' && m!=='virement' && m!=='pidex' && m!=='convertir' && m!=='trading' && m!=='receive' && (<div style={{background:'#fff',borderRadius:12,padding:12,marginTop:10}}><div style={{fontWeight:800}}>{m} • {gdb}</div><div style={{fontSize:11,color:'#64748b',marginTop:4}}>Module en construction - GDB unique {gdb} • PiCoin 314159 USD ref - Interopérable ISO20022</div></div>)}
<button onClick={function(){setM(''); setA('accueil')}} style={{width:'100%',marginTop:10,background:'#f1f5f9',border:'none',borderRadius:12,padding:10}}>Retour Accueil • {gdb}</button>
</div></div>) : null}
</div>
)
}
