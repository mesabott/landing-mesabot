"use client"

import { useEffect, useRef } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "En la primera semana confirmamos 12 reservas que antes se perdían porque nadie contestaba en la noche. El sistema se pagó solo.",
    author: "Roberto López",
    business: "Mariscos El Toro, Los Mochis",
    rating: 5,
  },
  {
    quote:
      "Teníamos 3.6 estrellas en Google. A los 45 días con MesaBot llegamos a 4.5. Los clientes sí quieren dejar reseña, solo necesitan que se los pidas bien.",
    author: "Carmen Morales",
    business: "Asadero La Familia, Culiacán",
    rating: 5,
  },
  {
    quote:
      "Mi equipo no tuvo que aprender nada nuevo. El chatbot trabaja solo y nosotros nos enfocamos en atender bien a quienes llegan.",
    author: "Jorge Hernández",
    business: "Rincón Sinaloense, Mazatlán",
    rating: 5,
  },
]

export function Testimonials() {
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
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 relative p-8 rounded-2xl bg-[#0A0A0F] border border-[#2A2F3E] hover:border-[#00C896]/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#00C896]/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#FFB800] text-[#FFB800]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif italic text-lg text-[#F8FAFC] mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <div className="font-heading font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="text-[#64748B] text-sm">{testimonial.business}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
