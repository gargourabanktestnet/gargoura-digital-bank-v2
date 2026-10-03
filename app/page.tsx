"use client"
import { useState, useEffect } from "react"
import MomoManuel from "@/components/MomoManuel"

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [piReady, setPiReady] = useState(false)
  const [paying, setPaying] = useState(false)
  const [piMode, setPiMode] = useState<"mainnet" | "testnet">("mainnet")
  const [piAmount, setPiAmount] = useState("0.00025")
  const [username, setUsername] = useState("")

  // Charger le mode et username sauvegardé
  useEffect(() => {
    const savedMode = localStorage.getItem("gdb_pi_mode") as any
    if(savedMode) setPiMode(savedMode)
    const savedUser = localStorage.getItem("gdb_username")
    if(savedUser) setUsername(savedUser)
  }, [])

  useEffect(() => {
    localStorage.setItem("gdb_pi_mode", piMode)
  }, [piMode])

  // Charger Pi SDK
  useEffect(() => {
    const loadPi = () => {
      if (typeof window!== "undefined" && window.Pi) {
        window.Pi.init({ version: "2.0", sandbox: piMode === "testnet" })
        setPiReady(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://sdk.minepi.com/pi-sdk.js"
      script.onload = () => {
        if (window.Pi) {
          window.Pi.init({ version: "2.0", sandbox: piMode === "testnet" })
          setPiReady(true)
        }
      }
      document.head.appendChild(script)
    }
    loadPi()
  }, [])

  // Re-init quand on change de mode
  useEffect(() => {
    if (typeof window!== "undefined" && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: piMode === "testnet" })
    }
  }, [piMode])

  const handlePiPayment = async () => {
    if (paying) return
    setPaying(true)
    try {
      if (typeof window === "undefined" ||!window.Pi) {
        alert("Ouvre dans Pi Browser")
        setPaying(false)
        return
      }

      const cleanAmount = parseFloat(piAmount)
      if (isNaN(cleanAmount) || cleanAmount < 0.0000001) {
        alert("Montant invalide, min 0.0000001 Pi")
        setPaying(false)
        return
      }

      const scopes = ["payments", "username", "wallet_address"]
      const auth = await window.Pi.authenticate(scopes, () => {})
      if(auth?.user?.username){
        setUsername(auth.user.username)
        localStorage.setItem("gdb_username", auth.user.username)
      }

      await window.Pi.createPayment(
        {
          amount: cleanAmount,
          memo: `Gargoura recharge ${cleanAmount} Pi`,
          metadata: { mode: piMode, amount: cleanAmount, username: auth?.user?.username },
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            console.log("[GARGOURA] Approve", paymentId, piMode)
            const res = await fetch("/api/pi/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, mode: piMode }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Approve failed")
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            console.log("[GARGOURA] Complete", paymentId, txid)
            const res = await fetch("/api/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid, mode: piMode }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Complete failed")
            alert(`Paiement réussi! ${cleanAmount} Pi crédités`)
          },
          onCancel: (paymentId: string) => {
            console.log("Cancelled", paymentId)
            setPaying(false)
          },
          onError: (error: any) => {
            console.error("Pi Error", error)
            alert("Erreur Pi: " + error.message)
            setPaying(false)
          },
        }
      )
    } catch (e: any) {
      console.error(e)
      alert(e.message)
    } finally {
      setPaying(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Gargoura Digital Bank</h1>
      <p className="text-center text-xs text-gray-400 mb-4">N'Djamena → International</p>

      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setPiMode("mainnet")}
          className={`px-3 py-1 rounded text-xs ${piMode === "mainnet"? "bg-green-600" : "bg-white/10"}`}
        >
          MAINNET
        </button>
        <button
          onClick={() => setPiMode("testnet")}
          className={`px-3 py-1 rounded text-xs ${piMode === "testnet"? "bg-orange-600" : "bg-white/10"}`}
        >
          TESTNET
        </button>
        <span className="text-xs py-1 text-gray-400">Pi Ready: {piReady? "✅" : "⏳"}</span>
      </div>

      {username && <p className="text-xs text-center mb-3">Connecté: @{username}</p>}

      <div className="border border-white/10 p-4 rounded-xl bg-white/5">
        <label className="text-xs text-gray-300">Montant Pi (microns autorisés)</label>
        <input
          type="number"
          step="0.0000001"
          min="0.0000001"
          value={piAmount}
          onChange={(e) => setPiAmount(e.target.value)}
          className="w-full mt-1 mb-3 p-2 rounded bg-black border border-white/20 text-white"
          placeholder="0.00025"
        />
        <div className="grid grid-cols-4 gap-2 mb-3">
          {["0.00025", "0.0015", "0.01", "1"].map((v) => (
            <button key={v} onClick={() => setPiAmount(v)} className="text-xs py-1 bg-white/10 rounded hover:bg-white/20">
              {v}
            </button>
          ))}
        </div>

        <button
          onClick={handlePiPayment}
          disabled={!piReady || paying}
          className="w-full bg-[#7C3AED] text-white font-bold py-3 rounded-xl disabled:opacity-50"
        >
          {paying? "Paiement en cours..." : `Payer ${piAmount} Pi en ${piMode.toUpperCase()}`}
        </button>
      </div>

      <MomoManuel />

      <p className="text-[10px] text-gray-600 text-center mt-6">
        Mode: {piMode} | Sandbox: {piMode === "testnet"? "true" : "false"}
      </p>
    </main>
  )
}
