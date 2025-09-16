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
import { cameraOutline, saveOutline } from 'ionicons/icons';
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

    const handlePhotoUpload = () => {
        // Implementar upload de foto futuramente
        setToastMessage('Funcionalidade de upload de foto será implementada em breve');
        setShowToast(true);
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
                                            />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2>Foto do Perfil</h2>
                                            <p>Clique para alterar</p>
                                        </IonLabel>
                                        <IonButton fill="clear" slot="end" onClick={handlePhotoUpload}>
                                            <IonIcon icon={cameraOutline} />
                                        </IonButton>
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
                                        />
                                    </IonItem>

                                    {/* Endereço */}
                                    <IonItem>
                                        <IonLabel position="stacked">Endereço</IonLabel>
                                        <IonInput
                                            value={formData.endereco}
                                            placeholder="Rua, número, bairro, cidade"
                                            onIonInput={(e) => handleInputChange('endereco', e.detail.value!)}
                                            clearInput={true}
                                        />
                                    </IonItem>

                                    {/* Botão de envio */}
                                    <IonButton expand="block" onClick={handleSubmit} style={{ marginTop: '20px' }}>
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
