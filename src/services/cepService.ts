// Service para integração com API ViaCEP

export interface CepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

export interface EnderecoCompleto {
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    estado: string;
}

export class CepService {
    private static readonly BASE_URL = 'https://viacep.com.br/ws';

    /**
     * Busca informações de endereço pelo CEP
     * @param cep - CEP no formato 00000000 ou 00000-000
     * @returns Promise com dados do endereço ou null se não encontrado
     */
    static async buscarCep(cep: string): Promise<CepResponse | null> {
        try {
            // Limpar CEP (remover caracteres especiais)
            const cepLimpo = cep.replace(/\D/g, '');

            // Validar formato do CEP
            if (!this.validarCep(cepLimpo)) {
                throw new Error('CEP inválido');
            }

            // Fazer requisição para API
            const response = await fetch(`${this.BASE_URL}/${cepLimpo}/json/`);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data: CepResponse = await response.json();

            // Verificar se API retornou erro
            if (data.erro) {
                return null;
            }

            return data;
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            return null;
        }
    }

    /**
     * Valida formato do CEP
     * @param cep - CEP apenas com números
     * @returns true se válido, false se inválido
     */
    static validarCep(cep: string): boolean {
        // CEP deve ter exatamente 8 dígitos
        return /^\d{8}$/.test(cep);
    }

    /**
     * Formata CEP para exibição (00000-000)
     * @param cep - CEP apenas com números
     * @returns CEP formatado ou string original se inválido
     */
    static formatarCep(cep: string): string {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length === 8) {
            return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;
        }

        return cep;
    }

    /**
     * Converte resposta da API em endereço formatado
     * @param cepData - Dados retornados pela API ViaCEP
     * @returns Objeto com endereço formatado
     */
    static formatarEndereco(cepData: CepResponse): EnderecoCompleto {
        const endereco = [cepData.logradouro, cepData.complemento].filter(Boolean).join(', ');

        return {
            endereco: endereco || '',
            bairro: cepData.bairro || '',
            cidade: cepData.localidade || '',
            uf: cepData.uf || '',
            estado: cepData.estado || '',
        };
    }

    /**
     * Busca CEP e retorna endereço formatado para o formulário
     * @param cep - CEP informado pelo usuário
     * @returns Endereço formatado ou null se não encontrado
     */
    static async buscarEnderecoCompleto(cep: string): Promise<EnderecoCompleto | null> {
        const cepData = await this.buscarCep(cep);

        if (!cepData) {
            return null;
        }

        return this.formatarEndereco(cepData);
    }
}
