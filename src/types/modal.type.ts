export type MessageDataType = {
    message: string;
    status: 'error' | 'success'; 
}

export type SelectPhotoDataType = {
    headerText: string;
    isRemovableButton: boolean;
    removeAction: () => Promise<void> | null;
}
export type DataType = MessageDataType & SelectPhotoDataType;

export enum Variables {
    Message = 0,
    SelectPhoto = 1,
    ProfileMenu = 2,
}

export const BottomSheetVariables = [Variables.SelectPhoto, Variables.ProfileMenu];

