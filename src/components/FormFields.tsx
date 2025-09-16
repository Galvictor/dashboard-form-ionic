import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { MaskService } from '../services/maskService';
import { FormData } from '../hooks/useFormulario';

interface FormFieldsProps {
    formData: FormData;
    buscandoCep: boolean;
    onInputChange: (field: keyof FormData, value: string) => void;
    onBuscarCep: () => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({ 
    formData, 
    buscandoCep, 
    onInputChange, 
    onBuscarCep 
}) => {
    return (
        <>
            {/* Nome */}
            <IonItem>
                <IonLabel position="stacked">Nome *</IonLabel>
                <IonInput
                    value={formData.nome}
                    placeholder="Digite seu nome completo"
                    onIonInput={(e) => onInputChange('nome', e.detail.value!)}
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
                    onIonInput={(e) => onInputChange('email', e.detail.value!)}
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
                    onIonInput={(e) => onInputChange('telefone', e.detail.value!)}
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
                    onIonInput={(e) => onInputChange('cep', e.detail.value!)}
                    clearInput={true}
                    maxlength={9}
                    inputmode="numeric"
                />
                <IonButton
                    fill="clear"
                    color="secondary"
                    slot="end"
                    onClick={onBuscarCep}
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
                    onIonInput={(e) => onInputChange('endereco', e.detail.value!)}
                    clearInput={true}
                    readonly={buscandoCep}
                />
            </IonItem>
        </>
    );
};
