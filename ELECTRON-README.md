# Dashboard Test Ionic - Electron Build

Este projeto agora suporta builds para desktop usando Electron.

## Scripts Disponíveis

### Desenvolvimento

```bash
# Executar apenas o Electron (certifique-se de que o servidor Vite está rodando)
npm run electron

# Executar em modo desenvolvimento (inicia Vite + Electron automaticamente)
npm run electron:dev
```

### Build de Produção

```bash
# Criar build web e empacotar para Electron
npm run electron:pack

# Criar build web e gerar instaladores
npm run electron:dist
```

## Estrutura de Arquivos

```
dashboard-test-ionc/
├── electron/
│   ├── main.js          # Processo principal do Electron
│   └── preload.js       # Script de preload para segurança
├── dist/                # Build web (gerado pelo Vite)
├── dist-electron/       # Builds do Electron (gerados pelo electron-builder)
└── public/
    └── favicon.png      # Ícone da aplicação
```

## Configuração

A configuração do Electron está no `package.json` na seção `build`. Você pode personalizar:

-   **appId**: Identificador único da aplicação
-   **productName**: Nome da aplicação
-   **icon**: Caminho para o ícone
-   **directories.output**: Diretório de saída dos builds
-   **win/mac/linux**: Configurações específicas por plataforma

## Funcionalidades

-   ✅ Menu nativo da aplicação
-   ✅ Janela redimensionável (mínimo: 800x600)
-   ✅ Suporte a desenvolvimento com hot reload
-   ✅ Builds para Windows, macOS e Linux
-   ✅ Instaladores NSIS para Windows
-   ✅ AppImage para Linux
-   ✅ Segurança com contextIsolation habilitado

## Troubleshooting

### Erro ao executar electron:dev

Certifique-se de que a porta 5173 está disponível e que não há outro processo Vite rodando.

### Build falha

Verifique se todos os arquivos em `public/` existem, especialmente o `favicon.png`.

### Janela não abre

Verifique o console do terminal para erros do Electron. O arquivo `main.js` contém logs úteis.
