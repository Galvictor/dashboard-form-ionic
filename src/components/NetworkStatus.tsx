import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import { wifiOutline, cloudOfflineOutline, cellularOutline } from 'ionicons/icons';
import { useNetwork } from '../hooks/useNetwork';

interface NetworkStatusProps {
    showWhenOnline?: boolean;
    compact?: boolean;
    alwaysShow?: boolean; // Nova prop para sempre mostrar
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ showWhenOnline = false, compact = false, alwaysShow = false }) => {
    const { isOnline, connectionType, isLoading } = useNetwork();

    // Se está carregando, não mostrar nada
    if (isLoading) {
        return null;
    }

    // Se alwaysShow é true, sempre mostrar
    // Se está online e não deve mostrar quando online e não é alwaysShow, não mostrar
    if (isOnline && !showWhenOnline && !alwaysShow) {
        return null;
    }

    const getConnectionIcon = () => {
        if (!isOnline) return cloudOfflineOutline;
        if (connectionType === 'cellular') return cellularOutline;
        return wifiOutline;
    };

    const getConnectionText = () => {
        if (!isOnline) return 'Offline';
        if (connectionType === 'cellular') return 'Dados Móveis';
        if (connectionType === 'wifi') return 'WiFi';
        return 'Online';
    };

    const getChipColor = () => {
        if (!isOnline) return 'danger';
        if (connectionType === 'cellular') return 'warning';
        return 'success';
    };

    return (
        <IonChip
            color={getChipColor()}
            style={{
                margin: compact ? '4px' : '8px',
                fontSize: compact ? '0.8em' : '0.9em',
                border: '2px solid rgba(0,0,0,0.4)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                background: '#ffffff',
            }}
        >
            <IonIcon icon={getConnectionIcon()} />
            {!compact && <IonLabel>{getConnectionText()}</IonLabel>}
        </IonChip>
    );
};
