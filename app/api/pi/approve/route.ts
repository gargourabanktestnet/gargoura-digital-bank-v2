import { NextResponse } from "next/server"
export async function POST(req: Request){
 try{
  const { paymentId } = await req.json()
  const key = process.env.PI_API_KEY
  if(!key) return NextResponse.json({ok:false}, {status:200})
  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{method:"POST", headers:{ Authorization: `Key ${key}` }})
  const data = await res.text()
  return NextResponse.json({ok:true, data}, {status:200})
 }catch(e:any){
  return NextResponse.json({ok:false, error:e.message}, {status:200})
 }
}
