import React, {useState} from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {baseURL} from "../../../App.tsx";
import {createRequestBody, FormDataType} from "../SessionFormUtils.tsx";
import {Toggle} from "../Toggle/Toggle.tsx";
import {validateData} from "../SessionFormValidation.tsx";
import "./EditSession.css"

Modal.setAppElement('#root');

interface PopupProps {
    selectedSession: FormDataType;
    isOpen: boolean;
    onRequestClose: () => void;
}


const EditSession: FC<PopupProps> = ({isOpen, onRequestClose, selectedSession}) => {
    const [muid, setMuid] = useState(selectedSession.muid);
    const [device_type, setDeviceType] = useState(selectedSession.device_type);
    const [transfer_usd, setTransferUsd] = useState(selectedSession.transfer_usd);
    const [fraud, setIsFraud] = useState(selectedSession.fraud);
    const [errors, setErrors] = useState<string[]>([]);
    const onDeleteSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        axios.delete(baseURL + 'session/' + selectedSession.muid).then((response) => {
            console.log(response);
            onRequestClose();
        }, (e) => {
            setErrors(prevError => [...prevError, e.response.data.detail]);
        });
    }

    const onUpdateSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const errorFromValidation = validateData(muid, device_type, transfer_usd)
        if (errorFromValidation != "") {
            setErrors(prevError => [...prevError, errorFromValidation]);
            return;
        } else {
            setErrors([]);
        }

        const requestBody = createRequestBody(muid, device_type, transfer_usd, fraud);

        axios.put(baseURL + "session/" + selectedSession.muid, requestBody).then((response) => {
            console.log(response);
            onRequestClose();
        }, (e) => {
            setErrors(prevError => [...prevError, e.response.data.detail]);
        });
    }

    return (
        <Modal isOpen={isOpen} contentLabel="Update Session">
            <form className={"updateSessionForm"}>
                <div className={"formDiv"}>
                    <label> muid: </label>
                    <input className={"muidInput"} id="muid" value={muid}
                           onChange={(e) => setMuid(e.target.value)} type="string"/>
                </div>
                <div className={"formDiv"}>
                    <label> device_type: </label>
                    <select name="device_type" value={device_type}
                            onChange={(e) => setDeviceType(e.target.value)}>
                        <option value=""></option>
                        <option value="pc">pc</option>
                        <option value="android">android</option>
                        <option value="ios">ios</option>
                    </select>
                </div>
                <div className={"formDiv"}>
                    <label> transfer_usd: </label>
                    <input id="transfer_usd" value={transfer_usd}
                           onChange={(e) => setTransferUsd(e.target.valueAsNumber)}
                           type="number"
                           step={"0.1"}/>
                </div>
                <div className={"formDiv"}>
                    <label> is fraud: </label>
                    <Toggle toggled={fraud} onClick={setIsFraud}/>
                </div>
                <div className={"formDiv"}>
                    <button type="submit" value="Update and close window" onClick={onUpdateSubmit}>Update</button>
                    <button type="submit" value="Delete and close window" onClick={onDeleteSubmit}>Delete</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
                {errors.length > 0 &&
                    <label> {errors.pop()}</label>
                }
            </form>
        </Modal>
    );
};

export default EditSession;
