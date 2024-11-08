export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='uz'>
      <body>
        {children}
      </body>
    </html>
  );
}
