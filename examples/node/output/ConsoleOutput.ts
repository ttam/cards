import chalk from 'chalk';
import { findSuit } from '../../../src';
import type { BlackjackHandResult, Card, Pile, PokerHandResult } from '../../../src';
import type OutputInterface from './OutputInterface';

const colorCard = (card: Card): string => {
    const { color } = findSuit(card.suit)!;
    return color === 'red' ? chalk.redBright(`${card}`) : chalk.whiteBright(`${card}`);
};

const formatMadeHand = (pokerHand: PokerHandResult): string => {
    const madeCards = renderCards(pokerHand.madeCards);
    const kickerCards = chalk.dim(renderCards(pokerHand.kickerCards));

    return [madeCards, kickerCards].filter(Boolean).join(' ');
};

const renderCards = (cardsOrHand: Card[] | Pile): string => {
    const cards = Array.isArray(cardsOrHand) ? cardsOrHand : cardsOrHand.cards;
    return cards.map(colorCard).join(' ');
};

export default class ConsoleOutput implements OutputInterface {
    blackjackHand(name: string, hand: Pile, result: BlackjackHandResult): void {
        const total = result.isBlackjack
            ? `${result.total} (Blackjack!)`
            : `${result.total}${result.isSoft ? ' (soft)' : ''}${result.isBust ? ' (bust)' : ''}`;

        console.log(`${name} holds (${renderCards(hand)}) -> Total: ${total}`);
    }

    board(hand: Pile): void {
        console.log(`Board: ${renderCards(hand)}`);
    }

    outcome(name: string, description: string): void {
        console.log(`${name} ${description}.`);
    }

    playerHand(name: string, hand: Pile, result: PokerHandResult): void {
        console.log(`${name} holds (${renderCards(hand)}) -> Best Hand: ${result.description} (${formatMadeHand(result)})`);
    }

    title(text: string): void {
        console.log(chalk.bold.yellow(text));
    }

    winners(names: string[], description: string): void {
        const label = names.length === 1 ? 'WINNER' : 'WINNERS';
        const outcome = names.length === 1 ? `${names[0]} wins the pot` : `${names.join(' and ')} split the pot`;

        console.log(chalk.bold.green(`${label}: ${outcome} with a ${description}!`));
    }
}
