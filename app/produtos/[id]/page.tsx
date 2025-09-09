import { ProductDetails } from "@/components/product-details"
import { getProductById, getRelatedProducts } from "@/app/actions/product-actions"
import { notFound } from "next/navigation"
import { Palette } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)

  if (isNaN(productId)) {
    notFound()
  }

  const [product, relatedProducts] = await Promise.all([getProductById(productId), getRelatedProducts(productId)])

  if (!product) {
    notFound()
  }

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
          </div>
        </div>
      </header>

      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </div>
  )
}
