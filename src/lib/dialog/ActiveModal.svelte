<script lang="ts">
	import { modalService } from './dialog.svelte';
</script>

{#if modalService.activeModal}
	<modalService.activeModal.component {...modalService.activeModal.props} />
{/if}
