export default function BasicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen pt-[7.5rem]">{children}</div>
    </>
  );
}
