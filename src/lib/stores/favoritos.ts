import { writable } from 'svelte/store';

const KEY = 'favoritos';
const initial = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem(KEY) || '[]')
  : [];

const store = writable<string[]>(initial);

store.subscribe((val) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(val));
  }
});

export const favoritosStore = {
  subscribe: store.subscribe,
  toggle: (id: string) => {
    store.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  },
  has: (ids: string[], id: string) => ids.includes(id)
};
