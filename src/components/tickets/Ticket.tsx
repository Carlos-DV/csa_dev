'use client'
//REACT
import { FC, useEffect, useState } from 'react'
//MUI
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//ENDPOINT
import { ticketAPI } from '../../server'
//INTERFACES
import { ITicket } from '../../interfaces'
import Sidebar from './Sidebar';

type IProps = {
  convertId: number
}

const Ticket: FC<IProps> = ({ convertId }) => {

  const [loading] = useState(false);
  const [ticket, setTicket] = useState<ITicket>({
    pkTicket: 0,
    name: "",
    fkBranch: 0,
    branch: "",
    fkCntcCode: 0,
    fkSLA: 0,
    sla: "",
    slA_Minutes: 0,
    slA_Hours: 0,
    fkSubCategory: 0,
    subCategory: "",
    fkCategory: 0,
    category: "",
    fkDepartment: 0,
    department: "",
    title: "",
    description: "",
    files: "",
    status: "",
    origin: "",
    priority: "",
    create: "",
    update: "",
    dueDate: "",
    firstResponse: "",
    closeDate: "",
    isFirstResponseExpired: false,
    isSLAExpired: false,
    fkUser: 0,
    fkUserName: "",
    fkAgent: 0,
    fkAgentName: "",
  })

  useEffect(() => {
    const getTicketById = async () => {
      try {
        const res = await ticketAPI.getTicketById(convertId);
        setTicket(res)
      } catch (error) {
        console.log(`ex: ${error}`)
      }
    }
    getTicketById();
  }, [convertId])

  return (
    <>
      {
        loading
          ?
          (
            <Box sx={{ display: "flex" }} justifyContent="center">
              <CircularProgress />
            </Box>
          )
          :
          (
            <Paper sx={{ boxShadow: 5, p: 2}}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Sidebar
                    ticket={ticket}
                    setTicket={setTicket}
                  />
                </Grid>
              </Grid>
            </Paper>
          )
      }
    </>
  )
}
export { Ticket }