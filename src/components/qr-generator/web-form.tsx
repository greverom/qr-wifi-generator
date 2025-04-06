"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"
import { QrGenerator } from "./qr-generator"
import { useWebForm } from "@/hooks/useWebForm"

export function QrWebForm() {
  const { url, qrGenerado, handleSubmit, handleChange } = useWebForm()

  return (
    <Card className="border border-gray-300 dark:border-border shadow-sm max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-md sm:text-xl">
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
              onChange={(e) => handleChange(e.target.value)}
              placeholder="https://ejemplo.com"
              type="url"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full">
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
  )
}