<script>
	import CodeBlock from '$lib/CodeBlock.svelte';
	import Footer from '$lib/Footer.svelte';

	const code = `import type { Snippet } from 'svelte';

	let {
		children,
		content,
		position = 'bottom'
	}: {
		content: Snippet;
		children: Snippet;
		position?: 'top' | 'right' | 'bottom' | 'left';
	} = $props();

	let showTooltip = $state(false);`;
</script>

<div class="container mx-auto max-w-2xl">
	<main class="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
		<aside class="-ml-[8px] mb-16 tracking-tight">
			<div class="lg:sticky lg:top-20">
				<nav
					class="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
					id="nav"
				>
					<div class="flex flex-row space-x-0 pr-10">
						<a
							class="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
							href="/">home</a
						><a
							class="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
							href="/blog">blog</a
						><a
							class="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
							href="https://vercel.com/templates/next.js/portfolio-starter-kit">deploy</a
						>
					</div>
				</nav>
			</div>
		</aside>
		<section>
			<h1 class="mb-8 text-2xl font-bold tracking-tight">Digitales Handwerk</h1>
			<p class="mb-4">
				I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in Vim's keystroke
				commands and tabs' flexibility for personal viewing preferences. This extends to my support
				for static typing, where its early error detection ensures cleaner code, and my preference
				for dark mode, which eases long coding sessions by reducing eye strain.
			</p>

			<CodeBlock {code} />
			<div class="my-8">
				<div>
					<a class="flex flex-col space-y-1 mb-4" href="/blog/vim"
						><div class="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p class="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								April 9, 2024
							</p>
							<p class="text-neutral-900 dark:text-neutral-100 tracking-tight">
								Embracing Vim: The Unsung Hero of Code Editors
							</p>
						</div></a
					><a class="flex flex-col space-y-1 mb-4" href="/blog/spaces-vs-tabs"
						><div class="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p class="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								April 8, 2024
							</p>
							<p class="text-neutral-900 dark:text-neutral-100 tracking-tight">
								Spaces vs. Tabs: The Indentation Debate Continues
							</p>
						</div></a
					><a class="flex flex-col space-y-1 mb-4" href="/blog/static-typing"
						><div class="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p class="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								April 7, 2024
							</p>
							<p class="text-neutral-900 dark:text-neutral-100 tracking-tight">
								The Power of Static Typing in Programming
							</p>
						</div></a
					>
				</div>
			</div>
		</section>
		<Footer />
	</main>
</div>
