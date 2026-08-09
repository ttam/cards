# API reference

`cards` is a small, dependency-free toolkit for representing standard playing
cards. The API provides a `Card`, ordered piles of cards, a standard `Deck`,
and a player `Hand`.

## Core classes

| Class | Purpose |
| --- | --- |
| [`Card`](./card) | Represents one rank and suit. |
| [`Pile`](./pile) | Stores cards in order and provides shared card operations. |
| [`Deck`](./deck) | Creates a standard 52-card deck. |
| [`Hand`](./hand) | Represents a player's cards and formats them as a string. |

`Deck` and `Hand` extend `Pile`. A typical flow is to create a deck, shuffle it,
and deal cards into one or more hands:

```ts

import { Deck, Hand } from '@bannon/cards';
const deck = new Deck().shuffle();
const players = [new Hand(), new Hand()];

deck.dealTo(players, 5);
```
