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
  wifiData: WifiData
}

export function QrGenerator({ wifiData }: QrGeneratorProps) {
  const [qrValue, setQrValue] = useState("")

  useEffect(() => {
    // Format according to WiFi QR code standard
    // WIFI:S:<SSID>;T:<WEP|WPA|nopass>;P:<password>;;
    const { ssid, password, security } = wifiData

    // Escape special characters in SSID and password
    const escapedSsid = ssid.replace(/[;:,\\]/g, "\\$&")
    const escapedPassword = password.replace(/[;:,\\]/g, "\\$&")

    const qrString = `WIFI:S:${escapedSsid};T:${security};P:${escapedPassword};;`
    setQrValue(qrString)
  }, [wifiData])

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

      // Download the PNG file
      const downloadLink = document.createElement("a")
      downloadLink.download = `wifi-${wifiData.ssid}.png`
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
        Download QR Code
      </Button>
    </Card>
  )
}

