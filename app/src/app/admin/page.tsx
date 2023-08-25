import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

/* 
This page lets you:
 - Create a campaign
 - Upload .csv of phone numbers
 - Create a basic script
 - Publish to a unique URL
*/
const rows = [{ name: "ssdsdf", status: "sdfsdf", date: "sdfsdf", progress: "sdfsdf" }];
const columns = ["Name", "Status", "Date Created", "Progress %"];
export default function AdminPage() {
    return (
        <>
            <div className="flex space-x-3">
                <h2>Campaigns</h2>
                <div>
                    <Link href="/admin/campaigns/create">
                        <Button variant="contained">Create</Button>
                    </Link>
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row?.name}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell>{row?.name}</TableCell>
                                <TableCell>{row?.status}</TableCell>
                                <TableCell>{row?.date}</TableCell>
                                <TableCell>{row?.progress}</TableCell>
                            </TableRow>
                        ))}
                        {rows?.length === 0 && (
                            <>
                                <TableRow>
                                    <TableCell colSpan={5}>No campaigns found</TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
