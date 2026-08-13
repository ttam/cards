import { BlackjackHandEvaluator, Deck, Hand } from '../../src';
import type OutputInterface from './output/OutputInterface.js';

const NUMBER_OF_PLAYERS = 3;
const STAND_THRESHOLD = 17;

export default function example(output: OutputInterface, seed: string | null = null): void {
    const dealer = new Hand();
    const players = Array.from({ length: NUMBER_OF_PLAYERS }, () => new Hand());

    const deck = new Deck().shuffle(seed).dealTo([...players, dealer], 2);

    output.title('Blackjack');

    const playOut = (name: string, hand: Hand) => {
        let result = BlackjackHandEvaluator.evaluate(hand.cards);

        while (result.total < STAND_THRESHOLD) {
            deck.dealTo(hand);
            output.outcome(name, 'hits');
            result = BlackjackHandEvaluator.evaluate(hand.cards);
        }

        return result;
    };

    const dealerResult = playOut('Dealer', dealer);
    output.blackjackHand('Dealer', dealer, dealerResult);

    players.forEach((hand, index) => {
        const name = `Player ${index + 1}`;
        const result = playOut(name, hand);

        output.blackjackHand(name, hand, result);

        // A player bust is a loss even if the dealer busted too.
        if (result.isBust) {
            output.outcome(name, 'loses to the dealer');
            return;
        }

        const outcome = BlackjackHandEvaluator.compare(hand.cards, dealer.cards);
        const description =
            outcome > 0 ? 'beats the dealer' : outcome < 0 ? 'loses to the dealer' : 'pushes with the dealer';
        output.outcome(name, description);
    });
}
