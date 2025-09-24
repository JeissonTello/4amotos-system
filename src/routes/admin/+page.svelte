<script lang="ts">
  import { pb } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  import { toast } from '$lib/stores/toast';

  let repuestos: any[] = [];
  let cargando = true;
  
  const categorias = [
    { id: 'cjc8syk160eibiy', nombre: 'Motor', icono: '🧩' },
    { id: 'oqlr4hvbe5b8kz7', nombre: 'Suspensión', icono: '🛞' },
    { id: '7iq8wyr1dn9xd0i', nombre: 'Eléctrico', icono: '⚡' },
    { id: 'mfmvanqxjhlkoug', nombre: 'Frenos', icono: '🛑' },
    { id: 'ug315r759dazeup', nombre: 'Transmisión', icono: '🔧' }
  ];

  onMount(async () => {
    try {
      repuestos = await pb.collection('repuestos').getFullList({ expand: 'categoria' });
    } catch (error) {
      toast.error('Error al cargar repuestos');
    } finally {
      cargando = false;
    }
  });

  async function guardarCambios(repuesto: any) {
    try {
      await pb.collection('repuestos').update(repuesto.id, {
        nombre: repuesto.nombre,
        descripcion: repuesto.descripcion,
        precio: repuesto.precio,
        disponible: repuesto.disponible
      });
      toast.success('Repuesto actualizado');
    } catch (error) {
      toast.error('Error al guardar');
    }
  }
</script>



<section class="w-full px-8 py-10 bg-[url('./img/fondo-carbono.jpg')] bg-cover bg-center text-white">
  <h1 class="text-4xl font-extrabold mb-4 tracking-tight text-center">🧰 Panel de Administración</h1>
  <p class="text-center text-gray-200 text-sm">Gestiona tus repuestos, categorías y cotizaciones desde un entorno técnico y visual.</p>
</section>

<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>

<br>
<div class="max-w-4xl mx-auto mt-6 text-sm text-gray-400 flex flex-wrap gap-4 justify-center">
  {#each categorias as cat}
    <div>{cat.icono} {cat.nombre}: {repuestos.filter(r => r.categoria === cat.id).length}</div>
  {/each}
</div>
<br>


<section class="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow animate-fade-up">
  <h2 class="text-3xl font-bold mb-6 text-gray-900 tracking-tight">📦 Repuestos cargados</h2>

  {#if cargando}
    <p class="text-gray-500">Cargando repuestos...</p>
  {:else}
    {#if repuestos.length === 0}
      <p class="text-center text-gray-400 mt-12">🚫 No hay repuestos registrados aún.</p>
    {:else}
      {#each categorias as cat}
  {#if repuestos.filter(r => r.categoria === cat.id).length > 0}
    <h3 class="text-xl font-bold mt-12 mb-4 text-gray-800">{cat.icono} {cat.nombre}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each repuestos.filter(r => r.categoria === cat.id) as r}
              <div class="bg-white border border-gray-300 rounded-xl p-6 shadow-md relative animate-fade-up">
                <div class="absolute top-2 right-2 text-2xl">
                  {#if r.expand?.categoria?.nombre === 'Motor'}🧩{/if}
                  {#if r.expand?.categoria?.nombre === 'Suspensión'}🛞{/if}
                  {#if r.expand?.categoria?.nombre === 'Eléctrico'}⚡{/if}
                  {#if r.expand?.categoria?.nombre === 'Frenos'}🛑{/if}
                  {#if r.expand?.categoria?.nombre === 'Transmisión'}🔧{/if}
                </div>

                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold text-gray-800">{r.nombre}</h3>
                </div>

                <div class="grid grid-cols-1 gap-3">
                  <input type="text" bind:value={r.nombre} class="border px-3 py-2 rounded w-full" placeholder="Nombre" />
                  <input type="number" bind:value={r.precio} class="border px-3 py-2 rounded w-full" placeholder="Precio" />
                  <textarea bind:value={r.descripcion} class="border px-3 py-2 rounded w-full" placeholder="Descripción" />
                  <label class="flex items-center gap-2">
                    <input type="checkbox" bind:checked={r.disponible} class="scale-110" />
                    <span class="text-sm">Disponible</span>
                  </label>
                </div>

                <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold" on:click={() => guardarCambios(r)}>
                  💾 Guardar cambios
                </button>
              </div>
            {/each}
          </div>
        {/if}
      {/each}
    {/if}
  {/if}

  
</section>

<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>
