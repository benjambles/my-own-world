export interface Transactor {
    credits: number;
}

export interface Purchasable {
    value: number;
}

export function canAffordPurchase<R extends Purchasable, T extends Transactor>(
    { value }: R,
    { credits }: T,
): boolean {
    return credits >= value;
}

export function getRemainingCredits<R extends Purchasable, T extends Transactor>(
    { value }: R,
    { credits }: T,
): number {
    return credits - value;
}

export function changeCredits<T extends Transactor>(value: number, entity: T): T {
    const newCredits = entity.credits + value;

    if (newCredits < 0) {
        throw new Error('game::credits::no_negative');
    }

    return {
        ...entity,
        credits: newCredits,
    };
}
