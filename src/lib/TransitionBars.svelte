<script lang="ts">
	import { beforeNavigate, afterNavigate, goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	let {
		bars = 6,
		barDuration = 200,
		barDelay = 200,
		barClassNames = undefined
	}: {
		bars?: number;
		barDuration?: number;
		barDelay?: number;
		barClassNames?: string;
	} = $props();

	let navigating = $state(false);
	let to = $state<string | undefined>(undefined);

	beforeNavigate((n) => {
		to = n.to?.url.pathname;
		if (n.willUnload || navigating || !to) return;
		navigating = true;
		n.cancel();
		setTimeout(async () => {
			await goto(to as string);
		}, bars * barDelay);
	});

	afterNavigate((n) => {
		navigating = false;
		to = undefined;
	});
</script>

{#if navigating}
	<div class="absolute left-0 top-0 flex h-screen w-screen">
		{#each { length: bars } as _, n}
			<div
				transition:slide|global={{ axis: 'y', duration: barDuration, delay: n * barDelay }}
				class="h-full w-full {barClassNames ? barClassNames : 'bg-black'}"
			></div>
		{/each}
	</div>
{/if}
