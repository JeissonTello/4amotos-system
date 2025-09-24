<script lang="ts">
    import { spring } from 'svelte/motion';
    import { derived } from 'svelte/store';

    const count = spring(0);

    function modulo(n: number, m: number): number {
        return ((n % m) + m) % m;
    }

    const offset = derived(count, ($count) => modulo($count, 1));
</script>

<div class="counter">
    <button on:click={() => count.set(count.target - 1)} aria-label="Decrease the counter by one">
        <svg aria-hidden="true" viewBox="0 0 1 1">
            <path d="M0,0.5 L1,0.5" />
        </svg>
    </button>

    <div class="counter-viewport">
        {#if $offset !== undefined}
            <div class="counter-digits" style="transform: translate(0, {100 * $offset}%)">
                <strong class="hidden" aria-hidden="true">{Math.floor($count + 1)}</strong>
                <strong>{Math.floor($count)}</strong>
            </div>
        {/if}
    </div>

    <button on:click={() => count.set(count.target + 1)} aria-label="Increase the counter by one">
        <svg aria-hidden="true" viewBox="0 0 1 1">
            <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
        </svg>
    </button>
</div>

<style>
    /* ... tu CSS original está perfecto, no necesita cambios ... */
</style>
