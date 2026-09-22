export async function POST(req: Request){
 const { phone, amount, operator } = await req.json()
 // ICI on connecte Airtel Money Tchad API
 // Pour l'instant simulation, après tu mets ta clé API Airtel
 console.log(`Retrait ${amount} XAF vers ${phone} via ${operator}`)
 // Exemple vrai Airtel API:
 // await fetch('https://openapiuat.airtel.africa/merchant/v1/moneyTransfer', { method:'POST', body:... })
 return Response.json({ok:true, msg:`Demande de retrait ${amount} XAF envoyée à ${operator}! Agent va vous contacter sur WhatsApp.`})
}
