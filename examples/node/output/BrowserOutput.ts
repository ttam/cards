import { findSuit } from '../../../src/';
import type { BlackjackHandResult, Card, Hand, PokerHandResult } from '../../../src/';

import type OutputInterface from './OutputInterface';

const escapeHtml = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatMadeHand = (pokerHand: PokerHandResult): string => {
    const madeCards = renderCards(pokerHand.madeCards);
    const renderedKickers = renderCards(pokerHand.kickerCards);
    const kickerCards = renderedKickers ? `<span style="opacity:0.6">${renderedKickers}</span>` : '';

    return [madeCards, kickerCards].filter(Boolean).join(' ');
};

const outputCard = (card: Card): string => {
    const color = findSuit(card.suit)!.color === 'red' ? '#ff6b5c' : '#f5f0e6';

    return `<span style="color:${color}">${escapeHtml(card.toString())}</span>`;
};

const renderCards = (cards: Card[]): string => cards.map(outputCard).join(' ');

export default class BrowserOutput implements OutputInterface {
    readonly lines: string[] = [];

    blackjackHand(name: string, hand: Hand, result: BlackjackHandResult): void {
        const total = result.isBlackjack
            ? `${result.total} (Blackjack!)`
            : `${result.total}${result.isSoft ? ' (soft)' : ''}${result.isBust ? ' (bust)' : ''}`;

        this.lines.push(`${name} holds (${renderCards(hand.cards)}) &rarr; Total: ${total}`);
    }

    board(hand: Hand): void {
        this.lines.push(`Board: ${renderCards(hand.cards)}`);
    }

    outcome(name: string, description: string): void {
        this.lines.push(`${name} ${description}.`);
    }

    playerHand(name: string, hand: Hand, result: PokerHandResult): void {
        this.lines.push(
            `${name} holds (${renderCards(hand.cards)}) &rarr; Best Hand: ${result.description} (${formatMadeHand(result)})`,
        );
    }

    title(text: string): void {
        this.lines.push(`<strong>${text}</strong>`);
    }

    winners(names: string[], description: string): void {
        const label = names.length === 1 ? 'WINNER' : 'WINNERS';
        const outcome = names.length === 1 ? `${names[0]} wins the pot` : `${names.join(' and ')} split the pot`;

        this.lines.push(`<span style="color: #bcdf8a;"><strong>${label}: ${outcome} with a ${description}!</strong></span>`);
    }
}
