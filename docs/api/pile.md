# Pile

A `Pile` is just an ordered stack of cards.
[`Deck`](./deck) and a [`Hand`](./hand) are extensions of a Pile.

You probably won't need to directly create a `Pile` very often

## `new Pile()`

Creates a pile. You can optionally supply an array of cards to initialise it with.
Cards are stored top to bottom in the public `cards` array, so `cards[0]` is always the top card.

The array is mutable by design, allowing games to inspect or rearrange it directly.

```js
const pile = new Pile();
pile.cards; // []
```

```js
const pile = new Pile([new Card('AH'), new Card('2H')]);
pile.cards.map(card => card.toString()); // ['A❤', '2❤']
```

```js
const pile = new Pile(['AH', '2H']);
pile.cards.map(card => card.toString()); // ['A❤', '2❤']
```

## `addCard(card)`
Adds one [`Card`](./card) to the bottom of the pile and returns the pile.

```js
const pile = new Pile();

pile.addCard(new Card('AH'));
pile.addCard('2H');

pile.cards.map(card => card.toString()); // ['A❤', '2❤']
```

## `burn(count = 1)`
Discards cards from the top of the pile and returns the pile.

It's really just `removeCard()` called `count` times with the
result thrown away.

Use `removeCard()` when you need to know the card that was removed, and
`burn()` when you want to discard it "face down".

```js
const pile = new Pile(['AH', '2H', '3H', '4H']);

pile.burn();  // discards A❤
pile.burn(2); // discards 2❤ and 3❤

// pile.burn().burn(2) would also work, since burn() returns the pile

pile.cards[0].toString(); // '4❤'
```

`burn()` checks it has enough cards before removing any of them, so burning more cards than are left throws
`Error: Not enough cards to burn` and leaves the pile untouched rather than
failing halfway through.

The count must be a non-negative integer.

```js
const pile = new Pile(['AH', '2H']);

try {
    pile.burn(3);
} catch (error) {
    error.message; // 'Not enough cards to burn'
}

pile.size; // 2, unchanged
```

## `cut(atOrSeedOrRandom = null)`
Cuts the pile and returns it.

You can optionally pass a numeric position, a string seed, or a custom random
function.

If a number is passed, the deck is cut at that position,
moving the cards above it to the bottom. The position must be an integer between
`0` and `size`, inclusive. Providing `0` or `size` will leave the deck unchanged.

If you pass a string, it is used as a seed to choose a random cut position.
Two piles cut with the same seed and the same cards will always end up in the same order.

```js
const first = new Pile(['AH', '2H', '3H', '4H']);
first.cut();
first.cards.map(String); // different order each time
```

```js
const pile = new Pile(['AH', '2H', '3H', '4H']);
pile.cut(2);
pile.cards.map(String); // ['3❤', '4❤', 'A❤', '2❤']
```

```js
const first = new Pile(['AH', '2H', '3H', '4H']);
const second = new Pile(['AH', '2H', '3H', '4H']);

first.cut('example');
second.cut('example');

first.cards.map(String);  // the same order as second
second.cards.map(String); // the same order as first
```

```js
const randomFunction = () => 0.5;

const first = new Pile(['AH', '2H', '3H', '4H']);
const second = new Pile(['AH', '2H', '3H', '4H']);

first.cut(randomFunction);
second.cut(randomFunction);

first.cards.map(card => card.toString()); // the same order as second
second.cards.map(card => card.toString()); // the same order as first
```

## `dealTo(targets, countPerTarget = 1, options = {})`
Removes cards from the pile and adds `countPerTarget` cards to each of the `targets` and returns the pile.

By default, cards are dealt in a round-robin fashion, but you can pass `{ alternate: false }` to deal a block of cards to each target instead.
The options object uses the exported `DealOptions` type:

```ts
interface DealOptions {
    alternate?: boolean;
}
```

`countPerTarget` must be a non-negative integer.

```js
const pile = new Pile(['AH', '2H', '3H', '4H']);
const players = [new Pile(), new Pile()];
pile.dealTo(players, 2);
players[0].cards.map(card => card.toString()); // ['A❤', '3❤']
players[1].cards.map(card => card.toString()); // ['2❤', '4❤']
```

```js
const pile = new Pile(['AH', '2H', '3H', '4H']);
const players = [new Pile(), new Pile()];
pile.dealTo(players, 2, { alternate: false });
players[0].cards.map(card => card.toString()); // ['A❤', '2❤']
players[1].cards.map(card => card.toString()); // ['3❤', '4❤']
```

Dealing from an empty pile, or trying to deal more cards than are available
throws `Error: [class] out of cards`, depending on which class it's called on
and leaves the pile untouched.

```js
try {
    new Pile().dealTo([new Pile()], 1);
} catch (error) {
    error.message; // 'Pile out of cards'
}

try {
    new Hand().dealTo([new Pile()], 1);
} catch (error) {
    error.message; // 'Hand out of cards'
}
```

## `has(cardOrPredicate)`

Returns `true` if the pile contains a matching card or any card that satisfies
a predicate. Card instances and codes are compared by rank and suit.

```js
const pile = new Pile(['AH', '2D']);

pile.has('AH'); // true
pile.has(new Card('2D')); // true
pile.has(card => card.suit === 'spades'); // false
```

## `isEmpty()`
Returns `true` when the pile has no cards left. Handy for checking a deck or
hand before dealing or drawing from it.

```js
new Pile().isEmpty(); // true
new Pile(['AH', '2H']).isEmpty(); // false
```

## `removeCard(indexOrCard = 0)`
Discards a card from the top of the pile and returns it.

By default it removes the top card (index `0`), but you can pass a different index or card identifier to remove a specific card instead.
Numeric indexes must be non-negative integers.

```js
const pile = new Pile(['AH', '2H', '3H']);
const top = pile.removeCard();
top.toString(); // 'A❤'
pile.size; // 2

const bottom = pile.removeCard(1);
bottom.toString(); // '3❤'
pile.size; // 1
```

```js
const pile = new Pile(['AH', '2H', '3H']);
pile.removeCard('2H');

pile.cards.map(card => card.toString()); // ['A❤', '3❤']
```

Removing from an empty pile, or from an index that doesn't exist
throws `Error: No card to remove`.

```js
try {
    new Pile().removeCard(); 
} catch (error) {
    error.message; // 'No card to remove'
}
```

## `shuffle(seedOrRandom = null)`
Shuffles the pile and returns it.

You can optionally pass a string or function seed when you need the result to be repeatable.

Two piles shuffled with the same seed and the same cards will always end up in the same order.

:::code-group
```js [string]
const first = new Pile(['AH', '2H', '3H', '4H']);
const second = new Pile(['AH', '2H', '3H', '4H']);

first.shuffle('example');
second.shuffle('example');

first.cards.map(card => card.toString()); // the same order as second
second.cards.map(card => card.toString()); // the same order as first
```

```js [function]
const randomFunction = () => 0.5;

const first = new Pile(['AH', '2H', '3H', '4H']);
const second = new Pile(['AH', '2H', '3H', '4H']);

first.shuffle(randomFunction);
second.shuffle(randomFunction);

first.cards.map(card => card.toString()); // the same order as second
second.cards.map(card => card.toString()); // the same order as first
```
:::

With no seed passed, `shuffle()` uses `Math.random()`, so the order is different
every time.

```js
pile.shuffle();
```

## `size`

The number of cards currently in the pile. It's a getter, so read it like a
property rather than calling it.

```js
const pile = new Pile(['AH', '2H']);

pile.size; // 2
```
