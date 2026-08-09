import ranks, { findRank } from '../../src/Ranks.js';

describe('ranks', () => {
    test('contains the standard ranks from 2 through ace', () => {
        expect(ranks.map(rank => rank.label)).toEqual(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
        expect(ranks.map(rank => rank.value)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    });

    describe('findRank', () => {
        test('finds ranks by number or normalized label', () => {
            expect(findRank(14)).toEqual({ label: 'A', value: 14 });
            expect(findRank(' q ')).toEqual({ label: 'Q', value: 12 });
            expect(findRank('10')).toEqual({ label: '10', value: 10 });
        });

        test('returns undefined for an unknown rank', () => {
            expect(findRank(1)).toBeUndefined();
            expect(findRank(15)).toBeUndefined();
            expect(findRank('ace')).toBeUndefined();
        });
    });
});
