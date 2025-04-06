"use client"

import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"

interface WifiData {
  ssid: string
  password: string
  security: "WEP" | "WPA" | "nopass"
}

interface QrGeneratorProps {
  wifiData?: WifiData
  value?: string
}

export function QrGenerator({ wifiData, value }: QrGeneratorProps) {
  const [qrValue, setQrValue] = useState("")

  useEffect(() => {
    if (value) {
      setQrValue(value)
      return
    }

    if (wifiData) {
      const { ssid, password, security } = wifiData
      const escapedSsid = ssid.replace(/[;:,\\]/g, "\\$&")
      const escapedPassword = password.replace(/[;:,\\]/g, "\\$&")
      const wifiQr = `WIFI:S:${escapedSsid};T:${security};P:${escapedPassword};;`
      setQrValue(wifiQr)
    }
  }, [wifiData, value])

  const handleDownload = () => {
    const svg = document.getElementById("wifi-qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "qr-code.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <Card className="p-4 flex flex-col items-center gap-4">
      <div className="bg-white p-3 rounded-lg">
        <QRCodeSVG id="wifi-qr-code" value={qrValue} size={200} level="H" includeMargin={true} />
      </div>
      <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Descargar QR
      </Button>
    </Card>
  )
}