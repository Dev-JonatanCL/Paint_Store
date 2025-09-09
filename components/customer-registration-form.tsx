"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, User, MapPin } from "lucide-react"
import { registerCustomer } from "@/app/actions/customer-actions"

export function CustomerRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await registerCustomer(formData)

      if (result.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Bem-vindo à TintaMax. Você já pode fazer login.",
        })
        // Redirect to login or dashboard
        window.location.href = "/login"
      } else {
        toast({
          title: "Erro no cadastro",
          description: result.error || "Ocorreu um erro inesperado.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Dados Pessoais */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <User className="h-4 w-4" />
          Informações Pessoais
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input id="name" name="name" type="text" placeholder="João Silva Santos" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF *</Label>
            <Input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="joao@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth_date">Data de Nascimento</Label>
          <Input id="birth_date" name="birth_date" type="date" />
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <MapPin className="h-4 w-4" />
          Endereço
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address_zipcode">CEP</Label>
            <Input id="address_zipcode" name="address_zipcode" type="text" placeholder="00000-000" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address_street">Rua/Avenida</Label>
            <Input id="address_street" name="address_street" type="text" placeholder="Rua das Flores" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address_number">Número</Label>
            <Input id="address_number" name="address_number" type="text" placeholder="123" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address_complement">Complemento</Label>
            <Input id="address_complement" name="address_complement" type="text" placeholder="Apto 45, Bloco B" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address_neighborhood">Bairro</Label>
            <Input id="address_neighborhood" name="address_neighborhood" type="text" placeholder="Centro" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_city">Cidade</Label>
            <Input id="address_city" name="address_city" type="text" placeholder="São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address_state">Estado</Label>
            <Input id="address_state" name="address_state" type="text" placeholder="SP" maxLength={2} />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Criar Conta
      </Button>

      <p className="text-xs text-slate-500 text-center">
        Ao criar sua conta, você concorda com nossos{" "}
        <a href="/termos" className="text-blue-600 hover:underline">
          Termos de Uso
        </a>{" "}
        e{" "}
        <a href="/privacidade" className="text-blue-600 hover:underline">
          Política de Privacidade
        </a>
      </p>
    </form>
  )
}
