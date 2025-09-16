# 🎭 Máscaras e Validações - Campos do Formulário

## ✅ **Máscaras Implementadas**

### 📞 **Máscara de Telefone**

#### **📱 Formatos Suportados:**

-   **Fixo**: `(11) 9999-9999` (10 dígitos)
-   **Celular**: `(11) 99999-9999` (11 dígitos)
-   **Aplicação**: Automática conforme digitação
-   **Limite**: 15 caracteres (com máscara)

#### **🔧 Funcionamento:**

```typescript
// Entrada: "11999999999"
// Saída: "(11) 99999-9999"

// Entrada: "1199999999"
// Saída: "(11) 9999-9999"
```

#### **📋 Validações:**

-   ✅ **10 dígitos**: Telefone fixo válido
-   ✅ **11 dígitos**: Celular válido
-   ❌ **< 10 ou > 11**: Inválido
-   ✅ **Apenas números**: Remove caracteres especiais automaticamente

### 📍 **Máscara de CEP**

#### **📮 Formato:**

-   **Padrão**: `00000-000`
-   **Aplicação**: Automática após 5º dígito
-   **Limite**: 9 caracteres (com máscara)
-   **Input mode**: Numérico (mobile)

#### **🔧 Funcionamento:**

```typescript
// Entrada: "01001000"
// Saída: "01001-000"

// Entrada: "01001"
// Saída: "01001" (sem hífen ainda)
```

#### **📋 Validações:**

-   ✅ **8 dígitos**: CEP válido para busca
-   ❌ **< 8 dígitos**: Botão busca desabilitado
-   ✅ **Apenas números**: Remove caracteres especiais automaticamente

## 🎯 **Service MaskService**

### **📥 Métodos Principais:**

#### **1. Aplicação de Máscaras:**

-   **`aplicarMascaraTelefone(value: string)`**: Formata telefone em tempo real
-   **`aplicarMascaraCep(value: string)`**: Formata CEP em tempo real

#### **2. Remoção de Máscaras:**

-   **`removerMascaraTelefone(value: string)`**: Remove formatação, mantém números
-   **`removerMascaraCep(value: string)`**: Remove formatação, mantém números

#### **3. Validações:**

-   **`validarTelefone(telefone: string)`**: Valida formato brasileiro
-   **`validarCep(cep: string)`**: Valida formato brasileiro

#### **4. Formatação Final:**

-   **`formatarTelefone(telefone: string)`**: Formato final para exibição
-   **`formatarCep(cep: string)`**: Formato final para exibição

## 🎨 **Integração no Formulário**

### **📱 Campo Telefone:**

```typescript
// Máscara automática na digitação
const handleInputChange = (field, value) => {
    if (field === 'telefone') {
        maskedValue = MaskService.aplicarMascaraTelefone(value);
    }
    setFormData((prev) => ({ ...prev, [field]: maskedValue }));
};

// Validação no envio
if (!MaskService.validarTelefone(formData.telefone)) {
    setToastMessage('Telefone inválido. Use o formato (11) 99999-9999');
    return;
}
```

### **📍 Campo CEP:**

```typescript
// Máscara automática na digitação
const handleInputChange = (field, value) => {
    if (field === 'cep') {
        maskedValue = MaskService.aplicarMascaraCep(value);
    }
    setFormData(prev => ({ ...prev, [field]: maskedValue }));
};

// Validação para habilitar busca
disabled={!MaskService.validarCep(formData.cep)}
```

## 🔒 **Validações Implementadas**

### **✅ Telefone:**

-   **Formato**: Deve ter 10 ou 11 dígitos
-   **DDD**: Aceita qualquer DDD brasileiro (11-99)
-   **Fixo**: (11) 9999-9999
-   **Celular**: (11) 99999-9999
-   **Feedback**: "Telefone inválido. Use o formato (11) 99999-9999"

### **✅ CEP:**

-   **Formato**: Deve ter exatamente 8 dígitos
-   **Máscara**: 00000-000
-   **Busca**: Só habilita com CEP válido
-   **Feedback**: "CEP inválido. Use o formato 00000-000"

