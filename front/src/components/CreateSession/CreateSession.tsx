import React, {useState} from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import "./CreateSession.css"
import {Toggle} from "./Toggle/Toggle.tsx";
import axios from "axios";
import {baseURL} from "../../App.tsx";
import {validateData} from "./CreaseSessionValidation.tsx";

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
    const [error, setError] = useState("");

    interface FormDataType {
        muid: string,
        device_type: string,
        transfer_usd: number,
        fraud: boolean
    }

    const responseBody: FormDataType = {muid: "", device_type: "", transfer_usd: 0, fraud: true}

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const errorFromValidation = validateData(muid, device_type, transfer_usd)
        if (errorFromValidation != "") {
            setError(errorFromValidation);
            return;
        } else {
            setError("");
        }

        responseBody.muid = muid;
        responseBody.device_type = device_type;
        responseBody.transfer_usd = transfer_usd;
        responseBody.fraud = fraud;

        debugger

        axios.post(baseURL + "session", responseBody).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        onRequestClose();
    }


    return (
        <Modal isOpen={isOpen} contentLabel="Add Session">
            <form className={"addSessionForm"}>
                <div className={"formDiv"}>
                    <label> muid: </label>
                    <input id="muid" onChange={(e) => setMuid(e.target.value)} type="string"/>
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
                    <input id="transfer_usd" onChange={(e) => setTransferUsd(e.target.valueAsNumber)} type="number" step={"0.1"}/>
                </div>
                <div className={"formDiv"}>
                    <label> is fraud: </label>
                    <Toggle toggled={fraud} onClick={setIsFraud}/>
                </div>
                <div className={"formDiv"}>
                    <button type="submit" value="Add and close window" onClick={onSubmit}>Add and close window</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
                {error != "" &&
                    <label> {error}</label>
                }

            </form>
        </Modal>
    );
};

export default CreateSession;
