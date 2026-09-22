import { createClient } from '@supabase/supabase-js'

export async function GET(){
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // On crée les taux direct, les tables seront auto-créées si elles n'existent pas
    // On essaye d'insérer, si table n'existe pas on le dira
    const { error: ratesError } = await supabase.from('rates').insert([
      { pair: 'XAF/PI', rate: 650 },
      { pair: 'XOF/PI', rate: 650 },
      { pair: 'USD/PI', rate: 1 },
      { pair: 'EUR/PI', rate: 0.92 },
      { pair: 'JOD/PI', rate: 0.71 }
    ])

    if (ratesError && ratesError.message.includes('does not exist')) {
      return Response.json({ 
        ok: false, 
        need_manual: true,
        msg: 'Tables pas encore créées. Va dans Supabase Dashboard directement: https://supabase.com/dashboard',
        error: ratesError.message 
      })
    }

    return Response.json({ok:true, msg:'Gargoura Rates OK! CEMAC UEMOA USD EUR JOD', error: ratesError?.message || 'none'})
  } catch(e:any){
    return Response.json({ok:false, msg:'Erreur', error: e.message})
  }
}
