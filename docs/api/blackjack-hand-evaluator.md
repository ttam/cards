# BlackjackHandEvaluator

The `BlackjackHandEvaluator` calculates the value of a blackjack hand.
It handles Aces, blackjacks, and busts and can compare two hands.

Its methods are static so there's no need to instantiate the class.

Both methods accept an iterable of [`Card`](./card) instances, card codes, or a mixture of both.

## `compare(firstHand, secondHand)`

Compares two hands.

Returns `1` if the first hand wins, `0` for a draw, and `-1` if the second hand wins.

```js
const player = ['AH', '9D'];
const dealer = ['10H', '9S'];

BlackjackHandEvaluator.compare(player, dealer); // 1
BlackjackHandEvaluator.compare(dealer, player); // -1
```

## `evaluate(allCards)`

Evaluates a collection of cards and returns its score.

The value of a hand is the sum of its cards, with Aces counting
as `11` unless that would cause the hand to bust. A blackjack counts
as `22` so it beats any other 21, and a bust hand is worth the negative
value of its total.

If a hand value is greater than 21 but contains Aces, the evaluator will
reduce the value of Aces from `11` to `1` until the hand is no longer bust
or all Aces are used.

A hand is considered _soft_ if at least one Ace is counted as `11`.

```js
const result = BlackjackHandEvaluator.evaluate(['AH', '10D']);

result.cards.map(card => card.toString()); // ['A❤', '10♦']
result.isBlackjack; // true
result.isBust; // false
result.isSoft; // true
result.score; // 22
result.total; // 21

Number(result); // 22
```

```js
BlackjackHandEvaluator.evaluate(['AH', 'QD']).isBlackjack; // true
BlackjackHandEvaluator.evaluate(['AH', '5D', '5S']).isBlackjack; // false
```
