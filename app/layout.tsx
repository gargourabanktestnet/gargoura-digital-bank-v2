export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
      </head>
      <body style={{margin:0, fontFamily:'sans-serif'}}>{children}</body>
    </html>
  );
}
