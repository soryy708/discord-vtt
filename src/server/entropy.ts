import crypto from 'crypto';

export function randomInRange(min: number, max: number): number {
    return crypto.randomInt(min, max);
}
