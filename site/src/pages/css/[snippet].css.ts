import { getSnippetNames, snippetsDir } from "$lib/util";
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const getStaticPaths: GetStaticPaths = async () => {
    const snippets = await getSnippetNames();
    return snippets.map(snippet => ({
        params: {
            snippet
        }
    }));
}

export const GET: APIRoute = async ({ params }) => {
    if(!params.snippet) throw new Error("Missing parameters");

    const file = await readFile(join(snippetsDir, params.snippet, "index.css"));
    return new Response(file);
}