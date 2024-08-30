<script lang="ts">
	import Modal from './Modal.svelte';

	let modal: Modal;

	let { selectedTab }: { selectedTab: string | undefined } = $props();

	$effect(() => {
		modal.open();
	});
</script>

<Modal bind:this={modal}>
	{#if selectedTab === 'login'}
		Login Form
	{:else}
		Default
	{/if}
</Modal>
