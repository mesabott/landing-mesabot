"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/526681464573?text=Hola!+Quiero+una+demo+de+MesaBot"

const plans = [
  {
    name: "Básico",
    badge: "🥉",
    setup: "$6,000",
    monthly: "$2,500",
    popular: false,
    features: [
      "Chatbot 24/7 WhatsApp",
      "Respuestas Instagram DM",
      "Menú, horarios y ubicación",
      "Captura de datos del cliente",
      "Capacitación 1 hora",
      "Soporte L-V WhatsApp",
    ],
  },
  {
    name: "Crecimiento",
    badge: "🥈",
    setup: "$15,000",
    monthly: "$5,000",
    popular: true,
    features: [
      "Todo Básico +",
      "Reservas automáticas WhatsApp",
      "Reseñas Google automáticas",
      "Reactivación clientes inactivos",
      "Base de datos Google Sheets",
      "Aviso al dueño por WhatsApp",
      "Reporte mensual de métricas",
    ],
  },
  {
    name: "Premium",
    badge: "🥇",
    setup: "$28,000",
    monthly: "$9,000",
    popular: false,
    features: [
      "Todo Crecimiento +",
      "CRM completo con historial",
      "Campañas WhatsApp masivo",
      "Recuperación mesas canceladas",
      "Landing page profesional incluida",
      "Soporte prioritario 7 días",
      "Reporte avanzado mensual",
    ],
  },
]

export function Pricing() {
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
    <section ref={sectionRef} id="precios" className="py-20 sm:py-28 bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Elige el plan que más te conviene
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-on-scroll opacity-0 relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-[#0A0A0F] border-2 border-[#00C896] scale-105 glow-teal"
                  : "bg-[#0A0A0F] border border-[#2A2F3E] hover:border-[#00C896]/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-[#00C896] text-[#0A0A0F] text-sm font-heading font-semibold">
                    ⭐ Más popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <span className="text-4xl mb-2 block">{plan.badge}</span>
                <h3 className="font-heading font-bold text-2xl text-white mb-4">
                  {plan.name}
                </h3>
                <div className="space-y-1">
                  <div className="text-[#64748B] text-sm">
                    <span className="text-white font-semibold">{plan.setup}</span> setup
                  </div>
                  <div className="text-[#00C896]">
                    <span className="text-3xl font-heading font-bold">{plan.monthly}</span>
                    <span className="text-lg">/mes</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00C896] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F8FAFC] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className={`w-full ${
                  plan.popular
                    ? "bg-[#00C896] hover:bg-[#00A87D] text-[#0A0A0F]"
                    : "bg-[#2A2F3E] hover:bg-[#3A3F4E] text-white"
                } font-semibold py-6`}
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Empezar ahora
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee Note */}
        <div className="animate-on-scroll opacity-0 text-center mt-12" style={{ animationDelay: "0.3s" }}>
          <span className="inline-flex items-center gap-2 text-[#64748B]">
            🛡️ Todos incluyen garantía de 30 días
          </span>
        </div>
      </div>
    </section>
  )
}
