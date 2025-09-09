-- Funções úteis para o sistema de cashback

-- Função para calcular cashback baseado no valor da compra
CREATE OR REPLACE FUNCTION calculate_cashback(purchase_amount DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  -- 2% de cashback para compras acima de R$ 500
  -- 1% de cashback para compras entre R$ 200 e R$ 500
  -- 0.5% de cashback para compras abaixo de R$ 200
  IF purchase_amount >= 500 THEN
    RETURN purchase_amount * 0.02;
  ELSIF purchase_amount >= 200 THEN
    RETURN purchase_amount * 0.01;
  ELSE
    RETURN purchase_amount * 0.005;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar o saldo de cashback do cliente
CREATE OR REPLACE FUNCTION update_customer_cashback()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza o saldo de cashback quando uma nova transação é inserida
  IF NEW.transaction_type = 'earned' THEN
    UPDATE customers 
    SET cashback_balance = cashback_balance + NEW.amount
    WHERE id = NEW.customer_id;
  ELSIF NEW.transaction_type = 'used' THEN
    UPDATE customers 
    SET cashback_balance = cashback_balance - NEW.amount
    WHERE id = NEW.customer_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar automaticamente o cashback
CREATE TRIGGER trigger_update_cashback
  AFTER INSERT ON cashback_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_cashback();
