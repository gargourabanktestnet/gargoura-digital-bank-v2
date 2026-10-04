export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { paymentId, txid, mode } = await req.json()
    const envMode = (mode || process.env.PI_ENV || "testnet").toLowerCase()
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`[GARGOURA] Complete ${envMode.toUpperCase()} ${paymentId} ${txid}`)

    if (!apiKey) {
      console.log("[GARGOURA] No API key, simulated complete")
      return new Response(JSON.stringify({ ok: true, simulated: true, mode: envMode }), { status: 200, headers: { "Content-Type": "application/json" } })
    }

    const piRes = await fetch(`${apiUrl}/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ txid })
    })
    const piData = await piRes.json()

    if (!piRes.ok) {
      console.error("[GARGOURA] Pi complete failed", piData)
      return new Response(JSON.stringify({ error: piData }), { status: piRes.status, headers: { "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({ ok: true, mode: envMode, piData }), { status: 200, headers: { "Content-Type": "application/json" } })

  } catch (e: any) {
    console.error("[GARGOURA] Complete error", e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
