import type { IActivityHandler } from "@vertigis/workflow";
import {validation} from "@vertigis/workflow/Validation";
import DataUtil from "../../common/DataUtil";
import {Target} from "wild-wild-path";
import DataActivityBase, {DataInputs} from "../../common/DataActivityBase";



interface SetDataInputs {
    /**
     * @displayName Value
     * @description The value to be set at the specified data path.
     * @required
     */
    value: any;
}

export interface SetDataOutputs {
    /**
     * @description The result of the activity.
     */
    result: Target;
}


/**
 * @displayName Set Data
 * @category Data
 * @description Sets a value at a specified data path.
 */
export default class SetData extends DataActivityBase implements IActivityHandler {
    execute(inputs: DataInputs & SetDataInputs): SetDataOutputs {
        const { target, path, options } = this.inputValidation(inputs);
        const value = validation.exists("Value", inputs.value, validation.never);

        const result = DataUtil.set(target, path, value, options);

        return { result };
    }
}
