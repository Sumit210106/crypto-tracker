import CryptoTracker from "@/components/crypto-tracker"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 crypto-gradient-bg py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-crypto-primary to-crypto-secondary bg-clip-text text-transparent">
              Cryptocurrency Market
            </h1>
            <p className="text-muted-foreground mb-6">
              Track real-time prices and market data for top cryptocurrencies
            </p>
            <CryptoTracker />
          </div>
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
