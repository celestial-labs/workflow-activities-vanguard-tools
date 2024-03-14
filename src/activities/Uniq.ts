import type { IActivityHandler } from "@vertigis/workflow";
import {validation} from "@vertigis/workflow/Validation";

interface UniqInputs {
    /**
     * @displayName Collection
     * @description The collection of items to remove duplicates from.
     * @required
     */
    input1: any[];
}

interface UniqOutputs {
    /**
     * @description The result of the activity, which is the input collection without duplicates.
     */
    result: any[];
}

/**
 * @displayName Uniq
 * @category Data
 * @description An activity for removing duplicates from a collection.
 */
export default class UniqActivity implements IActivityHandler {
    execute(inputs: UniqInputs): UniqOutputs {
        const rawArr = validation.array<any>("Collection", inputs.input1);

        return {
            result: [...new Set(rawArr)]
        };
    }
}
