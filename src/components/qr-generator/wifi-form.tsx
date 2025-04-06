"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wifi } from "lucide-react"
import { QrGenerator } from "./qr-generator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use.toast"


type TipoSeguridad = "WEP" | "WPA" | "nopass"

interface DatosWifi {
  ssid: string
  password: string
  security: TipoSeguridad
}

export function WifiForm() {
  const [datosWifi, setDatosWifi] = useState<DatosWifi>({
    ssid: "",
    password: "",
    security: "WPA",
  })

  const [qrGenerado, setQrGenerado] = useState(false)

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
      toast({
        title: "Campo requerido",
        description: "El nombre de la red (SSID) es obligatorio.",
        variant: "destructive",
      })
      return
    }

    if (datosWifi.security !== "nopass" && !datosWifi.password.trim()) {
      toast({
        title: "Campo requerido",
        description: "La contraseña es obligatoria para redes con seguridad.",
        variant: "destructive",
      })
      return
    }

    setQrGenerado(true)

    toast({
      title: "QR generado",
      description: "El código QR ha sido generado exitosamente.",
    })
  }

  const necesitaPassword = datosWifi.security !== "nopass"

  return (
    <Card className="border border-gray-300 dark:border-border shadow-sm max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Wifi className="h-5 w-5" />
          Detalles de la conexión WiFi
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ssid">Nombre de la red (SSID)</Label>
            <Input
              id="ssid"
              name="ssid"
              value={datosWifi.ssid}
              onChange={handleChange}
              placeholder="Ingresa el nombre de la red"
              required
            />
          </div>

          {/* Seguridad */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de seguridad</Label>
            <RadioGroup
              value={datosWifi.security}
              onValueChange={(value) => handleSecurityChange(value as TipoSeguridad)}
              className="flex flex-col gap-3 pt-1"
            >
              {/* WPA */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="WPA"
                  id="wpa"
                  className="h-5 w-5 rounded-full border border-muted-foreground 
                  peer-checked:border-primary 
                  peer-checked:ring-2 peer-checked:ring-primary 
                  flex items-center justify-center transition"
                />
                <Label htmlFor="wpa" className="cursor-pointer">
                  WPA/WPA2
                </Label>
              </div>

              {/* WEP */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="WEP"
                  id="wep"
                  className="h-5 w-5 rounded-full border border-muted-foreground 
                  peer-checked:border-primary 
                  peer-checked:ring-2 peer-checked:ring-primary 
                  flex items-center justify-center transition"
                />
                <Label htmlFor="wep" className="cursor-pointer">
                  WEP
                </Label>
              </div>

              {/* Sin contraseña */}
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="nopass"
                  id="nopass"
                  className="h-5 w-5 rounded-full border border-muted-foreground 
                  peer-checked:border-primary 
                  peer-checked:ring-2 peer-checked:ring-primary 
                  flex items-center justify-center transition"
                />
                <Label htmlFor="nopass" className="cursor-pointer">
                  Sin contraseña
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contraseña (si aplica) */}
          {necesitaPassword && (
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={datosWifi.password}
                onChange={handleChange}
                placeholder="Ingresa la contraseña"
                required={necesitaPassword}
              />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col py-8">
          <Button type="submit" className="w-full">
            Generar código QR
          </Button>

          {qrGenerado && (
            <div className="w-full flex justify-center pt-4">
              <QrGenerator wifiData={datosWifi} />
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}