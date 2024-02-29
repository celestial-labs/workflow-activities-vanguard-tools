import SetData from "../SetData";

describe('SetData', () => {
    let activity: SetData;

    beforeEach(() => {
        activity = new SetData();
    });

    describe('SetData', () => {
        let activity: SetData;

        beforeEach(() => {
            activity = new SetData();
        });

        it('sets value correctly for existing path', () => {
            const target = { a: { b: 1 } };
            const { result } = activity.execute({ target, path: 'a.b', value: 2 });
            expect(result).toEqual({ a: { b: 2 } });
        });

        it('sets value correctly for non-existing path', () => {
            const target = { a: { b: 1 } };
            const { result } = activity.execute({ target, path: 'a.c', value: 2 });
            expect(result).toEqual({ a: { b: 1, c: 2 } });
        });

        it('sets value correctly for deeply nested path', () => {
            const target = { a: { b: { c: { d: 1 } } } };
            const { result } = activity.execute({ target, path: 'a.b.c.d', value: 2 });
            expect(result).toEqual({ a: { b: { c: { d: 2 } } } });
        });

        it('creates nested structures if they do not exist', () => {
            const target = { a: { b: 1 } };
            const { result } = activity.execute({ target, path: 'a.c.d', value: 2 });
            expect(result).toEqual({ a: { b: 1, c: { d: 2 } } });
        });

        it('overwrites existing values', () => {
            const target = { a: { b: 1 } };
            const { result } = activity.execute({ target, path: 'a.b', value: 2 });
            expect(result).toEqual({ a: { b: 2 } });
        });

        it('handles array paths correctly', () => {
            const target = { a: { b: [1, 2, 3] } };
            const { result } = activity.execute({ target, path: ['a', 'b', 1], value: 4 });
            expect(result).toEqual({ a: { b: [1, 4, 3] } });
        });

        it('handles wildcard paths correctly', () => {
            const target = { a: { b: [1, 2, 3] } };
            const { result } = activity.execute({ target, path: 'a.b.*', value: 4 });
            expect(result).toEqual({ a: { b: [4, 4, 4] } });
        });
    });
});

