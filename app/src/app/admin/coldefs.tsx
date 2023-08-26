"use client";

import Tooltip from "@mui/material/Tooltip";
import { GridColDef } from "@mui/x-data-grid";

const colDefs: {
    [key: string]: GridColDef[];
} = {
    people: [
        { field: "first_name", headerName: "First Name" },
        { field: "last_name", headerName: "Last Name" },
        { field: "phone_number", headerName: "Phone Number" },
        { field: "created_at", headerName: "Date Created", type: "date" },
        {
            field: "fields",
            headerName: "All Fields",
            valueGetter: ({ value }) => JSON.stringify(value, null, 4),
            renderCell: ({ value }) => {
                return (
                    <Tooltip
                        placement="left-start"
                        title={
                            <pre className="text-sm overflow-scroll">
                                {value as string}
                            </pre>
                        }
                        arrow
                    >
                        <span>{value as string}</span>
                    </Tooltip>
                );
            },
        },
    ],
    campaigns: [
        { field: "name", headerName: "Name" },
        { field: "status", headerName: "Status" },
        { field: "created_at", headerName: "Date Created", type: "date" },
        { field: "progress", headerName: "Progress %" },
    ],
};
export { colDefs };
