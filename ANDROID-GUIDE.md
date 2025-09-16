# 📱 Guia Android - Dashboard Test Ionic

## ✅ **App Instalado e Funcionando!**

### 🎯 **Funcionalidades no Android:**

-   ✅ **Câmera nativa** funcionando perfeitamente
-   ✅ **Máscaras** com teclados otimizados
-   ✅ **Busca CEP** via internet móvel
-   ✅ **PDF salvo** na pasta Documents do dispositivo
-   ✅ **Cores Petrobras** em tela nativa

## 📄 **Onde Encontrar o PDF Gerado**

### 📁 **Localização no Android:**

O PDF é salvo em **duas tentativas**:

1. **📂 Pasta Documents** (principal):

    - Caminho: `/storage/emulated/0/Documents/`
    - Acesso: Gerenciador de Arquivos → Documents
    - Nome: `formulario_nome_timestamp.pdf`

2. **📥 Pasta Downloads** (se permitido):
    - Caminho: `/storage/emulated/0/Download/`
    - Acesso: Gerenciador de Arquivos → Downloads
    - Backup: Caso Documents não funcione

### 🔍 **Como Encontrar:**

#### **Método 1 - Gerenciador de Arquivos:**

1. Abra **Gerenciador de Arquivos** do Android
2. Vá para **Armazenamento Interno**
3. Procure pasta **Documents**
4. Encontre arquivo `formulario_seu_nome_*.pdf`

#### **Método 2 - App de Downloads:**

1. Abra app **Downloads** do Android
2. Procure por arquivos PDF
3. Filtre por "hoje" ou "recentes"

#### **Método 3 - Busca Global:**

1. Use **busca do Android** (deslize para baixo)
2. Digite: `formulario` ou `.pdf`
3. Encontre o arquivo gerado

### 📋 **Log de Confirmação:**

No console você verá:

```
PDF salvo com sucesso no Android: file:///storage/emulated/0/Documents/formulario_nome_*.pdf
```

### 🔧 **Permissões Necessárias:**

-   ✅ **Armazenamento**: Já configurado automaticamente
-   ✅ **Câmera**: Solicitado quando usar
-   ✅ **Internet**: Para busca de CEP

## 🚀 **Scripts para Android**

### **📱 Comandos Úteis:**

```bash
# Build completo + deploy
npm run android:build

# Apenas sincronizar
npm run android:sync

# Apenas executar (se já buildado)
npm run android:run

# Abrir Android Studio (para debug)
npx cap open android
```

### **🔄 Desenvolvimento Contínuo:**

```bash
# Fazer mudanças no código
# Depois executar:
npm run android:build
```

## 🎯 **Teste Completo no Android**

### **📝 Fluxo de Teste:**

1. **Abra o app** no Android
2. **Preencha formulário** com dados reais
3. **Capture foto** com câmera nativa
4. **Digite CEP** e veja máscara aplicada
5. **Busque endereço** automaticamente
6. **Gere PDF** clicando no botão
7. **Veja toast**: "PDF salvo na pasta Documents do dispositivo!"
8. **Encontre arquivo** no gerenciador de arquivos

### **📱 Recursos Nativos Testáveis:**

-   **Câmera**: Acesso direto à câmera do Android
-   **Galeria**: Seleção de fotos existentes
-   **Teclados**: Numérico para CEP, telefônico para telefone
-   **Haptic**: Feedback tátil em ações
-   **Status Bar**: Integrada com tema do app
-   **Orientação**: Funciona em portrait e landscape

### **🎨 Visual Nativo:**

-   **Cores Petrobras**: Renderizadas nativamente
-   **Fontes**: Sistema Android
-   **Animações**: Suaves e nativas
-   **Responsividade**: Adapta ao tamanho da tela

## 🔧 **Troubleshooting Android**

### **PDF não encontrado:**

1. Verifique pasta **Documents** primeiro
2. Depois pasta **Downloads**
3. Use busca global do Android
4. Verifique logs no console

### **Câmera não funciona:**

1. Verifique permissões do app
2. Configurações → Apps → Dashboard Test → Permissões
3. Habilite "Câmera" e "Armazenamento"

### **App não instala:**

1. Verifique se USB debugging está ativo
2. Confirme instalação no dispositivo
3. Execute `npx cap run android` novamente

**O app está funcionando perfeitamente no Android!** 📱✨

Agora você tem uma aplicação nativa completa com todas as funcionalidades: câmera, máscaras, busca de CEP, geração de PDF e design Petrobras funcionando nativamente no seu dispositivo Android.
