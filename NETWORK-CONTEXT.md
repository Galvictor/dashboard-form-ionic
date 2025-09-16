# 🌐 Network Context - Monitoramento de Conexão

## ✅ **Contexto de Rede Implementado**

### 🎯 **Funcionalidades**

-   **Monitoramento em tempo real** da conexão com internet
-   **Detecção de tipo** de conexão (WiFi, dados móveis, offline)
-   **Indicador visual** no header da aplicação
-   **Controle inteligente** de funcionalidades que dependem de rede
-   **Suporte multiplataforma** (Electron, Android, Web)

### 🔧 **Arquitetura**

#### **📁 Arquivos Criados:**

1. **`NetworkContext.tsx`** - Contexto React com lógica de rede
2. **`NetworkStatus.tsx`** - Componente visual de status
3. **Integração** - Hook `useNetwork()` em componentes

#### **🎯 Estrutura do Contexto:**

```typescript
interface NetworkContextType {
    isOnline: boolean; // Se há conexão
    connectionType: string; // Tipo: wifi, cellular, none
    isLoading: boolean; // Se está carregando status inicial
}
```

## 🚀 **Como Usar**

### **📱 Hook Principal:**

```typescript
import { useNetwork } from '../contexts/NetworkContext';

const { isOnline, connectionType, isLoading } = useNetwork();

// Verificar se está online
if (!isOnline) {
    showError('Sem conexão com a internet');
    return;
}
```

### **🎯 Hook Específico:**

```typescript
import { useNetworkFeature } from '../contexts/NetworkContext';

const { isAvailable, reason } = useNetworkFeature(true); // true = requer internet

if (!isAvailable) {
    showError(reason); // "Sem conexão com a internet"
}
```

### **📊 Componente Visual:**

```typescript
import { NetworkStatus } from '../components/NetworkStatus';

// Indicador compacto (apenas ícone)
<NetworkStatus compact={true} />

// Indicador completo (ícone + texto)
<NetworkStatus showWhenOnline={true} />
```

## 🎨 **Indicadores Visuais**

### **🟢 Online (WiFi):**

-   **Ícone**: WiFi 📶
-   **Cor**: Verde (success)
-   **Texto**: "WiFi"

### **🟡 Online (Dados Móveis):**

-   **Ícone**: Celular 📱
-   **Cor**: Amarelo (warning)
-   **Texto**: "Dados Móveis"

### **🔴 Offline:**

-   **Ícone**: Nuvem offline ☁️
-   **Cor**: Vermelho (danger)
-   **Texto**: "Offline"

### **📍 Localização no App:**

-   **Header**: Canto superior direito (compacto)
-   **Apenas quando offline**: Não polui interface quando online

## 🔧 **Integração por Plataforma**

### **📱 Android/iOS:**

-   **Plugin**: `@capacitor/network`
-   **Eventos**: Listener nativo para mudanças
-   **Tipos**: wifi, cellular, none, unknown
-   **Tempo real**: Detecta mudanças instantaneamente

### **🖥️ Electron/Web:**

-   **API**: `navigator.onLine`
-   **Eventos**: `online` e `offline` do browser
-   **Fallback**: Assume online se não detectar
-   **Compatibilidade**: Funciona em qualquer browser

### **🔄 Comportamento:**

```typescript
// Inicialização
useEffect(() => {
    if (Capacitor.isNativePlatform()) {
        // Usar plugin Capacitor Network
        const status = await Network.getStatus();
        setIsOnline(status.connected);
    } else {
        // Usar API do browser
        setIsOnline(navigator.onLine);
    }
}, []);
```

## 🎯 **Funcionalidades Controladas**

### **📍 Busca de CEP:**

-   **Online**: Botão amarelo habilitado
-   **Offline**: Botão cinza desabilitado
-   **Feedback**: "Sem conexão com a internet"
-   **Tooltip**: Mostra motivo da desabilitação

### **📄 Geração de PDF:**

