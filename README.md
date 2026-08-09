# cards

A small, dependency-free toolkit for representing standard playing cards

[Documentation](https://ttam.github.io/cards/)

## Setup

This project uses Node.js 22 and npm.

```sh
nvm use
npm install
```

To install the package in another project:

```sh
npm install @bannon/cards
```

## Core API Usage

Create, shuffle, deal, and inspect a standard deck:

```ts
import { Deck, Hand } from '@bannon/cards';

const deck = new Deck().shuffle();
const players = [new Hand(), new Hand()];

deck.dealTo(players, 5);

for (const card of players[0].cards) {
    console.log(card.toString()); // e.g. 'A♠'
}
```

## Browser bundles

The package publishes a standalone ESM bundle for browsers.

The core bundle exports the card model:

```html
<script type="module">
    import { Deck } from 'https://unpkg.com/@bannon/cards@latest/dist/cards.js';

    const deck = new Deck().shuffle();
</script>
```

The same file is available from jsDelivr:

```text
https://cdn.jsdelivr.net/npm/@bannon/cards@latest/dist/cards.js
```

## Development

| Command | Purpose |
| --- | --- |
| `npm test` | Run the Jest test suite against TypeScript source. |
| `npm run typecheck` | Type-check the library and TypeScript examples. |
| `npm run lint` | Check JavaScript and TypeScript for code-quality and style issues. |
| `npm run lint:fix` | Apply ESLint's safe automatic fixes. |
| `npm run format` | Format JavaScript, TypeScript, and configuration files with Prettier. |
| `npm run format:check` | Check formatting without changing files. |
| `npm run build` | Build ESM browser and declaration outputs. |
| `npm run dev` | Rebuild package outputs on source changes. |
| `npm run docs:dev` | Run the documentation site locally. |
| `npm run docs:build` | Build the package and the documentation site. |
| `npm run docs:preview` | Preview the built documentation site. |
| `npm run coverage` | Create the coverage report. |
| `npm run check` | Type-check, test, lint, verify formatting, and build. |

## Project layout

```text
src/                    Card, Pile, Deck, Hand, ranks, and suits
test/                   Jest test suite, mirroring the source files
```

The package publishes `@bannon/cards` as ESM (`dist/cards.js`) and TypeScript
declarations (`dist/index.d.ts`).

The standalone browser ESM bundle is `dist/cards.js`.

Everything in the core: 
`Card`, `Pile`, `Deck`, `Hand`, `ranks`, `findRank`, `suits` and `findSuit`
is exported from the main `@bannon/cards` entry point.

Run `npm pack --dry-run` to inspect the exact publishable files.
