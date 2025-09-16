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
                    // Para web/electron, testar conectividade real
                    const checkRealConnectivity = async () => {
                        try {
                            // Tentar fazer uma requisição rápida para testar conectividade real
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), 3000);

                            await fetch('https://www.google.com/favicon.ico', {
                                method: 'HEAD',
                                mode: 'no-cors',
                                signal: controller.signal,
                            });

                            clearTimeout(timeoutId);
                            return true;
                        } catch (error) {
                            console.log('Connectivity test failed:', error instanceof Error ? error.message : 'Unknown error');
                            return false;
                        }
                    };

                    const updateOnlineStatus = async () => {
                        const isReallyOnline = await checkRealConnectivity();
                        console.log('Network status (real connectivity):', isReallyOnline);
                        setIsOnline(isReallyOnline);
                        setConnectionType(isReallyOnline ? 'wifi' : 'none');
                    };

                    // Status inicial
                    updateOnlineStatus();

                    // Listeners para mudanças (como backup)
                    window.addEventListener('online', updateOnlineStatus);
                    window.addEventListener('offline', updateOnlineStatus);

                    // Verificar conectividade real a cada 5 segundos
                    const interval = setInterval(updateOnlineStatus, 5000);

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
