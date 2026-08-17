import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const css = readFileSync(resolve('src/ui/cards.css'), 'utf8');
const sprite = readFileSync(resolve('src/ui/assets/deck.svg'), 'utf8');

describe('plain HTML card UI', () => {
    test('maps every rank and suit data value onto the 13 by 5 sprite', () => {
        const ranks = [
            ['2', '0%'],
            ['3', '8.333333%'],
            ['4', '16.666667%'],
            ['5', '25%'],
            ['6', '33.333333%'],
            ['7', '41.666667%'],
            ['8', '50%'],
            ['9', '58.333333%'],
            ['10', '66.666667%'],
            ['jack', '75%'],
            ['queen', '83.333333%'],
            ['king', '91.666667%'],
            ['ace', '100%'],
        ];
        const suits = [
            ['clubs', '0%'],
            ['diamonds', '25%'],
            ['hearts', '50%'],
            ['spades', '75%'],
        ];

        for (const [rank, position] of ranks) {
            expect(css).toMatch(new RegExp(`&\\[data-rank='${rank}'\\]\\s*\\{\\s*--cards-card-x:\\s*${position}`));
        }

        for (const [suit, position] of suits) {
            expect(css).toMatch(new RegExp(`&\\[data-suit='${suit}'\\]\\s*\\{\\s*--cards-card-y:\\s*${position}`));
        }

        expect(css).toContain("&[data-joker='red'] {");
        expect(css).toContain("&[data-joker='black'] {");
        expect(css).toContain("background-image: url('./assets/deck.svg')");
        expect(css).toContain('background-size: 1300% 500%');
        expect(css).toContain("&:is([data-joker='black'], [data-joker='red'])");
    });

    test('keeps the existing card back and plain-CSS layouts', () => {
        expect(css).toContain('repeating-linear-gradient(');
        expect(css).toContain('&[data-face-down]');
        expect(css).toContain('&::before');
        expect(css).toContain('& > [data-count]');
        expect(css).toContain("&[data-layout='fan']");
        expect(css).toContain(".cards-pile[data-layout='tableau']");
        expect(css).toContain('--cards-hand-offset: calc(sibling-index() - (sibling-count() + 1) / 2);');
        expect(css).not.toContain('--cards-hand-i');
        expect(css).not.toContain('--cards-hand-j');
        expect(css).toContain(
            '&:is([data-rank][data-suit], [data-joker]):not([data-face-down])\n            + .cards-card:is([data-rank][data-suit], [data-joker]):not([data-face-down])',
        );
        expect(css).toContain('transition: transform var(--cards-card-flip-duration) ease-in-out');
        expect(css).toContain('transform: rotateY(0deg)');
        expect(css).toContain('transform: rotateY(180deg)');
        expect(css).toContain('backface-visibility: hidden');
        expect(css).toContain('transform-style: preserve-3d');
        expect(css).not.toContain('@keyframes cards-card-flip');
        expect(css).toContain('aspect-ratio: 5 / 7');
    });

    test('the sprite matches the CSS grid and requested ordering', () => {
        expect(sprite).toContain('viewBox="0 0 9750 5250"');
        expect(sprite).toContain('<use href="#card-2-clubs" xlink:href="#card-2-clubs" x="0" y="0"');
        expect(sprite).toContain('<use href="#card-a-spades" xlink:href="#card-a-spades" x="9000" y="3150"');
        expect(sprite).toContain('<use href="#card-joker-red" xlink:href="#card-joker-red" x="0" y="4200"');
        expect(sprite).toContain('<use href="#card-joker-black" xlink:href="#card-joker-black" x="750" y="4200"');
    });
});
