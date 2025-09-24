<script lang="ts">
  import '../app.css';
  import Toast from '$lib/components/Toast.svelte';
  let menuOpen = false;
</script>

<!-- Contenedor general -->
<div class="bg-black text-white min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white">

  <!-- 🔷 Encabezado fijo -->
 <header class="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl border-b border-orange-500 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between animate-fade-in">

   <!-- 🔥 Logo técnico con borde sólido -->
<div class="flex items-center gap-4">
  <div class="relative">
    <div class="absolute inset-0 bg-orange-500 blur-sm opacity-30 animate-pulse"></div>
    <!-- svelte-ignore a11y_missing_attribute -->
    <img src="/img/logo_recortado.png" class="logo-tron h-12 w-12 object-contain" />
  </div>
  <h1 class="text-3xl font-extrabold tracking-widest text-orange-400 drop-shadow-md animate-fade-up">
    <span class="text-white">A4</span><span class="text-orange-500">Motos</span>
  </h1>
</div>


    <!-- 🧭 Navegación tipo consola -->
    <nav class="hidden md:flex gap-10 text-sm font-semibold tracking-wide">
      <a href="/productos" class="text-white hover:text-orange-400 transition duration-200 hover:scale-105">🧰 <span class="uppercase">Productos</span></a>
      <a href="/cotizacion" class="text-white hover:text-orange-400 transition duration-200 hover:scale-105">📄 <span class="uppercase">Cotización</span></a>
      <a href="/admin" class="text-white hover:text-orange-400 transition duration-200 hover:scale-105">🛠️ <span class="uppercase">Panel Admin</span></a>
    </nav>

    <!-- ☰ Botón móvil -->
    <button class="md:hidden p-2 rounded hover:bg-white/10 transition" on:click={() => (menuOpen = !menuOpen)} aria-label="Abrir menú">
      ☰
    </button>
  </div>

  <!-- 📱 Menú móvil -->
  {#if menuOpen}
    <div class="md:hidden px-6 pb-4 flex flex-col gap-2 animate-fade-in">
      <a href="/productos" class="py-2 px-3 rounded hover:bg-white/10">🧰 Productos</a>
      <a href="/cotizacion" class="py-2 px-3 rounded hover:bg-white/10">📄 Cotización</a>
      <a href="/admin" class="py-2 px-3 rounded hover:bg-white/10">🛠️ Panel Admin</a>
    </div>
  {/if}
</header>



  <!-- Espaciador para el header fijo -->
  <div class="h-[72px]"></div>

  <!-- 🔷 Contenido principal -->
  <main class="flex-1 w-full px-6 pt-4 animate-fade-up">
    <slot />
  </main>

  <!-- 🔷 Toast técnico -->
  <Toast />

  <!-- 🔷 Pie de página -->
  <footer class="bg-black border-t border-gray-800 text-center py-6 text-sm text-gray-500">
    Proyecto académico desarrollado por <strong class="text-white">Jeisson</strong> · <span class="text-orange-400 font-semibold">4AMotos</span> © 2025
  </footer>
</div>

<style>
  nav a {
    text-decoration: none;
    font-weight: 500;
  }

  nav a:hover {
    text-decoration: underline;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100vw;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