### **🎯 Estados dos Campos:**

#### **📞 Telefone:**

-   **Vazio**: Placeholder "(11) 99999-9999"
-   **Digitando**: Máscara aplicada em tempo real
-   **Válido**: 10 ou 11 dígitos formatados
-   **Inválido**: Toast de erro no envio

#### **📍 CEP:**

-   **Vazio**: Placeholder "00000-000"
-   **Digitando**: Máscara aplicada após 5º dígito
-   **Válido**: 8 dígitos, botão busca habilitado
-   **Inválido**: Botão busca desabilitado

## 📱 **Experiência do Usuário**

### **🎯 Benefícios das Máscaras:**

1. **Digitação Guiada**: Usuário sabe o formato esperado
2. **Validação Visual**: Feedback imediato
3. **Prevenção de Erros**: Formatos corretos automaticamente
4. **Acessibilidade**: Input modes otimizados (numeric para CEP)
5. **Consistência**: Padrões brasileiros respeitados

### **📋 Fluxo de Uso:**

#### **Telefone:**

1. **Digite**: `11999999999`
2. **Veja**: `(11) 99999-9999` (automático)
3. **Envie**: Validação confirma formato
4. **PDF**: Telefone formatado no documento

#### **CEP:**

1. **Digite**: `01001000`
2. **Veja**: `01001-000` (automático)
3. **Busque**: Botão habilitado automaticamente
4. **Resultado**: Endereço preenchido

## 🔧 **Especificações Técnicas**

### **📐 Limites de Caracteres:**

-   **Telefone**: 15 caracteres (máximo com máscara)
-   **CEP**: 9 caracteres (máximo com máscara)

### **⌨️ Input Modes:**

-   **Telefone**: `type="tel"` (teclado telefônico no mobile)
-   **CEP**: `inputmode="numeric"` (teclado numérico no mobile)

### **🔄 Processamento:**

-   **Tempo Real**: Máscaras aplicadas durante digitação
-   **Validação**: No envio do formulário
-   **Limpeza**: Remove máscaras para processamento interno
-   **Formatação**: Reaplica máscaras para exibição

## 🎨 **Integração com Cores Petrobras**

### **🎯 Estados Visuais:**

-   **Normal**: Campo branco, texto preto
-   **Válido**: Sem indicação especial (padrão)
-   **Inválido**: Toast laranja Petrobras (`#ED8B00`)
-   **Busca CEP**: Botão amarelo Petrobras (`#FDC82F`)

### **📱 Feedback:**

-   **Toast Sucesso**: Verde Petrobras
-   **Toast Erro**: Laranja Petrobras
-   **Botões**: Cores da paleta oficial

## 🚀 **Próximas Melhorias**

### **🎭 Máscaras Adicionais:**

-   **CPF**: 000.000.000-00
-   **CNPJ**: 00.000.000/0000-00
-   **Data**: DD/MM/AAAA
-   **Moeda**: R$ 0.000,00

### **🔍 Validações Avançadas:**

-   **Email**: Regex mais robusta
-   **Telefone**: Validação de DDD existente
-   **CEP**: Validação de faixas válidas
-   **Nome**: Validação de caracteres especiais

### **📊 UX Melhorada:**

-   **Indicadores visuais**: Ícones de válido/inválido
-   **Sugestões**: Autocompletar campos
-   **Formatação inteligente**: Detectar tipo automaticamente

## 💡 **Exemplo Completo**

```typescript
// Usuário digita: "11999999999"
// Sistema aplica: "(11) 99999-9999"
// Validação: ✅ 11 dígitos (celular válido)
// PDF: "(11) 99999-9999"

// Usuário digita: "01001000"
// Sistema aplica: "01001-000"
// Validação: ✅ 8 dígitos (CEP válido)
// Busca: Botão habilitado
// PDF: "01001-000"
```

**As máscaras estão funcionando perfeitamente!** 🎭✨

Agora os campos têm formatação automática, validação robusta e uma experiência de usuário muito mais profissional e intuitiva.
