import React, {useState} from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import "./CreateSession.css"
import {Toggle} from "./Toggle/Toggle.tsx";
import axios from "axios";
import {baseURL} from "../../App.tsx";

Modal.setAppElement('#root');

interface PopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


const CreateSession: FC<PopupProps> = ({isOpen, onRequestClose}) => {
    const [muid, setMuid] = useState(0);
    const [device_type, setDeviceType] = useState("");
    const [transfer_usd, setTransferUsd] = useState(0);
    const [fraud, setIsFraud] = useState(false);
    const [errors, setErrors] = useState("");

    interface FormDataType {
        muid: number,
        device_type: string,
        transfer_usd: number,
        fraud: boolean
    }

    const responseBody: FormDataType = {muid: 0, device_type: "", transfer_usd: 0, fraud: true}

    function validateData(): boolean {
        if (muid == 0) {
            setErrors("muid cannot be empty");
            return false;
        }
        if (device_type == "") {
            setErrors("device_type cannot be empty");
            return false;
        }
        if (transfer_usd == 0) {
            setErrors("transfer_usd cannot be empty");
            return false;
        }
        return true;
    }

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (!validateData()) {
            return;
        }

        responseBody.muid = muid;
        responseBody.device_type = device_type;
        responseBody.transfer_usd = transfer_usd;
        responseBody.fraud = fraud;



        axios.post(baseURL + "session", responseBody).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        onRequestClose()
    }


    return (
        <Modal isOpen={isOpen} contentLabel="Add Session">
            <form className={"addSessionForm"}>
                <div className={"formDiv"}>
                    <label> muid: </label>
                    <input id="muid" onChange={(e) => setMuid(e.target.valueAsNumber)} type="number"/>
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
                    <input id="transfer_usd" onChange={(e) => setTransferUsd(e.target.valueAsNumber)} type="number"/>
                </div>
                <div className={"formDiv"}>
                    <label> is fraud: </label>
                    <Toggle toggled={fraud} onClick={setIsFraud}/>
                </div>
                <div className={"formDiv"}>
                    <button type="submit" value="Add and close window" onClick={onSubmit}>Add and close window</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
                {errors.length !=0 &&
                    <label> {errors}</label>
                }

            </form>
        </Modal>
    );
};

export default CreateSession;
