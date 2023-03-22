import { renderModule } from '@lit-labs/ssr/lib/render-module.js';
import { resolve } from 'path';

/**
 * Render a template within a Node VM Context
 * and return it as an iterable stream
 * @param param0
 * @returns
 */
export async function getTemplateStream(
    data: unknown,
    rootComponent: string,
    renderFile: string,
) {
    return await renderModule(
        renderFile, // Module to load in VM context
        import.meta.url, // Referrer URL for module
        'renderTemplate', // Function to call
        [data, rootComponent], // Arguments to function
    );
}

/**
 * Partially applied template streamer to wrap the given component with
 * the core website layout
 * @param param0
 * @returns
 */
export async function getWebsiteTemplateStream(data: unknown, rootComponent: string) {
    return getTemplateStream(
        data,
        rootComponent,
        resolve('.', 'dist', 'utils', 'render-template.js'),
    );
}
