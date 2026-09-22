        const pay=(amount:any, memo:any)=>{
  const Pi=(window as any).Pi;
  Pi.createPayment({amount, memo, metadata:{memo}}, {
    onReadyForServerApproval: async (id:any)=>{
      await fetch("/api/approve",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id})});
    },
    onReadyForServerCompletion: async (id:any, txid:any)=>{
      await fetch("/api/complete",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId:id, txid})});
      alert("Paiement "+memo+" RÉUSSI! TX:"+txid+" ✅");
    },
    onCancel:()=>{ alert("Annulé"); },
    onError:(e:any)=>{ alert("Erreur: "+e); }
  });
};
