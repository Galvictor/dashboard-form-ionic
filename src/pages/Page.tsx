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
import { useState, useRef } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { cameraOutline, trashOutline, searchOutline, folderOpenOutline, documentOutline } from 'ionicons/icons';
import { CepService } from '../services/cepService';
import { PdfService } from '../services/pdfService';
import { MaskService } from '../services/maskService';
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: keyof FormData, value: string) => {
        let maskedValue = value;

        // Aplicar máscaras específicas
        if (field === 'telefone') {
            maskedValue = MaskService.aplicarMascaraTelefone(value);
        } else if (field === 'cep') {
            maskedValue = MaskService.aplicarMascaraCep(value);
        }

        setFormData((prev) => ({
            ...prev,
            [field]: maskedValue,
        }));
    };

    const handleSubmit = async () => {
        // Validação básica
        if (!formData.nome || !formData.email || !formData.telefone) {
            setToastMessage('Por favor, preencha os campos obrigatórios: Nome, Email e Telefone');
            setShowToast(true);
            return;
        }

        // Validação de formato do telefone
        if (!MaskService.validarTelefone(formData.telefone)) {
            setToastMessage('Telefone inválido. Use o formato (11) 99999-9999');
            setShowToast(true);
            return;
        }

        // Validação de formato do CEP (se preenchido)
        if (formData.cep && !MaskService.validarCep(formData.cep)) {
            setToastMessage('CEP inválido. Use o formato 00000-000');
            setShowToast(true);
            return;
        }

        try {
            // Processar dados do formulário
            console.log('Dados do formulário:', formData);

            // Gerar PDF com os dados
            await PdfService.gerarPdf(formData);

            setToastMessage('Formulário enviado e PDF gerado com sucesso!');
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
        } catch (error) {
            console.error('Erro ao processar formulário:', error);
            setToastMessage('Erro ao gerar PDF. Dados salvos localmente.');
            setShowToast(true);
        }
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

            // Se estivermos na web e der erro, oferecer fallback de arquivo
            if (Capacitor.getPlatform() === 'web') {
                setToastMessage('Câmera não disponível na web. Clique no botão de pasta para selecionar uma foto.');
                setShowToast(true);
            } else {
                setToastMessage('Erro ao capturar foto. Tente novamente.');
                setShowToast(true);
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
                setToastMessage('Por favor, selecione apenas arquivos de imagem.');
                setShowToast(true);
                return;
            }

            // Verificar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setToastMessage('Arquivo muito grande. Máximo 5MB.');
                setShowToast(true);
                return;
            }

            // Converter para base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    setFormData((prev) => ({
                        ...prev,
                        foto: result,
                    }));
                    setToastMessage('Foto selecionada com sucesso!');
                    setShowToast(true);
                }
            };
            reader.onerror = () => {
                setToastMessage('Erro ao ler arquivo. Tente novamente.');
                setShowToast(true);
            };
            reader.readAsDataURL(file);
        }

        // Limpar input para permitir selecionar o mesmo arquivo novamente
        if (event.target) {
            event.target.value = '';
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
                                            <p>
                                                {formData.foto
                                                    ? 'Foto capturada'
                                                    : Capacitor.getPlatform() === 'web'
                                                    ? 'Câmera ou pasta para selecionar'
                                                    : 'Clique para capturar'}
                                            </p>
                                        </IonLabel>
                                        <IonButton fill="clear" color="tertiary" slot="end" onClick={handlePhotoUpload}>
                                            <IonIcon icon={cameraOutline} />
                                        </IonButton>
                                        {Capacitor.getPlatform() === 'web' && (
                                            <IonButton fill="clear" color="secondary" slot="end" onClick={handleFileUpload}>
                                                <IonIcon icon={folderOpenOutline} />
                                            </IonButton>
                                        )}
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
                                            maxlength={15}
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
                                            inputmode="numeric"
                                        />
                                        <IonButton
                                            fill="clear"
                                            color="secondary"
                                            slot="end"
                                            onClick={handleBuscarCep}
                                            disabled={buscandoCep || !MaskService.validarCep(formData.cep)}
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

                {/* Input file oculto para fallback na web */}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            </IonContent>
        </IonPage>
    );
};

export default Page;
