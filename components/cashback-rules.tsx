import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Gift, Clock, AlertCircle } from "lucide-react"

export function CashbackRules() {
  return (
    <div className="space-y-6">
      {/* Como Ganhar Cashback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Como Ganhar Cashback
          </CardTitle>
          <CardDescription>Entenda como funciona nosso sistema de recompensas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">0,5%</div>
              <div className="text-sm font-medium mb-1">Nível Bronze</div>
              <div className="text-xs text-slate-600">Compras até R$ 200</div>
            </div>
            <div className="text-center p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600 mb-2">1%</div>
              <div className="text-sm font-medium mb-1">Nível Prata</div>
              <div className="text-xs text-slate-600">Compras de R$ 200 a R$ 500</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">2%</div>
              <div className="text-sm font-medium mb-1">Nível Ouro</div>
              <div className="text-xs text-slate-600">Compras acima de R$ 500</div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Exemplo:</strong> Em uma compra de R$ 300, você ganha R$ 3,00 de cashback (1%). Em uma compra de
              R$ 600, você ganha R$ 12,00 de cashback (2%).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Como Usar o Cashback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-500" />
            Como Usar seu Cashback
          </CardTitle>
          <CardDescription>Formas de aproveitar seu saldo acumulado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Desconto em Compras</div>
                <div className="text-sm text-slate-600">Use seu cashback como desconto em qualquer produto da loja</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Valor Mínimo</div>
                <div className="text-sm text-slate-600">Pode ser usado a partir de R$ 5,00 acumulados</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Sem Limite de Uso</div>
                <div className="text-sm text-slate-600">Use todo seu saldo disponível em uma única compra</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regras e Condições */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Regras e Condições
          </CardTitle>
          <CardDescription>Termos importantes sobre o programa de cashback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <div className="font-medium">Validade do Cashback</div>
                <div className="text-sm text-slate-600">
                  O cashback tem validade de 12 meses a partir da data de ganho
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <div className="font-medium">Processamento</div>
                <div className="text-sm text-slate-600">
                  O cashback é creditado em até 48h após a confirmação do pagamento
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <div className="font-medium">Produtos Elegíveis</div>
                <div className="text-sm text-slate-600">
                  Todos os produtos da loja participam do programa, exceto produtos em promoção especial
                </div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Importante:</strong> O cashback não pode ser convertido em dinheiro ou transferido para outras
              pessoas. É válido apenas para compras na TintaMax.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Níveis de Fidelidade */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis de Fidelidade</CardTitle>
          <CardDescription>Evolua seu nível e ganhe mais benefícios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-100 text-amber-800">Bronze</Badge>
                <div>
                  <div className="font-medium">Nível Inicial</div>
                  <div className="text-sm text-slate-600">0,5% de cashback</div>
                </div>
              </div>
              <div className="text-sm text-slate-600">Automático no cadastro</div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className="bg-slate-100 text-slate-800">Prata</Badge>
                <div>
                  <div className="font-medium">Nível Intermediário</div>
                  <div className="text-sm text-slate-600">1% de cashback</div>
                </div>
              </div>
              <div className="text-sm text-slate-600">R$ 500 em compras</div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className="bg-yellow-100 text-yellow-800">Ouro</Badge>
                <div>
                  <div className="font-medium">Nível Premium</div>
                  <div className="text-sm text-slate-600">2% de cashback</div>
                </div>
              </div>
              <div className="text-sm text-slate-600">R$ 2.000 em compras</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
