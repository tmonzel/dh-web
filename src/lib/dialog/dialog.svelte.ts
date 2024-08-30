/* eslint-disable @typescript-eslint/no-explicit-any */
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
