// Service para aplicação de máscaras em campos de formulário

export class MaskService {
    /**
     * Aplica máscara de telefone brasileiro
     * Formatos suportados: (11) 99999-9999 ou (11) 9999-9999
     * @param value - Valor do campo
     * @returns Valor com máscara aplicada
     */
    static aplicarMascaraTelefone(value: string): string {
        // Remove todos os caracteres não numéricos
        const numeros = value.replace(/\D/g, '');

        // Limita a 11 dígitos
        const numeroLimitado = numeros.slice(0, 11);

        // Aplica máscara baseada no tamanho
        if (numeroLimitado.length <= 2) {
            return numeroLimitado;
        } else if (numeroLimitado.length <= 6) {
            return `(${numeroLimitado.slice(0, 2)}) ${numeroLimitado.slice(2)}`;
        } else if (numeroLimitado.length <= 10) {
            return `(${numeroLimitado.slice(0, 2)}) ${numeroLimitado.slice(2, 6)}-${numeroLimitado.slice(6)}`;
        } else {
            // Celular com 9 dígitos
            return `(${numeroLimitado.slice(0, 2)}) ${numeroLimitado.slice(2, 7)}-${numeroLimitado.slice(7)}`;
        }
    }

    /**
     * Aplica máscara de CEP brasileiro
     * Formato: 00000-000
     * @param value - Valor do campo
     * @returns Valor com máscara aplicada
     */
    static aplicarMascaraCep(value: string): string {
        // Remove todos os caracteres não numéricos
        const numeros = value.replace(/\D/g, '');

        // Limita a 8 dígitos
        const numeroLimitado = numeros.slice(0, 8);

        // Aplica máscara
        if (numeroLimitado.length <= 5) {
            return numeroLimitado;
        } else {
            return `${numeroLimitado.slice(0, 5)}-${numeroLimitado.slice(5)}`;
        }
    }

    /**
     * Remove máscara de telefone, mantendo apenas números
     * @param value - Valor com máscara
     * @returns Apenas números
     */
    static removerMascaraTelefone(value: string): string {
        return value.replace(/\D/g, '');
    }

    /**
     * Remove máscara de CEP, mantendo apenas números
     * @param value - Valor com máscara
     * @returns Apenas números
     */
    static removerMascaraCep(value: string): string {
        return value.replace(/\D/g, '');
    }

    /**
     * Valida telefone brasileiro
     * @param telefone - Telefone com ou sem máscara
     * @returns true se válido
     */
    static validarTelefone(telefone: string): boolean {
        const numeros = this.removerMascaraTelefone(telefone);

        // Telefone deve ter 10 ou 11 dígitos
        // 10 dígitos: (11) 9999-9999 (fixo)
        // 11 dígitos: (11) 99999-9999 (celular)
        return numeros.length === 10 || numeros.length === 11;
    }

    /**
     * Valida CEP brasileiro
     * @param cep - CEP com ou sem máscara
     * @returns true se válido
     */
    static validarCep(cep: string): boolean {
        const numeros = this.removerMascaraCep(cep);

        // CEP deve ter exatamente 8 dígitos
        return numeros.length === 8;
    }

    /**
     * Formata telefone para exibição final
     * @param telefone - Telefone apenas com números
     * @returns Telefone formatado
     */
    static formatarTelefone(telefone: string): string {
        const numeros = telefone.replace(/\D/g, '');

        if (numeros.length === 10) {
            // Telefone fixo: (11) 9999-9999
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
        } else if (numeros.length === 11) {
            // Celular: (11) 99999-9999
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
        }

        return telefone;
    }

    /**
     * Formata CEP para exibição final
     * @param cep - CEP apenas com números
     * @returns CEP formatado
     */
    static formatarCep(cep: string): string {
        const numeros = cep.replace(/\D/g, '');

        if (numeros.length === 8) {
            return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
        }

        return cep;
    }
}
