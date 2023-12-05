import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Divider } from '@mui/material';
import { IMessages, IResponseTicket } from '../../interfaces';
import { FC } from 'react';
import { ShowEditorSun } from '../shared/Editor';
import { formatDate } from '../../helpers';
import { useAuth } from '../../hooks';

interface CardProps {
    r: IMessages;
    x: IResponseTicket
}

const CommentaryCard: FC<CardProps> = ({ r, x }) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${r?.fkUserName}&background=random&size=64`;
    const { user } = useAuth()

    console.log(r);
    console.log(x.fkUser)
    return (
        <>
            <Divider />
            <Card
                sx={{
                    marginLeft: r.fkUser !== x.fkUser  ? 'auto' : 0, 
                    marginRight: r.fkUser !== x.fkUser   ? 0 : 'auto',
                    width: '65%',
                    backgroundColor: r.fkUser !== x.fkUser ? 'primary.light' : 'rgb(45 212 191)',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        padding: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: r.fkUser !== x.fkUser  ? 'flex-end' : 'flex-start',
                            gap: 1,
                            marginBottom: 0.5,
                        }}
                    >
                        {/* {!user?.isAgent  && ( */}
                            <Avatar
                                alt={r.fkUserName}
                                src={avatarUrl}
                                sx={{
                                    margin: 0,
                                }}
                            />
                        {/* )} */}
                        <Typography sx={{ fontSize: 14 }}>
                            Creado: <Typography component="span" sx={{ fontSize: 12 }}>{r.fkUserName}</Typography>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            Fecha de Respuesta: <Typography component="span" sx={{ fontSize: 12 }}>{formatDate(r.date)}</Typography>
                        </Typography>
                    </Box>
                    <ShowEditorSun infoS3={r.message} />
                </CardContent>
            </Card>
            <Divider
                sx={{
                    marginTop: 1.5,
                    marginBottom: 1,
                }}
            />
        </>
    );
};

export { CommentaryCard };
