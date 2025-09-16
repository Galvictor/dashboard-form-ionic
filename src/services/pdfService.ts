// Service para geração de PDF com dados do formulário
import jsPDF from 'jspdf';

interface FormData {
    nome: string;
    email: string;
    foto: string;
    cep: string;
    endereco: string;
    telefone: string;
}

export class PdfService {
    /**
     * Gera PDF com dados do formulário
     * @param formData - Dados do formulário
     * @returns Promise<void>
     */
    static async gerarPdf(formData: FormData): Promise<void> {
        try {
            // Criar novo documento PDF
            const pdf = new jsPDF();

            // Configurações gerais
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            let yPosition = 30;

            // Cores Petrobras
            const verdePetrobras: [number, number, number] = [0, 133, 66]; // #008542
            const amareloPetrobras: [number, number, number] = [253, 200, 47]; // #FDC82F
            const cinzaPetrobras: [number, number, number] = [117, 120, 123]; // #75787B

            // === CABEÇALHO ===
            pdf.setFillColor(...verdePetrobras);
            pdf.rect(0, 0, pageWidth, 25, 'F');

            pdf.setTextColor(255, 255, 255); // Branco
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            pdf.text('FORMULÁRIO DE CADASTRO', pageWidth / 2, 15, { align: 'center' });

            yPosition = 40;

            // === DATA E HORA ===
            pdf.setTextColor(0, 0, 0); // Preto
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            const dataAtual = new Date().toLocaleString('pt-BR');
            pdf.text(`Gerado em: ${dataAtual}`, pageWidth - margin, yPosition, { align: 'right' });

            yPosition += 20;

            // === FOTO (se houver) ===
            if (formData.foto) {
                try {
                    // Adicionar foto no PDF
                    const imgData = formData.foto;
                    const imgSize = 40; // Tamanho da imagem

                    pdf.addImage(imgData, 'JPEG', margin, yPosition, imgSize, imgSize);

                    // Texto ao lado da foto
                    pdf.setFontSize(12);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('FOTO DO PERFIL', margin + imgSize + 10, yPosition + 10);

                    yPosition += imgSize + 15;
                } catch (imgError) {
                    console.warn('Erro ao adicionar imagem ao PDF:', imgError);
                    // Continuar sem a imagem
                }
            }

            // === DADOS PESSOAIS ===
            pdf.setFillColor(...amareloPetrobras);
            pdf.rect(margin - 5, yPosition - 5, pageWidth - margin * 2 + 10, 15, 'F');

            pdf.setTextColor(0, 0, 0); // Preto
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('DADOS PESSOAIS', margin, yPosition + 5);

            yPosition += 25;

            // Função helper para adicionar campo
            const adicionarCampo = (label: string, valor: string, obrigatorio = false) => {
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...cinzaPetrobras);

                const labelText = obrigatorio ? `${label} *` : label;
                pdf.text(labelText, margin, yPosition);

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(0, 0, 0);
                pdf.setFontSize(12);

                const valorTexto = valor || '(não informado)';
                pdf.text(valorTexto, margin, yPosition + 8);

                yPosition += 20;
            };

            // Adicionar campos
            adicionarCampo('Nome', formData.nome, true);
            adicionarCampo('Email', formData.email, true);
            adicionarCampo('Telefone', formData.telefone, true);
            adicionarCampo('CEP', formData.cep);
            adicionarCampo('Endereço', formData.endereco);

            // === RODAPÉ ===
            yPosition += 20;

            pdf.setFillColor(...verdePetrobras);
            pdf.rect(0, yPosition, pageWidth, 15, 'F');

            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Dashboard Test Ionic - Formulário de Cadastro', pageWidth / 2, yPosition + 8, { align: 'center' });

            // === INFORMAÇÕES TÉCNICAS ===
            yPosition += 25;

            pdf.setTextColor(...cinzaPetrobras);
            pdf.setFontSize(8);
            pdf.text('* Campos obrigatórios', margin, yPosition);
            pdf.text(`ID do documento: ${Date.now()}`, pageWidth - margin, yPosition, { align: 'right' });

            // === SALVAR PDF ===
            const nomeArquivo = `formulario_${formData.nome.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.pdf`;
            pdf.save(nomeArquivo);

            console.log('PDF gerado com sucesso:', nomeArquivo);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            throw new Error('Erro ao gerar PDF. Tente novamente.');
        }
    }

    /**
     * Gera nome de arquivo baseado nos dados do formulário
     * @param formData - Dados do formulário
     * @returns Nome do arquivo PDF
     */
    static gerarNomeArquivo(formData: FormData): string {
        const nomeFormatado = formData.nome
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');

        const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        return `formulario_${nomeFormatado}_${timestamp}.pdf`;
    }

    /**
     * Valida se os dados estão completos para gerar PDF
     * @param formData - Dados do formulário
     * @returns true se válido, false se inválido
     */
    static validarDados(formData: FormData): boolean {
        return !!(formData.nome && formData.email && formData.telefone);
    }
}
