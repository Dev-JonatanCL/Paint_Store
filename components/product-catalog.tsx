"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Star, ShoppingCart, Eye } from "lucide-react"
import { getProducts, getCategories } from "@/app/actions/product-actions"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  category_name: string
  color_code: string
  brand: string
  volume: string
  stock_quantity: number
  image_url: string
  rating?: number
}

interface Category {
  id: number
  name: string
}

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error("[v0] Erro ao carregar produtos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category_id === Number.parseInt(selectedCategory))
    }

    // Filtro por marca
    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    // Filtro por preço
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "brand":
          return a.brand.localeCompare(b.brand)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy])

  const brands = [...new Set(products.map((p) => p.brand))]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-6 bg-slate-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-slate-200 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filtros */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h3 className="font-semibold">Filtros</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Busca */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Nome ou marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marca */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Marca</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
              </label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={200} min={0} step={10} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produtos */}
      <div className="lg:col-span-3">
        {/* Barra de ordenação */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Ordenar por Nome</SelectItem>
              <SelectItem value="price-asc">Menor Preço</SelectItem>
              <SelectItem value="price-desc">Maior Preço</SelectItem>
              <SelectItem value="brand">Marca</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-slate-600">Tente ajustar os filtros para encontrar o que procura</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden relative">
                    <img
                      src={product.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.color_code && (
                      <div
                        className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: product.color_code }}
                      />
                    )}
                    {product.stock_quantity < 10 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">Últimas unidades</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <Badge variant="outline">{product.volume}</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-balance line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-slate-600 ml-1">({product.rating})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/produtos/${product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" disabled={product.stock_quantity === 0}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {product.stock_quantity === 0 && <p className="text-sm text-red-600 mt-2">Produto esgotado</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
