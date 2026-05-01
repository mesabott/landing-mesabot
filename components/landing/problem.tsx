"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Star, Ghost, TrendingDown } from "lucide-react"

const painPoints = [
  {
    icon: MessageCircle,
    title: "Mensajes sin respuesta",
    description: "Clientes que escriben a las 9pm y nadie contesta",
  },
  {
    icon: Star,
    title: "Clientes que no dejan reseña",
    description: "El 94% se va sin comentar",
  },
  {
    icon: Ghost,
    title: "Clientes que no regresan",
    description: "Sin seguimiento se olvidan",
  },
  {
    icon: TrendingDown,
    title: "Sin datos de tus clientes",
    description: "Operas a ciegas",
  },
]

const chatWithout = [
  { sender: "client", message: "Hola, ¿tienen mesa para 4 personas hoy a las 8?" },
  { sender: "client", message: "¿Hola?" },
  { sender: "client", message: "Bueno, voy a buscar otro lugar...", delay: true },
]

const chatWith = [
  { sender: "client", message: "Hola, ¿tienen mesa para 4 personas hoy a las 8?" },
  { sender: "bot", message: "¡Hola! 👋 Claro que sí, tenemos disponibilidad para 4 personas a las 8pm. ¿A nombre de quién reservo?" },
  { sender: "client", message: "Roberto López" },
  { sender: "bot", message: "¡Perfecto Roberto! Tu reserva está confirmada para hoy a las 8pm. Te esperamos 🍽️" },
]

export function Problem() {
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
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Tu restaurante pierde clientes sin que te des cuenta
          </h2>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 p-6 rounded-2xl bg-[#1A1F2E] border border-[#2A2F3E] hover:border-[#FF6B35]/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                {point.title}
              </h3>
              <p className="text-[#64748B] text-sm">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Chat Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Without MesaBot */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: "0.4s" }}>
            <div className="mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FF6B35] rounded-full" />
              <span className="font-heading font-semibold text-white">Sin MesaBot</span>
            </div>
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-[#2A2F3E]">
              <div className="space-y-4">
                {chatWithout.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        msg.sender === "client"
                          ? "bg-[#25D366] text-white rounded-br-md"
                          : "bg-[#2A2F3E] text-[#64748B] rounded-bl-md"
                      } ${msg.delay ? "opacity-60" : ""}`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <span className="text-[#FF6B35] text-sm font-medium">
                    ❌ Cliente perdido
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* With MesaBot */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: "0.5s" }}>
            <div className="mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00C896] rounded-full" />
              <span className="font-heading font-semibold text-white">Con MesaBot</span>
            </div>
            <div className="bg-[#1A1F2E] rounded-2xl p-6 border border-[#00C896]/30 glow-teal">
              <div className="space-y-4">
                {chatWith.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        msg.sender === "client"
                          ? "bg-[#25D366] text-white rounded-br-md"
                          : "bg-[#00C896] text-[#0A0A0F] rounded-bl-md"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <span className="text-[#00C896] text-sm font-medium">
                    ✓ Reserva confirmada en 3 segundos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
