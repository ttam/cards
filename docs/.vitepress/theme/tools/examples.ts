import blackjackExample from '../../../../examples/node/blackjack';
import texasHoldEmExample from '../../../../examples/node/texas-hold-em';

import BrowserOutput from '../../../../examples/node/output/BrowserOutput'
import type OutputInterface from '../../../../examples/node/output/OutputInterface';

function runExample(example: (output: OutputInterface) => void): string[] {
    const output = new BrowserOutput();
    example(output);
    return output.lines;
}

export const blackjack = (): string[] => runExample(blackjackExample);
export const texasHoldEm = (): string[] => runExample(texasHoldEmExample);
