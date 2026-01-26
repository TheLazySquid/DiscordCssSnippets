<script lang="ts">
    import type { Category, Snippet } from "../types";
    import Item from "./Item.svelte";
    import ClipboardCopy from "@lucide/svelte/icons/clipboard-copy";
    import Eye from "@lucide/svelte/icons/eye";
    import toast, { Toaster } from "svelte-french-toast";
    import { categoryNames, siteUrl } from "$lib/consts";
    import Css from "$lib/modals/Css.svelte";
    import { modalState } from "$lib/modals/state.svelte";
    import Preview from "$lib/modals/Preview.svelte";

    interface Props {
        categories: Category[];
        snippets: Snippet[];
    }

    let { categories, snippets }: Props = $props();
    
    const storedEnabled = localStorage.enabledSnippets || "{}";
    let enabled: Record<string, boolean> = $state(JSON.parse(storedEnabled));
    let search = $state("");
    let enabledSnippets = $derived(snippets.filter(s => enabled[s.name]));
    let shownCategories = $derived.by(() => {
        const searched = search.toLowerCase();
        if(searched === "") return categories;

        // Show categories that have at least one snippet matching the search
        const newCategories: Category[] = [];
        for(const category of categories) {
            const filtered = category.snippets.filter(s => (
                s.name.toLowerCase().includes(searched)
            ));

            if(filtered.length === 0) continue;
            newCategories.push({ type: category.type, snippets: filtered });
        }

        return newCategories;
    });

    $effect(() => { localStorage.enabledSnippets = JSON.stringify(enabled) });

    function getCss() {
        return enabledSnippets.map(s => (
            `/* ${s.name} by ${s.author} */\n` +
            `@import url(${siteUrl}css/${s.name}.css);`
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
            toast.error("No snippets are selected.");
            return;
        }

        modalState.css = getCss();
    }

    function enableAll() {
        for(const snippet of snippets) {
            enabled[snippet.name] = true;
        }
    }
</script>

<Css />
<Preview />
<Toaster position="bottom-right" toastOptions={{ className: "toast" }} />

<div class="flex flex-col items-center">
    <div class="flex gap-2 h-screen items-start" style="width: min(1400px, 90%)">
        <div class="overflow-y-auto max-h-full py-3 grow">
            {#if shownCategories.length === 0}
                <h2 class="text-2xl font-bold text-center">No snippets match your search</h2>
            {/if}
            {#each shownCategories as category}
                <h2 class="text-3xl font-bold border-b">
                    {categoryNames[category.type]}
                </h2>
                <div class="grid gap-4 py-3 pr-2"
                    style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))">
                    {#each category.snippets as snippet}
                        <Item {snippet} bind:enabled={enabled[snippet.name]} />
                    {/each}
                </div>
            {/each}
        </div>
        <div class="w-px h-full bg-gray-500 mr-2"></div>
        <div>
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
            <div class="bg-foreground rounded-md mt-3 p-2">
                <input bind:value={search} placeholder="Search snippets" class="outline-none" />
            </div>
            <div class="flex mt-3 gap-3">
                <button class="bg-foreground rounded-sm p-2" onclick={enableAll}>
                    Select All
                </button>
                <button class="bg-foreground rounded-sm p-2" onclick={() => enabled = {}}>
                    Deselect All
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.toast) {
        background-color: var(--color-foreground) !important;
        color: var(--color-text) !important;
    }
</style>