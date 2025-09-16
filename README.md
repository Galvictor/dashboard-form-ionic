# 🎯 Dashboard Test Ionic

Um dashboard moderno e profissional desenvolvido com **Ionic React**, **Capacitor** e **Electron**, seguindo a identidade visual da **Petrobras**.

## ✨ Funcionalidades

### 📋 **Formulário Completo**

-   **📸 Captura de Foto**: Câmera nativa ou seleção de arquivo
-   **👤 Dados Pessoais**: Nome, email, telefone (obrigatórios)
-   **📍 Busca Automática de CEP**: Integração com API ViaCEP
-   **🎭 Máscaras Automáticas**: Telefone e CEP formatados em tempo real
-   **📄 Geração de PDF**: Documento profissional com layout Petrobras

### 🎨 **Design System Petrobras**

-   **🟢 Verde Petrobras** `#008542` - Cor primária
-   **🟡 Amarelo Petrobras** `#FDC82F` - Cor secundária
-   **🔵 Verde Água** `#00B2A9` - Cor terciária
-   **🟠 Laranja** `#ED8B00` - Alertas e remoções
-   **⚫ Modo claro fixo** - Sempre fundo branco, texto preto

### 🌐 **Multiplataforma**

-   **🖥️ Desktop**: Aplicação Electron nativa
-   **📱 Android**: App nativo via Capacitor
-   **🌐 Web**: Progressive Web App
-   **📱 iOS**: Suporte completo (não testado)

## 🚀 Instalação e Uso

### **📋 Pré-requisitos**

-   **Node.js** 18+
-   **npm** ou **yarn**
-   **Android Studio** (para Android)
-   **Git**

### **⚡ Instalação Rápida**

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd dashboard-test-ionc

# Instale dependências
npm install

# Build inicial
npm run build
```

## 🛠️ Scripts Disponíveis

### **🌐 Desenvolvimento Web**

```bash
# Servidor de desenvolvimento
ionic serve
# Acesse: http://localhost:8100
```

### **🖥️ Desenvolvimento Desktop (Electron)**

```bash
# Electron com hot reload
npm run electron:dev

# Apenas Electron (após build)
npm run electron
```

### **📱 Desenvolvimento Mobile**

```bash
# Android (dispositivo conectado)
npm run android:build

# Apenas sincronizar mudanças
npm run android:sync
```

### **📦 Builds de Produção**

```bash
# Build web
npm run build

# Build Electron + correções
npm run electron:build

# Gerar executáveis Electron
npm run electron:pack    # Arquivo executável
npm run electron:dist    # Instaladores

# Build Android
npm run android:build
```

## 📁 Estrutura do Projeto

```
dashboard-test-ionc/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Menu.tsx         # Sidebar do dashboard
│   │   ├── PhotoUpload.tsx  # Upload de foto com câmera
│   │   └── FormFields.tsx   # Campos do formulário
│   ├── hooks/
│   │   └── useFormulario.ts # Hook customizado para lógica
│   ├── pages/
│   │   └── Page.tsx         # Página principal (refatorada)
│   ├── services/
│   │   ├── cepService.ts    # Integração ViaCEP
│   │   ├── pdfService.ts    # Geração de PDF
│   │   └── maskService.ts   # Máscaras de campos
│   └── theme/
│       └── variables.css    # Cores Petrobras
├── electron/                # Configuração Electron
│   ├── main.js             # Processo principal
│   └── preload.cjs         # Script preload
├── android/                 # Projeto Android (gerado)
├── scripts/
│   └── fix-electron-build.js # Correções automáticas
└── dist/                   # Build final
```

## 🎯 Funcionalidades Detalhadas

### **📸 Sistema de Foto Inteligente**

-   **Electron**: Câmera nativa funcional
-   **Android**: Câmera ou galeria do dispositivo
-   **Web**: Fallback automático para seleção de arquivo
-   **Validações**: Tipo de arquivo, tamanho máximo 5MB
-   **Preview**: Avatar com borda verde quando capturada

### **📍 Integração ViaCEP**

-   **API Oficial**: Dados dos Correios brasileiros
-   **Busca Automática**: Digite CEP → clique lupa → endereço preenchido
-   **Validação**: Formato CEP brasileiro (8 dígitos)
-   **Feedback**: Toast messages informativos
-   **Loading**: Ícone girando durante busca

### **🎭 Máscaras e Validações**

-   **Telefone**: `(11) 99999-9999` - Fixo ou celular
-   **CEP**: `00000-000` - Formato brasileiro
-   **Aplicação**: Automática durante digitação
-   **Validação**: Formatos corretos antes do envio

### **📄 Geração de PDF Profissional**

-   **Layout Petrobras**: Cabeçalho verde, seção amarela
-   **Conteúdo**: Todos os dados + foto + timestamp
-   **Multiplataforma**:
    -   **Web/Electron**: Download automático
    -   **Android**: Salvo em Documents/Downloads
-   **Nome**: `formulario_nome_timestamp.pdf`

## 🎨 Paleta de Cores Petrobras

```css
/* Cores Oficiais Implementadas */
--verde-petrobras: #008542    /* Primary - Toolbar, botões */
--amarelo-petrobras: #FDC82F  /* Secondary - Busca CEP */
--verde-agua: #00B2A9         /* Tertiary - Câmera */
--verde-claro: #C4D600        /* Success */
--amarelo-claro: #EBFFDD      /* Light */
--laranja: #ED8B00            /* Warning/Danger */
--azul-escuro: #006298        /* Dark */
--azul-claro: #3DDAFF         /* Custom */
--cinza: #75787B              /* Medium */
```

## 🔧 Tecnologias Utilizadas

### **⚛️ Frontend**

-   **React** 19.0.0 + **TypeScript**
-   **Ionic React** 8.5.0
-   **Vite** 5.2.0 (build tool)

### **📱 Mobile**

-   **Capacitor** 7.4.3
-   **Capacitor Camera** 7.0.2
-   **Capacitor Filesystem** 7.1.4

### **🖥️ Desktop**

-   **Electron** 38.1.0
-   **Electron Builder** 26.0.12

### **🌐 APIs e Serviços**

-   **ViaCEP**: Busca de endereços brasileiros
-   **jsPDF**: Geração de documentos PDF

### **🎨 UI/UX**

-   **Ionicons**: Ícones oficiais do Ionic
-   **PWA Elements**: Interface nativa para câmera

## 📱 Plataformas Suportadas

### **✅ Testado e Funcionando**

-   **Windows** (Electron)
-   **Android** (Capacitor)
-   **Web** (PWA)

### **✅ Suporte Teórico**

-   **macOS** (Electron)
-   **Linux** (Electron)
-   **iOS** (Capacitor)

## 🔒 Permissões e Segurança

### **📱 Android**

-   **Câmera**: Solicitada automaticamente
-   **Armazenamento**: Para salvar PDFs
-   **Internet**: Para busca de CEP

### **🖥️ Electron**

-   **Context Isolation**: Habilitado
-   **Node Integration**: Desabilitado
-   **Preload Script**: Segurança aprimorada

## 🎯 Como Usar

### **1. Desenvolvimento**

```bash
# Web (com fallback de arquivo para foto)
ionic serve

