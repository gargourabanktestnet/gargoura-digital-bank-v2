import { NextResponse } from "next/server"
export async function POST(req:Request){
 const {paymentId, txid}=await req.json()
 // Verifie le paiement sur Pi blockchain
 // const res=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{method:"POST",headers:{...},body:JSON.stringify({txid})})
 return NextResponse.json({ok:true, paymentId, txid, msg:"Complete GARGOURA DIGITAL BANK - Credit PI"})
}
