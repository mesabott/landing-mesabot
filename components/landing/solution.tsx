"use client"

import { useEffect, useRef } from "react"
import { Bot, Calendar, Star, Bell, Database, Globe, Check } from "lucide-react"

const benefits = [
  "Sin contratar programadores",
  "Sin cambiar tu forma de trabajar",
  "Capacitación incluida (1 hora)",
  "Soporte por WhatsApp incluido",
  "Garantía de 30 días",
  "Activo en 7 días hábiles",
]

const services = [
  {
    icon: Bot,
    title: "Chatbot IA 24/7",
    description: "Responde preguntas, menú, horarios y ubicación automáticamente",
  },
  {
    icon: Calendar,
    title: "Reservas Automáticas",
    description: "Tus clientes reservan mesa directo por WhatsApp",
  },
  {
    icon: Star,
    title: "Reseñas en Piloto",
    description: "Solicita reseñas en Google después de cada visita",
  },
  {
    icon: Bell,
    title: "Reactivación de Clientes",
    description: "Contacta clientes que no han regresado",
  },
  {
    icon: Database,
    title: "CRM y Base de Datos",
    description: "Todos los datos de tus clientes organizados",
  },
  {
    icon: Globe,
    title: "Landing Page Pro",
    description: "Página web profesional para tu restaurante",
  },
]

export function Solution() {
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
    <section ref={sectionRef} id="servicios" className="py-20 sm:py-28 bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Un sistema que trabaja mientras tú no
          </h2>
        </div>

        {/* Benefits Checklist */}
        <div className="animate-on-scroll opacity-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#0A0A0F]/50"
            >
              <div className="w-6 h-6 rounded-full bg-[#00C896]/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-[#00C896]" />
              </div>
              <span className="text-[#F8FAFC] text-sm sm:text-base">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 group p-6 rounded-2xl bg-[#0A0A0F] border border-[#2A2F3E] hover:border-[#00C896]/50 hover:glow-teal transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#00C896]/10 flex items-center justify-center mb-5 group-hover:bg-[#00C896]/20 transition-colors">
                <service.icon className="w-7 h-7 text-[#00C896]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">
                {service.title}
              </h3>
              <p className="text-[#64748B]">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
