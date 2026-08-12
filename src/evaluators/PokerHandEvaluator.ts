import Card from '../Card.js';
import HandEvaluator from './HandEvaluator.js';

import type { HandComparison, HandInput } from './HandEvaluator.js';

/**
 * A hand score is made up of six base-15 digits:
 * [handType, tiebreaker1, ... tiebreaker5]
 *
 * handType is defined below in the HANDS object.
 *
 * The tie-breakers are the cards needed to compare hands of the same type,
 * in the order they should be compared. Any unused cards are set to 0.
 *
 * Examples:
 *      A full house, 8s full of 3s: [7, 8, 3, 0, 0, 0]
 *      Two pair, aces and 5s with a king kicker: [3, 14, 5, 13, 0, 0]
 *      High card, king, 8, 6, 4, 3: [1, 13, 8, 6, 4, 3]
 *
 * These digits are then converted to an integer. In the full house example above,
 * this is (7 × 15⁵) + (8 × 15⁴) + (3 × 15³) + (0 × 15²) + (0 × 15¹) + (0 × 15⁰).
 *
 * 15 is used as the base here because the highest card value is 14 and as cards move
 * further down the array, they can't beat a card to the "left" of them.
 */

const SCORE_BASE = 15;

interface HandRanking {
    value: number;
    description: string;
}

const HANDS = {
    HIGH_CARD: { value: 1, description: 'High Card' },
    ONE_PAIR: { value: 2, description: 'Pair' },
    TWO_PAIR: { value: 3, description: 'Two Pair' },
    THREE_OF_A_KIND: { value: 4, description: 'Three of a Kind' },
    STRAIGHT: { value: 5, description: 'Straight' },
    FLUSH: { value: 6, description: 'Flush' },
    FULL_HOUSE: { value: 7, description: 'Full House' },
    FOUR_OF_A_KIND: { value: 8, description: 'Four of a Kind' },
    STRAIGHT_FLUSH: { value: 9, description: 'Straight Flush' },
    ROYAL_FLUSH: { value: 10, description: 'Royal Flush' },
} satisfies Record<string, HandRanking>;

interface RankingResult {
    hand: HandRanking;
    kickerCards: Card[];
    madeCards: Card[];
    tiebreakers: number[];
}

export interface PokerHandResult {
    cards: Card[]; // The best five cards of the hand provided
    description: string;
    kickerCards: Card[];
    madeCards: Card[]; // This will only be two cards for a PAIR, all five for a FULL_HOUSE etc.
    score: number;
    tiebreakers: number[];

    valueOf(): number; // The same as "score" but allows us to use this class in numeric comparisons
}

type CardInput = Card | string;
type PokerHandInput = HandInput<CardInput>;

const encodeScore = (result: RankingResult): number =>
    [result.hand.value, ...result.tiebreakers, 0, 0, 0, 0, 0] // tiebreakers may have fewer than 5 values
        .slice(0, 6) // make sure we've definitely got 6 values
        .reduce(
            // Shift the existing score left by one base-15 digit, then append the next digit.
            (score, digit) => score * SCORE_BASE + digit,
            0,
        );

const isStraight = (values: number[]): number | null => {
    const unique = [...new Set(values)].sort((a, b) => a - b);

    // Can't have a straight with fewer than 5 cards
    if (unique.length !== 5) {
        return null;
    }

    const looksLikeStraight = unique.every((value, index) => index === 0 || value === unique[index - 1]! + 1);

    if (looksLikeStraight) {
        return unique[4]!;
    }

    // Ace has a value of 14, so an Ace to 5 straight won't "look" like a straight.
    return unique.join(',') === '2,3,4,5,14' ? 5 : null;
};

const pluckCardsByValue = (cards: Card[], value: number): Card[] => cards.filter(card => card.value === value);

