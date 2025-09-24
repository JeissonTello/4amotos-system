<script lang="ts">
  import { cotizacionStore } from '$lib/stores/cotizacion';
  import type { Repuesto } from '$lib/types';
  let html2pdf: any;
  import { onMount } from 'svelte';

  onMount(async () => {
  const module = await import('html2pdf.js');
  html2pdf = module.default;
});

function exportarPDF() {
  const element = document.getElementById('cotizacion-pdf');
  if (element && html2pdf) {
    html2pdf().from(element).save('cotizacion.pdf');
  }
}
  $: cotizacion = $cotizacionStore as unknown as (Repuesto & { cantidad: number })[];
  $: total = cotizacion.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  
</script>

<section class="relative h-[400px] bg-[url('/img/moto-hero.jpg')] bg-cover bg-center flex items-center justify-center animate-fade-up">
  <div class="bg-black/60 p-8 rounded-xl text-center animate-scale-in">
    <h1 class="text-4xl font-extrabold text-white mb-4 tracking-tight">UAR Repuestos</h1>
    <p class="text-lg text-gray-200">Potencia, precisión y repuestos que responden</p>
  </div>
</section>

<div class="print:block hidden text-center mb-8">
  <h1 class="text-4xl font-bold">UAR Repuestos</h1>
  <p class="text-sm">Cotización técnica generada el {new Date().toLocaleDateString('es-CO')}</p>
  <hr class="my-4" />
</div>


<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>


<section id="cotizacion-pdf" class="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200 animate-fade-up">
  <!-- Encabezado -->
  <div class="mb-8 flex justify-between items-center border-b pb-4 animate-scale-in">
  <div>
    <h2 class="text-3xl font-bold text-gray-900 tracking-tight">🧾 Cotización Técnica</h2>
    <p class="text-sm text-gray-500">Cliente: <span class="font-medium">[Nombre del cliente]</span></p>
    <p class="text-sm text-gray-500">Fecha: {new Date().toLocaleDateString('es-CO')}</p>
  </div>
  <img src="./img/logo_recortado.png" alt="Logo 4AMotos" class="h-12 w-auto" />
</div>


  <!-- Tabla -->
  {#if cotizacion.length > 0}
  <table class="w-full text-sm border border-gray-300 rounded-xl overflow-hidden shadow-md divide-y divide-gray-200 table-fixed">
  <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide sticky top-0 z-10">
    <tr>
      <th class="px-6 py-4 text-left border-b">🔧 Producto</th>
      <th class="px-4 py-4 text-center border-b">Cantidad</th>
      <th class="px-4 py-4 text-right border-b">Precio</th>
      <th class="px-4 py-4 text-right border-b">Subtotal</th>
      <th class="px-4 py-4 text-center border-b no-print">Acción</th>
      <th class="px-4 py-4 text-center border-b">Imagen</th>
    </tr>
  </thead>
  <tbody>
    {#each cotizacion as item}
      <tr class="hover:bg-gray-50 transition">
        <td class="px-4 py-5 border-b text-center">
        <img src={item.imagen || '/img/placeholder.png'} alt={item.nombre} class="h-10 w-auto mx-auto rounded" /></td>
        <td class="px-6 py-5 border-b font-semibold text-gray-900 text-base">{item.nombre}</td>
        <td class="px-4 py-5 border-b text-center">
          <input
            type="number"
            min="1"
            class="w-16 border border-gray-300 px-2 py-1 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            bind:value={item.cantidad}
            on:change={() => cotizacionStore.updateCantidad(item.id, item.cantidad)}
          />
        </td>
        <td class="px-4 py-5 border-b text-right text-gray-700 font-medium">${item.precio.toLocaleString()}</td>
        <td class="px-4 py-5 border-b text-right text-gray-800 font-bold">${(item.precio * item.cantidad).toLocaleString()}</td>
        <td class="px-4 py-5 border-b text-center no-print">
          <button
            class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex items-center justify-center gap-1"
            on:click={() => cotizacionStore.remove(item.id)}
          >
            🗑️ <span class="hidden sm:inline">Quitar</span>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>


    <!-- Total -->
<div class="text-right text-2xl font-bold text-gray-900 mt-6 border-t pt-4 animate-scale-in">
  Total: ${total.toLocaleString()}
</div>

<div class="mt-8 bg-gray-50 p-4 rounded-lg border text-sm text-gray-700 animate-fade-up">
  <p>💡 Esta cotización incluye repuestos originales y compatibles. Los precios están sujetos a disponibilidad y pueden variar según el proveedor.</p>
  <p class="mt-2">📦 Tiempo estimado de entrega: 2–5 días hábiles.</p>
  <p class="mt-2">🔧 Instalación no incluida. Para servicio técnico, contáctanos.</p>
</div>


<div class="flex justify-end gap-4 mt-8 no-print animate-scale-in">
  <button
    class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition flex items-center gap-2"
    on:click={() => cotizacionStore.clear()}
  >
   🧹 Vaciar cotización
  </button>

  <button
    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
    on:click={() => window.print()}
  >
    🖨️ Imprimir
  </button>

  <button
  class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
  on:click={exportarPDF}
>
  📄 Exportar PDF
</button>

</div>

  {:else}
    <p class="text-gray-600 text-center mt-12">No hay productos en la cotización.</p>
  {/if}
  
</section>


<!-- Línea animada tipo tren bala -->
<div class="relative w-full h-6 overflow-hidden my-6">
  <div class="absolute top-2 left-0 h-1 w-64 bg-orange-500 rounded-full animate-tren-bala"></div>
</div>


<style>
 @media print {

  body {
    background: white !important;
    color: black !important;
  }

  section {
    box-shadow: none !important;
    border: none !important;
  }

  img {
    display: none !important;
  }
  
  header, nav, footer, .no-print {
    display: none !important;
  }

  main {
    padding: 0 !important;
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 6px;
    font-size: 12px;
  }

  tr {
    page-break-inside: avoid;
  }
}

@media print {
  .print\:block {
    display: block !important;
  }
  .no-print {
    display: none !important;
  }
  section {
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
  img {
    display: none !important;
  }
}

</style>
