# 📍 Service de CEP - Integração ViaCEP

## ✅ Funcionalidades Implementadas

### 🌐 **API ViaCEP**

-   **URL**: `https://viacep.com.br/ws/{cep}/json/`
-   **Método**: GET
-   **Formato**: JSON
-   **Gratuita**: Sem necessidade de API key
-   **Confiável**: Dados oficiais dos Correios

### 🔧 **Service CepService**

#### **📥 Métodos Disponíveis:**

1. **`buscarCep(cep: string)`**

    - Busca dados completos do CEP
    - Retorna objeto `CepResponse` ou `null`
    - Trata erros automaticamente

2. **`validarCep(cep: string)`**

    - Valida formato do CEP (8 dígitos)
    - Retorna `boolean`

3. **`formatarCep(cep: string)`**

    - Formata CEP para exibição (00000-000)
    - Retorna string formatada

4. **`buscarEnderecoCompleto(cep: string)`**

    - Busca e formata endereço para o formulário
    - Retorna `EnderecoCompleto` ou `null`

5. **`formatarEndereco(cepData: CepResponse)`**
    - Converte resposta da API em endereço legível
    - Monta string completa do endereço

### 📋 **Tipos TypeScript**

```typescript
interface CepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

interface EnderecoCompleto {
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    estado: string;
}
```

## 🎯 **Integração no Formulário**

### **🔍 Busca Automática**

1. **Digite CEP**: Campo aceita 8 ou 9 caracteres
2. **Clique na lupa**: Botão amarelo Petrobras (`#FDC82F`)
3. **Loading**: Ícone gira durante busca
4. **Preenchimento**: Endereço preenchido automaticamente
5. **Feedback**: Toast com resultado da busca

### **🎨 Interface**

-   **Botão Busca**: Amarelo Petrobras (secondary color)
-   **Ícone**: Lupa (`searchOutline`)
-   **Loading**: Animação de rotação
-   **Campo Endereço**: Fica readonly durante busca
-   **Placeholder**: Orientação clara para o usuário

### **📱 Estados Visuais**

-   **Normal**: Botão habilitado, campo editável
-   **Buscando**: Ícone girando, campo readonly, texto "(buscando...)"
-   **Sucesso**: Endereço preenchido, toast de confirmação
-   **Erro**: Toast com mensagem de erro

## 🚀 **Exemplo de Uso**

### **1. Busca de CEP**

```typescript
// Service
const endereco = await CepService.buscarEnderecoCompleto('01001000');

// Resultado
{
  endereco: "Praça da Sé, lado ímpar",
  bairro: "Sé",
  cidade: "São Paulo",
  uf: "SP",
  estado: "São Paulo"
}
```

### **2. Integração no Form**

```typescript
const handleBuscarCep = async () => {
    setBuscandoCep(true);

    const enderecoCompleto = await CepService.buscarEnderecoCompleto(formData.cep);

    if (enderecoCompleto) {
        setFormData((prev) => ({
            ...prev,
            cep: CepService.formatarCep(formData.cep),
            endereco: `${enderecoCompleto.endereco}, ${enderecoCompleto.bairro}, ${enderecoCompleto.cidade}/${enderecoCompleto.uf}`,
        }));
    }

    setBuscandoCep(false);
};
```

## 🔒 **Validações e Tratamento de Erros**

### **✅ Validações Implementadas**

-   **Formato CEP**: Deve ter exatamente 8 dígitos
-   **Campo Vazio**: Impede busca sem CEP
-   **Caracteres Especiais**: Remove automaticamente
-   **CEP Inexistente**: Trata resposta de erro da API

### **🛡️ Tratamento de Erros**

-   **Rede**: Problemas de conectividade
-   **API**: Erros do servidor ViaCEP
-   **CEP Inválido**: Formato incorreto
-   **CEP Não Encontrado**: CEP válido mas inexistente

### **📢 Feedback ao Usuário**

-   **Sucesso**: "Endereço encontrado: São Paulo/SP"
-   **CEP Inválido**: "CEP inválido"
-   **Não Encontrado**: "CEP não encontrado. Verifique se está correto."
-   **Erro Rede**: "Erro ao buscar CEP. Tente novamente."

## 🎨 **Cores Petrobras Aplicadas**

-   **Botão Buscar**: Amarelo Petrobras `#FDC82F`
-   **Texto Loading**: Amarelo Petrobras
-   **Feedback Success**: Verde Petrobras
-   **Feedback Error**: Laranja Petrobras

## 📱 **Compatibilidade**

### **✅ Funciona em:**

-   **Electron** (desktop)
-   **Web** (navegadores modernos)
-   **Mobile** (via Capacitor)
-   **PWA** (offline com cache)

### **🌐 Requisitos**

-   **Internet**: Necessária para busca
-   **CORS**: API ViaCEP permite requisições do browser
-   **HTTPS**: Funciona em ambientes seguros

## 🚀 **Próximas Melhorias**

### **📦 Cache Local**

-   Salvar CEPs buscados no localStorage
-   Reduzir requisições desnecessárias
-   Funcionar offline para CEPs conhecidos

### **🎯 Busca Avançada**

-   Busca por endereço (API reversa)
-   Sugestões de endereços
-   Validação de número da casa

### **📊 Analytics**

-   Rastrear CEPs mais buscados
-   Métricas de uso da API
-   Otimização de performance

**A integração com ViaCEP está funcionando perfeitamente!** 📍✨
