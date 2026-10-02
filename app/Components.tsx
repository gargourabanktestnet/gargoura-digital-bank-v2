"use client"
export function Transferer({gdb}:{gdb:string}){return <div style={{background:"#fff",padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}>Transferer P2P • {gdb.slice(0,8)}... • CEMAC UEMOA GOLFE JORDANIE DOLLAR INTERNATIONAL</div>}
export function Virement({gdb}:{gdb:string}){return <div style={{background:"#fff",padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}>Virement SEPA SWIFT • ISO20022</div>}
export function PiDex({gdb}:{gdb:string}){return <div style={{background:"#fff",padding:12,borderRadius:12}}>Pi DEX 1 PI=314159$ • {gdb.slice(0,6)}</div>}
export function ConvertirComp(){return <div>Convertir</div>}
export function TradingComp(){return <div>Trading</div>}
export function PortefeuilleComp(p:any){return <div>Portefeuille</div>}
export function Cartes(p:any){return <div>Cartes</div>}
export function CartesPro({user,gdb}:{user:string,gdb:string}){return <div>Cartes Pro {user}</div>}
export function EpargnePro(){return <div>Epargne Pro</div>}
export function PaiementPro({gdb}:{gdb:string}){return <div>Paiement Pro Mondial • Mobile Money 12 operateurs • Taux 1 PI=314159$ • Delai {"<30s"}</div>}
export function PlusPro(props:any){return <div>Plus Pro • Multi-devises FX • RGPD PCI-DSS • Halal</div>}
export function KYCComp({gdb,onVerified}:any){return <button onClick={()=>onVerified && onVerified("PIONNIER GCV")} style={{padding:12,background:"#0A1931",color:"#C9A86A",borderRadius:10,border:"none",width:"100%",fontWeight:900}}>Activer KYC</button>}
export function AIAutoComp(){return <div>AI Auto</div>}
export function BlockchainComp(){return <div>Blockchain</div>}
export function ShoppingComp(){return <div>Shopping</div>}
export function AutomobileComp(){return <div>Automobile</div>}
export function AgregationComp(){return <div>Agregation</div>}
export function GestionComp(){return <div>Gestion</div>}
