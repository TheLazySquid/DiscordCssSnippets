<script lang="ts">
    import { baseUrl } from "$lib/consts";
    import Modal from "./Modal.svelte";
    import { modalState } from "./state.svelte";
</script>

<Modal type="preview">
    {#if modalState?.preview?.preview}
        {@const snippet = modalState.preview}
        <h2 class="text-2xl font-bold mb-2 border-b border-gray-400">{snippet.name} Preview</h2>
        {#if modalState.preview.preview.endsWith(".mp4")}
            <video
                src={`${baseUrl}previews/${snippet.name}/${snippet.preview}`}
                autoplay
                loop
                muted
            ></video>
        {:else}
            <img
                src={`${baseUrl}previews/${snippet.name}/${snippet.preview}`}
                alt={`A preview of ${snippet.name}`}
            />
        {/if}
    {/if}
</Modal>