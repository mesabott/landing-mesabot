"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Star, Zap, Calendar } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/526681464573?text=Hola!+Quiero+una+demo+de+MesaBot"

const stats = [
  { icon: Clock, value: "3seg", label: "respuesta" },
  { icon: Star, value: "+30", label: "reseñas/mes" },
  { icon: Zap, value: "24/7", label: "sin intervención" },
  { icon: Calendar, value: "7 días", label: "para activar" },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid-move opacity-50" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C896] rounded-full blur-[150px] opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00C896] rounded-full blur-[120px] opacity-15 animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-on-scroll opacity-0 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1F2E] border border-[#2A2F3E] text-sm text-[#F8FAFC]">
            <span className="w-2 h-2 bg-[#00C896] rounded-full animate-pulse" />
            Disponible en Los Mochis, Sinaloa
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-on-scroll opacity-0 font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6" style={{ animationDelay: "0.1s" }}>
          Tu restaurante
          <br />
          <span className="text-[#00C896]">vendiendo</span>
          <br />
          <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: "2px #00C896" }}>
            24/7
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-lg sm:text-xl text-[#64748B] mb-10" style={{ animationDelay: "0.2s" }}>
          Instalamos inteligencia artificial en tu WhatsApp e Instagram para que respondas clientes, confirmes reservas y acumules reseñas en Google — mientras tú duermes.
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ animationDelay: "0.3s" }}>
          <Button
            asChild
            size="lg"
            className="bg-[#00C896] hover:bg-[#00A87D] text-[#0A0A0F] font-semibold px-8 py-6 text-lg glow-teal"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Ver demo en vivo
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#2A2F3E] bg-transparent text-white hover:bg-[#1A1F2E] hover:text-white px-8 py-6 text-lg"
          >
            <a href="#precios">Ver precios</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto" style={{ animationDelay: "0.4s" }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1A1F2E]/50 border border-[#2A2F3E]"
            >
              <stat.icon className="w-6 h-6 text-[#00C896]" />
              <span className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {stat.value}
              </span>
              <span className="text-sm text-[#64748B]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
