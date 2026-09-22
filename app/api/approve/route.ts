import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try{
    const {paymentId}=await req.json();
    const apiKey=process.env.PI_API_KEY;
    if(!apiKey) return NextResponse.json({error:"PI_API_KEY manquant"}, {status:500});
    
    const res=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
      method:"POST",
      headers:{"Authorization":`Key ${apiKey}`}
    });
    const data=await res.json();
    return NextResponse.json(data);
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
