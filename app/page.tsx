import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Ticker } from "@/components/landing/ticker"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Pricing } from "@/components/landing/pricing"
import { Results } from "@/components/landing/results"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTAFinal } from "@/components/landing/cta-final"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"
import { MesaBotChat } from "@/components/landing/mesabot-chat"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <Hero />
      <Ticker />
      <Problem />
      <Solution />
      <HowItWorks />
      <Pricing />
      <Results />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
      <WhatsAppButton />
      <MesaBotChat />
    </main>
  )
}
