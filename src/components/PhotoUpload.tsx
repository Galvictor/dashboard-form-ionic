import { IonItem, IonLabel, IonAvatar, IonButton, IonIcon } from '@ionic/react';
import { useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { cameraOutline, trashOutline, folderOpenOutline } from 'ionicons/icons';

interface PhotoUploadProps {
    foto: string;
    onFotoChange: (foto: string) => void;
    onToast: (mensagem: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ foto, onFotoChange, onToast }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = async () => {
        // Verificar se estamos na web (onde a câmera pode não funcionar)
        const isWeb = Capacitor.getPlatform() === 'web';

        try {
            if (isWeb) {
                // Na web, tentar câmera primeiro, mas se falhar usar file input
                try {
                    const image = await Camera.getPhoto({
                        quality: 90,
                        allowEditing: true,
                        resultType: CameraResultType.DataUrl,
                        source: CameraSource.Prompt,
                        width: 300,
                        height: 300,
                    });

                    if (image.dataUrl) {
                        onFotoChange(image.dataUrl || '');
                        onToast('Foto capturada com sucesso!');
                        return;
                    }
                } catch (cameraError) {
                    console.log('Câmera não disponível na web, usando file input:', cameraError);
                    // Fallback para file input
                    handleFileUpload();
                    return;
                }
            } else {
                // Em plataformas nativas (Electron, mobile), usar câmera normalmente
                const permissions = await Camera.checkPermissions();

                if (permissions.camera !== 'granted') {
                    const requestResult = await Camera.requestPermissions();
                    if (requestResult.camera !== 'granted') {
                        onToast('Permissão da câmera negada. Verifique as configurações.');
                        return;
                    }
                }

                const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: true,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Prompt,
                    width: 300,
                    height: 300,
                });

                if (image.dataUrl) {
                    onFotoChange(image.dataUrl || '');
                    onToast('Foto capturada com sucesso!');
                } else {
                    onToast('Erro: Foto não foi capturada corretamente.');
                }
            }
        } catch (error) {
            console.error('Erro ao capturar foto:', error);

            // Se estivermos na web e der erro, oferecer fallback de arquivo
            if (Capacitor.getPlatform() === 'web') {
                onToast('Câmera não disponível na web. Clique no botão de pasta para selecionar uma foto.');
            } else {
                onToast('Erro ao capturar foto. Tente novamente.');
            }
        }
    };

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Verificar se é uma imagem
            if (!file.type.startsWith('image/')) {
                onToast('Por favor, selecione apenas arquivos de imagem.');
                return;
            }

            // Verificar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                onToast('Arquivo muito grande. Máximo 5MB.');
                return;
            }

            // Converter para base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    onFotoChange(result);
                    onToast('Foto selecionada com sucesso!');
                }
            };
            reader.onerror = () => {
                onToast('Erro ao ler arquivo. Tente novamente.');
            };
            reader.readAsDataURL(file);
        }

        // Limpar input para permitir selecionar o mesmo arquivo novamente
        if (event.target) {
            event.target.value = '';
        }
    };

    const handleRemovePhoto = () => {
        onFotoChange('');
        onToast('Foto removida');
    };

    return (
        <>
            <IonItem>
                <IonAvatar slot="start">
                    <img
                        alt="Foto do usuário"
                        src={foto || 'https://ionicframework.com/docs/img/demos/avatar.svg'}
                        style={{
                            objectFit: 'cover',
                            border: foto ? '2px solid var(--ion-color-primary)' : 'none',
                        }}
                    />
                </IonAvatar>
                <IonLabel>
                    <h2>Foto do Perfil</h2>
                    <p>{foto ? 'Foto capturada' : Capacitor.getPlatform() === 'web' ? 'Câmera ou pasta para selecionar' : 'Clique para capturar'}</p>
                </IonLabel>
                <IonButton fill="clear" color="tertiary" slot="end" onClick={handlePhotoUpload}>
                    <IonIcon icon={cameraOutline} />
                </IonButton>
                {Capacitor.getPlatform() === 'web' && (
                    <IonButton fill="clear" color="secondary" slot="end" onClick={handleFileUpload}>
                        <IonIcon icon={folderOpenOutline} />
                    </IonButton>
                )}
                {foto && (
                    <IonButton fill="clear" color="danger" slot="end" onClick={handleRemovePhoto}>
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                )}
            </IonItem>

            {/* Input file oculto para fallback na web */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
        </>
    );
};
