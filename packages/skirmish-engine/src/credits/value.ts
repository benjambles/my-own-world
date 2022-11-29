export interface Transactor {
    credits: number;
}

export interface Purchasable {
    value: number;
}

export function canAffordPurchase<T extends Transactor, R extends Purchasable>(
    { credits }: T,
    { value }: R,
): boolean {
    return credits >= value;
}

export function getRemainingCredits<T extends Transactor, R extends Purchasable>(
    { credits }: T,
    { value }: R,
): number {
    return credits - value;
}

export function changeCredits<T extends Transactor>(entitiy: T, value: number): T {
    const newCredits = entitiy.credits + value;

    if (newCredits < 0) {
        throw new Error('game::credits::no_negative');
    }

    return {
        ...entitiy,
        credits: newCredits,
    };
}
