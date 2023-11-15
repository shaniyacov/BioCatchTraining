import React from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {baseURL} from "../../App.tsx";
import SessionForm from "../CommonComponents/SessionForm.tsx";

Modal.setAppElement('#root');

interface PopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface FormDataType {
    muid: string,
    device_type: string,
    transfer_usd: number,
    fraud: boolean
}

function executeRequest(requestBody: FormDataType, onRequestClose: () => void, setError: (value: (((prevState: string[]) => string[]) | string[])) => void) {
    axios.put(baseURL + "session/" + requestBody.muid, requestBody).then((response) => {
        console.log(response);
        onRequestClose();
    }, (e) => {
        debugger
        setError(prevError => [...prevError, e.response.data.detail]);
    });
}

const UpdateSession: FC<PopupProps> = ({isOpen, onRequestClose}) => {
    return (
        <SessionForm isOpen={isOpen}
                     onRequestClose={onRequestClose}
                     executeRequest={executeRequest}/>
    );
};

export default UpdateSession;
