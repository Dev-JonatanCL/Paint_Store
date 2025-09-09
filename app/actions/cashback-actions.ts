"use server"

// Simulação de dados de cashback para demonstração
const cashbackData = {
  "joao.silva@email.com": {
    currentBalance: 25.5,
    totalEarned: 67.8,
    totalUsed: 42.3,
    currentLevel: "Prata",
    nextLevelAmount: 500,
  },
}

const cashbackTransactions = [
  {
    id: 1,
    type: "earned" as const,
    amount: 15.6,
    description: "Cashback da compra de Tinta Acrílica Premium",
    date: "2024-01-15",
    orderId: 1001,
  },
  {
    id: 2,
    type: "used" as const,
    amount: 20.0,
    description: "Usado na compra de Esmalte Sintético",
    date: "2024-01-10",
    orderId: 1002,
  },
  {
    id: 3,
    type: "earned" as const,
    amount: 8.9,
    description: "Cashback da compra de Látex Econômico",
    date: "2024-01-05",
    orderId: 1003,
  },
  {
    id: 4,
    type: "earned" as const,
    amount: 12.4,
    description: "Cashback da compra de Primer Universal",
    date: "2023-12-28",
    orderId: 1004,
  },
  {
    id: 5,
    type: "used" as const,
    amount: 15.0,
    description: "Usado na compra de Tinta Anti-Mofo",
    date: "2023-12-20",
    orderId: 1005,
  },
]

export async function getCashbackOverview(customerEmail: string) {
  try {
    // Simular busca no banco de dados
    const data = cashbackData[customerEmail as keyof typeof cashbackData]

    if (!data) {
      return {
        currentBalance: 0,
        totalEarned: 0,
        totalUsed: 0,
        currentLevel: "Bronze",
        nextLevelAmount: 200,
      }
    }

    console.log("[v0] Dados de cashback carregados para:", customerEmail)
    return data
  } catch (error) {
    console.error("[v0] Erro ao buscar dados de cashback:", error)
    throw new Error("Erro ao carregar dados de cashback")
  }
}

export async function getCashbackHistory(customerEmail: string) {
  try {
    // Simular busca no banco de dados
    console.log("[v0] Histórico de cashback carregado para:", customerEmail)
    return cashbackTransactions
  } catch (error) {
    console.error("[v0] Erro ao buscar histórico de cashback:", error)
    throw new Error("Erro ao carregar histórico")
  }
}

export async function calculateCashback(purchaseAmount: number) {
  try {
    let cashbackRate = 0.005 // 0.5% padrão

    if (purchaseAmount >= 500) {
      cashbackRate = 0.02 // 2%
    } else if (purchaseAmount >= 200) {
      cashbackRate = 0.01 // 1%
    }

    const cashbackAmount = purchaseAmount * cashbackRate

    console.log("[v0] Cashback calculado:", {
      purchaseAmount,
      cashbackRate: cashbackRate * 100 + "%",
      cashbackAmount,
    })

    return {
      amount: cashbackAmount,
      rate: cashbackRate * 100,
      level: purchaseAmount >= 500 ? "Ouro" : purchaseAmount >= 200 ? "Prata" : "Bronze",
    }
  } catch (error) {
    console.error("[v0] Erro ao calcular cashback:", error)
    throw new Error("Erro ao calcular cashback")
  }
}

export async function applyCashback(customerEmail: string, orderAmount: number, cashbackUsed: number) {
  try {
    // Simular aplicação de cashback em uma compra
    const currentData = cashbackData[customerEmail as keyof typeof cashbackData]

    if (!currentData) {
      throw new Error("Cliente não encontrado")
    }

    if (cashbackUsed > currentData.currentBalance) {
      throw new Error("Saldo de cashback insuficiente")
    }

    // Calcular novo cashback ganho
    const newCashback = await calculateCashback(orderAmount - cashbackUsed)

    // Simular atualização no banco
    currentData.currentBalance = currentData.currentBalance - cashbackUsed + newCashback.amount
    currentData.totalUsed += cashbackUsed
    currentData.totalEarned += newCashback.amount

    console.log("[v0] Cashback aplicado:", {
      customerEmail,
      cashbackUsed,
      newCashbackEarned: newCashback.amount,
      newBalance: currentData.currentBalance,
    })

    return {
      success: true,
      cashbackUsed,
      newCashbackEarned: newCashback.amount,
      newBalance: currentData.currentBalance,
    }
  } catch (error) {
    console.error("[v0] Erro ao aplicar cashback:", error)
    throw error
  }
}
