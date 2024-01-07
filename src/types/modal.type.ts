export enum Variables {
    Message = 0,
}

export type MessageDataType = {
    message: string;
    status: 'error' | 'success'; 
}

export type DataType = MessageDataType;