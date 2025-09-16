import { useContext } from 'react';
import { NetworkContext, NetworkContextType } from '../contexts/NetworkContext';

// Hook customizado para usar o contexto
export const useNetwork = (): NetworkContextType => {
    const context = useContext(NetworkContext);

    if (context === undefined) {
        throw new Error('useNetwork deve ser usado dentro de um NetworkProvider');
    }

    return context;
};

// Hook para verificar se uma funcionalidade específica está disponível
export const useNetworkFeature = (requiresInternet: boolean = true) => {
    const { isOnline } = useNetwork();

    return {
        isAvailable: requiresInternet ? isOnline : true,
        reason: !isOnline ? 'Sem conexão com a internet' : null,
    };
};
