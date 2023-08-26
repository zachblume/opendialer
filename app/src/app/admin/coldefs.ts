const colDefs = {
    people: [
        { field: "first_name", headerName: "First Name" },
        { field: "last_name", headerName: "Last Name" },
        { field: "phone_number", headerName: "Phone Number" },
        { field: "created_at", headerName: "Date Created", type: "date" },
        {
            field: "fields",
            headerName: "All Fields",
            valueFormatter: (params) => JSON.stringify(params?.value),
        },
    ],
    campaigns: [
        { field: "name", headerName: "Name" },
        { field: "status", headerName: "Status" },
        {
            field: "created_at",
            headerName: "Date Created",
            type: "date",
        },
        { field: "progress", headerName: "Progress %" },
    ],
};
export { colDefs };
