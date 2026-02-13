import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Paper,
    Avatar,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
const TableContact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const handleDeleteContatct = (contactId) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {
            navigate("/login");
            return;
        }

        const updatedUsers = users.map((u) => {
            if (u.User_id === currentUser.User_id) {
                return {
                    ...u,
                    Contacts: u.Contacts.filter(
                        (contact) => contact.Contact_id !== contactId,
                    ),
                };
            }
            return u;
        });
        
        const updatedCurrentUser = updatedUsers.find(
            (u) => u.User_id === currentUser.User_id,
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
        
        setUserData(updatedCurrentUser.Contacts);
    };

    return (
    <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                    }}
                >
                    <TableContainer component={Paper} sx={{ maxWidth: "80vw", maxHeight: "80vh" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Profile Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {userData.map((contact) => (
                                    <TableRow key={contact.Contact_id}>
                                        <TableCell>
                                            {contact.profilImage ? (
                                                <Avatar
                                                    src={contact.profilImage}
                                                />
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                        <TableCell>{contact.name ? contact.name : "—"}</TableCell>
                                        <TableCell>{contact.email ? contact.email : "—"}</TableCell>
                                        <TableCell>{contact.phonenumber ? contact.phonenumber : "—"}</TableCell>
                                        <TableCell>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleDeleteContatct(contact.Contact_id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                // onClick={() => handleUpdateContact(contact.Contact_id)}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
    );
}

export default TableContact