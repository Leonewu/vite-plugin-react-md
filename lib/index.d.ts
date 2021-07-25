import type { Plugin } from 'vite';
import type MarkdownItType from 'markdown-it';
export interface ViteReactMDOptions {
    /** markdownIt instance or config */
    markdownIt?: MarkdownItType.Options;
}
declare const plugin: (options?: ViteReactMDOptions) => Plugin;
export default plugin;
