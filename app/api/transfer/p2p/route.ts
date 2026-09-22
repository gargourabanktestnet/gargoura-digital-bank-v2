import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
    const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if(!supabaseUrl || !serviceKey){
      return NextResponse.json({error:'Clés Supabase manquantes'}, {status:500})
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const { from_uid, from_username, to_username, amount, note } = await req.json()
    const amt = parseFloat(amount)
    
    if(!from_uid || !to_username || !amt) return NextResponse.json({error:'Invalide'}, {status:400})

    let { data: fromUser } = await supabase.from('users').select('*').eq('pi_uid', from_uid).single()
    if(!fromUser){
      const {data} = await supabase.from('users').insert({pi_uid: from_uid, username: from_username || 'pi_user', balance_pi: 10}).select().single()
      fromUser = data
    }

    const tx_id = `GARG-P2P-${Date.now()}`
    await supabase.from('p2p_transfers').insert({from_uid, to_username, amount_pi: amt, note: note || '', tx_id, status:'SUCCESS'})
    await supabase.from('users').update({balance_pi: (fromUser.balance_pi||0)-amt}).eq('pi_uid', from_uid)

    const { data: toUser } = await supabase.from('users').select('*').ilike('username', to_username).single()
    if(toUser){
      await supabase.from('users').update({balance_pi: (toUser.balance_pi||0)+amt}).eq('pi_uid', toUser.pi_uid)
    }

    return NextResponse.json({success:true, tx_id, message: `Envoye ${amt} Pi a @${to_username}`})
  } catch(e:any){
    return NextResponse.json({error: e.message}, {status:500})
  }
}

export async function GET(){
  return NextResponse.json({status:'Gargoura P2P API OK'})
      }
