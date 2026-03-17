// Типизированные события для type-safe коммуникации
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  brand?: string;
  tags?: string[];
}

export interface AppEvents {
  "product:add": { product: Product };
  "product:remove": { productId: string };
  "notification:show": { message: string; type: "success" | "error" };
  [key: string]: any;
}

export type EventHandler = (detail: any) => void;

export class SafeEventBus {
  private pendingEvents: Array<{ type: string; detail: any }> = [];
  private remoteReady = false;
  private listeners: Map<string, Set<EventHandler>> = new Map();

  // Отправка события
  dispatch<T extends keyof AppEvents>(type: T, detail: AppEvents[T]): void;
  dispatch(type: string, detail: any): void {
    if (this.remoteReady) {
      window.dispatchEvent(new CustomEvent(type, { detail }));
      this.notifyListeners(type, detail);
    } else {
      this.pendingEvents.push({ type, detail });
    }
  }

  // Подписка на события
  on<T extends keyof AppEvents>(
    type: T,
    handler: (detail: AppEvents[T]) => void,
  ): () => void;
  on(type: string, handler: EventHandler): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);

    return () => {
      this.listeners.get(type)?.delete(handler);
    };
  }

  private notifyListeners(type: string, detail: any) {
    this.listeners.get(type)?.forEach((handler) => {
      try {
        handler(detail);
      } catch (error) {
        console.error(`Error in event handler for ${type}:`, error);
      }
    });
  }

  markRemoteReady() {
    this.remoteReady = true;
    this.pendingEvents.forEach(({ type, detail }) => {
      window.dispatchEvent(new CustomEvent(type, { detail }));
      this.notifyListeners(type, detail);
    });
    this.pendingEvents = [];
  }

  isRemoteReady(): boolean {
    return this.remoteReady;
  }
}

// Создаем и экспортируем единственный экземпляр
export const eventBus = new SafeEventBus();

// Тип-хелпер для диспатча
export function dispatchAppEvent<T extends keyof AppEvents>(
  type: T,
  detail: AppEvents[T],
): void {
  eventBus.dispatch(type, detail);
}

// Тип-хелпер для слушателей
export function addAppEventListener<T extends keyof AppEvents>(
  type: T,
  handler: (detail: AppEvents[T]) => void,
): () => void {
  return eventBus.on(type, handler);
}
