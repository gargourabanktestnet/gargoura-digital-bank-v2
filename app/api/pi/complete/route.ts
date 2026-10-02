import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { paymentId, txid, mode } = await req.json()
    const envMode = mode || process.env.PI_ENV || "testnet"
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`[GARGOURA DIGITAL BANK] Complete ${envMode.toUpperCase()} ${paymentId} ${txid}`)

    if (!apiKey) {
      return NextResponse.json({ ok: true, simulated: true, mode: envMode })
    }

    const piRes = await fetch(`${apiUrl}/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ txid })
    })
    const piData = await piRes.json()
    return NextResponse.json({ ok: true, mode: envMode, piData })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
