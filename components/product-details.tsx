"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, CreditCard, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category_name: string
  color_code: string
  brand: string
  volume: string
  stock_quantity: number
  image_url: string
  rating?: number
}

interface ProductDetailsProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    // Simular adição ao carrinho
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Produto adicionado ao carrinho!",
      description: `${quantity}x ${product.name} foi adicionado ao seu carrinho.`,
    })

    setIsAddingToCart(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Início
        </Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-blue-600">
          Produtos
        </Link>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      <Button variant="ghost" asChild className="mb-6">
        <Link href="/produtos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos produtos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Imagem do produto */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden relative">
            <img
              src={product.image_url || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.color_code && (
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: product.color_code }}
              />
            )}
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.category_name}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 text-balance">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">({product.rating}) • 127 avaliações</span>
              </div>
            )}
          </div>

          <div className="text-4xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</div>

          <p className="text-slate-700 text-pretty">{product.description}</p>

          {/* Especificações */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">Especificações</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Marca:</span>
                <span className="ml-2 font-medium">{product.brand}</span>
              </div>
              <div>
                <span className="text-slate-600">Volume:</span>
                <span className="ml-2 font-medium">{product.volume}</span>
              </div>
              <div>
                <span className="text-slate-600">Categoria:</span>
                <span className="ml-2 font-medium">{product.category_name}</span>
              </div>
              <div>
                <span className="text-slate-600">Estoque:</span>
                <span className="ml-2 font-medium">
                  {product.stock_quantity > 0 ? `${product.stock_quantity} unidades` : "Esgotado"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quantidade e compra */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantidade:</label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0 || isAddingToCart}
              >
                {isAddingToCart ? (
                  "Adicionando..."
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Vantagens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Entrega rápida</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Garantia de qualidade</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-teal-600" />
              <span>Ganhe cashback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden">
                    <img
                      src={relatedProduct.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {relatedProduct.brand}
                  </Badge>
                  <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">R$ {relatedProduct.price.toFixed(2)}</span>
                    <Button size="sm" asChild>
                      <Link href={`/produtos/${relatedProduct.id}`}>Ver</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
