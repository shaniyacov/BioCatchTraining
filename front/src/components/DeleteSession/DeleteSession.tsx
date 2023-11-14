import React from "react";
import {FC} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {baseURL} from "../../App.tsx";

Modal.setAppElement('#root');

interface PopupProps {
    isOpen: boolean;
    sessionMuid: number;
    onRequestClose: () => void;
}


const DeleteSession: FC<PopupProps> = ({isOpen, onRequestClose, sessionMuid}) => {
    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        axios.delete(baseURL + 'session/' + sessionMuid).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        onRequestClose()
    }


    return (
        <Modal isOpen={isOpen} contentLabel="Add Session">
            <div> Are you sure you want to delete the session?</div>
            <div className={"formDiv"}>
                <button type="submit" value="Delete and close window" onClick={onSubmit}>Add and close window</button>
                <button onClick={onRequestClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default DeleteSession;
