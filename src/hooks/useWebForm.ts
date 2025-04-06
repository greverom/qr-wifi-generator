"use client"

import { useState } from "react"
import { toast } from "sonner"

export function useWebForm() {
  const [url, setUrl] = useState("")
  const [qrGenerado, setQrGenerado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      toast.error("La URL es obligatoria.")
      return
    }

    try {
      new URL(url)
    } catch {
      toast.error("Ingresa una URL válida (ej: https://...)")
      return
    }

    setQrGenerado(true)
    toast.success("QR de la página generado correctamente.")
  }

  const handleChange = (value: string) => {
    setUrl(value)
    if (qrGenerado) setQrGenerado(false)
  }

  return {
    url,
    qrGenerado,
    handleChange,
    handleSubmit,
  }
}