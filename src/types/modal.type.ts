export enum Variables {
    Message = 0,
    SelectPhoto = 1,
}

export type MessageDataType = {
    message: string;
    status: 'error' | 'success'; 
}

export type SelectPhotoDataType = {
    headerText: string;
    isRemovableButton: boolean;
    removeAction: () => void | null;
}
export type DataType = MessageDataType & SelectPhotoDataType;