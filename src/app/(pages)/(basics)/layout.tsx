export default function BasicPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="md:pt-20 pt-52 container"><div className="min-h-screen">{children}
    </div></section>
}