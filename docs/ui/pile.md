# Card pile

`.cards-pile` displays cards in a stack.

This can be used for a draw pile, discard pile, or tableau column.

Adding an element with `data-count="..."` shows a badge with the number of cards in the pile.

<RunUiExample>
<!-- empty element automatically shows the outline //-->
<div class="cards-pile"></div>

<!-- use data-empty to force the empty style //-->
<div class="cards-pile" data-empty>
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>

<div class="cards-pile">
    <div class="cards-card"></div>
</div>

<div class="cards-pile">
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>

<!-- add an element with data-count to show a badge -->
<div class="cards-pile">
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
    <span data-count>52</span>
</div>
</RunUiExample>

## Tableau layout

Set `data-layout="tableau"` on `.cards-pile` to make a cascading column.

<RunUiExample>
<div class="cards-pile" data-layout="tableau">
    <div class="cards-card" data-suit="hearts" data-rank="king" data-face-down></div>
    <div class="cards-card" data-suit="clubs" data-rank="2" data-face-down></div>
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>

<div class="cards-pile" data-layout="tableau">
    <div class="cards-card" data-suit="hearts" data-rank="king"></div>
    <div class="cards-card" data-face-down></div>
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>

<div class="cards-pile" data-layout="tableau">
    <div class="cards-card" data-suit="hearts" data-rank="king"></div>
    <div class="cards-card"></div><!-- implicit face-down //-->
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>

<div class="cards-pile" data-layout="tableau">
    <div class="cards-card" data-suit="hearts" data-rank="king"></div>
    <div class="cards-card" data-suit="clubs" data-rank="2"></div>
    <div class="cards-card" data-suit="spades" data-rank="ace"></div>
</div>
</RunUiExample>
