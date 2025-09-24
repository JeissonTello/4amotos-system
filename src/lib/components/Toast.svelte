<script lang="ts">
  import { toast } from '$lib/stores/toast';
  $: toasts = $toast;
  const color = (t: 'success' | 'error' | 'info' = 'info') =>
    t === 'success' ? 'bg-green-600' : t === 'error' ? 'bg-red-600' : 'bg-blue-600';
</script>

<div class="fixed bottom-4 right-4 z-[100] space-y-2">
  {#each toasts as t (t.id)}
    <div class={`text-white px-4 py-2 rounded shadow-lg ${color(t.type)}`}>
      {t.message}
    </div>
  {/each}
</div>
