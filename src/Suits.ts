export interface Suit {
    code: string;
    color: string;
    name: string;
    symbol: string;
}

const suits: Suit[] = [
    { code: 'H', color: 'red', name: 'hearts', symbol: '❤' },
    { code: 'D', color: 'red', name: 'diamonds', symbol: '♦' },
    { code: 'C', color: 'black', name: 'clubs', symbol: '♣' },
    { code: 'S', color: 'black', name: 'spades', symbol: '♠' },
];

export const findSuit = (identifier: string): Suit | undefined => {
    const key = identifier.trim().toUpperCase();

    return suits.find(suit => [suit.name.toUpperCase(), suit.code, suit.symbol].includes(key));
};

export default suits;
