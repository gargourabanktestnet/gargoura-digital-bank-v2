'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home(){
 const [liveRate,setLiveRate]=useState(665.45)
 const [kycOk,setKycOk]=useState(false)
 const [showKYC,setShowKYC]=useState(false)
 const [phone,setPhone]=useState('')
 const [piAmt,setPiAmt]=useState('')
 const [piUser,setPiUser]=useState<any>(null)
 const [txs,setTxs]=useState<any[]>([])

 useEffect(()=>{
  const i=setInterval(()=>setLiveRate(r=>+(r+(Math.random()-0.5)).toFixed(2)),3000)
  return()=>clearInterval(i)
 },[])

 useEffect(()=>{loadTxs()},[])
 const loadTxs=async()=>{
  const {data}=await supabase.from('transactions').select('*').order('created_at',{ascending:false}).limit(10)
  if(data) setTxs(data)
 }

 const authPi=async()=>{
  // @ts-ignore
  const Pi=window.Pi
  if(!Pi){alert('Ouvre ce site dans Pi Browser pour connecter Pi!');return}
  Pi.init({version:"2.0", sandbox:true})
  try{
   const auth=await Pi.authenticate(['username','payments'],(p:any)=>{})
   setPiUser(auth.user)
   alert('Bienvenue '+auth.user.username+'!')
   await supabase.from('users').upsert({pi_uid:auth.user.uid, username:auth.user.username})
  }catch(e:any){alert('Erreur Pi:'+e.message)}
 }

 const doSend=async()=>{
  if(!phone||!piAmt) return alert('Remplis numero et montant')
  // @ts-ignore
  const Pi=window.Pi
  if(Pi && piUser){
   // Paiement réel Pi SDK
   Pi.createPayment({amount:parseFloat(piAmt), memo:'GDB vers '+phone, metadata:{phone}},{
    onReadyForServerApproval:(id:string)=>{console.log(id)},
    onReadyForServerCompletion:async(id:string,tx:any)=>{
     await supabase.from('transactions').insert({user_phone:phone, type:'envoye', amount_pi:parseFloat(piAmt), amount_xaf:parseFloat(piAmt)*liveRate, mode:'PI SDK', status:'ok'})
     alert('Paiement Pi OK! '+id)
     loadTxs()
    },
    onCancel:()=>alert('Annulé'),
    onError:(e:any)=>alert('Erreur '+e)
   })
  }else{
   // Mode demo + Supabase
   await supabase.from('transactions').insert({user_phone:phone, type:'envoye', amount_pi:parseFloat(piAmt), amount_xaf:parseFloat(piAmt)*liveRate, mode:'DEMO', status:'ok'})
   alert('Envoi '+piAmt+' Pi vers '+phone+' enregistré dans Supabase!')
   setPhone('');setPiAmt('');loadTxs()
  }
 }

 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'12px',paddingBottom:'80px'}}>
   <div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:'2px solid #facc15',display:'flex',justifyContent:'space-between'}}>
    <b style={{color:'#facc15'}}>GDB V9 SUPABASE+PI</b>
    <button onClick={authPi} style={{background:piUser?'#22c55e':'#facc15',color:'black',border:'none',padding:'6px 10px',borderRadius:'8px',fontWeight:'bold',fontSize:'11px'}}>{piUser?piUser.username:'Connect Pi'}</button>
   </div>

   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
    <div style={{background:'#facc15',color:'black',padding:'12px',borderRadius:'12px'}}><small>Solde Pi GCV</small><h2>1,250 pi</h2><small>GCV $392M</small></div>
    <div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:'1px solid #22c55e'}}><small>XAF LIVE</small><h2>{(1250*liveRate).toFixed(0)}</h2><small style={{color:'#22c55e'}}>{liveRate} LIVE</small></div>
   </div>

   <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',marginTop:'12px',border:'1px solid #facc15'}}>
    <b style={{color:'#facc15'}}>Envoyer Pi (V9 Réel)</b>
    <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Numero 66..." style={{width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/>
    <input value={piAmt} onChange={e=>setPiAmt(e.target.value)} type="number" placeholder="Montant Pi" style={{width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15'}}/>
    <button onClick={doSend} style={{width:'100%',marginTop:'10px',padding:'14px',background:'#facc15',border:'none',borderRadius:'10px',fontWeight:'bold',color:'black'}}>{piUser?'Payer avec Pi SDK':'Envoyer (Demo Supabase)'}</button>
    {!kycOk&&<button onClick={()=>setShowKYC(true)} style={{width:'100%',marginTop:'8px',padding:'10px',background:'#ef4444',border:'none',borderRadius:'8px',color:'white'}}>Faire KYC</button>}
   </div>

   <div style={{marginTop:'12px'}}><b>Historique Supabase Réel</b><div style={{display:'grid',gap:'6px',marginTop:'8px'}}>{txs.map((t,i)=><div key={i} style={{background:'#1e293b',padding:'10px',borderRadius:'8px',border:'1px solid #334155'}}><b>{t.type} {t.amount_pi} pi</b> <small style={{color:'#22c55e'}}>{t.mode}</small><br/><small style={{color:'#94a3b8'}}>{t.user_phone} - {t.amount_xaf} XAF</small></div>)}{txs.length==0&&<small style={{color:'#64748b'}}>Aucune transaction - fais ton 1er envoi!</small>}</div></div>

   {showKYC&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:'14px'}}><div style={{background:'#1e293b',padding:'16px',borderRadius:'12px',border:'2px solid #facc15',width:'100%',maxWidth:'320px'}}><h3 style={{color:'#facc15',margin:0}}>KYC V9</h3><input placeholder="Nom complet" id="nom" style={{width:'100%',padding:'10px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><input placeholder="Carte Nationale" id="carte" style={{width:'100%',padding:'10px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/><div style={{display:'flex',gap:'8px',marginTop:'10px'}}><button onClick={()=>setShowKYC(false)} style={{flex:1,padding:'10px',background:'#0f172a',color:'white',border:'1px solid #334155',borderRadius:'8px'}}>Annuler</button><button onClick={async()=>{const nom=(document.getElementById('nom') as HTMLInputElement).value;const carte=(document.getElementById('carte') as HTMLInputElement).value;await supabase.from('kyc').insert({phone:phone||'66 78 75 46', nom, carte, status:'pending'});setKycOk(true);setShowKYC(false);alert('KYC envoyé dans Supabase!')}} style={{flex:1,padding:'10px',background:'#22c55e',border:'none',borderRadius:'8px',fontWeight:'bold'}}>Valider KYC</button></div></div></div>}
  </div>
 )
   }
