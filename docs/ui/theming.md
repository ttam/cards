# Theming

The following css variables are available:

| Custom property             | Default                 | Controls                  |
|-----------------------------|-------------------------|---------------------------|
| `--cards-card-back`         | `#7f1d1d`               | Back base color           |
| `--cards-card-back-accent`  | `#b91c1c`               | Back stripe color         |
| `--cards-card-border`       | `#b9b4aa`               | Empty pile border color   |
| `--cards-card-radius`       | `0.28em`                | Corner radius             |
| `--cards-card-width`        | `6.75em`                | Card width                |
| `--cards-hand-fan-angle`    | `8deg`                  | Fan angle for hand        |
| `--cards-hand-fan-radius`   | `12em`                  | Radius of the fan's curve |
| `--cards-hand-gap`          | `0.5em`                 | Gap between cards         |
| `--cards-pile-badge-bg`     | `#1a1a1a`               | Pile badge background     |
| `--cards-pile-badge-color`  | `#ffffff`               | Pile badge color          |
| `--cards-pile-badge-font`   | `system-ui, sans-serif` | Pile badge font          |


<RunUiExample>
    <div class="cards-card"></div>
    <div class="cards-card" style="--cards-card-back: #000000;"></div>
    <div class="cards-card" style="--cards-card-back-accent: #000000;"></div>
    <div class="cards-pile" data-empty></div>
    <div class="cards-pile" style="--cards-card-border: #7f1d1d;"></div>
    <div class="cards-card" style="--cards-card-radius: 20px"></div>
    <div class="cards-card" style="--cards-card-width: 4em"></div>
</RunUiExample>

<RunUiExample>
    <div class="cards-hand" data-layout="fan" style="--cards-hand-fan-angle: 8deg; --cards-hand-fan-radius: 12em;">
        <div class="cards-card" data-suit="spades" data-rank="ace"></div>
        <div class="cards-card" data-suit="hearts" data-rank="king"></div>
        <div class="cards-card" data-suit="clubs" data-rank="7"></div>
    </div>
</RunUiExample>

<RunUiExample>
    <div class="cards-hand" style="--cards-hand-gap: 0.5em;">
        <div class="cards-card" data-suit="spades" data-rank="ace"></div>
        <div class="cards-card" data-suit="hearts" data-rank="king"></div>
        <div class="cards-card" data-suit="clubs" data-rank="7"></div>
    </div>
</RunUiExample>

<RunUiExample>
    <div class="cards-pile" style="--cards-pile-badge-bg: #1a1a1a; --cards-pile-badge-color: #ffffff; --cards-pile-badge-font: system-ui, sans-serif">
        <span data-count aria-hidden="true">52</span>
    </div>
</RunUiExample>