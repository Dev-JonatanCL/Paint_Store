"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, Gift, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { getCashbackOverview } from "@/app/actions/cashback-actions"

interface CashbackData {
  currentBalance: number
  totalEarned: number
  totalUsed: number
  nextLevelAmount: number
  currentLevel: string
}

export function CashbackOverview() {
  const [cashbackData, setCashbackData] = useState<CashbackData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCashbackData() {
      try {
        const data = await getCashbackOverview("joao.silva@email.com") // Simular usuário logado
        setCashbackData(data)
      } catch (error) {
        console.error("[v0] Erro ao carregar dados de cashback:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCashbackData()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-8 bg-slate-200 rounded w-1/2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  const progressToNextLevel = cashbackData ? (cashbackData.totalEarned / cashbackData.nextLevelAmount) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Saldo Disponível</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              R$ {cashbackData?.currentBalance.toFixed(2) || "0,00"}
            </div>
            <p className="text-xs text-blue-700 mt-1">Pronto para usar</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Ganho</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">R$ {cashbackData?.totalEarned.toFixed(2) || "0,00"}</div>
            <p className="text-xs text-green-700 mt-1">Desde o cadastro</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-800">Total Usado</CardTitle>
            <Gift className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">R$ {cashbackData?.totalUsed.toFixed(2) || "0,00"}</div>
            <p className="text-xs text-teal-700 mt-1">Em compras anteriores</p>
          </CardContent>
        </Card>
      </div>

      {/* Nível Atual e Progresso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {cashbackData?.currentLevel || "Bronze"}
            </Badge>
            Seu Nível de Cashback
          </CardTitle>
          <CardDescription>Continue comprando para desbloquear níveis maiores e ganhar mais cashback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso para o próximo nível</span>
              <span>
                R$ {cashbackData?.totalEarned.toFixed(2)} / R$ {cashbackData?.nextLevelAmount.toFixed(2)}
              </span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
          <p className="text-sm text-slate-600">
            Faltam apenas R$ {((cashbackData?.nextLevelAmount || 0) - (cashbackData?.totalEarned || 0)).toFixed(2)} em
            cashback ganho para o próximo nível!
          </p>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usar Cashback</CardTitle>
            <CardDescription>Aplique seu saldo em uma nova compra</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled={!cashbackData?.currentBalance}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Comprar com Cashback
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ganhar Mais</CardTitle>
            <CardDescription>Veja nossos produtos e ganhe cashback</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              <Gift className="mr-2 h-4 w-4" />
              Ver Produtos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
