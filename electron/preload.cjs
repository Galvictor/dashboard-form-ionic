const { contextBridge, ipcRenderer } = require('electron');

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Exemplo de API para comunicação com o processo principal
    platform: process.platform,

    // Função para obter informações do sistema
    getSystemInfo: () => {
        return {
            platform: process.platform,
            arch: process.arch,
            version: process.versions,
        };
    },

    // Exemplo de comunicação bidirecional (se necessário no futuro)
    // sendMessage: (message) => ipcRenderer.invoke('send-message', message),
    // onMessage: (callback) => ipcRenderer.on('message', callback)
});

// Log para debug (remover em produção se não necessário)
console.log('Preload script carregado');
