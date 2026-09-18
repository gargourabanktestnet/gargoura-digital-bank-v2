"use client";
import { useState } from "react";

export default function Page(){
  const [bal,setBal]=useState(1.00);
  const s = {
    page:{minHeight:"100vh",background:"#f5f7fb",fontFamily:"sans-serif",paddingBottom:80},
    header:{background:"#1e4bd8",color:"white",padding:"14px 16px",display:"flex",justifyContent:"space-between"},
    card:{background:"white",borderRadius:16,padding:16,margin:"12px",border:"1px solid #e5e7eb"},
    badge:{background:"#d1fae5",color:"#065f46",fontSize:11,fontWeight:700,padding:"4px 8px",borderRadius:6},
    bal:{fontSize:36,fontWeight:900,color:"#15803d"},
    btn:{width:"100%",background:"#15803d",color:"white",padding:12,borderRadius:12,border:0,fontWeight:700,marginTop:10},
    btn2:{width:"100%",background:"#1e4bd8",color:"white",padding:12,borderRadius:12,border:0,fontWeight:700,marginTop:8},
    item:{background:"white",borderRadius:14,padding:12,margin:"8px 12px",display:"flex",gap:12,alignItems:"center",border:"1px solid #eee"},
    icon:{width:44,height:44,borderRadius:22,background:"#eef2ff",display:"flex",alignItems:"center",justifyContent:"center"}
  };
  const Item=({t,d,i}:any)=><div style={s.item}><div style={s.icon}>{i}</div><div><div style={{fontWeight:700,fontSize:14}}>{t}</div><div style={{fontSize:12,color:"#888"}}>{d}</div></div></div>;
  return <div style={s.page}>
    <div style={s.header}><div><div style={{fontWeight:900,fontSize:20}}>Gargoura</div><div style={{fontSize:12,opacity:.8}}>Digital Bank</div></div><div>⚙️ 👤</div></div>
    <div style={s.card}>
      <span style={s.badge}>MODE MAINNET - Vrai Pi</span>
      <div style={{marginTop:8,fontSize:13}}>Solde Gargoura</div>
      <div style={s.bal}>{bal.toFixed(2)} Pi</div>
      <button style={s.btn} onClick={()=>setBal(bal+1)}>+ Deposer 1 Pi</button>
      <button style={s.btn2} onClick={()=>alert("Pi Auth OK")}>Connexion Pi</button>
    </div>
    <div style={{fontSize:10,fontWeight:700,color:"#999",margin:"8px 16px"}}>SERVICES BANCAIRES</div>
    <Item t="Mobile Money" d="CEMAC & UEMOA" i="📱"/>
    <Item t="Paiement Factures" d="Eau, Elec" i="🧾"/>
    <Item t="Convertisseur" d="93 devises" i="💱"/>
    <div style={{fontSize:10,fontWeight:700,color:"#999",margin:"8px 16px"}}>TRADING</div>
    <Item t="Trading Pi" d="10 paires" i="📈"/>
    <Item t="Pi DEX" d="Web 3.0" i="🔗"/>
  </div>
}
