import type { APIRoute } from "astro";
import { readSnippets } from "../lib/util";

export const GET: APIRoute = async () => {
    const snippets = await readSnippets();
    return Response.json(snippets);
}