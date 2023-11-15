import React, {useState} from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import "./SessionForm.css"
import {Toggle} from "./Toggle/Toggle.tsx";
import {validateData} from "./SessionFormValidation.tsx";

Modal.setAppElement('#root');

interface PopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
    executeRequest: ((requestBody: FormDataType, onRequestClose: () => void, setError: (value: string[] | ((prevState: string[]) => string[])) => void) => void);
}

interface FormDataType {
    muid: string,
    device_type: string,
    transfer_usd: number,
    fraud: boolean
}


function createRequestBody(muid: string, device_type: string, transfer_usd: number, fraud: boolean) {
    const requestBody: FormDataType = {muid: "", device_type: "", transfer_usd: 0, fraud: true}
    requestBody.muid = muid;
    requestBody.device_type = device_type;
    requestBody.transfer_usd = transfer_usd;
    requestBody.fraud = fraud;
    return requestBody;
}

const SessionForm: FC<PopupProps> = ({isOpen, onRequestClose, executeRequest}) => {
    const [muid, setMuid] = useState("");
    const [device_type, setDeviceType] = useState("");
    const [transfer_usd, setTransferUsd] = useState(0);
    const [fraud, setIsFraud] = useState(false);
    const [error, setError] = useState<string[]>([]);

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        debugger
        event.preventDefault();
        const errorFromValidation = validateData(muid, device_type, transfer_usd)
        if (errorFromValidation != "") {
            setError(prevError => [...prevError, errorFromValidation]);
            return;
        } else {
            setError([]);
        }

        const requestBody = createRequestBody(muid, device_type, transfer_usd, fraud);

        executeRequest(requestBody, onRequestClose, setError);
    }


    return (
        <Modal isOpen={isOpen} contentLabel="Add Session">
            <form className={"addSessionForm"}>
                <div className={"formDiv"}>
                    <label> muid: </label>
                    <input className={"muidInput"} id="muid" onChange={(e) => setMuid(e.target.value)} type="string"/>
                </div>
                <div className={"formDiv"}>
                    <label> device_type: </label>
                    <select name="device_type" onChange={(e) => setDeviceType(e.target.value)}>
                        <option value=""></option>
                        <option value="pc">pc</option>
                        <option value="andriod">android</option>
                        <option value="ios">ios</option>
                    </select>
                </div>
                <div className={"formDiv"}>
                    <label> transfer_usd: </label>
                    <input id="transfer_usd" onChange={(e) => setTransferUsd(e.target.valueAsNumber)} type="number"
                           step={"0.1"}/>
                </div>
                <div className={"formDiv"}>
                    <label> is fraud: </label>
                    <Toggle toggled={fraud} onClick={setIsFraud}/>
                </div>
                <div className={"formDiv"}>
                    <button type="submit" value="Add and close window" onClick={onSubmit}>Add and close window</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
                {error.length > 0 &&
                    <label> {error.pop()}</label>
                }

            </form>
        </Modal>
    );
};

export default SessionForm;
