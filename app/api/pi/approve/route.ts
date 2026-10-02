import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { paymentId, mode } = await req.json() // mode = "testnet" ou "mainnet"
    const envMode = mode || process.env.PI_ENV || "testnet"
    
    const isMainnet = envMode === "mainnet"
    const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
    const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

    console.log(`[GARGOURA DIGITAL BANK] Approve ${envMode.toUpperCase()} ${paymentId}`)

    if (!apiKey) {
      return NextResponse.json({ ok: true, simulated: true, mode: envMode, msg: `Mode ${envMode} simulé - Ajoute la clé dans Vercel` })
    }

    const piRes = await fetch(`${apiUrl}/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" }
    })
    const piData = await piRes.json()

    if (!piRes.ok) return NextResponse.json({ error: "Pi approve failed", piData, mode: envMode }, { status: 500 })

    return NextResponse.json({ ok: true, mode: envMode, piData })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
