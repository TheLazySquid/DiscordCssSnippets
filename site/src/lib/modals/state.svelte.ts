import type { Snippet } from "$lib/types";

interface ModalProps {
    css: string;
    preview: Snippet;
}

export type ModalState = { [T in keyof ModalProps]: ModalProps[T] | null };

export let modalState = $state<ModalState>({
    css: null,
    preview: null
});