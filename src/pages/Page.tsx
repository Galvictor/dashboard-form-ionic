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
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonToast,
} from '@ionic/react';
import { documentOutline } from 'ionicons/icons';
import { useFormulario } from '../hooks/useFormulario';
import { PhotoUpload } from '../components/PhotoUpload';
import { FormFields } from '../components/FormFields';
import { NetworkStatus } from '../components/NetworkStatus';
import './Page.css';

const Page: React.FC = () => {
    const {
        formData,
        showToast,
        toastMessage,
        buscandoCep,
        handleInputChange,
        handleSubmit,
        handleBuscarCep,
        atualizarFoto,
        mostrarToast,
        setShowToast,
    } = useFormulario();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Form 1</IonTitle>
                    <IonButtons slot="end">
                        <NetworkStatus compact={true} alwaysShow={true} />
                    </IonButtons>
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
                                    {/* Componente de Upload de Foto */}
                                    <PhotoUpload foto={formData.foto} onFotoChange={atualizarFoto} onToast={mostrarToast} />

                                    {/* Componente dos Campos do Formulário */}
                                    <FormFields
                                        formData={formData}
                                        buscandoCep={buscandoCep}
                                        onInputChange={handleInputChange}
                                        onBuscarCep={handleBuscarCep}
                                    />

                                    {/* Botão de envio */}
                                    <IonButton expand="block" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                                        <IonIcon icon={documentOutline} slot="start" />
                                        Salvar e Gerar PDF
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
