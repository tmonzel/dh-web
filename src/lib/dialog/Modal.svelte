<script lang="ts">
	import type { Snippet } from 'svelte';

	let dialog: HTMLDialogElement;
	let isOpen = $state(false);

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	export function open() {
		isOpen = true;
		dialog.showModal();
	}

	export function close() {
		isOpen = false;
		dialog.close();
	}
</script>

<dialog bind:this={dialog}>
	{@render children()}
</dialog>
