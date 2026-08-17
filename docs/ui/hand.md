# Card hand

`.cards-hand` displays cards in a row:

<RunUiExample>
    <div class="cards-hand">
        <div class="cards-card" data-suit="spades" data-rank="ace"></div>
        <div class="cards-card" data-suit="hearts" data-rank="king"></div>
        <div class="cards-card" data-suit="clubs" data-rank="7"></div>
    </div>
</RunUiExample>

Set `data-layout="fan"` for a pure CSS fan:

<RunUiExample>
    <div class="cards-hand" data-layout="fan">
        <div class="cards-card" data-suit="spades" data-rank="ace"></div>
        <div class="cards-card" data-suit="hearts" data-rank="king"></div>
        <div class="cards-card" data-suit="clubs" data-rank="7"></div>
    </div>
</RunUiExample>

The fan uses `sibling-index()` and `sibling-count()` to self-center as cards
are added or removed.

There is no limit to the number of cards and no JavaScript needed.\
This requires Chrome 138+, Firefox 154+, or Safari 26.2+.
