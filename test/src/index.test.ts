import * as cards from '../../src/index.js';

describe('public package API', () => {
    test('exports the core classes, data, and evaluators', () => {
        expect(cards).toEqual(
            expect.objectContaining({
                Card: expect.any(Function),
                Deck: expect.any(Function),
                Hand: expect.any(Function),
                Pile: expect.any(Function),

                ranks: expect.any(Array),
                suits: expect.any(Array),

                findRank: expect.any(Function),
                findSuit: expect.any(Function),

                BlackjackHandEvaluator: expect.any(Function),
                PokerHandEvaluator: expect.any(Function),
            }),
        );
    });
});
