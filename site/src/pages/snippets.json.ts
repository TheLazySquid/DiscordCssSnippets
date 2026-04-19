import type { APIRoute } from "astro";
import { getSnippetNames, readSnippets } from "../lib/snippets";

export const GET: APIRoute = async () => {
    const snippets = await readSnippets();
    const names = await getSnippetNames(true);
    const remaps = names.filter(name => name.includes("+")).map(name => name.split("+"));
    
    return Response.json({
        snippets,
        remaps
    });
}