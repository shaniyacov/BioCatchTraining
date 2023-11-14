import React, {FC} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useState} from "react";
import './SessionsTable.css'
import CreateSession from "../CreateSession/CreateSession.tsx";
import DeleteSession from "../DeleteSession/DeleteSession.tsx";


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
    const [rowsSelected, setRowsSelected] = useState(false);
    const [isCreateSessionOpen, setCreateSessionOpen] = useState<boolean>(false);
    const [isDeleteSessionOpen, setDeleteSessionOpen] = useState<boolean>(false);

    function getOnRowSelectionModelChange() {
        setRowsSelected(!rowsSelected);
    }

    function getRowId(row: any) {
        return row._id;
    }

    function onDeleteSessionClose() {
        refreshData();
        setDeleteSessionOpen(false);
    }

    function onCreateSessionClose() {
        refreshData();
        setCreateSessionOpen(false);
    }

    return (
        <div className="table">
            <DataGrid
                rows={data}
                columns={columns}
                onRowSelectionModelChange={getOnRowSelectionModelChange}
                getRowId={getRowId}
            />
            <div className={"bottomButtons"}>
                <div className={"sessionsButton"}>
                    <button onClick={() => setCreateSessionOpen(true)}>Add Session</button>
                </div>
                {rowsSelected && (
                    <div className={"sessionsButton"}>
                        <button onClick={() => setDeleteSessionOpen(true)}>Delete Session
                        </button>
                    </div>
                )}
            </div>
            <CreateSession isOpen={isCreateSessionOpen} onRequestClose={onCreateSessionClose}/>
            <DeleteSession isOpen={isDeleteSessionOpen} onRequestClose={onDeleteSessionClose}
                           sessionMuid={""}/>
        </div>
    );
}

export default SessionsTable;
