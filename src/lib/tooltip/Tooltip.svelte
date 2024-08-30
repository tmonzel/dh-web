<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		content,
		position = 'bottom'
	}: {
		content: Snippet;
		children: Snippet;
		position?: 'top' | 'right' | 'bottom' | 'left';
	} = $props();

	let showTooltip = $state(false);
</script>

<div
	style="position: relative; display: inline-block"
	onpointerover={() => (showTooltip = true)}
	onpointerout={() => (showTooltip = false)}
>
	{#if showTooltip}
		<div style="position: absolute; bottom: calc(100% + 1rem); pointer-events: none">
			{@render content()}
		</div>
	{/if}

	{@render children()}
</div>
