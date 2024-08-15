export default function BasicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-[7rem]">{children}</div>
    </>
  );
}
