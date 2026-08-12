# Ranks and suits

Ranks and suits are the data used to create a [`Card`](./card). They are exported as arrays,
with lookup helpers and `Rank` and `Suit` types, for building custom decks.

You can import everything from the package entry point:

```ts
import { findRank, findSuit, ranks, suits, type Rank, type Suit } from '@bannon/cards';
```

## Ranks

`ranks` is a `Rank[]` ordered from `2` to `A`. Each rank has a `label` and
numeric `value`.

```ts
ranks[0]; // { value: 2, label: '2' }
ranks[12]; // { value: 14, label: 'A' }
```

### `findRank(identifier: number | string): Rank | undefined`

Finds a rank by numeric value or case-insensitive label. Returns `undefined`
when there is no match.

```ts
findRank(14); // { value: 14, label: 'A' }
findRank('q'); // { value: 12, label: 'Q' }
findRank('1'); // undefined
```

## Suits

`suits` is a `Suit[]` containing hearts, diamonds, clubs, and spades, in that
order. Each suit has a `name`, `code`, `symbol`, and `color`.

```ts
suits[0];
// { name: 'hearts', code: 'H', symbol: '❤', color: 'red' }
```

### `findSuit(identifier: string): Suit | undefined`

Finds a suit by name, code, or symbol. Names and codes are case-insensitive;
returns `undefined` when there is no match.

```ts
findSuit('clubs'); // { name: 'clubs', code: 'C', symbol: '♣', color: 'black' }
findSuit('s'); // { name: 'spades', code: 'S', symbol: '♠', color: 'black' }
findSuit('♦'); // { name: 'diamonds', code: 'D', symbol: '♦', color: 'red' }
findSuit('X'); // undefined
```
