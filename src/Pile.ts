import Card from './Card.js';

export interface DealOptions {
    alternate?: boolean;
}

interface Dealable {
    addCard(card: Card): void;
}

type CardPredicate = (card: Card) => boolean;

type Random = () => number;

const createRandom = (seed: string | null): Random => {
    if (seed === null) {
        return Math.random;
    }

    // Simple hash to turn string seed into a numeric state
    let state = 0;
    for (let i = 0; i < seed.length; i++) {
        state = (Math.imul(state, 31) + seed.charCodeAt(i)) | 0;
    }

    // Mulberry32 generator
    return () => {
        let t = (state += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

export default class Pile {
    cards: Card[];

    constructor(cards: readonly (Card | string)[] = []) {
        this.cards = cards.map(card => (typeof card === 'string' ? new Card(card) : card));
    }

    get size(): number {
        return this.cards.length;
    }

    addCard(card: Card | string): this {
        this.cards.push(typeof card === 'string' ? new Card(card) : card);

        return this;
    }

    burn(count = 1): this {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError('Burn count must be a non-negative integer');
        }

        if (this.cards.length < count) {
            throw new Error('Not enough cards to burn');
        }

        for (let i = 0; i < count; i++) {
            this.removeCard(0);
        }

        return this;
    }

    cut(atOrSeedOrRandom: number | string | Random | null = null): this {
        const at =
            typeof atOrSeedOrRandom === 'number'
                ? atOrSeedOrRandom
                : Math.floor(
                      (typeof atOrSeedOrRandom === 'function' ? atOrSeedOrRandom : createRandom(atOrSeedOrRandom))() *
                          this.cards.length,
                  );

        if (!Number.isInteger(at) || at < 0 || at > this.cards.length) {
            throw new RangeError(`Cut position must be an integer from 0 to ${this.cards.length}`);
        }

        this.cards.push(...this.cards.splice(0, at));

        return this;
    }

    dealTo(targets: Dealable | Dealable[], countPerTarget = 1, options: DealOptions = {}): this {
        if (!Number.isInteger(countPerTarget) || countPerTarget < 0) {
            throw new RangeError('Count per target must be a non-negative integer');
        }

        const { alternate = true } = options;
        const targetList = [targets].flat();
        const count = targetList.length * countPerTarget;

        if (this.cards.length < count) {
            throw new Error(`${this.constructor.name} out of cards`);
        }

        const cards = this.cards.splice(0, count);

        for (const [index, card] of cards.entries()) {
            // alternate=true: target 1, target 2, target 1, target 2
            // alternate=false: target 1, target 1, target 2, target 2 for games like Euchre and Pinochle

            const targetIndex = alternate ? index % targetList.length : Math.floor(index / countPerTarget);

            targetList[targetIndex]!.addCard(card);
        }

        return this;
    }

    isEmpty(): boolean {
        return this.cards.length === 0;
    }

    has(cardOrPredicate: Card | string | CardPredicate): boolean {
        if (typeof cardOrPredicate === 'function') {
            return this.cards.some(cardOrPredicate);
        }

        const card = typeof cardOrPredicate === 'string' ? new Card(cardOrPredicate) : cardOrPredicate;

        return this.cards.some(existingCard => existingCard.equals(card));
    }

    removeCard(indexOrCard: number | Card | string = 0): Card {
        if (typeof indexOrCard === 'number') {
            if (!Number.isInteger(indexOrCard) || indexOrCard < 0) {
                throw new RangeError('Card index must be a non-negative integer');
            }

            return this.removeCardAtIndex(indexOrCard);
        }

        const cardToRemove = typeof indexOrCard === 'string' ? new Card(indexOrCard) : indexOrCard;
        const index = this.cards.findIndex(card => card.equals(cardToRemove));

        if (index === -1) {
            throw new Error('No card to remove');
        }

        return this.removeCardAtIndex(index);
    }

    shuffle(seedOrRandom: string | Random | null = null): this {
        const rand = typeof seedOrRandom === 'function' ? seedOrRandom : createRandom(seedOrRandom);

        // Fisher-Yates implementation using the `rand` method above
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j]!, this.cards[i]!];
        }

        return this;
    }

    private removeCardAtIndex(index: number): Card {
        const [card] = this.cards.splice(index, 1);

        if (card === undefined) {
            throw new Error('No card to remove');
        }

        return card;
    }
}
