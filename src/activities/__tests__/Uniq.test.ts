// @ts-nocheck
import UniqActivity from "../Uniq";

describe('Uniq', () => {
    let activity: UniqActivity;

    beforeEach(() => {
        activity = new UniqActivity();
    });

    describe('removing duplicates', () => {
        it('removes duplicate from array', () => {
            expect(activity.execute({ input1: [1, 2, 3, 4, 5, 5, 4, 3, 2, 1] })).toHaveProperty('result', [1, 2, 3, 4, 5]);
            expect(activity.execute({ input1: [true, false, false]})).toHaveProperty('result', [true, false]);
            expect(activity.execute({ input1: ["string", "string"] })).toHaveProperty('result', ["string"]);
            expect(activity.execute({ input1: [null, null] })).toHaveProperty('result', [null]);
            expect(activity.execute({ input1: [undefined, undefined] })).toHaveProperty('result', [undefined]);

            //handles arrays with different data types
            const symbol = Symbol();
            const func = () => {};
            expect(activity.execute({ input1: [symbol, symbol] })).toHaveProperty('result', [symbol]);
            expect(activity.execute({ input1: [func, func] })).toHaveProperty('result', [func]);
        });

        it('returns the same array when items are objects and have identical content', () => {
            const input = [{foo: "bar"}, {foo: "bar"}];
            expect(activity.execute({ input1: input })).toHaveProperty('result', input);

            expect(activity.execute({ input1: [[1, 2], [1, 2]] })).toHaveProperty('result', [[1, 2], [1, 2]]);

        });
    });

    describe('handling non-array inputs', () => {
        it('returns empty array if input is undefined, null or empty', () => {
            expect(activity.execute({ input1: undefined })).toHaveProperty('result', []);
            expect(activity.execute({ input1: null })).toHaveProperty('result', []);
            expect(activity.execute({ input1: [] })).toHaveProperty('result', []);

        });

        it('converts non-array inputs to arrays', () => {
            expect(activity.execute({ input1: 1 })).toHaveProperty('result', [1]);
            expect(activity.execute({ input1: "string" })).toHaveProperty('result', ["string"]);
            expect(activity.execute({ input1: {foo: "bar"} })).toHaveProperty('result', [{foo: "bar"}]);
        });
    });
});
