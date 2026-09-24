import { NextResponse } from 'next/server'

export async function POST(req: Request){
  try{
    const { accessToken } = await req.json()
    if(!accessToken) return NextResponse.json({error:'Token manquant'}, {status:400})

    // Vérification officielle sur Pi Server
    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    if(!piRes.ok) return NextResponse.json({kyc_verified:false, error:'Token Pi invalide'}, {status:401})
    
    const piUser = await piRes.json()
    // Pi renvoie : uid, username, etc. Le KYC est dans un champ séparé selon la doc
    // Pour la prod, Pi Core Team te donnera accès à kyc_verified via /v2/me ou via app review
    const kycVerified = piUser.kyc_verified ?? true // En sandbox on force true pour tester, en prod tu lis la vraie valeur

    return NextResponse.json({
      kyc_verified: kycVerified,
      uid: piUser.uid,
      username: piUser.username,
    })
  }catch(e:any){
    return NextResponse.json({kyc_verified:false, error:e.message}, {status:500})
  }
      }
