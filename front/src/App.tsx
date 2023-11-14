import {useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import SessionsTable from "./components/SessionsTable/SessionsTable";
import CreateSession from "./components/CreateSession/CreateSession";
import * as React from 'react';
import axios from "axios";
import DeleteSession from "./components/DeleteSession/DeleteSession.tsx";


const INITIAL_STATE = [
    {id: 1, muid: 1, device_type: 'Jon', transfer_usd: 35, fraud: true},
    {id: 2, muid: 2, device_type: 'Cersei', transfer_usd: 42, fraud: true},
    {id: 3, muid: 3, device_type: 'Jaime', transfer_usd: 45, fraud: true},
    {id: 4, muid: 4, device_type: 'Arya', transfer_usd: 16, fraud: true},
    {id: 5, muid: 5, device_type: 'Daenerys', transfer_usd: null, fraud: true},
    {id: 6, muid: 6, device_type: null, transfer_usd: 150, fraud: true},
    {id: 7, muid: 7, device_type: 'Ferrara', transfer_usd: 44, fraud: true},
    {id: 8, muid: 8, device_type: 'Rossini', transfer_usd: 36, fraud: true},
    {id: 9, muid: 9, device_type: 'Harvey', transfer_usd: 65, fraud: true},
];

export const baseURL = "http://localhost:8000/";


function App() {
    const [sessions, setSessions] = useState(INITIAL_STATE);
    const [isCreateSessionOpen, setCreateSessionOpen] = useState<boolean>(false);
    const [isDeleteSessionOpen, setDeleteSessionOpen] = useState<boolean>(false);

    React.useEffect(() => {
        axios.get(baseURL + "sessions").then((response) => {
            setSessions(response.data);
        });
    }, [sessions]);

    return (
        <>
            <Header/>
            <div className={"app-main"}>
                <SessionsTable data={sessions} openAddSession={() => setCreateSessionOpen(true)} openDeleteSession={() => setDeleteSessionOpen(true)}> </SessionsTable>
            </div>
            <CreateSession isOpen={isCreateSessionOpen} onRequestClose={() => setCreateSessionOpen(false)} />
            <DeleteSession isOpen={isDeleteSessionOpen} onRequestClose={() => setDeleteSessionOpen(false)} sessionMuid={0}/>
        </>
    )
}

export default App
