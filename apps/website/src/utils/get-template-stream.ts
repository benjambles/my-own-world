import { renderModule } from '@lit-labs/ssr/lib/render-module.js';
import { resolve } from 'path';

interface GetTemplateStreamParams<T extends {} = {}> {
    data: T;
    renderFile: string;
    rootComponent: string;
}

/**
 * Render a template within a Node VM Context
 * and return it as an iterable stream
 * @param param0
 * @returns
 */
export async function getTemplateStream({
    data,
    rootComponent,
    renderFile,
}: GetTemplateStreamParams) {
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
export async function getWebsiteTemplateStream({
    data,
    rootComponent,
}: Omit<GetTemplateStreamParams, 'renderFile'>) {
    return getTemplateStream({
        data,
        rootComponent,
        renderFile: resolve('.', 'dist', 'utils', 'render-template.js'),
    });
}
