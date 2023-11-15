import React, {FC} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useState} from "react";
import './SessionsTable.css'
import CreateSession from "../CreateSession/CreateSession.tsx";
import DeleteSession from "../DeleteSession/DeleteSession.tsx";
import UpdateSession from "../UpdateSession/UpdateSession.tsx";


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
    const [isDeleteSessionOpen, setDeleteSessionOpen] = useState<boolean>(false);
    const [isUpdateSessionOpen, setUpdateSessionOpen] = useState<boolean>(false);
    const [selectionMuid, setSelectionMuid] = React.useState("");


    function onUpdateSessionClose() {
        refreshData();
        setUpdateSessionOpen(false);
    }

    function onDeleteSessionClose() {
        refreshData();
        setDeleteSessionOpen(false);
    }

    function onCreateSessionClose() {
        refreshData();
        setCreateSessionOpen(false);
    }

    function getOnRowSelectionModelChange(newSelection: any) {
        const selectedRowId = newSelection[0];
        const found = data.find((row: any) => row._id == selectedRowId);
        if (found) {
            setSelectionMuid(found.muid);
        }
    }

    return (
        <div className="table">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row._id}
                onRowSelectionModelChange={getOnRowSelectionModelChange}
            />
            <div className={"bottomButtons"}>
                <div className={"sessionsButton"}>
                    <button onClick={() => setCreateSessionOpen(true)}>Add Session</button>
                </div>
                {selectionMuid != "" && (
                    <div className={"sessionsButton"}>
                        <button onClick={() => setDeleteSessionOpen(true)}>Delete Session
                        </button>
                    </div>
                )}
                {selectionMuid != "" && (
                    <div className={"sessionsButton"}>
                        <button onClick={() => setUpdateSessionOpen(true)}>Update Session
                        </button>
                    </div>
                )}
            </div>
            <CreateSession isOpen={isCreateSessionOpen} onRequestClose={onCreateSessionClose}/>
            <DeleteSession isOpen={isDeleteSessionOpen} onRequestClose={onDeleteSessionClose}
                           sessionMuid={selectionMuid}/>
            <UpdateSession isOpen={isUpdateSessionOpen} onRequestClose={onUpdateSessionClose}
                           sessionMuid={selectionMuid}/>
        </div>
    );
}

export default SessionsTable;
