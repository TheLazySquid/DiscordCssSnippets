<script lang="ts">
    import type { Snippet } from "svelte";
    import { modalState, type ModalState } from "./state.svelte";

    let { children, type }: { children: Snippet, type: keyof ModalState } = $props();
</script>

{#if modalState[type]}
    <div class="bg-backdrop fixed top-0 left-0 w-full h-full flex items-center justify-center"
        onpointerdown={() => modalState[type] = null}>
        <div class="bg-foreground rounded-md p-4 overflow-y-auto"
            style="max-width: calc(100vw - 20px); max-height: calc(100vh - 20px);"
            onpointerdown={(e) => e.stopPropagation()}>
            {@render children()}
        </div>
    </div>
{/if}