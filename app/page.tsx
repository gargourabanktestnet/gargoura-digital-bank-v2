'use client'
import {useState,useEffect} from 'react'
export const dynamic='force-dynamic'
export default function Home(){
 const [rate,setRate]=useState(665)
 useEffect(()=>{const i=setInterval(()=>setRate(r=>+(r+(Math.random()-0.5)).toFixed(2)),3000);return()=>clearInterval(i)},[])
 return(<div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'12px'}}><div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:'2px solid #facc15'}}><b style={{color:'#facc15'}}>GDB V9.1 - BUILD OK</b><br/><small style={{color:'#22c55e'}}>Taux LIVE {rate} XAF = VERT!</small></div><div style={{marginTop:'12px',background:'#1e293b',padding:'14px',borderRadius:'12px'}}><b>Test build réussi!</b><p style={{color:'#94a3b8',fontSize:'12px'}}>Maintenant ajoute les clés Supabase dans Vercel Settings comme ci-dessus, puis remets le code V9.1 complet.</p><button onClick={()=>alert('VERT!')} style={{width:'100%',padding:'14px',background:'#22c55e',border:'none',borderRadius:'10px',fontWeight:'bold'}}>BOUTON TEST VERT</button></div></div>)
}
