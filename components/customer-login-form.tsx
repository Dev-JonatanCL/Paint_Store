"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Lock } from "lucide-react"
import { loginCustomer } from "@/app/actions/customer-actions"

export function CustomerLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await loginCustomer(formData)

      if (result.success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta à TintaMax.",
        })
        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        toast({
          title: "Erro no login",
          description: result.error || "Email ou senha incorretos.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input id="email" name="email" type="email" placeholder="seu@email.com" className="pl-10" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input id="password" name="password" type="password" placeholder="Sua senha" className="pl-10" required />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm">
          <input type="checkbox" className="rounded" />
          <span className="text-slate-600">Lembrar de mim</span>
        </label>
        <a href="/recuperar-senha" className="text-sm text-blue-600 hover:text-blue-700">
          Esqueceu a senha?
        </a>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
    </form>
  )
}
