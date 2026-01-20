<script lang="ts">
    import type { Snippet } from "$lib/types";
    import Check from "@lucide/svelte/icons/check";

    interface Props {
        snippet: Snippet;
        enabled: boolean;
    }

    let { snippet, enabled = $bindable() }: Props = $props();
</script>

<div class="bg-foreground rounded-md p-4">
    <button class="flex items-center justify-between text-2xl font-bold mb-2 border-b border-gray-400 w-full"
        onclick={() => enabled = !enabled}>
        {snippet.name}
        <div class="flex items-center justify-center w-6 h-6 bg-background rounded-sm">
            {#if enabled}
                <Check class="text-gray-300 w-5 h-5" strokeWidth={3} />
            {/if}
        </div>
    </button>
    <div class="text-sm mb-4">
        By {snippet.author}
    </div>
    {#each snippet.description as line}
        <p class="mb-2">{line}</p>
    {/each}
</div>