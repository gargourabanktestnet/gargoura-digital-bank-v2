export const runtime = 'nodejs' // <-- PLUS edge, met nodejs

export async function POST(req: Request) {
  try {
    const { paymentId, mode } = await req.json()
    const envMode = (mode || process.env.PI_ENV || "testnet").toLowerCase()
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`[GARGOURA] Approve ${envMode.toUpperCase()} ${paymentId} KeyExists:${!!apiKey}`)

    if (!apiKey) {
      console.error("[GARGOURA] API KEY MANQUANTE pour", envMode)
      return new Response(JSON.stringify({ error: "API_KEY_MISSING", mode: envMode }), { status: 500 })
    }

    const piRes = await fetch(`${apiUrl}/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
    })
    const piData = await piRes.json()
    console.log(`[GARGOURA] Pi Response ${piRes.status}`, piData)

    if (!piRes.ok) {
      return new Response(JSON.stringify({ error: "Pi approve failed", piData }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true, mode: envMode }), { status: 200 })
  } catch (e:any) {
    console.error("[GARGOURA] Approve crash", e)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
