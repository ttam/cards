import Pile from './Pile.js';

export default class Hand extends Pile {
    toString(): string {
        return this.cards.map(c => c.toString()).join(' ');
    }
}
