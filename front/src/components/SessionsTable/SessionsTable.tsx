import React, {FC} from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useState} from "react";
import './SessionsTable.css'


const columns: GridColDef[] = [
    {field: 'muid', headerName: 'MUID', width: 70},
    {field: 'device_type', headerName: 'Device Type', width: 130},
    {field: 'transfer_usd', headerName: 'Transfer USD', width: 130},
    {field: 'fraud', headerName: 'Fraud', width: 70},
];

interface TableProps {
    data: [];
    openAddSession: () => void;
    openDeleteSession: () => void;
}


const SessionsTable: FC<TableProps> = ({data, openAddSession, openDeleteSession}) => {
    const [rowsSelected, setRowsSelected] = useState(false);

    function getOnRowSelectionModelChange() {
        setRowsSelected(!rowsSelected);
    }

    return (
        <div className="table">
            <DataGrid
                rows={data}
                columns={columns}
                onRowSelectionModelChange={getOnRowSelectionModelChange}
            />
            <div className={"bottomButtons"}>
                <div className={"sessionsButton"}>
                    <button onClick={openAddSession}>Add Session</button>
                </div>
                {rowsSelected && (
                    <div className={"sessionsButton"}>
                        <button onClick={openDeleteSession}>Delete Session
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SessionsTable;
