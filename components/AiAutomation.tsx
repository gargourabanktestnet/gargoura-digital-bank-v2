// @ts-nocheck
'use client'
import {useState} from 'react'
export default function AiAutomation({gdb}){
  const [cat,setCat]=useState('Particuliers')
  const [auto,setAuto]=useState({epargne:false,trading:false,paiement:false,fraude:true,budget:true})
  const cats={
    'Particuliers':[
      {t:'Épargne Auto Pi',d:'Épargne automatique 10% de chaque revenu en PI',i:'💰',act:'epargne'},
      {t:'Budget Intelligent',d:'AI analyse dépenses XAF/XOF/USD et optimise',i:'📊',act:'budget'},
      {t:'Paiements Auto',d:'Factures CEMAC/UEMOA payées auto via PI',i:'⚡',act:'paiement'},
      {t:'Alerte Fraude AI',d:'Détection anomalie transactions temps réel',i:'🛡️',act:'fraude'},
    ],
    'Entreprises':[
      {t:'Paie Auto CEMAC',d:'Paie salariés Afriland/Ecobank auto PI→XAF',i:'🏢'},
      {t:'Trading Bot PI',d:'Bot achat/vente PI/USDT PI/BTC 16 paires auto',i:'🤖',act:'trading'},
      {t:'Facturation ISO20022',d:'Factures auto SWIFT/SEPA avec GDB',i:'🧾'},
      {t:'Trésorerie AI',d:'Prédiction cash-flow 90 jours via AI',i:'📈'},
    ],
    'Institutions':[
      {t:'KYC/AML Auto',d:'Vérification identité AI + AML temps réel',i:'🏛️'},
      {t:'Agrégation Comptes',d:'Agrégation 50 banques CEMAC/UEMOA/Golfe',i:'🗂️'},
      {t:'Rapport Régulateur',d:'Rapports BCEAO/BEAC auto format ISO20022',i:'📋'},
      {t:'Liquidité PI AMM',d:'Gestion liquidité pools PI/USDT PI/BTC',i:'💧'},
    ],
    'Commerçants':[
      {t:'POS PI Auto',d:'Encaissement PI → XAF/XOF auto conversion',i:'🛒'},
      {t:'Stock AI',d:'Prédiction rupture stock via ventes PI',i:'📦'},
      {t:'Cashback Auto',d:'Cashback 2% PI automatique clients',i:'🎁'},
    ]
  }
  function toggle(k){setAuto(function(a){var n={...a}; n[k]=!n[k]; return n})}
  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>aiAutomation • {gdb?.slice(0,8)}</div>
        <div style={{fontSize:10,background:'#a855f7',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>AI ACTIVE</div>
      </div>
      <div style={{fontSize:11,color:'#a855f7',fontWeight:700,marginTop:4}}>IA pour particuliers, entreprises, institutions • PI 314,159 USD ref • {gdb}</div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:6}}>
        {Object.keys(cats).map(function(c){return (<button key={c} onClick={function(){setCat(c)}} style={{whiteSpace:'nowrap',padding:'8px 12px',borderRadius:20,border:'none',background:cat===c?'#a855f7':'#f1f5f9',color:cat===c?'#fff':'#334155',fontSize:11,fontWeight:cat===c?'800':'500'}}>{c}</button>)})}
      </div>

      <div style={{display:'grid',gap:8,marginTop:12}}>
        {cats[cat].map(function(it,i){
          var active= it.act? auto[it.act] : false
          return (
            <div key={i} style={{border: active?'2px solid #a855f7':'1px solid #e2e8f0',background: active?'#faf5ff':'#fff',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',gap:10,alignItems:'center',flex:1}}>
                <div style={{width:36,height:36,background:active?'#a855f7':'#f1f5f9',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{it.i}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:12}}>{it.t}</div><div style={{fontSize:10,color:'#64748b',marginTop:2}}>{it.d}</div><div style={{fontSize:9,color:'#a855f7',marginTop:2,fontWeight:700}}>GDB {gdb?.slice(0,12)} • {cat}</div></div>
              </div>
              {it.act? (<button onClick={function(){toggle(it.act)}} style={{marginLeft:8,border:'none',background:active?'#a855f7':'#e2e8f0',color:active?'#fff':'#64748b',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>{active?'ON':'OFF'}</button>):(<div style={{fontSize:9,background:'#f1f5f9',padding:'4px 8px',borderRadius:10}}>Bientôt</div>)}
            </div>
          )
        })}
      </div>

      <div style={{background:'#1e3a8a',borderRadius:12,padding:12,marginTop:12,color:'#fff'}}>
        <div style={{fontWeight:800,fontSize:12}}>🤖 Assistant AI GDB • {gdb?.slice(0,10)}</div>
        <div style={{fontSize:11,marginTop:6,color:'#93c5fd'}}>Bonjour {gdb}, je détecte: • Revenu +12% ce mois • Épargne auto 0.5 PI possible • 3 paiements CEMAC en attente • Risque fraude faible</div>
        <div style={{display:'flex',gap:6,marginTop:10}}>
          <button onClick={function(){alert('AI Automation: Épargne 0.5 PI programmée pour '+gdb+' - Référence 314159 USD')}} style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:10,padding:8,fontSize:11,fontWeight:800}}>Épargner 0.5 PI Auto</button>
          <button onClick={function(){alert('AI Automation: Trading bot PI/USDT activé pour '+gdb+' - 16 paires PI référence')}} style={{flex:1,background:'#a855f7',color:'#fff',border:'none',borderRadius:10,padding:8,fontSize:11,fontWeight:800}}>Activer Bot Trading</button>
        </div>
      </div>

      <div style={{display:'flex',gap:6,marginTop:10}}>
        <div style={{flex:1,background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:12}}>{Object.values(auto).filter(Boolean).length}/5</div><div style={{fontSize:9,color:'#64748b'}}>Automations ON</div></div>
        <div style={{flex:1,background:'#faf5ff',border:'1px solid #e9d5ff',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:12}}>314,159</div><div style={{fontSize:9,color:'#64748b'}}>USD PI Ref AI</div></div>
        <div style={{flex:1,background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:10,padding:8,textAlign:'center'}}><div style={{fontWeight:800,fontSize:12}}>{cat}</div><div style={{fontSize:9,color:'#64748b'}}>Mode Actif</div></div>
      </div>

      <div style={{fontSize:10,color:'#64748b',marginTop:8,textAlign:'center'}}>• AI pour particuliers: épargne, budget, paiements auto CEMAC/UEMOA<br/>• Entreprises: paie, bot trading 16 paires PI, trésorerie AI<br/>• Institutions: KYC/AML, rapports BEAC/BCEAO, liquidité AMM<br/>• {gdb} • Interopérable ISO20022</div>
    </div>
  )
        }
