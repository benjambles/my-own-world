import { iterateTemplateParts } from './iterate-template-parts.js';

export async function renderTemplate(data, componentPath) {
    const rootComponent = await import(componentPath);
    return iterateTemplateParts({ data, rootComponent: rootComponent.default });
}
