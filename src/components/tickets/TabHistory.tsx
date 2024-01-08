'use client'
//REACT
import { FC, useEffect, useState } from 'react';
//COMPONENTS
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//API
import { ticketAPI } from '../../server';
//INTERFACES
import { IHistory } from '../../interfaces';
//HELPERS

import { Spinner } from '../shared';
import { formatDate } from '../../helpers';

interface IProps {
    ticket: number
}

const TabHistory: FC<IProps> = ({ ticket }) => {

    const [histories, setHistories] = useState<IHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getDotStyles = (changes: string) => {
        const commonStyle = { color: '#fff', bgcolor: '#42a5f5' };
        const commonStyle2 = { color: '#fff', bgcolor: '#4caf50' };
        const commonStyle3 = { color: '#fff', bgcolor: '#ff9800' };
        const commonStyle4 = { color: '#fff', bgcolor: '#03a9f4' };
        const commonStyle5 = { color: '#fff', bgcolor: '#ef5350' };

        if (changes.toLowerCase().startsWith("se ha creado")) {
            return commonStyle;
        } else if (changes.toLowerCase().startsWith("el usuario")) {
            return commonStyle2
        } else if (changes.toLowerCase().startsWith("el agente")) {
            return commonStyle3
        } else if (changes.toLowerCase().startsWith("el ticket")) {
            return commonStyle4
        } else {
            return commonStyle5
        }
    };

    useEffect(() => {
        const getHistoryById = async () => {
            setLoading(true);
            try {
                const res = await ticketAPI.getHistoryById(ticket);
                setHistories(res);
            } catch (error) {
                console.log(`ex: ${error}`)
            }
            setLoading(false);
        }
        getHistoryById()
    }, [ticket])

    console.log(histories);

    return (
        <>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <Timeline
                        position="alternate"
                        sx={{
                            '& .MuiTimelineItem-root': { minHeight: 90 },
                            '& .MuiTimelineOppositeContent-root': { mt: 0.5 },
                            '& .MuiTimelineDot-root': {
                                borderRadius: 1.25,
                                boxShadow: 'none',
                                margin: 0,
                                ml: 1.25,
                                mr: 1.25,
                                p: 1,
                                '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
                            },
                            '& .MuiTimelineContent-root': { borderRadius: 1, bgcolor: 'secondary.lighter', height: '100%' },
                            '& .MuiTimelineConnector-root': { border: '1px dashed', borderColor: 'secondary.light', bgcolor: 'transparent' }
                        }}
                    >
                        {
                            histories.map((history, index) => (
                                <TimelineItem key={history.pkHistory}>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {index + 1}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot
                                            sx={getDotStyles(history.changes)}
                                        >
                                            {
                                                history.changes.toLocaleLowerCase().startsWith("se ha creado")
                                                    ?
                                                    <PlayCircleFilledIcon />
                                                    :
                                                    history.changes.toLocaleLowerCase().startsWith("el usuario")
                                                        ?
                                                        <SubdirectoryArrowRightIcon />
                                                        :
                                                        history.changes.toLocaleLowerCase().startsWith("el agente")
                                                            ?
                                                            <SubdirectoryArrowLeftIcon />
                                                            :
                                                            history.changes.toLocaleLowerCase().startsWith("el ticket")
                                                                ?
                                                                <EditNoteIcon />
                                                                :
                                                                <CheckCircleIcon />
                                            }
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            sx={{
                                                textTransform: 'capitalize',
                                                fontWeight: '700',
                                                fontSize: '0.8rem',
                                            }}>
                                            {history?.changes}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textTransform: 'capitalize',
                                                fontWeight: '500',
                                                fontFamily: 'cursive',
                                                fontSize: '0.6rem',
                                            }}
                                        >
                                            {formatDate(history?.currentDate)}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))
                        }
                    </Timeline>

            }

        </>
    )
}

export { TabHistory } 
