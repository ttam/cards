import Deck from '../../src/Deck.js';
import Pile from '../../src/Pile.js';

describe('Deck', () => {
    test('creates one complete standard deck in suit and rank order', () => {
        const deck = new Deck();

        expect(deck).toBeInstanceOf(Pile);
        expect(deck.size).toBe(52);
        expect(deck.cards.slice(0, 4).map(card => card.toString())).toEqual(['2❤', '3❤', '4❤', '5❤']);
        expect(deck.cards.slice(-4).map(card => card.toString())).toEqual(['J♠', 'Q♠', 'K♠', 'A♠']);
    });

    test('contains every rank exactly once in every suit', () => {
        const deck = new Deck();

        expect(deck.cards.filter(card => card.suit === 'hearts')).toHaveLength(13);
        expect(deck.cards.filter(card => card.suit === 'diamonds')).toHaveLength(13);
        expect(deck.cards.filter(card => card.suit === 'clubs')).toHaveLength(13);
        expect(deck.cards.filter(card => card.suit === 'spades')).toHaveLength(13);
    });
});
