import { readSnippets, snippetsDir } from "$lib/util";
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const getStaticPaths: GetStaticPaths = async () => {
    const snippets = await readSnippets();
    return snippets.filter(s => s.preview).map(snippet => ({
        params: {
            snippet: snippet.name,
            name: snippet.preview
        }
    }));
}

export const GET: APIRoute = async ({ params }) => {
    if(!params.snippet || !params.name) throw new Error("Missing parameters");

    const file = await readFile(join(snippetsDir, params.snippet, params.name));
    return new Response(file);
}