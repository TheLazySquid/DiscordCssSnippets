<script lang="ts">
    import type { Snippet } from "../types";
    import Item from "./Item.svelte";
    import ClipboardCopy from "@lucide/svelte/icons/clipboard-copy";
    import Eye from "@lucide/svelte/icons/eye";
    import toast, { Toaster } from "svelte-french-toast";
    import Preview from "./Preview.svelte";

    let { snippets }: { snippets: Snippet[] } = $props();
    
    const storedEnabled = localStorage.enabledSnippets || "{}";
    let enabled: Record<string, boolean> = $state(JSON.parse(storedEnabled));
    $effect(() => { localStorage.enabledSnippets = JSON.stringify(enabled) });

    let enabledSnippets = $derived(snippets.filter(s => enabled[s.name]));
    let preview: Preview;

    function getCss() {
        return enabledSnippets.map(s => (
            `/* ${s.name} by ${s.author} */\n` +
            `@import url(https://raw.githubusercontent.com/TheLazySquid/DiscordCssSnippets/main/snippets/${s.name}/index.css);`
        )).join("\n");
    }

    function copy() {
        if(enabledSnippets.length === 0) {
            toast.error("No snippets selected to copy.");
            return;
        }
        
        navigator.clipboard.writeText(getCss())
            .then(() => toast.success("Copied css to clipboard!"))
            .catch(() => toast.error("Failed to copy css to clipboard."));
    }
    
    function showPreview() {
        if(enabledSnippets.length === 0) {
            toast.error("No snippets selected to copy.");
            return;
        }

        preview.show(getCss());
    }
</script>

<Preview bind:this={preview} />
<Toaster position="bottom-right" toastOptions={{ className: "toast" }} />

<div class="flex flex-col items-center">
    <div class="flex gap-2 h-screen items-start" style="width: min(1200px, 90%)">
        <div class="grid gap-4 grow overflow-y-auto max-h-full py-3 pr-2"
            style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
            {#each snippets as snippet}
                <Item {snippet} bind:enabled={enabled[snippet.name]} />
            {/each}
        </div>
        <div class="w-px h-full bg-gray-500 mr-2"></div>
        <div class="rounded-md bg-foreground p-4 w-75 mt-3">
            <h2 class="text-2xl font-bold mb-2 border-b border-gray-400">Selected Snippets</h2>
            <div class="bg-background rounded-sm p-4 overflow-y-auto max-h-80">
                {#if enabledSnippets.length === 0}
                    <p class="text-gray-400">No snippets selected.</p>
                {/if}
                {#each enabledSnippets as snippet}
                    <p>{snippet.name}</p>
                {/each}
            </div>
            <div class="h-7 mt-1">
                {#if enabledSnippets.length === 1}
                    1 snippet selected
                {:else if enabledSnippets.length > 1}
                    {enabledSnippets.length} snippets selected
                {/if}
            </div>
            <button onclick={copy} title="Copy css to clipboard"
                class="bg-background rounded-sm p-2">
                <ClipboardCopy size={20} />
            </button>
            <button onclick={showPreview} title="View css"
                class="bg-background rounded-sm p-2">
                <Eye size={20} />
            </button>
        </div>
    </div>
</div>

<style>
    :global(.toast) {
        background-color: var(--color-foreground) !important;
        color: var(--color-text) !important;
    }
</style>