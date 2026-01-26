import { SnippetType } from "./types";

export const baseUrl = "/DiscordCssSnippets/";
export const siteUrl = `https://thelazysquid.github.io${baseUrl}`;

export const categoryNames: Record<SnippetType, string> = {
    [SnippetType.Declutter]: "Declutter",
    [SnippetType.Improvement]: "Improvement"
}