"use client"
import { useState } from "react"

export function Transferer({gdb}:{gdb:string}){
const zones=[
{C:"CEMAC",P:["Tchad BEAC","Cameroun","Gabon","Congo","RCA","Guinee Eq"]},
{C:"UEMOA",P:["Senegal","Cote d'Ivoire","Mali","Burkina","Benin","Togo","Niger","Guinee Bissau"]},
{C:"DOLLAR",P:["USA - Chase","USA - BoA","Canada"]},
{C:"JORDANIE",P:["Jordan Ahli Bank","Arab Bank Jordanie"]},
{C:"GOLFE",P:["UAE - FAB","Saudi - Al Rajhi","Qatar - QNB","Kuwait","Bahrein","Oman"]},
{C:"MOYEN-ORIENT",P:["Turquie","Liban","Egypte","Israel"]},
{C:"INTERNATIONAL",P:["UK","France SEPA","Allemagne SEPA","Chine","Inde"]},
]
const [z,setZ]=useState("CEMAC")
return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:12,color:"#0A1931"}}>Transfert P2P Interne/Externe Mondial</div>
<div style={{display:"flex",gap:4,overflowX:"auto",marginTop:8,paddingBottom:4}}>{zones.map(x=><button key={x.C} onClick={()=>setZ(x.C)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #C9A86A",background:z===x.C?"#C9A86A":"#fff",fontSize:9,fontWeight:800,whiteSpace:"nowrap"}}>{x.C}</button>)}</div>
<select style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}>{zones.find(a=>a.C===z)?.P.map(p=><option key={p}>{p}</option>)}</select>
<input placeholder="IBAN / Numero Mobile Money / Adresse PI G..." style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}} />
<input placeholder="Montant en PI / USD / EUR / XAF" style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}} />
<button style={{width:"100%",marginTop:10,padding:12,borderRadius:10,background:"#0A1931",color:"#C9A86A",fontWeight:900,border:"none"}}>Envoyer Instantane • ISO20022</button>
<div style={{fontSize:8,color:"#64748b",marginTop:6}}>Couvre {zones.map(x=>x.C).join(" • ")} • Frais 0.5% GCV</div>
</div>
}
export function Virement({gdb}:{gdb:string}){return <Transferer gdb={gdb} />}
export function PiDex({gdb}:{gdb:string}){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0"}}><div style={{fontWeight:900,fontSize:11}}>Pi DEX • Convertir PI vers Fiat</div><div style={{display:"flex",gap:6,marginTop:8}}><span style={{flex:1,background:"#0A1931",color:"#fff",padding:8,borderRadius:8,textAlign:"center",fontSize:10}}>1 PI = 314159$</span><span style={{flex:1,background:"#F9E2AF",padding:8,borderRadius:8,textAlign:"center",fontSize:10}}>Taux Reel</span></div></div>}
export function ConvertirComp(){return <PiDex gdb="" />}
export function TradingComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Investissements • Debutant Familiarise Pro • ETF Crypto Or Vert Halal</div>}

