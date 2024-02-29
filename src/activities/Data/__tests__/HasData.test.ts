import HasData from "../HasData";

describe('HasPath', () => {
    let activity: HasData;

    beforeEach(() => {
        activity = new HasData();
    });

    it('returns true when path exists in the data', () => {
        const {result} = activity.execute({ target: { a: 1 }, path: 'a' });
        expect(result).toBe(true);
    });

    it('returns false when path does not exist in the data', () => {
        const {result} = activity.execute({ target: { a: 1 }, path: 'b' });
        expect(result).toBe(false);
    });

    // maybe we should add these tests

    // it('returns false when path is null', () => {
    //     const {result} = activity.execute({ target: { a: 1 }, path: null });
    //     expect(result).toBe(false);
    // });
    //
    // it('returns false when path is undefined', () => {
    //     const {result} = activity.execute({ target: { a: 1 }, path: undefined });
    //     expect(result).toBe(false);
    // });
    //
    // it('returns false when target is null', () => {
    //     const {result} = activity.execute({ target: null, path: 'a' });
    //     expect(result).toBe(false);
    // });
    //
    // it('returns false when target is undefined', () => {
    //     const {result} = activity.execute({ target: undefined, path: 'a' });
    //     expect(result).toBe(false);
    // });

    it('returns true when path is an existing array', () => {
        const {result} = activity.execute({ target: { a: { b: 1 } }, path: ['a', 'b'] });
        expect(result).toBe(true);
    });

    it('returns false when path is a non-existing array', () => {
        const {result} = activity.execute({ target: { a: { b: 1 } }, path: ['a', 'c'] });
        expect(result).toBe(false);
    });

    it('returns true when data is a deeply nested object', () => {
        const {result} = activity.execute({ target: { a: { b: { c: { d: { e: 1 } } } } }, path: 'a.b.c.d.e' });
        expect(result).toBe(true);
    });

    it('returns false when path is a deeply nested path but does not exist', () => {
        const {result} = activity.execute({ target: { a: { b: { c: 1 } } }, path: 'a.b.c.d' });
        expect(result).toBe(false);
    });
});
