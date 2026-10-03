import { NextResponse } from "next/server"
export async function POST(req: Request){
 try{
  const { paymentId } = await req.json()
  const apiKey = process.env.PI_API_KEY || "test_key"
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
    method:"POST",
    headers:{ Authorization: `Key ${apiKey}` }
  })
  const data = await r.json().catch(()=>({}))
  return NextResponse.json(data)
 }catch(e:any){
  return NextResponse.json({error:e.message}, {status:200})
 }
}
