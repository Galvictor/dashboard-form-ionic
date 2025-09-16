import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonIcon,
    IonToast,
} from '@ionic/react';
import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { cameraOutline, saveOutline, trashOutline, searchOutline } from 'ionicons/icons';
import { CepService } from '../services/cepService';
import './Page.css';

interface FormData {
    nome: string;
    email: string;
    foto: string;
    cep: string;
    endereco: string;
    telefone: string;
}

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        foto: '',
        cep: '',
        endereco: '',
        telefone: '',
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [buscandoCep, setBuscandoCep] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        // Validação básica
        if (!formData.nome || !formData.email || !formData.telefone) {
            setToastMessage('Por favor, preencha os campos obrigatórios: Nome, Email e Telefone');
            setShowToast(true);
            return;
        }

        // Aqui você pode processar os dados do formulário
        console.log('Dados do formulário:', formData);
        setToastMessage('Formulário enviado com sucesso!');
        setShowToast(true);

        // Limpar formulário após envio
        setFormData({
            nome: '',
            email: '',
            foto: '',
            cep: '',
            endereco: '',
            telefone: '',
        });
    };

    const handlePhotoUpload = async () => {
        try {
            // Verificar se o dispositivo suporta câmera
            const permissions = await Camera.checkPermissions();

            if (permissions.camera !== 'granted') {
                const requestResult = await Camera.requestPermissions();
                if (requestResult.camera !== 'granted') {
                    setToastMessage('Permissão da câmera negada. Verifique as configurações.');
                    setShowToast(true);
                    return;
                }
            }

            // Configurar opções da câmera
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt, // Permite escolher entre câmera ou galeria
                width: 300,
                height: 300,
            });

            // Atualizar o estado com a foto capturada
            if (image.dataUrl) {
                setFormData((prev) => ({
                    ...prev,
                    foto: image.dataUrl || '',
                }));
                setToastMessage('Foto capturada com sucesso!');
                setShowToast(true);
            } else {
                setToastMessage('Erro: Foto não foi capturada corretamente.');
                setShowToast(true);
            }
        } catch (error) {
            console.error('Erro ao capturar foto:', error);
            setToastMessage('Erro ao capturar foto. Tente novamente.');
            setShowToast(true);
        }
    };

    const handleRemovePhoto = () => {
        setFormData((prev) => ({
            ...prev,
            foto: '',
        }));
        setToastMessage('Foto removida');
        setShowToast(true);
    };

    const handleBuscarCep = async () => {
        if (!formData.cep) {
            setToastMessage('Por favor, digite um CEP primeiro');
            setShowToast(true);
            return;
        }

        setBuscandoCep(true);

        try {
            const enderecoCompleto = await CepService.buscarEnderecoCompleto(formData.cep);

            if (enderecoCompleto) {
                // Montar endereço completo
                const enderecoFormatado = [enderecoCompleto.endereco, enderecoCompleto.bairro, enderecoCompleto.cidade, enderecoCompleto.uf]
                    .filter(Boolean)
                    .join(', ');

                setFormData((prev) => ({
                    ...prev,
                    cep: CepService.formatarCep(formData.cep),
                    endereco: enderecoFormatado,
                }));

                setToastMessage(`Endereço encontrado: ${enderecoCompleto.cidade}/${enderecoCompleto.uf}`);
                setShowToast(true);
            } else {
                setToastMessage('CEP não encontrado. Verifique se está correto.');
                setShowToast(true);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            setToastMessage('Erro ao buscar CEP. Tente novamente.');
            setShowToast(true);
        } finally {
            setBuscandoCep(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Form 1</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Formulário de Cadastro</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol size="12" size-md="8" offset-md="2" size-lg="6" offset-lg="3">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Dados Pessoais</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    {/* Foto */}
                                    <IonItem>
                                        <IonAvatar slot="start">
                                            <img
                                                alt="Foto do usuário"
                                                src={formData.foto || 'https://ionicframework.com/docs/img/demos/avatar.svg'}
                                                style={{
                                                    objectFit: 'cover',
                                                    border: formData.foto ? '2px solid var(--ion-color-primary)' : 'none',
                                                }}
                                            />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2>Foto do Perfil</h2>
                                            <p>{formData.foto ? 'Foto capturada' : 'Clique para capturar'}</p>
                                        </IonLabel>
                                        <IonButton fill="clear" color="tertiary" slot="end" onClick={handlePhotoUpload}>
                                            <IonIcon icon={cameraOutline} />
                                        </IonButton>
                                        {formData.foto && (
                                            <IonButton fill="clear" color="danger" slot="end" onClick={handleRemovePhoto}>
                                                <IonIcon icon={trashOutline} />
                                            </IonButton>
                                        )}
                                    </IonItem>

                                    {/* Nome */}
                                    <IonItem>
                                        <IonLabel position="stacked">Nome *</IonLabel>
                                        <IonInput
                                            value={formData.nome}
                                            placeholder="Digite seu nome completo"
                                            onIonInput={(e) => handleInputChange('nome', e.detail.value!)}
                                            clearInput={true}
                                        />
                                    </IonItem>

                                    {/* Email */}
                                    <IonItem>
                                        <IonLabel position="stacked">Email *</IonLabel>
                                        <IonInput
                                            type="email"
                                            value={formData.email}
                                            placeholder="seu@email.com"
                                            onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                                            clearInput={true}
                                        />
                                    </IonItem>

                                    {/* Telefone */}
                                    <IonItem>
                                        <IonLabel position="stacked">Telefone *</IonLabel>
                                        <IonInput
                                            type="tel"
                                            value={formData.telefone}
                                            placeholder="(11) 99999-9999"
                                            onIonInput={(e) => handleInputChange('telefone', e.detail.value!)}
                                            clearInput={true}
                                        />
                                    </IonItem>

                                    {/* CEP */}
                                    <IonItem>
                                        <IonLabel position="stacked">CEP</IonLabel>
                                        <IonInput
                                            value={formData.cep}
                                            placeholder="00000-000"
                                            onIonInput={(e) => handleInputChange('cep', e.detail.value!)}
                                            clearInput={true}
                                            maxlength={9}
                                        />
                                        <IonButton
                                            fill="clear"
                                            color="secondary"
                                            slot="end"
                                            onClick={handleBuscarCep}
                                            disabled={buscandoCep || !formData.cep}
                                        >
                                            <IonIcon icon={searchOutline} className={buscandoCep ? 'spin' : ''} />
                                        </IonButton>
                                    </IonItem>

                                    {/* Endereço */}
                                    <IonItem>
                                        <IonLabel position="stacked">
                                            Endereço
                                            {buscandoCep && (
                                                <span style={{ color: 'var(--ion-color-secondary)', fontSize: '0.8em' }}> (buscando...)</span>
                                            )}
                                        </IonLabel>
                                        <IonInput
                                            value={formData.endereco}
                                            placeholder="Rua, número, bairro, cidade - ou busque pelo CEP acima"
                                            onIonInput={(e) => handleInputChange('endereco', e.detail.value!)}
                                            clearInput={true}
                                            readonly={buscandoCep}
                                        />
                                    </IonItem>

                                    {/* Botão de envio */}
                                    <IonButton expand="block" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                        <IonIcon icon={saveOutline} slot="start" />
                                        Salvar Dados
                                    </IonButton>

                                    <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>* Campos obrigatórios</p>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastMessage} duration={3000} />
            </IonContent>
        </IonPage>
    );
};

export default Page;
