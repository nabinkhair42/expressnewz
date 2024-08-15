export default function BasicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen mt-[7rem]">{children}</div>
    </>
  );
}
