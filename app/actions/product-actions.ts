"use server"

// Simulação de dados de produtos para demonstração
const products = [
  {
    id: 1,
    name: "Tinta Acrílica Premium Branco Neve",
    description:
      "Tinta acrílica de alta qualidade com excelente cobertura e durabilidade. Ideal para paredes internas e externas.",
    price: 89.9,
    category_id: 1,
    category_name: "Tinta Acrílica",
    color_code: "#FFFFFF",
    brand: "Suvinil",
    volume: "18L",
    stock_quantity: 50,
    image_url: "/white-paint-bucket.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tinta Acrílica Azul Oceano",
    description: "Cor vibrante e duradoura para criar ambientes modernos e sofisticados.",
    price: 94.9,
    category_id: 1,
    category_name: "Tinta Acrílica",
    color_code: "#0066CC",
    brand: "Coral",
    volume: "18L",
    stock_quantity: 30,
    image_url: "/blue-paint-bucket.jpg",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Látex Econômico Cinza Chumbo",
    description: "Tinta látex com ótimo custo-benefício e acabamento sofisticado lavável.",
    price: 78.9,
    category_id: 2,
    category_name: "Tinta Látex",
    color_code: "#696969",
    brand: "Suvinil",
    volume: "18L",
    stock_quantity: 20,
    image_url: "/gray-paint-bucket.jpg",
    rating: 4.4,
  },
  {
    id: 4,
    name: "Esmalte Sintético Vermelho Ferrari",
    description: "Esmalte brilhante de alta resistência para madeira e metal.",
    price: 45.9,
    category_id: 3,
    category_name: "Esmalte",
    color_code: "#DC143C",
    brand: "Coral",
    volume: "3.6L",
    stock_quantity: 35,
    image_url: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Tinta Anti-Mofo Branco",
    description: "Proteção especial contra fungos e bactérias com tecnologia avançada.",
    price: 125.9,
    category_id: 8,
    category_name: "Tinta Especial",
    color_code: "#FFFFFF",
    brand: "Suvinil",
    volume: "18L",
    stock_quantity: 15,
    image_url: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Primer Universal Branco",
    description: "Preparação ideal para todas as superfícies, garantindo melhor aderência.",
    price: 55.9,
    category_id: 6,
    category_name: "Primer",
    color_code: "#F5F5F5",
    brand: "Eucatex",
    volume: "18L",
    stock_quantity: 45,
    image_url: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
  },
]

const categories = [
  { id: 1, name: "Tinta Acrílica" },
  { id: 2, name: "Tinta Látex" },
  { id: 3, name: "Esmalte" },
  { id: 6, name: "Primer" },
  { id: 8, name: "Tinta Especial" },
]

export async function getProducts() {
  try {
    // Simular busca no banco de dados
    console.log("[v0] Produtos carregados:", products.length)
    return products
  } catch (error) {
    console.error("[v0] Erro ao buscar produtos:", error)
    return []
  }
}

export async function getCategories() {
  try {
    // Simular busca no banco de dados
    console.log("[v0] Categorias carregadas:", categories.length)
    return categories
  } catch (error) {
    console.error("[v0] Erro ao buscar categorias:", error)
    return []
  }
}

export async function getProductById(id: number) {
  try {
    const product = products.find((p) => p.id === id)
    console.log("[v0] Produto encontrado:", product?.name || "Não encontrado")
    return product || null
  } catch (error) {
    console.error("[v0] Erro ao buscar produto:", error)
    return null
  }
}

export async function getRelatedProducts(productId: number) {
  try {
    const product = products.find((p) => p.id === productId)
    if (!product) return []

    // Buscar produtos da mesma categoria, excluindo o produto atual
    const related = products.filter((p) => p.category_id === product.category_id && p.id !== productId).slice(0, 4)

    console.log("[v0] Produtos relacionados encontrados:", related.length)
    return related
  } catch (error) {
    console.error("[v0] Erro ao buscar produtos relacionados:", error)
    return []
  }
}

export async function searchProducts(query: string) {
  try {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category_name.toLowerCase().includes(query.toLowerCase()),
    )

    console.log("[v0] Produtos encontrados na busca:", filtered.length)
    return filtered
  } catch (error) {
    console.error("[v0] Erro na busca de produtos:", error)
    return []
  }
}
