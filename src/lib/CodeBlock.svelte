<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import jsLang from 'highlight.js/lib/languages/javascript';

	let { code }: { code: string } = $props();

	let highlighted = $state('');
	let lang = 'javascript';

	$effect(() => {
		hljs.registerLanguage(lang, jsLang);
		highlighted = hljs.highlight(code, { language: lang }).value;
	});
</script>

<div
	class="rounded-lg p-4 shadow-3xl text-sm relative overflow-hidden max-w-full mb-6 bg-neutral-900/90"
>
	<pre class="whitespace-pre-wrap break-all pt-1 text-white/80">
	<code class="language-javascript"
			>{#if highlighted}{@html highlighted}{/if}</code
		>
  <small
			class="bg-black/30 absolute top-0 right-0 uppercase font-bold text-xs rounded-bl-md px-2 py-1"
			><span class="sr-only">Language:</span>Typescript</small
		>
</pre>
</div>
