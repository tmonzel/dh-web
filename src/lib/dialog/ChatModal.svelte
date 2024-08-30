<script lang="ts">
	import Modal from './Modal.svelte';

	let modal: Modal;

	export function open() {
		modal.open();
	}

	export function close() {
		modal.close();
	}
</script>

<Modal bind:this={modal}>From chatmodal</Modal>
