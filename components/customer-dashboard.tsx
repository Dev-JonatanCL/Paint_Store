"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import {
  User,
  CreditCard,
  ShoppingBag,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Package,
  Star,
} from "lucide-react"
import { getCustomerDashboardData } from "@/app/actions/dashboard-actions"

interface DashboardData {
  customer: {
    id: number
    name: string
    email: string
    phone: string
    cashback_balance: number
    total_spent: number
    member_since: string
    level: string
  }
  stats: {
    total_orders: number
    total_products: number
    favorite_category: string
    last_order_date: string
  }
  recent_orders: Array<{
    id: number
    order_number: string
    date: string
    total: number
    status: string
    items_count: number
  }>
  cashback_summary: {
    earned_this_month: number
    used_this_month: number
    expires_soon: number
  }
}

export function CustomerDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getCustomerDashboardData("joao.silva@email.com")
        setDashboardData(data)
      } catch (error) {
        console.error("[v0] Erro ao carregar dashboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Erro ao carregar dashboard</h2>
          <p className="text-slate-600">Tente recarregar a página</p>
        </div>
      </div>
    )
  }

  const { customer, stats, recent_orders, cashback_summary } = dashboardData

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header do Dashboard */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarFallback>
            <AvatarInitials name={customer.name} />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Olá, {customer.name.split(" ")[0]}!</h1>
          <p className="text-slate-600">
            Membro desde {new Date(customer.member_since).toLocaleDateString("pt-BR")} •{" "}
            <Badge variant="secondary">{customer.level}</Badge>
          </p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Cashback Disponível</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">R$ {customer.cashback_balance.toFixed(2)}</div>
            <p className="text-xs text-blue-700 mt-1">+R$ {cashback_summary.earned_this_month.toFixed(2)} este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Gasto</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">R$ {customer.total_spent.toFixed(2)}</div>
            <p className="text-xs text-green-700 mt-1">Em {stats.total_orders} pedidos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-800">Pedidos Realizados</CardTitle>
            <ShoppingBag className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">{stats.total_orders}</div>
            <p className="text-xs text-teal-700 mt-1">{stats.total_products} produtos comprados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Categoria Favorita</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-900">{stats.favorite_category}</div>
            <p className="text-xs text-orange-700 mt-1">Mais comprada</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs do Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="cashback">Cashback</TabsTrigger>
          <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pedidos Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Pedidos Recentes
                </CardTitle>
                <CardDescription>Seus últimos pedidos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recent_orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Pedido #{order.order_number}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(order.date).toLocaleDateString("pt-BR")} • {order.items_count} itens
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">R$ {order.total.toFixed(2)}</div>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "shipped"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status === "delivered"
                            ? "Entregue"
                            : order.status === "shipped"
                              ? "Enviado"
                              : "Processando"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Ver Todos os Pedidos
                </Button>
              </CardContent>
            </Card>

            {/* Resumo de Cashback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Resumo de Cashback
                </CardTitle>
                <CardDescription>Atividade do seu cashback este mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-green-700">Ganho este mês</div>
                    <div className="font-bold text-green-900">+R$ {cashback_summary.earned_this_month.toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-blue-700">Usado este mês</div>
                    <div className="font-bold text-blue-900">-R$ {cashback_summary.used_this_month.toFixed(2)}</div>
                  </div>
                </div>
                {cashback_summary.expires_soon > 0 && (
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="text-sm text-orange-700">Expira em breve</div>
                      <div className="font-bold text-orange-900">R$ {cashback_summary.expires_soon.toFixed(2)}</div>
                    </div>
                  </div>
                )}
                <Button className="w-full">Ver Histórico Completo</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pedidos</CardTitle>
              <CardDescription>Todos os seus pedidos realizados na TintaMax</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent_orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium">Pedido #{order.order_number}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(order.date).toLocaleDateString("pt-BR")} • {order.items_count} itens
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">R$ {order.total.toFixed(2)}</div>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status === "delivered"
                          ? "Entregue"
                          : order.status === "shipped"
                            ? "Enviado"
                            : "Processando"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Saldo Atual</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">R$ {customer.cashback_balance.toFixed(2)}</div>
                <p className="text-slate-600">Disponível para usar</p>
                <Button className="w-full mt-4">Usar Cashback</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Nível Atual</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="text-lg px-4 py-2 mb-2">{customer.level}</Badge>
                <p className="text-slate-600 mb-4">
                  {customer.level === "Bronze" ? "0,5%" : customer.level === "Prata" ? "1%" : "2%"} de cashback
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Benefícios
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Próximo Nível</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-slate-800 mb-2">
                  {customer.level === "Bronze" ? "Prata" : customer.level === "Prata" ? "Ouro" : "Máximo"}
                </div>
                <p className="text-slate-600 mb-4">
                  {customer.level === "Bronze"
                    ? "Faltam R$ 350 em compras"
                    : customer.level === "Prata"
                      ? "Faltam R$ 1.200 em compras"
                      : "Você já está no nível máximo!"}
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados Pessoais
                  </span>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Nome</div>
                    <div className="font-medium">{customer.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Email</div>
                    <div className="font-medium">{customer.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Telefone</div>
                    <div className="font-medium">{customer.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Membro desde</div>
                    <div className="font-medium">{new Date(customer.member_since).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço
                  </span>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-700">
                  <p>Rua das Flores, 123</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>01234-567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
