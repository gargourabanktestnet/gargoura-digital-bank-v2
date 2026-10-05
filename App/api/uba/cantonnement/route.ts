export async function POST(req: Request) {
  const { piAmount, valueType, xafCantonne, usdRef, dest, zone, walletMainnet } = await req.json()

  // TRIPLE VALEUR - LOGIQUE COBAC SAFE
  // GCV 314159$ = NON cantonnée - Interne seulement
  if (valueType === 'GCV') {
    console.log(`[GCV NON COMPTABLE] ${piAmount} Pi = ${piAmount*314159}$ - Pas de cantonnement UBA`)
    return Response.json({ status: 'internal_gcv', cantonne: 0, note: 'GCV interne non cantonnée - COBAC safe' })
  }

  // MARCHÉ 0.30$ + MARCHAND libre = CANTONNÉ UBA Tchad - Légal BEAC
  const ubaPayload = {
    account: process.env.UBA_CANTONNEMENT_ACCOUNT || 'UBA Tchad - A obtenir',
    amount: xafCantonne,
    currency: 'XAF',
    ref: `GARGOURA ${valueType} ${piAmount}Pi -> ${dest} ${zone} - Wallet ${walletMainnet}`,
    valueType,
    usdRef,
    legalText: "Cantonnement Pièce 17 COBAC - Valeur Marché 0.30$ BEAC ou Valeur Marchand - GCV non cantonnée"
  }

  // Appel API UBA Tchad - À brancher avec ta clé UBA
  // await fetch('https://api.ubatd.com/cantonnement', { method:'POST', body: JSON.stringify(ubaPayload) })

  return Response.json({ status: 'cantonne_uba',...ubaPayload, bank: 'UBA Tchad', mainWallet: walletMainnet })
}
