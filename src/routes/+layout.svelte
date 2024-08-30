<script lang="ts">
	import Header from '$lib/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
