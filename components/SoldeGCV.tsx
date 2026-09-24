'use client'
export default function SoldeGCV({lang}:any){
  return(
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {/* CARTE BLEUE GCV */}
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{opacity:0.9,fontSize:14,marginBottom:6}}>Solde Total</div>
        <div style={{fontWeight:900,fontSize:32,lineHeight:1.1}}>1 π = 314 159,00<br/>USD</div>
        <div style={{opacity:0.8,fontSize:13,marginTop:8}}>Taux de référence indicatif pour l'affichage des opérations.</div>
        
        <div style={{background:'#15803d',display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:20,marginTop:14,fontWeight:700,fontSize:14}}>
          📞 +235 92 82 52 62
        </div>

        <div style={{background:'#dbeafe',color:'#1e3a8a',borderRadius:10,padding:10,marginTop:12,fontSize:12}}>
          <b>Frais de transaction :</b> calculés à la confirmation, en π
        </div>

        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:'12px 0',fontWeight:800}}>↗ Envoyer</button>
          <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:'12px 0',fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>

      {/* SYSTEME EN LIGNE */}
      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,display:'flex',gap:10,alignItems:'center'}}>
        <div style={{fontSize:22}}>〰️</div>
        <div><div style={{fontWeight:800,fontSize:14,color:'#0f172a'}}>Système en Ligne</div><div style={{fontSize:12,color:'#64748b'}}>Toutes les transactions sont traitées en temps réel</div></div>
      </div>

      {/* VALEUR GCV */}
      <div style={{background:'#000',border:'1px solid #facc15',borderRadius:12,padding:10}}>
        <div style={{color:'#facc15',fontWeight:900,fontSize:11}}>VALEUR GCV COMMUNAUTAIRE</div>
        <div style={{color:'#fff',fontSize:11,marginTop:2}}>1 π = 314 159 USD = Référence Pi Network • Tous calculs basés sur GCV</div>
      </div>
    </div>
  )
      }
