export interface Snippet {
    name: string;
    author: string;
    description: string[];
    category: string;
    preview?: string;
}

export interface Category {
    name: string;
    snippets: Snippet[];
}