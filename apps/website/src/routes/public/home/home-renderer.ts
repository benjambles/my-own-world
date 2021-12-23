import { home } from '@benjambles/mow-ui/dist/components/pages/public/home/home.js';
import { iterateTemplateParts } from '../../../utils/iterate-template-parts.js';

export function renderTemplate(data) {
    return iterateTemplateParts({ data, rootComponent: home });
}
