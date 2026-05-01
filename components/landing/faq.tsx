"use client"

import { useEffect, useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Necesito saber de tecnología?",
    answer:
      "No. Nosotros configuramos todo. Tú solo necesitas revisar tu WhatsApp como siempre. Te damos una capacitación de 1 hora y soporte continuo por WhatsApp si tienes dudas.",
  },
  {
    question: "¿En cuánto tiempo veo resultados?",
    answer:
      "La mayoría de nuestros clientes ven resultados en la primera semana: reservas confirmadas automáticamente, menos mensajes perdidos y las primeras reseñas nuevas en Google. En 30-60 días el impacto es muy notable.",
  },
  {
    question: "¿Qué pasa si el bot no sabe responder algo?",
    answer:
      "El bot está entrenado específicamente para tu restaurante. Si recibe una pregunta muy específica que no puede contestar, te avisa inmediatamente por WhatsApp para que tú respondas personalmente.",
  },
  {
    question: "¿Necesito cambiar mi WhatsApp?",
    answer:
      "No. Usamos WhatsApp Business API que se conecta a tu número actual. Tus clientes siguen escribiendo al mismo número de siempre, solo que ahora tienen respuesta instantánea.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer:
      "Sí. No hay contratos de permanencia. Si después de los 30 días de garantía decides cancelar, solo nos avisas con 15 días de anticipación y listo. Sin letras pequeñas.",
  },
  {
    question: "¿Funciona para varios locales?",
    answer:
      "Sí. Podemos configurar el sistema para múltiples sucursales, cada una con su propia base de datos y configuración. Pregunta por nuestros planes especiales para franquicias.",
  },
]

export function FAQ() {
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
    <section ref={sectionRef} id="faq" className="py-20 sm:py-28 bg-[#0A0A0F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Preguntas frecuentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="animate-on-scroll opacity-0" style={{ animationDelay: "0.1s" }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[#2A2F3E] rounded-xl px-6 bg-[#1A1F2E] data-[state=open]:border-[#00C896]/30"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-white hover:text-[#00C896] hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#64748B] pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
