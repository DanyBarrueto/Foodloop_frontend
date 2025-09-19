type Listener<T> = (payload: T) => void;

class SimpleEventBus<Events extends Record<string, any>> {
  private listeners: { [K in keyof Events]?: Set<Listener<Events[K]>> } = {};

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    if (!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event]!.add(listener);
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    this.listeners[event]?.delete(listener);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners[event]?.forEach((l) => l(payload));
  }
}

export type OverlayEvents = {
  showAccountMenu: { };
  hideOverlay: {};
  accountAction: { action: 'config' | 'logout' };
};

export const overlayBus = new SimpleEventBus<OverlayEvents>();
