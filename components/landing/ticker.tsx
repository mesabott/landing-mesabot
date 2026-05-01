export function Ticker() {
  const items = [
    "Chatbot WhatsApp 24/7",
    "Reservas Automáticas",
    "Reseñas Google en Piloto",
    "Reactivación de Clientes",
    "Landing Page para Restaurantes",
    "Sin necesidad de programar",
  ]

  return (
    <div className="bg-gradient-coral py-4 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="flex items-center mx-8 text-white font-heading font-semibold text-sm sm:text-base"
          >
            <span className="mr-4">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
