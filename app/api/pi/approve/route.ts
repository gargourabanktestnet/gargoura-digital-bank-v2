export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { paymentId, mode } = await req.json()
    const envMode = (mode || "testnet").toLowerCase()
    const isMainnet = envMode === "mainnet"
    
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`GDB APPROVE ${envMode} ${paymentId} key:${apiKey ? apiKey.slice(0,8)+"..." : "MANQUANTE"}`)

    if (!apiKey) {
      // Pas de clé = on simule pour former sans expirer
      return new Response(JSON.stringify({ ok: true, simulated: true, mode: envMode }), { status: 200, headers: { "Content-Type": "application/json" } })
    }

    // LANCE L'APPROVE SANS ATTENDRE - c'est ça qui sauve
    fetch(`${apiUrl}/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        "Authorization": `Key ${apiKey}`,
        "Content-Type": "application/json"
      }
    }).then(async r => {
      const d = await r.text()
      console.log("Pi approve result:", r.status, d)
    }).catch(e => console.error("Pi approve error", e))

    // REPONSE IMMEDIATE <300ms - Pi Browser ne voit plus "expiré"
    return new Response(JSON.stringify({ ok: true, mode: envMode, fast: true }), { status: 200, headers: { "Content-Type": "application/json" } })

  } catch (e: any) {
    console.error(e)
    return new Response(JSON.stringify({ error: e.message }), { status: 200 })
  }
}
