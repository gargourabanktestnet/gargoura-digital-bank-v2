'use client'

// COMPOSANT 1 - TON DESIGN PREFERE BLEU
function SoldeGCV(){
  return(
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{background:'#1e40af',border:'2px solid #facc15',borderRadius:18,padding:16,color:'#fff'}}>
        <div style={{opacity:0.9,fontSize:14}}>Solde Total</div>
        <div style={{fontWeight:900,fontSize:32,lineHeight:1.1,marginTop:4}}>1 π = 314 159,00<br/>USD</div>
        <div style={{opacity:0.8,fontSize:13,marginTop:8}}>Taux de référence indicatif pour l'affichage des opérations.</div>
        <div style={{background:'#15803d',display:'inline-flex',padding:'8px 14px',borderRadius:20,marginTop:14,fontWeight:700,fontSize:14}}>📞 +235 92 82 52 62</div>
        <div style={{background:'#dbeafe',color:'#1e3a8a',borderRadius:10,padding:10,marginTop:12,fontSize:12}}><b>Frais :</b> calculés à la confirmation, en π</div>
        <div style={{display:'flex',gap:10,marginTop:14}}>
          <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>↗ Envoyer</button>
          <button style={{flex:1,background:'#16a34a',color:'#fff',border:'none',borderRadius:20,padding:12,fontWeight:800}}>✓ Recevoir</button>
        </div>
      </div>
      <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:12,display:'flex',gap:10}}>
        <div>〰️</div><div><div style={{fontWeight:800,fontSize:14}}>Système en Ligne</div><div style={{fontSize:12,color:'#64748b'}}>Transactions temps réel</div></div>
      </div>
      <div style={{background:'#000',border:'1px solid #facc15',borderRadius:12,padding:10}}>
        <div style={{color:'#facc15',fontWeight:900,fontSize:11}}>VALEUR GCV COMMUNAUTAIRE</div>
        <div style={{color:'#fff',fontSize:11,marginTop:2}}>1 π = 314 159 USD • Tous calculs basés sur GCV</div>
      </div>
    </div>
  )
}

// COMPOSANT 2 - APERCU COMPTE
function ApercuCompte(){
  return(
    <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
      <div style={{fontWeight:900,fontSize:16}}>Aperçu du Compte</div>
      <div style={{color:'#64748b',fontSize:12}}>GDB-2026-370246 • Tchad</div>
      <div style={{display:'flex',gap:12,marginTop:14}}>
        <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10}}>QR CODE</div>
        <div style={{flex:1}}>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}><div style={{fontSize:10,color:'#64748b'}}>TITULAIRE</div><div style={{fontWeight:800}}>Gargoura Saleh</div></div>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8}}><div style={{fontSize:10,color:'#64748b'}}>STATUT</div><div style={{fontWeight:800,color:'#16a34a'}}>● Vérifié GCV</div></div>
        </div>
      </div>
    </div>
  )
}

export default function Page(){
  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:16,fontFamily:'system-ui'}}>
      <SoldeGCV />
      <ApercuCompte />
    </div>
  )
}
