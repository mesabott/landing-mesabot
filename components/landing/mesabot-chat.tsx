"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Bot, X, Send, Minimize2, Maximize2, GripHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

function getUIMessageText(msg: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function MesaBotChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [input, setInput] = useState("")
  const [hasInitialized, setHasInitialized] = useState(false)
  
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isStreaming = status === "streaming" || status === "submitted"

  // Initialize position on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !hasInitialized) {
      setPosition({
        x: window.innerWidth - 420,
        y: window.innerHeight - 600,
      })
      setHasInitialized(true)
    }
  }, [hasInitialized])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle mouse move for dragging
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && chatRef.current) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        
        // Keep within viewport bounds
        const maxX = window.innerWidth - chatRef.current.offsetWidth
        const maxY = window.innerHeight - chatRef.current.offsetHeight
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        })
      }
    },
    [isDragging, dragOffset]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isStreaming) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#00A87D] shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow group"
        aria-label="Abrir chat de MesaBot"
      >
        <Bot className="w-8 h-8 text-[#0A0A0F] group-hover:scale-110 transition-transform" />
        
        {/* Notification badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-bounce">
          1
        </span>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white text-[#0A0A0F] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium text-sm">
            Pregunta lo que quieras
            <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <div
      ref={chatRef}
      className="fixed z-50 flex flex-col bg-[#0A0A0F] rounded-2xl border border-[#2A2F3E] shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? "300px" : "380px",
        height: isMinimized ? "60px" : "500px",
        cursor: isDragging ? "grabbing" : "auto",
        transition: isDragging ? "none" : "width 0.3s, height 0.3s",
      }}
    >
      {/* Header - Draggable */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#00C896] to-[#00A87D] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-sm">MesaBot Assistant</h3>
            <p className="text-white/70 text-xs">
              {isStreaming ? "Escribiendo..." : "En linea"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <GripHorizontal className="w-4 h-4 text-white/50 mr-2" />
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label={isMinimized ? "Maximizar" : "Minimizar"}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-white" />
            ) : (
              <Minimize2 className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Cerrar chat"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#12151F]">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00C896]/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-[#00C896]" />
                </div>
                <div className="bg-[#1A1F2E] rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    Hola! Soy el asistente de MesaBot. Estoy aqui para ayudarte a conocer como podemos automatizar tu restaurante con IA. Pregunta lo que quieras sobre nuestros servicios, precios o cualquier duda que tengas.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getUIMessageText(message)
              if (!text) return null
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-[#FF6B35]/20"
                        : "bg-[#00C896]/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <span className="text-[#FF6B35] text-sm font-bold">Tu</span>
                    ) : (
                      <Bot className="w-5 h-5 text-[#00C896]" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                      message.role === "user"
                        ? "bg-[#00C896] text-[#0A0A0F] rounded-tr-none"
                        : "bg-[#1A1F2E] text-[#F8FAFC] rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {text}
                    </p>
                  </div>
                </div>
              )
            })}
            
            {/* Loading indicator */}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00C896]/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-[#00C896]" />
                </div>
                <div className="bg-[#1A1F2E] rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#00C896] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#00C896] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#00C896] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-[#0A0A0F] border-t border-[#2A2F3E]"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-3 bg-[#1A1F2E] border border-[#2A2F3E] rounded-xl text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#00C896] transition-colors"
                disabled={isStreaming}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="px-4 py-3 bg-[#00C896] hover:bg-[#00A87D] text-[#0A0A0F] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
