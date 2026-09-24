'use client'
import SoldeGCV from '../components/SoldeGCV'
import ApercuCompte from '../components/ApercuCompte'

export default function Page(){
  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',fontFamily:'system-ui'}}>
      <div style={{background:'#0f172a',padding:12,borderBottom:'3px solid #facc15',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:'#facc15',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>π</div>
        <div style={{color:'#fff',fontWeight:900,fontSize:14}}>Gargoura Digital Bank • GCV 314 159$</div>
      </div>

      <div style={{padding:14,display:'flex',flexDirection:'column',gap:18}}>
        <SoldeGCV lang='fr' />
        <ApercuCompte lang='fr' />
      </div>
    </div>
  )
}
