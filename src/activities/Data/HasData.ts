import DataActivityBase, {DataInputs} from "../../common/DataActivityBase";
import type {IActivityHandler} from "@vertigis/workflow";
import DataUtil from "../../common/DataUtil";

/** An interface that defines the inputs of the activity. */
export interface HasDataInputs {
    //
}

/** An interface that defines the outputs of the activity. */
export interface HasDataOutputs {
    /**
     * @description Returns `true` if `path` exists, else `false`.
     */
    result: boolean;
}

/**
 * @displayName Has Data
 * @category Data
 * @description Checks if the provided query path exists in target and returns a boolean result
 */
export default class HasData extends DataActivityBase implements IActivityHandler {
    execute(inputs: DataInputs & HasDataInputs): HasDataOutputs {
        const { target, path, options } = this.inputValidation(inputs);

        return { result: DataUtil.has(target, path, options) }
    }
}
