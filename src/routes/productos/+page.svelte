<script lang="ts">
  import { cotizacionStore } from '$lib/stores/cotizacion';
  import type { RepuestoExpandido } from '$lib/types';
  import { toast } from '$lib/stores/toast';
  import { favoritosStore } from '$lib/stores/favoritos';
  import { comparador } from '$lib/stores/comparador';
  $: comparar = $comparador;
  $: favoritos = $favoritosStore;
  export let data: { repuestos: RepuestoExpandido[] };
  let idRepuestoAgregado: string = '';
  let repuestoActivo: RepuestoExpandido | null = null;
  let busqueda = '';
  let categoria = '';
  let soloDisponibles = false;
  let soloFavoritos = false;
  let ordenPrecio: 'asc' | 'desc' = 'asc';

  $: categoriaNombre = categoria === '' 
  ? 'todas las categorías' 
  : categorias.find(c => c.id === categoria)?.nombre ?? 'categoría desconocida';


$: base = data.repuestos.filter((r) =>
  (r.nombre + (r.descripcion ?? '') + (r.expand?.categoria?.nombre ?? ''))
    .toLowerCase()
    .includes(busqueda.toLowerCase()) &&
  (categoria === '' || r.categoria === categoria) &&
  (!soloDisponibles || !!r.disponible) &&
  (!soloFavoritos || favoritos.includes(r.id))
);


  $: filtrados = [...base].sort((a, b) =>
    ordenPrecio === 'asc' ? a.precio - b.precio : b.precio - a.precio
  );

  const categorias = [
  { id: 'cjc8syk160eibiy', nombre: 'Motor', icono: '🧩' },
  { id: 'oqlr4hvbe5b8kz7', nombre: 'Suspensión', icono: '🛞' },
  { id: '7iq8wyr1dn9xd0i', nombre: 'Eléctrico', icono: '⚡' },
  { id: 'mfmvanqxjhlkoug', nombre: 'Frenos', icono: '🛑' },
  { id: 'ug315r759dazeup', nombre: 'Transmisión', icono: '🔧' }
];
</script>

<section class="w-full h-[400px] bg-[url('/img/moto-hero2.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center animate-fade-up">
  <div class="bg-black/60 p-8 rounded-xl text-center text-white">
    <h1 class="text-4xl font-extrabold mb-4 tracking-tight">UAR Repuestos</h1>
    <p class="text-lg text-gray-200">Potencia, precisión y repuestos que responden</p>
  </div>
</section>

<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>


