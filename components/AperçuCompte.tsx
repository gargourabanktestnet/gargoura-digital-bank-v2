'use client'
import {useState} from 'react'
import {Lang, getT} from '../lib/lang'

export default function ApercuCompte({lang}:{lang:Lang}){
  const [showQR,setShowQR]=useState(false)
  const account = "GDB-2026-370246"
  const phone = "+235 92 82 52 62"

  return(
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      {/* Aperçu du Compte */}
      <div style={{background:'#fff',borderRadius:20,padding:18,border:'1px solid #e2e8f0',boxShadow:'0 4px 12px rgba(0,0,0,0.04)'}}>
        <div style={{fontWeight:900,fontSize:17,marginBottom:16,color:'#0f172a'}}>Aperçu du Compte</div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'#eff6ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>💳</div>
            <div><div style={{fontWeight:700,fontSize:14}}>Numéro de Compte Bancaire</div><div style={{fontSize:13,color:'#64748b'}}>{account}</div></div>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid #e2e8f0'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'#f0fdf4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🔳</div>
            <div><div style={{fontWeight:700,fontSize:14}}>Voir QR</div><div style={{fontWeight:700,fontSize:14}}>Code</div><div style={{fontSize:12,color:'#64748b'}}>Recevoir</div></div>
          </div>
          <button onClick={()=>setShowQR(!showQR)} style={{border:'none',background:'transparent',fontWeight:800,fontSize:14,color:'#0f172a'}}>{showQR?'Masquer':'Afficher le Code QR'}</button>
        </div>

        {showQR && (
          <div style={{textAlign:'center',padding:16,background:'#f8fafc',borderRadius:12,margin:'8px 0'}}>
            <div style={{width:140,height:140,background:'#fff',margin:'0 auto',border:'2px solid #0f172a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10}}>QR: {account}<br/>{phone}</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:8}}>Scannez pour recevoir des paiements π</div>
          </div>
        )}

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'#f0fdf4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>📞</div>
            <div><div style={{fontWeight:700,fontSize:14}}>Numéro de Téléphone</div><div style={{fontSize:13,color:'#64748b'}}>{phone}</div></div>
          </div>
        </div>
      </div>

      {/* Fonctionnalités Courantes */}
      <div style={{background:'#fff',borderRadius:20,padding:18,border:'1px solid #e2e8f0'}}>
        <div style={{fontWeight:900,fontSize:17,marginBottom:16,color:'#0f172a'}}>Fonctionnalités Courantes</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10}}>
          {[
            {i:'⇄',l:'Transférer',c:'#dbeafe'},
            {i:'💳',l:'Virement Bancaire',c:'#dbeafe'},
            {i:'📈',l:'Pi DEX',c:'#fce7f3'},
            {i:'🔄',l:'Convertir',c:'#dcfce7'},
            {i:'📊',l:'Trading',c:'#dcfce7'},
            {i:'✨',l:'Pi Automation',c:'#f3e8ff'},
            {i:'🔗',l:'Blockchain',c:'#dbeafe'},
            {i:'🛍️',l:'Shopping',c:'#fce7f3'},
          ].map(f=>(
            <div key={f.l} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:10,textAlign:'center'}}>
              <div style={{width:36,height:36,margin:'0 auto',background:f.c,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>{f.i}</div>
              <div style={{fontSize:10,fontWeight:700,marginTop:6,lineHeight:1.1}}>{f.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
                 }
