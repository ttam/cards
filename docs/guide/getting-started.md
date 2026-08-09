# Getting started

`cards` is a small set of TypeScript classes for building card games.

It doesn't know anything about rules, turns or players, it just handles the cards themselves.

The package publishes ESM browser bundles and TypeScript declarations, so
everything below works whether you're writing TypeScript or plain JavaScript.

```ts
const players = [new Hand(), new Hand()];
const deck = new Deck().shuffle().dealTo(players, 5);

`${players[0]} vs. ${players[1]}`; // 'Q♦ 8♠ A♠ 6♣ 3♣ vs. 7❤ 9♠ 4♠ 4♦ K♦'
deck.size; // 42
```
