import { useState } from 'react';
import { CepService } from '../services/cepService';
import { PdfService } from '../services/pdfService';
import { MaskService } from '../services/maskService';

export interface FormData {
    nome: string;
    email: string;
    foto: string;
    cep: string;
    endereco: string;
    telefone: string;
}

export const useFormulario = () => {
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

    const atualizarFoto = (novaFoto: string) => {
        setFormData((prev) => ({
            ...prev,
            foto: novaFoto,
        }));
    };

    const mostrarToast = (mensagem: string) => {
        setToastMessage(mensagem);
        setShowToast(true);
    };

    return {
        // Estado
        formData,
        showToast,
        toastMessage,
        buscandoCep,

        // Ações
        handleInputChange,
        handleSubmit,
        handleBuscarCep,
        atualizarFoto,
        mostrarToast,
        setShowToast,
    };
};
