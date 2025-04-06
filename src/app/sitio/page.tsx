import { QrWebForm } from "@/components/qr-generator/qr-web-form";

export default function QrWebPage() {
    return (
        <main className="bg-background flex flex-col items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-xl mx-auto">
                <QrWebForm />
            </div>
        </main>
    )
  }