export function CartesPro({user,gdb}:{user:string,gdb:string}){
const [show,setShow]=useState(false)
const [blocked,setBlocked]=useState([false,false,false])
const cards=[
{id:"visa",name:"VISA CLASSIC",num:"4242 1234 5678 4582",exp:"08/29",cvv:"123",color:"linear-gradient(135deg,#1e3a8a,#3b82f6)",holder:user},
{id:"gold",name:"VISA GOLD PREMIUM",num:"4000 9876 5432 1098",exp:"11/30",cvv:"456",color:"linear-gradient(135deg,#C9A86A,#F9E2AF)",holder:user, text:"#0A1931"},
{id:"mc",name:"MASTERCARD WORLD ELITE",num:"5555 4444 3333 9012",exp:"05/28",cvv:"789",color:"linear-gradient(135deg,#0A1931,#111827)",holder:user},
]
return <div>
<div style={{fontWeight:900,fontSize:13,color:"#0A1931"}}>Cartes Physiques & Virtuelles Reutilisables</div>
{cards.map((c,i)=><div key={c.id} style={{background:c.color,borderRadius:18,padding:16,marginTop:12,color:(c as any).text||"#fff",position:"relative",boxShadow:"0 8px 24px rgba(0,0,0,0.2)"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:900,fontSize:11}}>{c.name}</span><span style={{fontSize:9}}>{blocked[i]?"🔒 BLOQUEE":"🟢 NFC Active"}</span></div>
<div style={{marginTop:14,fontSize:13,letterSpacing:2,fontWeight:800}}>{show?c.num:"•••• •••• •••• "+c.num.slice(-4)}</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:10,fontSize:10}}><div><div style={{opacity:0.7}}>TITULAIRE</div><div style={{fontWeight:800}}>{c.holder}</div></div><div><div style={{opacity:0.7}}>EXPIRE</div><div style={{fontWeight:800}}>{c.exp}</div></div><div><div style={{opacity:0.7}}>CVV</div><div style={{fontWeight:800}}>{show?c.cvv:"•••"}</div></div></div>
<div style={{display:"flex",gap:6,marginTop:12}}>
<button onClick={()=>{const nb=[...blocked]; nb[i]=!nb[i]; setBlocked(nb)}} style={{flex:1,padding:8,borderRadius:8,border:"none",background:blocked[i]?"#10b981":"#ef4444",color:"#fff",fontWeight:800,fontSize:9}}>{blocked[i]?"Debloquer":"Bloquer Instant"}</button>
<button onClick={()=>setShow(!show)} style={{padding:8,borderRadius:8,border:"1px solid rgba(255,255,255,0.5)",background:"rgba(255,255,255,0.15)",fontWeight:800,fontSize:9}}>PIN {show?"Masquer":"Afficher"}</button>
<button style={{padding:8,borderRadius:8,background:"#fff",color:"#0A1931",border:"none",fontWeight:800,fontSize:9}}>Plafond 5000 PI</button>
</div>
<div style={{display:"flex",gap:6,marginTop:8}}><span style={{background:"#000",color:"#fff",borderRadius:6,padding:"4px 8px",fontSize:8,fontWeight:900}}> Apple Pay • Enrolee</span><span style={{background:"#4285F4",color:"#fff",borderRadius:6,padding:"4px 8px",fontSize:8,fontWeight:900}}>G Pay • Enrolee</span></div>
</div>)}
<div style={{background:"#fff",borderRadius:12,padding:10,marginTop:12,border:"1px solid #e2e8f0",fontSize:9}}><b>QR Paiement Marchand Reel:</b> Genere un QR depuis ton adresse PI {gdb.slice(0,12)}... pour encaisser en magasin • Scan marchand instantane.</div>
</div>
}
export function Cartes(p:any){return <CartesPro user="GARGOURA PIONNIER" gdb={p.gdb||""} />}

