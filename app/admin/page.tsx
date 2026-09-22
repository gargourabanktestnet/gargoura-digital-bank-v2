export default function Admin(){
 const clients = [
  {name:'Ahmed N.', phone:'+235 66...', solde:'500 π', pays:'Tchad 🇹🇩'},
  {name:'Fatima Z.', phone:'+221 77...', solde:'1200 π', pays:'Sénégal 🇸🇳'},
  {name:'Abdullah J.', phone:'+962 79...', solde:'300 π', pays:'Jordanie 🇯🇴'},
 ]
 return(
  <div style={{background:'#0f172a', minHeight:'100vh', color:'white', padding:'16px'}}>
   <h2 style={{color:'#facc15', textAlign:'center'}}>GARGOURA ADMIN PANEL 🔐</h2>
   <p style={{textAlign:'center', color:'#94a3b8'}}>Total clients: {clients.length} • Volume: 2,000 π</p>
   <div style={{marginTop:'15px'}}>
    {clients.map((c,i)=><div key={i} style={{background:'#1e293b', padding:'12px', borderRadius:'8px', marginBottom:'8px', display:'flex', justifyContent:'space-between'}}><div><b>{c.name}</b><br/><small style={{color:'#94a3b8'}}>{c.phone} • {c.pays}</small></div><b style={{color:'#facc15'}}>{c.solde}</b></div>)}
   </div>
   <div style={{background:'#1e293b', padding:'12px', borderRadius:'10px', marginTop:'15px'}}><h4 style={{color:'#facc15'}}>Transactions en attente</h4><p>3 retraits XAF à valider: 50,000 XAF, 25,000 XAF, 100,000 XAF</p><button style={{background:'#22c55e', border:'none', padding:'10px', borderRadius:'8px', width:'100%', fontWeight:'bold'}}>VALIDER TOUT</button></div>
   <a href="/" style={{display:'block', marginTop:'20px', textAlign:'center', color:'#facc15'}}>← Accueil Banque</a>
  </div>
 )
    }
