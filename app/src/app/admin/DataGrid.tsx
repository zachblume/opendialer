"use client";
import { DataGridProps, GridEventListener } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { colDefs } from "./coldefs";

type DataGridWrapperProps = DataGridProps & {
    table: string;
};

export default function DataGridWrapper(
    props: DataGridWrapperProps
): JSX.Element {
    const router = useRouter();
    const handleClick: GridEventListener<"rowClick"> = (
        params,
        event,
        details
    ) => {
        // If it is a campaign...
        if (params?.row?.name) {
            router.push(`/admin/campaigns/${params.row.id}`);
        }
    };
    const c = (props?.columns ? props?.columns : colDefs?.[props?.table]).map(
        (column) => ({
            ...column,
            valueFormatter:
                column.type === "date"
                    ? (params) => {
                          return new Date(
                              params.value as string
                          ).toLocaleDateString();
                      }
                    : column?.valueFormatter,
        })
    );
    return (
        <DataGrid
            {...props}
            initialState={
                props?.initialState || {
                    pagination: { paginationModel: { pageSize: 10 } },
                }
            }
            onRowClick={props?.onRowClick || handleClick}
            sx={
                props?.sx || props?.rows?.[0]?.name ? { cursor: "pointer" } : {}
            }
            columns={c}
        />
    );
}