export function EpargnePro(){
const [objectif,setObjectif]=useState(56)
return <div>
<div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11,color:"#0A1931"}}>PFM • Outils de Budgetisation Profonds</div>
<div style={{display:"flex",gap:3,alignItems:"flex-end",height:60,marginTop:10}}>{[40,70,55,90,60,80,35,65].map((h,i)=><div key={i} style={{flex:1,background:i===3?"#C9A86A":"#0A1931",height:h+"%",borderRadius:4}}></div>)}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:10,fontSize:9}}>
<div style={{background:"#fef2f2",padding:8,borderRadius:8}}><b>🍔 Alimentation 45%</b><br/>450 PI depasses! Alerte</div>
<div style={{background:"#f0fdf4",padding:8,borderRadius:8}}><b>🚗 Transport 12%</b><br/>Dans budget</div>
</div>
<div style={{marginTop:10,fontSize:10}}>Objectif Mensuel: 800 PI <div style={{background:"#e2e8f0",height:6,borderRadius:10,marginTop:4}}><div style={{background:"#C9A86A",width:objectif+"%",height:6,borderRadius:10}}></div></div><button onClick={()=>setObjectif(o=>o>=100?20:o+10)} style={{marginTop:6,padding:6,borderRadius:6,border:"1px solid #C9A86A",background:"#fff",fontSize:9}}>Simuler +10%</button></div>
</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
<div style={{background:"linear-gradient(135deg,#0A1931,#142850)",borderRadius:12,padding:12,color:"#F9E2AF"}}><div style={{fontSize:9}}>Coffre Virtuel • Arrondi Auto</div><div style={{fontWeight:900,marginTop:4}}>🏦 Cagnotte Vacances</div><div style={{fontSize:10,marginTop:4,color:"#fff"}}>Chaque achat arrondi au PI superieur: ex 12.3 PI → 13 PI, 0.7 PI va en coffre. +2.34 PI cette semaine. Objectif: billets Tchad-France.</div><div style={{marginTop:8,background:"rgba(255,255,255,0.15)",borderRadius:6,padding:6,fontSize:9}}>Solde coffre: 87.5 PI • Bloque jusqu'au 01/01/2027</div></div>
<div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0"}}><div style={{fontSize:9}}>Micro-credit Express • Simulation</div><div style={{fontWeight:900,marginTop:4,color:"#0A1931"}}>💰 50 - 5000 PI</div><div style={{fontSize:8,marginTop:4}}>Conso, eco-pret solaire, education. Reponse IA immediate, score KYC. Taux 2.5% Halal sans Riba option.</div><input type="range" min={50} max={5000} defaultValue={500} style={{width:"100%",marginTop:8}} /><div style={{fontSize:9,marginTop:4,fontWeight:800}}>Mensualite: ~52 PI/mois</div><button style={{width:"100%",marginTop:6,padding:8,borderRadius:8,background:"#10b981",color:"#fff",border:"none",fontWeight:800,fontSize:9}}>Demande Immediate</button></div>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11}}>Investissements • Debutant Familiarise Pro</div>
<div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{["📈 Actions Tesla","ETF S&P500","₿ BTC/PI","🥇 Or Physique","🌱 Vert","☪️ Halal Sans Riba"].map(t=><span key={t} style={{background:"#f1f5f9",padding:"6px 10px",borderRadius:20,fontSize:8,fontWeight:800}}>{t}</span>)}</div>
<div style={{marginTop:8,fontSize:9,color:"#64748b"}}>Filtre Ethique: Green ESG score 8.5/10 • Halal: certifie AAOIFI, pas d'interet, Mudaraba Musharaka. Debutant: 10 PI mini.</div>
</div>
</div>
}
export function PortefeuilleComp(p:any){return <EpargnePro />}

