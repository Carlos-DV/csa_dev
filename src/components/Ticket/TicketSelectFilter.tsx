import { Autocomplete, Box, Card, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const TicketSelectFilter = () => {

    const [deparment, setDepartment] = useState<string>("1");
    const [prioridad, setPrioridad] = useState<number>(1);
    const [canal, setCanal] = useState<string>("1");

    return (
            // <Container>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        marginRight:'0.5rem',
                        padding:'0.5rem'
                    }}
                >
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl
                            sx={{minWidth: 120,}} 
                            fullWidth
                            size="small"
                            variant='standard'
                        >
                        <InputLabel id="idDepartment">Departamento</InputLabel>
                        <Select
                            id='idDepartment'
                            label='Departamento'
                            value={1}
                        >
                            <MenuItem  value={1}>Tecnologías del información</MenuItem>
                            {/* <MenuItem  value={2}>Compras</MenuItem>
                            <MenuItem  value={3}>Garantias</MenuItem> */}
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl 
                            sx={{minWidth: 120 }} 
                            size="small"
                            fullWidth
                            variant='standard'
                        >
                        <InputLabel id="idPriority">Prioridad</InputLabel>
                            <Select
                                labelId="idPriority"
                                id="idPriority-select"
                                label='Prioridad'
                                value={1}
                                onChange={()=> {}}
                            >
                                <MenuItem value={1}>Alta</MenuItem>
                                {/* <MenuItem value={2}>Media</MenuItem>
                                <MenuItem value={3}>Baja</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl
                                sx={{minWidth: 120 }} 
                                fullWidth
                                size="small"
                                variant='standard'
                            >
                            <InputLabel id="idCanal">Canal:</InputLabel>
                            <Select
                                labelId='idCanal'
                                id='idCanal-select'
                                label='Canal'
                                value={1}
                                onChange={()=>{}}
                            >
                                <MenuItem  value={1}>Computadora</MenuItem>
                                {/* <MenuItem  value={2}>Email</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            // </Container>
    )
}

export { TicketSelectFilter }