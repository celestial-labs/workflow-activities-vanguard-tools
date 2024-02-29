import type {Options, Query, Target} from "wild-wild-path";
import {validation} from "@vertigis/workflow/Validation";

export interface DataInputs {
    /**
     * @displayName Target
     * @description The data to be queried. This can be an object or an array
     * @required
     */
    target: object | any[];

    /**
     * @displayName Path
     * @description The path to the target data. Use dot notation for nested properties or wildcards for array indexes.
     * @required
     */
    path: Query;

    /**
     * @displayName Options
     * @description Additional options for data retrieval.
     */
    options?: Options;
}

export default abstract class DataActivityBase {
    inputValidation({target, path, options}: DataInputs): { path: Query; target: Target, options?: Options} {
        return {
            target: validation.exists("Target Data", target, validation.never),
            path: validation.exists("Path", path, '.'),
            options: validation.exists("Options", options, undefined)
        };
    }
}
