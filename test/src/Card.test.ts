import Card from '../../src/Card.js';
import * as Ranks from '../../src/Ranks.js';
import * as Suits from '../../src/Suits.js';

describe('Card', () => {
    describe('constructor', () => {
        test.each([
            ['ah', 'A', 'hearts', 14, 'A❤'],
            [' 10s ', '10', 'spades', 10, '10♠'],
            ['q♦', 'Q', 'diamonds', 12, 'Q♦'],
            ['K♣', 'K', 'clubs', 13, 'K♣'],
            ['11S', 'J', 'spades', 11, 'J♠'],
            ['14S', 'A', 'spades', 14, 'A♠'],
        ])('parses %s into a card', (code, label, suit, value, text) => {
            const card = new Card(code);

            expect(card.label).toBe(label);
            expect(card.suit).toBe(suit);
            expect(card.value).toBe(value);
            expect(card.toString()).toBe(text);
        });

        test.each(['', 'ace of hearts', '1S', '15S', 'A X', '10'])('rejects an invalid code: %s', code => {
            expect(() => new Card(code)).toThrow(`Invalid card: ${code}`);
        });

        test('rejects a card when its rank or suit cannot be resolved', () => {
            jest.spyOn(Ranks, 'findRank').mockReturnValueOnce(undefined);
            expect(() => new Card('AS')).toThrow('Invalid card: AS');

            jest.spyOn(Suits, 'findSuit').mockReturnValueOnce(undefined);
            expect(() => new Card('AS')).toThrow('Invalid card: AS');
        });

        test('creates an immutable card', () => {
            const card = new Card('AH');

            expect(Object.isFrozen(card)).toBe(true);
            expect(() => Object.assign(card, { suit: 'spades' })).toThrow(TypeError);
            expect(card.toString()).toBe('A❤');
        });
    });

    describe('equals', () => {
        test('matches cards with the same rank and suit', () => {
            expect(new Card('AH').equals(new Card('ah'))).toBe(true);
        });

        test('does not match a different rank, suit, or object type', () => {
            const card = new Card('AH');

            expect(card.equals(new Card('AS'))).toBe(false);
            expect(card.equals(new Card('2H'))).toBe(false);
            expect(card.equals({ label: 'A', suit: 'hearts' })).toBe(false);
            expect(card.equals(null)).toBe(false);
        });
    });
});
