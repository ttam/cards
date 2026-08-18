export interface Suit {
    readonly code: string;
    readonly color: string;
    readonly name: string;
    readonly symbol: string;
}

const suits: readonly Suit[] = Object.freeze(
    [
        { code: 'H', color: 'red', name: 'hearts', symbol: '❤' },
        { code: 'D', color: 'red', name: 'diamonds', symbol: '♦' },
        { code: 'C', color: 'black', name: 'clubs', symbol: '♣' },
        { code: 'S', color: 'black', name: 'spades', symbol: '♠' },
    ].map(suit => Object.freeze(suit)),
);

export const findSuit = (identifier: string): Suit | undefined => {
    const key = identifier.trim().toUpperCase();

    return suits.find(suit => [suit.name.toUpperCase(), suit.code, suit.symbol].includes(key));
};

export default suits;
