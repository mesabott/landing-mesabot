"use client"

import { useEffect, useRef } from "react"

const metrics = [
  {
    value: "3seg",
    label: "Tiempo de respuesta",
    before: "antes: horas",
  },
  {
    value: "15-30",
    label: "Reseñas nuevas en Google por mes",
    before: "",
  },
  {
    value: "10-20",
    label: "Clientes reactivados por campaña",
    before: "",
  },
  {
    value: "8-15",
    label: "Reservas recuperadas que se perdían",
    before: "",
  },
]

export function Results() {
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
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[#00C896] rounded-full blur-[200px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Lo que pasa en los primeros 60 días
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 text-center p-6 sm:p-8 rounded-2xl bg-[#1A1F2E]/50 border border-[#2A2F3E] backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#00C896] mb-3">
                {metric.value}
              </div>
              <div className="text-[#F8FAFC] text-sm sm:text-base mb-2">
                {metric.label}
              </div>
              {metric.before && (
                <div className="text-[#64748B] text-xs sm:text-sm">
                  ({metric.before})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
