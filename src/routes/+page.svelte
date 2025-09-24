<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<section class="mt-16 bg-gray-900 text-white py-12 px-6 rounded-xl animate-fade-up">
  <h2 class="text-3xl font-bold text-center mb-10 tracking-tight">🏍️ Colecciones por estilo de moto</h2>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <div class="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 class="text-xl font-semibold mb-2">Urbana</h3>
      <p class="text-sm text-gray-300">Repuestos para motos de ciudad, confort y eficiencia.</p>
    </div>
    <div class="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 class="text-xl font-semibold mb-2">Racing</h3>
      <p class="text-sm text-gray-300">Componentes de alto rendimiento para velocidad y precisión.</p>
    </div>
    <div class="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 class="text-xl font-semibold mb-2">Touring</h3>
      <p class="text-sm text-gray-300">Repuestos para viajes largos, estabilidad y resistencia.</p>
    </div>
  </div>
</section>




<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
