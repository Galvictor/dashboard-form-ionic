# Dashboard Test Ionic - Capacitor Electron

Este projeto agora suporta builds para desktop usando **Capacitor Electron** da comunidade.

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
# Executar em modo desenvolvimento (hot reload)
npm run electron:dev

# Ou diretamente:
npx cap open @capacitor-community/electron
```

### Sincronização e Build

```bash
# Sincronizar arquivos com plataforma Electron
npm run electron:sync

# Criar build para Electron
npm run electron:build
```

### Build de Produção (dentro da pasta electron/)

```bash
cd electron
npm run electron:pack    # Criar build empacotado
npm run electron:make    # Criar instaladores
```

## 📁 Estrutura de Arquivos

```
dashboard-test-ionc/
├── electron/                    # Projeto Electron gerado pelo Capacitor
│   ├── app/                     # Build web copiado automaticamente
│   ├── src/
│   │   ├── index.ts            # Processo principal do Electron
│   │   ├── preload.ts          # Script de preload
│   │   └── setup.ts            # Configurações
│   ├── assets/                 # Ícones e recursos
│   ├── package.json            # Dependências do Electron
│   └── electron-builder.config.json  # Configuração do builder
├── dist/                       # Build web (gerado pelo Vite)
└── capacitor.config.ts         # Configuração do Capacitor
```

## ⚙️ Configuração

### Capacitor Config

O arquivo `capacitor.config.ts` controla as configurações básicas:

```typescript
const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'dashboard-test-ionc',
    webDir: 'dist',
};
```

### Electron Builder

As configurações de build estão em `electron/electron-builder.config.json`:

-   Ícones da aplicação
-   Configurações de instalador
-   Targets de build (Windows, macOS, Linux)

## ✨ Funcionalidades

-   ✅ **Integração nativa com Capacitor**: Todos os plugins Capacitor funcionam
-   ✅ **Hot reload em desenvolvimento**: Mudanças refletem automaticamente
-   ✅ **Auto-updater**: Suporte a atualizações automáticas
-   ✅ **Menu nativo**: Menu personalizado do sistema operacional
-   ✅ **Builds multiplataforma**: Windows, macOS e Linux
-   ✅ **Segurança moderna**: Context isolation e preload scripts
-   ✅ **Gerenciamento de estado**: Salva posição e tamanho da janela

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run build                    # Build web
npm run electron:sync           # Sincronizar com Electron
npm run electron:dev            # Executar em desenvolvimento (comando correto)

# Comandos diretos do Capacitor
npx cap sync @capacitor-community/electron     # Sincronizar
npx cap open @capacitor-community/electron     # Abrir em desenvolvimento

# Produção
cd electron
npm run build                   # Compilar TypeScript do Electron
npm run electron:start          # Executar versão compilada
npm run electron:pack           # Criar build empacotado
npm run electron:make           # Criar instaladores
```

## 🔧 Troubleshooting

### Erro ao sincronizar

Execute `npm run build` antes de `npm run electron:sync`.

### Electron não abre

Verifique se a build web existe em `dist/` e se foi sincronizada.

### Problemas de TypeScript

Entre na pasta `electron/` e execute `npm install` para instalar dependências.

### Hot reload não funciona

Certifique-se de que o servidor Vite está rodando na porta 5173.

## 🎯 Vantagens do Capacitor Electron

Comparado à configuração manual do Electron, o Capacitor Electron oferece:

1. **Integração perfeita**: Funciona nativamente com todos os plugins Capacitor
2. **Manutenção simplificada**: Gerenciado pela comunidade Capacitor
3. **Configuração automática**: Setup inicial completamente automatizado
4. **Hot reload nativo**: Desenvolvimento mais rápido e eficiente
5. **Atualizações automáticas**: Sistema de update integrado
6. **TypeScript first**: Totalmente tipado desde o início
7. **Cross-platform**: Builds para todas as plataformas desktop