<section class="bg-black text-white py-12 px-4">
  <h2 class="text-3xl font-bold text-center mb-10 tracking-tight">🔥 Repuestos Destacados</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 mx-auto animate-scale-in">
    {#each data.repuestos.slice(0, 3) as destacado}
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col animate-fade-in">
        <img
          src={destacado.imagen || './img/placeholder.png'}
          alt={destacado.nombre}
          class="w-full h-40 object-contain mb-4 bg-gray-100 rounded"
        />
        <h3 class="text-xl font-semibold mb-2">{destacado.nombre}</h3>
        <p class="text-sm text-gray-300 mb-2">{destacado.descripcion ?? 'Sin descripción'}</p>
        <p class="text-sm text-orange-400 font-bold mb-4">💰 ${destacado.precio.toLocaleString()}</p>
        <button
          class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition font-semibold active:scale-95"
          on:click={() => cotizacionStore.add(destacado)}
        >
          ➕ Cotizar
        </button>
      </div>
    {/each}
  </div>
</section>

<section class="bg-black text-white py-12 px-4">
  <h2 class="text-4xl font-extrabold mb-10 text-center tracking-tight">
    🛠️ Catálogo Visual de Repuestos
  </h2>
  <p class="text-center text-sm text-gray-400 mb-4">
    Mostrando <strong>{filtrados.length}</strong> repuestos en <strong>{categoriaNombre}</strong>
  </p>

  <div class="py-12 px-4 animate-scale-in">
    <h2 class="text-2xl font-bold text-center mb-8 tracking-tight">🔍 Explora por categoría</h2>
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mt-8">
  {#each categorias as cat}
    <div
      class="flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-lg transition cursor-pointer text-white text-center h-40"
      on:click={() => categoria = cat.id}
    >
      <div class="text-5xl mb-2">{cat.icono}</div>
      <p class="text-lg font-semibold">{cat.nombre}</p>
    </div>
  {/each}
</div>


  </div>

  <div class="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center animate-scale-in">
    <input
      type="text"
      bind:value={busqueda}
      placeholder="Buscar repuesto..."
      class="border px-3 py-2 rounded w-full bg-gray-100 text-black"
    />
<select
      bind:value={categoria}
      class="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 w-full"
>
      <option value="">Todas las categorías</option>
      <option value="cjc8syk160eibiy">Motor</option>
      <option value="oqlr4hvbe5b8kz7">Suspensión</option>
      <option value="7iq8wyr1dn9xd0i">Eléctrico</option>
      <option value="mfmvanqxjhlkoug">Frenos</option>
      <option value="ug315r759dazeup">Transmisión</option>
</select>


    <div class="flex items-center gap-2 animate-scale-in">
      <input id="soloDisp" type="checkbox" bind:checked={soloDisponibles} class="scale-110" />
      <label for="soloDisp" class="text-sm text-white">Solo disponibles</label>
      <input id="soloFav" type="checkbox" bind:checked={soloFavoritos} class="scale-110" />
      <label for="soloFav" class="text-sm text-white">Solo favoritos</label>
    </div>
    <select bind:value={ordenPrecio} class="border px-3 py-2 rounded w-full bg-gray-100 text-black">
      <option value="asc">Precio: Menor a mayor</option>
      <option value="desc">Precio: Mayor a menor</option>
    </select>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300"
     class:opacity-0={filtrados.length === 0}
     class:opacity-100={filtrados.length > 0}>
  {#each filtrados as repuesto}
    <!-- Card del repuesto -->
  {/each}
</div>


  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
    {#each filtrados as repuesto}
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col animate-fade-in">
        <div class="cursor-pointer" on:click={() => repuestoActivo = repuesto}>
          <img
            src={repuesto.imagen || '/img/placeholder.png'}
            alt={repuesto.nombre}
            class="w-full h-40 object-contain mb-4 bg-gray-100 border border-gray-300 rounded"
          />
          <div class="flex items-start justify-between mb-2">
  <h3 class="text-xl font-semibold text-white tracking-tight">{repuesto.nombre}</h3>
  <button
    class="text-yellow-400 hover:scale-110 transition"
    on:click={() => favoritosStore.toggle(repuesto.id)}
    aria-label="Favorito"
    title="Favorito"
  >
    {#if favoritos.includes(repuesto.id)}★{/if}
    {#if !favoritos.includes(repuesto.id)}☆{/if}
  </button>
</div>

          <p class="text-sm text-gray-300 leading-relaxed">{repuesto.descripcion ?? 'Sin descripción'}</p>
        </div>

        <div class="text-sm text-gray-200 mb-2 animate-scale-in">
          <span class="font-medium text-orange-400">💰 ${repuesto.precio.toLocaleString()}</span>
        </div>

        <p class="text-xs text-gray-400 mb-1">
          Disponible:
          <span class={repuesto.disponible ? 'text-green-400' : 'text-red-400'}>
            {repuesto.disponible ? 'Sí' : 'No'}
          </span>
        </p>

        <button
          class="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg shadow hover:brightness-110 transition font-semibold active:scale-95"
          on:click={() => {
            cotizacionStore.add(repuesto);
            idRepuestoAgregado = repuesto.id;
            setTimeout(() => (idRepuestoAgregado = ''), 2000);
            toast.success('Añadido a cotización');
          }}
        >
          ➕ Añadir a cotización
        </button>

        <button
          class="mt-2 w-full border border-blue-500 text-blue-400 py-2 rounded hover:bg-blue-500/10 transition font-semibold"
          on:click={() =>
            comparador.toggle({
            id: repuesto.id,
            nombre: repuesto.nombre,
            precio: repuesto.precio,
            categoria: repuesto.expand?.categoria?.nombre,
            imagen: repuesto.imagen
          })
          }
        >
        ⇄ Comparar
      </button>

        {#if idRepuestoAgregado === repuesto.id}
          <p class="text-green-400 text-sm mt-2">✅ Añadido a cotización</p>
        {/if}
      </div>
    {/each}
  </div>

  {#if repuestoActivo}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-scale-in">
      <div class="bg-gray-100 rounded-xl p-6 max-w-md w-full shadow-lg relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          on:click={() => (repuestoActivo = null)}
          aria-label="Cerrar"
        >
          ✖
        </button>

        <img
          src={repuestoActivo.imagen || '/img/placeholder.png'}
          alt={repuestoActivo.nombre}
          class="w-full h-48 object-contain mb-4 bg-gray-50 rounded"
        />

        <h3 class="text-xl font-bold text-gray-900 mb-2">{repuestoActivo.nombre}</h3>
        <p class="text-sm text-gray-600 mb-2">{repuestoActivo.descripcion ?? 'Sin descripción'}</p>
        <p class="text-sm text-gray-700 mb-2">💰 ${repuestoActivo.precio.toLocaleString()}</p>
        <p class="text-xs text-gray-500 mb-2">
          Categoría: {repuestoActivo.expand?.categoria?.nombre ?? 'Sin categoría'}
        </p>
        <p class="text-xs text-gray-500 mb-4">
          Disponible:
          <span class={repuestoActivo.disponible ? 'text-green-600' : 'text-red-600'}>
            {repuestoActivo.disponible ? 'Sí' : 'No'}
          </span>
        </p>

        <button
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
          on:click={() => {
            if (repuestoActivo) cotizacionStore.add(repuestoActivo);
            toast.success('Producto cotizado');
          }}
        >
          ➕ Cotizar
        </button>
      </div>
    </div>
  {/if}

  {#if comparar.length > 0}
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg z-50 flex items-center gap-3 animate-scale-in">
    <span class="text-sm">Comparar: {comparar.length}/3</span>
    <a href="#comparador" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Abrir</a>
    <button class="text-gray-300 hover:text-white text-sm" on:click={() => comparador.clear()}>Limpiar</button>
  </div>
{/if}

{#if comparar.length > 0}
  <section id="comparador" class="mt-16 bg-gray-800/60 rounded-xl p-6 border border-gray-700">
    <h3 class="text-2xl font-bold mb-6 text-white tracking-tight">🔍 Comparación de Repuestos</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each comparar as repuesto}
        <div class="bg-gray-900 rounded-lg p-4 border border-gray-600 shadow">
          <img
            src={repuesto.imagen || './img/placeholder.png'}
            alt={repuesto.nombre}
            class="w-full h-32 object-contain mb-3 bg-gray-100 rounded"
          />
          <h4 class="text-lg font-semibold text-white mb-1">{repuesto.nombre}</h4>
          <p class="text-sm text-gray-300 mb-1">{repuesto.categoria ?? 'Sin categoría'}</p>
          <p class="text-sm text-orange-400 font-bold mb-2">💰 ${repuesto.precio.toLocaleString()}</p>
          <button
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
            on:click={() => cotizacionStore.add(repuesto)}
          >
            ➕ Cotizar
          </button>
        </div>
      {/each}
    </div>
  </section>
{/if}


<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>

</section>
