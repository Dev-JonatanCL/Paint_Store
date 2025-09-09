import { CustomerLoginForm } from "@/components/customer-login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-800">TintaMax</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Entrar</h1>
          <p className="text-slate-600">Acesse sua conta e acompanhe seu cashback</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com seu email e senha</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerLoginForm />
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-slate-600">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-blue-600 hover:text-blue-700 font-medium">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
