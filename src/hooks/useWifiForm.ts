"use client"

import { useState } from "react"
import { toast } from "sonner"

type TipoSeguridad = "WEP" | "WPA" | "nopass"

interface DatosWifi {
  ssid: string
  password: string
  security: TipoSeguridad
}

export function useWifiForm() {
  const [datosWifi, setDatosWifi] = useState<DatosWifi>({
    ssid: "",
    password: "",
    security: "WPA",
  })

  const [qrGenerado, setQrGenerado] = useState(false)

  const necesitaPassword = datosWifi.security !== "nopass"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDatosWifi((prev) => ({ ...prev, [name]: value }))
    if (qrGenerado) setQrGenerado(false)
  }

  const handleSecurityChange = (value: TipoSeguridad) => {
    setDatosWifi((prev) => ({ ...prev, security: value }))
    if (qrGenerado) setQrGenerado(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!datosWifi.ssid.trim()) {
      toast.error("El nombre de la red (SSID) es obligatorio.")
      return
    }

    if (necesitaPassword && !datosWifi.password.trim()) {
      toast.error("La contraseña es obligatoria para redes con seguridad.")
      return
    }

    setQrGenerado(true)
    toast.success("El código QR ha sido generado exitosamente.")
  }

  return {
    datosWifi,
    qrGenerado,
    necesitaPassword,
    handleChange,
    handleSecurityChange,
    handleSubmit,
    setQrGenerado,
  }
}