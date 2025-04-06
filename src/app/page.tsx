
import { WifiForm } from "@/components/qr-generator/wifi-form"

export default function Home() {
  return (
    <main className="bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <WifiForm />
      </div>
    </main>
  )
}

