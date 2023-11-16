import axios from "axios";

export type NewSession = {
    muid: string;
    dev_type: string;
    transferred: number;
    is_fraud: boolean;
};

export interface SessionData extends NewSession {
    id: string;
}


export function getSessions(): () => void {
    return () => {
        axios.get('http://localhost:8000/sessions')
            .then(res => {
                return res.data;
            })
    }
}