export default function BasicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
}
