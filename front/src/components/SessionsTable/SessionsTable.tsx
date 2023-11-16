import React, {FC} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useState} from "react";
import './SessionsTable.css'
import CreateSession from "../SessionForm/CreateSession/CreateSession.tsx";
import EditSession from "../SessionForm/UpdateSession/EditSession.tsx";
import {FormDataType} from "../SessionForm/SessionForm.tsx";


const columns: GridColDef[] = [
    {field: 'muid', headerName: 'MUID', width: 300},
    {field: 'device_type', headerName: 'Device Type', width: 100},
    {field: 'transfer_usd', headerName: 'Transfer USD', width: 100},
    {field: 'fraud', headerName: 'Fraud', width: 100},
];

interface TableProps {
    data: any;
    refreshData: () => void;
}


const SessionsTable: FC<TableProps> = ({data, refreshData}) => {
    const [isCreateSessionOpen, setCreateSessionOpen] = useState<boolean>(false);
    const [isEditSessionOpen, setEditSessionOpen] = useState<boolean>(false);
    const [selectionSession, setSelectionSession] = useState<FormDataType>();


    function onUpdateSessionClose() {
        refreshData();
        setEditSessionOpen(false);
        setSelectionSession(undefined);
    }

    function onCreateSessionClose() {
        refreshData();
        setCreateSessionOpen(false);
        setSelectionSession(undefined);
    }

    function getOnRowSelectionModelChange(newSelection: any) {
        const selectedRowId = newSelection[0];
        const found = data.find((row: any) => row._id == selectedRowId);
        if (found) {
            const selectedSession = new FormDataType(found.muid, found.device_type, found.transfer_usd, found.fraud);
            setSelectionSession(selectedSession);
        }
    }

    return (
        <div className="table">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row._id}
                onRowSelectionModelChange={getOnRowSelectionModelChange}
                autoHeight
            />
            <div className={"bottomButtons"}>
                <div className={"sessionsButton"}>
                    <button onClick={() => setCreateSessionOpen(true)}>Add Session</button>
                </div>
                {selectionSession && (
                    <div className={"sessionsButton"}>
                        <button onClick={() => setEditSessionOpen(true)}>Update Session
                        </button>
                    </div>
                )}
            </div>
            <CreateSession isOpen={isCreateSessionOpen} onRequestClose={onCreateSessionClose}/>
            {selectionSession && (
                <EditSession isOpen={isEditSessionOpen} onRequestClose={onUpdateSessionClose}
                             selectedSession={selectionSession}/>
            )}

        </div>
    );
}

export default SessionsTable;
