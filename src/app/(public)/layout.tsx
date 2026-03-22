import { TickerStrip } from '@/components/navigation/TickerStrip'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TickerStrip />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
