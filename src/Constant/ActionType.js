export const ADD_DATA = 'ADD_DATA';
export const ADD_DATA_LAYOUT_3 = 'ADD_DATA_LAYOUT_3';
export const ADD_CDRDATA = 'ADD_CDRDATA';
export const CHANGE_CDRDATA = 'CHANGE_CDRDATA';

export function addCDRData(newCDRData) {
    return {
        type: ADD_CDRDATA,
        data: newCDRData
    };
}
export function changeCDRData(newCDRData) {
    return {
        type: CHANGE_CDRDATA,
        data: newCDRData
    };
}