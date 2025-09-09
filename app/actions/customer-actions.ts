"use server"

// Simulação de banco de dados em memória para demonstração
// Em produção, isso seria substituído por uma conexão real com o banco
const customers: any[] = []

export async function registerCustomer(formData: FormData) {
  try {
    const customerData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      cpf: formData.get("cpf") as string,
      birth_date: formData.get("birth_date") as string,
      address_street: formData.get("address_street") as string,
      address_number: formData.get("address_number") as string,
      address_complement: formData.get("address_complement") as string,
      address_neighborhood: formData.get("address_neighborhood") as string,
      address_city: formData.get("address_city") as string,
      address_state: formData.get("address_state") as string,
      address_zipcode: formData.get("address_zipcode") as string,
    }

    // Validações básicas
    if (!customerData.name || !customerData.email) {
      return { success: false, error: "Nome e email são obrigatórios" }
    }

    // Verificar se email já existe
    const existingCustomer = customers.find((c) => c.email === customerData.email)
    if (existingCustomer) {
      return { success: false, error: "Este email já está cadastrado" }
    }

    // Verificar se CPF já existe (se fornecido)
    if (customerData.cpf) {
      const existingCpf = customers.find((c) => c.cpf === customerData.cpf)
      if (existingCpf) {
        return { success: false, error: "Este CPF já está cadastrado" }
      }
    }

    // Simular inserção no banco
    const newCustomer = {
      id: customers.length + 1,
      ...customerData,
      cashback_balance: 0.0,
      total_spent: 0.0,
      is_active: true,
      created_at: new Date().toISOString(),
    }

    customers.push(newCustomer)

    console.log("[v0] Cliente cadastrado:", newCustomer)

    return { success: true, customer: newCustomer }
  } catch (error) {
    console.error("[v0] Erro ao cadastrar cliente:", error)
    return { success: false, error: "Erro interno do servidor" }
  }
}

export async function loginCustomer(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validações básicas
    if (!email || !password) {
      return { success: false, error: "Email e senha são obrigatórios" }
    }

    // Simular verificação de credenciais
    // Em produção, isso seria uma verificação real com hash da senha
    const customer = customers.find((c) => c.email === email)

    if (!customer) {
      return { success: false, error: "Email não encontrado" }
    }

    // Simular verificação de senha (em produção usaria bcrypt)
    // Por enquanto, aceita qualquer senha para demonstração
    console.log("[v0] Login realizado para:", customer.email)

    return { success: true, customer }
  } catch (error) {
    console.error("[v0] Erro no login:", error)
    return { success: false, error: "Erro interno do servidor" }
  }
}

export async function getCustomerByEmail(email: string) {
  try {
    const customer = customers.find((c) => c.email === email)
    return customer || null
  } catch (error) {
    console.error("[v0] Erro ao buscar cliente:", error)
    return null
  }
}
