import { writable } from 'svelte/store';

type Item = { id: string; nombre: string; precio: number; categoria?: string; imagen?: string };

function createComparador() {
  const { subscribe, update } = writable<Item[]>([]);
  return {
    subscribe,
    toggle: (item: Item) =>
      update((items) =>
        items.find((x) => x.id === item.id)
          ? items.filter((x) => x.id !== item.id)
          : items.length < 3
          ? [...items, item]
          : items // máximo 3
      ),
    clear: () => update(() => [])
  };
}

export const comparador = createComparador();
