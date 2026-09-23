'use client'
import {useState,useEffect} from 'react'
export const dynamic='force-dynamic'
export default function Home(){
 const [r,setR]=useState(665)
 useEffect(()=>{const i=setInterval(()=>setR(x=>+(x+(Math.random()-0.5)).toFixed(2)),3000);return()=>clearInterval(i)},[])
 return(<div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'16px'}}><div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:'2px solid #facc15'}}><b style={{color:'#facc15'}}>TEST BUILD VERT</b><br/><small style={{color:'#22c55e'}}>Si tu vois ça, Vercel est OK: {r}</small></div><button onClick={()=>alert('VERT!')} style={{width:'100%',marginTop:'12px',padding:'14px',background:'#22c55e',border:'none',borderRadius:'10px',fontWeight:'bold'}}>Test</button></div>)
  }
