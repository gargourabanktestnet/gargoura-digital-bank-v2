'use client'
import {getT, Lang} from '../lib/lang'

export default function SoldeGCV({lang}:{lang:Lang}){
  const t = getT(lang)
  const gcv = "314 159,00"
  return(
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      {/* Carte Solde Total GCV */}
      <div style={{background:'#1e40af',borderRadius:24,padding:20,color:'#fff',boxShadow:'0 10px 30px rgba(0,0,0,0.2)',border:'2px solid #facc15'}}>
        <div style={{fontSize:14,opacity:0.9,marginBottom:12}}>Solde Total</div>
        
        <div style={{fontSize:38,fontWeight:900,lineHeight:1.1,letterSpacing:-1}}>
          1 π = {gcv} USD
        </div>
        
        <div style={{fontSize:13,opacity:0.85,marginTop:8,lineHeight:1.4}}>
          Taux de référence indicatif pour l'affichage des opérations.
        </div>

        <div style={{marginTop:14}}>
          <a href="tel:+23592825262" style={{display:'inline-flex',alignItems:'center',gap:6,background:'#15803d',color:'#fff',padding:'6px 14px',borderRadius:20,fontSize:13,fontWeight:800,textDecoration:'none'}}>
            📞 +235 92 82 52 62
          </a>
        </div>

        <div style={{background:'rgba(255,255,255,0.15)',borderRadius:12,padding:'10px 12px',marginTop:14,fontSize:12}}>
          <b>Frais de transaction :</b> calculés à la confirmation, en π
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
          <button style={{background:'#16a34a',border:'none',borderRadius:24,padding:'14px',color:'#fff',fontWeight:900,display:'flex',justifyContent:'center',gap:6}}>↗ Envoyer</button>
          <button style={{background:'#16a34a',border:'none',borderRadius:24,padding:'14px',color:'#fff',fontWeight:900,display:'flex',justifyContent:'center',gap:6}}>↙ Recevoir</button>
        </div>
      </div>

      {/* Système en ligne */}
      <div style={{background:'#f0fdf4',border:'1.5px solid #bbf7d0',borderRadius:16,padding:14,display:'flex',gap:12,alignItems:'center'}}>
        <div style={{color:'#16a34a',fontSize:24}}>〰️</div>
        <div>
          <div style={{fontWeight:800,fontSize:15,color:'#0f172a'}}>Système en Ligne</div>
          <div style={{fontSize:12,color:'#475569'}}>Toutes les transactions sont traitées en temps réel</div>
        </div>
      </div>
    </div>
  )
      }
