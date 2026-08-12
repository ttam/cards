import Card from '../../../src/Card.js';
import HandEvaluator from '../../../src/evaluators/HandEvaluator.js';
import PokerHandEvaluator from '../../../src/evaluators/PokerHandEvaluator.js';

const text = (cards: Card[]): string[] => cards.map(String);

describe('PokerHandEvaluator', () => {
    test('extends HandEvaluator', () => {
        const evaluator = new PokerHandEvaluator();

        expect(evaluator).toBeInstanceOf(HandEvaluator);
        expect(evaluator.evaluate(['2H', '3D', '4S', '5C', '6H']).description).toBe('Straight');
        expect(evaluator.compare(['2H', '3D', '4S', '5C', '6H'], ['AH', 'AD', '9S', '5C', '2H'])).toBe(1);
    });

    describe('compare', () => {
        test('orders different hand categories', () => {
            const straight = ['2H', '3D', '4S', '5C', '6H'];
            const pair = ['AH', 'AD', '9S', '5C', '2H'];

            expect(PokerHandEvaluator.compare(straight, pair)).toBe(1);
            expect(PokerHandEvaluator.compare(pair, straight)).toBe(-1);
        });

        test('uses kickers to order hands in the same category', () => {
            expect(PokerHandEvaluator.compare(['AH', 'AD', 'KS', '5C', '2H'], ['AC', 'AS', 'QD', '5H', '2C'])).toBe(1);
        });

        test('reports equivalent hands as a tie', () => {
            expect(PokerHandEvaluator.compare(['AH', 'KD', 'QS', 'JC', '10H'], ['AC', 'KS', 'QH', 'JD', '10C'])).toBe(0);
        });

        test('ranks a six-high straight above an Ace-low straight', () => {
            expect(PokerHandEvaluator.compare(['2H', '3D', '4S', '5C', '6H'], ['AH', '2D', '3S', '4C', '5H'])).toBe(1);
        });
    });

    describe('evaluate', () => {
        test.each([
            [['AH', 'KD', '9S', '5C', '2H'], 'High Card', [14, 13, 9, 5, 2]],
            [['AH', 'AD', '9S', '5C', '2H'], 'Pair', [14, 9, 5, 2]],
            [['AH', 'AD', '9S', '9C', '2H'], 'Two Pair', [14, 9, 2]],
            [['AH', 'AD', 'AS', '5C', '2H'], 'Three of a Kind', [14, 5, 2]],
            [['2H', '3D', '4S', '5C', '6H'], 'Straight', [6]],
            [['AH', 'JH', '9H', '5H', '2H'], 'Flush', [14, 11, 9, 5, 2]],
            [['AH', 'AD', 'AS', '5C', '5H'], 'Full House', [14, 5]],
            [['AH', 'AD', 'AS', 'AC', '2H'], 'Four of a Kind', [14, 2]],
            [['5H', '6H', '7H', '8H', '9H'], 'Straight Flush', [9]],
            [['10H', 'JH', 'QH', 'KH', 'AH'], 'Royal Flush', [14]],
        ])('recognizes %s as %s', (cards, description, tiebreakers) => {
            const result = PokerHandEvaluator.evaluate(cards);

            expect(result.description).toBe(description);
            expect(result.tiebreakers).toEqual(tiebreakers);
            expect(result.cards).toHaveLength(5);
            expect(Number(result)).toBe(result.score);
        });

        test('accepts card codes, Card instances, or a mixture of both', () => {
            const codes = ['3C', '4D', '5H', '6S', '7C'];
            const inputs = [
                codes,
                codes.map(code => new Card(code)),
                [new Card('3C'), '4D', new Card('5H'), '6S', new Card('7C')],
            ];

            for (const input of inputs) {
                expect(PokerHandEvaluator.evaluate(input)).toMatchObject({
                    description: 'Straight',
                    tiebreakers: [7],
                });
            }
        });

        test('recognizes an Ace-low straight and ranks the Ace below the five', () => {
            const result = PokerHandEvaluator.evaluate(['AH', '2D', '3S', '4C', '5H']);

            expect(result.description).toBe('Straight');
            expect(result.tiebreakers).toEqual([5]);
        });

        test('selects the best five cards from a larger collection', () => {
            const result = PokerHandEvaluator.evaluate(['2C', 'AH', 'KH', '3D', 'QH', 'JH', '10H']);

            expect(result.description).toBe('Royal Flush');
            expect(text(result.cards)).toEqual(['A❤', 'K❤', 'Q❤', 'J❤', '10❤']);
            expect(text(result.madeCards)).toEqual(['A❤', 'K❤', 'Q❤', 'J❤', '10❤']);
            expect(result.kickerCards).toEqual([]);
        });

        test('separates the made cards from kickers and sorts each group by rank', () => {
            const result = PokerHandEvaluator.evaluate(['3H', 'AS', '9D', 'AC', '5H']);

            expect(result.description).toBe('Pair');
            expect(text(result.madeCards)).toEqual(['A♠', 'A♣']);
            expect(text(result.kickerCards)).toEqual(['9♦', '5❤', '3❤']);
        });

        test('identifies made cards and kickers for repeated-rank hands', () => {
            const twoPair = PokerHandEvaluator.evaluate(['2H', 'KD', '2S', 'KC', 'AH']);
            const trips = PokerHandEvaluator.evaluate(['8H', '8D', '8S', 'KC', '2H']);
            const quads = PokerHandEvaluator.evaluate(['QH', 'QD', 'QS', 'QC', 'AH']);

            expect(text(twoPair.madeCards)).toEqual(['K♦', 'K♣', '2❤', '2♠']);
            expect(text(twoPair.kickerCards)).toEqual(['A❤']);
            expect(text(trips.madeCards)).toEqual(['8❤', '8♦', '8♠']);
            expect(text(trips.kickerCards)).toEqual(['K♣', '2❤']);
            expect(text(quads.madeCards)).toEqual(['Q❤', 'Q♦', 'Q♠', 'Q♣']);
            expect(text(quads.kickerCards)).toEqual(['A❤']);
        });

        test('rejects fewer than five cards', () => {
            expect(() => PokerHandEvaluator.evaluate(['AH', 'KD', 'QS', 'JC'])).toThrow(
                'At least 5 cards are required, received 4',
            );
        });
    });
});
