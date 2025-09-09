import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Paintbrush, Palette, Shield, Star, Truck, CreditCard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">TintaMax</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/produtos" className="text-slate-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
              <Link href="/categorias" className="text-slate-600 hover:text-blue-600 transition-colors">
                Categorias
              </Link>
              <Link href="/cashback" className="text-slate-600 hover:text-blue-600 transition-colors">
                Cashback
              </Link>
              <Link href="/contato" className="text-slate-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro">Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-slate-800 mb-6 text-balance">
              Transforme Seus Ambientes com as
              <span className="text-blue-600"> Melhores Tintas</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 text-pretty">
              Descubra nossa seleção premium de tintas e vernizes das melhores marcas. Qualidade garantida e cashback em
              todas as compras!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Paintbrush className="mr-2 h-5 w-5" />
                Ver Produtos
              </Button>
              <Button size="lg" variant="outline">
                <CreditCard className="mr-2 h-5 w-5" />
                Saiba Mais sobre Cashback
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Nossas Categorias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Tinta Acrílica", desc: "Para paredes internas e externas", color: "bg-blue-100 text-blue-800" },
              { name: "Tinta Látex", desc: "Acabamento lavável e durável", color: "bg-green-100 text-green-800" },
              { name: "Esmalte", desc: "Brilho e proteção para madeira", color: "bg-orange-100 text-orange-800" },
              { name: "Tintas Especiais", desc: "Anti-mofo, térmica e mais", color: "bg-teal-100 text-teal-800" },
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Paintbrush className="h-8 w-8 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.desc}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className={category.color}>Ver Produtos</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Produtos em Destaque</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Tinta Acrílica Premium Branco Neve",
                price: "R$ 89,90",
                brand: "Suvinil",
                volume: "18L",
                rating: 4.8,
                image: "/white-paint-bucket.jpg",
              },
              {
                name: "Látex Econômico Cinza Chumbo",
                price: "R$ 78,90",
                brand: "Coral",
                volume: "18L",
                rating: 4.6,
                image: "/gray-paint-bucket.jpg",
              },
              {
                name: "Esmalte Sintético Azul Oceano",
                price: "R$ 45,90",
                brand: "Sherwin Williams",
                volume: "3.6L",
                rating: 4.9,
                image: "/blue-paint-bucket.jpg",
              },
            ].map((product, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <Badge variant="outline">{product.volume}</Badge>
                  </div>
                  <CardTitle className="text-lg mb-2 text-balance">{product.name}</CardTitle>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"}`}
                      />
                    ))}
                    <span className="text-sm text-slate-600 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <Button size="sm">Comprar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cashback Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Sistema de Cashback TintaMax</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto text-pretty">
            Ganhe dinheiro de volta em todas as suas compras! Quanto mais você compra, mais cashback recebe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">0,5%</div>
              <div className="text-blue-100">Compras até R$ 200</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border-2 border-white/30">
              <div className="text-3xl font-bold mb-2">1%</div>
              <div className="text-blue-100">Compras de R$ 200 a R$ 500</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">2%</div>
              <div className="text-blue-100">Compras acima de R$ 500</div>
            </div>
          </div>
          <Button size="lg" variant="secondary" className="mt-8">
            Cadastre-se e Comece a Ganhar
          </Button>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Por que Escolher a TintaMax?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Qualidade Garantida",
                desc: "Trabalhamos apenas com as melhores marcas do mercado",
              },
              {
                icon: <Truck className="h-12 w-12 text-green-600" />,
                title: "Entrega Rápida",
                desc: "Receba seus produtos em até 48h na Grande São Paulo",
              },
              {
                icon: <CreditCard className="h-12 w-12 text-teal-600" />,
                title: "Cashback Real",
                desc: "Dinheiro de volta que você pode usar em novas compras",
              },
            ].map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h4 className="text-xl font-semibold text-slate-800 mb-2">{advantage.title}</h4>
                <p className="text-slate-600 text-pretty">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-6 w-6 text-blue-400" />
                <h5 className="text-xl font-bold">TintaMax</h5>
              </div>
              <p className="text-slate-400 text-pretty">
                Sua loja de tintas de confiança com o melhor sistema de cashback do mercado.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Produtos</h6>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/tintas-acrilicas" className="hover:text-white transition-colors">
                    Tintas Acrílicas
                  </Link>
                </li>
                <li>
                  <Link href="/tintas-latex" className="hover:text-white transition-colors">
                    Tintas Látex
                  </Link>
                </li>
                <li>
                  <Link href="/esmaltes" className="hover:text-white transition-colors">
                    Esmaltes
                  </Link>
                </li>
                <li>
                  <Link href="/vernizes" className="hover:text-white transition-colors">
                    Vernizes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Atendimento</h6>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/contato" className="hover:text-white transition-colors">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link href="/duvidas" className="hover:text-white transition-colors">
                    Dúvidas Frequentes
                  </Link>
                </li>
                <li>
                  <Link href="/trocas" className="hover:text-white transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="/entrega" className="hover:text-white transition-colors">
                    Política de Entrega
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contato</h6>
              <div className="space-y-2 text-slate-400">
                <p>(11) 3000-0000</p>
                <p>contato@tintamax.com.br</p>
                <p>Seg-Sex: 8h às 18h</p>
                <p>Sáb: 8h às 14h</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 TintaMax. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
