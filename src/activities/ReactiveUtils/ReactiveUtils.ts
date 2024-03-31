import type { IActivityHandler } from "@vertigis/workflow";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import {EmptyOutputs} from "@vertigis/workflow/IActivityHandler";

/** An interface that defines the inputs of the activity. */
interface ReactiveUtilsInputs {
    /**
     * @displayName getValue
     * @description The first input to the activity.
     * @required
     */
    getValue: () => any;

    /**
     * @displayName callback
     * @description The second input to the activity.
     */
    callback: (value: any) => void;
}

/** An interface that defines the outputs of the activity. */

/**
 * @displayName ReactiveUtils Watch
 * @category ReactiveUtils
 * @description
 */
export default class ReactiveUtilsActivity implements IActivityHandler {

    execute(inputs: ReactiveUtilsInputs): EmptyOutputs {
         reactiveUtils.watch(
            inputs.getValue,
            inputs.callback);

        return {} as EmptyOutputs;
    }
}
