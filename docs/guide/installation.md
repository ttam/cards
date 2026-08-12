# Installation

`cards.js` is published as the ESM package `@bannon/cards`.

It has no runtime dependencies and includes TypeScript declarations.

## Install from npm

Use the package manager for your project:

::: code-group

```sh [npm]
npm install @bannon/cards
```

```sh [pnpm]
pnpm add @bannon/cards
```

```sh [yarn]
yarn add @bannon/cards
```

```sh [bun]
bun add @bannon/cards
```

:::

The package requires Node.js 22 or newer when it is used in Node. It also works
in browser applications that support ESM, either through a bundler or directly
from a CDN.

## Import the package

Import the named exports you need from `@bannon/cards`:

```ts
import { Card, Deck, Hand } from '@bannon/cards';

const deck = new Deck().shuffle();
const hand = new Hand([new Card('AH'), new Card('10D')]);
```

The package's explicit `cards.js` subpath is also available when a project
needs to name the browser bundle directly:

```js
import { Deck } from '@bannon/cards/cards.js';
```

## Use a CDN

The standalone browser bundle is an ES module.

::: code-group

```html [unpkg]
<script type="module">
    import { Deck } from 'https://unpkg.com/@bannon/cards@latest/dist/cards.js';

    const deck = new Deck().shuffle();
    console.log(deck.size); // 52
</script>
```

```html [jsDelivr]
<script type="module">
    import { Deck } from 'https://cdn.jsdelivr.net/npm/@bannon/cards@latest/dist/cards.js';

    const deck = new Deck().shuffle();
    console.log(deck.size); // 52
</script>
```
:::

The two CDNs serve the same `dist/cards.js` ESM bundle.

## Use a local checkout

To work from the source repository instead of the npm registry:

```sh
git clone https://github.com/ttam/cards.git
cd cards
npm install
npm run build
```

The build writes the browser bundle to `dist/cards.js` and the declarations to
`dist/index.d.ts`. A local web page can import the bundle with a relative module
URL:

```html
<script type="module">
    import { Deck } from './dist/cards.js';

    const deck = new Deck();
</script>
```

If you need to test a local build as an installed dependency, create a tarball
after building it and install that file in another project:

```sh
npm run build
npm pack
cd ../my-card-game
npm install ../cards/bannon-cards-{{PACKAGE_VERSION}}.tgz
```

After that, use the normal package import:

```ts
import { Deck } from '@bannon/cards';
```
