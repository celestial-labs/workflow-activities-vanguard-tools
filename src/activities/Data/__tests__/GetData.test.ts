// @ts-nocheck
import GetData from '../GetData';
import {ActivityInputError} from "@vertigis/workflow/Errors";
describe('GetDataActivity', () => {
    let activity: GetData;

    beforeEach(() => {
        activity = new GetData();
    });

    describe('when using dot-notation', () => {
        it('return value of existing properties', () => {
            const target = {a: {aa: {aaa: 2}}, b: 0};
            expect(activity.execute({ target, path:  'a', mode: 'get' })).toHaveProperty('result', {aa: {aaa: 2}});
            expect(activity.execute({ target, path:  'a.aa', mode: 'get' })).toHaveProperty('result', {aaa: 2});
            expect(activity.execute({ target, path:  'a.aa.aaa', mode: 'get' })).toHaveProperty('result', 2);
            expect(activity.execute({ target, path:  'b', mode: 'get' })).toHaveProperty('result', 0);
            expect(activity.execute({ target: target.a, path:  'aa', mode: 'get' })).toHaveProperty('result', {aaa: 2});
            expect(activity.execute({ target: target.a.aa, path:  'aaa', mode: 'get' })).toHaveProperty('result', 2);

            expect(activity.execute({ target, path:  '*', mode: 'get' })).toHaveProperty('result', {aa: {aaa: 2}});
            expect(activity.execute({ target, path:  'a.*.aaa', mode: 'get' })).toHaveProperty('result', 2);
        });

        it('returns undefined for non-existing properties', () => {
            const target = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
            expect(activity.execute({ target, path: 'b.bb', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'a.bb', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: target.b, path: 'bb.bbb', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'c.cc', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'd.dd.ddd', mode: 'get' })).toHaveProperty('result', undefined);

            expect(activity.execute({ target: {}, path: 'one', mode: 'get' })).toHaveProperty('result', undefined);
        });

        it('returns default value for non-existing properties', () => {
            const target = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
            expect(activity.execute({ target, path: 'b.bb', mode: 'get', default: 123 })).toHaveProperty('result', 123 );
            expect(activity.execute({ target, path: 'a.bb', mode: 'get', default: "default" })).toHaveProperty('result', "default");
            expect(activity.execute({ target, path: 'b.bb.bbb', mode: 'get', default: "default" })).toHaveProperty('result', "default");
            expect(activity.execute({ target: target.b, path: 'bb.bbb', mode: 'get', default: "default" })).toHaveProperty('result', "default");
            expect(activity.execute({ target, path: 'c.cc', mode: 'get', default: "default" })).toHaveProperty('result', "default");
            expect(activity.execute({ target, path: 'd.dd.ddd', mode: 'get', default: "default" })).toHaveProperty('result', "default");
        });

        it('returns undefined for falsey path', () => {
            const target = {a: {aa: {aaa: 2}}, b: {}, '': true};
            expect(activity.execute({ target, path: 'a.', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'a.aa.aaa.', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'b.', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'b..b', mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target, path: 'b...b', mode: 'get' })).toHaveProperty('result', undefined);
        });

        it('returns default value for falsey path', () => {
            const target = {a: {aa: {aaa: 2}}, b: {}};
            expect(activity.execute({ target, path: 'a.', mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target, path: 'a.aa.aaa.', mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target, path: 'b.', mode: 'get', default: "default" })).toHaveProperty('result', "default");

            expect(activity.execute({ target, path: 'b.', mode: 'get', default: "default", options: { entries: true } })).toHaveProperty('result', "default");
        });

        it('returns undefined for properties with undefined value', () => {
            const target = { a: undefined };
            expect(activity.execute({ target, path: 'a', mode: 'get' })).toHaveProperty('result', undefined);

            //option: entries
            expect(activity.execute({ target, path: 'a', mode: 'get', options: { entries: true } })).toHaveProperty('result', {"missing": false, "path": ["a"], "value": undefined});
        });

        it('returns correct value for properties with regex path', () => {
            const target = { one: 1 };
            expect(activity.execute({ target, path: [/one/u], mode: 'get' })).toHaveProperty('result', 1);
        });

        it('throws error for falsey path', () => {
            expect(() => activity.execute({ target: { one: 1 }, path: '', mode: 'get' })).toThrow(Error);
            expect(() => activity.execute({ target: { one: 1 }, path: false, mode: 'get' })).toThrow(Error);
        });
    });

    describe('when using array notation', () => {
        it('returns existing properties', () => {
            const target = {a: {aa: {aaa: 2}}, b: null};
            expect(activity.execute({ target, path:  ['a'], mode: 'get' })).toHaveProperty('result', {aa: {aaa: 2}});
            expect(activity.execute({ target, path:  ['a', 'aa'], mode: 'get' })).toHaveProperty('result', {aaa: 2});
            expect(activity.execute({ target, path:  ['a', 'aa', 'aaa'], mode: 'get' })).toHaveProperty('result', 2);
            expect(activity.execute({ target, path:  ['b'], mode: 'get' })).toHaveProperty('result', null);
            expect(activity.execute({ target: target.a, path:  ['aa'], mode: 'get' })).toHaveProperty('result', {aaa: 2});
            expect(activity.execute({ target: target.a.aa, path:  ['aaa'], mode: 'get' })).toHaveProperty('result', 2);
            const path = ['a', 'aa', 'aaa'];
            expect(activity.execute({ target, path, mode: 'get' })).toHaveProperty('result', 2);
            expect(path).toEqual(['a', 'aa', 'aaa']); // array arg preserved
        });

        it('returns undefined for non-existing properties', () => {
            const obj = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
            expect(activity.execute({ target: obj, path: ['b', 'bb'], mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: obj, path: ['a', 'bb'], mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: obj, path: ['b', 'bb', 'bbb'], mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: obj.b, path: ['bb', 'bbb'], mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: obj, path: ['c', 'cc'], mode: 'get' })).toHaveProperty('result', undefined);
            expect(activity.execute({ target: obj, path: ['d', 'dd', 'ddd'], mode: 'get' })).toHaveProperty('result', undefined);
            const arr = ['b', 'bb', 'bbb'];
            expect(activity.execute({ target: obj, path: arr, mode: 'get' })).toHaveProperty('result', undefined);
            expect(arr).toEqual(['b', 'bb', 'bbb']); // array arg preserved
        });

        it('returns default value for non-existing properties', () => {
            const target = {a: {aa: {aaa: 2}}, b: 4, c: null, d: 0};
            expect(activity.execute({ target, path: ['b', 'bb'], mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target, path: ['a', 'bb'], mode: 'get', default: "default" })).toHaveProperty('result', "default");
            expect(activity.execute({ target, path: ['b', 'bb', 'bbb'], mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target: target.b, path: ['bb', 'bbb'], mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target, path: ['c', 'cc'], mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(activity.execute({ target, path: ['d', 'dd', 'ddd'], mode: 'get', default: 888 })).toHaveProperty('result', 888);
            const arr = ['b', 'bb', 'bbb'];
            expect(activity.execute({ target, path: arr, mode: 'get', default: 888 })).toHaveProperty('result', 888);
            expect(arr).toEqual(['b', 'bb', 'bbb']); // array arg preserved
        });

        it('throws error for falsey property path', () => {
            const target = {a: {aa: {aaa: 2}}, b: {'': {'': 3}}};
            expect(() => activity.execute({ target, path: ['a', false], mode: 'get' })).toThrow(Error);
            expect(() => activity.execute({ target, path: ['a', 'aa', 'aaa', null], mode: 'get' })).toThrow(Error);
            expect(() => activity.execute({ target, path: ['b', undefined], mode: 'get' })).toThrow(Error);
            const arr = ['a', 'aa', 'aaa', null];
            expect(() => {
                activity.execute({ target, path: arr, mode: 'get' });
            }).toThrow();
            expect(arr).toEqual(['a', 'aa', 'aaa', null]);
        });

        // test('returns 3rd param for falsey property names using array arg', () => {
        //     const obj = {a: {aa: {aaa: 2}}, b: {'': {'': 3}}};
        //     expect(activity.execute({ target: obj, path: ['a', false], mode: 'get', default: 888 })).toHaveProperty('result', 888);
        //     expect(activity.execute({ target: obj, path: ['a', 'aa', 'aaa', null], mode: 'get', default: 888 })).toHaveProperty('result', 888);
        //     expect(activity.execute({ target: obj, path: ['b', undefined], mode: 'get', default: 888 })).toHaveProperty('result', 888);
        //     const arr = ['a', 'aa', 'aaa', null];
        //     expect(activity.execute({ target: obj, path: arr, mode: 'get', default: 888 })).toHaveProperty('result', 888);
        //     expect(arr).toEqual(['a', 'aa', 'aaa', null]); // array arg preserved
        // });

        it('follows empty keys using array', () => {
            const target = {b: {'': {'': 3}}};
            expect(activity.execute({ target, path: ['b', ''], mode: 'get' })).toHaveProperty('result', {'': 3});
            expect(activity.execute({ target, path: ['b', '', ''], mode: 'get' })).toHaveProperty('result', 3);
        });
    });

    it('throws error if first argument is a falsey value', () => {
        expect(() => activity.execute({ target: null, path: 'a', mode: 'get' })).toThrow(ActivityInputError);
        expect(() => activity.execute({ target: undefined, path: 'a', mode: 'get' })).toThrow(ActivityInputError);
        // Also when default value is set
        expect(() => activity.execute({ target: null, path: 'a', mode: 'get', default: 888 })).toThrow(ActivityInputError);
        expect(() => activity.execute({ target: undefined, path: 'a', mode: 'get', default: 888 })).toThrow(ActivityInputError);
    });

    it('does not mutate path', () => {
        const obj1 = {a: {ab: {aaa: 2}}, b: null};
        const obj2 = {a: {aa: {aaa: 2}}, b: null};
        const path = ['a', 'aa', 'aaa'];
        expect(activity.execute({ target: obj1, path: path, mode: 'get' })).toHaveProperty('result', undefined);
        expect(path).toEqual(['a', 'aa', 'aaa']);
        expect(activity.execute({ target: obj2, path: path, mode: 'get' })).toHaveProperty('result', 2);
        expect(path).toEqual(['a', 'aa', 'aaa']);
    });
});
