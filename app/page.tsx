'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default function Home(){
 const [rate,setRate]=useState(665.45)
 const [phone,setPhone]=useState('')
 const [piAmt,setPiAmt]=useState('')
 const [piUser,setPiUser]=useState<any>(null)
 const [txs,setTxs]=useState<any[]>([])
 const [showKYC,setShowKYC]=useState(false)
 const [kycStep,setKycStep]=useState(1)
 const [kycOk,setKycOk]=useState(false)
 const [kyc,setKyc]=useState({full_name:'',birth:'',addr:'',city:'',doc_type:'CNI',doc_num:'',doc_exp:''})

 const getSupabase=()=>{
  const u=process.env.NEXT_PUBLIC_SUPABASE_URL
  const k=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if(!u||!k) return null
  return createClient(u,k)
 }

 useEffect(()=>{
  const i=setInterval(()=>setRate(r=>+(r+(Math.random()-0.5)).toFixed(2)),3000)
  loadTxs()
  return()=>clearInterval(i)
 },[])

 const loadTxs=async()=>{
  const s=getSupabase(); if(!s) return
  const {data}=await s.from('transactions').select('*').order('created_at',{ascending:false}).limit(20)
  if(data) setTxs(data)
 }

 const authPi=async()=>{
  // @ts-ignore
  const Pi=window.Pi
  if(!Pi){alert('Ouvre ce site dans Pi Browser pour Connect Pi!');return}
  Pi.init({version:"2.0",sandbox:true})
  try{
   const a=await Pi.authenticate(['username','payments'],()=>{})
   setPiUser(a.user)
   const s=getSupabase()
   if(s) await s.from('users').upsert({pi_uid:a.user.uid,username:a.user.username})
   alert('Bienvenue '+a.user.username+'!')
  }catch(e:any){alert('Erreur Pi: '+e.message)}
 }

 const doSend=async()=>{
  if(!phone||!piAmt) return alert('Numéro + montant requis')
  const s=getSupabase()
  if(!s) return alert('Supabase non configuré')
  await s.from('transactions').insert({user_phone:phone,type:'envoye',amount_pi:parseFloat(piAmt),amount_xaf:parseFloat(piAmt)*rate,mode:piUser?'PI SDK':'DEMO',status:'ok'})
  alert('Envoi '+piAmt+' Pi vers '+phone+' OK!')
  setPhone(''); setPiAmt(''); loadTxs()
 }

 const saveKYC=async()=>{
  if(!kyc.full_name||!kyc.doc_num) return alert('Remplis nom + numéro doc')
  const s=getSupabase()
  if(!s) return
  await s.from('kyc').insert({phone:phone||'66 78 75 46',full_name:kyc.full_name,birth_date:kyc.birth||null,address:kyc.addr,city:kyc.city,doc_type:kyc.doc_type,doc_number:kyc.doc_num,doc_expiry:kyc.doc_exp||null,status:'pending'})
  setKycOk(true); setShowKYC(false); setKycStep(1)
  alert('KYC Complet envoyé! En cours de validation')
 }

 return(
  <div style={{background:'#0f172a',minHeight:'100vh',color:'white',padding:'12px',paddingBottom:'80px',fontFamily:'sans-serif'}}>
   <div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:'2px solid #facc15',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div><b style={{color:'#facc15'}}>GDB V9.2 COMPLET</b><br/><small style={{color:'#22c55e'}}>{rate} XAF LIVE</small></div>
    <button onClick={authPi} style={{background:piUser?'#22c55e':'#facc15',color:'black',border:'none',padding:'8px 12px',borderRadius:'8px',fontWeight:'bold',fontSize:'12px'}}>{piUser?piUser.username:'Connect Pi'}</button>
   </div>

   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
    <div style={{background:'#facc15',color:'black',padding:'12px',borderRadius:'12px'}}><small>Solde GCV</small><h2 style={{margin:'4px 0'}}>1,250 Pi</h2><small>{(1250*rate).toFixed(0)} XAF</small></div>
    <div style={{background:'#1e293b',padding:'12px',borderRadius:'12px',border:kycOk?'1px solid #22c55e':'1px solid #ef4444'}}><small>Statut KYC</small><h3 style={{margin:'4px 0',color:kycOk?'#22c55e':'#ef4444'}}>{kycOk?'✅ Validé':'❌ À faire'}</h3><button onClick={()=>setShowKYC(true)} style={{width:'100%',padding:'6px',background:kycOk?'#1e293b':'#ef4444',color:'white',border:'1px solid #334155',borderRadius:'6px',fontSize:'10px',marginTop:'4px'}}>{kycOk?'Voir':'Faire KYC Complet'}</button></div>
   </div>

   <div style={{background:'#1e293b',padding:'14px',borderRadius:'12px',marginTop:'12px',border:'1px solid #facc15'}}>
    <b style={{color:'#facc15'}}>Envoyer Pi → XAF</b>
    <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Numéro ex: 66 78 75 46" style={{width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white'}}/>
    <input value={piAmt} onChange={e=>setPiAmt(e.target.value)} type="number" placeholder="Montant Pi" style={{width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #facc15',color:'#facc15'}}/>
    <small style={{color:'#94a3b8'}}>Tu envoies ~ {(parseFloat(piAmt||'0')*rate).toFixed(0)} XAF</small>
    <button onClick={doSend} style={{width:'100%',marginTop:'10px',padding:'14px',background:'#facc15',border:'none',borderRadius:'10px',fontWeight:'bold',color:'black'}}>Envoyer {piAmt||'0'} Pi</button>
   </div>

   <div style={{marginTop:'14px'}}><b>Historique Supabase ({txs.length})</b><div style={{display:'grid',gap:'6px',marginTop:'8px'}}>{txs.map((t,i)=><div key={i} style={{background:'#1e293b',padding:'10px',borderRadius:'8px',border:'1px solid #334155',display:'flex',justifyContent:'space-between'}}><div><b>{t.type} {t.amount_pi} Pi</b><br/><small style={{color:'#94a3b8'}}>{t.user_phone} • {new Date(t.created_at).toLocaleTimeString()}</small></div><div style={{textAlign:'right'}}><small style={{color:'#22c55e'}}>{t.mode}</small><br/><small style={{color:'#facc15'}}>{t.amount_xaf} XAF</small></div></div>)}{txs.length==0&&<small style={{color:'#64748b'}}>Aucune transaction - fais un envoi test!</small>}</div></div>

   {showKYC&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.92)',zIndex:99,overflowY:'auto',padding:'12px'}}><div style={{background:'#1e293b',borderRadius:'16px',padding:'16px',border:'2px solid #facc15',maxWidth:'380px',margin:'20px auto'}}>
    <div style={{display:'flex',justifyContent:'space-between'}}><b style={{color:'#facc15'}}>KYC Complet - Étape {kycStep}/3</b><button onClick={()=>setShowKYC(false)} style={{background:'transparent',color:'white',border:'none',fontSize:'18px'}}>✕</button></div>
    <div style={{display:'flex',gap:'4px',margin:'10px 0'}}><div style={{flex:1,height:'4px',background:kycStep>=1?'#facc15':'#334155',borderRadius:'2px'}}/><div style={{flex:1,height:'4px',background:kycStep>=2?'#facc15':'#334155',borderRadius:'2px'}}/><div style={{flex:1,height:'4px',background:kycStep>=3?'#facc15':'#334155',borderRadius:'2px'}}/></div>
    
    {kycStep==1&&<div><b>Infos Personnelles</b>
     <input value={kyc.full_name} onChange={e=>setKyc({...kyc,full_name:e.target.value})} placeholder="Nom complet *" style={inp}/><input value={kyc.birth} onChange={e=>setKyc({...kyc,birth:e.target.value})} type="date" style={inp}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Téléphone" style={inp}/><input value={kyc.addr} onChange={e=>setKyc({...kyc,addr:e.target.value})} placeholder="Adresse" style={inp}/><input value={kyc.city} onChange={e=>setKyc({...kyc,city:e.target.value})} placeholder="Ville" style={inp}/>
     <button onClick={()=>setKycStep(2)} style={btnY}>Suivant →</button></div>}

    {kycStep==2&&<div><b>Document d'identité</b>
     <select value={kyc.doc_type} onChange={e=>setKyc({...kyc,doc_type:e.target.value})} style={inp}><option>CNI</option><option>Passeport</option><option>Carte Électeur</option></select><input value={kyc.doc_num} onChange={e=>setKyc({...kyc,doc_num:e.target.value})} placeholder="Numéro document *" style={inp}/><input value={kyc.doc_exp} onChange={e=>setKyc({...kyc,doc_exp:e.target.value})} type="date" placeholder="Expiration" style={inp}/>
     <div style={{display:'flex',gap:'8px'}}><button onClick={()=>setKycStep(1)} style={btnG}>← Retour</button><button onClick={()=>setKycStep(3)} style={btnY}>Suivant →</button></div></div>}

    {kycStep==3&&<div><b>Validation</b><div style={{background:'#0f172a',padding:'12px',borderRadius:'8px',marginTop:'8px',fontSize:'12px',color:'#cbd5e1'}}><div>Nom: {kyc.full_name}</div><div>Tél: {phone}</div><div>Doc: {kyc.doc_type} - {kyc.doc_num}</div><div>Ville: {kyc.city}</div></div><div style={{display:'flex',gap:'8px',marginTop:'12px'}}><button onClick={()=>setKycStep(2)} style={btnG}>← Retour</button><button onClick={saveKYC} style={{...btnY,background:'#22c55e'}}>Valider KYC ✅</button></div></div>}
   </div></div>}
  </div>
 )
}
const inp={width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',background:'#0f172a',border:'1px solid #334155',color:'white',boxSizing:'border-box' as any}
const btnY={width:'100%',marginTop:'12px',padding:'12px',background:'#facc15',color:'black',border:'none',borderRadius:'8px',fontWeight:'bold'} as any
const btnG={flex:1,padding:'12px',background:'#0f172a',color:'white',border:'1px solid #334155',borderRadius:'8px'} as any
