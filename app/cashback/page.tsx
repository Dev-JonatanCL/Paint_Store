import { CashbackOverview } from "@/components/cashback-overview"
import { CashbackHistory } from "@/components/cashback-history"
import { CashbackRules } from "@/components/cashback-rules"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, CreditCard } from "lucide-react"
import Link from "next/link"

export default function CashbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">TintaMax</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/produtos" className="text-slate-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-4">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Sistema de Cashback TintaMax</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
            Ganhe dinheiro de volta em todas as suas compras e use para comprar ainda mais tintas!
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="rules">Como Funciona</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <CashbackOverview />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <CashbackHistory />
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <CashbackRules />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
