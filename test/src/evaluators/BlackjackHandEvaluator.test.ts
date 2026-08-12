import BlackjackHandEvaluator from '../../../src/evaluators/BlackjackHandEvaluator.js';
import Card from '../../../src/Card.js';
import HandEvaluator from '../../../src/evaluators/HandEvaluator.js';

describe('BlackjackHandEvaluator', () => {
    test('extends HandEvaluator', () => {
        const evaluator = new BlackjackHandEvaluator();

        expect(evaluator).toBeInstanceOf(HandEvaluator);
        expect(evaluator.evaluate(['AH', 'KD']).isBlackjack).toBe(true);
        expect(evaluator.compare(['AH', 'KD'], ['7H', '7D', '7S'])).toBe(1);
    });

    describe('compare', () => {
        test('compares raw hands and gives blackjack priority over an ordinary 21', () => {
            const blackjack = ['AH', 'KD'];
            const ordinaryTwentyOne = ['7H', '7D', '7S'];

            expect(BlackjackHandEvaluator.compare(blackjack, ordinaryTwentyOne)).toBe(1);
            expect(BlackjackHandEvaluator.compare(ordinaryTwentyOne, blackjack)).toBe(-1);
        });

        test('reports a tie for hands with equal scores', () => {
            expect(BlackjackHandEvaluator.compare(['KH', '9D'], ['10S', '9C'])).toBe(0);
        });

        test('ranks every made hand above a bust', () => {
            expect(BlackjackHandEvaluator.compare(['2H', '3D'], ['KH', 'QD', '2S'])).toBe(1);
        });
    });

    describe('evaluate', () => {
        test('accepts card codes and Card instances while preserving their order', () => {
            const king = new Card('KS');
            const result = BlackjackHandEvaluator.evaluate(['2H', king, 'QD']);

            expect(result.cards.map(String)).toEqual(['2❤', 'K♠', 'Q♦']);
            expect(result.cards[1]).toBe(king);
            expect(result).toMatchObject({
                isBlackjack: false,
                isBust: true,
                isSoft: false,
                score: -22,
                total: 22,
            });
        });

        test.each([
            [['AH', '6D'], 17, true],
            [['AH', '6D', '10S'], 17, false],
            [['AH', 'AD', '9S'], 21, true],
            [['AH', 'AD', '9S', 'KC'], 21, false],
        ])('adjusts Aces in %j to the best usable total', (cards, total, isSoft) => {
            expect(BlackjackHandEvaluator.evaluate(cards)).toMatchObject({
                isBust: false,
                isSoft,
                total,
            });
        });

        test('distinguishes a natural blackjack from a three-card 21', () => {
            const blackjack = BlackjackHandEvaluator.evaluate(['AH', 'QD']);
            const ordinaryTwentyOne = BlackjackHandEvaluator.evaluate(['AH', '5D', '5S']);

            expect(blackjack).toMatchObject({ isBlackjack: true, score: 22, total: 21 });
            expect(ordinaryTwentyOne).toMatchObject({ isBlackjack: false, score: 21, total: 21 });
            expect(Number(blackjack)).toBe(blackjack.score);
            expect(Number(ordinaryTwentyOne)).toBe(ordinaryTwentyOne.score);
        });

        test('uses a negative total as the score for a bust', () => {
            const result = BlackjackHandEvaluator.evaluate(['KH', 'QD', '2S']);

            expect(result).toMatchObject({
                isBlackjack: false,
                isBust: true,
                isSoft: false,
                score: -22,
                total: 22,
            });
            expect(Number(result)).toBe(result.score);
        });
    });
});
