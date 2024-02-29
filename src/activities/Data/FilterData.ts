import type { IActivityHandler } from "@vertigis/workflow";
import {Target} from "wild-wild-path";
import {validation} from "@vertigis/workflow/Validation";
import DataUtil from "../../common/DataUtil";
import DataActivityBase, {DataInputs} from "../../common/DataActivityBase";



/** An interface that defines the inputs of the activity. */
interface FilterDataInputs {
    /**
     * @displayName Mode
     * @description The operation mode for the filter. It can be 'find', 'include', or 'exclude'. This input is required and does not accept expressions. The default value is 'find'.
     * @required
     * @defaultValue find
     * @noExpressions
     */
    mode: "find" | "include" | "exclude";

    /**
     * @displayName Test Function
     * @description A function that tests each element in the queried data. It should return a boolean value.
     */
    testFunction: (value: any) => boolean;
}

/** An interface that defines the outputs of the activity. */
interface FilterDataOutputs {
    /**
     * @description The result of the activity.
     */
    result: Target;
}

/**
 * @displayName Filter Data
 * @category Data
 * @description A activity that filters data based on a test function and operation mode.
 */
export default class FilterDataActivity extends DataActivityBase implements IActivityHandler {

    execute(inputs: DataInputs & FilterDataInputs ): FilterDataOutputs {
        const { target, path, options } = this.inputValidation(inputs);

        const mode = validation.string("Mode", inputs.mode, "find");
        const testFunction = validation.exists("testFunction", inputs.testFunction, (v) => !!v);

        const result = DataUtil[mode](target, path, testFunction, options);

        return {
            result
        };
    }
}
