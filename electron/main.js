import { app, BrowserWindow, Menu, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

// Manter referência global da janela
let mainWindow;

function createWindow() {
    // Criar a janela principal
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.cjs'),
        },
        icon: path.join(__dirname, '../public/favicon.png'), // Ícone da aplicação
        show: false, // Não mostrar até estar pronto
    });

    // Carregar a aplicação
    if (isDev) {
        // Em desenvolvimento, carregar do servidor Vite
        mainWindow.loadURL('http://localhost:5173');
        // Abrir DevTools em desenvolvimento
        mainWindow.webContents.openDevTools();
    } else {
        // Em produção, carregar arquivo HTML buildado
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Mostrar janela quando estiver pronta
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Limpar referência quando janela for fechada
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Configurar menu da aplicação
    createMenu();
}

function createMenu() {
    const template = [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Sair',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'Visualizar',
            submenu: [
                { role: 'reload', label: 'Recarregar' },
                { role: 'forceReload', label: 'Forçar Recarregamento' },
                { role: 'toggleDevTools', label: 'Ferramentas de Desenvolvedor' },
                { type: 'separator' },
                { role: 'resetZoom', label: 'Zoom Padrão' },
                { role: 'zoomIn', label: 'Aumentar Zoom' },
                { role: 'zoomOut', label: 'Diminuir Zoom' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Tela Cheia' },
            ],
        },
        {
            label: 'Janela',
            submenu: [
                { role: 'minimize', label: 'Minimizar' },
                { role: 'close', label: 'Fechar' },
            ],
        },
    ];

    // Menu específico para macOS
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about', label: 'Sobre' },
                { type: 'separator' },
                { role: 'services', label: 'Serviços', submenu: [] },
                { type: 'separator' },
                { role: 'hide', label: 'Ocultar' },
                { role: 'hideOthers', label: 'Ocultar Outros' },
                { role: 'unhide', label: 'Mostrar Todos' },
                { type: 'separator' },
                { role: 'quit', label: 'Sair' },
            ],
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Executar quando o Electron terminar de inicializar
app.whenReady().then(createWindow);

// Sair quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
    // No macOS, aplicações ficam ativas mesmo sem janelas abertas
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // No macOS, recriar janela quando ícone do dock for clicado
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Prevenir navegação externa
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (navigationEvent, navigationUrl) => {
        navigationEvent.preventDefault();
        shell.openExternal(navigationUrl);
    });
});