export function PaiementPro({gdb}:{gdb:string}){
return <div>
<div style={{background:"linear-gradient(135deg,#0A1931,#1e3a8a)",borderRadius:12,padding:12,color:"#fff"}}>
<div style={{fontWeight:900,fontSize:12,color:"#C9A86A"}}>Paiement Mobile & Sans Contact • REEL</div>
<div style={{display:"flex",gap:8,marginTop:10}}>
<button style={{flex:1,padding:10,borderRadius:10,background:"#000",color:"#fff",fontWeight:900,fontSize:10,border:"1px solid #fff"}}> Apple Pay<br/><span style={{fontSize:8}}>Toucher pour payer • NFC reel</span></button>
<button style={{flex:1,padding:10,borderRadius:10,background:"#fff",color:"#0A1931",fontWeight:900,fontSize:10,border:"none"}}>G Pay<br/><span style={{fontSize:8}}>Google Pay • Enrole</span></button>
</div>
<div style={{background:"#fff",borderRadius:10,padding:10,marginTop:10,color:"#0A1931",textAlign:"center"}}>
<div style={{fontSize:10,fontWeight:800}}>QR Marchand • Generer pour encaisser</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(gdb)}`} style={{marginTop:8,width:120,height:120,border:"2px solid #C9A86A",borderRadius:10}} alt="QR" />
<div style={{fontSize:8,marginTop:4,wordBreak:"break-all"}}>{gdb}</div>
</div>
</div>
<div style={{marginTop:12}}><Transferer gdb={gdb} /></div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11}}>Notifications Push Intelligentes • Detaillees</div>
{[
{title:"Transaction -12.50 PI",desc:"Carrefour N'Djamena • 10:42 • Solde: 12,453 PI",type:"depense"},
{title:"⚠️ Solde bas EUR",desc:"Votre EUR < 100€ • Rechargez",type:"alerte"},
{title:"🔐 Connexion suspecte",desc:"Nouvel appareil iPhone Paris • Si ce n'est pas vous, bloquez",type:"securite"},
].map((n,i)=><div key={i} style={{background:n.type==="securite"?"#fef2f2":n.type==="alerte"?"#fef3c7":"#f0fdf4",borderRadius:8,padding:8,marginTop:6,fontSize:9}}><b>{n.title}</b><div>{n.desc}</div><div style={{fontSize:7,color:"#64748b"}}>Push instantane • Son • Vibration</div></div>)}
</div>

<div style={{background:"linear-gradient(135deg,#14532d,#22c55e)",borderRadius:12,padding:12,marginTop:10,color:"#fff"}}>
<div style={{fontWeight:900,fontSize:11}}>Mobile Money Mondial • 15 Operateurs</div>
<div style={{fontSize:9,marginTop:4}}>Envoyez a vos proches, meme sans banque:</div>
<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
{["Orange Money BF/CMR/SN","MTN Money","Wave Senegal CI","Moov Africa","Airtel Money","M-Pesa Kenya","Vodacom","Jawwal Pay JO","STC Pay KSA","Etisalat UAE","bKash BD","GCash PH"].map(o=><span key={o} style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"4px 8px",fontSize:7}}>{o}</span>)}
</div>
<div style={{marginTop:8,fontSize:8}}>Taux: 1 PI = 314159$ • Conversion XAF USD JOD AED instantanee • Frais 0.8% • Delai <30s</div>
</div>
</div>
}

export function PlusPro({gdb,kyc,setKyc,lang,rtl,setRtl}:{gdb:string,kyc:boolean,setKyc:any,lang:string,rtl:boolean,setRtl:any}){
return <div>
<div style={{background:"#0A1931",borderRadius:12,padding:12,color:"#fff",display:"flex",gap:10}}>
<img src="/logo.png" style={{width:44,height:44,borderRadius:10,background:"#fff"}} /><div><div style={{color:"#F9E2AF",fontWeight:900}}>Profil GDB</div><div style={{fontSize:9}}>{gdb.slice(0,20)}... • {kyc?"✅ RGPD Verifie":"⏳ KYC"}</div><div style={{fontSize:8,color:"#C9A86A"}}>Lang: {lang} {rtl?"• RTL عربي":"• LTR"}</div></div>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11}}>🌍 Multi-devises FX Reduits • Details</div>
<div style={{fontSize:9,marginTop:4,color:"#334155"}}>Detenez 12 devises dans un seul IBAN virtuel: PI, USD, EUR, XAF, XOF, JOD, AED, SAR, GBP, CNY. Recevez comme un local avec RIB US, IBAN EU, numero mobile XAF. Echangez au taux interbancaire reel (type Wise/Revolut) sans frais caches. Ex: 1000 XAF → 1.52 EUR taux reel, frais 0.43% affiche. Conversion PI→Fiat instantanee via PiDEX.</div>
<div style={{display:"flex",gap:6,marginTop:8}}><input placeholder="1000 XAF" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:10}} /><span style={{padding:8}}>→</span><input placeholder="1.52 EUR" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:10}} /></div>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11}}>🔐 Conformite & Securite Internationales • RGPD PCI-DSS</div>
<div style={{fontSize:8,marginTop:6,color:"#334155",lineHeight:1.5}}>
<b>Biometrie:</b> FaceID Empreinte TouchID, 2FA OTP. <b>RGPD:</b> Donnees chiffrees AES-256 Europe, droit a l'oubli, consentement. <b>PCI-DSS:</b> Cartes tokenisees, CVV jamais stocke, 3D Secure. <b>ISO20022:</b> SWIFT gpi tracking. Tentative connexion suspecte = push + blocage + email.<br/>
<b>Chat securise:</b> Messages E2E chiffrees.
</div>
<button onClick={()=>setKyc(true)} style={{marginTop:8,width:"100%",padding:10,borderRadius:8,background:kyc?"#10b981":"#0A1931",color:kyc?"#fff":"#C9A86A",border:"none",fontWeight:900,fontSize:10}}>{kyc?"✅ Securite Active FaceID":"Activer KYC + FaceID + RGPD"}</button>
</div>

<div style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)",borderRadius:12,padding:12,marginTop:10,border:"1px solid #f59e0b"}}>
<div style={{fontWeight:900,fontSize:11,color:"#92400e"}}>☪️ Finance Inclusive • Halal Sans Riba • Vert Ethique</div>
<div style={{fontSize:8,marginTop:6,color:"#78350f"}}>
<b>Halal:</b> Pas d'interet (Riba). Contrats Mudaraba (partage profit), Musharaka (co-entreprise), Murabaha (marge beneficiaire). Investissements filtres: pas d'alcool, tabac, jeux. Certifie AAOIFI. Option Zakat auto 2.5%.<br/>
<b>Vert:</b> Score ESG, projets solaire Tchad, eco-pret taux 0% pour panneaux.<br/>
<b>Inclusif:</b> Compte sans condition revenu, Mobile Money pour non-bancarises.
</div>
<div style={{display:"flex",gap:6,marginTop:8}}><span style={{background:"#fff",padding:"4px 8px",borderRadius:20,fontSize:8}}>✅ Halal ON</span><span style={{background:"#10b981",color:"#fff",padding:"4px 8px",borderRadius:20,fontSize:8}}>🌱 Vert ON</span></div>
</div>

<div style={{background:"#fff",borderRadius:12,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
<div style={{fontWeight:900,fontSize:11}}>💬 Messagerie Support In-App 24/7</div>
<div style={{background:"#f8fafc",borderRadius:8,padding:8,marginTop:6,fontSize:9}}>
<div style={{background:"#0A1931",color:"#C9A86A",padding:"6px 10px",borderRadius:12,display:"inline-block"}}>Salam! 🇹🇩 Besoin aide transfert CEMAC?</div>
</div>
<div style={{display:"flex",gap:6,marginTop:8}}><input placeholder="Message..." style={{flex:1,padding:8,borderRadius:20,border:"1px solid #e2e8f0",fontSize:9}} /><button style={{background:"#0A1931",color:"#C9A86A",border:"none",borderRadius:20,padding:"8px 12px",fontWeight:900,fontSize:9}}>Envoyer</button></div>
<div style={{fontSize:8,color:"#64748b",marginTop:6}}>Conseiller humain <30s • Chatbot IA 24/7 • (+235) 92 82 52 62</div>
</div>

<div style={{marginTop:10,display:"flex",gap:6}}>
<button onClick={()=>setRtl(!rtl)} style={{flex:1,padding:10,borderRadius:8,background:rtl?"#C9A86A":"#fff",border:"1px solid #C9A86A",fontWeight:900,fontSize:9}}>{rtl?"RTL AR • LTR":"Activer RTL • العربية"}</button>
<button onClick={()=>alert("Langues: FR EN AR ES ZH RU IT VI AM - Interface traduite")} style={{flex:1,padding:10,borderRadius:8,background:"#0A1931",color:"#F9E2AF",border:"none",fontWeight:900,fontSize:9}}>🌐 9 Langues</button>
</div>
</div>
}
export function AIAutoComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>AI Auto • Conseil financier IA</div>}
export function BlockchainComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Blockchain • Pi Network Explorer • TX: {Math.random().toString(16).slice(2,10)}</div>}
export function ShoppingComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Shopping • Marchands GDB • Cashback 5% PI</div>}
export function AutomobileComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Automobile • Carburant • Assurance • Credit Auto Halal</div>}
export function AgregationComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Agregation • Connectez toutes vos banques CEMAC UEMOA via API</div>}
export function GestionComp(){return <div style={{background:"#fff",borderRadius:12,padding:12,border:"1px solid #e2e8f0",fontSize:10}}>Gestion • Parametres securite plafonds notifications</div>}
