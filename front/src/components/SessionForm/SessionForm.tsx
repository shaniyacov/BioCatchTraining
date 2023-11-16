import Modal from 'react-modal';

Modal.setAppElement('#root');


export class FormDataType {
    muid: string | undefined;
    device_type: string | undefined;
    transfer_usd: number  | undefined;
    fraud: boolean | undefined;

    constructor(muid: string, device_type: string, transfer_usd: number, fraud: boolean) {
        this.muid = muid;
        this.device_type = device_type;
        this.transfer_usd = transfer_usd;
        this.fraud = fraud;
    }
}


export function createRequestBody(muid?: string, device_type?: string, transfer_usd?: number, fraud?: boolean) {
    const requestBody: FormDataType = {muid: "", device_type: "", transfer_usd: 0, fraud: true}
    requestBody.muid = muid;
    requestBody.device_type = device_type;
    requestBody.transfer_usd = transfer_usd;
    requestBody.fraud = fraud;
    return requestBody;
}
