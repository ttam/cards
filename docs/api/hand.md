# Hand

A `Hand` is the cards that a player is holding. It extends [`Pile`](./pile).

## `toString()`

Returns every card in the hand, in order, separated by spaces.

```js
const hand = new Hand(['AH', '2D', '3C', '4S']);
hand.toString(); // 'A❤ 2♦ 3♣ 4♠'
```
