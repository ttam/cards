import Card from '../../src/Card.js';
import Hand from '../../src/Hand.js';
import Pile from '../../src/Pile.js';

describe('Hand', () => {
    test('is a pile and starts empty', () => {
        const hand = new Hand();

        expect(hand).toBeInstanceOf(Pile);
        expect(hand.isEmpty()).toBe(true);
        expect(hand.toString()).toBe('');
    });

    test('formats its cards as a space-separated string', () => {
        const hand = new Hand();

        expect(hand.addCard(new Card('AH')).addCard(new Card('10S'))).toBe(hand);

        expect(hand.size).toBe(2);
        expect(hand.toString()).toBe('A❤ 10♠');
    });
});
