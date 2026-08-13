const mockBlackjack = jest.fn();
const mockOutput = {};
const mockTexasHoldEm = jest.fn();

jest.mock('../../examples/node/blackjack.js', () => ({
    __esModule: true,
    default: mockBlackjack,
}));
jest.mock('../../examples/node/texas-hold-em.js', () => ({
    __esModule: true,
    default: mockTexasHoldEm,
}));
jest.mock('../../examples/node/output/ConsoleOutput.js', () => ({
    __esModule: true,
    default: jest.fn(() => mockOutput),
}));

const importRunner = async (): Promise<void> => {
    await import('../../examples/node/run.js');
};

describe('Node example runner', () => {
    const originalArguments = [...process.argv];

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        process.argv = [...originalArguments];
    });

    afterAll(() => {
        process.argv = originalArguments;
    });

    test.each([
        ['blackjack', mockBlackjack],
        ['texas-hold-em', mockTexasHoldEm],
    ])('runs the %s example', async (name, expectedExample) => {
        process.argv[2] = name;

        await importRunner();

        expect(expectedExample).toHaveBeenCalledWith(mockOutput);
    });

    test('rejects an unknown example', async () => {
        process.argv[2] = 'solitaire';

        await expect(importRunner()).rejects.toThrow('Unknown example: solitaire');
    });

    test('rejects a missing example name', async () => {
        process.argv.splice(2);

        await expect(importRunner()).rejects.toThrow('Unknown example: (missing)');
    });
});
