# Deck

A `Deck` is a standard 52-card deck, ready to shuffle and deal. It extends [`Pile`](./pile).


## `new Deck()`

Creates a standard 52-card deck. Cards are ordered by suit — hearts,
diamonds, clubs, then spades — and from `2` through `A` within each suit.

```js
const deck = new Deck();

deck.size; // 52, same thing via the inherited getter
deck.cards[0].toString(); // '2❤'
deck.cards[51].toString(); // 'A♠'
```
