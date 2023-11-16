import {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header/Header";
import SessionsTable from "./components/SessionsTable/SessionsTable";
import * as React from 'react';
import axios from "axios";

export const baseURL = "http://localhost:8000/";


function App() {
    const [sessions, setSessions] = useState([]);

    const fetchSessions = () => {
        axios.get(baseURL + "sessions").then((response) => {
            setSessions(response.data);
        });
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const refreshData = () => {
        fetchSessions();
    };

    return (
        <>
            <Header/>
            <div className={"app-main"}>
                <SessionsTable data={sessions} refreshData={refreshData}/>
            </div>
        </>
    )
}

export default App
