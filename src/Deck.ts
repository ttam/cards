import Card from './Card.js';
import Pile from './Pile.js';
import ranks from './Ranks.js';
import suits from './Suits.js';

export default class Deck extends Pile {
    constructor() {
        super();

        for (const suit of suits) {
            for (const rank of ranks) {
                this.addCard(new Card(`${rank.label}${suit.code}`));
            }
        }
    }
}
