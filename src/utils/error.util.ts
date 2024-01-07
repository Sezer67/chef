import { formTypes } from "../types";

export const isIncludeErrorToStates = (states: formTypes.FormHookType[]): string | null => {
    let error = null;
    for(let i = 0; i < states.length; i++) {
        let item = states[i];
        if(item.error){
            error = item.error;
            break;
        }
    }
    return error;
}

export const isIncludeEmptyFieldToStates = (states: formTypes.FormHookType[]): string | null => {
    let error = null;
    for(let i = 0; i < states.length; i++) {
        let item = states[i];
        if(item.isEmpty()){
            error = item.error;
        }
    }
    return error;
}