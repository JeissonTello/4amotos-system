import PocketBase from 'pocketbase';
import type { ListResult } from 'pocketbase';
import type { Repuesto, Categoria, SearchFilters } from '$lib/types';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const repuestosService = {
  async getAll(page = 1, perPage = 20): Promise<ListResult<Repuesto>> {
    return await pb.collection('repuestos').getList<Repuesto>(page, perPage);
  },

  async search(filters: SearchFilters): Promise<Repuesto[]> {
    let filter = '';
    const conditions: string[] = [];

    if (filters.nombre) {
      conditions.push(`nombre ~ "${filters.nombre}"`);
    }
    if (filters.categoria) {
      conditions.push(`categoria = "${filters.categoria}"`);
    }
    if (filters.disponible !== undefined) {
      conditions.push(`disponible = ${filters.disponible}`);
    }
    if (filters.precio_min) {
      conditions.push(`precio >= ${filters.precio_min}`);
    }
    if (filters.precio_max) {
      conditions.push(`precio <= ${filters.precio_max}`);
    }

    if (conditions.length > 0) {
      filter = conditions.join(' && ');
    }

    const result = await pb.collection('repuestos').getFullList<Repuesto>({ filter });
    return result;
  }
};

export const categoriasService = {
  async getAll(): Promise<Categoria[]> {
    const result = await pb.collection('categorias').getFullList<Categoria>();
    return result;
  }
};
