import type { BlackjackHandResult, Hand, PokerHandResult } from '../../../src';

export default interface OutputInterface {
    blackjackHand(name: string, hand: Hand, result: BlackjackHandResult): void;
    board(hand: Hand): void;
    playerHand(name: string, hand: Hand, result: PokerHandResult): void;
    title(text: string): void;
    outcome(name: string, description: string): void;
    winners(names: string[], description: string): void;
}
