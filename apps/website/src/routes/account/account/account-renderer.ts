import { terms } from '@benjambles/mow-ui/dist/components/pages/public/terms.js';
import { iterateTemplateParts } from '../../../utils/iterate-template-parts.js';

export function renderTemplate(data) {
    return iterateTemplateParts({ data, rootComponent: terms });
}
