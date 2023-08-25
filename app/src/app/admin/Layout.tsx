import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { Paper } from "@mui/material";
import Head from "next/head";

const menu = [
    { title: "Dashboard", link: "/admin" },
    { title: "Create Campaign", link: "/admin/campaigns/create" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Open Dialer Admin</title>
            </Head>
            <AppBar variant="outlined" position="static">
                <Toolbar>
                    <h1 className="text-xl font-normal">Open Dialer Admin</h1>
                </Toolbar>
            </AppBar>
            <main className="flex">
                <div className="flex-none w-56">
                    <Paper className="h-screen">
                        <MenuList>
                            {menu.map(({ link, title }) => (
                                <Link href={link} className="!no-underline" key={title + link}>
                                    <MenuItem>
                                        <ListItemText>{title}</ListItemText>
                                    </MenuItem>
                                </Link>
                            ))}
                        </MenuList>
                    </Paper>
                </div>
                <div className="grow p-10 px-16">{children}</div>
            </main>
        </>
    );
}
