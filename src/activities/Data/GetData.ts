import type { IActivityHandler } from "@vertigis/workflow";
import {validation} from "@vertigis/workflow/Validation";
import DataActivityBase, {DataInputs} from "../../common/DataActivityBase";
import DataUtil from "../../common/DataUtil";

interface GetDataInputs {
    /**
     * @displayName Mode
     * @description The mode determines the method of data retrieval. The default mode is "get".
     * @required
     * @defaultValue get
     * @placeholder get
     * @noExpressions
     * @options get, entries, list, iterate, pick, flatten
     */
    mode: "get" | "entries" | "list" | "iterate" | "pick" | "flatten";

    /**
     * @displayName Default
     * @description The default value which will be returned if the specified key is not found.
     */
    default?: any;
}

interface GetPathOutputs {
    /**
     * @description The result of the data retrieval operation.
     */
    result: any;
}

/**
 * @displayName Get Data
 * @category Data
 * @description This activity is responsible for retrieving data from a nested array, object or collection using "dot" notation.
 * It also accepts wildcards using asterisks, which may target any key of the array or object.
 */
export default class GetData extends DataActivityBase implements IActivityHandler {
    execute(inputs: DataInputs & GetDataInputs): GetPathOutputs {
        const { target, path, options } = this.inputValidation(inputs);
        const mode = validation.string("Mode", inputs.mode, "get");
        const defaults = validation.exists("Default", inputs.default, undefined);

        if(target === undefined || target === null) {
            return { result: undefined }
        }

        const result = DataUtil[mode](target, path, defaults, {mutate: false, ...options});

        return { result }
    }
}
