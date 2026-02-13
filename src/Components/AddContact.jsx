import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    Box,
    Paper,
    TextField,
    IconButton,
    Avatar,
    Modal,
    Container,
} from "@mui/material";
const AddContact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        profilImage: "",
    });
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                profilImage: reader.result,
            }));
        };
        reader.readAsDataURL(file);
        setPreviewUrl(fileUrl);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    Contacts: [
                        ...u["Contacts"],
                        {
                            ...formData,
                            Contact_id: Date.now(),
                        },
                    ],
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

        setFormData({
            name: "",
            email: "",
            phonenumber: "",
            profilImage: "",
        });
        setPreviewUrl("");
    };

    const handleRemoveImage = () => {
        setPreviewUrl("");
        setFormData({
            ...formData,
            profilImage: "",
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                }}
            >
                <Paper
                    elevation={6}
                    sx={{ width: "100%", maxWidth: "20%", borderRadius: 3 }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2.2 }}
                    >
                        <Container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h6">Add Contact</Typography>
                            {/* <Button variant="contained" onClick={handleClose} color="error">
                                Close
                            </Button> */}
                        </Container>

                        <IconButton component="label" sx={{ alignSelf: "center" }}>
                            <Avatar src={previewUrl} sx={{ width: 100, height: 100 }} />
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </IconButton>

                        {previewUrl && (
                            <Button variant="outlined" onClick={handleRemoveImage}>
                                Remove Image
                            </Button>
                        )}

                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Phone Number"
                            name="phonenumber"
                            type="tel"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            sx={{ mt: 1, py: 1.2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Paper>
            </Box>
    );
};

export default AddContact;
