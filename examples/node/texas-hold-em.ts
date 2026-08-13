import { Deck, Hand, PokerHandEvaluator } from '../../src';
import type OutputInterface from './output/OutputInterface.js';

const NUMBER_OF_PLAYERS = 3;

export default function example(output: OutputInterface, seed: string | null = null): void {
    const community = new Hand();
    const players = Array.from({ length: NUMBER_OF_PLAYERS }, () => new Hand());

    new Deck()
        .shuffle(seed)
        .dealTo(players, 2)
        .burn()
        .dealTo(community, 3)
        .burn()
        .dealTo(community, 1)
        .burn()
        .dealTo(community, 1);

    output.title(`Texas Hold 'em`);
    output.board(community);

    let highestScore = -1;
    let winners: { name: string; description: string }[] = [];

    players.forEach((hand, index) => {
        const name = `Player ${index + 1}`;
        const result = PokerHandEvaluator.evaluate([...hand.cards, ...community.cards]);

        output.playerHand(name, hand, result);

        if (result.score > highestScore) {
            highestScore = result.score;
            winners = [{ name, description: result.description }];
        } else if (result.score === highestScore) {
            winners.push({ name, description: result.description });
        }
    });

    output.winners(
        winners.map(winner => winner.name),
        winners[0]!.description,
    );
}
