jest.mock('chalk', () => {
    const identity = (text: string): string => text;

    return {
        __esModule: true,
        default: {
            bold: { green: identity, yellow: identity },
            dim: identity,
            redBright: identity,
            whiteBright: identity,
        },
    };
});

import BrowserOutput from '../../examples/node/output/BrowserOutput.js';
import ConsoleOutput from '../../examples/node/output/ConsoleOutput.js';
import { BlackjackHandEvaluator, Hand, PokerHandEvaluator } from '../../src/index.js';

describe('Example output adapters', () => {
    const blackjack = BlackjackHandEvaluator.evaluate(['AH', 'KS']);
    const bust = BlackjackHandEvaluator.evaluate(['KH', 'QD', '2S']);
    const flush = PokerHandEvaluator.evaluate(['AH', 'KH', 'QH', 'JH', '10H', '2C', '3D']);
    const highCard = PokerHandEvaluator.evaluate(['AH', 'KD', '9S', '7C', '4H', '3D', '2S']);
    const mixedHand = new Hand(['AH', 'KS']);
    const soft = BlackjackHandEvaluator.evaluate(['AH', '6S']);

    describe('BrowserOutput', () => {
        test('formats titles, boards, outcomes, and poker hands as HTML', () => {
            const output = new BrowserOutput();

            output.title("Texas Hold 'em");
            output.board(mixedHand);
            output.outcome('Player 1', 'checks');
            output.playerHand('Player 1', mixedHand, highCard);

            expect(output.lines).toEqual([
                "<strong>Texas Hold 'em</strong>",
                'Board: <span style="color:#ff6b5c">A❤</span> <span style="color:#f5f0e6">K♠</span>',
                'Player 1 checks.',
                expect.stringContaining('Player 1 holds (<span style="color:#ff6b5c">A❤</span>'),
            ]);
            expect(output.lines.at(-1)).toContain('&rarr; Best Hand: High Card');
            expect(output.lines.at(-1)).toContain('<span style="opacity:0.6">');
        });

        test('formats blackjack, soft, and bust totals', () => {
            const output = new BrowserOutput();

            output.blackjackHand('Natural', mixedHand, blackjack);
            output.blackjackHand('Soft hand', new Hand(['AH', '6S']), soft);
            output.blackjackHand('Bust hand', new Hand(['KH', 'QD', '2S']), bust);

            expect(output.lines).toEqual([
                expect.stringContaining('&rarr; Total: 21 (Blackjack!)'),
                expect.stringContaining('&rarr; Total: 17 (soft)'),
                expect.stringContaining('&rarr; Total: 22 (bust)'),
            ]);
        });

        test('formats single and tied winners', () => {
            const output = new BrowserOutput();

            output.winners(['Player 1'], 'Flush');
            output.winners(['Player 1', 'Player 3'], 'Two Pair');

            expect(output.lines).toEqual([
                '<span style="color: #bcdf8a;"><strong>WINNER: Player 1 wins the pot with a Flush!</strong></span>',
                '<span style="color: #bcdf8a;"><strong>WINNERS: Player 1 and Player 3 split the pot with a Two Pair!</strong></span>',
            ]);
        });

        test('omits an empty kicker section', () => {
            const output = new BrowserOutput();

            output.playerHand('Player 1', mixedHand, flush);

            expect(output.lines[0]).not.toContain('opacity:0.6"></span>');
        });
    });

    describe('ConsoleOutput', () => {
        let log: jest.SpyInstance<void, Parameters<typeof console.log>>;

        beforeEach(() => {
            log = jest.spyOn(console, 'log').mockImplementation();
        });

        afterEach(() => {
            log.mockRestore();
        });

        test('formats every supported message', () => {
            const output = new ConsoleOutput();

            output.title('Blackjack');
            output.board(mixedHand);
            output.outcome('Player 1', 'stands');
            output.playerHand('Player 1', mixedHand, highCard);
            output.blackjackHand('Natural', mixedHand, blackjack);
            output.blackjackHand('Soft hand', new Hand(['AH', '6S']), soft);
            output.blackjackHand('Bust hand', new Hand(['KH', 'QD', '2S']), bust);
            output.winners(['Player 1'], 'Flush');
            output.winners(['Player 1', 'Player 3'], 'Two Pair');

            expect(log.mock.calls.map(([message]) => message)).toEqual([
                'Blackjack',
                'Board: A❤ K♠',
                'Player 1 stands.',
                expect.stringContaining('Player 1 holds (A❤ K♠) -> Best Hand: High Card'),
                'Natural holds (A❤ K♠) -> Total: 21 (Blackjack!)',
                'Soft hand holds (A❤ 6♠) -> Total: 17 (soft)',
                'Bust hand holds (K❤ Q♦ 2♠) -> Total: 22 (bust)',
                'WINNER: Player 1 wins the pot with a Flush!',
                'WINNERS: Player 1 and Player 3 split the pot with a Two Pair!',
            ]);
        });

        test('omits empty kicker output', () => {
            const output = new ConsoleOutput();

            output.playerHand('Player 1', mixedHand, flush);

            expect(log).toHaveBeenCalledWith(expect.not.stringMatching(/\s\)$/));
        });
    });
});
