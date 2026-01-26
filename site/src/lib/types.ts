// Will be added to in the future
export const enum SnippetType {
    Declutter = "declutter",
    Improvement = "improvement"
}

export interface Snippet {
    name: string;
    author: string;
    description: string[];
    type: SnippetType;
    preview?: string;
}

export interface Category {
    type: SnippetType;
    snippets: Snippet[];
}