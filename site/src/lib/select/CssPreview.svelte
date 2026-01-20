<script lang="ts">
    import ClipboardCopy from "@lucide/svelte/icons/clipboard-copy";
    import toast from "svelte-french-toast";

    let css: string | null = $state(null);
    
    export function show(previewCss: string) {
        css = previewCss;
    }

    function copy() {
        if(!css) return;

        navigator.clipboard.writeText(css)
            .then(() => toast.success("Copied css to clipboard!"))
            .catch(() => toast.error("Failed to copy css to clipboard."));
    }
</script>

{#if css}
    <div class="bg-backdrop fixed top-0 left-0 w-full h-full flex items-center justify-center"
        onpointerdown={() => css = null}>
        <div class="bg-foreground rounded-md p-4 overflow-y-auto"
            style="max-width: calc(100vw - 20px); max-height: calc(100vh - 20px);"
            onpointerdown={(e) => e.stopPropagation()}>
            <div class="text-2xl font-bold mb-2 border-b border-gray-400 flex items-center justify-between">
                CSS Preview
                <button onclick={copy} class="flex items-center justify-center p-1.5 bg-background rounded-sm">
                    <ClipboardCopy class="text-gray-300" size={20} />
                </button>
            </div>
            <pre class="bg-background p-2 rounded-sm overflow-x-auto">{css}</pre>
        </div>
    </div>
{/if}