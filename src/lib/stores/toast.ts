import { writable } from 'svelte/store';

type Toast = { id: number; message: string; type?: 'success' | 'error' | 'info' };
function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  let id = 0;

  function push(message: string, type: Toast['type'] = 'info', timeout = 2500) {
    const t = { id: ++id, message, type };
    update((all) => [...all, t]);
    setTimeout(() => {
      update((all) => all.filter((x) => x.id !== t.id));
    }, timeout);
  }

  return {
    subscribe,
    push,
    success: (m: string, timeout?: number) => push(m, 'success', timeout),
    error: (m: string, timeout?: number) => push(m, 'error', timeout),
    info: (m: string, timeout?: number) => push(m, 'info', timeout)
  };
}

export const toast = createToastStore();
