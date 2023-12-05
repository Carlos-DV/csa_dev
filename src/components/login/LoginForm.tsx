import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { IPostAuthenticateRequest } from '../../server/base';
import { useAuth, useTickets } from '../../hooks';

type FormData = {
    user: string,
    password: string,
};


const LoginForm = () => {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState<any>({});
    const [formData, setFormData] = useState<IPostAuthenticateRequest>({
        userName: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const { loginUser } = useAuth();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, password } = formData
        if([userName, password].includes("")) {
            console.log("null values");
            return
        }
        console.log(`click ${userName}--${password}`);
        await loginUser(userName, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textTransform: 'uppercase' }}>
                    Login
                </Typography>
                <form
                    onSubmit={handleSubmit}
                >
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            sx={{ mt: 1 }}
                            // required
                            fullWidth
                            id="userName"
                            label="Nombre de Usuario"
                            name="userName"
                            size='small'
                            onChange={handleChangeText}
                            value={formData.userName}
                        />
                        <TextField
                            sx={{ mt: 1 }}
                            // required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            size='small'
                            onChange={handleChangeText}
                            value={formData.password}
                        />
                        <FormControl 
                            sx={{ mt: 1 }}
                            fullWidth
                            // required
                            size='small'
                        >
                            <InputLabel id="society">Sociedad</InputLabel>
                            <Select
                                labelId="society"
                                id="society"
                                name="society"
                                value={1}
                                label="Sociedad"
                                // onChange={handleChange}
                            >
                            <MenuItem value={1}>Refaccionaria Automotriz Ancona</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            sx={{ mt: 2 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            size='small'
                        >
                            Ingresar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

export { LoginForm }