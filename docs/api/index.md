# API reference

`cards` is a small, dependency-free toolkit for representing standard playing
cards. The API provides a [`Card`](./card), ordered piles of cards, a standard [`Deck`](./deck),
and a player [`Hand`](./hand), along with [`blackjack`](./blackjack-hand-evaluator) and [`poker`](./poker-hand-evaluator) hand evaluators.

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

const players = [new Hand(), new Hand()];
new Deck().shuffle().dealTo(players, 5).size; // 42
```

## Ranks and suits

The [`ranks`, `suits`, `findRank()`, and `findSuit()` exports](./ranks-and-suits)
provide the identifiers and metadata used by `Card`. Their `Rank` and `Suit`
types are also exported.

## Hand evaluators

| Evaluator | Purpose |
| --- | --- |
| [`BlackjackHandEvaluator`](./blackjack-hand-evaluator) | Scores blackjack hands and compares their outcomes. |
| [`PokerHandEvaluator`](./poker-hand-evaluator) | Finds and compares the best five-card poker hands. |

Both evaluators expose static `evaluate()` and `compare()` methods. An evaluated
result has a numeric `score` and `valueOf()` method, so `Number(result)` returns
its score. `compare()` returns `-1`, `0`, or `1`.

The package exports `BlackjackHandResult` and `PokerHandResult` for the evaluator
outputs, plus these shared TypeScript types:

```ts
interface HandEvaluation {
    score: number;
}

type HandComparison = -1 | 0 | 1;
type HandInput<TCard> = Iterable<TCard>;
```
