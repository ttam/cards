# Playing card

Use `.cards-card` with `data-suit` and `data-rank`. Omit the data attributes
or explicitly set `data-face-down` to show the back of a card.

<RunUiExample>
    <div class="cards-card" data-suit="hearts" data-rank="king"></div>
    <div class="cards-card" data-face-down></div>
</RunUiExample>

`data-suit` accepts `clubs`, `diamonds`, `hearts` and `spades`.\
`data-rank` accepts `2`..`10`, `jack`, `queen`, `king` and `ace`.

For jokers use the data-joker attribute and provide a color, either `black` or `red`.

<RunUiExample>
    <div class="cards-card" data-joker="black"></div>
    <div class="cards-card" data-joker="red"></div>
</RunUiExample>

The artwork is based on [Public domain complete playing card deck.svg](https://commons.wikimedia.org/wiki/File:Public_domain_complete_playing_card_deck.svg) and released under CC0.
