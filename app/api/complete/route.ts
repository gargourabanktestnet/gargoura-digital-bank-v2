import { NextResponse } from "next/server";
export async function POST(req: Request){
  try{
    const {paymentId, txid} = await req.json();
    const apiKey = process.env.PI_API_KEY;
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
      method:"POST",
      headers:{Authorization:`Key ${apiKey}`, "Content-Type":"application/json"},
      body: JSON.stringify({txid})
    });
    const data = await r.json();
    return NextResponse.json(data);
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
