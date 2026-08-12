export interface HandEvaluation {
    score: number;
}

export type HandComparison = -1 | 0 | 1;
export type HandInput<TCard> = Iterable<TCard>;

export default abstract class HandEvaluator<TCard, TResult extends HandEvaluation> {
    abstract evaluate(hand: Iterable<TCard>): TResult;

    compare(first: Iterable<TCard>, second: Iterable<TCard>): HandComparison {
        return Math.sign(this.evaluate(first).score - this.evaluate(second).score) as HandComparison;
    }
}
