import { writable, get } from 'svelte/store';
import type { Repuesto } from '$lib/types';

type Cotizado = Repuesto & { cantidad: number };

let initial: Cotizado[] = [];

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('cotizacion');
  initial = stored ? JSON.parse(stored) : [];
}


const store = writable<Cotizado[]>(initial);

if (typeof window !== 'undefined') {
  store.subscribe(value => {
    localStorage.setItem('cotizacion', JSON.stringify(value));
  });
}


function createCotizacionStore() {
  return {
    subscribe: store.subscribe,
    add: (item: Repuesto) =>
      store.update(items => {
        const existing = items.find(i => i.id === item.id);
        if (existing) {
          return items.map(i =>
            i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
          );
        }
        return [...items, { ...item, cantidad: 1 }];
      }),
    updateCantidad: (id: string, cantidad: number) =>
      store.update(items =>
        items.map(i => (i.id === id ? { ...i, cantidad } : i))
      ),
    remove: (id: string) =>
      store.update(items => items.filter(i => i.id !== id)),
    clear: () => store.set([]),
    total: () => {
      const items = get(store);
      return items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }
  };
}

export const cotizacionStore = createCotizacionStore();
