"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/526681464573?text=Hola!+Quiero+una+demo+de+MesaBot"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white text-[#0A0A0F] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium text-sm">
          ¡Habla con nosotros!
          <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      </div>

      {/* Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg transition-all duration-300 animate-pulse-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </a>
    </div>
  )
}
