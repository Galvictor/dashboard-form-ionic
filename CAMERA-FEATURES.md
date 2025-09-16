# 📸 Funcionalidades da Câmera Implementadas

## ✅ Recursos Implementados

### 📱 **Captura de Foto**

-   **Plugin**: `@capacitor/camera`
-   **Fonte**: Câmera ou Galeria (usuário escolhe)
-   **Qualidade**: 90% (otimizada para web)
-   **Edição**: Permite edição básica antes de confirmar
-   **Formato**: DataURL (base64) para fácil armazenamento
-   **Dimensões**: 300x300px (otimizado para avatar)

### 🎛️ **Controles da Interface**

-   **Botão Câmera**: Verde água Petrobras (`#00B2A9`)
-   **Botão Remover**: Laranja Petrobras (`#ED8B00`) - aparece apenas quando há foto
-   **Indicador Visual**: Borda verde na foto quando capturada
-   **Feedback**: Toast messages para todas as ações

### 🔒 **Permissões e Segurança**

-   **Verificação Automática**: Checa permissões antes de usar
-   **Solicitação Inteligente**: Pede permissão apenas quando necessário
-   **Tratamento de Erros**: Mensagens claras para o usuário
-   **Fallback Seguro**: Funciona mesmo sem permissões (usa galeria)

### 💾 **Armazenamento**

-   **Estado Local**: Foto armazenada no estado do React
-   **Persistência**: Foto mantida até envio do formulário
-   **Limpeza**: Foto removida após envio ou manualmente
-   **Formato**: Base64 DataURL para compatibilidade máxima

## 🎯 **Como Funciona**

### **1. Capturar Foto**

```typescript
// Clique no botão da câmera
const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt, // Câmera ou Galeria
    width: 300,
    height: 300,
});
```

### **2. Opções Disponíveis**

-   **📷 Câmera**: Captura nova foto (Electron/Mobile)
-   **📁 Pasta**: Seleciona arquivo do computador (Web)
-   **🖼️ Galeria**: Seleciona foto existente (Mobile)
-   **✏️ Edição**: Corta/ajusta antes de confirmar
-   **🗑️ Remover**: Remove foto capturada

### **3. Estados da Foto**

-   **Sem Foto**: Avatar padrão + "Clique para capturar"
-   **Com Foto**: Foto capturada + "Foto capturada" + botão remover
-   **Borda Verde**: Indica foto válida capturada

## 🔧 **Configurações Técnicas**

### **PWA Elements**

-   Inicializado em `main.tsx`
-   Fornece UI nativa para câmera
-   Funciona em web e mobile

### **Capacitor Camera**

-   Plugin oficial do Capacitor
-   Suporte multiplataforma
-   Integração com sistema nativo

### **Tratamento de Erros**

-   Permissões negadas
-   Câmera não disponível
-   Cancelamento pelo usuário
-   Falhas de captura

## 📱 **Compatibilidade**

### **✅ Funciona em:**

-   **Electron** (desktop)
-   **Web** (navegadores modernos)
-   **Mobile** (via Capacitor)
-   **PWA** (Progressive Web App)

### **🎛️ Controles por Plataforma:**

-   **Electron (Desktop)**: Câmera nativa funcional
-   **Mobile**: Câmera nativa ou galeria
-   **Web**: Fallback automático para seleção de arquivo (input file)

## 🚀 **Próximas Melhorias Possíveis**

### **📁 Armazenamento Avançado**

-   Salvar no `@capacitor/filesystem`
-   Compressão adicional
-   Cache de fotos

### **🎨 Edição Avançada**

-   Filtros de foto
-   Redimensionamento manual
-   Rotação de imagem

### **☁️ Upload**

-   Integração com serviços de nuvem
-   Upload em background
-   Sincronização automática

## 💡 **Uso no Formulário**

```typescript
// A foto é incluída automaticamente no FormData
const formData = {
    nome: 'João Silva',
    email: 'joao@email.com',
    foto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA...',
    // ... outros campos
};
```

**A funcionalidade da câmera está totalmente integrada e pronta para uso!** 📸✨
