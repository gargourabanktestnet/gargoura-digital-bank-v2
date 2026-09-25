// @ts-nocheck
'use client'
import {useState,useEffect} from 'react'

function genGDB(){return 'GDB-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*900000)}

export default function Page(){
const [gdb,setGdb]=useState('GDB-2026-000000')
const [m,setM]=useState('')
const [a,setA]=useState('accueil')

const funcs=[
{id:'transferer',l:'Transférer',i:'↔️'},
{id:'portefeuilles',l:'Portefeuilles',i:'👛'},
{id:'shopping',l:'Shopping',i:'🛍️'},
{id:'blockchain',l:'Blockchain',i:'⛓️'},
{id:'aiAutomation',l:'aiAutomation',i:'✨'},
{id:'convertir',l:'Convertir',i:'🔄'},
{id:'trading',l:'Trading',i:'📊'},
]

useEffect(function(){
  try{
    var x=localStorage.getItem('gdb_account');
    if(x) setGdb(x);
    else{
      var n=genGDB();
      setGdb(n);
      localStorage.setItem('gdb_account',n)
    }
  }catch(e){setGdb(genGDB())}
},[])

function open(s){setA(s); setM(s); if(s==='accueil'){setM(''); setA('accueil')}}

return(
<div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'system-ui',paddingBottom:90}}>
<div style={{background:'#1e40af',color:'#fff',padding:'12px 14px',position:'sticky',top:0,zIndex:30}}>
  <div style={{fontWeight:900}}>Gargoura • {gdb} • 1 PI = 314,159 USD</div>
</div>

<div style={{padding:14}}>
<div style={{background:'#1e3a8a',borderRadius:20,padding:16,color:'#fff'}}>
  <div>Solde Total • {gdb.slice(0,12)}</div>
  <div style={{fontWeight:900,fontSize:24,marginTop:6}}>1 PI = 314 159,00 USD</div>
  <div style={{fontSize:11,color:'#86efac',marginTop:6}}>🟢 Système en ligne • {funcs.length} modules actifs</div>
</div>

<div style={{background:'#fff',borderRadius:16,padding:12,marginTop:12}}>
  <div style={{fontWeight:900}}>Modules • {gdb.slice(0,8)}</div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:10}}>
    {funcs.map(f=>(
      <button key={f.id} onClick={()=>open(f.id)} style={{border:f.id===a?'2px solid #1e40af':'1px solid #e2e8f0',background:f.id===a?'#dbeafe':'#fff',borderRadius:12,padding:8}}>
        <div style={{fontSize:18}}>{f.i}</div>
        <div style={{fontSize:8,fontWeight:700}}>{f.l}</div>
      </button>
    ))}
  </div>
</div>

{m && (
  <div style={{marginTop:12}}>
    {m==='portefeuilles' && (
      <div style={{background:'#fff',borderRadius:16,padding:12}}>
        <div style={{fontWeight:900}}>Portefeuilles • {gdb}</div>
        <div style={{fontSize:11,color:'#16a34a',marginTop:4}}>8 wallets • PI ref 314,159 USD</div>
        <div style={{marginTop:10,display:'grid',gap:8}}>
          {[
            {s:'PI',b:'12.543',c:'#a855f7'},
            {s:'BTC',b:'0.042',c:'#f59e0b'},
            {s:'ETH',b:'1.24',c:'#6366f1'},
            {s:'USDT',b:'2450',c:'#22c55e'},
            {s:'XAF',b:'1,570,000',c:'#16a34a'},
            {s:'XOF',b:'2,100,000',c:'#16a34a'},
          ].map(w=>(
            <div key={w.s} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:10,display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:10,height:10,background:w.c,borderRadius:10}}></div><div style={{fontWeight:800}}>{w.s}</div><div style={{fontSize:10,color:'#64748b'}}>{gdb.slice(0,8)}</div></div>
              <div style={{fontWeight:800}}>{w.b} {w.s}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>alert('GDB '+gdb+' - Total '+(12.543*314159).toFixed(2)+' USD')} style={{width:'100%',marginTop:10,background:'#1e40af',color:'#fff',border:'none',borderRadius:12,padding:10,fontWeight:800}}>Voir Total PI</button>
      </div>
    )}
    {m!=='portefeuilles' && (
      <div style={{background:'#fff',borderRadius:12,padding:12}}>
        <div style={{fontWeight:800}}>{m} • {gdb}</div>
        <div style={{fontSize:11,color:'#64748b'}}>Module en construction - GDB {gdb}</div>
        <button onClick={()=>{setM(''); setA('accueil')}} style={{width:'100%',marginTop:10,background:'#f1f5f9',border:'none',borderRadius:10,padding:8}}>Retour</button>
      </div>
    )}
  </div>
)}

</div>

<div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'2px solid #facc15',display:'flex',justifyContent:'space-around',padding:6}}>
  <button onClick={()=>open('accueil')} style={{border:'none',background:'none',fontSize:10}}>🏠<br/>Accueil</button>
  <button onClick={()=>open('portefeuilles')} style={{border:'none',background:a==='portefeuilles'?'#dbeafe':'none',borderRadius:10,padding:'4px 10px',fontSize:10}}>👛<br/>Wallet</button>
  <button onClick={()=>open('shopping')} style={{border:'none',background:'none',fontSize:10}}>🛍️<br/>Shopping</button>
</div>

</div>
)
       }
