import { modalTypes } from "../../types";

export type ShowModalPayloadType = 
	| {
			activeModal: modalTypes.Variables.Message;
			data: {
                message: string;
                status: 'success' | 'error';
			};
	  };