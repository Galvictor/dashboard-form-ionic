import React, { useEffect, useState, ReactNode } from 'react';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { NetworkContext, NetworkContextType } from './NetworkContext';

interface NetworkProviderProps {
    children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [connectionType, setConnectionType] = useState<string>('unknown');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeNetwork = async () => {
            try {
                // Verificar se estamos em plataforma que suporta Network plugin
                if (Capacitor.isNativePlatform()) {
                    // Obter status inicial da rede
                    const status = await Network.getStatus();
                    setIsOnline(status.connected);
                    setConnectionType(status.connectionType);

                    // Listener para mudanças na conexão
                    const networkListener = await Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
                        console.log('Network status changed:', status);
                        setIsOnline(status.connected);
                        setConnectionType(status.connectionType);
                    });

                    // Cleanup function
                    return () => {
                        networkListener.remove();
                    };
                } else {
                    // Para web/electron, usar API nativa do browser
                    const updateOnlineStatus = () => {
                        const online = navigator.onLine;
                        console.log('Network status changed (browser):', online);
                        setIsOnline(online);
                        setConnectionType(online ? 'wifi' : 'none');
                    };

                    // Status inicial
                    updateOnlineStatus();

                    // Listeners para mudanças
                    window.addEventListener('online', updateOnlineStatus);
                    window.addEventListener('offline', updateOnlineStatus);

                    // Verificar status a cada 3 segundos como backup
                    const interval = setInterval(updateOnlineStatus, 3000);

                    // Cleanup function
                    return () => {
                        window.removeEventListener('online', updateOnlineStatus);
                        window.removeEventListener('offline', updateOnlineStatus);
                        clearInterval(interval);
                    };
                }
            } catch (error) {
                console.error('Erro ao inicializar monitoramento de rede:', error);
                // Fallback: assumir que está online
                setIsOnline(true);
                setConnectionType('unknown');
            } finally {
                setIsLoading(false);
            }
        };

        const cleanup = initializeNetwork();

        return () => {
            if (cleanup instanceof Promise) {
                cleanup.then((cleanupFn) => {
                    if (cleanupFn) cleanupFn();
                });
            }
        };
    }, []);

    const value: NetworkContextType = {
        isOnline,
        connectionType,
        isLoading,
    };

    return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};
