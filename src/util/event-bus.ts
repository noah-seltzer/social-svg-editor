export interface EventBus {
    on(key: string, handler): () => void
    // emit: 
}

export const createEventBus = () => 