export interface Rank {
    readonly label: string;
    readonly value: number;
}

const ranks: readonly Rank[] = Object.freeze(
    [
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: 'J', value: 11 },
        { label: 'Q', value: 12 },
        { label: 'K', value: 13 },
        { label: 'A', value: 14 },
    ].map(rank => Object.freeze(rank)),
);

export const findRank = (identifier: number | string): Rank | undefined => {
    if (typeof identifier === 'number') {
        return ranks.find(rank => rank.value === identifier);
    }

    const key = identifier.trim().toUpperCase();
    return ranks.find(rank => rank.label === key);
};

export default ranks;