# Electron (com câmera nativa)
npm run electron:dev

# Android (app nativo)
npm run android:build
```

### **2. Produção**

```bash
# Desktop
npm run electron:dist

# Android
npm run android:build

# Web
npm run build
```

### **3. Teste Completo**

1. **Preencha formulário** com dados reais
2. **Capture foto** (câmera ou arquivo)
3. **Digite CEP** e veja busca automática
4. **Gere PDF** com layout Petrobras
5. **Encontre arquivo** na pasta correta

## 📊 Arquitetura

### **🏗️ Padrões Aplicados**

-   **Hook Customizado**: Lógica centralizada
-   **Componentes Isolados**: Responsabilidades separadas
-   **Services**: Integrações externas
-   **TypeScript**: Tipagem completa

### **📦 Separação de Responsabilidades**

-   **`useFormulario`**: Estado e validações
-   **`PhotoUpload`**: Funcionalidades de foto
-   **`FormFields`**: Campos do formulário
-   **`Page`**: Layout e composição

## 🚀 Próximas Melhorias

### **📊 Funcionalidades**

-   **Múltiplos formulários**: Form 2, Form 3, etc.
-   **Dashboard analytics**: Gráficos e métricas
-   **Sincronização**: Cloud storage
-   **Offline**: Cache local de dados

### **🎨 Interface**

-   **Dark mode**: Modo escuro opcional
-   **Acessibilidade**: WCAG compliance
-   **Animações**: Micro-interações
-   **Responsividade**: Tablets e TVs

### **🔧 Técnicas**

-   **Testes**: Unit e E2E tests
-   **CI/CD**: Pipeline automatizado
-   **Performance**: Code splitting
-   **SEO**: Meta tags otimizadas

## 👥 Contribuição

### **🔄 Workflow**

1. Fork o projeto
2. Crie branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push branch (`git push origin feature/nova-funcionalidade`)
5. Abra Pull Request

### **📋 Padrões**

-   **Commits**: Conventional Commits
-   **Código**: ESLint + Prettier
-   **TypeScript**: Strict mode
-   **Testes**: Jest + Testing Library

## 📄 Licença

Este projeto está sob licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

### **🐛 Problemas Conhecidos**

-   **Web**: Câmera pode não funcionar (usa fallback de arquivo)
-   **Android**: PDF salvo em Documents (não Downloads)
-   **iOS**: Não testado (mas deve funcionar)

### **📚 Documentação Adicional**

-   **[CAMERA-FEATURES.md](./CAMERA-FEATURES.md)**: Funcionalidades da câmera
-   **[CEP-SERVICE.md](./CEP-SERVICE.md)**: Integração ViaCEP
-   **[PDF-GENERATOR.md](./PDF-GENERATOR.md)**: Geração de PDF
-   **[MASKS-VALIDATION.md](./MASKS-VALIDATION.md)**: Máscaras e validações
-   **[ANDROID-GUIDE.md](./ANDROID-GUIDE.md)**: Guia para Android
-   **[REFACTORING.md](./REFACTORING.md)**: Arquitetura do código

---

**Desenvolvido com ❤️ usando tecnologias modernas e boas práticas de desenvolvimento.**

🎨 **Design**: Identidade visual Petrobras  
⚡ **Performance**: Otimizado para todas as plataformas  
🔒 **Segurança**: Melhores práticas aplicadas  
📱 **Responsivo**: Funciona em qualquer dispositivo
