// @ts-nocheck
'use client'
import {useState} from 'react'
export default function Agregation({gdb}){
  const [zone,setZone]=useState('CEMAC')
  const [connected,setConnected]=useState(['Afriland','Ecobank CEMAC'])
  const banks={
    'CEMAC':[
      {n:'Afriland First Bank',url:'https://www.afrilandfirstbank.com',bal:1250000,color:'#1e40af',iso:'CM'},
      {n:'Ecobank CEMAC',url:'https://www.ecobank.com',bal:890000,color:'#00a650',iso:'CM'},
      {n:'UBA Tchad',url:'https://www.ubagroup.com',bal:560000,color:'#d50000',iso:'TD'},
      {n:'BICEC Cameroun',url:'https://www.bicec.com',bal:2340000,color:'#ff6f00',iso:'CM'},
      {n:'BGFIBank Gabon',url:'https://www.bgfi.com',bal:1870000,color:'#0a4da1',iso:'GA'},
      {n:'SCB Cameroun',url:'https://www.scb-cameroun.com',bal:980000,color:'#00205b',iso:'CM'},
    ],
    'UEMOA':[
      {n:'BOA Burkina',url:'https://www.bankofafrica.net',bal:2100000,color:'#ff6600',iso:'BF'},
      {n:'Ecobank UEMOA',url:'https://www.ecobank.com',bal:1650000,color:'#00a650',iso:'SN'},
      {n:'Coris Bank',url:'https://www.coris-bank.com',bal:980000,color:'#c41230',iso:'BF'},
      {n:'NSIA Banque',url:'https://www.nsiabanque.com',bal:1340000,color:'#0033a0',iso:'CI'},
    ],
    'Golfe':[
      {n:'Dubai Islamic Bank',url:'https://www.dib.ae',bal:12000,color:'#000',iso:'AE'},
      {n:'QNB Qatar',url:'https://www.qnb.com',bal:18500,color:'#8a1538',iso:'QA'},
      {n:'Al Rajhi Bank',url:'https://www.alrajhibank.com.sa',bal:22000,color:'#006747',iso:'SA'},
      {n:'FAB UAE',url:'https://www.bankfab.com',bal:15700,color:'#0a2a5e',iso:'AE'},
    ],
    'Jordanie':[
      {n:'Arab Bank JO',url:'https://www.arabbank.com',bal:8900,color:'#002a5c',iso:'JO'},
      {n:'Housing Bank',url:'https://www.hbtf.com',bal:5600,color:'#e4002b',iso:'JO'},
    ],
    'International':[
      {n:'HSBC',url:'https://www.hsbc.com',bal:4500,color:'#db0011',iso:'GB'},
      {n:'Standard Chartered',url:'https://www.sc.com',bal:6200,color:'#00a6ca',iso:'GB'},
      {n:'Chase USD',url:'https://www.chase.com',bal:3200,color:'#0b6efd',iso:'US'},
    ]
  }
  function toggle(name){setConnected(function(c){return c.includes(name)?c.filter(function(x){return x!==name}):[...c,name]})}
  var allBanks=Object.values(banks).flat()
  var connectedBanks=allBanks.filter(function(b){return connected.includes(b.n)})
  var totalXAF=connectedBanks.filter(function(b){return ['CM','TD','GA','BF','SN','CI'].includes(b.iso)}).reduce(function(s,b){return s+b.bal},0)
  var totalUSD=connectedBanks.filter(function(b){return ['AE','QA','SA','JO','GB','US'].includes(b.iso)}).reduce(function(s,b){return s+b.bal},0)
  var totalPI=(totalXAF*0.0016 + totalUSD)/314159 + 2.5

  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>🗂️ Agrégation • {gdb?.slice(0,8)}</div>
        <div style={{fontSize:10,background:'#1e40af',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>{connected.length} Connectés</div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>Multi-banques • PI 314,159 USD • Agrégation temps réel • GDB {gdb}</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:12,marginTop:10}}>
        <div style={{fontSize:11,color:'#93c5fd'}}>Patrimoine Agrégé Global • GDB {gdb.slice(0,10)}</div>
        <div style={{fontWeight:900,fontSize:20,marginTop:4}}>{totalPI.toFixed(4)} PI</div>
        <div style={{fontSize:12,color:'#86efac',marginTop:2}}>= ${(totalPI*314159).toFixed(0)} USD ref • {connected.length} banques connectées</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:10}}>
          <div style={{background:'rgba(255,255,255,0.15)',borderRadius:8,padding:6,textAlign:'center'}}><div style={{fontWeight:800,fontSize:11}}>{totalXAF.toLocaleString()} XAF</div><div style={{fontSize:8}}>CEMAC/UEMOA</div></div>
          <div style={{background:'rgba(255,255,255,0.15)',borderRadius:8,padding:6,textAlign:'center'}}><div style={{fontWeight:800,fontSize:11}}>${totalUSD.toLocaleString()} USD</div><div style={{fontSize:8}}>Golfe/Int</div></div>
          <div style={{background:'rgba(255,255,255,0.15)',borderRadius:8,padding:6,textAlign:'center'}}><div style={{fontWeight:800,fontSize:11}}>{totalPI.toFixed(2)} PI</div><div style={{fontSize:8}}>Ref 314159</div></div>
        </div>
      </div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:4}}>
        {Object.keys(banks).map(function(z){return (<button key={z} onClick={function(){setZone(z)}} style={{whiteSpace:'nowrap',padding:'6px 12px',borderRadius:20,border:zone===z?'2px solid #1e40af':'1px solid #e2e8f0',background:zone===z?'#dbeafe':'#fff',fontSize:10,fontWeight:zone===z?'800':'500'}}>{z} ({banks[z].length})</button>)})}
      </div>

      <div style={{marginTop:10}}>
        <div style={{fontWeight:800,fontSize:12}}>Banques {zone} • Connexion ISO20022 • GDB {gdb.slice(0,6)}</div>
        <div style={{display:'grid',gap:8,marginTop:8}}>
          {(banks[zone]||[]).map(function(b){
            var isConn=connected.includes(b.n)
            return(
              <div key={b.n} style={{border:isConn?'2px solid #16a34a':'1px solid #e2e8f0',borderRadius:12,padding:10,background:isConn?'#f0fdf4':'#fff',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:10,height:10,background:b.color,borderRadius:10}}></div><div><div style={{fontWeight:800,fontSize:11}}>{b.n}</div><div style={{fontSize:9,color:'#64748b'}}>{b.iso} • Solde {b.bal.toLocaleString()} • GDB {gdb.slice(0,6)} • PI {(b.bal*(b.iso==='US'||b.iso==='AE'?'1':'0.0016')/314159).toFixed(4)}</div></div></div>
                <div style={{display:'flex',gap:4,flexDirection:'column'}}>
                  <button onClick={function(){toggle(b.n)}} style={{border:'none',background:isConn?'#16a34a':'#1e40af',color:'#fff',borderRadius:8,padding:'6px 10px',fontSize:9,fontWeight:800}}>{isConn?'✅ Connecté':'🔗 Connecter'}</button>
                  <a href={b.url} target="_blank" rel="noopener noreferrer" style={{background:'#fff',border:'1px solid #1e40af',color:'#1e40af',borderRadius:8,padding:'4px 8px',fontSize:8,fontWeight:800,textDecoration:'none',textAlign:'center'}}>🌐 Site Officiel</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{marginTop:12,fontWeight:800,fontSize:12}}>Comptes Agrégés • {connected.length} • Temps réel • {gdb.slice(0,8)}</div>
      <div style={{border:'1px solid #e2e8f0',borderRadius:12,marginTop:6,overflow:'hidden'}}>
        {connectedBanks.length===0? (<div style={{padding:12,fontSize:11,color:'#64748b',textAlign:'center'}}>Aucun compte connecté • Clique Connecter • GDB {gdb}</div>) : connectedBanks.map(function(b,i){return (<div key={b.n} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',borderBottom:'1px solid #f1f5f9',fontSize:11,background:'#fff'}}><div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:8,height:8,background:b.color,borderRadius:8}}></div><div style={{fontWeight:800}}>{b.n}</div><div style={{fontSize:8,background:'#dcfce7',padding:'2px 6px',borderRadius:10}}>ISO20022 OK</div></div><div style={{textAlign:'right'}}><div style={{fontWeight:800}}>{b.bal.toLocaleString()} {b.iso==='US'||b.iso==='AE'||b.iso==='QA'||b.iso==='SA'||b.iso==='JO'||b.iso==='GB'?'USD':'XAF'}</div><div style={{fontSize:9,color:'#16a34a'}}>{(b.bal*(b.iso==='US'||b.iso==='AE'||b.iso==='QA'||b.iso==='SA'||b.iso==='JO'||b.iso==='GB'?'1':'0.0016')/314159).toFixed(5)} PI • {(b.bal*(b.iso==='US'||b.iso==='AE'?'1':'0.0016')).toFixed(0)} USD ref</div></div></div>)})}
      </div>

      <div style={{display:'flex',gap:6,marginTop:10}}>
        <button onClick={function(){alert('Synchronisation ISO20022 de '+connected.length+' banques pour '+gdb+' - Total '+totalPI.toFixed(4)+' PI = '+(totalPI*314159).toFixed(0)+' USD')}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:10,padding:10,fontSize:11,fontWeight:800}}>🔄 Synchroniser ISO20022</button>
        <button onClick={function(){alert('Conversion auto '+totalXAF+' XAF + '+totalUSD+' USD -> '+totalPI.toFixed(4)+' PI pour '+gdb+' ref 314159 USD - CEMAC/UEMOA/Golfe')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:10,padding:10,fontSize:11,fontWeight:800}}>Convertir Tout en PI</button>
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:10,textAlign:'center'}}>• Agrégation ISO20022: Afriland, Ecobank, UBA, BICEC, BGFIBank, BOA, Coris, NSIA, Dubai Islamic, QNB, Al Rajhi, FAB, Arab Bank, HSBC, Chase<br/>• Sites officiels directs • Conversion auto XAF/XOF/USD → PI 1 PI = 314,159 USD • GDB unique {gdb} • Mondial</div>
    </div>
  )
        }
