import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function load() {
  const result = await pb.collection('repuestos').getList(1, 50, {
    expand: 'categoria'
  });

  const repuestosConImagen = result.items.map((r) => ({
    ...r,
    imagen: `/img/${r.nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')}.png`
  }));

  return {
    repuestos: repuestosConImagen
  };
}
