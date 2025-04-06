import { ThemeToggle } from "@/components/qr-generator/theme-toggle"
import { WifiForm } from "@/components/qr-generator/wifi-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">WiFi QR Generator</h1>
          <ThemeToggle />
        </div>
        <WifiForm />
      </div>
    </main>
  )
}

