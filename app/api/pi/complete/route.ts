export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { paymentId, txid, mode } = await req.json()
    const envMode = (mode || "testnet").toLowerCase()
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    if (apiKey) {
      fetch(`${apiUrl}/v2/payments/${paymentId}/complete`, {
        method: "POST",
        headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ txid })
      }).catch(()=>{})
    }

    return new Response(JSON.stringify({ ok: true, mode: envMode }), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (e:any) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }
}
