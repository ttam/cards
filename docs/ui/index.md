# UI Reference

The browser UI is plain HTML and CSS. It has three public classes:
`.cards-card`, `.cards-pile`, and `.cards-hand`.


| Class                   | Purpose                                     |
|-------------------------|---------------------------------------------|
| [`.cards-card`](./card) | A face-up card, Joker, or striped card back |
| [`.cards-pile`](./pile) | A stack, discard pile, or tableau column    |
| [`.cards-hand`](./hand) | A row of cards, optionally fanned           |

Presentation modifications use data attributes: `data-layout="fan"` on a hand and
`data-layout="tableau"` on a pile.

The card faces come from an SVG sprite sheet containing all 52 standard cards and
both Jokers.

The card back is CSS-only. The CSS provides presentation only: the actual
`Card`, `Deck`, `Hand`, and `Pile` objects remain independent of the DOM.
