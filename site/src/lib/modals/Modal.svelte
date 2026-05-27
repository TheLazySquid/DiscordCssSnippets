<script lang="ts">
    import type { Snippet } from "svelte";
    import { modalState, type ModalState } from "./state.svelte";

    let { children, type }: { children: Snippet, type: keyof ModalState } = $props();

    function onKeyDown(e: KeyboardEvent) {
        if(e.key === "Escape") {
            modalState[type] = null;
        }
    }
</script>

<svelte:window onkeydown={onKeyDown} />

{#if modalState[type]}
    <div class="bg-backdrop fixed top-0 left-0 w-full h-full flex items-center justify-center"
        onpointerdown={() => modalState[type] = null}>
        <div class="bg-foreground rounded-md p-4 overflow-y-auto"
            style="max-width: calc(100vw - 65px); max-height: calc(100vh - 65px);"
            onpointerdown={(e) => e.stopPropagation()}>
            {@render children()}
        </div>
    </div>
{/if}