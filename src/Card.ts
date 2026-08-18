import { findRank } from './Ranks.js';
import { findSuit } from './Suits.js';

export default class Card {
    readonly label: string;
    readonly suit: string;
    readonly value: number;

    constructor(code: string) {
        const match = code
            .trim()
            .toUpperCase()
            .match(/^(1[0-4]|[2-9JQKA])\s*([SHDC♠❤♦♣])$/);

        if (match === null) {
            throw new Error(`Invalid card: ${code}`);
        }

        const rankKey = /^\d+$/.test(match[1]!) ? +match[1]! : match[1]!;
        const rank = findRank(rankKey);
        const suit = findSuit(match[2]!);

        if (rank === undefined || suit === undefined) {
            throw new Error(`Invalid card: ${code}`);
        }

        this.label = rank.label;
        this.suit = suit.name;
        this.value = rank.value;

        Object.freeze(this);
    }

    equals(other: unknown): boolean {
        return other instanceof Card && this.label === other.label && this.suit === other.suit;
    }

    toString(): string {
        return `${this.label}${findSuit(this.suit)!.symbol}`;
    }
}
