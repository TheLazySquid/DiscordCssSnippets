import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const snippetsDir = join(import.meta.dirname, "..", "..", "..", "snippets");

interface Snippet {
    name: string;
    author: string;
    description: string[];
    preview?: string;
}

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
        preview: meta.preview
    };
}

export async function readSnippets() {
    const snippets = await getSnippetNames();

    let output: Snippet[] = [];    
    for(const snippet of snippets) {
        output.push(await readSnippet(snippet));
    }

    return output;
}