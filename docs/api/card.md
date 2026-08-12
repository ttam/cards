# Card

A `Card` is a single playing card.
It's the main part of this library, and everything else ([`Pile`](./pile), [`Deck`](./deck), [`Hand`](./hand)) is just a collection of `Card`s.

## `new Card(code)`

Creates a card from a rank and suit.

Input is case-insensitive and whitespace is ignored, so `'ah'`, `'AH'`, and `'A H'` all produce the same card.

```js
const card = new Card(' ah ');

card.label; // 'A'
card.suit; // 'hearts'
card.value; // 14
```

Ranks are `2`-`10`, `J`, `Q`, `K`, or `A`. Numeric values `11`-`14` are
also accepted for the face cards and Ace.
Suits are `S`, `H`, `D`, `C`, or `♠`, `❤`, `♦`, `♣`.

Anything else throws an error.

```js
try {
    new Card('ace of hearts');
} catch (error) {
    error.message; // 'Invalid card: ace of hearts'
}
```

## `equals(other)`

Compares two cards by rank and suit.

Two separate `Card` instances for `'AH'` for example, are
considered equal even though they aren't the same object.

```js
(new Card('AH')).equals(new Card('AH')); // true
(new Card('AH')).equals(new Card('14❤')); // true
(new Card('AH')).equals(new Card('AS')); // false
```

## `toString()`

Returns the rank and suit symbol.

```js
const card = new Card('10D');

card.toString(); // '10♦'
`${card}`; // '10♦'
```
