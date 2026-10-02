export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { paymentId, txid, mode } = await req.json()
    const envMode = (mode || process.env.PI_ENV || "testnet").toLowerCase()
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`[GARGOURA] Complete ${envMode.toUpperCase()} ${paymentId} ${txid} KeyExists:${!!apiKey}`)

    if (!apiKey) {
      console.error("[GARGOURA] API KEY MANQUANTE pour", envMode)
      return new Response(JSON.stringify({ error: "API_KEY_MISSING" }), { status: 500 })
    }

    const piRes = await fetch(`${apiUrl}/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ txid })
    })
    const piData = await piRes.json()
    console.log(`[GARGOURA] Complete Pi Response ${piRes.status}`, piData)

    if (!piRes.ok) {
      return new Response(JSON.stringify({ error: "Pi complete failed", piData }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true, mode: envMode, piData }), { status: 200 })
  } catch (e:any) {
    console.error("[GARGOURA] Complete crash", e)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
