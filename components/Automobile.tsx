// @ts-nocheck
'use client'
import {useState} from 'react'
export default function Automobile({gdb}){
  const [marque,setMarque]=useState('Toutes')
  const [type,setType]=useState('Tous')
  const [cart,setCart]=useState([])
  const [zone,setZone]=useState('CEMAC')

  const marques=[
    {n:'Toutes',url:'',color:'#334155'},
    {n:'Toyota',url:'https://www.toyota.com',color:'#eb0a1e'},
    {n:'Mercedes',url:'https://www.mercedes-benz.com',color:'#000'},
    {n:'BMW',url:'https://www.bmw.com',color:'#0066b1'},
    {n:'Hyundai',url:'https://www.hyundai.com',color:'#002c5f'},
    {n:'Kia',url:'https://www.kia.com',color:'#05141f'},
    {n:'Ford',url:'https://www.ford.com',color:'#003478'},
    {n:'Nissan',url:'https://www.nissan-global.com',color:'#c3002f'},
    {n:'Peugeot',url:'https://www.peugeot.com',color:'#000'},
    {n:'LandCruiser',url:'https://www.toyota.com/landcruiser',color:'#8B4513'},
  ]

  const concessionnaires={
    'CEMAC':[
      {nom:'CFAO Motors Tchad',ville:"N'Djamena",tel:'+235 22 51 21 21',marques:'Toyota, Suzuki'},
      {nom:'Tractafric Tchad',ville:'N’Djamena',tel:'+235 22 52 33 00',marques:'Mercedes, Fuso'},
      {nom:'CFAO Cameroun',ville:'Douala',tel:'+237 233 40 00 00',marques:'Toyota, Mitsubishi'},
      {nom:'Sodiam Gabon',ville:'Libreville',tel:'+241 01 76 00 00',marques:'Toyota'},
    ],
    'UEMOA':[
      {nom:'CFAO Motors Sénégal',ville:'Dakar',tel:'+221 33 849 22 22',marques:'Toyota, Peugeot'},
      {nom:'Tractafric Côte d’Ivoire',ville:'Abidjan',tel:'+225 21 15 00',marques:'Mercedes, Mitsubishi'},
      {nom:'CFAO Burkina',ville:'Ouagadougou',tel:'+226 25 49 19 19',marques:'Toyota'},
    ],
    'Golfe':[
      {nom:'Al Futtaim Toyota UAE',ville:'Dubai',tel:'+971 800 869 682',marques:'Toyota, Lexus'},
      {nom:'Gargash Mercedes',ville:'Dubai',tel:'+971 4 340 0200',marques:'Mercedes-Benz'},
      {nom:'Al Jazirah Ford',ville:'Riyad',tel:'+966 11 240 6000',marques:'Ford, Lincoln'},
    ],
    'International':[
      {nom:'Toyota Global Dealer',ville:'Worldwide',tel:'Online',marques:'Toutes Toyota'},
      {nom:'Mercedes Me Store',ville:'Online',tel:'Online',marques:'Toutes Mercedes'},
    ]
  }

  const vehicles=[
    {id:1,n:'Toyota Corolla 2024 LE',p:0.07,orig:'$21,500',marque:'Toyota',type:'Voiture Neuve',img:'🚙',zone:'CEMAC',url:'https://www.toyota.com/corolla'},
    {id:2,n:'Toyota Land Cruiser 300 VXR',p:0.28,orig:'$88,000',marque:'LandCruiser',type:'Voiture Neuve',img:'🚙',zone:'Golfe',url:'https://www.toyota.com/landcruiser'},
    {id:3,n:'Mercedes GLE 350 4MATIC',p:0.20,orig:'$62,000',marque:'Mercedes',type:'Voiture Neuve',img:'🚙',zone:'Golfe',url:'https://www.mercedes-benz.com/en/vehicles/gle'},
    {id:4,n:'BMW X5 xDrive40i 2024',p:0.21,orig:'$66,000',marque:'BMW',type:'Voiture Neuve',img:'🚙',zone:'International',url:'https://www.bmw.com/en/bmw-models/x5.html'},
    {id:5,n:'Hyundai Tucson 2024',p:0.09,orig:'$28,000',marque:'Hyundai',type:'Voiture Neuve',img:'🚗',zone:'UEMOA',url:'https://www.hyundai.com/worldwide/en/suv/tucson'},
    {id:6,n:'Toyota Hilux 4x4 Double Cab',p:0.11,orig:'$34,000',marque:'Toyota',type:'Pick-up',img:'🛻',zone:'CEMAC',url:'https://www.toyota.com/hilux'},
    {id:7,n:'Moteur Toyota 2.8L Diesel',p:0.015,orig:'$4,700',marque:'Toyota',type:'Pièces Détachées',img:'🔧',zone:'CEMAC',url:'https://parts.toyota.com'},
    {id:8,n:'Freins Mercedes AMG Kit',p:0.008,orig:'$2,500',marque:'Mercedes',type:'Pièces Détachées',img:'🛞',zone:'Golfe',url:'https://www.mercedes-benz.com/en/service/parts/'},
    {id:9,n:'Pneus Michelin 265/65 R17 x4',p:0.003,orig:'$900',marque:'Toyota',type:'Pièces Détachées',img:'🛞',zone:'CEMAC',url:'https://www.michelin.com'},
    {id:10,n:'Toyota Yaris Occasion 2020',p:0.04,orig:'$12,500',marque:'Toyota',type:'Occasion',img:'🚗',zone:'UEMOA',url:'https://www.toyota.com/used-vehicles'},
    {id:11,n:'Kia Sportage 2024',p:0.085,orig:'$27,000',marque:'Kia',type:'Voiture Neuve',img:'🚙',zone:'UEMOA',url:'https://www.kia.com/us/en/sportage'},
    {id:12,n:'Ford Ranger Raptor',p:0.14,orig:'$44,000',marque:'Ford',type:'Pick-up',img:'🛻',zone:'Golfe',url:'https://www.ford.com/trucks/ranger/'},
  ]

  var filtered=vehicles.filter(function(v){return (marque==='Toutes'||v.marque===marque)&&(type==='Tous'||v.type===type)})
  var totalPi=cart.reduce(function(s,it){return s+it.p},0)
  var totalUsd=totalPi*314159

  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>🚗 Automobile • PI • {gdb?.slice(0,8)}</div>
        <div style={{display:'flex',gap:6}}><div style={{fontSize:10,background:'#1e40af',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>🛒 {cart.length}</div><div style={{fontSize:10,fontWeight:700,background:'#facc15',padding:'4px 8px',borderRadius:12}}>{totalPi.toFixed(4)} PI</div></div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>PI monnaie référence 1 PI = 314,159 USD • Voitures & Pièces • GDB {gdb}</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:10,marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><div style={{fontSize:11,color:'#93c5fd'}}>Panier Auto Global PI</div><div style={{fontWeight:900,fontSize:15,marginTop:2}}>{totalPi.toFixed(4)} PI = ${totalUsd.toFixed(0)} USD ref</div><div style={{fontSize:10,marginTop:2,color:'#86efac'}}>GDB {gdb?.slice(0,10)} • Livraison CEMAC/UEMOA/Golfe • Concessionnaire agréé</div></div>
        <button onClick={function(){if(cart.length===0) alert('Panier auto vide - GDB '+gdb); else alert('Commande Automobile '+totalPi.toFixed(4)+' PI ('+totalUsd.toFixed(0)+' USD) de '+gdb+' - Livraison '+zone+' - Concessionnaire')}} style={{background:'#16a34a',color:'#fff',border:'none',borderRadius:10,padding:'10px 12px',fontWeight:800,fontSize:11}}>Payer {totalPi.toFixed(3)} PI</button>
      </div>

      <div style={{fontWeight:800,fontSize:12,marginTop:12}}>🏭 Sites Officiels Constructeurs • 10 Marques</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6,marginTop:8}}>
        {marques.filter(function(m){return m.n!=='Toutes'}).map(function(mm){
          return(
            <div key={mm.n} style={{border:marque===mm.n?'2px solid '+mm.color:'1px solid #e2e8f0',borderRadius:10,padding:7,display:'flex',justifyContent:'space-between',alignItems:'center',background:marque===mm.n?'#eff6ff':'#fff'}}>
              <div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{width:8,height:8,background:mm.color,borderRadius:8}}></div><div style={{fontWeight:800,fontSize:10}}>{mm.n}</div></div>
              <div style={{display:'flex',gap:4}}><button onClick={function(){setMarque(mm.n)}} style={{border:'none',background:marque===mm.n?mm.color:'#f1f5f9',color:marque===mm.n?'#fff':'#334155',borderRadius:6,padding:'3px 6px',fontSize:8,fontWeight:700}}>Filtrer</button><a href={mm.url} target="_blank" rel="noopener noreferrer" style={{background:'#1e40af',color:'#fff',borderRadius:6,padding:'3px 6px',fontSize:8,fontWeight:800,textDecoration:'none'}}>🌐 Officiel</a></div>
            </div>
          )
        })}
      </div>

      <div style={{fontWeight:800,fontSize:12,marginTop:12}}>🏢 Concessionnaires Agréés • Légal</div>
      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:6,paddingBottom:4}}>
        {Object.keys(concessionnaires).map(function(z){return (<button key={z} onClick={function(){setZone(z)}} style={{whiteSpace:'nowrap',padding:'6px 10px',borderRadius:20,border:zone===z?'2px solid #16a34a':'1px solid #e2e8f0',background:zone===z?'#dcfce7':'#fff',fontSize:10,fontWeight:zone===z?'800':'500'}}>{z}</button>)})}
      </div>
      <div style={{marginTop:8,display:'grid',gap:6}}>
        {(concessionnaires[zone]||[]).map(function(con){return (<div key={con.nom} style={{border:'1px solid #16a34a',borderRadius:10,padding:8,display:'flex',justifyContent:'space-between',alignItems:'center',background:'#f0fdf4'}}><div><div style={{fontWeight:800,fontSize:11}}>{con.nom}</div><div style={{fontSize:9,color:'#64748b'}}>{con.ville} • {con.marques}</div><div style={{fontSize:9,color:'#16a34a',fontWeight:700}}>{con.tel}</div></div><button onClick={function(){alert('Contact '+con.nom+' - '+con.tel+' - Pour GDB '+gdb+' - PI 314159 USD - Voiture '+marque)}} style={{background:'#16a34a',color:'#fff',border:'none',borderRadius:8,padding:'6px 10px',fontSize:9,fontWeight:800}}>📞 Contacter</button></div>)})}
      </div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:12,paddingBottom:4}}>
        <button onClick={function(){setType('Tous')}} style={{whiteSpace:'nowrap',padding:'6px 12px',borderRadius:20,border:type==='Tous'?'2px solid #1e40af':'1px solid #e2e8f0',background:type==='Tous'?'#dbeafe':'#fff',fontSize:10,fontWeight:type==='Tous'?'800':'500'}}>Tous</button>
        {['Voiture Neuve','Occasion','Pick-up','Pièces Détachées'].map(function(t){return (<button key={t} onClick={function(){setType(t)}} style={{whiteSpace:'nowrap',padding:'6px 10px',borderRadius:20,border:type===t?'2px solid #1e40af':'1px solid #e2e8f0',background:type===t?'#dbeafe':'#fff',fontSize:10,fontWeight:type===t?'800':'500'}}>{t}</button>)})}
        <button onClick={function(){setMarque('Toutes')}} style={{whiteSpace:'nowrap',padding:'6px 12px',borderRadius:20,border:marque==='Toutes'?'2px solid #f97316':'1px solid #e2e8f0',background:marque==='Toutes'?'#fff7ed':'#fff',fontSize:10,fontWeight:marque==='Toutes'?'800':'500'}}>Toutes Marques</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginTop:12}}>
        {filtered.map(function(v){
          return(
            <div key={v.id} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:10,background:'#fff'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontSize:24}}>{v.img}</div><div style={{fontSize:8,background:'#f1f5f9',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{v.marque}</div></div>
              <div style={{fontWeight:800,fontSize:11,marginTop:6}}>{v.n}</div>
              <div style={{fontSize:9,color:'#64748b',marginTop:2}}>{v.type} • Orig {v.orig} • {v.zone}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}><div><div style={{fontWeight:900,fontSize:12,color:'#16a34a'}}>{v.p} PI</div><div style={{fontSize:8,color:'#64748b'}}>${(v.p*314159).toFixed(0)} USD ref</div></div><button onClick={function(){setCart(function(c){return [...c,v]})}} style={{border:'none',background:'#1e40af',color:'#fff',borderRadius:8,padding:'6px 10px',fontSize:10,fontWeight:800}}>+ Panier</button></div>
              <div style={{display:'flex',gap:4,marginTop:6}}><a href={v.url} target="_blank" rel="noopener noreferrer" style={{flex:1,background:'#fff',border:'1px solid #1e40af',color:'#1e40af',borderRadius:8,padding:'5px 6px',fontSize:9,fontWeight:800,textAlign:'center',textDecoration:'none'}}>🌐 Site Officiel {v.marque}</a></div>
              <div style={{fontSize:8,color:'#a855f7',marginTop:4,fontWeight:700}}>GDB {gdb?.slice(0,10)} • PI • Concessionnaire {v.zone}</div>
            </div>
          )
        })}
      </div>

      {cart.length>0 && (<div style={{border:'2px solid #1e40af',borderRadius:12,padding:10,marginTop:12,background:'#eff6ff'}}><div style={{fontWeight:800,fontSize:12}}>Panier Auto • {cart.length} • GDB {gdb?.slice(0,8)}</div>{cart.map(function(it,i){return (<div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11,marginTop:4,borderBottom:'1px solid #dbeafe',paddingBottom:4}}><div>{it.img} {it.n.slice(0,18)} • {it.marque}</div><div style={{fontWeight:800}}>{it.p} PI</div></div>)})}<div style={{display:'flex',justifyContent:'space-between',fontWeight:900,marginTop:8}}><div>Total PI</div><div>{totalPi.toFixed(4)} PI = ${totalUsd.toFixed(0)} USD</div></div><button onClick={function(){setCart([])}} style={{width:'100%',marginTop:8,background:'#fff',border:'1px solid #1e40af',borderRadius:10,padding:8,fontSize:11}}>Vider Panier • {gdb?.slice(0,8)}</button></div>)}

      <div style={{fontSize:10,color:'#64748b',marginTop:10,textAlign:'center'}}>• Sites officiels: Toyota.com, Mercedes-Benz.com, BMW.com, Hyundai.com, Kia.com, Ford.com, Nissan-Global.com • Pièces: parts.toyota.com • Paiement PI 1 PI = 314,159 USD • Concessionnaires agréés CEMAC/UEMOA/Golfe légaux • {gdb} • ISO20022</div>
    </div>
  )
    }
