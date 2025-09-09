import { CustomerDashboard } from "@/components/customer-dashboard"
import { Palette } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">TintaMax</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link href="/produtos" className="text-slate-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
              <Link href="/cashback" className="text-slate-600 hover:text-blue-600 transition-colors">
                Cashback
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-slate-600">Olá, João!</span>
              <Link href="/logout" className="text-slate-600 hover:text-red-600 transition-colors text-sm">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CustomerDashboard />
    </div>
  )
}
