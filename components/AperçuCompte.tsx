'use client'
export default function ApercuCompte({lang}:any){
  return(
    <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:14}}>
      <div style={{fontWeight:900,fontSize:16,color:'#0f172a'}}>Aperçu du Compte</div>
      <div style={{color:'#64748b',fontSize:12,marginTop:2}}>GDB-2026-370246 • Tchad</div>

      <div style={{display:'flex',gap:12,marginTop:14,alignItems:'center'}}>
        <div style={{width:80,height:80,background:'#f1f5f9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10}}>QR CODE</div>
        <div style={{flex:1}}>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8,marginBottom:8}}>
            <div style={{fontSize:10,color:'#64748b'}}>TITULAIRE</div>
            <div style={{fontWeight:800,fontSize:13}}>Gargoura Saleh</div>
          </div>
          <div style={{background:'#f8fafc',borderRadius:10,padding:8}}>
            <div style={{fontSize:10,color:'#64748b'}}>STATUT</div>
            <div style={{fontWeight:800,fontSize:13,color:'#16a34a'}}>● Vérifié GCV</div>
          </div>
        </div>
      </div>

      <div style={{marginTop:14,display:'flex',gap:8}}>
        <div style={{flex:1,background:'#eef2ff',borderRadius:10,padding:10,textAlign:'center'}}>
          <div style={{fontSize:11,color:'#64748b'}}>Total Transac.</div>
          <div style={{fontWeight:900}}>1 247</div>
        </div>
        <div style={{flex:1,background:'#fefce8',borderRadius:10,padding:10,textAlign:'center'}}>
          <div style={{fontSize:11,color:'#64748b'}}>GCV</div>
          <div style={{fontWeight:900}}>314 159 $</div>
        </div>
      </div>
    </div>
  )
}
