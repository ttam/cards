import suits, { findSuit } from '../../src/Suits.js';

describe('suits', () => {
    test('contains the standard suits with their colors and symbols', () => {
        expect(suits).toEqual([
            { code: 'H', color: 'red', name: 'hearts', symbol: '❤' },
            { code: 'D', color: 'red', name: 'diamonds', symbol: '♦' },
            { code: 'C', color: 'black', name: 'clubs', symbol: '♣' },
            { code: 'S', color: 'black', name: 'spades', symbol: '♠' },
        ]);
    });

    test('is immutable', () => {
        expect(Object.isFrozen(suits)).toBe(true);
        expect(suits.every(suit => Object.isFrozen(suit))).toBe(true);
    });

    describe('findSuit', () => {
        test.each(['hearts', ' H ', '❤'])('finds hearts by %s', identifier => {
            expect(findSuit(identifier)).toEqual(suits[0]);
        });

        test('finds the other suits by code, name, or symbol', () => {
            expect(findSuit('diamonds')).toEqual(suits[1]);
            expect(findSuit('♣')).toEqual(suits[2]);
            expect(findSuit('s')).toEqual(suits[3]);
        });

        test('returns undefined for an unknown suit', () => {
            expect(findSuit('joker')).toBeUndefined();
        });
    });
});
