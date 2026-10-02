import { NextResponse } from "next/server"
export async function POST(req:Request){
 const {paymentId}=await req.json()
 // ICI tu appelles l'API Pi avec ta cle secrete
 // const res=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{method:"POST",headers:{"Authorization":"Key TA_CLE_SECRETE_PI"}})
 // Pour testnet on repond OK direct
 return NextResponse.json({ok:true, paymentId, msg:"Approved GARGOURA DIGITAL BANK"})
}
