"use server"

// Simulação de dados do dashboard para demonstração
const dashboardData = {
  "joao.silva@email.com": {
    customer: {
      id: 1,
      name: "João Silva Santos",
      email: "joao.silva@email.com",
      phone: "(11) 99999-1234",
      cashback_balance: 25.5,
      total_spent: 850.0,
      member_since: "2023-06-15",
      level: "Prata",
    },
    stats: {
      total_orders: 8,
      total_products: 23,
      favorite_category: "Tinta Acrílica",
      last_order_date: "2024-01-15",
    },
    recent_orders: [
      {
        id: 1001,
        order_number: "TM-2024-001",
        date: "2024-01-15",
        total: 156.8,
        status: "delivered",
        items_count: 2,
      },
      {
        id: 1002,
        order_number: "TM-2024-002",
        date: "2024-01-10",
        total: 89.9,
        status: "delivered",
        items_count: 1,
      },
      {
        id: 1003,
        order_number: "TM-2024-003",
        date: "2024-01-05",
        total: 234.5,
        status: "shipped",
        items_count: 3,
      },
      {
        id: 1004,
        order_number: "TM-2023-045",
        date: "2023-12-28",
        total: 78.9,
        status: "delivered",
        items_count: 1,
      },
      {
        id: 1005,
        order_number: "TM-2023-044",
        date: "2023-12-20",
        total: 125.9,
        status: "delivered",
        items_count: 2,
      },
    ],
    cashback_summary: {
      earned_this_month: 12.4,
      used_this_month: 20.0,
      expires_soon: 5.5,
    },
  },
}

export async function getCustomerDashboardData(customerEmail: string) {
  try {
    // Simular busca no banco de dados
    const data = dashboardData[customerEmail as keyof typeof dashboardData]

    if (!data) {
      throw new Error("Cliente não encontrado")
    }

    console.log("[v0] Dashboard carregado para:", customerEmail)
    return data
  } catch (error) {
    console.error("[v0] Erro ao carregar dashboard:", error)
    throw new Error("Erro ao carregar dados do dashboard")
  }
}

export async function updateCustomerProfile(customerEmail: string, profileData: any) {
  try {
    // Simular atualização no banco de dados
    const data = dashboardData[customerEmail as keyof typeof dashboardData]

    if (!data) {
      throw new Error("Cliente não encontrado")
    }

    // Atualizar dados (simulação)
    Object.assign(data.customer, profileData)

    console.log("[v0] Perfil atualizado para:", customerEmail)
    return { success: true, message: "Perfil atualizado com sucesso" }
  } catch (error) {
    console.error("[v0] Erro ao atualizar perfil:", error)
    throw new Error("Erro ao atualizar perfil")
  }
}

export async function getCustomerOrders(customerEmail: string) {
  try {
    const data = dashboardData[customerEmail as keyof typeof dashboardData]

    if (!data) {
      throw new Error("Cliente não encontrado")
    }

    console.log("[v0] Pedidos carregados para:", customerEmail)
    return data.recent_orders
  } catch (error) {
    console.error("[v0] Erro ao carregar pedidos:", error)
    throw new Error("Erro ao carregar pedidos")
  }
}

export async function getCustomerStats(customerEmail: string) {
  try {
    const data = dashboardData[customerEmail as keyof typeof dashboardData]

    if (!data) {
      throw new Error("Cliente não encontrado")
    }

    console.log("[v0] Estatísticas carregadas para:", customerEmail)
    return {
      ...data.stats,
      cashback_balance: data.customer.cashback_balance,
      total_spent: data.customer.total_spent,
      level: data.customer.level,
    }
  } catch (error) {
    console.error("[v0] Erro ao carregar estatísticas:", error)
    throw new Error("Erro ao carregar estatísticas")
  }
}
