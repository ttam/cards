# Public-domain playing-card artwork

`deck.svg` is the single runtime asset used by `cards.css`. It is based
on artwork hosted on Wikimedia Commons:

- [Public domain complete playing card deck.svg](https://commons.wikimedia.org/wiki/File:Public_domain_complete_playing_card_deck.svg), by AustinGabriel64.

The source artwork is released under the [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).

The file contains all 52 standard faces plus black and red Jokers as SVG symbols.
Standard cards use `card-{rank}-{suit}`, with lowercase ranks and full suit names,
for example: `card-a-spades`, `card-10-hearts` and `card-q-diamonds`.

The Jokers are `card-joker-black` and `card-joker-red`.

The visible sprite is a 13-column by 5-row grid. Every cell is 750 × 1050:

1. Clubs: `2` through `10`, Jack, Queen, King, Ace
2. Diamonds: `2` through `10`, Jack, Queen, King, Ace
3. Hearts: `2` through `10`, Jack, Queen, King, Ace
4. Spades: `2` through `10`, Jack, Queen, King, Ace
5. Red Joker, black Joker, then eleven empty cells
