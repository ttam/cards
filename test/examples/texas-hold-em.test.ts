import example from '../../examples/node/texas-hold-em.js';
import BrowserOutput from '../../examples/node/output/BrowserOutput.js';

import type OutputInterface from '../../examples/node/output/OutputInterface.js';

const createOutput = (): jest.Mocked<OutputInterface> => ({
    blackjackHand: jest.fn(),
    board: jest.fn(),
    outcome: jest.fn(),
    playerHand: jest.fn(),
    title: jest.fn(),
    winners: jest.fn(),
});

describe("Texas Hold 'em example", () => {
    test('reports a single winner', () => {
        const output = createOutput();

        example(output, '0');

        expect(output.winners).toHaveBeenCalledWith(['Player 1'], 'Two Pair');
    });

    test('reports every player tied for the highest score', () => {
        const output = createOutput();

        example(output, '17');

        expect(output.winners).toHaveBeenCalledWith(['Player 1', 'Player 3'], 'Two Pair');
    });

    test('describes tied winners as splitting the pot', () => {
        const output = new BrowserOutput();

        example(output, '17');

        expect(output.lines.at(-1)).toBe(
            '<span style="color: #bcdf8a;"><strong>WINNERS: Player 1 and Player 3 split the pot with a Two Pair!</strong></span>',
        );
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
