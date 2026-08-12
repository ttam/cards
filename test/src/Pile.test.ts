import Card from '../../src/Card.js';
import Pile from '../../src/Pile.js';

const labels = (pile: Pile): string[] => {
    return pile.cards.map(card => card.label);
};

describe('Pile', () => {
    describe('constructor', () => {
        test('accepts card codes and Card instances in order', () => {
            const ace = new Card('AH');
            const pile = new Pile(['2C', ace, '3♦']);

            expect(pile.cards).toEqual([new Card('2C'), ace, new Card('3♦')]);
        });

        test('rejects invalid card codes', () => {
            expect(() => new Pile(['2C', 'matt'])).toThrow('Invalid card: matt');
        });
    });

    describe('addCard, size, and isEmpty', () => {
        test('adds cards in order and reports its current size', () => {
            const pile = new Pile();
            const ace = new Card('AH');

            expect(pile.isEmpty()).toBe(true);
            expect(pile.addCard(ace)).toBe(pile);

            expect(pile.cards).toEqual([ace]);
            expect(pile.size).toBe(1);
            expect(pile.isEmpty()).toBe(false);
        });

        test('rejects an invalid card code', () => {
            expect(() => new Pile().addCard('not a card')).toThrow('Invalid card: not a card');
        });
    });

    describe('has', () => {
        test('matches a card code or Card instance by rank and suit', () => {
            const pile = new Pile(['3C', '4C']);

            expect(pile.has('3C')).toBe(true);
            expect(pile.has(new Card('3C'))).toBe(true);
            expect(pile.has('3H')).toBe(false);
        });

        test('matches a predicate against the cards', () => {
            const pile = new Pile(['3C', '4C']);

            expect(pile.has(card => card.suit === 'clubs')).toBe(true);
            expect(pile.has(card => card.suit === 'hearts')).toBe(false);
        });
    });

    describe('removeCard', () => {
        test('removes the top card by default or a card at a given index', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.removeCard().label).toBe('A');
            expect(pile.removeCard(1).label).toBe('3');
            expect(labels(pile)).toEqual(['2', '4']);
        });

        test('removes a matching card code or Card instance', () => {
            const three = new Card('3H');
            const four = new Card('4H');
            const pile = new Pile(['2H', three, four]);

            expect(pile.removeCard('3H')).toBe(three);
            expect(pile.removeCard(four)).toBe(four);
            expect(labels(pile)).toEqual(['2']);
        });

        test('rejects an empty pile or an index without a card', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(() => new Pile().removeCard()).toThrow('No card to remove');
            expect(() => pile.removeCard(pile.size)).toThrow('No card to remove');
            expect(() => pile.removeCard('5H')).toThrow('No card to remove');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
        });

        test.each([-1, 1.5])('rejects an invalid numeric index: %s', index => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(() => pile.removeCard(index)).toThrow('Card index must be a non-negative integer');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
        });
    });

    describe('burn', () => {
        test('discards cards from the top and returns the pile', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.burn()).toBe(pile);
            expect(pile.burn(2)).toBe(pile);
            expect(labels(pile)).toEqual(['4']);
        });

        test('rejects a burn larger than the pile without changing it', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(() => pile.burn(5)).toThrow('Not enough cards to burn');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
        });

        test.each([-1, 1.5])('rejects an invalid burn count: %s', count => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(() => pile.burn(count)).toThrow('Burn count must be a non-negative integer');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
        });
    });

    describe('dealTo', () => {
        test('deals the default number of cards to a single target', () => {
            const pile = new Pile(['AH', '2H']);
            const target = new Pile();

            expect(pile.dealTo(target)).toBe(pile);
            expect(labels(target)).toEqual(['A']);
            expect(labels(pile)).toEqual(['2']);
        });

        test('deals one card at a time to each target by default', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);
            const first = new Pile();
            const second = new Pile();

            expect(pile.dealTo([first, second], 2)).toBe(pile);
            expect(labels(first)).toEqual(['A', '3']);
            expect(labels(second)).toEqual(['2', '4']);
            expect(pile.cards).toEqual([]);
        });

        test('can deal a block to each target', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);
            const first = new Pile();
            const second = new Pile();

            pile.dealTo([first, second], 2, { alternate: false });

            expect(labels(first)).toEqual(['A', '2']);
            expect(labels(second)).toEqual(['3', '4']);
        });

        test('checks the full deal before moving any cards', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);
            const first = new Pile();
            const second = new Pile();

            expect(() => pile.dealTo([first, second], 3)).toThrow('Pile out of cards');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
            expect(first.cards).toEqual([]);
            expect(second.cards).toEqual([]);
        });

        test.each([-1, 1.5])('rejects an invalid count per target: %s', count => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);
            const target = new Pile();

            expect(() => pile.dealTo(target, count)).toThrow('Count per target must be a non-negative integer');
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
            expect(target.cards).toEqual([]);
        });
    });

    describe('shuffle', () => {
        test('uses a string seed for a repeatable shuffle', () => {
            const first = new Pile(['AH', '2H', '3H', '4H']).shuffle('demo');
            const second = new Pile(['AH', '2H', '3H', '4H']).shuffle('demo');

            expect(labels(first)).toEqual(labels(second));
            expect(new Set(labels(first)).size).toBe(4);
        });

        test('uses Math.random() for an unseeded shuffle', () => {
            const random = jest.spyOn(Math, 'random').mockReturnValue(0);
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.shuffle()).toBe(pile);
            expect(labels(pile)).toEqual(['2', '3', '4', 'A']);
            expect(random).toHaveBeenCalledTimes(3);
            random.mockRestore();
        });

        test('uses a supplied random function for each shuffle draw', () => {
            const random = jest.fn().mockReturnValue(0);
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.shuffle(random)).toBe(pile);
            expect(labels(pile)).toEqual(['2', '3', '4', 'A']);
            expect(random).toHaveBeenCalledTimes(3);
        });
    });

    describe('cut', () => {
        test('moves the cards above the cut to the bottom', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.cut(2)).toBe(pile);
            expect(labels(pile)).toEqual(['3', '4', 'A', '2']);
        });

        test('accepts the end positions as no-op cuts', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            pile.cut(0);
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);

            pile.cut(pile.size);
            expect(labels(pile)).toEqual(['A', '2', '3', '4']);
        });

        test('uses Math.random() when no position or seed is supplied', () => {
            const random = jest.spyOn(Math, 'random').mockReturnValue(0.5);
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            pile.cut();

            expect(labels(pile)).toEqual(['3', '4', 'A', '2']);
            expect(random).toHaveBeenCalledTimes(1);
            random.mockRestore();
        });

        test('uses a string seed for a repeatable random cut', () => {
            const first = new Pile(['AH', '2H', '3H', '4H']).cut('demo');
            const second = new Pile(['AH', '2H', '3H', '4H']).cut('demo');

            expect(labels(first)).toEqual(labels(second));
        });

        test('uses a supplied random function to choose the cut position', () => {
            const random = jest.fn().mockReturnValue(0.5);
            const pile = new Pile(['AH', '2H', '3H', '4H']);

            expect(pile.cut(random)).toBe(pile);
            expect(labels(pile)).toEqual(['3', '4', 'A', '2']);
            expect(random).toHaveBeenCalledTimes(1);
        });

        test('rejects positions outside the pile', () => {
            const pile = new Pile(['AH', '2H', '3H', '4H']);
            const original = labels(pile);

            expect(() => pile.cut(-1)).toThrow(RangeError);
            expect(() => pile.cut(1.5)).toThrow(RangeError);
            expect(() => pile.cut(pile.size + 1)).toThrow(RangeError);
            expect(labels(pile)).toEqual(original);
        });

        test('does nothing to an empty pile', () => {
            const pile = new Pile();

            expect(pile.cut()).toBe(pile);
            expect(pile.cards).toEqual([]);
        });
    });
});
