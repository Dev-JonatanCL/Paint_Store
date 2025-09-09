import { CustomerRegistrationForm } from "@/components/customer-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"
import Link from "next/link"

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-800">TintaMax</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Criar Conta</h1>
          <p className="text-slate-600">Cadastre-se e comece a ganhar cashback em todas as suas compras</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Preencha seus dados para criar sua conta na TintaMax</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerRegistrationForm />
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-slate-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
