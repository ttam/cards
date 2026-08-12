# PokerHandEvaluator

The `PokerHandEvaluator` finds the best five-card poker hand in a collection of
cards. It can also compare two hands.

Its methods are static so there's no need to instantiate the class.

Both methods accept an iterable of [`Card`](./card) instances, card codes, or a mixture of both.

## `compare(firstHand, secondHand)`

Compares two poker hands, including any kickers needed to break a tie.

Returns `1` if the first hand wins, `0` for a draw, and `-1` if the second hand wins.

```js
const straight = ['2H', '3D', '4S', '5C', '6H'];
const pair = ['AH', 'AD', '9S', '5C', '2H'];

PokerHandEvaluator.compare(straight, pair); // 1
PokerHandEvaluator.compare(pair, straight); // -1
```

## `evaluate(allCards)`

Evaluates five or more cards and returns the best five-card hand.

```js
const result = PokerHandEvaluator.evaluate(['AH', 'KH', 'QH', 'JH', '10H', '2C', '3D']);

result.cards.map(card => card.toString()); // ['A❤', 'K❤', 'Q❤', 'J❤', '10❤']
result.description; // 'Royal Flush'
result.kickerCards.map(card => card.toString()); // []
result.madeCards.map(card => card.toString()); // ['A❤', 'K❤', 'Q❤', 'J❤', '10❤']
result.score; // 8302500
result.tiebreakers; // [14]
result.valueOf(); // 8302500
Number(result); // 8302500
```

The evaluator recognises high card, pair, two pair, three of a kind, straight,
flush, full house, four of a kind, straight flush, and royal flush. It also
recognises an Ace-low straight (`A-2-3-4-5`).

The result separates the cards that make the hand from its kickers.

```js
const result = PokerHandEvaluator.evaluate(['3H', 'AS', '9D', 'AC', '5H']);

result.cards.map(card => card.toString()); // ['3❤', 'A♠', '9♦', 'A♣', '5❤']
result.description; // 'Pair'
result.kickerCards.map(card => card.toString()); // ['9♦', '5❤', '3❤']
result.madeCards.map(card => card.toString()); // ['A♠', 'A♣']
result.score; // 2259045
result.tiebreakers; // [14, 9, 5, 3]
result.valueOf(); // 2259045
Number(result); // 2259045
```

The result's numeric `score` accounts for the hand type and its tie-breakers. A
stronger hand always has a higher score. `valueOf()` returns the same score, so
the result can also be converted to a number with `Number(result)`.

Passing fewer than five cards throws an error.

```js
try {
    PokerHandEvaluator.evaluate(['AH', 'KD', 'QS', 'JC']);
} catch (error) {
    error.message; // 'At least 5 cards are required, received 4'
}
```

## Score calculation

A score can be thought of as six base-15 digits:

```text
[hand type, first tie-breaker, second tie-breaker, ... fifth tie-breaker]
```

The first digit represents the type of hand. High card is `1`, pair is `2`,
and so on up to royal flush at `10`. The remaining digits are the card ranks
needed to compare two hands of the same type, in the order they should be
compared. Any positions the hand doesn't need are filled with `0`.

For example:

```text
Full house, eights full of threes       [7, 8, 3, 0, 0, 0]
Two pair, Aces and fives, King kicker   [3, 14, 5, 13, 0, 0]
High card, King, eight, six, four, three [1, 13, 8, 6, 4, 3]
```

Each digit is then converted from its base-15 position into a single integer.
The full house above becomes:

```text
(7 × 15⁵) + (8 × 15⁴) + (3 × 15³) + (0 × 15²) + (0 × 15¹) + (0 × 15⁰)
= 5,730,750
```

Base 15 is used because `14` is the highest possible card value. This gives
every digit enough room for a card rank from `2` to `14`, plus `0` for an
unused position. It also means that increasing a digit by one is always worth
more than every digit to its right combined.

That keeps the normal poker comparison order intact. The hand type is checked
first, then the first tie-breaker, then the second, and so on. Once those
values have been packed into the score, comparing two hands is just comparing
two integers.
