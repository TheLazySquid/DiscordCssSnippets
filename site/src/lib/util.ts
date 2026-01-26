import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SnippetType, Category, Snippet } from "./types";

export const snippetsDir = join(import.meta.dirname, "..", "..", "..", "snippets");

export function getSnippetNames() {
    return readdir(snippetsDir);
}

export async function readSnippet(name: string): Promise<Snippet> {
    const metaPath = join(snippetsDir, name, "meta.json");
    const metaContent = await readFile(metaPath);
    const meta = JSON.parse(metaContent.toString());

    const description = Array.isArray(meta.description) ? meta.description : [meta.description];

    return {
        name,
        description,
        author: meta.author,
        preview: meta.preview,
        type: meta.type
    };
}

export async function readSnippets() {
    const snippets = await getSnippetNames();
    return Promise.all(snippets.map(readSnippet));
}

export async function readCategories() {
    const snippets = await readSnippets();
    const categories: Partial<Record<SnippetType, Category>> = {};

    for(const snippet of snippets) {
        categories[snippet.type] ??= {
            type: snippet.type,
            snippets: []
        };

        categories[snippet.type]!.snippets.push(snippet);
    }

    return {
        categories: Object.values(categories) as Category[],
        snippets
    }
}