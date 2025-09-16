import { createContext } from 'react';

export interface NetworkContextType {
    isOnline: boolean;
    connectionType: string;
    isLoading: boolean;
}

export const NetworkContext = createContext<NetworkContextType | undefined>(undefined);
