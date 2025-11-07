import { ClientApiTypes } from '@benjambles/mow-api/dist/app.js';
import { Handlers, MowApi } from '../../../../../contexts/request.js';

type SkirmishClientTypes = ClientApiTypes['skirmishes'];

export type SkirmishApiInstance = InstanceType<typeof SkirmishApi>;

export class SkirmishApi {
    private requestManager: InstanceType<typeof MowApi>;

    private actions: Handlers<SkirmishClientTypes> = {};

    addManager(requestManager: InstanceType<typeof MowApi>) {
        if (this.requestManager) return;
        this.requestManager = requestManager;

        this.actions.getSkirmishes = this.requestManager.getRequestor<
            SkirmishClientTypes['getSkirmishes']
        >('/skirmishes', 'get');

        this.actions.createSkirmish = this.requestManager.getRequestor<
            SkirmishClientTypes['createSkirmish']
        >('/skirmishes', 'post');

        this.actions.deleteSkirmishById = this.requestManager.getRequestor<
            SkirmishClientTypes['deleteSkirmishById']
        >('/skirmishes/:skirmishId', 'delete');

        this.actions.getSkirmishById = this.requestManager.getRequestor<
            SkirmishClientTypes['getSkirmishById']
        >('/skirmishes/:skirmishId', 'get');

        this.actions.updateSkirmishById = this.requestManager.getRequestor<
            SkirmishClientTypes['updateSkirmishById']
        >('/skirmishes/:skirmishId', 'put');
    }

    async call<T extends keyof SkirmishClientTypes>(
        action: T,
        params: SkirmishClientTypes[T][2],
        accessToken?: string,
    ): Promise<SkirmishClientTypes[T][3]> {
        if (!this.requestManager) {
            throw new Error('No request manager to handle the request.');
        }

        if (!this.actions[action]) {
            throw new Error('No action for the given key.');
        }

        return this.actions[action](params, accessToken);
    }
}
