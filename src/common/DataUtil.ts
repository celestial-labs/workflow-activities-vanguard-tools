import {get, has, list, set, remove, iterate, type Options, type Query, type Target} from 'wild-wild-path';
import {pick, flatten, exclude, include, find} from 'wild-wild-utils';

export default class DataUtil {
    // Get
    public static get(target: Target, query: Query, defaultValue?: any, options?: Options): any | undefined {
        const result = get(target, query, options);
        return result === undefined ? defaultValue : result;
    }

    public static entries(target: Target, query: Query, options?: Options): any | undefined {
        return list(target, query, {...options, entries: true});
    }

    public static list(target: Target, query: Query, options?: Options): any | undefined {
        return list(target, query, options);
    }

    public static iterate(target: Target, query: Query, options?: Options) {
        return iterate(target, query, options);
    }

    public static flatten(target: Target, query: Query, defaultValue?: any, options?: Options): object {
        const data: Target = (DataUtil.has(target, query, options)) ? DataUtil.get(target, query, defaultValue, options) : target;

        return flatten(data, options);
    }


    // Filters
    public static find(target: Target, query: Query, testFunction: (value: any) => boolean, options?: Options): any {
        return find(target, query, testFunction, options);
    }
    public static include(target: Target, query: Query, testFunction: (value: any) => boolean, options?: Options): Target {
        return include(target, query, testFunction, options);
    }
    public static exclude(target: Target, query: Query, testFunction: (value: any) => boolean, options?: Options): Target {
        return exclude(target, query, testFunction, options);
    }

    // Has
    public static has(target: Target, query: Query, options?: Options): boolean {
        return has(target, query, options);
    }

    public static set(target: Target, query: Query, value: unknown, options?: Options): Target {
        return set(target, query, value, options);
    }

    public static remove(target: Target, query: Query, options?: Options): Target {
        return remove(target, query, options);
    }

    public static pick(target: Target, query: Query, options?: Options): Target {
        return pick(target, query, options);
    }
};
