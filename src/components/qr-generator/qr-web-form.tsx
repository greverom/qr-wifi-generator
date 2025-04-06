"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Globe } from "lucide-react"
import { QrGenerator } from "./qr-generator"

export function QrWebForm() {
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

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <Card className="border border-gray-300 dark:border-border shadow-sm mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Globe className="h-5 w-5" />
            Generador de QR para sitios web
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL del sitio</Label>
              <Input
                id="url"
                name="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (qrGenerado) setQrGenerado(false)
                }}
                placeholder="https://ejemplo.com"
                type="url"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col py-8">
            <Button type="submit" className="w-full py-5">
              Generar código QR
            </Button>

            {qrGenerado && (
              <div className="w-full flex justify-center pt-4">
                <QrGenerator value={url} />
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}