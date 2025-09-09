import { ProductCatalog } from "@/components/product-catalog"
import { Palette } from "lucide-react"
import Link from "next/link"

export default function ProdutosPage() {
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
              <Link href="/cashback" className="text-slate-600 hover:text-blue-600 transition-colors">
                Cashback
              </Link>
              <Link href="/contato" className="text-slate-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-slate-600 hover:text-blue-600 transition-colors">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Catálogo de Produtos</h1>
          <p className="text-slate-600">Encontre as melhores tintas e vernizes para seu projeto</p>
        </div>

        <ProductCatalog />
      </div>
    </div>
  )
}
