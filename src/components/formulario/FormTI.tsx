//react
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/router';
//Components
import { EditorSun } from '../shared';
//material
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
//endpoints
import { ticketAPI, ticketDepartmentAPI, categoryAPI, subcategoryAPI, slaAPI } from '../../server';
//Interfaces
import { ITicket, ITicketCreate, IDepartament, ICategory, IDeparmentFK, ISearchSLA, ISubCategory, ISLas } from '../../interfaces';
//hooks
import { useAuth, useTickets } from '../../hooks'
//
import { SnackbarAlert } from '../shared';

const FormTI = () => {

    const { user } = useAuth();
    const { tickets, setTickets, branchOffices } = useTickets()
    // Snackbar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState('info');
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const router = useRouter();
    const [departaments, setDepartaments] = useState<IDepartament[]>([]);
    const [onLoadingDepartment, setOnLoadingDepartment] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [onLoadingCategories, setOnLoadingCategories] = useState(false);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const [onLoadingSubCategories, setOnLoadingSubCategories] = useState(false);
    const [descriptionSun, setDescriptionSun] = useState('');
    const [searchSLA, setSearchSLA] = useState({
        departament: 1,
        category: 1,
        subcategory: 1,
    });
    const [formData, setFormData] = useState<ITicketCreate>({
        pkTicket: 0,
        fkBranch: 1,
        fkCntcCode: 1,
        fkSLA: 1,
        title: '',
        description: '',
        priority: '1',
        origin: '1',
        status: '4'
    })
    const handleSendTicket = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { fkBranch, fkCntcCode, title, description, priority } = formData;
        if ([fkBranch, fkCntcCode, title, priority].includes("")) {
            setSnackBarType('error');
            setSnackBarMessage('Faltan campos por rellenar');
            setOpenSnackBar(true);
            // //console.log('datos vacios');
            return
        }

        const formDataToSend: ITicketCreate = {
            fkBranch: formData.fkBranch,
            fkCntcCode: formData.fkCntcCode,
            fkSLA: formData.fkSLA,
            title: formData.title,
            description: descriptionSun,
            priority: formData.priority,
            origin: formData.origin.toString(),
            pkTicket: formData.pkTicket,
            status: formData.status.toString(),
        };
        // //console.log(formDataToSend)
        ticketAPI
            .createTicketRequest(formDataToSend)
            .then((res) => {
                // //console.log(res)
                setTickets([...tickets, res]);
                router.push('/tickets');
            })
            .catch((err) => {
                // //console.log(err);
                setSnackBarType('error');
                setSnackBarMessage('Error al crear el ticket...');
                setOpenSnackBar(true);
            })
    }
    const handleChangeDataEditor = (content: string) => {
        setDescriptionSun(content)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleChangeSelect = async (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setSearchSLA({
            ...searchSLA,
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
    //departaments
    useEffect(() => {
        ticketDepartmentAPI.getDepartaments()
            .then((res) => {
                setDepartaments(res)
                setOnLoadingDepartment(true);
            })
            .catch((error) => {
                //console.log(error);
            })
    }, []);
    //categories
    useEffect(() => {
        categoryAPI.getCategoriesByDepartment(searchSLA.departament)
            .then((res) => {
                setCategories(res)
                setOnLoadingCategories(true);
                // //console.log(res)
                if (res.length > 0) {
                    setSearchSLA((prevState) => ({
                        ...prevState,
                        category: res[0].pkCategory,
                    }));
                }
            })
            .catch((error) => {
                //console.log(error);
            })
    }, [searchSLA.departament]);
    //subcategories
    useEffect(() => {
        subcategoryAPI.getSubcategoryByCategory(searchSLA.category)
            .then((res) => {
                setSubCategories(res);
                setOnLoadingSubCategories(true);
                // //console.log(res)
                if (res.length > 0) {
                    setSearchSLA((prevState) => ({
                        ...prevState,
                        subcategory: res[0].pkSubCategory,
                    }));
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }, [searchSLA.category]);
    //SLA
    useEffect(() => {
        slaAPI.getSLAbySubCategory(searchSLA.subcategory)
            .then((res) => {
                // //console.log(res);
                if (res.idSLA) {
                    const { idSLA } = res;
                    setFormData((prevState) => ({
                        ...prevState,
                        fkSLA: idSLA,
                    }));
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }, [searchSLA.subcategory]);

    // if (user?.isAgent === 'true') return 'Error al cargar los datos'

    return (
        <>
            <Box
                sx={{
                    padding: '2rem',
                    width: {
                        xs: '100%',
                        lg: '50%'
                    }
                }}
            >
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        fontSize: '1.5rem',
                    }}
                >
                    Envíe un Ticket
                </Typography>
                <Typography
                    sx={{
                        textTransform: 'capitalize',
                        fontSize: '1rem',
                        color: 'text.secondary',
                        marginTop: '0.5rem',
                    }}
                >
                    Información de Ticket
                </Typography>
                <form
                    onSubmit={handleSendTicket}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth size='small'
                                sx={{
                                    marginTop: '1rem',
                                }}
                            >
                                <InputLabel id="departament">Departamento</InputLabel>
                                {
                                    onLoadingDepartment &&
                                    <Select
                                        labelId="departament"
                                        id="departament"
                                        name="departament"
                                        value={searchSLA.departament.toString()}
                                        label="Departamento"
                                        onChange={handleChangeSelect}
                                    >
                                        <MenuItem value='' disabled>Selecciona un Departamento</MenuItem>
                                        {
                                            departaments?.length > 0
                                                ?
                                                departaments.map(departament => (
                                                    <MenuItem
                                                        key={departament.pkDepartment}
                                                        value={departament.pkDepartment}
                                                    >
                                                        {departament.name}
                                                    </MenuItem>
                                                ))
                                                :
                                                <MenuItem value='1' disabled>No existen Departamentos</MenuItem>
                                        }
                                    </Select>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size='small'
                                sx={{
                                    marginTop: '1rem',
                                }}
                            >
                                <InputLabel id="fkBranch">Sucursal</InputLabel>
                                {
                                    onLoadingCategories &&
                                    <Select
                                        labelId="fkBranch"
                                        id="fkBranch"
                                        name="fkBranch"
                                        value={formData.fkBranch.toString()}
                                        label="Sucursal"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='' disabled>Selecciona un Departamento</MenuItem>
                                        {
                                            branchOffices?.length > 0
                                                ?
                                                branchOffices.map(branchOffice => (
                                                    <MenuItem
                                                        key={branchOffice.pkBranchOffice}
                                                        value={branchOffice.pkBranchOffice}
                                                    >
                                                        {branchOffice.name}
                                                    </MenuItem>
                                                ))
                                                :
                                                <MenuItem value='1' disabled>No existen Sucursales</MenuItem>
                                        }
                                    </Select>
                                }
                            </FormControl>
                        </Grid>
                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <FormControl fullWidth size='small'
                                sx={{
                                    marginTop: '1rem',
                                }}
                            >
                                <InputLabel id="category">Categoría</InputLabel>
                                {
                                    onLoadingCategories &&
                                    <Select
                                        labelId="category"
                                        id="category"
                                        name='category'
                                        value={searchSLA.category.toString()}
                                        // value={selectCategory}
                                        label="Categoría"
                                        onChange={handleChangeSelect}
                                    >
                                        <MenuItem value='' disabled>Selecciona una Categoría</MenuItem>
                                        {
                                            categories?.length > 0
                                                ?
                                                categories.map(category => <MenuItem key={category.pkCategory} value={category.pkCategory}>{category.name}</MenuItem>)
                                                :
                                                <MenuItem value='1' disabled>No existen Categoría</MenuItem>
                                        }
                                    </Select>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl fullWidth size='small'
                                sx={{
                                    marginTop: '1rem',
                                }}
                            >
                                <InputLabel id="subcategory">SubCategoría</InputLabel>
                                {
                                    onLoadingSubCategories &&

                                    <Select
                                        labelId="subcategory"
                                        id="subcategory"
                                        name="subcategory"
                                        value={searchSLA.subcategory.toString()}
                                        label="SubCategoría"
                                        onChange={handleChangeSelect}
                                    >
                                        <MenuItem value='' disabled>Selecciona una SubCategoría</MenuItem>
                                        {
                                            subCategories?.length > 0
                                                ?
                                                subCategories.map(subCategory => <MenuItem key={subCategory.pkSubCategory} value={subCategory.pkSubCategory}>{subCategory.name}</MenuItem>)
                                                :
                                                <MenuItem value='1' disabled>No existen SubCategoría</MenuItem>
                                        }
                                    </Select>
                                }
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <TextField fullWidth label="SLA" id="email" size="small"
                                sx={{
                                    marginTop: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="SLA Tiempo" id="email" size="small"
                                sx={{
                                    marginTop: '1rem',
                                }}
                            />
                        </Grid> */}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Nombre de Contacto" id="cntcCode" size="small"
                                sx={{
                                    marginTop: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Email" id="email" size="small"
                                sx={{
                                    marginTop: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Teléfono" id="telephone" size="small"
                                sx={{
                                    marginTop: '1rem',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TextField fullWidth label="Título" id="title" size="small"
                        sx={{
                            marginTop: '1rem',
                        }}
                        name="title"
                        value={formData.title}
                        onChange={handleChangeText}
                    />

                    <Card
                        sx={{
                            marginTop: '1rem',
                        }}
                    >
                        <EditorSun
                            handleChangeDataEditor={handleChangeDataEditor}
                        />
                    </Card>

                    <FormControl fullWidth size='small'
                        sx={{
                            marginTop: '1rem',
                        }}
                    >
                        <InputLabel id="priority">Prioridad</InputLabel>
                        <Select
                            labelId="ticketPpriorityriority"
                            id="priority"
                            name="priority"
                            value={formData.priority.toString()}
                            label="Prioridad"
                            onChange={handleChange}
                        >
                            <MenuItem value={"1"}>Alta</MenuItem>
                            <MenuItem value={"2"}>Media</MenuItem>
                            <MenuItem value={"3"}>Baja</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{
                            marginTop: '2rem'
                        }}
                    >Enviar</Button>
                </form>
            </Box>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                snackBarMessage={snackBarMessage}
                setOpenSnackBar={setOpenSnackBar}
                snackBarType={snackBarType}
            />
        </>
    )
}

export { FormTI }