const rankCards = (cards: Card[]): RankingResult => {
    const values = cards.map(card => card.value).sort((a, b) => b - a);
    const isFlush = cards.every(card => card.suit === cards[0]!.suit);
    const straightHighestCard = isStraight(values);

    if (isFlush && straightHighestCard !== null) {
        const hand = straightHighestCard === 14 ? HANDS.ROYAL_FLUSH : HANDS.STRAIGHT_FLUSH;
        return { hand, kickerCards: [], madeCards: sortCards(cards), tiebreakers: [straightHighestCard] };
    }

    // Get the total count of each rank in the hand.
    // Sort by count first so the n-of-a-kind are in order
    // then sort by value so multiple pairs are sorted by rank

    // We only need the first two groups. Because 5 cards can't have 3 pairs or 3 x 3-of-a-kind etc.
    // Groups will have { count: x, value: y } so we can easily check for how many of which rank we have
    const groups = Array.from(
        values.reduce((counts, value) => counts.set(value, (counts.get(value) ?? 0) + 1), new Map<number, number>()),
        ([value, count]) => ({ value, count }),
    ).sort((a, b) => b.count - a.count || b.value - a.value);

    const [first, second] = groups as [{ value: number; count: number }, { value: number; count: number }];

    if (first.count === 4) {
        return {
            hand: HANDS.FOUR_OF_A_KIND,
            kickerCards: pluckCardsByValue(cards, second.value),
            madeCards: pluckCardsByValue(cards, first.value),
            tiebreakers: groups.map(group => group.value),
        };
    }

    if (first.count === 3 && second.count === 2) {
        return {
            hand: HANDS.FULL_HOUSE,
            kickerCards: [],
            madeCards: sortCards(cards),
            tiebreakers: groups.map(group => group.value),
        };
    }

    if (isFlush) {
        return {
            hand: HANDS.FLUSH,
            kickerCards: [],
            madeCards: sortCards(cards),
            tiebreakers: values,
        };
    }

    if (straightHighestCard !== null) {
        return {
            hand: HANDS.STRAIGHT,
            kickerCards: [],
            madeCards: sortCards(cards),
            tiebreakers: [straightHighestCard],
        };
    }

    if (first.count === 3) {
        return {
            hand: HANDS.THREE_OF_A_KIND,
            kickerCards: sortCards(cards.filter(card => card.value !== first.value)),
            madeCards: pluckCardsByValue(cards, first.value),
            tiebreakers: groups.map(group => group.value),
        };
    }

    if (first.count === 2 && second.count === 2) {
        const pairValues = [first.value, second.value];
        return {
            hand: HANDS.TWO_PAIR,
            kickerCards: sortCards(cards.filter(card => !pairValues.includes(card.value))),
            madeCards: sortCards(cards.filter(card => pairValues.includes(card.value))),
            tiebreakers: groups.map(group => group.value),
        };
    }

    if (first.count === 2) {
        return {
            hand: HANDS.ONE_PAIR,
            kickerCards: sortCards(cards.filter(card => card.value !== first.value)),
            madeCards: pluckCardsByValue(cards, first.value),
            tiebreakers: groups.map(group => group.value),
        };
    }

    const [highCard, ...kickerCards] = sortCards(cards);

    return {
        hand: HANDS.HIGH_CARD,
        kickerCards,
        madeCards: [highCard!],
        tiebreakers: values,
    };
};

const sortCards = (cards: Card[]): Card[] => [...cards].sort((a, b) => b.value - a.value);

export default class PokerHandEvaluator extends HandEvaluator<CardInput, PokerHandResult> {
    static evaluate(hand: Iterable<CardInput>): PokerHandResult {
        return new PokerHandEvaluator().evaluate(hand);
    }

    static compare(first: PokerHandInput, second: PokerHandInput): HandComparison {
        return new PokerHandEvaluator().compare(first, second);
    }

    evaluate(hand: Iterable<CardInput>): PokerHandResult {
        const cards = [...hand].map(card => (typeof card === 'string' ? new Card(card) : card));

        if (cards.length < 5) {
            throw new Error(`At least 5 cards are required, received ${cards.length}`);
        }

        let bestHand: PokerHandResult | null = null;

        // Enumerate every unique five card combination of the cards array
        for (let a = 0; a < cards.length - 4; a++) {
            for (let b = a + 1; b < cards.length - 3; b++) {
                for (let c = b + 1; c < cards.length - 2; c++) {
                    for (let d = c + 1; d < cards.length - 1; d++) {
                        for (let e = d + 1; e < cards.length; e++) {
                            const candidate = [cards[a]!, cards[b]!, cards[c]!, cards[d]!, cards[e]!];
                            const result = rankCards(candidate);
                            const score = encodeScore(result);

                            // A larger score means either a stronger category or a
                            // stronger tie-breaker within the same category.
                            if (bestHand === null || score > bestHand.score) {
                                bestHand = {
                                    cards: candidate,
                                    description: result.hand.description,
                                    kickerCards: result.kickerCards,
                                    madeCards: result.madeCards,
                                    score,
                                    tiebreakers: result.tiebreakers,
                                    valueOf() {
                                        return this.score;
                                    },
                                };
                            }
                        }
                    }
                }
            }
        }

        return bestHand!;
    }
}
