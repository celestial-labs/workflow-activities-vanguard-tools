import * as index from "./index";
let mainResult: Promise<any> | undefined;

export async function main(): Promise<any> {
    if (mainResult) {
        return mainResult;
    }

    mainResult = Promise.resolve(index);

    return mainResult;
}
