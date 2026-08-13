import example from '../../examples/node/blackjack.js';

import type OutputInterface from '../../examples/node/output/OutputInterface.js';

const createOutput = (): jest.Mocked<OutputInterface> => ({
    blackjackHand: jest.fn(),
    board: jest.fn(),
    outcome: jest.fn(),
    playerHand: jest.fn(),
    title: jest.fn(),
    winners: jest.fn(),
});

describe('Blackjack example', () => {
    test('plays every hand and reports hits, wins, losses, and pushes', () => {
        const output = createOutput();

        example(output, '7');

        expect(output.title).toHaveBeenCalledWith('Blackjack');
        expect(output.blackjackHand).toHaveBeenCalledTimes(4);
        expect(output.outcome.mock.calls).toEqual([
            ['Player 1', 'hits'],
            ['Player 1', 'loses to the dealer'],
            ['Player 2', 'beats the dealer'],
            ['Player 3', 'hits'],
            ['Player 3', 'pushes with the dealer'],
        ]);

        const reportedHands = output.blackjackHand.mock.calls.map(([name, hand, result]) => ({
            cards: hand.cards.map(String),
            isBust: result.isBust,
            name,
            total: result.total,
        }));

        expect(reportedHands).toEqual([
            { cards: ['6♣', 'A❤'], isBust: false, name: 'Dealer', total: 17 },
            { cards: ['J❤', '6♦', '9♣'], isBust: true, name: 'Player 1', total: 25 },
            { cards: ['8♦', 'A♣'], isBust: false, name: 'Player 2', total: 19 },
            { cards: ['4♣', 'K♠', '3♣'], isBust: false, name: 'Player 3', total: 17 },
        ]);
    });

    test('compares non-bust hands that lose to the dealer', () => {
        const output = createOutput();

        example(output, '1');

        expect(output.outcome).toHaveBeenCalledWith('Player 1', 'loses to the dealer');
        expect(output.blackjackHand.mock.calls[1]![2].isBust).toBe(false);
    });

    test('uses an unseeded random shuffle by default', () => {
        const random = jest.spyOn(Math, 'random').mockReturnValue(0.5);

        try {
            example(createOutput());
            expect(random).toHaveBeenCalled();
        } finally {
            random.mockRestore();
        }
    });
});
