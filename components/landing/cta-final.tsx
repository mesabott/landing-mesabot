"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/526683233902?text=Hola!+Quiero+una+demo+de+MesaBot"

export function CTAFinal() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#0A0A0F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C896] rounded-full blur-[250px] opacity-25" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
          ¿Listo para llenar
          <br />
          <span className="text-[#00C896]">más mesas?</span>
        </h2>

        <p className="animate-on-scroll opacity-0 text-lg sm:text-xl text-[#64748B] mb-10 max-w-2xl mx-auto" style={{ animationDelay: "0.1s" }}>
          Agenda una demo gratuita de 15 minutos. Te mostramos el sistema en vivo para tu restaurante.
        </p>

        <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.2s" }}>
          <Button
            asChild
            size="lg"
            className="bg-[#00C896] hover:bg-[#00A87D] text-[#0A0A0F] font-semibold px-8 py-6 text-lg glow-teal-lg"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Agendar demo gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#2A2F3E] bg-transparent text-white hover:bg-[#1A1F2E] hover:text-white px-8 py-6 text-lg"
          >
            <a href="tel:+526683233902">
              <Phone className="mr-2 h-5 w-5" />
              Llamar ahora
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
