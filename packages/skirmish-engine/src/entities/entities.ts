import { Filter, find, includes, remove } from '@benjambles/js-lib/dist/arrays/array.js';
import { eqProps, setProp } from '@benjambles/js-lib/dist/objects/props.js';

export interface GameEntity {
    name: string;
    description: string;
    entityId: string;
}

export function getEntityFilter<T extends GameEntity>(entityId: string): Filter<T> {
    return (iterEntity) => iterEntity.entityId === entityId;
}

export function hasEntityFilter<T extends GameEntity>(matchEntity: T): Filter<T> {
    return (iterEntity) => hasMatchingId(matchEntity, iterEntity);
}

export function removeEntityFilter<T extends GameEntity>(matchEntity: T): Filter<T> {
    return (iterEntity) => !hasMatchingId(matchEntity, iterEntity);
}

export function hasMatchingId<T extends GameEntity>(entity1: T, entity2: T): boolean {
    return eqProps('entityId', entity1, entity2);
}

export const removeEntity = remove(removeEntityFilter);

export const hasEntity = includes(hasEntityFilter);

export const getEntity = find(getEntityFilter);

export function setName<T extends GameEntity>(name: string, entity: T): T {
    return setProp('name', name, entity);
}

export function setDescription<T extends GameEntity>(description: string, entity: T): T {
    return setProp('description', description, entity);
}

export function setEntityId<T extends GameEntity>(entityId: string, entity: T): T {
    return setProp('entityId', entityId, entity);
}
