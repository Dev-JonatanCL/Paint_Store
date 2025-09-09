-- Inserção de produtos de exemplo

INSERT INTO products (name, description, price, category_id, color_code, brand, volume, stock_quantity, image_url) VALUES
-- Tintas Acrílicas
('Tinta Acrílica Branco Neve', 'Tinta acrílica premium para paredes internas e externas', 89.90, 1, '#FFFFFF', 'Suvinil', '18L', 50, '/placeholder.svg?height=300&width=300'),
('Tinta Acrílica Azul Oceano', 'Cor vibrante e duradoura para ambientes modernos', 94.90, 1, '#0066CC', 'Coral', '18L', 30, '/placeholder.svg?height=300&width=300'),
('Tinta Acrílica Verde Natureza', 'Perfeita para criar ambientes relaxantes', 92.90, 1, '#228B22', 'Sherwin Williams', '18L', 25, '/placeholder.svg?height=300&width=300'),

-- Tintas Látex
('Látex Econômico Branco', 'Tinta látex com ótimo custo-benefício', 65.90, 2, '#F8F8FF', 'Eucatex', '18L', 40, '/placeholder.svg?height=300&width=300'),
('Látex Premium Cinza Chumbo', 'Acabamento sofisticado e lavável', 78.90, 2, '#696969', 'Suvinil', '18L', 20, '/placeholder.svg?height=300&width=300'),

-- Esmaltes
('Esmalte Sintético Vermelho', 'Esmalte brilhante para madeira e metal', 45.90, 3, '#DC143C', 'Coral', '3.6L', 35, '/placeholder.svg?height=300&width=300'),
('Esmalte Sintético Preto', 'Acabamento brilhante e resistente', 42.90, 3, '#000000', 'Sherwin Williams', '3.6L', 28, '/placeholder.svg?height=300&width=300'),

-- Tintas Especiais
('Tinta Anti-Mofo Branco', 'Proteção contra fungos e bactérias', 125.90, 8, '#FFFFFF', 'Suvinil', '18L', 15, '/placeholder.svg?height=300&width=300'),
('Tinta Lousa Preta', 'Transforme qualquer parede em lousa', 89.90, 8, '#2F2F2F', 'Coral', '1L', 12, '/placeholder.svg?height=300&width=300'),

-- Primers
('Primer Universal Branco', 'Preparação ideal para todas as superfícies', 55.90, 6, '#F5F5F5', 'Eucatex', '18L', 45, '/placeholder.svg?height=300&width=300');
