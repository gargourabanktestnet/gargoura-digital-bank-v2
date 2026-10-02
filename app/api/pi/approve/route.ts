import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { paymentId, mode } = await req.json()
  const envMode = mode || process.env.PI_ENV || "testnet"
  const isMainnet = envMode === "mainnet"
  const apiKey = isMainnet ? process.env.PI_API_KEY_MAINNET : process.env.PI_API_KEY_TESTNET
  const apiUrl = isMainnet ? "https://api.minepi.com" : "https://api.test-minepi.com"

  // REPONSE IMMEDIATE pour ne jamais expirer - on appelle Pi en arriere plan
  if (!apiKey || apiKey.startsWith("sk_live") || apiKey.startsWith("sk_test")) {
    console.log("Mode simulation GARGOURA - cle non Pi ou absente")
    return NextResponse.json({ ok: true, simulated: true, mode: envMode })
  }

  // Lancement async sans attendre trop longtemps
  fetch(`${apiUrl}/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: { "Authorization": `Key ${apiKey}` }
  }).then(r=>r.json()).then(d=>console.log("Pi approve OK", d)).catch(e=>console.error(e))

  // On repond tout de suite en moins de 1 seconde - Pi ne va pas expirer
  return NextResponse.json({ ok: true, mode: envMode, fast: true })
}
