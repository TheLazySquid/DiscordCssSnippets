<script lang="ts">
    import ClipboardCopy from "@lucide/svelte/icons/clipboard-copy";
    import toast from "svelte-french-toast";
    import { modalState } from "./state.svelte";
    import Modal from "./Modal.svelte";

    function copy() {
        if(!modalState.css) return;

        navigator.clipboard.writeText(modalState.css)
            .then(() => toast.success("Copied css to clipboard!"))
            .catch(() => toast.error("Failed to copy css to clipboard."));
    }
</script>

<Modal type="css">
    <div class="text-2xl font-bold mb-2 border-b border-gray-400 flex items-center justify-between">
        CSS Preview
        <button onclick={copy} class="flex items-center justify-center p-1.5 bg-background rounded-sm">
            <ClipboardCopy class="text-gray-300" size={20} />
        </button>
    </div>
</Modal>
