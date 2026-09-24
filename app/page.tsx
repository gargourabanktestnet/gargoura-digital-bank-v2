'use client'
import SoldeGCV from '../components/SoldeGCV'
import ApercuCompte from '../components/ApercuCompte'

export default function Page(){
  return(
    <div style={{minHeight:'100vh',background:'#f1f5f9',padding:14,display:'flex',flexDirection:'column',gap:16}}>
      <SoldeGCV lang='fr' />
      <ApercuCompte />
      <div style={{textAlign:'center',fontSize:11,color:'#64748b',padding:10}}>
        2 composants VERT - GCV 314159$
      </div>
    </div>
  )
}
