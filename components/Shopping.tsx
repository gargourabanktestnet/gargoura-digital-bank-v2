// @ts-nocheck
'use client'
import {useState} from 'react'
export default function Shopping({gdb}){
  const [plat,setPlat]=useState('Toutes')
  const [cart,setCart]=useState([])
  const [cat,setCat]=useState('Tous')
  const platforms=[
    {n:'Toutes',url:'',color:'#334155'},
    {n:'Amazon',url:'https://www.amazon.com',color:'#ff9900'},
    {n:'Alibaba',url:'https://www.alibaba.com',color:'#ff6a00'},
    {n:'eBay',url:'https://www.ebay.com',color:'#0064d2'},
    {n:'Temu',url:'https://www.temu.com',color:'#fb7701'},
    {n:'Shein',url:'https://www.shein.com',color:'#000'},
    {n:'AliExpress',url:'https://www.aliexpress.com',color:'#ff4747'},
    {n:'Jumia',url:'https://www.jumia.com',color:'#f68b1e'},
    {n:'Noon',url:'https://www.noon.com',color:'#feee00'},
    {n:'Walmart',url:'https://www.walmart.com',color:'#0071dc'},
  ]
  const categories=['Tous','Électronique','Mode','Maison','Auto','Téléphones']
  const products=[
    {id:1,n:'iPhone 15 Pro Max 256GB',p:1.2,plat:'Amazon',cat:'Téléphones',img:'📱',orig:'$1,199',url:'https://www.amazon.com/s?k=iPhone+15+Pro+Max'},
    {id:2,n:'Nike Air Max 270',p:0.15,plat:'eBay',cat:'Mode',img:'👟',orig:'$150',url:'https://www.ebay.com/sch/i.html?_nkw=Nike+Air+Max'},
    {id:3,n:'TV Samsung 65" QLED 4K',p:0.8,plat:'Alibaba',cat:'Électronique',img:'📺',orig:'$799',url:'https://www.alibaba.com/trade/search?searchText=Samsung+TV+65'},
    {id:4,n:'Robe Shein Été Africa',p:0.08,plat:'Shein',cat:'Mode',img:'👗',orig:'$35',url:'https://www.shein.com'},
    {id:5,n:'Casque Sony WH-1000XM5',p:0.25,plat:'Temu',cat:'Électronique',img:'🎧',orig:'$399',url:'https://www.temu.com/search_result.html?search_key=Sony+WH-1000XM5'},
    {id:6,n:'Machine à laver LG',p:1.5,plat:'Walmart',cat:'Maison',img:'🧺',orig:'$899',url:'https://www.walmart.com/search?q=LG+washing+machine'},
    {id:7,n:'Pneu Michelin 195/65 R15',p:0.3,plat:'AliExpress',cat:'Auto',img:'🛞',orig:'$120',url:'https://www.aliexpress.com/w/wholesale-michelin-tire.html'},
    {id:8,n:'Parfum Dubaï Oud Royal',p:0.12,plat:'Noon',cat:'Maison',img:'🌸',orig:'$85',url:'https://www.noon.com/uae-en/search?q=oud+perfume'},
    {id:9,n:'Chaussure Jumia Homme',p:0.06,plat:'Jumia',cat:'Mode',img:'👞',orig:'$45',url:'https://www.jumia.com.ng/catalog/?q=shoes+men'},
    {id:10,n:'MacBook Air M2',p:2.1,plat:'Amazon',cat:'Électronique',img:'💻',orig:'$1,199',url:'https://www.amazon.com/s?k=MacBook+Air+M2'},
  ]
  var filtered=products.filter(function(pr){return (plat==='Toutes'||pr.plat===plat)&&(cat==='Tous'||pr.cat===cat)})
  var totalPi=cart.reduce(function(s,it){return s+it.p},0)
  var totalUsd=totalPi*314159
  function add(pr){setCart(function(c){return [...c,pr]})}
  function getPlatUrl(name){var f=platforms.find(function(p){return p.n===name}); return f?f.url:''}
  return(
    <div style={{background:'#fff',borderRadius:16,padding:12,marginTop:10}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900,fontSize:15}}>Shopping • PI + Accès Officiel • {gdb?.slice(0,8)}</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{fontSize:10,background:'#f97316',color:'#fff',padding:'4px 8px',borderRadius:12,fontWeight:700}}>🛒 {cart.length}</div><div style={{fontSize:10,fontWeight:700}}>{totalPi.toFixed(3)} PI</div></div>
      </div>
      <div style={{fontSize:11,color:'#16a34a',fontWeight:700,marginTop:4}}>PI monnaie référence 314,159 USD • Accès sites officiels mondiaux • GDB {gdb}</div>

      <div style={{background:'#1e3a8a',color:'#fff',borderRadius:12,padding:10,marginTop:10}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:11,color:'#93c5fd'}}>Panier Global PI</div><div style={{fontWeight:900,fontSize:16,marginTop:2}}>{totalPi.toFixed(4)} PI = ${totalUsd.toFixed(2)} USD</div></div><button onClick={function(){if(cart.length===0) alert('Panier vide - GDB '+gdb); else alert('Paiement '+totalPi.toFixed(4)+' PI de '+gdb)}} style={{background:'#16a34a',color:'#fff',border:'none',borderRadius:10,padding:'10px 14px',fontWeight:800,fontSize:11}}>Payer {totalPi.toFixed(2)} PI</button></div>
        <div style={{fontSize:10,marginTop:6,color:'#86efac'}}>1 PI = 314,159 USD ref • Livraison CEMAC/UEMOA/Golfe/International</div>
      </div>

      <div style={{fontWeight:800,fontSize:12,marginTop:12}}>🌐 Accès Direct Sites Officiels • 10 Plateformes Mondiales</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6,marginTop:8}}>
        {platforms.filter(p=>p.n!=='Toutes').map(function(pl){
          return (
            <div key={pl.n} style={{border:plat===pl.n?'2px solid '+pl.color:'1px solid #e2e8f0',borderRadius:12,padding:8,display:'flex',justifyContent:'space-between',alignItems:'center',background:plat===pl.n?'#fff7ed':'#fff'}}>
              <div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{width:8,height:8,background:pl.color,borderRadius:8}}></div><div style={{fontWeight:800,fontSize:11}}>{pl.n}</div></div>
              <div style={{display:'flex',gap:4}}>
                <button onClick={function(){setPlat(pl.n)}} style={{border:'none',background:plat===pl.n?pl.color:'#f1f5f9',color:plat===pl.n?'#fff':'#334155',borderRadius:8,padding:'4px 8px',fontSize:9,fontWeight:700}}>Filtrer</button>
                <a href={pl.url} target="_blank" rel="noopener noreferrer" style={{background:'#1e40af',color:'#fff',borderRadius:8,padding:'4px 8px',fontSize:9,fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center'}}>🌐 Site</a>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{display:'flex',gap:6,overflowX:'auto',marginTop:10,paddingBottom:4}}>
        <button onClick={function(){setPlat('Toutes')}} style={{whiteSpace:'nowrap',padding:'6px 12px',borderRadius:20,border:plat==='Toutes'?'2px solid #f97316':'1px solid #e2e8f0',background:plat==='Toutes'?'#fff7ed':'#fff',fontSize:11,fontWeight:plat==='Toutes'?'800':'500'}}>Toutes Plateformes</button>
        {categories.map(function(c){return (<button key={c} onClick={function(){setCat(c)}} style={{whiteSpace:'nowrap',padding:'6px 10px',borderRadius:20,border:cat===c?'2px solid #1e40af':'1px solid #e2e8f0',background:cat===c?'#dbeafe':'#fff',fontSize:10,fontWeight:cat===c?'800':'500'}}>{c}</button>)})}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginTop:12}}>
        {filtered.map(function(pr){
          return (
            <div key={pr.id} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:10,background:'#fff'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontSize:22}}>{pr.img}</div><div style={{fontSize:8,background:'#f1f5f9',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{pr.plat}</div></div>
              <div style={{fontWeight:800,fontSize:11,marginTop:6,height:28,overflow:'hidden'}}>{pr.n}</div>
              <div style={{fontSize:9,color:'#64748b',marginTop:2}}>{pr.cat} • Orig {pr.orig}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
                <div><div style={{fontWeight:900,fontSize:12,color:'#16a34a'}}>{pr.p} PI</div><div style={{fontSize:8,color:'#64748b'}}>${(pr.p*314159).toFixed(0)} USD</div></div>
                <button onClick={function(){add(pr)}} style={{border:'none',background:'#f97316',color:'#fff',borderRadius:8,padding:'6px 10px',fontSize:10,fontWeight:800}}> + Panier</button>
              </div>
              <div style={{display:'flex',gap:4,marginTop:6}}>
                <a href={pr.url} target="_blank" rel="noopener noreferrer" style={{flex:1,background:'#fff',border:'1px solid #1e40af',color:'#1e40af',borderRadius:8,padding:'5px 6px',fontSize:9,fontWeight:800,textAlign:'center',textDecoration:'none'}}>🔗 Voir sur {pr.plat}</a>
                <a href={getPlatUrl(pr.plat)} target="_blank" rel="noopener noreferrer" style={{background:'#1e40af',color:'#fff',borderRadius:8,padding:'5px 8px',fontSize:9,fontWeight:800,textDecoration:'none'}}>🌐 Officiel</a>
              </div>
              <div style={{fontSize:8,color:'#a855f7',marginTop:4,fontWeight:700}}>GDB {gdb?.slice(0,10)} • Paiement PI • {pr.plat}.com officiel</div>
            </div>
          )
        })}
      </div>

      {cart.length>0 && (
        <div style={{border:'2px solid #f97316',borderRadius:12,padding:10,marginTop:12,background:'#fff7ed'}}>
          <div style={{fontWeight:800,fontSize:12}}>Panier PI • {cart.length} articles • GDB {gdb?.slice(0,8)}</div>
          {cart.map(function(it,i){return (<div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11,marginTop:4}}><div>{it.img} {it.n.slice(0,18)} • {it.plat}</div><div style={{fontWeight:800}}>{it.p} PI</div></div>)})}
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:900,marginTop:8}}><div>Total PI</div><div>{totalPi.toFixed(4)} PI (${totalUsd.toFixed(2)} USD)</div></div>
        </div>
      )}

      <div style={{fontSize:10,color:'#64748b',marginTop:10,textAlign:'center'}}>• Accès direct sites officiels: Amazon.com, Alibaba.com, eBay.com, Temu.com, Shein.com, AliExpress.com, Jumia.com, Noon.com, Walmart.com<br/>• Paiement PI référence 1 PI = 314,159 USD • GDB {gdb} • ISO20022 • Mondial</div>
    </div>
  )
      }