-   **Sempre funciona**: PDF é gerado localmente
-   **Não depende**: De conexão com internet
-   **Independente**: Do status da rede

### **📸 Câmera:**

-   **Sempre funciona**: Não depende de internet
-   **Local**: Captura é local no dispositivo
-   **Independente**: Do status da rede

## 📋 **Estados da Interface**

### **🟢 Com Internet:**

```typescript
// Busca CEP habilitada
<IonButton color="secondary" disabled={false}>
    <IonIcon icon={searchOutline} />
</IonButton>

// Status: apenas ícone no header (discreto)
<NetworkStatus compact={true} />
```

### **🔴 Sem Internet:**

```typescript
// Busca CEP desabilitada
<IonButton color="medium" disabled={true} title="Sem conexão">
    <IonIcon icon={searchOutline} />
</IonButton>

// Status: chip vermelho visível
<NetworkStatus compact={true} /> // Mostra "Offline"
```

## 🚀 **Próximas Funcionalidades**

### **📊 Cache Inteligente:**

```typescript
// Salvar CEPs buscados para uso offline
const cepCache = useNetworkCache('cep');

if (!isOnline) {
    const enderecoCache = cepCache.get(cep);
    if (enderecoCache) {
        // Usar dados do cache
        preencherEndereco(enderecoCache);
    }
}
```

### **🔄 Sincronização:**

```typescript
// Sincronizar dados quando voltar online
useEffect(() => {
    if (isOnline && hadPendingData) {
        syncPendingData();
    }
}, [isOnline]);
```

### **📱 Notificações:**

```typescript
// Avisar quando voltar online
useEffect(() => {
    if (isOnline && wasOffline) {
        showToast('Conexão restaurada! Funcionalidades online disponíveis.');
    }
}, [isOnline]);
```

## 💡 **Exemplos de Uso**

### **🔍 Controle de Funcionalidades:**

```typescript
const BuscarCepButton = () => {
    const { isOnline } = useNetwork();

    return (
        <IonButton disabled={!isOnline} color={isOnline ? 'secondary' : 'medium'} onClick={buscarCep}>
            {isOnline ? 'Buscar CEP' : 'Sem Internet'}
        </IonButton>
    );
};
```

### **📊 Feedback Condicional:**

```typescript
const FormularioComRede = () => {
    const { isOnline, connectionType } = useNetwork();

    const handleSubmit = () => {
        if (!isOnline) {
            showWarning('Dados salvos localmente. Sincronizará quando conectar.');
        } else {
            showSuccess('Dados enviados com sucesso!');
        }
    };
};
```

### **🎯 Validações Inteligentes:**

```typescript
const validarFormulario = () => {
    const { isAvailable } = useNetworkFeature(true); // Requer internet

    if (!isAvailable) {
        return 'Algumas funcionalidades requerem conexão com internet';
    }

    return null; // Válido
};
```

## 🔒 **Benefícios Implementados**

### **✅ UX Melhorada:**

-   **Feedback claro**: Usuário sabe quando está offline
-   **Prevenção de erros**: Funcionalidades desabilitadas sem internet
-   **Indicadores visuais**: Status sempre visível
-   **Mensagens específicas**: Erros contextuais

### **✅ Performance:**

-   **Evita requisições**: Quando offline
-   **Cache preparado**: Para implementações futuras
-   **Listeners eficientes**: Apenas quando necessário
-   **Cleanup automático**: Sem memory leaks

### **✅ Robustez:**

-   **Fallback**: Assume online se não detectar
-   **Error handling**: Trata falhas de inicialização
-   **Cross-platform**: Funciona em todas as plataformas
-   **TypeScript**: Tipagem completa

**O contexto de rede está funcionando perfeitamente!** 🌐✨

Agora o app tem **controle inteligente de conectividade**, preparando o terreno para funcionalidades avançadas como cache offline, sincronização automática e feedback contextual baseado no status da rede.
