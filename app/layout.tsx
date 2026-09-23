export default function RootLayout({children}:{children:React.ReactNode}){
 return(
  <html lang="fr">
   <head>
    <script src="https://sdk.minepi.com/pi-sdk.js"></script>
   </head>
   <body style={{margin:0, background:'#0f172a'}}>{children}</body>
  </html>
 )
}
