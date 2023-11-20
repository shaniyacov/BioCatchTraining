import React, {useState} from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {baseURL} from "../../../App.tsx";
import {createRequestBody, FormDataType} from "../SessionFormUtils.tsx";
import {Toggle} from "../Toggle/Toggle.tsx";
import {validateData} from "../SessionFormValidation.tsx";
import "./CreateSession.css"

Modal.setAppElement('#root');

interface PopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


const CreateSession: FC<PopupProps> = ({isOpen, onRequestClose}) => {
    const [muid, setMuid] = useState("");
    const [device_type, setDeviceType] = useState("");
    const [transfer_usd, setTransferUsd] = useState(0);
    const [fraud, setIsFraud] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const errorFromValidation = validateData(muid, device_type, transfer_usd)
        if (errorFromValidation != "") {
            setErrors(prevError => [...prevError, errorFromValidation]);
            return;
        } else {
            setErrors([]);
        }

        const requestBody = createRequestBody(muid, device_type, transfer_usd, fraud);

        executeRequest(requestBody);
    }

    function executeRequest(requestBody: FormDataType) {
        axios.post(baseURL + "session", requestBody).then((response) => {
            console.log(response);
            onRequestClose();
        }, (e) => {
            setErrors(prevError => [...prevError, e.response.data.detail]);
        });
    }


    return (
        <Modal isOpen={isOpen} contentLabel="Add Session">
            <form className={"addSessionForm"}>
                <div className={"formDiv"}>
                    <label> muid: </label>
                    <input className={"muidInput"} id="muid"
                           onChange={(e) => setMuid(e.target.value)} type="string"/>
                </div>
                <div className={"formDiv"}>
                    <label> device_type: </label>
                    <select name="device_type"
                            onChange={(e) => setDeviceType(e.target.value)}>
                        <option value=""></option>
                        <option value="pc">pc</option>
                        <option value="android">android</option>
                        <option value="ios">ios</option>
                    </select>
                </div>
                <div className={"formDiv"}>
                    <label> transfer_usd: </label>
                    <input id="transfer_usd" onChange={(e) => setTransferUsd(e.target.valueAsNumber)}
                           type="number"
                           step={"0.1"}
                           min={0}/>
                </div>
                <div className={"formDiv"}>
                    <label> is fraud: </label>
                    <Toggle toggled={fraud} onClick={setIsFraud}/>
                </div>
                <div className={"formDiv"}>
                    <button type="submit" value="Add and close window" onClick={onSubmit}>Add and close window
                    </button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
                {errors.length > 0 &&
                    <label> {errors.pop()}</label>
                }

            </form>
        </Modal>
    );
};

export default CreateSession;
