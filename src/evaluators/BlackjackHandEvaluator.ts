import Card from '../Card.js';
import HandEvaluator from './HandEvaluator.js';

import type { HandComparison, HandInput } from './HandEvaluator.js';

export interface BlackjackHandResult {
    cards: Card[];
    isBlackjack: boolean;
    isBust: boolean;
    isSoft: boolean;
    score: number;
    total: number;
    valueOf(): number;
}

type CardInput = Card | string;
type BlackjackHandInput = HandInput<CardInput>;

const blackjackValue = (card: Card): number => (card.value === 14 ? 11 : Math.min(card.value, 10));

export default class BlackjackHandEvaluator extends HandEvaluator<CardInput, BlackjackHandResult> {
    static evaluate(hand: Iterable<CardInput>): BlackjackHandResult {
        return new BlackjackHandEvaluator().evaluate(hand);
    }

    static compare(first: BlackjackHandInput, second: BlackjackHandInput): HandComparison {
        return new BlackjackHandEvaluator().compare(first, second);
    }

    evaluate(hand: Iterable<CardInput>): BlackjackHandResult {
        const cards = [...hand].map(card => (typeof card === 'string' ? new Card(card) : card));

        const { aces, initialTotal } = cards.reduce(
            (result, card) => ({
                aces: result.aces + Number(card.value === 14),
                initialTotal: result.initialTotal + blackjackValue(card),
            }),
            { aces: 0, initialTotal: 0 },
        );

        // Every time an ace is counted as 1 instead of 11, it reduces the total by 10.
        // We divide the points over 21 by 10, round it up then cap it at the number of aces we've got
        const acesToLower = Math.min(aces, Math.ceil(Math.max(initialTotal - 21, 0) / 10));
        const total = initialTotal - acesToLower * 10;

        const isBust = total > 21;

        // A hand is "soft" if any ace is counted as 11.
        const isSoft = aces > acesToLower;

        const isBlackjack = !isBust && cards.length === 2 && total === 21;

        // Busts are negative so they can't beat a valid hand.
        // Natural blackjack is 22 so it's better than any other 21
        const score = isBust ? -total : isBlackjack ? 22 : total;

        return {
            cards,
            isBlackjack,
            isBust,
            isSoft,
            score,
            total,
            valueOf() {
                return this.score;
            },
        };
    }
}
