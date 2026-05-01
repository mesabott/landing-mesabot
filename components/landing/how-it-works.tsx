"use client"

import { useEffect, useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Cliente escribe",
    description: "Un cliente te envía mensaje por WhatsApp o Instagram",
  },
  {
    number: "02",
    title: "IA responde",
    description: "El chatbot responde en 3 segundos con información precisa",
  },
  {
    number: "03",
    title: "Datos guardados",
    description: "Nombre, teléfono y preferencias se guardan automáticamente",
  },
  {
    number: "04",
    title: "Tú recibes aviso",
    description: "Te llega notificación al celular de la nueva reserva",
  },
  {
    number: "05",
    title: "Reseña automática",
    description: "24h después el sistema pide reseña en Google",
  },
]

export function HowItWorks() {
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
    <section ref={sectionRef} id="como-funciona" className="py-20 sm:py-28 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Así funciona — paso a paso
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00C896] via-[#00C896]/50 to-[#00C896]/10" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`animate-on-scroll opacity-0 relative lg:flex lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Card */}
                <div
                  className={`lg:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left"
                  }`}
                >
                  <div className="p-6 rounded-2xl bg-[#1A1F2E] border border-[#2A2F3E] hover:border-[#00C896]/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] text-sm font-heading font-semibold mb-3">
                      PASO {step.number}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#64748B]">{step.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00C896] border-4 border-[#0A0A0F]" />

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
