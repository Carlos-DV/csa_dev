import { Input, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { IPostAuthenticateRequest } from "../../server/base";
import { useAuth, useTickets } from "../../hooks";
import ancona from '../../assets/logo-ancona.webp';
import React from "react";
import Image from "next/image";
import style from './loginstyle';
import { blue } from "@mui/material/colors";
// import '../../styles/login.css'

const Login = () => {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState<any>({});
    const [formData, setFormData] = useState<IPostAuthenticateRequest>({
        userName: "",
        password: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { loginUser } = useAuth();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, password } = formData
        if ([userName, password].includes("")) {
            console.log("null values");
            return
        }
        console.log(`click ${userName}--${password}`);
        await loginUser(userName, password);
    }

    return (
        <>
            <style jsx>{style}</style>
            {/** / */}
            <div className="general">
                <div className="container">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="pic2"></div>
                        <Image
                            style={{ marginLeft: '35px', width: '300px', height: 'auto' }}
                            alt=""
                            src={ancona}
                        ></Image>
                        <h1 style={{ marginLeft: '40px' }} >Log in To Continue</h1>
                        <div className="inp" style={{ marginTop: '30px' }}>
                            <TextField
                                sx={{
                                    '& .MuiInputBase-root': {
                                        width: '355PX',
                                        height: '100%',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #494954',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        transition: '.4s',
                                        color: '#fff',
                                        '&:focus': {
                                            border: '2px solid #1f1fff',
                                            boxShadow: '#6767ff 0px 1px 1px, #6767ff 0px 0px 0px 1px',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        left: '20px',
                                        transform: 'translateY(-22px)',
                                        fontSize: '12px',
                                        backgroundColor: '#24242c',
                                        color: '#777780',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        transition: '.2s',
                                        fontFamily: 'Arial, Helvetica, sans-serif',
                                    },
                                    mt: 1,
                                }}
                                fullWidth
                                id="userName"
                                label="Username"
                                name="userName"
                                size="small"
                                onChange={handleChangeText}
                                value={formData.userName}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}  // Estilo para el input
                            />
                        </div>
                        <div className="inp" style={{ marginTop: '30px', marginBottom: '30px' }}>
                            <TextField
                                sx={{
                                    '& .MuiInputBase-root': {
                                        width: '355PX',
                                        height: '100%',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #494954',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        transition: '.4s',
                                        color: '#fff',
                                        '&:focus': {
                                            border: '2px solid #1f1fff',
                                            boxShadow: '#6767ff 0px 1px 1px, #6767ff 0px 0px 0px 1px',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        left: '20px',
                                        transform: 'translateY(-22px)',
                                        fontSize: '12px',
                                        backgroundColor: '#24242c',
                                        color: '#777780',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                        transition: '.2s',
                                        fontFamily: 'Arial, Helvetica, sans-serif',
                                    },
                                    mt: 1,
                                }}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                size="small"
                                onChange={handleChangeText}
                                value={formData.password}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                        </div>
                        <FormControl
                            style={{ marginBottom: '30px' }}
                            fullWidth
                            // required
                            size="small"
                        >
                            <InputLabel id="society"
                                style={{ color: "white" }}
                            >Sociedad
                            </InputLabel>
                            <Select
                                labelId="society"
                                id="society"
                                name="society"
                                value={1}
                                label="Sociedad"
                                style={{ color: "black", backgroundColor: "white" }}
                            >
                                <MenuItem value={1}>Refaccionaria Automotriz Ancona</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            className="dbutton"
                            type="submit"
                            fullWidth
                            variant="contained"
                            size='small'
                        >
                            Login
                        </Button>
                    </form>
                </div>
                <div className="pic"></div>
            </div>
        </>
    );
};

export { Login };
