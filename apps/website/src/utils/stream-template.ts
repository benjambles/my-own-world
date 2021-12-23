import { renderModule } from '@lit-labs/ssr/lib/render-module.js';
import { Readable } from 'stream';

export async function streamTemplate({ renderFile, importUrl, data, ctx }) {
    const page = await (renderModule(
        renderFile, // Module to load in VM context
        importUrl, // Referrer URL for module
        'renderTemplate', // Function to call
        [data], // Arguments to function
    ) as Promise<Iterable<unknown>>);

    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = Readable.from(page);
}
