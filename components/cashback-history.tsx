"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle, ArrowDownCircle, Calendar, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { getCashbackHistory } from "@/app/actions/cashback-actions"

interface CashbackTransaction {
  id: number
  type: "earned" | "used" | "expired"
  amount: number
  description: string
  date: string
  orderId?: number
}

export function CashbackHistory() {
  const [transactions, setTransactions] = useState<CashbackTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getCashbackHistory("joao.silva@email.com") // Simular usuário logado
        setTransactions(history)
      } catch (error) {
        console.error("[v0] Erro ao carregar histórico:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <ArrowUpCircle className="h-5 w-5 text-green-600" />
      case "used":
        return <ArrowDownCircle className="h-5 w-5 text-blue-600" />
      case "expired":
        return <ArrowDownCircle className="h-5 w-5 text-red-600" />
      default:
        return <Calendar className="h-5 w-5 text-slate-600" />
    }
  }

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "earned":
        return <Badge className="bg-green-100 text-green-800">Ganho</Badge>
      case "used":
        return <Badge className="bg-blue-100 text-blue-800">Usado</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expirado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Cashback</CardTitle>
          <CardDescription>Carregando transações...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-slate-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico de Cashback</CardTitle>
            <CardDescription>Todas as suas transações de cashback</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhuma transação ainda</h3>
            <p className="text-slate-600">Faça sua primeira compra para começar a ganhar cashback!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">{getTransactionIcon(transaction.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getTransactionBadge(transaction.type)}
                    {transaction.orderId && (
                      <Badge variant="outline" className="text-xs">
                        Pedido #{transaction.orderId}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
                  <p className="text-xs text-slate-500">{new Date(transaction.date).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type === "earned"
                        ? "text-green-600"
                        : transaction.type === "used"
                          ? "text-blue-600"
                          : "text-red-600"
                    }`}
                  >
                    {transaction.type === "earned" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
