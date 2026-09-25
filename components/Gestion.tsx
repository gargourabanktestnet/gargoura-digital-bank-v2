// @ts-nocheck
'use client'
import {useState} from 'react'
export default function Gestion({gdb}){
  const [budget,setBudget]=useState(5.2)
  const dep=[{n:'Shopping',v:0.8,c:'#f97316'},{n:'Automobile',v:0.4,c:'#1e40af'},{n:'Trading',v:0.3,c:'#22c55e'},{n:'Virement',v:0.2,c:'#a855f7'},{n:'Frais',v:0.1,c:'#64748b'}]
  const totalDep=dep.reduce((s,x)=>s+x.v,0)
  const epargne=budget-totalDep
  const totalUsd=epargne*314159

  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>📊 Gestion Financière • {gdb?.slice(0,8)}</div>
        <div style={{fontSize:10,background:'#16a34a',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>{epargne.toFixed(2)} PI épargne</div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>Budget • Dépenses • Épargne • PI 314,159 USD • GDB {gdb}</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:12,marginTop:10}}>
        <div style={{fontSize:11,color:'#93c5fd'}}>Bilan Mensuel • GDB {gdb.slice(0,10)} • PI Ref</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:10}}>
          <div style={{background:'rgba(255,255,255,0.15)',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontSize:10}}>Revenus</div><div style={{fontWeight:900,fontSize:14,marginTop:2}}>{budget} PI</div><div style={{fontSize:9}}>${(budget*314159).toFixed(0)}</div></div>
          <div style={{background:'rgba(239,68,68,0.3)',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontSize:10}}>Dépenses</div><div style={{fontWeight:900,fontSize:14,marginTop:2}}>{totalDep} PI</div><div style={{fontSize:9}}>${(totalDep*314159).toFixed(0)}</div></div>
          <div style={{background:'rgba(34,197,94,0.3)',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontSize:10}}>Épargne</div><div style={{fontWeight:900,fontSize:14,marginTop:2}}>{epargne.toFixed(2)} PI</div><div style={{fontSize:9}}>${totalUsd.toFixed(0)}</div></div>
        </div>
        <div style={{marginTop:10,background:'#fff',borderRadius:10,height:8,overflow:'hidden',display:'flex'}}>
          {dep.map(function(d){return (<div key={d.n} style={{width:(d.v/budget*100)+'%',background:d.c}}></div>)})}
          <div style={{width:(epargne/budget*100)+'%',background:'#22c55e'}}></div>
        </div>
      </div>

      <div style={{marginTop:12,fontWeight:800,fontSize:12}}>Répartition Dépenses • PI • {gdb.slice(0,6)}</div>
      <div style={{marginTop:8,display:'grid',gap:6}}>
        {dep.map(function(d){
          return(
            <div key={d.n} style={{border:'1px solid #e2e8f0',borderRadius:10,padding:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:10,height:10,background:d.c,borderRadius:10}}></div><div style={{fontWeight:700,fontSize:11}}>{d.n}</div><div style={{fontSize:9,color:'#64748b'}}>{(d.v/budget*100).toFixed(0)}%</div></div>
              <div style={{textAlign:'right'}}><div style={{fontWeight:800,fontSize:11}}>{d.v} PI</div><div style={{fontSize:9,color:'#64748b'}}>${(d.v*314159).toFixed(0)} USD ref</div></div>
            </div>
          )
        })}
      </div>

      <div style={{marginTop:12,background:'#f0fdf4',border:'2px solid #16a34a',borderRadius:12,padding:10}}>
        <div style={{fontWeight:800,fontSize:12}}>💰 Objectif Épargne • GDB {gdb.slice(0,8)}</div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:11}}><div>Actuel {epargne.toFixed(2)} PI / 10 PI</div><div style={{fontWeight:800,color:'#16a34a'}}>{(epargne/10*100).toFixed(0)}%</div></div>
        <div style={{background:'#fff',borderRadius:10,height:10,marginTop:6,overflow:'hidden'}}><div style={{width:(epargne/10*100)+'%',background:'#16a34a',height:'100%'}}></div></div>
        <div style={{fontSize:10,marginTop:6,color:'#15803d'}}>Épargne {epargne.toFixed(2)} PI = ${totalUsd.toFixed(0)} USD ref • 1 PI = 314,159 USD • GDB {gdb}</div>
        <div style={{display:'flex',gap:6,marginTop:8}}>
          <button onClick={function(){setBudget(function(b){return +(b+0.5).toFixed(2)})}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:8,padding:8,fontSize:10,fontWeight:800}}>+0.5 PI Revenu</button>
          <button onClick={function(){alert('Épargne '+epargne.toFixed(2)+' PI de '+gdb+' placée à 12% APY PI = '+(epargne*0.12).toFixed(3)+' PI/an')}} style={{flex:1,background:'#1e40af',color:'#fff',border:'none',borderRadius:8,padding:8,fontSize:10,fontWeight:800}}>Placer 12% APY PI</button>
        </div>
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:10,textAlign:'center'}}>• Gestion ISO20022 • Budget PI ref 314,159 USD • Conversion auto XAF/XOF/USD/Golfe → PI • GDB unique {gdb} • Mondial • Toutes transactions traçées Blockchain</div>
    </div>
  )
                            }
