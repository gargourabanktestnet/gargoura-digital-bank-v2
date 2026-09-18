import express from "express";
import fs from "fs";
const app = express();
const PI_API_KEY = (process.env.PI_API_KEY || "").trim();
const PI_API_URL = "https://api.minepi.com";
const IS_SANDBOX = false; // FORCE MAINNET SUR VERCEL
app.use(express.json());

// Sur Vercel on stocke dans /tmp
const DB_FILE = "/tmp/gargoura-db.json";
let db = { balances: {}, history: [] };
try { if (fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")); } catch(e){}
function saveDB(){ try{ fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }catch(e){} }

app.get("/api", (req,res)=> res.json({ok:true, mainnet:true, users:Object.keys(db.balances).length}));
app.get("/api/balance/:username", (req,res)=>{
  const u = req.params.username;
  res.json({username:u, balance: db.balances[u] || 0, history: db.history.filter(h=>h.username===u || h.to===u)});
});
app.post("/api/transfer", (req,res)=>{
  const {from,to,amount,memo} = req.body;
  const amt = parseFloat(amount);
  if(!db.balances[from] || db.balances[from] < amt) return res.json({ok:false, error:"Solde insuffisant"});
  db.balances[from]-=amt; if(!db.balances[to]) db.balances[to]=0; db.balances[to]+=amt;
  const tx = {type:"transfer", username:from, to, amount:amt, memo:memo||"Transfert", date:new Date(), txid:"GDB-"+Date.now()};
  db.history.push(tx); saveDB(); res.json({ok:true, tx, newBalance:db.balances[from]});
});
app.post("/api/approve", async (req,res)=>{
  try{ const r = await fetch(PI_API_URL + "/v2/payments/" + req.body.paymentId + "/approve", {method:"POST", headers:{"Authorization":"Key "+PI_API_KEY}}); const data = await r.json(); res.json(r.ok?{ok:true,data}:{ok:false,data}); }catch(e){ res.status(500).json({ok:false, error:e.message}); }
});
app.post("/api/complete", async (req,res)=>{
  try{
    const {paymentId,txid,username} = req.body;
    const r = await fetch(PI_API_URL + "/v2/payments/" + paymentId + "/complete", {method:"POST", headers:{"Authorization":"Key "+PI_API_KEY, "Content-Type":"application/json"}, body:JSON.stringify({txid})});
    const data = await r.json();
    if(r.ok){ const amt = data.amount || 1; const user = username || "anonymous"; if(!db.balances[user]) db.balances[user]=0; db.balances[user]+=amt; db.history.push({type:"deposit", username:user, amount:amt, memo:data.memo, txid, date:new Date(), paymentId}); saveDB(); }
    res.json(r.ok?{ok:true,data}:{ok:false,data});
  }catch(e){ res.status(500).json({ok:false, error:e.message}); }
});
app.get("/", (req,res)=>{
  res.send('<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Gargoura V4 MAINNET</title><script src="https://sdk.minepi.com/pi-sdk.js"></script><style>body{font-family:sans-serif;padding:15px;max-width:520px;margin:auto;background:#e8f5e9}.card{background:white;padding:18px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,.08);margin-bottom:12px}.solde{font-size:34px;font-weight:bold;color:#2e7d32}button{background:#2e7d32;color:white;border:none;padding:12px;border-radius:10px;width:100%;font-size:15px;margin-top:8px}.secondary{background:#c8e6c9;color:#1b5e20}input{width:100%;padding:12px;border:1px solid #ddd;border-radius:10px;margin-top:8px;box-sizing:border-box}.tx{border-bottom:1px solid #eee;padding:10px 0;font-size:13px}</style></head><body><div class="card"><span style="padding:6px 10px;border-radius:6px;background:#d4edda;font-weight:bold">MODE MAINNET - Vrai Pi</span><div style="margin-top:10px">Bienvenue <b id="user">...</b></div><div>Solde Gargoura</div><div class="solde" id="balance">0.00 Pi</div><button id="pay">+ Deposer 1 Pi</button><p id="s"></p></div><div class="card"><h3>Transfert interne</h3><input id="toUser" placeholder="Username destinataire"/><input id="amount" type="number" step="0.01" placeholder="Montant"/><input id="memo" placeholder="Note"/><button id="transferBtn" class="secondary">Envoyer (0 frais)</button><p id="tStatus"></p></div><div class="card"><h3>Historique</h3><div id="hist">...</div><button id="refresh" class="secondary">Rafraichir</button></div><script>let currentUser=null; Pi.init({version:"2.0",sandbox:false}); async function init(){try{const auth=await Pi.authenticate(["payments","username"],function(){}); currentUser=auth.user.username; document.getElementById("user").innerText=currentUser; loadBalance();}catch(e){document.getElementById("user").innerText="Ouvre dans Pi Browser";}} async function loadBalance(){if(!currentUser)return; const r=await fetch("/api/balance/"+currentUser); const d=await r.json(); document.getElementById("balance").innerText=d.balance.toFixed(2)+" Pi"; const h=document.getElementById("hist"); if(d.history.length==0)h.innerHTML="<i>Aucune tx</i>"; else h.innerHTML=d.history.slice().reverse().map(function(x){return \'<div class="tx"><b>\'+x.amount+" Pi</b> - "+x.memo+"<br><small>"+new Date(x.date).toLocaleString()+" | "+x.type+"</small></div>";}).join("");} document.getElementById("pay").onclick=async function(){try{await Pi.createPayment({amount:1,memo:"Depot Gargoura Mainnet",metadata:{type:"deposit"}},{onReadyForServerApproval:async function(id){await fetch("/api/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId:id})});},onReadyForServerCompletion:async function(id,txid){const r=await fetch("/api/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId:id,txid:txid,username:currentUser})}); const d=await r.json(); document.getElementById("s").innerText=d.ok?"Depot reussi!":"Erreur"; loadBalance();},onCancel:function(){},onError:function(e){document.getElementById("s").innerText=e;}});}catch(e){document.getElementById("s").innerText=e.message;}}; document.getElementById("transferBtn").onclick=async function(){const to=document.getElementById("toUser").value; const amt=document.getElementById("amount").value; const memo=document.getElementById("memo").value; const r=await fetch("/api/transfer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:currentUser,to:to,amount:amt,memo:memo})}); const d=await r.json(); document.getElementById("tStatus").innerText=d.ok?"Envoye!":"Erreur: "+d.error; if(d.ok)loadBalance();}; document.getElementById("refresh").onclick=loadBalance; init();<\/script><\/body><\/html>');
});

export default app;
