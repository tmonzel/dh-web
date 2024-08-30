I would rather be more general than more specific on this one.
Your attempt leads to a lot of boilerplate in creating "useXModal" functions.
Is it really necessary for your architecture to create a class within a context?

First of all i would create a general modal component:

Modal.svelte

```
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
```

Second i would define concrete modal components which are using Modal.svelte under the hood maybe like so:

AuthModal.svelte

```
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
```

Then i would define a global service which later can but must not be passed via context. I also created a handy useModal() for comfort and encapsulation reasons:

dialog.svelte.ts

Maybe you could implement a more general modal service like this:

```
import { type Component } from 'svelte';

type ModalHandler<T> = {
	open: (props?: T) => void;
	close: () => void;
};

type OpenModal<Props extends Record<string, any>> = {
	component: Component<Props>;
	props: Props;
};

class ModalService {
	activeModal = $state<OpenModal<any> | null>(null);

	open<Props extends Record<string, any>>(component: Component<Props>, props?: Props): void {
		this.activeModal = { component, props };
	}

	close(): void {
		this.activeModal = null;
	}
}

export const modalService = new ModalService();

export function useModal<Props extends Record<string, any>>(
	component: Component<Props>
): ModalHandler<Props> {
	const open = (props?: Props) => {
		modalService.open(component, props);
	};

	const close = () => {
		modalService.close();
	};

	return {
		open,
		close
	};
}
```

Make a wrapper component for the modal active state:

```
<script lang="ts">
	import { modalService } from './dialog.svelte';
</script>

{#if modalService.activeModal}
	<modalService.activeModal.component {...modalService.activeModal.props} />
{/if}
```

Finally you can use all together typesafe.
The selectedTab prop of your AuthModal.svelte getting typed correctly. So all props of ChatModal.svelte as well.

+page.svelte

```
<script lang="ts">
	import ActiveModal from '$lib/ActiveModal.svelte';
	import AuthModal from '$lib/AuthModal.svelte';
  import ChatModal from '$lib/ChatModal.svelte';
	import { useModal } from '$lib/dialog.svelte';

	const authModal = useModal(AuthModal);
  const chatModal = useModal(ChatModal);
</script>

<ActiveModal />

<button onclick={() => authModal.open({ selectedTab: 'login' })}> Open Auth with login tab </button>
<button onclick={() => authModal.open()}> Open Auth default </button>
<button onclick={() => chatModal.open()}> Open chat modal</button>
```

Tested this code with svelte5. Maybe something is useful for you.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
