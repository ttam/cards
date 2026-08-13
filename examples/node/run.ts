import blackjack from './blackjack.js';
import texasHoldEm from './texas-hold-em.js';

import ConsoleOutput from './output/ConsoleOutput.js';

const process = (globalThis as { process?: { argv: string[] } }).process;
const example = process?.argv[2] as 'blackjack' | 'texas-hold-em' | undefined;
const command =
    example &&
    {
        blackjack: blackjack,
        'texas-hold-em': texasHoldEm,
    }[example];

if (!command) {
    throw new Error(`Unknown example: ${example ?? '(missing)'}`);
}

command(new ConsoleOutput());
